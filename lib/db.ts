import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

// Pin the same generic defaults (arrayMode: false, fullResults: false) the
// original inline `neon(url)` call implicitly used — ReturnType<typeof neon>
// resolves an overloaded generic function differently and produces a wider,
// non-iterable union type that breaks `const [row] = await sql\`...\`` calls.
type SqlClient = NeonQueryFunction<false, false>

let client: SqlClient | null = null

function getClient(): SqlClient {
  if (!client) {
    client = neon(process.env.DATABASE_URL!)
  }
  return client
}

// Lazy proxy: neon() (and the DATABASE_URL it requires) is only constructed
// on the first real query, not at module import time. Next.js evaluates API
// route modules during build-time page-data collection, so a top-level
// neon() call here would crash the entire production build if DATABASE_URL
// isn't present in that build environment — mirrors the getResend() pattern
// in lib/resend.ts for the same reason.
export const sql: SqlClient = new Proxy((() => {}) as unknown as SqlClient, {
  apply(_target, thisArg, args) {
    return Reflect.apply(getClient(), thisArg, args)
  },
  get(_target, prop, receiver) {
    return Reflect.get(getClient(), prop, receiver)
  },
})
