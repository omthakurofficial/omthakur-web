import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { extractYouTubeId } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'
    
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = { visible: true }
    
    if (category) {
      where.category = category.toUpperCase()
    }
    
    if (featured) {
      where.featured = true
    }

    const [videos, totalCount] = await Promise.all([
      db.video.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      db.video.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      videos,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Get videos error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      youtubeUrl,
      category = 'TECH',
      tags = [],
      featured = false,
      visible = true,
      duration
    } = body

    const youtubeId = extractYouTubeId(youtubeUrl)
    if (!youtubeId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      )
    }

    // Generate thumbnail URL from YouTube
    const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`

    const video = await db.video.create({
      data: {
        title,
        description,
        youtubeId,
        thumbnail,
        category,
        tags,
        featured,
        visible,
        duration
      }
    })

    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error('Create video error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}