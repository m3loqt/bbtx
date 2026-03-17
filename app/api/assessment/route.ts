import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { getResend } from '@/lib/resend'
import { buildAssessmentEmail } from '@/lib/emails/assessment-notification'
import { buildWorkshopEmail } from '@/lib/emails/workshop-notification'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

const assessmentSchema = z.object({
  // Step 1
  full_name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  role: z.string().optional(),
  organization_name: z.string().optional(),
  industry: z.string().optional(),
  organization_size: z.string().optional(),
  // Step 2
  currently_using_ai: z.string().optional(),
  ai_usage_visibility: z.string().optional(),
  ai_guidelines_status: z.string().optional(),
  leadership_ai_training: z.string().optional(),
  // Step 3
  ai_strategy_owner: z.string().optional(),
  ai_strategy_status: z.string().optional(),
  has_strategic_plan: z.string().optional(),
  // Step 4
  biggest_challenges: z.array(z.string()).optional(),
  other_challenge: z.string().optional(),
  // Step 5
  primary_need: z.string().optional(),
  timeline: z.string().optional(),
  wants_orientation_workshop: z.boolean().optional(),
  // Honeypot
  website: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Honeypot — silently succeed without processing
    if (body.website && String(body.website).trim().length > 0) {
      return NextResponse.json({ success: true })
    }

    // Validate
    const parsed = assessmentSchema.safeParse(body)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid input.'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const data = parsed.data

    // Rate limit
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const toStr = (v: string | undefined) => (v && v.trim().length > 0 ? v.trim() : null)

    // Insert into Supabase
    const { error: dbError } = await supabase.from('assessment_submissions').insert({
      full_name: data.full_name.trim(),
      email: data.email.trim().toLowerCase(),
      role: toStr(data.role),
      organization_name: toStr(data.organization_name),
      industry: toStr(data.industry),
      organization_size: toStr(data.organization_size),
      currently_using_ai: toStr(data.currently_using_ai),
      ai_usage_visibility: toStr(data.ai_usage_visibility),
      ai_guidelines_status: toStr(data.ai_guidelines_status),
      leadership_ai_training: toStr(data.leadership_ai_training),
      ai_strategy_owner: toStr(data.ai_strategy_owner),
      ai_strategy_status: toStr(data.ai_strategy_status),
      has_strategic_plan: toStr(data.has_strategic_plan),
      biggest_challenges: data.biggest_challenges ?? [],
      other_challenge: toStr(data.other_challenge),
      primary_need: toStr(data.primary_need),
      timeline: toStr(data.timeline),
      wants_orientation_workshop: data.wants_orientation_workshop ?? false,
      status: 'new',
      ip_address: ip,
    })

    if (dbError) {
      console.error('[assessment] Supabase insert error:', dbError)
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      )
    }

    const notifyTo = process.env.GRANT_NOTIFICATION_EMAIL
    const notifyFrom = process.env.RESEND_FROM_EMAIL!

    const submittedAt = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'short',
    })

    if (notifyTo) {
      // Main assessment notification
      const { error: emailError } = await getResend().emails.send({
        from: notifyFrom,
        to: notifyTo,
        subject: `New Assessment: ${data.full_name.trim()} — ${toStr(data.organization_name) ?? 'Unknown Organization'}`,
        html: buildAssessmentEmail({
          full_name: data.full_name.trim(),
          email: data.email.trim(),
          role: toStr(data.role),
          organization_name: toStr(data.organization_name),
          industry: toStr(data.industry),
          organization_size: toStr(data.organization_size),
          currently_using_ai: toStr(data.currently_using_ai),
          ai_usage_visibility: toStr(data.ai_usage_visibility),
          ai_guidelines_status: toStr(data.ai_guidelines_status),
          leadership_ai_training: toStr(data.leadership_ai_training),
          ai_strategy_owner: toStr(data.ai_strategy_owner),
          ai_strategy_status: toStr(data.ai_strategy_status),
          has_strategic_plan: toStr(data.has_strategic_plan),
          biggest_challenges: data.biggest_challenges ?? [],
          other_challenge: toStr(data.other_challenge),
          primary_need: toStr(data.primary_need),
          timeline: toStr(data.timeline),
          wants_orientation_workshop: data.wants_orientation_workshop ?? false,
          submitted_at: submittedAt,
        }),
      })

      if (emailError) {
        console.error('[assessment] Resend assessment email error:', emailError)
      }

      // Workshop signup notification (separate email)
      if (data.wants_orientation_workshop) {
        const { error: workshopEmailError } = await getResend().emails.send({
          from: notifyFrom,
          to: notifyTo,
          subject: `Workshop Signup: ${data.full_name.trim()} from ${toStr(data.organization_name) ?? 'Unknown Organization'}`,
          html: buildWorkshopEmail({
            full_name: data.full_name.trim(),
            email: data.email.trim(),
            organization_name: toStr(data.organization_name),
            role: toStr(data.role),
            submitted_at: submittedAt,
          }),
        })

        if (workshopEmailError) {
          console.error('[assessment] Resend workshop email error:', workshopEmailError)
        }
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
