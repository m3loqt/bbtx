-- Canonical schema for Neon, applied via:
--   psql "$DATABASE_URL" -f lib/neon-schema.sql
--
-- Provenance:
--   contact_submissions, assessment_submissions, newsletter_signups, events,
--   event_counters — derived from a live `pg_dump --schema-only` against the
--   real Supabase database on 2026-07 (see migration history). These are the
--   ground truth; the old lib/supabase-schema.sql / lib/admin-schema.sql were
--   found to be stale (missing 6 real assessment_submissions columns, missing
--   event_counters entirely).
--
--   blogs, podcast_episodes, courses — these tables did NOT exist in the live
--   Supabase database at all (pg_dump found nothing for them), even though
--   the admin panel code expects them. Created here from the schema tracked
--   in lib/admin-schema.sql. No data migration needed for these three since
--   there was never any data.
--
--   events.max_seats / events.seats_remaining — added here even though the
--   live table didn't have them either. app/admin/events/page.tsx already
--   has a full form UI for both fields (confirmed via grep), so the live
--   table was simply missing columns the app already expects. events had 0
--   rows, so no data migration impact.
--
-- Row Level Security, policies, and the admin_profiles-linked auth policies
-- from Supabase are intentionally dropped — access control now lives
-- entirely in the app layer via the signed session cookie (see
-- lib/admin/session.ts), not at the database layer.

-- ─── contact_submissions ────────────────────────────────────────────────────
CREATE TABLE contact_submissions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    full_name text NOT NULL,
    email text NOT NULL,
    inquiry_type text,
    message text,
    status text DEFAULT 'new'::text,
    ip_address text,
    grant_notes text
);

-- ─── assessment_submissions ─────────────────────────────────────────────────
CREATE TABLE assessment_submissions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    full_name text NOT NULL,
    email text NOT NULL,
    role text,
    organization_name text,
    industry text,
    organization_size text,
    currently_using_ai text,
    ai_target_areas text[],
    ai_strategy_status text,
    biggest_challenges text[],
    other_challenge text,
    primary_need text,
    timeline text,
    status text DEFAULT 'new'::text,
    ip_address text,
    grant_notes text,
    wants_orientation_workshop boolean DEFAULT false,
    ai_usage_visibility text,
    ai_guidelines_status text,
    leadership_ai_training text,
    ai_strategy_owner text,
    has_strategic_plan text
);

-- ─── newsletter_signups ─────────────────────────────────────────────────────
CREATE TABLE newsletter_signups (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    email text NOT NULL UNIQUE,
    source text DEFAULT 'community'::text,
    is_active boolean DEFAULT true
);

-- ─── events ──────────────────────────────────────────────────────────────────
CREATE TABLE events (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    title text NOT NULL,
    description text,
    event_type text NOT NULL,
    event_date date NOT NULL,
    event_time time without time zone NOT NULL,
    timezone text DEFAULT 'EST'::text,
    duration_minutes integer,
    price_usd numeric(10,2),
    is_free boolean DEFAULT false,
    booking_url text NOT NULL,
    max_seats integer,
    seats_remaining integer,
    is_published boolean DEFAULT false,
    is_cancelled boolean DEFAULT false,
    sort_order integer DEFAULT 0
);

-- ─── event_counters ─────────────────────────────────────────────────────────
-- Backs the Digital Twin Snapshot rate limit (EVENT_MAX_GENERATIONS).
CREATE TABLE event_counters (
    key text PRIMARY KEY,
    count integer NOT NULL DEFAULT 0
);

-- ─── blogs (did not exist live — created fresh) ─────────────────────────────
CREATE TABLE blogs (
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

-- ─── podcast_episodes (did not exist live — created fresh) ──────────────────
CREATE TABLE podcast_episodes (
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

-- ─── courses (did not exist live — created fresh) ───────────────────────────
CREATE TABLE courses (
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
