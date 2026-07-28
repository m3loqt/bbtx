'use client'

export const dynamic = 'force-dynamic'

import React, { Suspense, useState, useEffect, useCallback, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  getWhitepapers,
  upsertWhitepaper,
  deleteWhitepaper,
  toggleWhitepaperPublished,
} from '@/lib/admin/queries'
import type { Whitepaper } from '@/lib/admin/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle,
} from '@/components/ui/sheet'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Plus, MoreHorizontal, Trash2, Edit, Loader2, UploadCloud, FileText, Search, Download } from 'lucide-react'

const CATEGORIES = ['AI Leadership', 'Strategy', 'Organization', 'Leadership', 'Workforce']

const whitepaperSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().max(300).nullable().optional(),
  category: z.string().nullable().optional(),
  published_date: z.string().nullable().optional(),
  read_time_minutes: z.coerce.number().nullable().optional(),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
  sort_order: z.coerce.number().default(0),
})

type WhitepaperFormData = z.infer<typeof whitepaperSchema>

function formatBytes(bytes: number | null): string {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 0.1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

async function uploadFile(file: File, kind: 'cover' | 'pdf'): Promise<{ url: string; size: number }> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('kind', kind)

  const res = await fetch('/api/whitepapers/upload', { method: 'POST', body: formData })
  const json = (await res.json()) as { url?: string; size?: number; error?: string }

  if (!res.ok || !json.url) {
    throw new Error(json.error ?? 'Upload failed')
  }
  return { url: json.url, size: json.size ?? file.size }
}

