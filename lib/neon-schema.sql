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

-- ─── digital_twin_snapshots ─────────────────────────────────────────────────
-- Added 2026-07 as part of the Digital Twin Snapshot Tier-1 pass (adaptive
-- research triage, Opus 4.8 synthesis via structured outputs, Haiku critic
-- pass, persistence). One row per generation that successfully produced a
-- snapshot. Applied standalone against the live DATABASE_URL — do NOT re-run
-- this whole file (see header above); this CREATE TABLE has its own
-- IF NOT EXISTS as cheap insurance against re-running just this block twice.
-- ─── whitepapers ────────────────────────────────────────────────────────────
-- Added 2026-07 for the whitepapers content hub. Downloads are gated behind
-- an email capture (see whitepaper_downloads below) rather than linked out
-- to a third party, so the PDF itself lives in Blob storage.
CREATE TABLE IF NOT EXISTS whitepapers (
    id                 uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at         timestamp with time zone DEFAULT now(),
    updated_at         timestamp with time zone DEFAULT now(),
    title              text NOT NULL,
    excerpt            text,
    category           text,
    cover_image_url    text,
    pdf_url            text NOT NULL,
    pdf_size_bytes     integer,
    read_time_minutes  integer,
    published_date     date,
    is_featured        boolean NOT NULL DEFAULT false,
    is_published       boolean NOT NULL DEFAULT false,
    sort_order         integer NOT NULL DEFAULT 0,
    download_count     integer NOT NULL DEFAULT 0
);

-- ─── whitepaper_downloads ───────────────────────────────────────────────────
-- One row per email-gated download. Separate from newsletter_signups so we
-- keep the per-paper lead trail even though the API route also upserts the
-- email into newsletter_signups (source = 'whitepaper').
CREATE TABLE IF NOT EXISTS whitepaper_downloads (
    id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at     timestamp with time zone DEFAULT now(),
    whitepaper_id  uuid NOT NULL REFERENCES whitepapers(id) ON DELETE CASCADE,
    full_name      text,
    email          text NOT NULL,
    ip_address     text
);

CREATE TABLE IF NOT EXISTS digital_twin_snapshots (
    id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at          timestamp with time zone DEFAULT now(),
    website_url         text NOT NULL,
    organization_name   text,
    industry            text,
    competitors         text,
    strategic_question  text,
    sources_used        text[],
    fetch_succeeded     boolean NOT NULL DEFAULT false,
    snapshot            jsonb NOT NULL,
    synthesis_model     text NOT NULL,
    critic_revisions    integer NOT NULL DEFAULT 0,
    token_usage         jsonb,
    estimated_cost_usd  numeric(10,4),
    ip_address          text,
    email               text,
    contact_name        text,
    emailed_at          timestamp with time zone
);

-- ─── blogs: in-house authoring ──────────────────────────────────────────────
-- Added 2026-07 to move blog posts from "card that links out to Substack" to
-- actually hosting the article body on bbtx.ai, so fresh posts get indexed by
-- Google under our own domain instead of Substack's. Applied standalone
-- against the live DATABASE_URL — do NOT re-run this whole file.
-- substack_url drops NOT NULL since in-house posts don't require a cross-post.
ALTER TABLE blogs ALTER COLUMN substack_url DROP NOT NULL;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS content text;
CREATE UNIQUE INDEX IF NOT EXISTS blogs_slug_unique_idx ON blogs (slug) WHERE slug IS NOT NULL;

-- ─── blogs: reader engagement (hearts + comments) ───────────────────────────
-- Added 2026-07-28. No auth/user system for readers, so identity is a random
-- id the client generates once and keeps in localStorage ("fingerprint"), not
-- an account. heart_count is a denormalized counter on the blogs row for fast
-- reads; blog_hearts is the dedupe table so a given fingerprint can't push it
-- above 1 for the same post (clearing localStorage defeats this, which is an
-- accepted tradeoff of not having real auth). Applied standalone against the
-- live DATABASE_URL — do NOT re-run this whole file.
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS heart_count integer NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS blog_hearts (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at  timestamp with time zone DEFAULT now(),
    blog_id     uuid NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    fingerprint text NOT NULL,
    UNIQUE (blog_id, fingerprint)
);

CREATE TABLE IF NOT EXISTS blog_comments (
    id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at  timestamp with time zone DEFAULT now(),
    blog_id     uuid NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    nickname    text NOT NULL,
    content     text NOT NULL,
    ip_address  text,
    is_hidden   boolean NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS blog_comments_blog_id_idx ON blog_comments (blog_id, created_at);
