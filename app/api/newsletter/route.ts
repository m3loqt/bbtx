import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sql } from '@/lib/db'
import { getResend } from '@/lib/resend'

// In-memory rate limit store: IP → array of timestamps
const rateStore = new Map<string, number[]>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  source: z.string().max(40).optional(),
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
    const parsed = subscribeSchema.safeParse(body)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid input.'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ipAddress)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const email = parsed.data.email.trim().toLowerCase()
    const source = parsed.data.source?.trim() || 'website'

    try {
      // Re-subscribing (is_active back to true) covers someone who previously unsubscribed.
      await sql`
        INSERT INTO newsletter_signups (email, source)
        VALUES (${email}, ${source})
        ON CONFLICT (email) DO UPDATE SET is_active = true
      `
    } catch (dbError) {
      console.error('[newsletter] Database insert error:', dbError)
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    const notifyTo = process.env.GRANT_NOTIFICATION_EMAIL
    const notifyFrom = process.env.RESEND_FROM_EMAIL
    if (notifyTo && notifyFrom) {
      try {
        await getResend().emails.send({
          from: notifyFrom,
          to: notifyTo,
          subject: `New newsletter signup: ${email}`,
          html: `<p style="font-family:sans-serif;font-size:14px;color:#222;">
            <strong>${email}</strong> just subscribed to the newsletter (source: ${source}).
          </p>`,
        })
      } catch (err) {
        console.error('[newsletter] notification email failed:', err)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[newsletter] Unexpected error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
