import { scrypt, timingSafeEqual } from 'crypto'
import { promisify } from 'util'

// Node-only (uses `crypto.scrypt`) — never import this from middleware.ts,
// which runs on the Edge runtime. Session verification (lib/admin/session.ts)
// is the Edge-safe half of auth; this is the Node-only half, used only by
// the login API route.

const scryptAsync = promisify(scrypt) as (password: string, salt: string, keylen: number) => Promise<Buffer>

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, hashHex] = storedHash.split(':')
  if (!salt || !hashHex) return false
  const derived = await scryptAsync(password, salt, 64)
  const stored = Buffer.from(hashHex, 'hex')
  return derived.length === stored.length && timingSafeEqual(derived, stored)
}

export interface AdminUser {
  email: string
  passwordHash: string
}

export function getAdminUsers(): AdminUser[] {
  const users: AdminUser[] = []
  for (let i = 1; ; i++) {
    const email = process.env[`ADMIN_EMAIL_${i}`]
    const passwordHash = process.env[`ADMIN_PASSWORD_HASH_${i}`]
    if (!email || !passwordHash) break
    users.push({ email: email.toLowerCase(), passwordHash })
  }
  return users
}
