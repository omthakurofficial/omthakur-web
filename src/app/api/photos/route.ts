import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
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

    const [photos, totalCount] = await Promise.all([
      db.photo.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      db.photo.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      photos,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Get photos error:', error)
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
      imageUrl,
      thumbnail,
      category = 'CREATIVE',
      tags = [],
      featured = false,
      visible = true
    } = body

    const photo = await db.photo.create({
      data: {
        title,
        description,
        imageUrl,
        thumbnail,
        category,
        tags,
        featured,
        visible
      }
    })

    return NextResponse.json(photo, { status: 201 })
  } catch (error) {
    console.error('Create photo error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}