import { createClient } from '@supabase/supabase-js'

// Vite only exposes env vars prefixed VITE_ to browser code (this is a
// security boundary, not a Vite quirk — anything without that prefix is
// assumed server-only and stripped from the client bundle). Both values
// here are safe to ship to the browser: the anon key is meant to be
// public and only grants what your Supabase Row Level Security policies
// allow.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't throw — let the app still render (and Contact form fall back
  // to its "offline" message) if env vars aren't set yet, e.g. during
  // local dev before .env.local exists.
  console.warn('Supabase env vars are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
