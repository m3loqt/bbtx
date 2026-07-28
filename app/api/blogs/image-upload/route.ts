import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    }

    const originalName = file.name || 'image.jpg'
    const extFromName = originalName.split('.').pop()?.toLowerCase()
    const ext = extFromName && extFromName.length <= 5 ? extFromName : 'jpg'
    const path = `blogs/${crypto.randomUUID()}.${ext}`

    const blob = await put(path, file, {
      access: 'public',
      contentType: file.type || 'image/jpeg',
      addRandomSuffix: false,
    })

    return NextResponse.json({ url: blob.url })
  } catch (err) {
    console.error('[blogs/image-upload] unexpected error', err)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
