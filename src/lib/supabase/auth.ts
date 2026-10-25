import { getSupabaseServerClient } from "./server";

export async function verifyAdminRequest(
  request: Request
): Promise<{ authorized: boolean; email?: string; error?: string }> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { authorized: false, error: "Missing or invalid authorization header" };
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const supabase = getSupabaseServerClient(true) || getSupabaseServerClient(false);

  if (!supabase) {
    return { authorized: false, error: "Supabase server is not configured" };
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return { authorized: false, error: error?.message || "Invalid or expired session token" };
    }

    return { authorized: true, email: user.email };
  } catch (err) {
    return { authorized: false, error: (err as Error).message };
  }
}
