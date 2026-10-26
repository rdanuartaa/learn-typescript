import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

function isPlaceholder(value: string): boolean {
  return value.startsWith("your-") || value.includes("your-project-id");
}

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (
    !supabaseUrl ||
    !supabaseServiceKey ||
    isPlaceholder(supabaseUrl) ||
    isPlaceholder(supabaseServiceKey)
  ) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export function getSupabasePublicServerClient(): SupabaseClient | null {
  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    isPlaceholder(supabaseUrl) ||
    isPlaceholder(supabaseAnonKey)
  ) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
