'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback, useRef } from 'react'
import { toast } from 'sonner'
import {
  getContactSubmissions,
  updateContactStatus,
  updateContactNotes,
  getAssessmentByEmail,
} from '@/lib/admin/queries'
import type { ContactSubmission, AssessmentSubmission } from '@/lib/admin/types'
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
import { MoreHorizontal, Download, Search, ClipboardList, CheckCircle2 } from 'lucide-react'
import { AssessmentDetailSheet } from '@/components/admin/AssessmentDetailSheet'

const statusColors: Record<string, string> = {
  new: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  reviewed: 'bg-blue-100 text-blue-800 border-blue-200',
  replied: 'bg-green-100 text-green-800 border-green-200',
}

function exportCSV(data: ContactSubmission[]) {
  const headers = ['ID', 'Name', 'Email', 'Inquiry Type', 'Message', 'Status', 'Notes', 'Date', 'IP']
  const rows = data.map((c) => [
    c.id,
    c.full_name,
    c.email,
    c.inquiry_type ?? '',
    (c.message ?? '').replace(/"/g, '""'),
    c.status,
    (c.grant_notes ?? '').replace(/"/g, '""'),
    c.created_at,
    c.ip_address ?? '',
  ])
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `bbtx-contact-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function ContactDetailSheet({
  contact,
  open,
  onOpenChange,
  onUpdate,
}: {
  contact: ContactSubmission | null
  open: boolean
  onOpenChange: (o: boolean) => void
  onUpdate: () => void
}) {
  const [status, setStatus] = useState(contact?.status ?? 'new')
  const [notes, setNotes] = useState(contact?.grant_notes ?? '')
  const [savedIndicator, setSavedIndicator] = useState(false)
  const [lookingUp, setLookingUp] = useState(false)
  const [assessment, setAssessment] = useState<AssessmentSubmission | null>(null)
  const [assessmentSheetOpen, setAssessmentSheetOpen] = useState(false)
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (contact) {
      setStatus(contact.status)
      setNotes(contact.grant_notes ?? '')
    }
  }, [contact])

  if (!contact) return null

  async function handleStatusChange(val: string | null) {
    if (!val) return
    setStatus(val)
    try {
      await updateContactStatus(contact!.id, val)
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
        await updateContactNotes(contact!.id, val)
        setSavedIndicator(true)
        setTimeout(() => setSavedIndicator(false), 2000)
        onUpdate()
      } catch {
        toast.error('Failed to save notes')
      }
    }, 800)
  }

  async function handleCheckAssessment() {
    setLookingUp(true)
    try {
      const result = await getAssessmentByEmail(contact!.email)
      if (result) {
        setAssessment(result)
        setAssessmentSheetOpen(true)
      } else {
        toast.info('No assessment found for this email')
      }
    } catch {
      toast.error('Failed to look up assessment')
    } finally {
      setLookingUp(false)
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-[640px] md:max-w-[720px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Contact Details</SheetTitle>
          </SheetHeader>

          <div className="space-y-6 py-4 px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Name</p>
                <p className="text-sm font-medium mt-1">{contact.full_name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                <p className="text-sm font-medium mt-1">{contact.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Inquiry Type</p>
                <p className="text-sm font-medium mt-1">{contact.inquiry_type ?? '—'}</p>
              </div>
            </div>

            {contact.message && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Message</p>
                <div className="rounded-md border p-3 text-sm bg-secondary/30 whitespace-pre-wrap">
                  {contact.message}
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Grant&apos;s Notes</Label>
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

            <Separator />

            <Button
              variant="outline"
              size="sm"
              onClick={handleCheckAssessment}
              disabled={lookingUp}
              className="gap-2"
            >
              <ClipboardList className="h-4 w-4" />
              {lookingUp ? 'Looking up...' : 'Check for Assessment'}
            </Button>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>Submitted: {new Date(contact.created_at).toLocaleString()}</p>
              {contact.ip_address && <p>IP: {contact.ip_address}</p>}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {assessment && (
        <AssessmentDetailSheet
          assessment={assessment}
          open={assessmentSheetOpen}
          onOpenChange={setAssessmentSheetOpen}
          onUpdate={() => void 0}
        />
      )}
    </>
  )
}

export default function ContactPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactSubmission | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [assessment, setAssessment] = useState<AssessmentSubmission | null>(null)
  const [assessmentSheetOpen, setAssessmentSheetOpen] = useState(false)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getContactSubmissions()
      setContacts(data)
    } catch {
      toast.error('Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  function openDetail(contact: ContactSubmission) {
    setSelected(contact)
    setSheetOpen(true)
  }

  async function handleCheckAssessment(email: string) {
    try {
      const result = await getAssessmentByEmail(email)
      if (result) {
        setAssessment(result)
        setAssessmentSheetOpen(true)
      } else {
        toast.info('No assessment found for this email')
      }
    } catch {
      toast.error('Failed to look up assessment')
    }
  }

  const filtered = contacts.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!c.full_name.toLowerCase().includes(q) && !c.email.toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contact Submissions</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage contact form submissions</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => exportCSV(contacts)} className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name or email..."
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
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
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
              ? 'No contacts match your filters.'
              : 'No contact submissions yet.'}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-32">Inquiry Type</TableHead>
              <TableHead className="w-28">Date</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow
                key={c.id}
                className={`h-[52px] cursor-pointer hover:bg-secondary/50 ${c.status === 'new' ? 'border-l-2 border-l-yellow-400' : ''}`}
                onClick={() => openDetail(c)}
              >
                <TableCell className="font-medium">{c.full_name}</TableCell>
                <TableCell className="text-muted-foreground">{c.email}</TableCell>
                <TableCell>
                  {c.inquiry_type && (
                    <Badge variant="secondary" className="text-xs">{c.inquiry_type}</Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(c.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs ${statusColors[c.status] ?? ''}`}>
                    {c.status}
                  </Badge>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      id={`dropdown-contact-${c.id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openDetail(c)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem onClick={async () => {
                        await updateContactStatus(c.id, 'replied')
                        await load()
                        toast.success('Marked as replied')
                      }}>Mark as Replied</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCheckAssessment(c.email)}>
                        Check for Assessment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <ContactDetailSheet
        contact={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onUpdate={load}
      />

      {assessment && (
        <AssessmentDetailSheet
          assessment={assessment}
          open={assessmentSheetOpen}
          onOpenChange={setAssessmentSheetOpen}
          onUpdate={() => void 0}
        />
      )}
    </div>
  )
}
