import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { defaultProjects, defaultExperiences, defaultCvSetting } from "@/lib/supabase/data";
import { verifyAdminRequest } from "@/lib/supabase/auth";
import { readJsonObject, validationErrorResponse } from "@/lib/api/validation";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const supabase = getSupabaseAdminClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase credentials are not configured in environment variables." },
        { status: 400 }
      );
    }

    const body = await readJsonObject(request);
    const entity = body.entity;
    if (entity !== "projects" && entity !== "experiences" && entity !== "all") {
      return NextResponse.json({ error: "Invalid seed entity" }, { status: 400 });
    }

    const results: Record<string, string> = {};
    let failed = false;

    if (entity === "projects" || entity === "all") {
      const projectsToInsert = defaultProjects.map((p, idx) => ({
        title: p.title,
        title_en: p.title_en,
        description: p.description,
        description_en: p.description_en,
        image: p.image,
        href: p.href,
        order_index: idx,
      }));

      const { count, error: countError } = await supabase
        .from("projects")
        .select("id", { count: "exact", head: true });

      const { error: projError } = countError
        ? { error: countError }
        : count === 0
          ? await supabase.from("projects").insert(projectsToInsert)
          : { error: null };

      if (projError) {
        console.error("Project seed failed:", projError);
        results.projects = "Unable to seed projects.";
        failed = true;
      } else {
        results.projects = count === 0
          ? `Seeded ${projectsToInsert.length} projects successfully!`
          : "Projects already contain data; seed skipped.";
      }
    }

    if (entity === "experiences" || entity === "all") {
      const expToInsert = defaultExperiences.map((e, idx) => ({
        period: e.period,
        period_en: e.period_en,
        role: e.role,
        role_en: e.role_en,
        description: e.description,
        description_en: e.description_en,
        details: e.details,
        details_en: e.details_en,
        order_index: idx,
      }));

      const { count, error: countError } = await supabase
        .from("experiences")
        .select("id", { count: "exact", head: true });

      const { error: expError } = countError
        ? { error: countError }
        : count === 0
          ? await supabase.from("experiences").insert(expToInsert)
          : { error: null };

      if (expError) {
        console.error("Experience seed failed:", expError);
        results.experiences = "Unable to seed experiences.";
        failed = true;
      } else {
        results.experiences = count === 0
          ? `Seeded ${expToInsert.length} experiences successfully!`
          : "Experiences already contain data; seed skipped.";
      }
    }

    if (entity === "all") {
      const { error: cvError } = await supabase
        .from("cv_settings")
        .upsert(defaultCvSetting, { onConflict: "id" });

      if (cvError) {
        console.error("CV seed failed:", cvError);
        results.cv = "Unable to initialize CV settings.";
        failed = true;
      } else {
        results.cv = "CV settings initialized successfully!";
      }
    }

    return NextResponse.json(
      { success: !failed, results },
      { status: failed ? 500 : 200 }
    );
  } catch (error) {
    const validationResponse = validationErrorResponse(error);
    if (validationResponse) return validationResponse;
    console.error("Admin seed error:", error);
    return NextResponse.json(
      { error: "Seed failed" },
      { status: 500 }
    );
  }
}
