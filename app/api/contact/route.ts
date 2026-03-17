import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'
import { buildContactEmail } from '@/lib/emails/contact-notification'

// In-memory rate limit store: IP → array of timestamps
const rateStore = new Map<string, number[]>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (rateStore.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (timestamps.length >= RATE_LIMIT) return true
  timestamps.push(now)
  rateStore.set(ip, timestamps)
  return false
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { full_name, email, inquiry_type, message, website } = body

    // Honeypot — bots fill this hidden field
    if (website) {
      return NextResponse.json({ success: true })
    }

    // Validation
    if (!full_name?.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }
    if (!email?.trim() || !isValidEmail(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }
    if (!inquiry_type?.trim()) {
      return NextResponse.json({ error: 'Please select an inquiry type.' }, { status: 400 })
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
    }

    // Rate limiting
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    // Insert into Supabase
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      inquiry_type: inquiry_type.trim(),
      message: message.trim(),
      ip_address: ip,
    })

    if (dbError) {
      console.error('[contact] Supabase insert error:', dbError)
    }

    // Send notification email
    const notifyTo = process.env.GRANT_NOTIFICATION_EMAIL
    const notifyFrom = process.env.RESEND_FROM_EMAIL ?? 'notifications@bbtx.ai'

    if (notifyTo) {
      const { error: emailError } = await resend.emails.send({
        from: notifyFrom,
        to: notifyTo,
        subject: `New Contact Form Submission — ${inquiry_type.trim()}`,
        html: buildContactEmail({
          full_name: full_name.trim(),
          email: email.trim(),
          inquiry_type: inquiry_type.trim(),
          message: message.trim(),
        }),
      })

      if (emailError) {
        console.error('[contact] Resend error:', emailError)
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
