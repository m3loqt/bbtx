'use server'

import { createClient } from '@supabase/supabase-js'
import type {
  Blog,
  PodcastEpisode,
  Course,
  Event,
  ContactSubmission,
  AssessmentSubmission,
  NewsletterSignup,
  DashboardStats,
  SubmissionChartPoint,
  NewsletterChartPoint,
} from './types'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getDashboardStats(): Promise<DashboardStats> {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
  const today = now.toISOString().split('T')[0]

  const [contacts, assessments, events, newsletterThisWeek, newsletterLastWeek, newsletterTotal] =
    await Promise.all([
      supabaseAdmin
        .from('contact_submissions')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'new'),
      supabaseAdmin
        .from('assessment_submissions')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'new'),
      supabaseAdmin
        .from('events')
        .select('id', { count: 'exact', head: true })
        .gte('event_date', today)
        .eq('is_published', true)
        .eq('is_cancelled', false),
      supabaseAdmin
        .from('newsletter_signups')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString()),
      supabaseAdmin
        .from('newsletter_signups')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', fourteenDaysAgo.toISOString())
        .lt('created_at', sevenDaysAgo.toISOString()),
      supabaseAdmin
        .from('newsletter_signups')
        .select('id', { count: 'exact', head: true })
        .eq('is_active', true),
    ])

  return {
    newContacts: contacts.count ?? 0,
    newAssessments: assessments.count ?? 0,
    upcomingEvents: events.count ?? 0,
    newsletterSignupsThisWeek: newsletterThisWeek.count ?? 0,
    newsletterSignupsLastWeek: newsletterLastWeek.count ?? 0,
    newsletterTotal: newsletterTotal.count ?? 0,
  }
}

export async function getSubmissionChartData(): Promise<SubmissionChartPoint[]> {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [contacts, assessments] = await Promise.all([
    supabaseAdmin
      .from('contact_submissions')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo.toISOString()),
    supabaseAdmin
      .from('assessment_submissions')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo.toISOString()),
  ])

  const dateMap = new Map<string, { contacts: number; assessments: number }>()

  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const key = d.toISOString().split('T')[0]
    dateMap.set(key, { contacts: 0, assessments: 0 })
  }

  for (const row of contacts.data ?? []) {
    const key = row.created_at.split('T')[0]
    const entry = dateMap.get(key)
    if (entry) entry.contacts++
  }

  for (const row of assessments.data ?? []) {
    const key = row.created_at.split('T')[0]
    const entry = dateMap.get(key)
    if (entry) entry.assessments++
  }

  return Array.from(dateMap.entries()).map(([date, vals]) => ({
    date,
    ...vals,
  }))
}

