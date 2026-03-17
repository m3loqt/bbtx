-- Run this SQL in your Supabase project dashboard under SQL Editor
-- Required additions for the BBTX Admin CMS
-- Run AFTER the existing schema in lib/supabase-schema.sql

-- ─── Add missing columns to existing tables ───────────────────────────────────

-- contact_submissions: add status and grant_notes
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS grant_notes text;

-- assessment_submissions: add email, status, grant_notes
ALTER TABLE assessment_submissions
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS grant_notes text;

-- newsletter_signups: add is_active
ALTER TABLE newsletter_signups
  ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- ─── New tables ───────────────────────────────────────────────────────────────

-- Blogs
CREATE TABLE IF NOT EXISTS blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  title text NOT NULL,
  excerpt text,
  cover_image_url text,
  substack_url text NOT NULL,
  category text,
  published_date date,
  read_time_minutes integer,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  sort_order integer DEFAULT 0
);

-- Podcast Episodes
CREATE TABLE IF NOT EXISTS podcast_episodes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  episode_number integer NOT NULL,
  title text NOT NULL,
  description text,
  cover_image_url text,
  spotify_url text,
  apple_podcasts_url text,
  published_date date,
  duration_minutes integer,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  sort_order integer DEFAULT 0
);

-- Courses
CREATE TABLE IF NOT EXISTS courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  title text NOT NULL,
  description text,
  cover_image_url text,
  gumroad_url text NOT NULL,
  price_usd numeric(10,2),
  has_certification boolean DEFAULT false,
  certification_label text,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  sort_order integer DEFAULT 0
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  title text NOT NULL,
  description text,
  event_type text NOT NULL,
  event_date date NOT NULL,
  event_time time NOT NULL,
  timezone text NOT NULL DEFAULT 'EST',
  duration_minutes integer,
  price_usd numeric(10,2),
  is_free boolean DEFAULT true,
  booking_url text NOT NULL,
  max_seats integer,
  seats_remaining integer,
  is_published boolean DEFAULT false,
  is_cancelled boolean DEFAULT false,
  sort_order integer DEFAULT 0
);

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Enable RLS on all tables and allow authenticated users full access

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read/write everything (admin only)
CREATE POLICY IF NOT EXISTS "authenticated_all_blogs" ON blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "authenticated_all_podcast_episodes" ON podcast_episodes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "authenticated_all_courses" ON courses FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "authenticated_all_events" ON events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "authenticated_all_contacts" ON contact_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "authenticated_all_assessments" ON assessment_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "authenticated_all_newsletter" ON newsletter_signups FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Service role bypasses RLS automatically
