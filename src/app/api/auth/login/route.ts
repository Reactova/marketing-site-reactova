import { NextRequest, NextResponse } from 'next/server'
import { validateCredentials, generateSessionToken } from '@/lib/auth'
import { dashboardConfig } from '@/config/dashboard.config'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const isValid = await validateCredentials(email, password)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const sessionToken = generateSessionToken()
    const expiresAt = new Date(Date.now() + dashboardConfig.sessionDuration)

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
    })

    response.cookies.set(dashboardConfig.sessionCookieName, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    })

    response.cookies.set('dashboard_email', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Failed to process login' },
      { status: 500 }
    )
  }
}
