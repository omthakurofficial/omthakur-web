import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET() {
  try {
    console.log('Testing Supabase connection...')
    
    // Try to connect and get database info
    const { data, error } = await supabase
      .from('posts')
      .select('count(*)', { count: 'exact' })
      .limit(1)

    if (error) {
      console.error('Supabase connection error:', error)
      return new Response(JSON.stringify({ 
        error: 'Supabase connection failed',
        details: error.message 
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ 
      status: 'Connected to Supabase successfully!',
      posts_count: data?.length || 0,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Supabase test error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to test Supabase connection',
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}