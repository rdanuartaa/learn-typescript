import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { verifyAdminRequest } from "@/lib/supabase/auth";
import {
  parseCvPayload,
  readJsonObject,
  validationErrorResponse,
} from "@/lib/api/validation";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const body = await readJsonObject(request);
    const { cv_url, cv_filename } = parseCvPayload(body);

    const { data, error } = await supabase
      .from("cv_settings")
      .upsert(
        {
          id: "main",
          cv_url,
          cv_filename: cv_filename || "External CV",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (error) {
      console.error("CV settings update failed:", error);
      return NextResponse.json({ error: "Unable to update CV settings" }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const validationResponse = validationErrorResponse(error);
    if (validationResponse) return validationResponse;
    console.error("CV settings update failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