export async function getNewsletterChartData(): Promise<NewsletterChartPoint[]> {
  const eightWeeksAgo = new Date(Date.now() - 56 * 24 * 60 * 60 * 1000)

  const { data } = await supabaseAdmin
    .from('newsletter_signups')
    .select('created_at')
    .gte('created_at', eightWeeksAgo.toISOString())

  const weekMap = new Map<string, number>()

  for (let i = 7; i >= 0; i--) {
    const weekStart = new Date(Date.now() - (i * 7 + 6) * 24 * 60 * 60 * 1000)
    const label = `W${8 - i} ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    weekMap.set(label, 0)
  }

  const weeks = Array.from(weekMap.keys())

  for (const row of data ?? []) {
    const ts = new Date(row.created_at).getTime()
    const weekIndex = Math.floor((Date.now() - ts) / (7 * 24 * 60 * 60 * 1000))
    if (weekIndex >= 0 && weekIndex < 8) {
      const key = weeks[7 - weekIndex]
      if (key !== undefined) {
        weekMap.set(key, (weekMap.get(key) ?? 0) + 1)
      }
    }
  }

  return Array.from(weekMap.entries()).map(([week, signups]) => ({ week, signups }))
}

// ─── Blogs ────────────────────────────────────────────────────────────────────

export async function getBlogs(): Promise<Blog[]> {
  const { data, error } = await supabaseAdmin
    .from('blogs')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data as Blog[]
}

export async function upsertBlog(data: Partial<Blog>): Promise<Blog> {
  const { data: result, error } = await supabaseAdmin
    .from('blogs')
    .upsert({ ...data, updated_at: new Date().toISOString() })
    .select()
    .single()
  if (error) throw error
  return result as Blog
}

export async function deleteBlog(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from('blogs').delete().eq('id', id)
  if (error) throw error
}

export async function toggleBlogPublished(id: string, value: boolean): Promise<void> {
  const { error } = await supabaseAdmin
    .from('blogs')
    .update({ is_published: value, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

// ─── Podcasts ─────────────────────────────────────────────────────────────────

export async function getPodcastEpisodes(): Promise<PodcastEpisode[]> {
  const { data, error } = await supabaseAdmin
    .from('podcast_episodes')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data as PodcastEpisode[]
}

export async function upsertPodcastEpisode(data: Partial<PodcastEpisode>): Promise<PodcastEpisode> {
  const { data: result, error } = await supabaseAdmin
    .from('podcast_episodes')
    .upsert({ ...data, updated_at: new Date().toISOString() })
    .select()
    .single()
  if (error) throw error
  return result as PodcastEpisode
}

export async function deletePodcastEpisode(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from('podcast_episodes').delete().eq('id', id)
  if (error) throw error
}

export async function togglePodcastPublished(id: string, value: boolean): Promise<void> {
  const { error } = await supabaseAdmin
    .from('podcast_episodes')
    .update({ is_published: value, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabaseAdmin
    .from('courses')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data as Course[]
}

export async function upsertCourse(data: Partial<Course>): Promise<Course> {
  const { data: result, error } = await supabaseAdmin
    .from('courses')
    .upsert({ ...data, updated_at: new Date().toISOString() })
    .select()
    .single()
  if (error) throw error
  return result as Course
}

export async function deleteCourse(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from('courses').delete().eq('id', id)
  if (error) throw error
}

export async function toggleCoursePublished(id: string, value: boolean): Promise<void> {
  const { error } = await supabaseAdmin
    .from('courses')
    .update({ is_published: value, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

// ─── Events ───────────────────────────────────────────────────────────────────

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabaseAdmin
    .from('events')
    .select('*')
    .order('event_date', { ascending: true })
  if (error) throw error
  return data as Event[]
}

export async function upsertEvent(data: Partial<Event>): Promise<Event> {
  const { data: result, error } = await supabaseAdmin
    .from('events')
    .upsert({ ...data, updated_at: new Date().toISOString() })
    .select()
    .single()
  if (error) throw error
  return result as Event
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from('events').delete().eq('id', id)
  if (error) throw error
}

export async function toggleEventPublished(id: string, value: boolean): Promise<void> {
  const { error } = await supabaseAdmin
    .from('events')
    .update({ is_published: value, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

export async function cancelEvent(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('events')
    .update({ is_cancelled: true, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

// ─── Contact Submissions ──────────────────────────────────────────────────────

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const { data, error } = await supabaseAdmin
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as ContactSubmission[]
}

export async function updateContactStatus(id: string, status: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)
  if (error) throw error
}

export async function updateContactNotes(id: string, notes: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('contact_submissions')
    .update({ grant_notes: notes })
    .eq('id', id)
  if (error) throw error
}

// ─── Assessment Submissions ───────────────────────────────────────────────────

export async function getAssessmentSubmissions(): Promise<AssessmentSubmission[]> {
  const { data, error } = await supabaseAdmin
    .from('assessment_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as AssessmentSubmission[]
}

export async function getAssessmentByEmail(email: string): Promise<AssessmentSubmission | null> {
  const { data, error } = await supabaseAdmin
    .from('assessment_submissions')
    .select('*')
    .eq('email', email)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  if (error) return null
  return data as AssessmentSubmission
}

export async function updateAssessmentStatus(id: string, status: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('assessment_submissions')
    .update({ status })
    .eq('id', id)
  if (error) throw error
}

export async function updateAssessmentNotes(id: string, notes: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('assessment_submissions')
    .update({ grant_notes: notes })
    .eq('id', id)
  if (error) throw error
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export async function getNewsletterSignups(): Promise<NewsletterSignup[]> {
  const { data, error } = await supabaseAdmin
    .from('newsletter_signups')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as NewsletterSignup[]
}

export async function deactivateNewsletterSignup(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('newsletter_signups')
    .update({ is_active: false })
    .eq('id', id)
  if (error) throw error
}
