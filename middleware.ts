import { NextResponse, type NextRequest } from 'next/server'
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/admin/session'

// Matches junk paths like /companies-nobg/lum.png-3 or /companies/g-4 — a
// trailing "-<digits>" suffix that no real file in either folder ever has.
// These 404 today; serving 410 instead tells Google they're permanently gone
// rather than something to keep periodically re-crawling.
const JUNK_COMPANY_ASSET = /^\/companies(-nobg)?\/.+-\d+$/

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (JUNK_COMPANY_ASSET.test(pathname)) {
    return new NextResponse('Gone', { status: 410 })
  }

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
  const session = token ? await verifySessionToken(token) : null
  const isLoginPage = pathname === '/admin/login'

  if (!session && !isLoginPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  if (session && isLoginPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/companies/:path*', '/companies-nobg/:path*'],
}
