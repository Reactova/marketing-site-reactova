import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('dashboard_session')?.value

  // Check if it's the login page (route group doesn't affect URL)
  const isLoginPage = pathname === '/dashboard/login'

  // If accessing login page with session, redirect to dashboard
  if (isLoginPage && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If accessing any dashboard route (except login) without session, redirect to login
  if (pathname.startsWith('/dashboard') && !isLoginPage && !sessionToken) {
    const loginUrl = new URL('/dashboard/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
