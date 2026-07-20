'use server'

import { sql } from '@/lib/db'
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

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getDashboardStats(): Promise<DashboardStats> {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString()
  const today = now.toISOString().split('T')[0]

  const [contacts, assessments, events, newsletterThisWeek, newsletterLastWeek, newsletterTotal] =
    await Promise.all([
      sql`SELECT COUNT(*)::int AS count FROM contact_submissions WHERE status = 'new'`,
      sql`SELECT COUNT(*)::int AS count FROM assessment_submissions WHERE status = 'new'`,
      sql`SELECT COUNT(*)::int AS count FROM events WHERE event_date >= ${today} AND is_published = true AND is_cancelled = false`,
      sql`SELECT COUNT(*)::int AS count FROM newsletter_signups WHERE created_at >= ${sevenDaysAgo}`,
      sql`SELECT COUNT(*)::int AS count FROM newsletter_signups WHERE created_at >= ${fourteenDaysAgo} AND created_at < ${sevenDaysAgo}`,
      sql`SELECT COUNT(*)::int AS count FROM newsletter_signups WHERE is_active = true`,
    ])

  return {
    newContacts: (contacts[0]?.count as number) ?? 0,
    newAssessments: (assessments[0]?.count as number) ?? 0,
    upcomingEvents: (events[0]?.count as number) ?? 0,
    newsletterSignupsThisWeek: (newsletterThisWeek[0]?.count as number) ?? 0,
    newsletterSignupsLastWeek: (newsletterLastWeek[0]?.count as number) ?? 0,
    newsletterTotal: (newsletterTotal[0]?.count as number) ?? 0,
  }
}

export async function getSubmissionChartData(): Promise<SubmissionChartPoint[]> {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [contacts, assessments] = await Promise.all([
    sql`SELECT created_at FROM contact_submissions WHERE created_at >= ${thirtyDaysAgo}`,
    sql`SELECT created_at FROM assessment_submissions WHERE created_at >= ${thirtyDaysAgo}`,
  ])

  const dateMap = new Map<string, { contacts: number; assessments: number }>()

  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const key = d.toISOString().split('T')[0]
    dateMap.set(key, { contacts: 0, assessments: 0 })
  }

  for (const row of contacts) {
    const key = (row.created_at as string).split('T')[0]
    const entry = dateMap.get(key)
    if (entry) entry.contacts++
  }

  for (const row of assessments) {
    const key = (row.created_at as string).split('T')[0]
    const entry = dateMap.get(key)
    if (entry) entry.assessments++
  }

  return Array.from(dateMap.entries()).map(([date, vals]) => ({
    date,
    ...vals,
  }))
}

