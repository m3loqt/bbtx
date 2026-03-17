-- Run this SQL in your Supabase project dashboard under SQL Editor
-- Create these tables before deploying Phase 2

-- Assessment submissions
create table assessment_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),

  -- Step 1: Organization
  full_name text,
  role text,
  organization_name text,
  industry text,
  organization_size text,

  -- Step 2: AI Situation
  currently_using_ai text,
  ai_target_areas text[],
  ai_strategy_status text,

  -- Step 3: Challenges
  biggest_challenges text[],
  other_challenge text,

  -- Step 4: Needs & Timeline
  primary_need text,
  timeline text,

  -- Meta
  ip_address text,
  user_agent text
);

-- Contact form submissions
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  full_name text,
  email text,
  inquiry_type text,
  message text,
  ip_address text
);

-- Newsletter signups
create table newsletter_signups (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  email text unique,
  source text
);
