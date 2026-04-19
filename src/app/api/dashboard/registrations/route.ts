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
    const search = searchParams.get('search') || ''
    const sortBy = searchParams.get('sortBy') || 'registeredAt'
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1

    const collection = await getCollection<any>('registrations')

    const query: any = {}
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { discountCode: { $regex: search, $options: 'i' } },
      ]
    }

    const total = await collection.countDocuments(query)
    const registrations = await collection
      .find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      data: registrations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Registrations fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    )
  }
}
