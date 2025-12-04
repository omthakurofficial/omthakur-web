import { NextRequest, NextResponse } from 'next/server'
// This route is disabled - using Supabase instead

export async function GET(request: NextRequest) {
  // This route is disabled - use /api/photos-supabase instead
  return NextResponse.json(
    { error: 'This endpoint is disabled. Use /api/photos-supabase instead.' },
    { status: 410 }
  )
}

export async function POST(request: NextRequest) {
  // This route is disabled - use /api/photos-supabase instead
  return NextResponse.json(
    { error: 'This endpoint is disabled. Use /api/photos-supabase instead.' },
    { status: 410 }
  )
}