function WhitepapersPageInner() {
  const searchParams = useSearchParams()
  const [whitepapers, setWhitepapers] = useState<Whitepaper[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Whitepaper | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Whitepaper | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [coverPreview, setCoverPreview] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfMeta, setPdfMeta] = useState<{ name: string; size: number | null } | null>(null)
  const coverInputRef = React.useRef<HTMLInputElement | null>(null)
  const pdfInputRef = React.useRef<HTMLInputElement | null>(null)

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<WhitepaperFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(whitepaperSchema) as any,
    defaultValues: { is_featured: false, is_published: false, sort_order: 0 },
  })

  const isFeatured = watch('is_featured')
  const isPublished = watch('is_published')
  const category = watch('category')

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getWhitepapers()
      setWhitepapers(data)
    } catch {
      toast.error('Failed to load whitepapers')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const prevSearchRef = React.useRef('')
  useEffect(() => {
    const newParam = searchParams.get('new')
    if (newParam === 'true' && prevSearchRef.current !== 'true') {
      prevSearchRef.current = 'true'
      openSheet(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return whitepapers
    return whitepapers.filter((w) =>
      w.title.toLowerCase().includes(q) ||
      (w.excerpt ?? '').toLowerCase().includes(q) ||
      (w.category ?? '').toLowerCase().includes(q)
    )
  }, [whitepapers, query])

  function openSheet(paper: Whitepaper | null) {
    setEditTarget(paper)
    setCoverFile(null)
    setPdfFile(null)
    if (paper) {
      reset({
        title: paper.title,
        excerpt: paper.excerpt ?? '',
        category: paper.category ?? '',
        published_date: paper.published_date ?? '',
        read_time_minutes: paper.read_time_minutes ?? undefined,
        is_featured: paper.is_featured,
        is_published: paper.is_published,
        sort_order: paper.sort_order,
      })
      setCoverPreview(paper.cover_image_url ?? '')
      setPdfMeta({ name: paper.pdf_url.split('/').pop() ?? 'current.pdf', size: paper.pdf_size_bytes })
    } else {
      reset({ is_featured: false, is_published: false, sort_order: 0 })
      setCoverPreview('')
      setPdfMeta(null)
    }
    setSheetOpen(true)
  }

  async function onSubmit(data: WhitepaperFormData) {
    if (!pdfFile && !editTarget?.pdf_url) {
      toast.error('A PDF file is required')
      return
    }

    setSaving(true)
    try {
      let coverUrlToSave: string | null = editTarget?.cover_image_url ?? null
      let pdfUrlToSave: string = editTarget?.pdf_url ?? ''
      let pdfSizeToSave: number | null = editTarget?.pdf_size_bytes ?? null

      if (coverFile) {
        const uploaded = await uploadFile(coverFile, 'cover')
        coverUrlToSave = uploaded.url
      }

      if (pdfFile) {
        const uploaded = await uploadFile(pdfFile, 'pdf')
        pdfUrlToSave = uploaded.url
        pdfSizeToSave = uploaded.size
      }

      await upsertWhitepaper({
        ...(editTarget ? { id: editTarget.id } : {}),
        title: data.title,
        excerpt: data.excerpt || null,
        category: data.category || null,
        cover_image_url: coverUrlToSave,
        pdf_url: pdfUrlToSave,
        pdf_size_bytes: pdfSizeToSave,
        published_date: data.published_date || null,
        read_time_minutes: data.read_time_minutes ?? null,
        is_featured: data.is_featured,
        is_published: data.is_published,
        sort_order: data.sort_order,
      })
      toast.success('Whitepaper saved')
      setSheetOpen(false)
      await load()
    } catch (err) {
      console.error(err)
      toast.error('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteWhitepaper(deleteTarget.id)
      toast.success('Whitepaper deleted')
      setDeleteTarget(null)
      await load()
    } catch {
      toast.error('Failed to delete whitepaper')
    } finally {
      setDeleting(false)
    }
  }

  async function handleTogglePublished(paper: Whitepaper) {
    const newVal = !paper.is_published
    setWhitepapers((prev) => prev.map((w) => w.id === paper.id ? { ...w, is_published: newVal } : w))
    try {
      await toggleWhitepaperPublished(paper.id, newVal)
    } catch {
      setWhitepapers((prev) => prev.map((w) => w.id === paper.id ? { ...w, is_published: paper.is_published } : w))
      toast.error('Failed to update publish status')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Whitepapers</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage whitepapers and gated downloads</p>
        </div>
        <Button onClick={() => openSheet(null)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Whitepaper
        </Button>
      </div>

      {!loading && whitepapers.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or category..."
            className="pl-9"
          />
        </div>
      )}

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[52px] w-full" />
          ))}
        </div>
      ) : whitepapers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground mb-4">No whitepapers yet. Add your first one to get started.</p>
          <Button onClick={() => openSheet(null)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Whitepaper
          </Button>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center">No whitepapers match &ldquo;{query}&rdquo;.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-32">Category</TableHead>
              <TableHead className="w-28">Published</TableHead>
              <TableHead className="w-24">Downloads</TableHead>
              <TableHead className="w-20">Featured</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((paper) => (
              <TableRow key={paper.id} className="h-[52px]">
                <TableCell>
                  {paper.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={paper.cover_image_url} alt="" className="w-10 h-10 rounded object-cover" />
                  ) : (
                    <div className="flex w-10 h-10 items-center justify-center rounded bg-secondary">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium max-w-xs">
                  <p className="truncate">{paper.title}</p>
                  {paper.excerpt && (
                    <p className="text-xs text-muted-foreground truncate">{paper.excerpt}</p>
                  )}
                </TableCell>
                <TableCell>
                  {paper.category && <Badge variant="secondary" className="text-xs">{paper.category}</Badge>}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {paper.published_date ? new Date(paper.published_date).toLocaleDateString() : '—'}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Download className="h-3.5 w-3.5" />
                    {paper.download_count}
                  </span>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={paper.is_featured}
                    onCheckedChange={async (val) => {
                      setWhitepapers((prev) => prev.map((w) => w.id === paper.id ? { ...w, is_featured: val } : w))
                      try {
                        await upsertWhitepaper({ id: paper.id, is_featured: val })
                      } catch {
                        setWhitepapers((prev) => prev.map((w) => w.id === paper.id ? { ...w, is_featured: paper.is_featured } : w))
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={paper.is_published}
                    onCheckedChange={() => handleTogglePublished(paper)}
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      id={`dropdown-whitepaper-${paper.id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openSheet(paper)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteTarget(paper)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-[640px] md:max-w-[720px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editTarget ? 'Edit Whitepaper' : 'Add Whitepaper'}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4 px-4 sm:px-6">
            <div className="space-y-2">
              <Label htmlFor="w-title">Title *</Label>
              <Input id="w-title" {...register('title')} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="w-excerpt">Excerpt <span className="text-muted-foreground">(max 300)</span></Label>
              <Textarea id="w-excerpt" rows={3} {...register('excerpt')} />
              {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={(v) => setValue('category', v)} value={category ?? undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="w-cover">Cover image</Label>
              <div
                className="relative flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md border-2 border-dashed border-black/[0.10] bg-[#fafafa] p-6 text-center transition-colors hover:bg-[#f9fafb]"
                onClick={() => coverInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const file = e.dataTransfer.files?.[0]
                  if (file) {
                    setCoverFile(file)
                    setCoverPreview(URL.createObjectURL(file))
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Upload cover image"
              >
                {coverPreview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverPreview} alt="Cover preview" className="absolute inset-0 h-full w-full object-cover" />
                )}
                {!coverPreview && (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <UploadCloud className="h-6 w-6 text-muted-foreground" />
                    <p className="text-sm font-medium text-[#111827]">Drag and drop file here</p>
                    <p className="text-xs font-medium text-muted-foreground">
                      or <span className="underline underline-offset-2">Choose file</span>
                    </p>
                  </div>
                )}
                <input
                  ref={coverInputRef}
                  id="w-cover"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setCoverFile(file)
                      setCoverPreview(URL.createObjectURL(file))
                    }
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="w-pdf">PDF file *</Label>
              <div
                className="flex cursor-pointer items-center gap-3 rounded-md border-2 border-dashed border-black/[0.10] bg-[#fafafa] px-4 py-4 transition-colors hover:bg-[#f9fafb]"
                onClick={() => pdfInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const file = e.dataTransfer.files?.[0]
                  if (file) {
                    setPdfFile(file)
                    setPdfMeta({ name: file.name, size: file.size })
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Upload PDF file"
              >
                <FileText className="h-6 w-6 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  {pdfMeta ? (
                    <>
                      <p className="truncate text-sm font-medium text-[#111827]">{pdfMeta.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(pdfMeta.size)} {pdfFile ? '· will replace on save' : '· current file'}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-[#111827]">Drag and drop PDF here</p>
                      <p className="text-xs font-medium text-muted-foreground">
                        or <span className="underline underline-offset-2">Choose file</span> · max 25MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={pdfInputRef}
                  id="w-pdf"
                  type="file"
                  accept="application/pdf"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setPdfFile(file)
                      setPdfMeta({ name: file.name, size: file.size })
                    }
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="w-date">Published Date</Label>
                <Input id="w-date" type="date" {...register('published_date')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="w-readtime">Read Time (min)</Label>
                <Input id="w-readtime" type="number" min={1} {...register('read_time_minutes')} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="w-featured">Featured</Label>
              <Switch id="w-featured" checked={isFeatured} onCheckedChange={(v) => setValue('is_featured', v)} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="w-published">Published</Label>
              <Switch id="w-published" checked={isPublished} onCheckedChange={(v) => setValue('is_published', v)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="w-sort">Sort Order</Label>
              <Input id="w-sort" type="number" {...register('sort_order')} />
            </div>

            <SheetFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Whitepaper
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. &ldquo;{deleteTarget?.title}&rdquo; will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function WhitepapersPage() {
  return (
    <Suspense>
      <WhitepapersPageInner />
    </Suspense>
  )
}
