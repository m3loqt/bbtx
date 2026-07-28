import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPublishedBlogBySlug, getVisibleCommentsForBlog, createBlogComment } from '@/lib/admin/queries'

// In-memory rate limit store: IP → array of timestamps
const rateStore = new Map<string, number[]>()
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (rateStore.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (timestamps.length >= RATE_LIMIT) return true
  timestamps.push(now)
  rateStore.set(ip, timestamps)
  return false
}

const commentSchema = z.object({
  slug: z.string().min(1),
  nickname: z.string().trim().min(1).max(40),
  content: z.string().trim().min(1, 'Comment cannot be empty').max(2000, 'Comment is too long'),
})

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  const blog = await getPublishedBlogBySlug(slug)
  if (!blog) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const comments = await getVisibleCommentsForBlog(blog.id)
  return NextResponse.json({ comments })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = commentSchema.safeParse(body)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid input.'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ipAddress)) {
      return NextResponse.json({ error: 'Too many comments. Please slow down.' }, { status: 429 })
    }

    const { slug, nickname, content } = parsed.data

    const blog = await getPublishedBlogBySlug(slug)
    if (!blog) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const comment = await createBlogComment({
      blog_id: blog.id,
      nickname,
      content,
      ip_address: ipAddress,
    })

    return NextResponse.json({ comment })
  } catch (err) {
    console.error('[blogs/comments] Unexpected error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
