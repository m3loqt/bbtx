import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getAdminUsers, verifyPassword } from '@/lib/admin/password'
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from '@/lib/admin/session'

export const runtime = 'nodejs'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(req: NextRequest) {
  const parsed = loginSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 })
  }

  const { email, password } = parsed.data
  const user = getAdminUsers().find((u) => u.email === email.toLowerCase())

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const token = await createSessionToken(user.email)
  const res = NextResponse.json({ success: true })
  res.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  return res
}
