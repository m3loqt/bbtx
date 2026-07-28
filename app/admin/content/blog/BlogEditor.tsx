"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { getBlogById, upsertBlog } from "@/lib/admin/queries"
import type { Blog } from "@/lib/admin/types"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, ImageIcon, Loader2, Settings, X } from "lucide-react"

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

const CATEGORIES = ["AI Leadership", "Strategy", "Organization", "Leadership", "Workforce", "Human Implications of AI"]

export function BlogEditor({ blogId }: { blogId: string | null }) {
  const router = useRouter()
  const isNew = blogId === null

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [existing, setExisting] = useState<Blog | null>(null)

  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [slug, setSlug] = useState("")
  const [slugTouched, setSlugTouched] = useState(false)
  const [publishedDate, setPublishedDate] = useState<string>("")
  const [isFeatured, setIsFeatured] = useState(false)
  const [substackUrl, setSubstackUrl] = useState("")
  const [isPublished, setIsPublished] = useState(false)

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const coverInputRef = useRef<HTMLInputElement | null>(null)

  const load = useCallback(async () => {
    if (isNew || !blogId) return
    try {
      setLoading(true)
      const blog = await getBlogById(blogId)
      if (!blog) {
        toast.error("Post not found")
        router.replace("/admin/content")
        return
      }
      setExisting(blog)
      setTitle(blog.title)
      setExcerpt(blog.excerpt ?? "")
      setContent(blog.content ?? "")
      setCoverImageUrl(blog.cover_image_url)
      setCategory(blog.category)
      setSlug(blog.slug ?? "")
      setSlugTouched(Boolean(blog.slug))
      setPublishedDate(blog.published_date ?? "")
      setIsFeatured(blog.is_featured)
      setSubstackUrl(blog.substack_url ?? "")
      setIsPublished(blog.is_published)
    } catch {
      toast.error("Failed to load post")
    } finally {
      setLoading(false)
    }
  }, [isNew, blogId, router])

  useEffect(() => {
    load()
  }, [load])

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  async function handleCoverFile(file: File) {
    setUploadingCover(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/blogs/image-upload", { method: "POST", body: formData })
      const json = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !json.url) throw new Error(json.error ?? "Upload failed")
      setCoverImageUrl(json.url)
    } catch {
      toast.error("Failed to upload cover image")
    } finally {
      setUploadingCover(false)
    }
  }

  async function save(nextPublished: boolean): Promise<boolean> {
    if (!title.trim()) {
      toast.error("Give the post a title first")
      return false
    }
    if (!slug.trim()) {
      toast.error("Give the post a URL slug first (see Settings)")
      return false
    }

    setSaving(true)
    try {
      const payload: Partial<Blog> = {
        ...(existing ? { id: existing.id } : {}),
        title: title.trim(),
        slug: slug.trim(),
        content,
        excerpt: excerpt.trim() || null,
        cover_image_url: coverImageUrl,
        category: category ?? null,
        published_date: nextPublished && !publishedDate ? new Date().toISOString().slice(0, 10) : publishedDate || null,
        is_featured: isFeatured,
        is_published: nextPublished,
        substack_url: substackUrl.trim() || null,
      }
      const saved = await upsertBlog(payload)
      setExisting(saved)
      setIsPublished(saved.is_published)
      if (saved.published_date) setPublishedDate(saved.published_date)
      if (isNew) {
        router.replace(`/admin/content/blog/${saved.id}`)
      }
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : ""
      if (message.toLowerCase().includes("unique")) {
        toast.error("That URL slug is already in use — try a different one")
      } else {
        toast.error("Failed to save. Please try again.")
      }
      return false
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveDraft() {
    const ok = await save(isPublished)
    if (ok) toast.success("Saved")
  }

  async function handlePublish() {
    const ok = await save(true)
    if (ok) toast.success("Published")
  }

  async function handleUnpublish() {
    const ok = await save(false)
    if (ok) toast.success("Unpublished")
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-8 h-64 w-full" />
        <Skeleton className="mt-6 h-12 w-3/4" />
        <Skeleton className="mt-4 h-40 w-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-black/[0.08] bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
        <button
          type="button"
          onClick={() => router.push("/admin/content")}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#555555] transition-colors hover:text-[#111111]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex items-center gap-2">
          <span className="mr-1 text-xs font-medium text-[#9ca3af]">
            {isPublished ? "Published" : "Draft"}
          </span>
          <Button type="button" variant="outline" size="sm" onClick={() => setSettingsOpen(true)}>
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button type="button" variant="outline" size="sm" disabled={saving} onClick={handleSaveDraft}>
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Save draft
          </Button>
          {isPublished ? (
            <Button type="button" variant="outline" size="sm" disabled={saving} onClick={handleUnpublish}>
              Unpublish
            </Button>
          ) : (
            <Button type="button" size="sm" disabled={saving} onClick={handlePublish}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Publish
            </Button>
          )}
        </div>
      </div>

      {/* Writing canvas */}
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        {coverImageUrl ? (
          <div className="group relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#f5f5f5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImageUrl} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => setCoverImageUrl(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove cover image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            disabled={uploadingCover}
            className="mb-8 flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-black/[0.10] bg-[#fafafa] text-[#9ca3af] transition-colors hover:bg-[#f5f5f5]"
          >
            {uploadingCover ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImageIcon className="h-6 w-6" />}
            <span className="text-sm font-medium">Add a cover image</span>
          </button>
        )}
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleCoverFile(file)
            e.target.value = ""
          }}
        />

        <textarea
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Title"
          rows={1}
          className="w-full resize-none overflow-hidden border-none bg-transparent text-4xl font-bold tracking-tight text-[#111111] outline-none placeholder:text-[#d1d5db]"
          onInput={(e) => {
            const el = e.currentTarget
            el.style.height = "auto"
            el.style.height = `${el.scrollHeight}px`
          }}
        />

        <input
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Add a subtitle (optional)"
          className="mt-2 w-full border-none bg-transparent text-lg text-[#6b7280] outline-none placeholder:text-[#d1d5db]"
        />

        <div className="mt-8">
          <RichTextEditor content={content} onChange={setContent} placeholder="Start writing…" />
        </div>
      </div>

      {/* Settings drawer */}
      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Post settings</SheetTitle>
          </SheetHeader>

          <div className="space-y-5 px-4 py-4 sm:px-6">
            <div className="space-y-2">
              <Label htmlFor="post-slug">URL slug</Label>
              <Input
                id="post-slug"
                value={slug}
                onChange={(e) => {
                  setSlug(slugify(e.target.value))
                  setSlugTouched(true)
                }}
              />
              <p className="text-xs text-muted-foreground">
                /chaotic-confluence/{slug || "your-slug-here"}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category ?? undefined} onValueChange={(v) => setCategory(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-date">Published date</Label>
              <Input
                id="post-date"
                type="date"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Defaults to today when you hit Publish, if left blank.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="post-substack">Substack cross-post URL (optional)</Label>
              <Input
                id="post-substack"
                type="url"
                placeholder="https://chaoticconfluence.substack.com/p/..."
                value={substackUrl}
                onChange={(e) => setSubstackUrl(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="post-featured">Featured</Label>
              <Switch id="post-featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
            </div>
          </div>

          <SheetFooter className="pt-2">
            <Button type="button" onClick={() => setSettingsOpen(false)}>
              Done
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
