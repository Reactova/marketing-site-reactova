import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { dashboardConfig } from '@/config/dashboard.config'
import { ObjectId } from 'mongodb'

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
    const status = searchParams.get('status') || ''
    const sortBy = searchParams.get('sortBy') || 'appliedAt'
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1

    const collection = await getCollection<any>('creators')

    const query: any = {}
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { instagramUsername: { $regex: search, $options: 'i' } },
      ]
    }
    if (status) {
      query.status = status
    }

    const total = await collection.countDocuments(query)
    const creators = await collection
      .find(query)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      data: creators,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Creators fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch creators' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  const sessionToken = request.cookies.get(dashboardConfig.sessionCookieName)?.value

  if (!sessionToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, status, reviewNotes } = await request.json()

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      )
    }

    const collection = await getCollection<any>('creators')

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          reviewNotes,
          reviewedAt: new Date(),
        },
      }
    )

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'Creator not found' },
        { status: 404 }
      )
    }

    // If approved, send the email
    if (status === 'approved') {
      try {
        const creator = await collection.findOne({ _id: new ObjectId(id) })
        if (creator) {
          const { sendCreatorsEmail } = await import('@/lib/email')
          await sendCreatorsEmail({
            email: creator.email,
            name: creator.name,
            instagramUsername: creator.instagramUsername,
          })
        }
      } catch (emailError) {
        console.error('Failed to send approval email:', emailError)
        // We don't fail the whole request if email fails, but maybe log it
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Creator update error:', error)
    return NextResponse.json(
      { error: 'Failed to update creator' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get(dashboardConfig.sessionCookieName)?.value

  if (!sessionToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, action } = await request.json()

    if (action === 'resend-email') {
      const collection = await getCollection<any>('creators')
      const creator = await collection.findOne({ _id: new ObjectId(id) })

      if (!creator) {
        return NextResponse.json({ error: 'Creator not found' }, { status: 404 })
      }

      const { sendCreatorsEmail } = await import('@/lib/email')
      await sendCreatorsEmail({
        email: creator.email,
        name: creator.name,
        instagramUsername: creator.instagramUsername,
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Resend email error:', error)
    return NextResponse.json(
      { error: 'Failed to resend email' },
      { status: 500 }
    )
  }
}
