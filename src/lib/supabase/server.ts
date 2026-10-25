import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseServerConfigured(): boolean {
  const activeKey = supabaseServiceKey || supabaseAnonKey;
  return Boolean(
    supabaseUrl &&
      activeKey &&
      !supabaseUrl.includes("your-project-id") &&
      !activeKey.includes("your-anon-key") &&
      !activeKey.includes("your-service-role-key")
  );
}

export function getSupabaseServerClient(useServiceRole = true): SupabaseClient | null {
  if (!isSupabaseServerConfigured()) {
    return null;
  }

  const key =
    (useServiceRole ? supabaseServiceKey : undefined) ??
    supabaseAnonKey;
  if (!key) return null;

  return createClient(supabaseUrl!, key, {
    auth: {
      persistSession: false,
    },
  });
}
