import {
  getSupabaseAdminClient,
  getSupabasePublicServerClient,
} from "./server";

type AdminAuthorization =
  | { authorized: true; email?: string }
  | {
      authorized: false;
      error: string;
      status: 401 | 403 | 503;
    };

export async function verifyAdminRequest(
  request: Request
): Promise<AdminAuthorization> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      authorized: false,
      error: "Missing or invalid authorization header",
      status: 401,
    };
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const authClient = getSupabasePublicServerClient();
  const adminClient = getSupabaseAdminClient();

  if (!authClient || !adminClient) {
    return {
      authorized: false,
      error: "Administrative access is not configured",
      status: 503,
    };
  }

  try {
    const { data: { user }, error } = await authClient.auth.getUser(token);
    if (error || !user) {
      return {
        authorized: false,
        error: "Invalid or expired session token",
        status: 401,
      };
    }

    const { data: admin, error: adminError } = await adminClient
      .from("admins")
      .select("id, role")
      .eq("id", user.id)
      .in("role", ["admin", "superadmin"])
      .maybeSingle();

    if (adminError) {
      console.error("Admin authorization lookup failed:", adminError);
      return {
        authorized: false,
        error: "Unable to verify administrative access",
        status: 503,
      };
    }

    if (!admin) {
      return {
        authorized: false,
        error: "Administrator access required",
        status: 403,
      };
    }

    return { authorized: true, email: user.email };
  } catch (error) {
    console.error("Admin authorization failed:", error);
    return {
      authorized: false,
      error: "Unable to verify administrative access",
      status: 503,
    };
  }
}
