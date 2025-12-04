import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const photo = await db.photo.findUnique({
      where: { id: params.id }
    })

    if (!photo) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(photo)
  } catch (error) {
    console.error('Get photo error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      imageUrl,
      thumbnail,
      category,
      tags,
      featured,
      visible
    } = body

    const photo = await db.photo.update({
      where: { id: params.id },
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

    return NextResponse.json(photo)
  } catch (error) {
    console.error('Update photo error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.photo.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Photo deleted successfully' })
  } catch (error) {
    console.error('Delete photo error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}