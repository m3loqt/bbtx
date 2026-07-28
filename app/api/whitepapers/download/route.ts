import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sql } from '@/lib/db'
import { getResend } from '@/lib/resend'
import { buildWhitepaperDownloadEmail } from '@/lib/emails/whitepaper-download-email'

// In-memory rate limit store: IP → array of timestamps
const rateStore = new Map<string, number[]>()
const RATE_LIMIT = 8
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

const downloadSchema = z.object({
  whitepaperId: z.string().uuid('Invalid whitepaper'),
  name: z.string().max(100).optional(),
  email: z.string().email('Please enter a valid email address'),
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
    const parsed = downloadSchema.safeParse(body)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid input.'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { whitepaperId, email, name } = parsed.data

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ipAddress)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    // Look up the paper server-side — never trust a client-supplied URL for
    // what gets served, and only ever hand out published papers.
    const [paper] = await sql`
      SELECT id, title, pdf_url FROM whitepapers
      WHERE id = ${whitepaperId} AND is_published = true
    `

    if (!paper) {
      return NextResponse.json({ error: 'Whitepaper not found' }, { status: 404 })
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanName = name?.trim() || null

    try {
      await sql`
        INSERT INTO whitepaper_downloads (whitepaper_id, full_name, email, ip_address)
        VALUES (${whitepaperId}, ${cleanName}, ${cleanEmail}, ${ipAddress})
      `
      await sql`
        UPDATE whitepapers SET download_count = download_count + 1 WHERE id = ${whitepaperId}
      `
      await sql`
        INSERT INTO newsletter_signups (email, source)
        VALUES (${cleanEmail}, 'whitepaper')
        ON CONFLICT (email) DO NOTHING
      `
    } catch (dbError) {
      console.error('[whitepapers/download] Database error:', dbError)
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    // Best-effort — a failed email should never block the download itself,
    // since the response already carries the PDF url.
    const notifyFrom = process.env.RESEND_FROM_EMAIL
    if (notifyFrom) {
      try {
        await getResend().emails.send({
          from: notifyFrom,
          to: cleanEmail,
          subject: `Your copy — ${paper.title as string}`,
          html: buildWhitepaperDownloadEmail({
            name: cleanName ?? undefined,
            title: paper.title as string,
            pdfUrl: paper.pdf_url as string,
          }),
        })
      } catch (err) {
        console.error('[whitepapers/download] confirmation email failed:', err)
      }

      const notifyTo = process.env.GRANT_NOTIFICATION_EMAIL
      if (notifyTo) {
        try {
          await getResend().emails.send({
            from: notifyFrom,
            to: notifyTo,
            subject: `Whitepaper download: ${paper.title as string}`,
            html: `<p style="font-family:sans-serif;font-size:14px;color:#222;">
              <strong>${cleanName ?? cleanEmail}</strong> (${cleanEmail}) just downloaded
              <strong>${paper.title as string}</strong>.
            </p>`,
          })
        } catch (err) {
          console.error('[whitepapers/download] notification email failed:', err)
        }
      }
    }

    return NextResponse.json({ success: true, url: paper.pdf_url, title: paper.title })
  } catch (err) {
    console.error('[whitepapers/download] Unexpected error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
