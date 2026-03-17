'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { getEvents, upsertEvent, deleteEvent, toggleEventPublished, cancelEvent } from '@/lib/admin/queries'
import type { Event } from '@/lib/admin/types'
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
import { Plus, MoreHorizontal, Trash2, Edit, Loader2, XCircle } from 'lucide-react'

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().nullable().optional(),
  event_type: z.string().min(1, 'Event type is required'),
  event_date: z.string().min(1, 'Event date is required'),
  event_time: z.string().min(1, 'Event time is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  duration_minutes: z.coerce.number().nullable().optional(),
  is_free: z.boolean().default(true),
  price_usd: z.coerce.number().nullable().optional(),
  booking_url: z.string().url('Must be a valid URL').min(1, 'Booking URL is required'),
  max_seats: z.coerce.number().nullable().optional(),
  seats_remaining: z.coerce.number().nullable().optional(),
  is_published: z.boolean().default(false),
  sort_order: z.coerce.number().default(0),
})

type EventFormData = z.infer<typeof eventSchema>

const EVENT_TYPES = ['Webinar', 'Cohort', 'Live Session']
const TIMEZONES = ['EST', 'CST', 'MST', 'PST', 'GMT']

const typeBadgeColors: Record<string, string> = {
  Webinar: 'bg-blue-100 text-blue-800 border-blue-200',
  Cohort: 'bg-purple-100 text-purple-800 border-purple-200',
  'Live Session': 'bg-green-100 text-green-800 border-green-200',
}

