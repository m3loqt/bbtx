import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export const runtime = 'nodejs'

const MAX_PDF_BYTES = 25 * 1024 * 1024 // 25MB
const MAX_COVER_BYTES = 8 * 1024 * 1024 // 8MB

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const kind = formData.get('kind') === 'pdf' ? 'pdf' : 'cover'

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    }

    if (kind === 'pdf') {
      if (file.type !== 'application/pdf') {
        return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 })
      }
      if (file.size > MAX_PDF_BYTES) {
        return NextResponse.json({ error: 'PDF must be under 25MB' }, { status: 400 })
      }
    } else {
      if (file.size > MAX_COVER_BYTES) {
        return NextResponse.json({ error: 'Cover image must be under 8MB' }, { status: 400 })
      }
    }

    const originalName = file.name || (kind === 'pdf' ? 'whitepaper.pdf' : 'cover.jpg')
    const extFromName = originalName.split('.').pop()?.toLowerCase()
    const fallbackExt = kind === 'pdf' ? 'pdf' : 'jpg'
    const ext = extFromName && extFromName.length <= 5 ? extFromName : fallbackExt
    const path = `whitepapers/${kind}/${crypto.randomUUID()}.${ext}`

    const blob = await put(path, file, {
      access: 'public',
      contentType: file.type || (kind === 'pdf' ? 'application/pdf' : 'image/jpeg'),
      addRandomSuffix: false,
    })

    return NextResponse.json({ url: blob.url, size: file.size })
  } catch (err) {
    console.error('[whitepapers/upload] unexpected error', err)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
