import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  try {
    console.log('Fetching videos from Supabase...')
    
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*')
      .eq('visible', true)
      .order('created_at', { ascending: false })
      .limit(20)

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
      // Check if YouTube ID is valid (11 characters, alphanumeric)
      const isValidYouTubeId = video.youtube_id && /^[a-zA-Z0-9_-]{11}$/.test(video.youtube_id)
      
      // Generate appropriate thumbnail and video URLs
      let thumbnailUrl, videoUrl
      
      if (isValidYouTubeId) {
        thumbnailUrl = video.thumbnail || `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`
        videoUrl = `https://www.youtube.com/watch?v=${video.youtube_id}`
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
        youtubeId: video.youtube_id,
        duration: video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : '0:00',
        category: video.category?.toLowerCase() || 'tech',
        tags: video.tags || [],
        featured: video.featured || false,
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
    console.error('Videos API error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch videos',
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}