import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { TEAM_CODES } from '@/lib/teamCodes'

export async function GET() {
  try {
    const collection = await getCollection<any>('creator_applications')

    // Aggregate signups grouped by utm_source
    const results = await collection
      .aggregate([
        {
          $group: {
            _id: '$source.utmSource',
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()

    // Build per-person stats, filling 0 for anyone with no signups yet
    const stats = Object.entries(TEAM_CODES).map(([code, name]) => {
      const match = results.find((r) => r._id === code)
      return {
        name,
        code,
        count: match?.count ?? 0,
        url: `https://reactova.com/creators-program?utm_source=${code}`,
      }
    })

    // Sort by count descending (leaderboard order)
    stats.sort((a, b) => b.count - a.count)

    const total = stats.reduce((sum, s) => sum + s.count, 0)

    return NextResponse.json({ stats, total })
  } catch (error) {
    console.error('Failed to get invite stats:', error)
    return NextResponse.json({ error: 'Failed to get invite stats' }, { status: 500 })
  }
}
