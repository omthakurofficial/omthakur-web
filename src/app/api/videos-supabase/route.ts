import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('videos')
      .insert([
        {
          title: body.title,
          description: body.description,
          video_url: body.video_url,
          thumbnail_url: body.thumbnail_url,
          category: body.category,
          video_type: body.video_type || 'youtube',
          platform: body.platform || 'YouTube',
          tags: body.tags,
          featured: body.featured || false,
          visible: body.visible !== false,
          metadata: {
            added_via: 'admin_interface',
            ip: request.headers.get('x-forwarded-for') || 'unknown'
          }
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return Response.json({ error: error.message }, { status: 400 })
    }

    return Response.json({ 
      success: true, 
      data: data[0],
      message: 'Video added successfully!'
    })

  } catch (error) {
    console.error('API error:', error)
    return Response.json(
      { error: 'Failed to add video' }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return Response.json({ error: error.message }, { status: 400 })
    }

    return Response.json({ success: true, data })

  } catch (error) {
    console.error('API error:', error)
    return Response.json(
      { error: 'Failed to fetch videos' }, 
      { status: 500 }
    )
  }
}