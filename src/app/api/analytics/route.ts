import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { VisitorSession, AnalyticsPayload } from '@/lib/types'

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const payload: AnalyticsPayload = await request.json()
    const { visitorId, sessionId, type, device, source, engagement, events } = payload

    if (!visitorId || !sessionId) {
      return NextResponse.json(
        { error: 'visitorId and sessionId are required' },
        { status: 400 }
      )
    }

    const collection = await getCollection<any>('sessions')
    const clientIP = getClientIP(request)

    if (type === 'session_start') {
      const existingSession = await collection.findOne({ sessionId })
      
      if (!existingSession) {
        const session: VisitorSession = {
          visitorId,
          sessionId,
          startedAt: new Date(),
          duration: 0,
          device: {
            userAgent: device?.userAgent || request.headers.get('user-agent') || '',
            platform: device?.platform || '',
            language: device?.language || '',
            screenWidth: device?.screenWidth || 0,
            screenHeight: device?.screenHeight || 0,
            isMobile: device?.isMobile || false,
            touchSupport: device?.touchSupport || false,
          },
          source: {
            referrer: source?.referrer || null,
            utmSource: source?.utmSource || null,
            utmMedium: source?.utmMedium || null,
            utmCampaign: source?.utmCampaign || null,
            landingPage: source?.landingPage || '/',
          },
          location: {
            ip: clientIP,
            timezone: device?.timezone,
          },
          engagement: {
            scrollDepthMax: 0,
            clickCount: 0,
            mouseMovements: 0,
            touchEvents: 0,
            formInteractions: 0,
            timeOnPage: 0,
          },
          events: events || [],
          converted: false,
        }

        await collection.insertOne(session as any)
      }
    } else if (type === 'session_update' || type === 'session_end') {
      const updateData: Record<string, unknown> = {
        'engagement.scrollDepthMax': engagement?.scrollDepthMax || 0,
        'engagement.clickCount': engagement?.clickCount || 0,
        'engagement.mouseMovements': engagement?.mouseMovements || 0,
        'engagement.touchEvents': engagement?.touchEvents || 0,
        'engagement.formInteractions': engagement?.formInteractions || 0,
        'engagement.timeOnPage': engagement?.timeOnPage || 0,
        duration: engagement?.timeOnPage || 0,
      }

      if (type === 'session_end') {
        updateData.endedAt = new Date()
      }

      await collection.updateOne(
        { sessionId },
        {
          $set: updateData,
          $push: { events: { $each: events || [] } } as any,
        }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to process analytics' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { sessionId, visitorId } = await request.json()

    if (!sessionId || !visitorId) {
      return NextResponse.json(
        { error: 'sessionId and visitorId are required' },
        { status: 400 }
      )
    }

    const collection = await getCollection<any>('sessions')

    await collection.updateOne(
      { sessionId, visitorId },
      { $set: { converted: true } }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics conversion error:', error)
    return NextResponse.json(
      { error: 'Failed to mark conversion' },
      { status: 500 }
    )
  }
}
