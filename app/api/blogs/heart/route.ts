import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPublishedBlogBySlug, toggleBlogHeart } from '@/lib/admin/queries'

// In-memory rate limit store: IP → array of timestamps
const rateStore = new Map<string, number[]>()
const RATE_LIMIT = 30
const RATE_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (rateStore.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (timestamps.length >= RATE_LIMIT) return true
  timestamps.push(now)
  rateStore.set(ip, timestamps)
  return false
}

// fingerprint is a random id the client generates once and keeps in
// localStorage — not a real identity, just enough to dedupe repeat hearts
// from the same browser server-side (see blog_hearts unique constraint).
const heartSchema = z.object({
  slug: z.string().min(1),
  fingerprint: z.string().trim().min(8).max(100),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = heartSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input.' }, { status: 400 })
    }

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ipAddress)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const { slug, fingerprint } = parsed.data

    const blog = await getPublishedBlogBySlug(slug)
    if (!blog) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const result = await toggleBlogHeart(blog.id, fingerprint)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[blogs/heart] Unexpected error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
