import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { dashboardConfig } from '@/config/dashboard.config'
import type { DashboardOverview } from '@/lib/types/dashboard'

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(dashboardConfig.sessionCookieName)?.value

  if (!sessionToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const registrations = await getCollection<any>('registrations')
    const creators = await getCollection<any>('creator_applications')
    const sessions = await getCollection<any>('sessions')

    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Registration stats
    const totalRegistrations = await registrations.countDocuments()
    const emailsSent = await registrations.countDocuments({ emailSent: true })
    const tier1Count = await registrations.countDocuments({ spotNumber: { $lte: 15 } })
    const tier2Count = await registrations.countDocuments({ 
      spotNumber: { $gt: 15, $lte: 30 } 
    })
    const tier3Count = await registrations.countDocuments({ spotNumber: { $gt: 30 } })
    const registrationsTodayCount = await registrations.countDocuments({
      registeredAt: { $gte: todayStart }
    })
    const registrationsWeekCount = await registrations.countDocuments({
      registeredAt: { $gte: weekStart }
    })

    // Creator stats
    const totalCreators = await creators.countDocuments()
    const pendingCreators = await creators.countDocuments({ status: 'pending' })
    const approvedCreators = await creators.countDocuments({ status: 'approved' })
    const rejectedCreators = await creators.countDocuments({ status: 'rejected' })
    const waitlistedCreators = await creators.countDocuments({ status: 'waitlisted' })
    const creatorsTodayCount = await creators.countDocuments({
      appliedAt: { $gte: todayStart }
    })

    // Analytics stats
    const totalSessions = await sessions.countDocuments()
    const uniqueVisitors = await sessions.distinct('visitorId')
    
    const clicksAggregation = await sessions.aggregate([
      {
        $group: {
          _id: null,
          totalClicks: { $sum: '$engagement.clickCount' },
          totalDuration: { $sum: '$duration' },
          mobileCount: {
            $sum: { $cond: ['$device.isMobile', 1, 0] }
          },
          desktopCount: {
            $sum: { $cond: ['$device.isMobile', 0, 1] }
          },
          convertedCount: {
            $sum: { $cond: ['$converted', 1, 0] }
          }
        }
      }
    ]).toArray()

    const analyticsData = clicksAggregation[0] || {
      totalClicks: 0,
      totalDuration: 0,
      mobileCount: 0,
      desktopCount: 0,
      convertedCount: 0,
    }

    const overview: DashboardOverview = {
      registrations: {
        total: totalRegistrations,
        emailsSent,
        tier1Count,
        tier2Count,
        tier3Count,
        todayCount: registrationsTodayCount,
        weekCount: registrationsWeekCount,
      },
      creators: {
        total: totalCreators,
        pending: pendingCreators,
        approved: approvedCreators,
        rejected: rejectedCreators,
        waitlisted: waitlistedCreators,
        todayCount: creatorsTodayCount,
      },
      analytics: {
        totalSessions,
        totalVisitors: uniqueVisitors.length,
        totalClicks: analyticsData.totalClicks,
        avgSessionDuration: totalSessions > 0 
          ? Math.round(analyticsData.totalDuration / totalSessions) 
          : 0,
        mobileUsers: analyticsData.mobileCount,
        desktopUsers: analyticsData.desktopCount,
        conversionRate: totalSessions > 0 
          ? (analyticsData.convertedCount / totalSessions) * 100 
          : 0,
      },
    }

    return NextResponse.json(overview)
  } catch (error) {
    console.error('Dashboard overview error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