export default function EventsPage() {
  const searchParams = useSearchParams()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Event | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null)
  const [cancelTarget, setCancelTarget] = useState<Event | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [cancelling, setCancelling] = useState(false)
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: { is_free: true, is_published: false, sort_order: 0, timezone: 'EST' },
  })

  const isFree = watch('is_free')
  const isPublished = watch('is_published')
  const eventType = watch('event_type')
  const timezone = watch('timezone')

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getEvents()
      setEvents(data)
    } catch {
      toast.error('Failed to load events')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const prevSearch = React.useRef('')
  useEffect(() => {
    const newParam = searchParams.get('new')
    if (newParam === 'true' && prevSearch.current !== 'true') {
      prevSearch.current = 'true'
      openSheet(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  function openSheet(event: Event | null) {
    setEditTarget(event)
    if (event) {
      reset({
        title: event.title,
        description: event.description ?? '',
        event_type: event.event_type,
        event_date: event.event_date,
        event_time: event.event_time,
        timezone: event.timezone,
        duration_minutes: event.duration_minutes ?? undefined,
        is_free: event.is_free,
        price_usd: event.price_usd ?? undefined,
        booking_url: event.booking_url,
        max_seats: event.max_seats ?? undefined,
        seats_remaining: event.seats_remaining ?? undefined,
        is_published: event.is_published,
        sort_order: event.sort_order,
      })
    } else {
      reset({ is_free: true, is_published: false, sort_order: 0, timezone: 'EST' })
    }
    setSheetOpen(true)
  }

  async function onSubmit(data: EventFormData) {
    setSaving(true)
    try {
      await upsertEvent({
        ...(editTarget ? { id: editTarget.id } : {}),
        ...data,
        description: data.description || null,
        duration_minutes: data.duration_minutes ?? null,
        price_usd: data.is_free ? null : (data.price_usd ?? null),
        max_seats: data.max_seats ?? null,
        seats_remaining: data.seats_remaining ?? null,
      })
      toast.success('Event saved')
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
      await deleteEvent(deleteTarget.id)
      toast.success('Event deleted')
      setDeleteTarget(null)
      await load()
    } catch {
      toast.error('Failed to delete event')
    } finally {
      setDeleting(false)
    }
  }

  async function handleCancel() {
    if (!cancelTarget) return
    setCancelling(true)
    try {
      await cancelEvent(cancelTarget.id)
      toast.success('Event cancelled')
      setCancelTarget(null)
      await load()
    } catch {
      toast.error('Failed to cancel event')
    } finally {
      setCancelling(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  const filteredEvents = events.filter((e) => {
    if (typeFilter !== 'all' && e.event_type !== typeFilter) return false
    if (statusFilter === 'upcoming' && (e.event_date < today || e.is_cancelled)) return false
    if (statusFilter === 'past' && e.event_date >= today) return false
    if (statusFilter === 'cancelled' && !e.is_cancelled) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage webinars, cohorts, and live sessions</p>
        </div>
        <Button onClick={() => openSheet(null)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Event
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {EVENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="past">Past</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[52px] w-full" />
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground mb-4">No events found. Add your first event to get started.</p>
          <Button onClick={() => openSheet(null)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Event
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="w-28">Type</TableHead>
              <TableHead className="w-40">Date & Time</TableHead>
              <TableHead className="w-24">Price</TableHead>
              <TableHead className="w-20">Published</TableHead>
              <TableHead className="w-20">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id} className="h-[52px]">
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs ${typeBadgeColors[event.event_type] ?? ''}`}>
                    {event.event_type}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  <div>{new Date(event.event_date).toLocaleDateString()}</div>
                  <div className="text-xs">{event.event_time} {event.timezone}</div>
                </TableCell>
                <TableCell>
                  {event.is_free ? (
                    <Badge variant="secondary" className="text-xs">Free</Badge>
                  ) : (
                    <span className="text-sm">${event.price_usd}</span>
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={event.is_published}
                    disabled={event.is_cancelled}
                    onCheckedChange={async (val) => {
                      setEvents((prev) => prev.map((e) => e.id === event.id ? { ...e, is_published: val } : e))
                      try { await toggleEventPublished(event.id, val) } catch {
                        setEvents((prev) => prev.map((e) => e.id === event.id ? { ...e, is_published: event.is_published } : e))
                        toast.error('Failed to update')
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  {event.is_cancelled ? (
                    <Badge variant="destructive" className="text-xs">Cancelled</Badge>
                  ) : event.event_date >= today ? (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">Upcoming</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">Past</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openSheet(event)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      {!event.is_cancelled && (
                        <DropdownMenuItem className="text-orange-600" onClick={() => setCancelTarget(event)}>
                          <XCircle className="mr-2 h-4 w-4" /> Cancel Event
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(event)}>
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
            <SheetTitle>{editTarget ? 'Edit Event' : 'Add Event'}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4 px-4 sm:px-6">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input {...register('title')} />
              {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea rows={3} {...register('description')} />
            </div>

            <div className="space-y-2">
              <Label>Event Type *</Label>
              <Select value={eventType} onValueChange={(v) => setValue('event_type', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.event_type && <p className="text-xs text-destructive">{errors.event_type.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Event Date *</Label>
                <Input type="date" {...register('event_date')} />
                {errors.event_date && <p className="text-xs text-destructive">{errors.event_date.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Event Time *</Label>
                <Input type="time" {...register('event_time')} />
                {errors.event_time && <p className="text-xs text-destructive">{errors.event_time.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select value={timezone} onValueChange={(v) => setValue('timezone', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duration (min)</Label>
                <Input type="number" min={1} {...register('duration_minutes')} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>Is Free</Label>
              <Switch checked={isFree} onCheckedChange={(v) => setValue('is_free', v)} />
            </div>

            {!isFree && (
              <div className="space-y-2">
                <Label>Price (USD)</Label>
                <Input type="number" step="0.01" min={0} placeholder="0.00" {...register('price_usd')} />
              </div>
            )}

            <div className="space-y-2">
              <Label>Booking URL *</Label>
              <Input type="url" placeholder="https://" {...register('booking_url')} />
              {errors.booking_url && <p className="text-xs text-destructive">{errors.booking_url.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Max Seats</Label>
                <Input type="number" min={1} {...register('max_seats')} />
              </div>
              <div className="space-y-2">
                <Label>Seats Remaining</Label>
                <Input type="number" min={0} {...register('seats_remaining')} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label>Published</Label>
              <Switch checked={isPublished} onCheckedChange={(v) => setValue('is_published', v)} />
            </div>

            <div className="space-y-2">
              <Label>Sort Order</Label>
              <Input type="number" {...register('sort_order')} />
            </div>

            <SheetFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Event
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Cancel Dialog */}
      <Dialog open={!!cancelTarget} onOpenChange={(o) => !o && setCancelTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Event?</DialogTitle>
            <DialogDescription>
              This will mark &ldquo;{cancelTarget?.title}&rdquo; as cancelled. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelTarget(null)}>Keep</Button>
            <Button variant="destructive" onClick={handleCancel} disabled={cancelling}>
              {cancelling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Cancel Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
