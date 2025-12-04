// Individual photo operations API route
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request, { params }) {
  try {
    const { id } = params

    const { data: photo, error } = await supabase
      .from('photos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Transform response
    const transformedPhoto = {
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
    }

    return new Response(JSON.stringify(transformedPhoto), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Get photo error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to get photo',
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    console.log('Deleting photo:', id)

    const { error } = await supabase
      .from('photos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase delete error:', error)
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('Photo deleted successfully:', id)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Delete photo error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to delete photo',
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    console.log('Updating photo:', id, body)

    const { data: photo, error } = await supabase
      .from('photos')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase update error:', error)
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    console.log('Photo updated successfully:', photo.id)

    // Transform response
    const transformedPhoto = {
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
    }

    return new Response(JSON.stringify(transformedPhoto), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Update photo error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to update photo',
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}