import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { sendCreatorsEmail } from '@/lib/email/index'
import { CreatorApplication, FollowerRange, ContentNiche } from '@/lib/types'

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown'
}

function validateInstagramUsername(username: string): boolean {
  const cleaned = username.replace(/^@/, '').trim()
  return /^[a-zA-Z0-9._]{1,30}$/.test(cleaned)
}

function cleanInstagramUsername(username: string): string {
  return username.replace(/^@/, '').trim().toLowerCase()
}

function validateInstagramUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/.test(url)
}

const VALID_FOLLOWER_RANGES: FollowerRange[] = ['under5k', '5k-10k', '10k-50k', '50k-100k', '100k+']
const VALID_NICHES: ContentNiche[] = [
  'fitness', 'business', 'marketing', 'education', 'tech',
  'lifestyle', 'fashion', 'food', 'travel', 'other'
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      instagramUsername,
      instagramUrl,
      followerRange,
      contentNiche,
      otherNiche,
      asksForComments,
      whyJoin,
      device,
      source,
    } = body

    if (!name || !email || !instagramUsername || !followerRange || !contentNiche) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!validateInstagramUsername(instagramUsername)) {
      return NextResponse.json(
        { error: 'Please enter a valid Instagram username' },
        { status: 400 }
      )
    }

    if (instagramUrl && !validateInstagramUrl(instagramUrl)) {
      return NextResponse.json(
        { error: 'Please enter a valid Instagram profile URL' },
        { status: 400 }
      )
    }

    if (!VALID_FOLLOWER_RANGES.includes(followerRange)) {
      return NextResponse.json(
        { error: 'Please select a valid follower range' },
        { status: 400 }
      )
    }

    if (!VALID_NICHES.includes(contentNiche)) {
      return NextResponse.json(
        { error: 'Please select a valid content niche' },
        { status: 400 }
      )
    }

    if (contentNiche === 'other' && (!otherNiche || otherNiche.trim().length < 2)) {
      return NextResponse.json(
        { error: 'Please specify your content niche' },
        { status: 400 }
      )
    }

    const collection = await getCollection<any>('creator_applications')
    const cleanedUsername = cleanInstagramUsername(instagramUsername)

    const existingByEmail = await collection.findOne({ email: email.toLowerCase() })
    if (existingByEmail) {
      return NextResponse.json(
        { error: 'This email has already applied to the Creators Program', alreadyApplied: true },
        { status: 409 }
      )
    }

    const existingByUsername = await collection.findOne({ instagramUsername: cleanedUsername })
    if (existingByUsername) {
      return NextResponse.json(
        { error: 'This Instagram account has already applied', alreadyApplied: true },
        { status: 409 }
      )
    }

    const clientIP = getClientIP(request)

    const application: CreatorApplication = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      instagramUsername: cleanedUsername,
      instagramUrl: instagramUrl || `https://instagram.com/${cleanedUsername}`,
      followerRange,
      contentNiche,
      otherNiche: contentNiche === 'other' ? otherNiche?.trim() : undefined,
      asksForComments: Boolean(asksForComments),
      whyJoin: whyJoin?.trim() || '',
      appliedAt: new Date(),
      status: 'pending',
      emailSent: false,
      source: {
        referrer: source?.referrer || null,
        utmSource: source?.utmSource || null,
        utmMedium: source?.utmMedium || null,
        utmCampaign: source?.utmCampaign || null,
      },
      device: {
        userAgent: device?.userAgent || request.headers.get('user-agent') || '',
        platform: device?.platform || '',
        language: device?.language || '',
        screenWidth: device?.screenWidth || 0,
        screenHeight: device?.screenHeight || 0,
        isMobile: device?.isMobile || false,
      },
      location: {
        ip: clientIP,
        timezone: device?.timezone || undefined,
      },
    }

    const result = await collection.insertOne(application as any)

    const emailResult = await sendCreatorsEmail({
      name: application.name,
      email: application.email,
      instagramUsername: application.instagramUsername,
    })

    if (emailResult.success) {
      await collection.updateOne(
        { _id: result.insertedId },
        { $set: { emailSent: true } }
      )
    }

    const totalApplications = await collection.countDocuments()

    return NextResponse.json({
      success: true,
      applicationNumber: totalApplications,
      emailSent: emailResult.success,
    })
  } catch (error) {
    console.error('Creator application error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const collection = await getCollection<any>('creator_applications')
    
    const total = await collection.countDocuments()
    const pending = await collection.countDocuments({ status: 'pending' })
    const approved = await collection.countDocuments({ status: 'approved' })

    return NextResponse.json({
      total,
      pending,
      approved,
      spotsRemaining: Math.max(0, 50 - approved),
    })
  } catch (error) {
    console.error('Failed to get creator stats:', error)
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    )
  }
}
