// Pure Supabase client - no Prisma dependencies
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('Environment check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseKey,
  url: supabaseUrl
})

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    console.log('=== PHOTOS-SUPABASE API START ===')
    
    const { data: photos, error } = await supabase
      .from('photos')
      .select('*')
      .eq('visible', true)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Supabase query error:', error)
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log(`Raw photos from DB: ${photos?.length || 0}`)
    console.log('Sample photo:', photos?.[0])
    
    // Transform the data to match frontend expectations
    const transformedPhotos = photos?.map(photo => ({
      id: photo.id,
      title: photo.title,
      description: photo.description,
      imageUrl: photo.image_url,
      thumbnail: photo.thumbnail || photo.image_url,
      category: photo.category?.toLowerCase() || 'creative',
      tags: Array.isArray(photo.tags) ? photo.tags : [],
      featured: photo.featured || false,
      visible: photo.visible !== false,
      createdAt: photo.created_at,
      likes: 0,
      views: 0
    })) || []
    
    console.log(`Transformed photos: ${transformedPhotos.length}`)
    console.log('Sample transformed:', transformedPhotos?.[0])
    console.log('=== PHOTOS-SUPABASE API END ===')
    
    return new Response(JSON.stringify({ 
      photos: transformedPhotos,
      count: transformedPhotos.length 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Photos-supabase API error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch photos',
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}