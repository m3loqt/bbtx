'use client'

import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { updateAssessmentStatus, updateAssessmentNotes } from '@/lib/admin/queries'
import type { AssessmentSubmission } from '@/lib/admin/types'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { CheckCircle2 } from 'lucide-react'

interface Props {
  assessment: AssessmentSubmission | null
  open: boolean
  onOpenChange: (o: boolean) => void
  onUpdate: () => void
}

const statusColors: Record<string, string> = {
  new: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  reviewed: 'bg-blue-100 text-blue-800 border-blue-200',
  booked: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
}

export function AssessmentDetailSheet({ assessment, open, onOpenChange, onUpdate }: Props) {
  const [status, setStatus] = useState(assessment?.status ?? 'new')
  const [notes, setNotes] = useState(assessment?.grant_notes ?? '')
  const [savedIndicator, setSavedIndicator] = useState(false)
  const saveTimeout = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (assessment) {
      setStatus(assessment.status)
      setNotes(assessment.grant_notes ?? '')
    }
  }, [assessment])

  if (!assessment) return null

  async function handleStatusChange(val: string) {
    setStatus(val)
    try {
      await updateAssessmentStatus(assessment!.id, val)
      onUpdate()
    } catch {
      toast.error('Failed to update status')
    }
  }

  function handleNotesChange(val: string) {
    setNotes(val)
    clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(async () => {
      try {
        await updateAssessmentNotes(assessment!.id, val)
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
          <SheetTitle>Assessment Details</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4 px-4 sm:px-6">
          {/* Section 1: About You */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">About You</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm font-medium">{assessment.full_name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{assessment.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="text-sm font-medium">{assessment.role ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Organization</p>
                <p className="text-sm font-medium">{assessment.organization_name ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Industry</p>
                <p className="text-sm font-medium">{assessment.industry ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Org Size</p>
                <p className="text-sm font-medium">{assessment.organization_size ?? '—'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Section 2: AI Situation */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">AI Situation</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Currently Using AI</p>
                <p className="text-sm font-medium">{assessment.currently_using_ai ?? '—'}</p>
              </div>
              {assessment.ai_target_areas && assessment.ai_target_areas.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Target Areas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {assessment.ai_target_areas.map((area) => (
                      <Badge key={area} variant="secondary" className="text-xs">{area}</Badge>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground">AI Strategy Status</p>
                <p className="text-sm font-medium">{assessment.ai_strategy_status ?? '—'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Section 3: Challenges */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Challenges</h3>
            <div className="space-y-3">
              {assessment.biggest_challenges && assessment.biggest_challenges.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Biggest Challenges</p>
                  <div className="flex flex-wrap gap-1.5">
                    {assessment.biggest_challenges.map((c) => (
                      <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {assessment.other_challenge && (
                <div>
                  <p className="text-xs text-muted-foreground">Other Challenge</p>
                  <p className="text-sm font-medium">{assessment.other_challenge}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Section 4: What They Need */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">What They Need</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Primary Need</p>
                <p className="text-sm font-medium">{assessment.primary_need ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Timeline</p>
                <p className="text-sm font-medium">{assessment.timeline ?? '—'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Section 5: Internal */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Internal</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
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
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Submitted: {new Date(assessment.created_at).toLocaleString()}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
