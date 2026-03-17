import { createClient } from '@supabase/supabase-js'

// NOTE:
// These admin helpers are currently imported from Client Components,
// so we must use a key that is available in the browser bundle.
// Using the anon key keeps everything governed by RLS policies.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
