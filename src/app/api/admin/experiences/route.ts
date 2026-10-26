import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { verifyAdminRequest } from "@/lib/supabase/auth";
import {
  parseExperiencePayload,
  parseReorderPayload,
  parseUuid,
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
    const payload = parseExperiencePayload(body);

    const { data, error } = await supabase
      .from("experiences")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Experience insert failed:", error);
      return NextResponse.json({ error: "Unable to save experience" }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const validationResponse = validationErrorResponse(error);
    if (validationResponse) return validationResponse;
    console.error("Experience insert failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
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

    if (body.reorder === true) {
      const items = parseReorderPayload(body);
      const { error } = await supabase.rpc("reorder_experiences", { p_items: items });
      if (error) {
        console.error("Experience reorder failed:", error);
        return NextResponse.json({ error: "Unable to reorder experiences" }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    const id = parseUuid(body.id);
    const payload = parseExperiencePayload(body);
    const { data, error } = await supabase
      .from("experiences")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Experience update failed:", error);
      return NextResponse.json({ error: "Unable to update experience" }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const validationResponse = validationErrorResponse(error);
    if (validationResponse) return validationResponse;
    console.error("Experience update failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const id = parseUuid(searchParams.get("id"));

    const { error } = await supabase.from("experiences").delete().eq("id", id);
    if (error) {
      console.error("Experience delete failed:", error);
      return NextResponse.json({ error: "Unable to delete experience" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const validationResponse = validationErrorResponse(error);
    if (validationResponse) return validationResponse;
    console.error("Experience delete failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
