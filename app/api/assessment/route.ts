import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'
import { buildAssessmentEmail } from '@/lib/emails/assessment-notification'

// In-memory rate limit store: IP → array of timestamps
const rateStore = new Map<string, number[]>()
const RATE_LIMIT = 3
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

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
    const {
      website,
      name,
      role,
      orgName,
      industry,
      orgSize,
      usingAi,
      aiAreas,
      strategy,
      challenges,
      challengeOther,
      need,
      timeline,
    } = body

    // Honeypot
    if (website) {
      return NextResponse.json({ success: true })
    }

    // Validate required step-1 fields
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Your name is required.' }, { status: 400 })
    }
    if (!orgName?.trim()) {
      return NextResponse.json({ error: 'Organization name is required.' }, { status: 400 })
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

    const userAgent = req.headers.get('user-agent') ?? undefined

    // Insert into Supabase
    const { error: dbError } = await supabase.from('assessment_submissions').insert({
      full_name: name?.trim(),
      role: role?.trim(),
      organization_name: orgName?.trim(),
      industry: industry ?? null,
      organization_size: orgSize ?? null,
      currently_using_ai: usingAi ?? null,
      ai_target_areas: Array.isArray(aiAreas) ? aiAreas : [],
      ai_strategy_status: strategy ?? null,
      biggest_challenges: Array.isArray(challenges) ? challenges : [],
      other_challenge: challengeOther?.trim() ?? null,
      primary_need: need ?? null,
      timeline: timeline ?? null,
      ip_address: ip,
      user_agent: userAgent,
    })

    if (dbError) {
      console.error('[assessment] Supabase insert error:', dbError)
    }

    // Send notification email
    const notifyTo = process.env.GRANT_NOTIFICATION_EMAIL
    const notifyFrom = process.env.RESEND_FROM_EMAIL ?? 'notifications@bbtx.ai'

    if (notifyTo) {
      const { error: emailError } = await resend.emails.send({
        from: notifyFrom,
        to: notifyTo,
        subject: `New Assessment Submission — ${orgName?.trim() ?? 'Unknown'}`,
        html: buildAssessmentEmail({
          full_name: name?.trim(),
          role: role?.trim(),
          organization_name: orgName?.trim(),
          industry: industry ?? undefined,
          organization_size: orgSize ?? undefined,
          currently_using_ai: usingAi ?? undefined,
          ai_target_areas: Array.isArray(aiAreas) ? aiAreas : [],
          ai_strategy_status: strategy ?? undefined,
          biggest_challenges: Array.isArray(challenges) ? challenges : [],
          other_challenge: challengeOther?.trim() ?? undefined,
          primary_need: need ?? undefined,
          timeline: timeline ?? undefined,
        }),
      })

      if (emailError) {
        console.error('[assessment] Resend error:', emailError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[assessment] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
