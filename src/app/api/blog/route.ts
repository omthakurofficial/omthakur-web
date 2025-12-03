import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSlug, calculateReadingTime } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured') === 'true'
    
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = { published: true }
    
    if (category) {
      where.category = {
        slug: category
      }
    }
    
    if (tag) {
      where.tags = {
        some: {
          slug: tag.toLowerCase()
        }
      }
    }
    
    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          content: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ]
    }
    
    if (featured) {
      where.featured = true
    }

    const [posts, totalCount] = await Promise.all([
      db.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
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
          _count: {
            select: {
              likes: true,
              comments: {
                where: { approved: true }
              }
            }
          }
        }
      }),
      db.post.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Get posts error:', error)
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
      content,
      excerpt,
      coverImage,
      categoryId,
      tags,
      published = false,
      featured = false,
      metaTitle,
      metaDescription,
      metaKeywords,
      ogImage
    } = body

    // For now, we'll use a hardcoded author ID
    // In a real app, this would come from the authenticated user
    const authorId = 'admin-user-id'

    const slug = createSlug(title)
    const readingTime = calculateReadingTime(content)

    // Create or connect tags
    const tagConnections = tags ? tags.map((tagName: string) => ({
      where: { slug: createSlug(tagName) },
      create: {
        name: tagName,
        slug: createSlug(tagName)
      }
    })) : []

    const post = await db.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        published,
        featured,
        readingTime,
        publishedAt: published ? new Date() : null,
        metaTitle,
        metaDescription,
        metaKeywords,
        ogImage,
        author: {
          connect: { id: authorId }
        },
        category: categoryId ? {
          connect: { id: categoryId }
        } : undefined,
        tags: tagConnections.length > 0 ? {
          connectOrCreate: tagConnections
        } : undefined
      },
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

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}