export async function getNewsletterChartData(): Promise<NewsletterChartPoint[]> {
  const eightWeeksAgo = new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString()

  const data = await sql`SELECT created_at FROM newsletter_signups WHERE created_at >= ${eightWeeksAgo}`

  const weekMap = new Map<string, number>()

  for (let i = 7; i >= 0; i--) {
    const weekStart = new Date(Date.now() - (i * 7 + 6) * 24 * 60 * 60 * 1000)
    const label = `W${8 - i} ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    weekMap.set(label, 0)
  }

  const weeks = Array.from(weekMap.keys())

  for (const row of data) {
    const ts = new Date(row.created_at as string).getTime()
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
  const rows = await sql`SELECT * FROM blogs ORDER BY sort_order ASC`
  return rows as unknown as Blog[]
}

export async function upsertBlog(data: Partial<Blog>): Promise<Blog> {
  if (data.id) {
    const [result] = await sql`
      UPDATE blogs SET
        title             = COALESCE(${data.title ?? null}, title),
        excerpt           = COALESCE(${data.excerpt ?? null}, excerpt),
        cover_image_url   = COALESCE(${data.cover_image_url ?? null}, cover_image_url),
        substack_url      = COALESCE(${data.substack_url ?? null}, substack_url),
        category          = COALESCE(${data.category ?? null}, category),
        published_date    = COALESCE(${data.published_date ?? null}, published_date),
        read_time_minutes = COALESCE(${data.read_time_minutes ?? null}, read_time_minutes),
        is_featured       = COALESCE(${data.is_featured ?? null}, is_featured),
        is_published      = COALESCE(${data.is_published ?? null}, is_published),
        sort_order        = COALESCE(${data.sort_order ?? null}, sort_order),
        updated_at        = now()
      WHERE id = ${data.id}
      RETURNING *
    `
    if (!result) throw new Error('Blog not found')
    return result as unknown as Blog
  }

  const [result] = await sql`
    INSERT INTO blogs
      (title, excerpt, cover_image_url, substack_url, category, published_date, read_time_minutes, is_featured, is_published, sort_order)
    VALUES
      (${data.title}, ${data.excerpt ?? null}, ${data.cover_image_url ?? null}, ${data.substack_url},
       ${data.category ?? null}, ${data.published_date ?? null}, ${data.read_time_minutes ?? null},
       ${data.is_featured ?? false}, ${data.is_published ?? false}, ${data.sort_order ?? 0})
    RETURNING *
  `
  return result as unknown as Blog
}

export async function deleteBlog(id: string): Promise<void> {
  await sql`DELETE FROM blogs WHERE id = ${id}`
}

export async function toggleBlogPublished(id: string, value: boolean): Promise<void> {
  await sql`UPDATE blogs SET is_published = ${value}, updated_at = now() WHERE id = ${id}`
}

// ─── Podcasts ─────────────────────────────────────────────────────────────────

export async function getPodcastEpisodes(): Promise<PodcastEpisode[]> {
  const rows = await sql`SELECT * FROM podcast_episodes ORDER BY sort_order ASC`
  return rows as unknown as PodcastEpisode[]
}

export async function upsertPodcastEpisode(data: Partial<PodcastEpisode>): Promise<PodcastEpisode> {
  if (data.id) {
    const [result] = await sql`
      UPDATE podcast_episodes SET
        episode_number     = COALESCE(${data.episode_number ?? null}, episode_number),
        title              = COALESCE(${data.title ?? null}, title),
        description        = COALESCE(${data.description ?? null}, description),
        cover_image_url    = COALESCE(${data.cover_image_url ?? null}, cover_image_url),
        spotify_url        = COALESCE(${data.spotify_url ?? null}, spotify_url),
        apple_podcasts_url = COALESCE(${data.apple_podcasts_url ?? null}, apple_podcasts_url),
        published_date     = COALESCE(${data.published_date ?? null}, published_date),
        duration_minutes   = COALESCE(${data.duration_minutes ?? null}, duration_minutes),
        is_featured        = COALESCE(${data.is_featured ?? null}, is_featured),
        is_published       = COALESCE(${data.is_published ?? null}, is_published),
        sort_order         = COALESCE(${data.sort_order ?? null}, sort_order),
        updated_at         = now()
      WHERE id = ${data.id}
      RETURNING *
    `
    if (!result) throw new Error('Podcast episode not found')
    return result as unknown as PodcastEpisode
  }

  const [result] = await sql`
    INSERT INTO podcast_episodes
      (episode_number, title, description, cover_image_url, spotify_url, apple_podcasts_url, published_date, duration_minutes, is_featured, is_published, sort_order)
    VALUES
      (${data.episode_number}, ${data.title}, ${data.description ?? null}, ${data.cover_image_url ?? null},
       ${data.spotify_url ?? null}, ${data.apple_podcasts_url ?? null}, ${data.published_date ?? null},
       ${data.duration_minutes ?? null}, ${data.is_featured ?? false}, ${data.is_published ?? false}, ${data.sort_order ?? 0})
    RETURNING *
  `
  return result as unknown as PodcastEpisode
}

export async function deletePodcastEpisode(id: string): Promise<void> {
  await sql`DELETE FROM podcast_episodes WHERE id = ${id}`
}

export async function togglePodcastPublished(id: string, value: boolean): Promise<void> {
  await sql`UPDATE podcast_episodes SET is_published = ${value}, updated_at = now() WHERE id = ${id}`
}

// ─── Courses ──────────────────────────────────────────────────────────────────

export async function getCourses(): Promise<Course[]> {
  const rows = await sql`SELECT * FROM courses ORDER BY created_at DESC`
  return rows as unknown as Course[]
}

export async function upsertCourse(data: Partial<Course>): Promise<Course> {
  if (data.id) {
    const [result] = await sql`
      UPDATE courses SET
        title                = COALESCE(${data.title ?? null}, title),
        description          = COALESCE(${data.description ?? null}, description),
        cover_image_url      = COALESCE(${data.cover_image_url ?? null}, cover_image_url),
        gumroad_url          = COALESCE(${data.gumroad_url ?? null}, gumroad_url),
        price_usd            = COALESCE(${data.price_usd ?? null}, price_usd),
        has_certification    = COALESCE(${data.has_certification ?? null}, has_certification),
        certification_label  = COALESCE(${data.certification_label ?? null}, certification_label),
        is_featured          = COALESCE(${data.is_featured ?? null}, is_featured),
        is_published         = COALESCE(${data.is_published ?? null}, is_published),
        sort_order           = COALESCE(${data.sort_order ?? null}, sort_order),
        updated_at           = now()
      WHERE id = ${data.id}
      RETURNING *
    `
    if (!result) throw new Error('Course not found')
    return result as unknown as Course
  }

  const [result] = await sql`
    INSERT INTO courses
      (title, description, cover_image_url, gumroad_url, price_usd, has_certification, certification_label, is_featured, is_published, sort_order)
    VALUES
      (${data.title}, ${data.description ?? null}, ${data.cover_image_url ?? null}, ${data.gumroad_url},
       ${data.price_usd ?? null}, ${data.has_certification ?? false}, ${data.certification_label ?? null},
       ${data.is_featured ?? false}, ${data.is_published ?? false}, ${data.sort_order ?? 0})
    RETURNING *
  `
  return result as unknown as Course
}

export async function deleteCourse(id: string): Promise<void> {
  await sql`DELETE FROM courses WHERE id = ${id}`
}

export async function toggleCoursePublished(id: string, value: boolean): Promise<void> {
  await sql`UPDATE courses SET is_published = ${value}, updated_at = now() WHERE id = ${id}`
}

// ─── Events ───────────────────────────────────────────────────────────────────

export async function getEvents(): Promise<Event[]> {
  const rows = await sql`SELECT * FROM events ORDER BY event_date ASC`
  return rows as unknown as Event[]
}

export async function upsertEvent(data: Partial<Event>): Promise<Event> {
  if (data.id) {
    const [result] = await sql`
      UPDATE events SET
        title            = COALESCE(${data.title ?? null}, title),
        description      = COALESCE(${data.description ?? null}, description),
        event_type       = COALESCE(${data.event_type ?? null}, event_type),
        event_date       = COALESCE(${data.event_date ?? null}, event_date),
        event_time       = COALESCE(${data.event_time ?? null}, event_time),
        timezone         = COALESCE(${data.timezone ?? null}, timezone),
        duration_minutes = COALESCE(${data.duration_minutes ?? null}, duration_minutes),
        price_usd        = COALESCE(${data.price_usd ?? null}, price_usd),
        is_free          = COALESCE(${data.is_free ?? null}, is_free),
        booking_url      = COALESCE(${data.booking_url ?? null}, booking_url),
        max_seats        = COALESCE(${data.max_seats ?? null}, max_seats),
        seats_remaining  = COALESCE(${data.seats_remaining ?? null}, seats_remaining),
        is_published     = COALESCE(${data.is_published ?? null}, is_published),
        is_cancelled     = COALESCE(${data.is_cancelled ?? null}, is_cancelled),
        sort_order       = COALESCE(${data.sort_order ?? null}, sort_order),
        updated_at       = now()
      WHERE id = ${data.id}
      RETURNING *
    `
    if (!result) throw new Error('Event not found')
    return result as unknown as Event
  }

  const [result] = await sql`
    INSERT INTO events
      (title, description, event_type, event_date, event_time, timezone, duration_minutes, price_usd, is_free, booking_url, max_seats, seats_remaining, is_published, is_cancelled, sort_order)
    VALUES
      (${data.title}, ${data.description ?? null}, ${data.event_type}, ${data.event_date}, ${data.event_time},
       ${data.timezone ?? 'EST'}, ${data.duration_minutes ?? null}, ${data.price_usd ?? null}, ${data.is_free ?? false},
       ${data.booking_url}, ${data.max_seats ?? null}, ${data.seats_remaining ?? null},
       ${data.is_published ?? false}, ${data.is_cancelled ?? false}, ${data.sort_order ?? 0})
    RETURNING *
  `
  return result as unknown as Event
}

export async function deleteEvent(id: string): Promise<void> {
  await sql`DELETE FROM events WHERE id = ${id}`
}

export async function toggleEventPublished(id: string, value: boolean): Promise<void> {
  await sql`UPDATE events SET is_published = ${value}, updated_at = now() WHERE id = ${id}`
}

export async function cancelEvent(id: string): Promise<void> {
  await sql`UPDATE events SET is_cancelled = true, updated_at = now() WHERE id = ${id}`
}

// ─── Contact Submissions ──────────────────────────────────────────────────────

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const rows = await sql`SELECT * FROM contact_submissions ORDER BY created_at DESC`
  return rows as unknown as ContactSubmission[]
}

export async function updateContactStatus(id: string, status: string): Promise<void> {
  await sql`UPDATE contact_submissions SET status = ${status} WHERE id = ${id}`
}

export async function updateContactNotes(id: string, notes: string): Promise<void> {
  await sql`UPDATE contact_submissions SET grant_notes = ${notes} WHERE id = ${id}`
}

// ─── Assessment Submissions ───────────────────────────────────────────────────

export async function getAssessmentSubmissions(): Promise<AssessmentSubmission[]> {
  const rows = await sql`SELECT * FROM assessment_submissions ORDER BY created_at DESC`
  return rows as unknown as AssessmentSubmission[]
}

export async function getAssessmentByEmail(email: string): Promise<AssessmentSubmission | null> {
  const rows = await sql`
    SELECT * FROM assessment_submissions WHERE email = ${email} ORDER BY created_at DESC LIMIT 1
  `
  return (rows[0] as unknown as AssessmentSubmission) ?? null
}

export async function updateAssessmentStatus(id: string, status: string): Promise<void> {
  await sql`UPDATE assessment_submissions SET status = ${status} WHERE id = ${id}`
}

export async function updateAssessmentNotes(id: string, notes: string): Promise<void> {
  await sql`UPDATE assessment_submissions SET grant_notes = ${notes} WHERE id = ${id}`
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export async function getNewsletterSignups(): Promise<NewsletterSignup[]> {
  const rows = await sql`SELECT * FROM newsletter_signups ORDER BY created_at DESC`
  return rows as unknown as NewsletterSignup[]
}

export async function deactivateNewsletterSignup(id: string): Promise<void> {
  await sql`UPDATE newsletter_signups SET is_active = false WHERE id = ${id}`
}
