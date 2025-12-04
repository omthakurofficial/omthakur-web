import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to extract YouTube ID from various URL formats
function extractYouTubeId(url: string) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/  // Direct ID
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
}

// Data transformation helper
const transformVideoFromDB = (video: any) => ({
  id: video.id,
  title: video.title,
  description: video.description,
  youtube_url: video.youtube_id ? `https://www.youtube.com/watch?v=${video.youtube_id}` : '',
  youtubeId: video.youtube_id,
  thumbnail: video.thumbnail || `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`,
  category: video.category,
  tags: video.tags || [],
  featured: video.featured,
  visible: video.visible,
  duration: video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : '0:00',
  createdAt: video.created_at,
  updatedAt: video.updated_at,
  views: video.views || 0,
  likes: video.likes || 0
})

// GET /api/videos-supabase/[id] - Get video by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    return NextResponse.json(transformVideoFromDB(data))
  } catch (error) {
    console.error('Error fetching video:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    )
  }
}

// PATCH /api/videos-supabase/[id] - Update video
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { 
      title, 
      description, 
      youtube_url, 
      youtubeId, 
      thumbnail, 
      category, 
      tags, 
      featured, 
      visible 
    } = body

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Extract YouTube ID if URL is provided
    let finalYouTubeId = youtubeId
    if (youtube_url && !finalYouTubeId) {
      finalYouTubeId = extractYouTubeId(youtube_url)
    }

    if (!finalYouTubeId) {
      return NextResponse.json({ error: 'Valid YouTube URL or ID is required' }, { status: 400 })
    }

    // Update video in database
    const { data, error } = await supabase
      .from('videos')
      .update({
        title: title.trim(),
        description: description?.trim() || null,
        youtube_id: finalYouTubeId,
        thumbnail: thumbnail || `https://img.youtube.com/vi/${finalYouTubeId}/hqdefault.jpg`,
        category: category || 'TECH',
        tags: Array.isArray(tags) ? tags : [],
        featured: Boolean(featured),
        visible: visible !== false,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Video updated successfully',
      video: transformVideoFromDB(data)
    })
  } catch (error) {
    console.error('Error updating video:', error)
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    )
  }
}

// DELETE /api/videos-supabase/[id] - Delete video
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('videos')
      .delete()
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Video deleted successfully',
      video: transformVideoFromDB(data)
    })
  } catch (error) {
    console.error('Error deleting video:', error)
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    )
  }
}