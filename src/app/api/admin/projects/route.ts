import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { verifyAdminRequest } from "@/lib/supabase/auth";
import {
  parseProjectPayload,
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
    const payload = parseProjectPayload(body);

    const { data, error } = await supabase
      .from("projects")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("Project insert failed:", error);
      return NextResponse.json({ error: "Unable to save project" }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const validationResponse = validationErrorResponse(error);
    if (validationResponse) return validationResponse;
    console.error("Project insert failed:", error);
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
      const { error } = await supabase.rpc("reorder_projects", { p_items: items });
      if (error) {
        console.error("Project reorder failed:", error);
        return NextResponse.json({ error: "Unable to reorder projects" }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    const id = parseUuid(body.id);
    const payload = parseProjectPayload(body);
    const { data, error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Project update failed:", error);
      return NextResponse.json({ error: "Unable to update project" }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const validationResponse = validationErrorResponse(error);
    if (validationResponse) return validationResponse;
    console.error("Project update failed:", error);
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

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      console.error("Project delete failed:", error);
      return NextResponse.json({ error: "Unable to delete project" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const validationResponse = validationErrorResponse(error);
    if (validationResponse) return validationResponse;
    console.error("Project delete failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
