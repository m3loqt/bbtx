import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sql } from '@/lib/db'
import { getResend } from '@/lib/resend'
import { buildTestimonialEmail } from '@/lib/emails/testimonial-notification'

// In-memory rate limit store: IP → array of timestamps
const rateStore = new Map<string, number[]>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

const testimonialSchema = z.object({
  full_name: z.string().min(1, 'Name is required').max(100),
  role_company: z.string().max(150).optional(),
  testimonial: z.string().min(1, 'Testimonial is required').max(3000),
  photo_url: z.string().url().optional(),
  permission_to_publish: z.boolean(),
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

    const parsed = testimonialSchema.safeParse(body)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid input.'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { full_name, role_company, testimonial, photo_url, permission_to_publish, website } = parsed.data

    // Honeypot — if website has any value, pretend success and do nothing.
    if (website && website.trim().length > 0) {
      return NextResponse.json({ success: true })
    }

    if (!permission_to_publish) {
      return NextResponse.json(
        { error: 'Permission to publish is required to submit a testimonial.' },
        { status: 400 }
      )
    }

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ipAddress)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const roleCompanyValue = role_company && role_company.trim().length > 0 ? role_company.trim() : null

    try {
      await sql`
        INSERT INTO testimonial_submissions (full_name, role_company, testimonial, photo_url, permission_to_publish, status, ip_address)
        VALUES (${full_name.trim()}, ${roleCompanyValue}, ${testimonial.trim()}, ${photo_url ?? null}, ${permission_to_publish}, 'new', ${ipAddress})
      `
    } catch (dbError) {
      console.error('[testimonials] Database insert error:', dbError)
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      )
    }

    const notifyTo = process.env.GRANT_NOTIFICATION_EMAIL
    const notifyFrom = process.env.RESEND_FROM_EMAIL!

    if (notifyTo) {
      const submittedAt = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'short',
      })

      const { error: emailError } = await getResend().emails.send({
        from: notifyFrom,
        to: notifyTo,
        subject: `New Testimonial: ${full_name.trim()}`,
        html: buildTestimonialEmail({
          full_name: full_name.trim(),
          role_company: roleCompanyValue,
          testimonial: testimonial.trim(),
          photo_url: photo_url ?? null,
          permission_to_publish,
          submitted_at: submittedAt,
          ip_address: ipAddress,
        }),
      })

      if (emailError) {
        console.error('[testimonials] Notification email error:', emailError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[testimonials] Unexpected error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
