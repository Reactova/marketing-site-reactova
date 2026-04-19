import { NextRequest, NextResponse } from 'next/server'
import { dashboardConfig } from '@/config/dashboard.config'

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(dashboardConfig.sessionCookieName)?.value
  const email = request.cookies.get('dashboard_email')?.value

  if (!sessionToken || !email) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    )
  }

  return NextResponse.json({
    authenticated: true,
    email,
  })
}
