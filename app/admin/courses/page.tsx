'use client'

export const dynamic = 'force-dynamic'

import React, { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { getCourses, upsertCourse, deleteCourse } from '@/lib/admin/queries'
import type { Course } from '@/lib/admin/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle,
} from '@/components/ui/sheet'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { supabaseAdmin } from '@/lib/admin/supabase-admin'
import { Plus, MoreHorizontal, Trash2, Edit, Loader2, Award, UploadCloud, Star, CheckCircle2 } from 'lucide-react'
import { ArrowUpRight } from '@/app/components/ArrowIcon'

const featureKeySchema = z.enum(['certification', 'featured', 'published'])

const courseUrlSchema = z.preprocess((val) => {
  if (typeof val !== 'string') return val
  const s = val.trim()
  if (!s) return s
  // Zod's url() requires protocol; users often paste Gumroad URLs without it.
  if (!/^https?:\/\//i.test(s)) return `https://${s}`
  return s
}, z.string().url('Please enter a valid course URL').min(1, 'Course URL is required'))

const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().nullable().optional(),
  features: z.array(featureKeySchema).default([]),
  // URL the frontend/admin uses to open the course in a new tab.
  course_url: courseUrlSchema,
})

type CourseFormData = z.infer<typeof courseSchema>

function CoursesPageInner() {
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Course | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [coverPreview, setCoverPreview] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [coverObjectUrl, setCoverObjectUrl] = useState<string | null>(null)
  const [coverAspectRatio, setCoverAspectRatio] = useState<string>('16/9')

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<CourseFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(courseSchema) as any,
    defaultValues: { features: [], course_url: '' },
  })

  const features = watch('features')

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
      const nextFeatures: CourseFormData['features'] = []
      if (course.has_certification) nextFeatures.push('certification')
      if (Boolean(course.is_featured)) nextFeatures.push('featured')
      if (Boolean(course.is_published)) nextFeatures.push('published')

      reset({
        title: course.title,
        description: course.description ?? '',
        course_url: course.gumroad_url ?? '',
        features: nextFeatures,
      })
      setCoverPreview(course.cover_image_url ?? '')
      setCoverFile(null)
    } else {
      reset({ features: [], course_url: '' })
      setCoverPreview('')
      if (coverObjectUrl) URL.revokeObjectURL(coverObjectUrl)
      setCoverObjectUrl(null)
      setCoverFile(null)
    }
    setSheetOpen(true)
  }

  useEffect(() => {
    // Compute aspect ratio so the preview height matches the selected cover's real ratio.
    if (!coverPreview) return

    const img = new Image()
    img.src = coverPreview
    img.onload = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setCoverAspectRatio(`${img.naturalWidth}/${img.naturalHeight}`)
      }
    }
  }, [coverPreview])

  const toggleFeature = (key: CourseFormData['features'][number]) => {
    const next = new Set(features ?? [])
    if (next.has(key)) next.delete(key)
    else next.add(key)
    setValue('features', Array.from(next) as CourseFormData['features'], { shouldDirty: true })
  }

  async function onSubmit(data: CourseFormData) {
    setSaving(true)
    try {
      // Handle image upload if a new file was selected.
      let coverUrlToSave: string | null = editTarget?.cover_image_url ?? null

      if (coverFile) {
        const formData = new FormData()
        formData.append('file', coverFile)

        const res = await fetch('/api/courses/cover-upload', {
          method: 'POST',
          body: formData,
        })

        const json = (await res.json()) as { url?: string; error?: string }

        if (!res.ok || !json.url) {
          console.error('Cover upload failed', json.error)
          toast.error('Failed to upload cover image. Please try again.')
          setSaving(false)
          return
        }

        coverUrlToSave = json.url
      }

      const hasCertification = data.features.includes('certification')
      const isFeatured = data.features.includes('featured')
      const isPublished = data.features.includes('published')

      const basePayload = {
        title: data.title,
        description: data.description || null,
        cover_image_url: coverUrlToSave,
        has_certification: hasCertification,
        certification_label: hasCertification ? (editTarget?.certification_label ?? 'Certificate') : null,
        gumroad_url: data.course_url,
      }

      const payloadWithLegacyDefaults = {
        ...(editTarget ? { id: editTarget.id } : {}),
        ...basePayload,
        // Legacy fields: only used in first attempt. If your schema was simplified
        // and these columns were dropped, the retry below will omit them.
        is_featured: isFeatured,
        is_published: isPublished,
        // If these columns still exist, satisfy NOT NULL constraints with safe defaults.
        price_usd: editTarget?.price_usd ?? null,
        sort_order: editTarget?.sort_order ?? 0,
      }

      const payloadMinimal = {
        ...(editTarget ? { id: editTarget.id } : {}),
        ...basePayload,
      }

      try {
        await upsertCourse(payloadWithLegacyDefaults as any)
      } catch (e) {
        // If schema was simplified and legacy columns were dropped, retry without them.
        console.warn('upsert failed with legacy fields, retrying minimal', e)
        await upsertCourse(payloadMinimal as any)
      }
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
        <div className="mt-8 grid gap-5 sm:mt-16 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => {
            const featurePills: Array<{ label: string; icon: React.ReactNode; key: string }> = []

            if (course.has_certification) {
              featurePills.push({
                key: 'certification',
                label: course.certification_label ?? 'Certificate',
                icon: <Award className="h-3.5 w-3.5 text-[#ca3726]" />,
              })
            }

            if (Boolean(course.is_featured)) {
              featurePills.push({
                key: 'featured',
                label: 'Featured',
                icon: <Star className="h-3.5 w-3.5 text-[#ca3726]" />,
              })
            }

            if (Boolean(course.is_published)) {
              featurePills.push({
                key: 'published',
                label: 'Published',
                icon: <CheckCircle2 className="h-3.5 w-3.5 text-[#ca3726]" />,
              })
            }

            const href = course.gumroad_url || '#'

            return (
              <article
                key={course.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.04)]"
              >
                <div
                  className="relative h-36 w-full bg-cover bg-center sm:h-52"
                  style={{
                    backgroundImage: course.cover_image_url
                      ? `url('${course.cover_image_url}')`
                      : "url('/service.png')",
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.45),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(0,0,0,0.25),transparent_55%)]" />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold tracking-tight text-[#111827] sm:text-xl">
                      {course.title}
                    </h3>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        id={`dropdown-course-${course.id}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openSheet(course)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteTarget(course)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {featurePills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {featurePills.map((pill) => (
                        <span
                          key={pill.key}
                          className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-[#f9fafb] px-3 py-1 text-xs font-medium text-[#4b5563]"
                        >
                          {pill.icon}
                          <span>{pill.label}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="mt-4 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                    {course.description ?? ''}
                  </p>

                  <div className="mt-6">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#111827]/15 px-4 py-2 text-xs font-semibold text-[#111827] hover:bg-[#f3f4f6] sm:px-5 sm:py-2.5 sm:text-sm"
                    >
                      Learn more
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
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
              <Label htmlFor="c-cover">Cover image</Label>
              <div
                className="relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-black/[0.10] bg-[#fafafa] p-6 text-center transition-colors hover:bg-[#f9fafb] overflow-hidden"
                style={{
                  aspectRatio: coverAspectRatio,
                  minHeight: coverPreview ? undefined : 150,
                }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault()
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  const file = e.dataTransfer.files?.[0]
                  if (file) {
                    setCoverFile(file)
                    const url = URL.createObjectURL(file)
                    if (coverObjectUrl) URL.revokeObjectURL(coverObjectUrl)
                    setCoverObjectUrl(url)
                    setCoverPreview(url)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Upload cover image"
              >
                {coverPreview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="absolute inset-0 h-full w-full rounded-md object-cover"
                  />
                )}
                <div
                  className={[
                    "flex flex-col items-center gap-2 text-center",
                    coverPreview ? "relative z-[1]" : "",
                  ].join(" ")}
                >
                  {!coverPreview && (
                    <>
                      <UploadCloud className="h-6 w-6 text-muted-foreground" />
                      <p className="text-sm font-medium text-[#111827]">
                        Drag and Drop file here
                      </p>
                      <p className="text-xs font-medium text-muted-foreground">
                        or{" "}
                        <span className="underline underline-offset-2">
                          Choose file
                        </span>
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  id="c-cover"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setCoverFile(file)
                      const url = URL.createObjectURL(file)
                      if (coverObjectUrl) URL.revokeObjectURL(coverObjectUrl)
                      setCoverObjectUrl(url)
                      setCoverPreview(url)
                    }
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="c-course-url">Course URL *</Label>
              <Input
                id="c-course-url"
                type="text"
                placeholder="https://..."
                {...register('course_url')}
              />
              {errors.course_url && (
                <p className="text-xs text-destructive">{errors.course_url.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Features</Label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => toggleFeature('certification')}
                  className={[
                    'rounded-full border border-black/[0.08] px-3 py-1 text-xs font-medium transition-colors',
                    features?.includes('certification')
                      ? 'bg-[#ca3726] border-[#ca3726] text-white'
                      : 'bg-[#f9fafb] text-[#4b5563] hover:bg-white',
                  ].join(' ')}
                >
                  <span className="inline-flex items-center gap-2">
                    <Award className="h-3.5 w-3.5" />
                    Certification
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleFeature('featured')}
                  className={[
                    'rounded-full border border-black/[0.08] px-3 py-1 text-xs font-medium transition-colors',
                    features?.includes('featured')
                      ? 'bg-[#ca3726] border-[#ca3726] text-white'
                      : 'bg-[#f9fafb] text-[#4b5563] hover:bg-white',
                  ].join(' ')}
                >
                  <span className="inline-flex items-center gap-2">
                    <Star className="h-3.5 w-3.5" />
                    Featured
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleFeature('published')}
                  className={[
                    'rounded-full border border-black/[0.08] px-3 py-1 text-xs font-medium transition-colors',
                    features?.includes('published')
                      ? 'bg-[#ca3726] border-[#ca3726] text-white'
                      : 'bg-[#f9fafb] text-[#4b5563] hover:bg-white',
                  ].join(' ')}
                >
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Published
                  </span>
                </button>
              </div>
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

export default function CoursesPage() {
  return (
    <Suspense>
      <CoursesPageInner />
    </Suspense>
  )
}
