import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { verifyAdminRequest } from "@/lib/supabase/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseServerClient(true) || getSupabaseServerClient(false);

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured yet. Please check environment variables." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "portfolio";
    const folder = (formData.get("folder") as string) || "uploads";
    const isCv = formData.get("isCv") === "true";

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e4)}`;
    const filePath = `${folder}/${uniqueSuffix}-${originalName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    if (isCv) {
      const { error: cvDbError } = await supabase
        .from("cv_settings")
        .upsert(
          {
            id: "main",
            cv_url: publicUrl,
            cv_filename: file.name,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

      if (cvDbError) {
        console.warn("Failed to update cv_settings table:", cvDbError);
      }
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filePath,
      fileName: file.name,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal server error during upload" },
      { status: 500 }
    );
  }
}
