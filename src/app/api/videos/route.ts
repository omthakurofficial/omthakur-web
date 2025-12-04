import { NextRequest, NextResponse } from 'next/server'
// This route is disabled - using Supabase instead

export async function GET(request: NextRequest) {
  // This route is disabled - use /api/videos-supabase instead
  return NextResponse.json(
    { error: 'This endpoint is disabled. Use /api/videos-supabase instead.' },
    { status: 410 }
  )
}

export async function POST(request: NextRequest) {
  // This route is disabled - use /api/videos-supabase instead
  return NextResponse.json(
    { error: 'This endpoint is disabled. Use /api/videos-supabase instead.' },
    { status: 410 }
  )
}