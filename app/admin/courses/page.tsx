'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { getCourses, upsertCourse, deleteCourse } from '@/lib/admin/queries'
import type { Course } from '@/lib/admin/types'
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
import { Plus, MoreHorizontal, Trash2, Edit, Loader2, Award } from 'lucide-react'

const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().nullable().optional(),
  cover_image_url: z.string().url('Must be a valid URL').nullable().optional().or(z.literal('')),
  gumroad_url: z.string().url('Must be a valid URL').min(1, 'Gumroad URL is required'),
  price_usd: z.coerce.number().nullable().optional(),
  has_certification: z.boolean().default(false),
  certification_label: z.string().nullable().optional(),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
  sort_order: z.coerce.number().default(0),
})

type CourseFormData = z.infer<typeof courseSchema>

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Course | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [coverPreview, setCoverPreview] = useState('')

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CourseFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(courseSchema) as any,
    defaultValues: { has_certification: false, is_featured: false, is_published: false, sort_order: 0 },
  })

  const hasCertification = watch('has_certification')
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
      const data = await getCourses()
      setCourses(data)
    } catch {
      toast.error('Failed to load courses')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  // Auto-open sheet from query param
  const prevSearchRef = React.useRef('')
  useEffect(() => {
    const newParam = searchParams.get('new')
    if (newParam === 'true' && prevSearchRef.current !== 'true') {
      prevSearchRef.current = 'true'
      openSheet(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  function openSheet(course: Course | null) {
    setEditTarget(course)
    if (course) {
      reset({
        title: course.title,
        description: course.description ?? '',
        cover_image_url: course.cover_image_url ?? '',
        gumroad_url: course.gumroad_url,
        price_usd: course.price_usd ?? undefined,
        has_certification: course.has_certification,
        certification_label: course.certification_label ?? '',
        is_featured: course.is_featured,
        is_published: course.is_published,
        sort_order: course.sort_order,
      })
    } else {
      reset({ has_certification: false, is_featured: false, is_published: false, sort_order: 0 })
    }
    setSheetOpen(true)
  }

  async function onSubmit(data: CourseFormData) {
    setSaving(true)
    try {
      await upsertCourse({
        ...(editTarget ? { id: editTarget.id } : {}),
        ...data,
        description: data.description || null,
        cover_image_url: data.cover_image_url || null,
        price_usd: data.price_usd ?? null,
        certification_label: data.has_certification ? (data.certification_label || null) : null,
      })
      toast.success('Course saved')
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
      await deleteCourse(deleteTarget.id)
      toast.success('Course deleted')
      setDeleteTarget(null)
      await load()
    } catch {
      toast.error('Failed to delete course')
    } finally {
      setDeleting(false)
    }
  }

  async function handleTogglePublished(course: Course) {
    const newVal = !course.is_published
    setCourses((prev) => prev.map((c) => c.id === course.id ? { ...c, is_published: newVal } : c))
    try {
      await upsertCourse({ id: course.id, is_published: newVal })
    } catch {
      setCourses((prev) => prev.map((c) => c.id === course.id ? { ...c, is_published: course.is_published } : c))
      toast.error('Failed to update publish status')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage courses and certifications</p>
        </div>
        <Button onClick={() => openSheet(null)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Course
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[52px] w-full" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground mb-4">No courses yet. Add your first course to get started.</p>
          <Button onClick={() => openSheet(null)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Course
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-24">Price</TableHead>
              <TableHead className="w-32">Certification</TableHead>
              <TableHead className="w-20">Featured</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id} className="h-[52px]">
                <TableCell>
                  {course.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={course.cover_image_url} alt="" className="w-10 h-10 rounded object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-secondary" />
                  )}
                </TableCell>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell className="text-sm">
                  {course.price_usd != null ? `$${course.price_usd}` : 'Free'}
                </TableCell>
                <TableCell>
                  {course.has_certification && (
                    <Badge variant="outline" className="gap-1 text-xs">
                      <Award className="h-3 w-3" />
                      {course.certification_label ?? 'Certificate'}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={course.is_featured}
                    onCheckedChange={async (val) => {
                      setCourses((prev) => prev.map((c) => c.id === course.id ? { ...c, is_featured: val } : c))
                      try { await upsertCourse({ id: course.id, is_featured: val }) } catch { void 0 }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Switch checked={course.is_published} onCheckedChange={() => handleTogglePublished(course)} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openSheet(course)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(course)}>
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
            <SheetTitle>{editTarget ? 'Edit Course' : 'Add Course'}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4 px-4 sm:px-6">
            <div className="space-y-2">
              <Label htmlFor="c-title">Title *</Label>
              <Input id="c-title" {...register('title')} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-desc">Description</Label>
              <Textarea id="c-desc" rows={3} {...register('description')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-cover">Cover Image URL</Label>
              <Input id="c-cover" type="url" placeholder="https://" {...register('cover_image_url')} />
              {coverPreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverPreview} alt="Preview" className="h-20 w-auto rounded border object-cover" />
              )}
              {errors.cover_image_url && <p className="text-xs text-destructive">{errors.cover_image_url.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-gumroad">Gumroad URL *</Label>
              <Input id="c-gumroad" type="url" placeholder="https://gumroad.com/..." {...register('gumroad_url')} />
              {errors.gumroad_url && <p className="text-xs text-destructive">{errors.gumroad_url.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-price">Price (USD)</Label>
              <Input id="c-price" type="number" step="0.01" min={0} placeholder="0.00" {...register('price_usd')} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="c-cert">Has Certification</Label>
              <Switch id="c-cert" checked={hasCertification} onCheckedChange={(v) => setValue('has_certification', v)} />
            </div>

            {hasCertification && (
              <div className="space-y-2 transition-all">
                <Label htmlFor="c-certlabel">Certification Label</Label>
                <Input id="c-certlabel" placeholder="e.g. AI Leadership Certificate" {...register('certification_label')} />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label htmlFor="c-featured">Featured</Label>
              <Switch id="c-featured" checked={isFeatured} onCheckedChange={(v) => setValue('is_featured', v)} />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="c-published">Published</Label>
              <Switch id="c-published" checked={isPublished} onCheckedChange={(v) => setValue('is_published', v)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-sort">Sort Order</Label>
              <Input id="c-sort" type="number" {...register('sort_order')} />
            </div>

            <SheetFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Course
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
