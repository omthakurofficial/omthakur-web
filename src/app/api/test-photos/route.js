export async function GET() {
  try {
    console.log('Testing simple API endpoint...')
    
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Test endpoint working',
      env_vars: {
        has_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        has_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        url: process.env.NEXT_PUBLIC_SUPABASE_URL
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Test API error:', error)
    return new Response(JSON.stringify({ 
      error: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}