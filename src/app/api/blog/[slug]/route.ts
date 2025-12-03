import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSlug, calculateReadingTime } from '@/lib/utils'

interface Props {
  params: {
    slug: string
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { slug } = params

    const post = await db.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true
          }
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true
          }
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true
          }
        },
        comments: {
          where: { approved: true },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true
              }
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                    avatar: true
                  }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            likes: true,
            comments: {
              where: { approved: true }
            }
          }
        }
      }
    })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await db.post.update({
      where: { slug },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Get post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { slug } = params
    const body = await request.json()
    const {
      title,
      content,
      excerpt,
      coverImage,
      categoryId,
      tags,
      published,
      featured,
      metaTitle,
      metaDescription,
      metaKeywords,
      ogImage
    } = body

    const newSlug = title ? createSlug(title) : undefined
    const readingTime = content ? calculateReadingTime(content) : undefined

    // Create or connect tags
    const tagConnections = tags ? tags.map((tagName: string) => ({
      where: { slug: createSlug(tagName) },
      create: {
        name: tagName,
        slug: createSlug(tagName)
      }
    })) : undefined

    const updateData: any = {}
    
    if (title) updateData.title = title
    if (newSlug) updateData.slug = newSlug
    if (content) updateData.content = content
    if (excerpt !== undefined) updateData.excerpt = excerpt
    if (coverImage !== undefined) updateData.coverImage = coverImage
    if (published !== undefined) {
      updateData.published = published
      updateData.publishedAt = published ? new Date() : null
    }
    if (featured !== undefined) updateData.featured = featured
    if (readingTime) updateData.readingTime = readingTime
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription
    if (metaKeywords !== undefined) updateData.metaKeywords = metaKeywords
    if (ogImage !== undefined) updateData.ogImage = ogImage
    
    if (categoryId !== undefined) {
      updateData.category = categoryId ? { connect: { id: categoryId } } : { disconnect: true }
    }
    
    if (tagConnections) {
      // Clear existing tags and set new ones
      updateData.tags = {
        set: [],
        connectOrCreate: tagConnections
      }
    }

    const post = await db.post.update({
      where: { slug },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true
          }
        },
        category: true,
        tags: true
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Update post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { slug } = params

    await db.post.delete({
      where: { slug }
    })

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}