export interface Blog {
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string | null
  content: string | null
  excerpt: string | null
  cover_image_url: string | null
  substack_url: string | null
  category: string | null
  published_date: string | null
  read_time_minutes: number | null
  is_featured: boolean
  is_published: boolean
  sort_order: number
  heart_count: number
}

export interface BlogComment {
  id: string
  created_at: string
  blog_id: string
  nickname: string
  content: string
  ip_address: string | null
  is_hidden: boolean
}

export interface PodcastEpisode {
  id: string
  created_at: string
  updated_at: string
  episode_number: number
  title: string
  description: string | null
  cover_image_url: string | null
  spotify_url: string | null
  apple_podcasts_url: string | null
  published_date: string | null
  duration_minutes: number | null
  is_featured: boolean
  is_published: boolean
  sort_order: number
}

export interface Course {
  id: string
  created_at: string
  updated_at: string
  title: string
  description: string | null
  cover_image_url: string | null
  gumroad_url: string
  price_usd: number | null
  has_certification: boolean
  certification_label: string | null
  is_featured: boolean
  is_published: boolean
  sort_order: number
}

export interface Whitepaper {
  id: string
  created_at: string
  updated_at: string
  title: string
  excerpt: string | null
  category: string | null
  cover_image_url: string | null
  pdf_url: string
  pdf_size_bytes: number | null
  read_time_minutes: number | null
  published_date: string | null
  is_featured: boolean
  is_published: boolean
  sort_order: number
  download_count: number
}

export interface Event {
  id: string
  created_at: string
  updated_at: string
  title: string
  description: string | null
  event_type: string
  event_date: string
  event_time: string
  timezone: string
  duration_minutes: number | null
  price_usd: number | null
  is_free: boolean
  booking_url: string
  max_seats: number | null
  seats_remaining: number | null
  is_published: boolean
  is_cancelled: boolean
  sort_order: number
}

export interface ContactSubmission {
  id: string
  created_at: string
  full_name: string
  email: string
  inquiry_type: string | null
  message: string | null
  status: string
  ip_address: string | null
  grant_notes: string | null
}

export interface AssessmentSubmission {
  id: string
  created_at: string
  full_name: string
  email: string
  role: string | null
  organization_name: string | null
  industry: string | null
  organization_size: string | null
  currently_using_ai: string | null
  ai_usage_visibility: string | null
  ai_guidelines_status: string | null
  leadership_ai_training: string | null
  ai_target_areas: string[] | null
  ai_strategy_owner: string | null
  ai_strategy_status: string | null
  has_strategic_plan: string | null
  biggest_challenges: string[] | null
  other_challenge: string | null
  primary_need: string | null
  timeline: string | null
  wants_orientation_workshop: boolean | null
  status: string
  ip_address: string | null
  grant_notes: string | null
}

export interface TestimonialSubmission {
  id: string
  created_at: string
  full_name: string
  role_company: string | null
  testimonial: string
  photo_url: string | null
  permission_to_publish: boolean
  status: string
  ip_address: string | null
  grant_notes: string | null
}

export interface NewsletterSignup {
  id: string
  created_at: string
  email: string
  source: string
  is_active: boolean
}

export interface AdminProfile {
  id: string
  created_at: string
  full_name: string
  email: string
  role: string
  is_active: boolean
}

export interface DashboardStats {
  newContacts: number
  newAssessments: number
  upcomingEvents: number
  newsletterSignupsThisWeek: number
  newsletterSignupsLastWeek: number
  newsletterTotal: number
}

export interface SubmissionChartPoint {
  date: string
  contacts: number
  assessments: number
}

export interface NewsletterChartPoint {
  week: string
  signups: number
}
