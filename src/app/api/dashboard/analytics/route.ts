import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { dashboardConfig } from '@/config/dashboard.config'

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(dashboardConfig.sessionCookieName)?.value

  if (!sessionToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sortBy = searchParams.get('sortBy') || 'startedAt'
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1
    const deviceFilter = searchParams.get('device') || ''
    const convertedFilter = searchParams.get('converted') || ''

    const collection = await getCollection<any>('sessions')

    const query: any = {}
    if (deviceFilter === 'mobile') {
      query['device.isMobile'] = true
    } else if (deviceFilter === 'desktop') {
      query['device.isMobile'] = false
    }
    if (convertedFilter === 'true') {
      query.converted = true
    } else if (convertedFilter === 'false') {
      query.converted = false
    }

    const total = await collection.countDocuments(query)
    const sessions = await collection
      .find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    // Get aggregated stats
    const statsAggregation = await collection.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          avgDuration: { $avg: '$duration' },
          avgScrollDepth: { $avg: '$engagement.scrollDepthMax' },
          totalClicks: { $sum: '$engagement.clickCount' },
          avgClicks: { $avg: '$engagement.clickCount' },
          totalFormInteractions: { $sum: '$engagement.formInteractions' },
        }
      }
    ]).toArray()

    const stats = statsAggregation[0] || {
      avgDuration: 0,
      avgScrollDepth: 0,
      totalClicks: 0,
      avgClicks: 0,
      totalFormInteractions: 0,
    }

    // Get device breakdown
    const deviceBreakdown = await collection.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$device.isMobile',
          count: { $sum: 1 },
        }
      }
    ]).toArray()

    // Get landing page stats
    const landingPageStats = await collection.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$source.landingPage',
          count: { $sum: 1 },
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]).toArray()

    // Get timezone distribution
    const timezoneStats = await collection.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$location.timezone',
          count: { $sum: 1 },
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray()

    return NextResponse.json({
      data: sessions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        ...stats,
        deviceBreakdown: deviceBreakdown.reduce((acc, item) => {
          acc[item._id ? 'mobile' : 'desktop'] = item.count
          return acc
        }, {} as Record<string, number>),
        landingPages: landingPageStats,
        timezones: timezoneStats,
      },
    })
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
