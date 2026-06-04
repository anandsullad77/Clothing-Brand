"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client. Safe to call in client components.
 * Session is stored in cookies (via @supabase/ssr) so the server can read it too.
 */
// Fall back to harmless placeholders if env vars aren't set, so the production
// build / prerender never crashes. Auth simply won't work until the real
// NEXT_PUBLIC_SUPABASE_* values are configured (e.g. in Vercel).
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
