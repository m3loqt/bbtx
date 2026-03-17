'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { getNewsletterSignups, deactivateNewsletterSignup } from '@/lib/admin/queries'
import type { NewsletterSignup } from '@/lib/admin/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Download, Search, MoreHorizontal, Users, TrendingUp, Loader2 } from 'lucide-react'

const sourceBadgeColors: Record<string, string> = {
  community: 'bg-blue-100 text-blue-800 border-blue-200',
  homepage: 'bg-green-100 text-green-800 border-green-200',
  assessment: 'bg-purple-100 text-purple-800 border-purple-200',
}

function exportCSV(data: NewsletterSignup[]) {
  const headers = ['ID', 'Email', 'Source', 'Active', 'Date Signed Up']
  const rows = data.map((n) => [n.id, n.email, n.source, n.is_active ? 'Yes' : 'No', n.created_at])
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `bbtx-newsletter-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function NewsletterPage() {
  const [signups, setSignups] = useState<NewsletterSignup[]>([])
  const [loading, setLoading] = useState(true)
  const [deactivateTarget, setDeactivateTarget] = useState<NewsletterSignup | null>(null)
  const [deactivating, setDeactivating] = useState(false)
  const [search, setSearch] = useState('')
  const [sourceFilter, setSourceFilter] = useState('all')

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getNewsletterSignups()
      setSignups(data)
    } catch {
      toast.error('Failed to load newsletter signups')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function handleDeactivate() {
    if (!deactivateTarget) return
    setDeactivating(true)
    try {
      await deactivateNewsletterSignup(deactivateTarget.id)
      toast.success('Subscriber deactivated')
      setDeactivateTarget(null)
      await load()
    } catch {
      toast.error('Failed to deactivate')
    } finally {
      setDeactivating(false)
    }
  }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const totalActive = signups.filter((s) => s.is_active).length
  const newThisWeek = signups.filter((s) => s.created_at >= sevenDaysAgo).length

  const filtered = signups.filter((s) => {
    if (sourceFilter !== 'all' && s.source !== sourceFilter) return false
    if (search && !s.email.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const sources = [...new Set(signups.map((s) => s.source).filter(Boolean))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Newsletter Signups</h1>
          <p className="text-muted-foreground text-sm mt-1">View and manage newsletter subscribers</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => exportCSV(signups)} className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Stat Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[0, 1].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2"><Skeleton className="h-4 w-24" /></CardHeader>
              <CardContent><Skeleton className="h-8 w-16" /></CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalActive}</div>
              <p className="text-xs text-muted-foreground mt-1">Active subscribers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{newThisWeek}</div>
              <p className="text-xs text-muted-foreground mt-1">Signups in the last 7 days</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search email..."
            className="pl-8 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            {sources.map((s) => (
              <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
            ))}
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
            {search || sourceFilter !== 'all' ? 'No signups match your filters.' : 'No newsletter signups yet.'}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead className="w-28">Source</TableHead>
              <TableHead className="w-32">Date Signed Up</TableHead>
              <TableHead className="w-20">Active</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((s) => (
              <TableRow key={s.id} className={`h-[52px] ${!s.is_active ? 'opacity-50' : ''}`}>
                <TableCell className="font-medium">{s.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-xs ${sourceBadgeColors[s.source] ?? ''}`}
                  >
                    {s.source}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(s.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={s.is_active ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {s.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {s.is_active && (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeactivateTarget(s)}
                        >
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Deactivate Dialog */}
      <Dialog open={!!deactivateTarget} onOpenChange={(o) => !o && setDeactivateTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Deactivate <strong>{deactivateTarget?.email}</strong>? They will no longer receive newsletters.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeactivateTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeactivate} disabled={deactivating}>
              {deactivating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
