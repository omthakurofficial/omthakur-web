import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Create a unique filename
    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    
    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('blog-images') // Make sure this bucket exists in your Supabase storage
      .upload(fileName, buffer, {
        contentType: file.type,
      })

    if (error) {
      console.error('Upload error:', error)
      // Fallback: return a placeholder URL
      return NextResponse.json({
        url: '/placeholder-image.svg',
        message: 'Using placeholder image (upload failed)'
      })
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName)

    return NextResponse.json({
      url: publicUrlData.publicUrl,
      message: 'File uploaded successfully'
    })

  } catch (error) {
    console.error('Upload error:', error)
    // Return placeholder for now
    return NextResponse.json({
      url: '/placeholder-image.svg',
      message: 'Using placeholder image'
    })
  }
}