import { NextResponse } from 'next/server'
import { dashboardConfig } from '@/config/dashboard.config'

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  })

  response.cookies.delete(dashboardConfig.sessionCookieName)
  response.cookies.delete('dashboard_email')

  return response
}
