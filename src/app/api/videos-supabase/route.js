import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  try {
    console.log('Fetching videos from Supabase...')
    
    // Check if this is an admin request by looking for admin in the URL or headers
    const url = new URL(request.url)
    const isAdminRequest = request.headers.get('referer')?.includes('/admin') || 
                          url.searchParams.get('admin') === 'true'
    
    let query = supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50) // Increase limit for admin
    
    // For public requests, only show visible videos
    if (!isAdminRequest) {
      query = query.eq('visible', true).limit(20)
    }

    const { data: videos, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log(`Found ${videos?.length || 0} videos`)
    
    // Transform data to match expected interface
    const transformedVideos = videos?.map(video => {
      // Extract YouTube ID from youtube_id field - it might be a full URL or just the ID
      let youtubeId = video.youtube_id
      if (youtubeId && youtubeId.includes('youtu')) {
        // Extract ID from various YouTube URL formats
        const match = youtubeId.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
        youtubeId = match ? match[1] : youtubeId
      }
      
      // Check if YouTube ID is valid (11 characters, alphanumeric)
      const isValidYouTubeId = youtubeId && /^[a-zA-Z0-9_-]{11}$/.test(youtubeId)
      
      // Generate appropriate thumbnail and video URLs
      let thumbnailUrl, videoUrl
      
      if (isValidYouTubeId) {
        thumbnailUrl = video.thumbnail || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
        videoUrl = `https://www.youtube.com/watch?v=${youtubeId}`
      } else {
        // Use fallback thumbnails for invalid/mock YouTube IDs
        const fallbackThumbnails = [
          'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=480&h=360&fit=crop', // Tech/DevOps
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=480&h=360&fit=crop', // Programming
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=480&h=360&fit=crop', // Tutorial
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=480&h=360&fit=crop', // AWS/Cloud
          'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=480&h=360&fit=crop'  // General tech
        ]
        
        // Pick thumbnail based on title content
        if (video.title.toLowerCase().includes('aws')) {
          thumbnailUrl = fallbackThumbnails[3]
        } else if (video.title.toLowerCase().includes('docker')) {
          thumbnailUrl = fallbackThumbnails[1]
        } else if (video.title.toLowerCase().includes('tutorial')) {
          thumbnailUrl = fallbackThumbnails[2]
        } else {
          thumbnailUrl = fallbackThumbnails[0]
        }
        
        videoUrl = video.thumbnail || '' // Use stored URL if available
      }
      
      return {
        id: video.id,
        title: video.title,
        description: video.description,
        videoUrl: videoUrl,
        thumbnail: thumbnailUrl,
        youtubeId: youtubeId,
        duration: video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : '0:00',
        category: video.category?.toLowerCase() || 'tech',
        tags: video.tags || [],
        featured: video.featured || false,
        visible: video.visible !== false,
        createdAt: video.created_at,
        likes: Math.floor(Math.random() * 1000), // Mock data for now
        views: video.views || Math.floor(Math.random() * 10000)
      }
    }) || []
    
    return new Response(JSON.stringify({ 
      videos: transformedVideos,
      count: transformedVideos.length 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Videos-supabase API error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch videos',
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// Helper function to extract YouTube ID from various URL formats
function extractYouTubeId(url) {
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

// Helper function to get YouTube video metadata (simplified - in production use YouTube Data API)
async function getYouTubeMetadata(youtubeId) {
  try {
    // For now, return basic info - you can enhance this with YouTube Data API
    return {
      title: `YouTube Video ${youtubeId}`,
      description: 'Imported from YouTube',
      duration: null, // Would need YouTube API for actual duration
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    }
  } catch (error) {
    console.error('Error getting YouTube metadata:', error)
    return {
      title: `YouTube Video`,
      description: 'Imported from YouTube',
      duration: null,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    }
  }
}

export async function POST(request) {
  try {
    console.log('=== VIDEOS-SUPABASE CREATE API START ===')
    const body = await request.json()
    
    let {
      title,
      description,
      youtube_url,
      youtubeId,
      category = 'TECH',
      tags = [],
      featured = false,
      visible = true
    } = body

    // Extract YouTube ID from URL if provided
    if (youtube_url && !youtubeId) {
      youtubeId = extractYouTubeId(youtube_url)
    }
    
    if (!youtubeId) {
      return new Response(JSON.stringify({ error: 'Valid YouTube URL or ID is required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get YouTube metadata if title is not provided
    if (!title) {
      const metadata = await getYouTubeMetadata(youtubeId)
      title = metadata.title
      if (!description) description = metadata.description
    }

    console.log('Creating video with data:', { title, youtubeId, category, featured, visible })

    const { data: video, error } = await supabase
      .from('videos')
      .insert([{
        title,
        description,
        youtube_id: youtubeId,
        thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        category: category.toUpperCase(),
        tags,
        featured,
        visible,
        duration: null // Could be fetched from YouTube API
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('Video created successfully:', video.id)
    console.log('=== VIDEOS-SUPABASE CREATE API END ===')

    // Transform response to match frontend expectations
    const transformedVideo = {
      id: video.id,
      title: video.title,
      description: video.description,
      videoUrl: `https://www.youtube.com/watch?v=${video.youtube_id}`,
      thumbnail: video.thumbnail,
      youtubeId: video.youtube_id,
      duration: video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : '0:00',
      category: video.category?.toLowerCase() || 'tech',
      tags: video.tags || [],
      featured: video.featured || false,
      visible: video.visible !== false,
      createdAt: video.created_at,
      likes: 0,
      views: 0
    }

    return new Response(JSON.stringify(transformedVideo), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Videos-supabase CREATE API error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to create video',
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}