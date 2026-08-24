'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback, useRef } from 'react'
import { toast } from 'sonner'
import {
  getTestimonialSubmissions,
  updateTestimonialStatus,
  updateTestimonialNotes,
} from '@/lib/admin/queries'
import type { TestimonialSubmission } from '@/lib/admin/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from '@/components/ui/sheet'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { MoreHorizontal, Download, Search, CheckCircle2 } from 'lucide-react'

function exportCSV(data: TestimonialSubmission[]) {
  const headers = ['ID', 'Name', 'Role/Company', 'Testimonial', 'Permission', 'Status', 'Notes', 'Date', 'IP']
  const rows = data.map((t) => [
    t.id,
    t.full_name,
    t.role_company ?? '',
    (t.testimonial ?? '').replace(/"/g, '""'),
    t.permission_to_publish ? 'Yes' : 'No',
    t.status,
    (t.grant_notes ?? '').replace(/"/g, '""'),
    t.created_at,
    t.ip_address ?? '',
  ])
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `bbtx-testimonials-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function TestimonialDetailSheet({
  submission,
  open,
  onOpenChange,
  onUpdate,
}: {
  submission: TestimonialSubmission | null
  open: boolean
  onOpenChange: (o: boolean) => void
  onUpdate: () => void
}) {
  const [status, setStatus] = useState(submission?.status ?? 'new')
  const [notes, setNotes] = useState(submission?.grant_notes ?? '')
  const [savedIndicator, setSavedIndicator] = useState(false)
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (submission) {
      setStatus(submission.status)
      setNotes(submission.grant_notes ?? '')
    }
  }, [submission])

  if (!submission) return null

  async function handleStatusChange(val: string | null) {
    if (!val) return
    setStatus(val)
    try {
      await updateTestimonialStatus(submission!.id, val)
      onUpdate()
    } catch {
      toast.error('Failed to update status')
    }
  }

  function handleNotesChange(val: string) {
    setNotes(val)
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current)
    }
    saveTimeout.current = setTimeout(async () => {
      try {
        await updateTestimonialNotes(submission!.id, val)
        setSavedIndicator(true)
        setTimeout(() => setSavedIndicator(false), 2000)
        onUpdate()
      } catch {
        toast.error('Failed to save notes')
      }
    }, 800)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[640px] md:max-w-[720px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Testimonial Details</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4 px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Name</p>
              <p className="text-sm font-medium mt-1">{submission.full_name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Role / Company</p>
              <p className="text-sm font-medium mt-1">{submission.role_company ?? '—'}</p>
            </div>
          </div>

          {submission.photo_url && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Photo</p>
              {/* eslint-disable-next-line @next/next/no-img-element -- remote Blob URL, avatar-sized preview */}
              <img src={submission.photo_url} alt="" className="h-16 w-16 rounded-full object-cover" />
            </div>
          )}

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Testimonial</p>
            <div className="rounded-md border p-3 text-sm bg-secondary/30 whitespace-pre-wrap">
              {submission.testimonial}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Permission to Publish</p>
            <Badge
              variant="outline"
              className={`mt-1 text-xs ${submission.permission_to_publish ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}
            >
              {submission.permission_to_publish ? 'Yes' : 'No'}
            </Badge>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Approving does not publish automatically — the live testimonials are still a hand-curated
              list in the site code. Fold the text into that list, then mark this Published.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Notes</Label>
              {savedIndicator && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Saved
                </span>
              )}
            </div>
            <Textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={4}
              placeholder="Add internal notes..."
            />
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>Submitted: {new Date(submission.created_at).toLocaleString()}</p>
            {submission.ip_address && <p>IP: {submission.ip_address}</p>}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function TestimonialsPage() {
  const [submissions, setSubmissions] = useState<TestimonialSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<TestimonialSubmission | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getTestimonialSubmissions()
      setSubmissions(data)
    } catch {
      toast.error('Failed to load testimonial submissions')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  function openDetail(submission: TestimonialSubmission) {
    setSelected(submission)
    setSheetOpen(true)
  }

  const filtered = submissions.filter((t) => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!t.full_name.toLowerCase().includes(q) && !(t.role_company ?? '').toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Testimonial Submissions</h1>
          <p className="text-muted-foreground text-sm mt-1">Review testimonials submitted through the site</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => exportCSV(submissions)} className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name or role..."
            className="pl-8 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value ?? 'all')}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[52px] w-full" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground">
            {search || statusFilter !== 'all'
              ? 'No submissions match your filters.'
              : 'No testimonial submissions yet.'}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role / Company</TableHead>
              <TableHead>Testimonial</TableHead>
              <TableHead className="w-24">Permission</TableHead>
              <TableHead className="w-28">Date</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((t) => (
              <TableRow
                key={t.id}
                className={`h-[52px] cursor-pointer hover:bg-secondary/50 ${t.status === 'new' ? 'border-l-2 border-l-yellow-400' : ''}`}
                onClick={() => openDetail(t)}
              >
                <TableCell className="font-medium">{t.full_name}</TableCell>
                <TableCell className="text-muted-foreground">{t.role_company ?? '—'}</TableCell>
                <TableCell className="max-w-xs truncate text-sm text-muted-foreground" title={t.testimonial ?? ''}>
                  {t.testimonial}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-xs ${t.permission_to_publish ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}
                  >
                    {t.permission_to_publish ? 'Yes' : 'No'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(t.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      id={`dropdown-testimonial-${t.id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openDetail(t)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={async () => {
                        await updateTestimonialStatus(t.id, 'approved')
                        await load()
                        toast.success('Marked as approved')
                      }}>Mark as Approved</DropdownMenuItem>
                      <DropdownMenuItem onClick={async () => {
                        await updateTestimonialStatus(t.id, 'rejected')
                        await load()
                        toast.success('Marked as rejected')
                      }}>Mark as Rejected</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <TestimonialDetailSheet
        submission={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onUpdate={load}
      />
    </div>
  )
}
