import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    }

    const originalName = file.name || 'cover.jpg'
    const extFromName = originalName.split('.').pop()?.toLowerCase()
    const ext = extFromName && extFromName.length <= 5 ? extFromName : 'jpg'
    const path = `courses/${crypto.randomUUID()}.${ext}`

    const bytes = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await supabase.storage
      .from('content-images')
      .upload(path, bytes, {
        contentType: file.type || 'image/jpeg',
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('[cover-upload] uploadError', uploadError)
      return NextResponse.json(
        { error: 'Upload failed' },
        { status: 500 },
      )
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/content-images/${path}`

    return NextResponse.json({ url: publicUrl })
  } catch (err) {
    console.error('[cover-upload] unexpected error', err)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}

