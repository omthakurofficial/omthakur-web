import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// GET - Read posts from database - support individual post fetching
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const includeAll = searchParams.get('all') === 'true'
    const postId = searchParams.get('id')
    
    // If requesting individual post
    if (postId) {
      const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single()

      if (error) {
        console.error('Database error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }

      return NextResponse.json({ post })
    }
    
    // Build query - if includeAll is true, get both published and unpublished
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(limit)

    // Only filter by published if not requesting all posts
    if (!includeAll) {
      query = query.eq('published', true)
    }

    const { data: posts, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      posts: posts || [],
      total: count || 0,
      message: `Found ${posts?.length || 0} posts in database`
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
  }
}

// POST - Create new post in database
export async function POST(request) {
  try {
    const body = await request.json()
    const { 
      title, 
      content, 
      excerpt, 
      published = false, 
      featured = false
    } = body

    // Create slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    // Real database insert - only use fields that exist in the database
    const { data: newPost, error } = await supabase
      .from('posts')
      .insert([{
        title,
        slug,
        content,
        excerpt,
        published,
        featured: featured || false
      }])
      .select()
      .single()

    if (error) {
      console.error('Insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      post: newPost,
      message: 'Post created successfully in database!'
    }, { status: 201 })
  } catch (error) {
    console.error('Create error:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

// PUT - Update post in database
export async function PUT(request) {
  try {
    const body = await request.json()
    const { 
      id, 
      title, 
      content, 
      excerpt, 
      published, 
      featured
    } = body

    const updateData = {
      title,
      content,
      excerpt,
      published,
      updated_at: new Date()
    }

    // Only add optional fields if they are provided
    if (featured !== undefined) updateData.featured = featured

    const { data: updatedPost, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      post: updatedPost,
      message: 'Post updated successfully!'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

// DELETE - Delete post from database
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Post deleted successfully!' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}