import { Suspense } from 'react'
import Link from 'next/link'
import { getDashboardStats, getSubmissionChartData, getNewsletterChartData, getContactSubmissions, getAssessmentSubmissions } from '@/lib/admin/queries'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Mail, ClipboardList, Calendar, TrendingUp, ArrowUp, ArrowDown, ArrowRight, Plus } from 'lucide-react'
import { SubmissionChart } from '@/components/admin/SubmissionChart'
import { NewsletterChart } from '@/components/admin/NewsletterChart'

async function DashboardContent() {
  const [stats, submissionChart, newsletterChart, contacts, assessments] = await Promise.all([
    getDashboardStats(),
    getSubmissionChartData(),
    getNewsletterChartData(),
    getContactSubmissions(),
    getAssessmentSubmissions(),
  ])

  const recentContacts = contacts.slice(0, 5)
  const recentAssessments = assessments.slice(0, 5)

  const newsletterTrend =
    stats.newsletterSignupsLastWeek > 0
      ? Math.round(
          ((stats.newsletterSignupsThisWeek - stats.newsletterSignupsLastWeek) /
            stats.newsletterSignupsLastWeek) *
            100
        )
      : stats.newsletterSignupsThisWeek > 0
      ? 100
      : 0

  const statusColors: Record<string, string> = {
    new: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    reviewed: 'bg-blue-100 text-blue-800 border-blue-200',
    replied: 'bg-green-100 text-green-800 border-green-200',
    booked: 'bg-purple-100 text-purple-800 border-purple-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back. Here&apos;s what&apos;s happening with BBTX.AI.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* New Contacts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Contacts</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.newContacts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.newContacts > 0
                ? `${stats.newContacts} contact${stats.newContacts !== 1 ? 's' : ''} waiting for a response`
                : 'All caught up'}
            </p>
            <Link href="/admin/contact" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
              Review Contacts <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* New Assessments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Assessments</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.newAssessments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.newAssessments > 0
                ? `${stats.newAssessments} assessment${stats.newAssessments !== 1 ? 's' : ''} not yet reviewed`
                : 'All reviewed'}
            </p>
            <Link href="/admin/assessments" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
              Review Assessments <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.upcomingEvents > 0
                ? `${stats.upcomingEvents} event${stats.upcomingEvents !== 1 ? 's' : ''} in the next 30 days`
                : 'No upcoming events — schedule one'}
            </p>
            <Link href="/admin/events" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
              Manage Events <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* Newsletter Growth */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Newsletter This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{stats.newsletterSignupsThisWeek}</span>
              {newsletterTrend !== 0 && (
                <span className={`flex items-center text-xs font-medium ${newsletterTrend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {newsletterTrend > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {Math.abs(newsletterTrend)}%
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.newsletterTotal} total active subscribers
            </p>
            <Link href="/admin/newsletter" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
              View Signups <ArrowRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Submission Activity</CardTitle>
            <CardDescription>Contact and assessment submissions over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <SubmissionChart data={submissionChart} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Newsletter Growth</CardTitle>
            <CardDescription>New signups per week over the last 8 weeks</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <NewsletterChart data={newsletterChart} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Contacts</CardTitle>
              <CardDescription>Last 5 contact submissions</CardDescription>
            </div>
            <Link href="/admin/contact">
              <Button variant="ghost" size="sm" className="text-xs">
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            {recentContacts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No contact submissions yet</p>
            ) : (
              <div className="space-y-0">
                {recentContacts.map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{c.full_name}</p>
                      <p className="text-xs text-muted-foreground">{c.inquiry_type ?? 'General'}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(c.created_at).toLocaleDateString()}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${statusColors[c.status] ?? ''}`}
                      >
                        {c.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Assessments</CardTitle>
              <CardDescription>Last 5 assessment submissions</CardDescription>
            </div>
            <Link href="/admin/assessments">
              <Button variant="ghost" size="sm" className="text-xs">
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            {recentAssessments.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No assessment submissions yet</p>
            ) : (
              <div className="space-y-0">
                {recentAssessments.map((a) => (
                  <div key={a.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{a.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{a.organization_name ?? 'Unknown org'}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(a.created_at).toLocaleDateString()}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${statusColors[a.status] ?? ''}`}
                      >
                        {a.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/content?new=blog">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Blog Article
              </Button>
            </Link>
            <Link href="/admin/courses?new=true">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Course
              </Button>
            </Link>
            <Link href="/admin/events?new=true">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Event
              </Button>
            </Link>
            <Link href="/admin/content?new=podcast">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Podcast Episode
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-80 mt-2" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-40 mt-2" />
              <Skeleton className="h-3 w-24 mt-3" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-56 mt-1" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}
