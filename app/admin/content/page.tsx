'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  getBlogs,
  upsertBlog,
  deleteBlog,
  toggleBlogPublished,
  getPodcastEpisodes,
  upsertPodcastEpisode,
  deletePodcastEpisode,
  togglePodcastPublished,
} from '@/lib/admin/queries'
import type { Blog, PodcastEpisode } from '@/lib/admin/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, MoreHorizontal, Trash2, Edit, Loader2 } from 'lucide-react'

// ─── Blog Form ────────────────────────────────────────────────────────────────

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().max(300).nullable().optional(),
  cover_image_url: z.string().url('Must be a valid URL').nullable().optional().or(z.literal('')),
  substack_url: z.string().url('Must be a valid URL').min(1, 'Substack URL is required'),
  category: z.string().nullable().optional(),
  published_date: z.string().nullable().optional(),
  read_time_minutes: z.coerce.number().nullable().optional(),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
  sort_order: z.coerce.number().default(0),
})

type BlogFormData = z.infer<typeof blogSchema>

// ─── Podcast Form ─────────────────────────────────────────────────────────────

const podcastSchema = z.object({
  episode_number: z.coerce.number().min(1, 'Episode number is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().nullable().optional(),
  cover_image_url: z.string().url('Must be a valid URL').nullable().optional().or(z.literal('')),
  spotify_url: z.string().url('Must be a valid URL').nullable().optional().or(z.literal('')),
  apple_podcasts_url: z.string().url('Must be a valid URL').nullable().optional().or(z.literal('')),
  published_date: z.string().nullable().optional(),
  duration_minutes: z.coerce.number().nullable().optional(),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
  sort_order: z.coerce.number().default(0),
})

type PodcastFormData = z.infer<typeof podcastSchema>

// ─── Blog Table ───────────────────────────────────────────────────────────────

function BlogTab({ trigger }: { trigger: number }) {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Blog | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [coverPreview, setCoverPreview] = useState('')

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<BlogFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(blogSchema) as any,
    defaultValues: { is_featured: false, is_published: false, sort_order: 0 },
  })

  const isFeatured = watch('is_featured')
  const isPublished = watch('is_published')
  const coverUrl = watch('cover_image_url')

  useEffect(() => {
    if (typeof coverUrl === 'string' && coverUrl.startsWith('http')) {
      setCoverPreview(coverUrl)
    } else {
      setCoverPreview('')
    }
  }, [coverUrl])

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getBlogs()
      setBlogs(data)
    } catch {
      toast.error('Failed to load blog articles')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const prevTrigger = React.useRef(0)
  useEffect(() => {
    if (trigger > 0 && trigger !== prevTrigger.current) {
      prevTrigger.current = trigger
      openSheet(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  function openSheet(blog: Blog | null) {
    setEditTarget(blog)
    if (blog) {
      reset({
        title: blog.title,
        excerpt: blog.excerpt ?? '',
        cover_image_url: blog.cover_image_url ?? '',
        substack_url: blog.substack_url,
        category: blog.category ?? '',
        published_date: blog.published_date ?? '',
        read_time_minutes: blog.read_time_minutes ?? undefined,
        is_featured: blog.is_featured,
        is_published: blog.is_published,
        sort_order: blog.sort_order,
      })
    } else {
      reset({ is_featured: false, is_published: false, sort_order: 0 })
    }
    setSheetOpen(true)
  }

  async function onSubmit(data: BlogFormData) {
    setSaving(true)
    try {
      await upsertBlog({
        ...(editTarget ? { id: editTarget.id } : {}),
        ...data,
        excerpt: data.excerpt || null,
        cover_image_url: data.cover_image_url || null,
        category: data.category || null,
        published_date: data.published_date || null,
        read_time_minutes: data.read_time_minutes ?? null,
      })
      toast.success('Article saved')
      setSheetOpen(false)
      await load()
    } catch {
      toast.error('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteBlog(deleteTarget.id)
      toast.success('Article deleted')
      setDeleteTarget(null)
      await load()
    } catch {
      toast.error('Failed to delete article')
    } finally {
      setDeleting(false)
    }
  }

  async function handleTogglePublished(blog: Blog) {
    const newVal = !blog.is_published
    setBlogs((prev) => prev.map((b) => b.id === blog.id ? { ...b, is_published: newVal } : b))
    try {
      await toggleBlogPublished(blog.id, newVal)
    } catch {
      setBlogs((prev) => prev.map((b) => b.id === blog.id ? { ...b, is_published: blog.is_published } : b))
      toast.error('Failed to update publish status')
    }
  }

  return (
    <>
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[52px] w-full" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground mb-4">No blog articles yet. Add your first article to get started.</p>
          <Button onClick={() => openSheet(null)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Article
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-32">Category</TableHead>
              <TableHead className="w-28">Published</TableHead>
              <TableHead className="w-20">Read Time</TableHead>
              <TableHead className="w-20">Featured</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id} className="h-[52px]">
                <TableCell>
                  {blog.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={blog.cover_image_url}
                      alt=""
                      className="w-10 h-10 rounded object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-secondary" />
                  )}
                </TableCell>
                <TableCell className="font-medium max-w-xs">
                  <p className="truncate">{blog.title}</p>
                  {blog.excerpt && (
                    <p className="text-xs text-muted-foreground truncate">{blog.excerpt}</p>
                  )}
                </TableCell>
                <TableCell>
                  {blog.category && <Badge variant="secondary" className="text-xs">{blog.category}</Badge>}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {blog.published_date
                    ? new Date(blog.published_date).toLocaleDateString()
                    : '—'}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {blog.read_time_minutes ? `${blog.read_time_minutes}m` : '—'}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={blog.is_featured}
                    onCheckedChange={async (val) => {
                      setBlogs((prev) => prev.map((b) => b.id === blog.id ? { ...b, is_featured: val } : b))
                      try {
                        await upsertBlog({ id: blog.id, is_featured: val })
                      } catch {
                        setBlogs((prev) => prev.map((b) => b.id === blog.id ? { ...b, is_featured: blog.is_featured } : b))
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={blog.is_published}
                    onCheckedChange={() => handleTogglePublished(blog)}
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openSheet(blog)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteTarget(blog)}
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

      {/* Edit/Add Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-[720px] md:max-w-[840px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editTarget ? 'Edit Article' : 'Add Article'}</SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4 px-4 sm:px-6">
            <div className="space-y-2">
              <Label htmlFor="b-title">Title *</Label>
              <Input id="b-title" {...register('title')} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="b-excerpt">Excerpt <span className="text-muted-foreground">(max 300)</span></Label>
              <Textarea id="b-excerpt" rows={3} {...register('excerpt')} />
              {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="b-cover">Cover Image URL</Label>
              <Input id="b-cover" type="url" placeholder="https://" {...register('cover_image_url')} />
              {coverPreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverPreview} alt="Preview" className="h-20 w-auto rounded border object-cover" />
              )}
              {errors.cover_image_url && <p className="text-xs text-destructive">{errors.cover_image_url.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="b-substack">Substack URL *</Label>
              <Input id="b-substack" type="url" placeholder="https://" {...register('substack_url')} />
              {errors.substack_url && <p className="text-xs text-destructive">{errors.substack_url.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={(v) => setValue('category', v)} defaultValue={editTarget?.category ?? ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI Leadership">AI Leadership</SelectItem>
                  <SelectItem value="Strategy">Strategy</SelectItem>
                  <SelectItem value="Organization">Organization</SelectItem>
                  <SelectItem value="Leadership">Leadership</SelectItem>
                  <SelectItem value="Workforce">Workforce</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="b-date">Published Date</Label>
                <Input id="b-date" type="date" {...register('published_date')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="b-readtime">Read Time (min)</Label>
                <Input id="b-readtime" type="number" min={1} {...register('read_time_minutes')} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="b-featured">Featured</Label>
              <Switch
                id="b-featured"
                checked={isFeatured}
                onCheckedChange={(v) => setValue('is_featured', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="b-published">Published</Label>
              <Switch
                id="b-published"
                checked={isPublished}
                onCheckedChange={(v) => setValue('is_published', v)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="b-sort">Sort Order</Label>
              <Input id="b-sort" type="number" {...register('sort_order')} />
            </div>

            <SheetFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Article
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
    </>
  )
}

// ─── Podcast Tab ──────────────────────────────────────────────────────────────

function PodcastTab({ trigger }: { trigger: number }) {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([])
  const [loading, setLoading] = useState(true)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<PodcastEpisode | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<PodcastEpisode | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [coverPreview, setCoverPreview] = useState('')

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<PodcastFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(podcastSchema) as any,
    defaultValues: { is_featured: false, is_published: false, sort_order: 0 },
  })

  const isFeatured = watch('is_featured')
  const isPublished = watch('is_published')
  const coverUrl = watch('cover_image_url')

  useEffect(() => {
    if (typeof coverUrl === 'string' && coverUrl.startsWith('http')) {
      setCoverPreview(coverUrl)
    } else {
      setCoverPreview('')
    }
  }, [coverUrl])

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getPodcastEpisodes()
      setEpisodes(data)
    } catch {
      toast.error('Failed to load podcast episodes')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const prevTrigger = React.useRef(0)
  useEffect(() => {
    if (trigger > 0 && trigger !== prevTrigger.current) {
      prevTrigger.current = trigger
      openSheet(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  function openSheet(ep: PodcastEpisode | null) {
    setEditTarget(ep)
    if (ep) {
      reset({
        episode_number: ep.episode_number,
        title: ep.title,
        description: ep.description ?? '',
        cover_image_url: ep.cover_image_url ?? '',
        spotify_url: ep.spotify_url ?? '',
        apple_podcasts_url: ep.apple_podcasts_url ?? '',
        published_date: ep.published_date ?? '',
        duration_minutes: ep.duration_minutes ?? undefined,
        is_featured: ep.is_featured,
        is_published: ep.is_published,
        sort_order: ep.sort_order,
      })
    } else {
      reset({ is_featured: false, is_published: false, sort_order: 0 })
    }
    setSheetOpen(true)
  }

  async function onSubmit(data: PodcastFormData) {
    setSaving(true)
    try {
      await upsertPodcastEpisode({
        ...(editTarget ? { id: editTarget.id } : {}),
        ...data,
        description: data.description || null,
        cover_image_url: data.cover_image_url || null,
        spotify_url: data.spotify_url || null,
        apple_podcasts_url: data.apple_podcasts_url || null,
        published_date: data.published_date || null,
        duration_minutes: data.duration_minutes ?? null,
      })
      toast.success('Episode saved')
      setSheetOpen(false)
      await load()
    } catch {
      toast.error('Failed to save. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deletePodcastEpisode(deleteTarget.id)
      toast.success('Episode deleted')
      setDeleteTarget(null)
      await load()
    } catch {
      toast.error('Failed to delete episode')
    } finally {
      setDeleting(false)
    }
  }

  async function handleTogglePublished(ep: PodcastEpisode) {
    const newVal = !ep.is_published
    setEpisodes((prev) => prev.map((e) => e.id === ep.id ? { ...e, is_published: newVal } : e))
    try {
      await togglePodcastPublished(ep.id, newVal)
    } catch {
      setEpisodes((prev) => prev.map((e) => e.id === ep.id ? { ...e, is_published: ep.is_published } : e))
      toast.error('Failed to update publish status')
    }
  }

  return (
    <>
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[52px] w-full" />
          ))}
        </div>
      ) : episodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground mb-4">No podcast episodes yet. Add your first episode to get started.</p>
          <Button onClick={() => openSheet(null)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Episode
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Cover</TableHead>
              <TableHead className="w-20">Ep #</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-28">Published</TableHead>
              <TableHead className="w-20">Duration</TableHead>
              <TableHead className="w-20">Featured</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {episodes.map((ep) => (
              <TableRow key={ep.id} className="h-[52px]">
                <TableCell>
                  {ep.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ep.cover_image_url} alt="" className="w-10 h-10 rounded object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-secondary" />
                  )}
                </TableCell>
                <TableCell className="font-mono text-sm">#{ep.episode_number}</TableCell>
                <TableCell className="font-medium max-w-xs">
                  <p className="truncate">{ep.title}</p>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {ep.published_date ? new Date(ep.published_date).toLocaleDateString() : '—'}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {ep.duration_minutes ? `${ep.duration_minutes}m` : '—'}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={ep.is_featured}
                    onCheckedChange={async (val) => {
                      setEpisodes((prev) => prev.map((e) => e.id === ep.id ? { ...e, is_featured: val } : e))
                      try {
                        await upsertPodcastEpisode({ id: ep.id, is_featured: val })
                      } catch {
                        setEpisodes((prev) => prev.map((e) => e.id === ep.id ? { ...e, is_featured: ep.is_featured } : e))
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={ep.is_published}
                    onCheckedChange={() => handleTogglePublished(ep)}
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openSheet(ep)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteTarget(ep)}
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

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-[720px] md:max-w-[840px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editTarget ? 'Edit Episode' : 'Add Episode'}</SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4 px-4 sm:px-6">
            <div className="space-y-2">
              <Label htmlFor="p-epnum">Episode Number *</Label>
              <Input id="p-epnum" type="number" min={1} {...register('episode_number')} />
              {errors.episode_number && <p className="text-xs text-destructive">{errors.episode_number.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-title">Title *</Label>
              <Input id="p-title" {...register('title')} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-desc">Description</Label>
              <Textarea id="p-desc" rows={3} {...register('description')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-cover">Cover Image URL</Label>
              <Input id="p-cover" type="url" placeholder="https://" {...register('cover_image_url')} />
              {coverPreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverPreview} alt="Preview" className="h-20 w-auto rounded border object-cover" />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-spotify">Spotify URL</Label>
              <Input id="p-spotify" type="url" placeholder="https://open.spotify.com/..." {...register('spotify_url')} />
              {errors.spotify_url && <p className="text-xs text-destructive">{errors.spotify_url.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-apple">Apple Podcasts URL</Label>
              <Input id="p-apple" type="url" placeholder="https://podcasts.apple.com/..." {...register('apple_podcasts_url')} />
              {errors.apple_podcasts_url && <p className="text-xs text-destructive">{errors.apple_podcasts_url.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="p-date">Published Date</Label>
                <Input id="p-date" type="date" {...register('published_date')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-duration">Duration (min)</Label>
                <Input id="p-duration" type="number" min={1} {...register('duration_minutes')} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="p-featured">Featured</Label>
              <Switch id="p-featured" checked={isFeatured} onCheckedChange={(v) => setValue('is_featured', v)} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="p-published">Published</Label>
              <Switch id="p-published" checked={isPublished} onCheckedChange={(v) => setValue('is_published', v)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="p-sort">Sort Order</Label>
              <Input id="p-sort" type="number" {...register('sort_order')} />
            </div>

            <SheetFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Episode
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

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
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContentPage() {
  const searchParams = useSearchParams()
  const newParam = searchParams.get('new')
  const defaultTab = newParam === 'podcast' ? 'podcasts' : 'blogs'
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [blogTrigger, setBlogTrigger] = useState(0)
  const [podcastTrigger, setPodcastTrigger] = useState(0)

  function handleAddClick() {
    if (activeTab === 'blogs') {
      setBlogTrigger((n) => n + 1)
    } else {
      setPodcastTrigger((n) => n + 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Content</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage blog articles and podcast episodes</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="blogs">Blog Articles</TabsTrigger>
            <TabsTrigger value="podcasts">Podcast Episodes</TabsTrigger>
          </TabsList>
          <Button className="gap-2" onClick={handleAddClick}>
            <Plus className="h-4 w-4" />
            {activeTab === 'blogs' ? 'Add Article' : 'Add Episode'}
          </Button>
        </div>

        <TabsContent value="blogs" className="mt-4">
          <BlogTab trigger={blogTrigger} />
        </TabsContent>
        <TabsContent value="podcasts" className="mt-4">
          <PodcastTab trigger={podcastTrigger} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
