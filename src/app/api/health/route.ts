import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Simple health check
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      database: process.env.DATABASE_URL ? 'configured' : 'not configured',
      supabase: process.env.SUPABASE_URL ? 'configured' : 'not configured'
    }

    return NextResponse.json(healthData)
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      { status: 'error', error: 'Health check failed' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Echo the request back for testing
    return NextResponse.json({
      message: 'Test POST endpoint working',
      received: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test POST error:', error)
    return NextResponse.json(
      { error: 'Invalid JSON or server error' },
      { status: 400 }
    )
  }
}