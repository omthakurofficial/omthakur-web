import { NextRequest, NextResponse } from 'next/server'
// This route is disabled - using Supabase instead

interface Props {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  // This route is disabled - use /api/photos-supabase/[id] instead
  return NextResponse.json(
    { error: 'This endpoint is disabled. Use /api/photos-supabase/[id] instead.' },
    { status: 410 }
  )
}

export async function PUT(request: NextRequest, { params }: Props) {
  // This route is disabled - use /api/photos-supabase/[id] instead
  return NextResponse.json(
    { error: 'This endpoint is disabled. Use /api/photos-supabase/[id] instead.' },
    { status: 410 }
  )
}

export async function DELETE(request: NextRequest, { params }: Props) {
  // This route is disabled - use /api/photos-supabase/[id] instead
  return NextResponse.json(
    { error: 'This endpoint is disabled. Use /api/photos-supabase/[id] instead.' },
    { status: 410 }
  )
}