import { SignJWT, jwtVerify } from 'jose'

// Edge-safe: no Node `crypto` here, so this can be imported from middleware.ts.

export const SESSION_COOKIE_NAME = 'admin_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days, seconds

function getSecretKey() {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET is not set')
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey())
}

export async function verifySessionToken(token: string): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return typeof payload.email === 'string' ? { email: payload.email } : null
  } catch {
    return null
  }
}
