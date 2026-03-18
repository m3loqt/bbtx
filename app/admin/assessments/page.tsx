'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { getAssessmentSubmissions, updateAssessmentStatus } from '@/lib/admin/queries'
import type { AssessmentSubmission } from '@/lib/admin/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Download, Search, MoreHorizontal } from 'lucide-react'
import { AssessmentDetailSheet } from '@/components/admin/AssessmentDetailSheet'

const statusColors: Record<string, string> = {
  new: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  reviewed: 'bg-blue-100 text-blue-800 border-blue-200',
  booked: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
}

function exportCSV(data: AssessmentSubmission[]) {
  const headers = [
    'ID', 'Name', 'Email', 'Role', 'Organization', 'Industry', 'Org Size',
    'Using AI', 'Target Areas', 'Strategy Status', 'Challenges', 'Other Challenge',
    'Primary Need', 'Timeline', 'Status', 'Notes', 'Date',
  ]
  const rows = data.map((a) => [
    a.id, a.full_name, a.email, a.role ?? '', a.organization_name ?? '',
    a.industry ?? '', a.organization_size ?? '', a.currently_using_ai ?? '',
    (a.ai_target_areas ?? []).join('; '), a.ai_strategy_status ?? '',
    (a.biggest_challenges ?? []).join('; '), a.other_challenge ?? '',
    a.primary_need ?? '', a.timeline ?? '', a.status,
    (a.grant_notes ?? '').replace(/"/g, '""'), a.created_at,
  ])
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `bbtx-assessments-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<AssessmentSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<AssessmentSubmission | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getAssessmentSubmissions()
      setAssessments(data)
    } catch {
      toast.error('Failed to load assessments')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  function openDetail(a: AssessmentSubmission) {
    setSelected(a)
    setSheetOpen(true)
  }

  const filtered = assessments.filter((a) => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      const match = a.full_name.toLowerCase().includes(q)
        || a.email.toLowerCase().includes(q)
        || (a.organization_name ?? '').toLowerCase().includes(q)
      if (!match) return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Assessment Submissions</h1>
          <p className="text-muted-foreground text-sm mt-1">Review assessment submissions before kickoff calls</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => exportCSV(assessments)} className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name, email, org..."
            className="pl-8 w-72"
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
            <SelectItem value="booked">Booked</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
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
              ? 'No assessments match your filters.'
              : 'No assessment submissions yet.'}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead className="w-32">Primary Need</TableHead>
              <TableHead className="w-24">Timeline</TableHead>
              <TableHead className="w-28">Date</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((a) => (
              <TableRow
                key={a.id}
                className={`h-[52px] cursor-pointer hover:bg-secondary/50 ${a.status === 'new' ? 'border-l-2 border-l-yellow-400' : ''}`}
                onClick={() => openDetail(a)}
              >
                <TableCell className="font-medium">{a.full_name}</TableCell>
                <TableCell className="text-muted-foreground">{a.email}</TableCell>
                <TableCell className="text-sm">{a.organization_name ?? '—'}</TableCell>
                <TableCell>
                  {a.primary_need && (
                    <Badge variant="secondary" className="text-xs">{a.primary_need}</Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{a.timeline ?? '—'}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(a.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs ${statusColors[a.status] ?? ''}`}>
                    {a.status}
                  </Badge>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      id={`dropdown-assessment-${a.id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openDetail(a)}>View Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {['new', 'reviewed', 'booked', 'completed'].map((s) => (
                        <DropdownMenuItem
                          key={s}
                          onClick={async () => {
                            await updateAssessmentStatus(a.id, s)
                            await load()
                            toast.success(`Status set to ${s}`)
                          }}
                        >
                          Mark as {s.charAt(0).toUpperCase() + s.slice(1)}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AssessmentDetailSheet
        assessment={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onUpdate={load}
      />
    </div>
  )
}
