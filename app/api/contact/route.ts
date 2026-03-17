import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'
import { buildContactEmail } from '@/lib/emails/contact-notification'

// In-memory rate limit store: IP → array of timestamps
const rateStore = new Map<string, number[]>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

const contactSchema = z.object({
  full_name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  inquiry_type: z.string().optional(),
  message: z.string().min(1, 'Message is required').max(2000),
  website: z.string().optional(),
})

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (rateStore.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (timestamps.length >= RATE_LIMIT) return true
  timestamps.push(now)
  rateStore.set(ip, timestamps)
  return false
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid input.'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { full_name, email, inquiry_type, message, website } = parsed.data

    // Honeypot — if website has any value, pretend success and do nothing.
    if (website && website.trim().length > 0) {
      return NextResponse.json({ success: true })
    }

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    // Rate limit per IP
    if (isRateLimited(ipAddress)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const inquiryValue = inquiry_type && inquiry_type.trim().length > 0 ? inquiry_type.trim() : null

    // Insert into Supabase
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      inquiry_type: inquiryValue,
      message: message.trim(),
      status: 'new',
      ip_address: ipAddress,
    })

    if (dbError) {
      console.error('[contact] Supabase insert error:', dbError)
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      )
    }

    // Send notification email (do not block user on failure)
    const notifyTo = process.env.GRANT_NOTIFICATION_EMAIL
    const notifyFrom = process.env.RESEND_FROM_EMAIL!

    if (notifyTo) {
      const submittedAt = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'short',
      })

      const { error: emailError } = await resend.emails.send({
        from: notifyFrom,
        to: notifyTo,
        subject: `New Contact: ${inquiryValue ?? 'General Inquiry'} — ${full_name}`,
        html: buildContactEmail({
          full_name: full_name.trim(),
          email: email.trim(),
          inquiry_type: inquiryValue,
          message: message.trim(),
          submitted_at: submittedAt,
          ip_address: ipAddress,
        }),
      })

      if (emailError) {
        console.error('[contact] Resend error:', emailError)
        // Intentionally do not surface to user.
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
