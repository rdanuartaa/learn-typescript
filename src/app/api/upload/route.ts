import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { verifyAdminRequest } from "@/lib/supabase/auth";
import {
  MAX_CV_BYTES,
  MAX_IMAGE_BYTES,
  readBoundedFormData,
  RequestValidationError,
  validationErrorResponse,
} from "@/lib/api/validation";

export const dynamic = "force-dynamic";

function hasExpectedSignature(file: File, bytes: Uint8Array, isCv: boolean): boolean {
  if (isCv) {
    return bytes.length >= 5 && new TextDecoder().decode(bytes.subarray(0, 5)) === "%PDF-";
  }

  if (file.type === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (file.type === "image/png") {
    return bytes.length >= 8 &&
      bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
      bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a;
  }
  if (file.type === "image/webp") {
    return bytes.length >= 12 &&
      new TextDecoder().decode(bytes.subarray(0, 4)) === "RIFF" &&
      new TextDecoder().decode(bytes.subarray(8, 12)) === "WEBP";
  }
  return false;
}

export async function POST(request: Request) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const supabase = getSupabaseAdminClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured yet. Please check environment variables." },
        { status: 500 }
      );
    }

    const formData = await readBoundedFormData(request);
    const fileEntry = formData.get("file");
    const file = fileEntry instanceof File ? fileEntry : null;
    const isCv = formData.get("isCv") === "true";
    const folder = isCv ? "cv" : "projects";

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
    const normalizedName = file.name.toLowerCase();
    if (isCv) {
      if (file.size > MAX_CV_BYTES) {
        throw new RequestValidationError("CV file must not exceed 5 MB", 413);
      }
      if (file.type !== "application/pdf" || !normalizedName.endsWith(".pdf")) {
        throw new RequestValidationError("CV must be a PDF file");
      }
    } else {
      if (file.size > MAX_IMAGE_BYTES) {
        throw new RequestValidationError("Project image must not exceed 4 MB", 413);
      }
      if (!allowedImageTypes.has(file.type)) {
        throw new RequestValidationError("Project image must be JPEG, PNG, or WebP");
      }
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (!hasExpectedSignature(file, buffer, isCv)) {
      throw new RequestValidationError("File contents do not match the declared type");
    }

    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").slice(-120);
    const uniqueSuffix = crypto.randomUUID();
    const filePath = `${folder}/${uniqueSuffix}-${originalName}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(filePath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      return NextResponse.json(
        { error: "Unable to upload file" },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("portfolio")
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
        console.error("Failed to update cv_settings table:", cvDbError);
        await supabase.storage.from("portfolio").remove([filePath]);
        return NextResponse.json(
          { error: "Unable to activate uploaded CV" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filePath,
      fileName: file.name,
    });
  } catch (error) {
    const validationResponse = validationErrorResponse(error);
    if (validationResponse) return validationResponse;
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error during upload" },
      { status: 500 }
    );
  }
}
