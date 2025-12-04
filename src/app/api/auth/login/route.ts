import { NextRequest, NextResponse } from 'next/server'
// This route is disabled - using Supabase instead

export async function POST(request: NextRequest) {
  // This route is disabled - implement with Supabase auth instead
  return NextResponse.json(
    { error: 'This endpoint is disabled. Use Supabase Auth instead.' },
    { status: 410 }
  )
}