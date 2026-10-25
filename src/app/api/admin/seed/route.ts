import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { defaultProjects, defaultExperiences, defaultCvSetting } from "@/lib/supabase/data";
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
        { error: "Supabase credentials are not configured in environment variables." },
        { status: 400 }
      );
    }

    const { entity } = (await request.json().catch(() => ({}))) as { entity?: "projects" | "experiences" | "all" };

    const results: Record<string, string> = {};

    if (!entity || entity === "projects" || entity === "all") {
      const projectsToInsert = defaultProjects.map((p, idx) => ({
        title: p.title,
        title_en: p.title_en,
        description: p.description,
        description_en: p.description_en,
        image: p.image,
        href: p.href,
        order_index: idx,
      }));

      const { error: projError } = await supabase
        .from("projects")
        .insert(projectsToInsert);

      if (projError) {
        results.projects = `Error: ${projError.message}`;
      } else {
        results.projects = `Seeded ${projectsToInsert.length} projects successfully!`;
      }
    }

    if (!entity || entity === "experiences" || entity === "all") {
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

      const { error: expError } = await supabase
        .from("experiences")
        .insert(expToInsert);

      if (expError) {
        results.experiences = `Error: ${expError.message}`;
      } else {
        results.experiences = `Seeded ${expToInsert.length} experiences successfully!`;
      }
    }

    if (!entity || entity === "all") {
      const { error: cvError } = await supabase
        .from("cv_settings")
        .upsert(defaultCvSetting, { onConflict: "id" });

      if (cvError) {
        results.cv = `Error: ${cvError.message}`;
      } else {
        results.cv = "CV settings initialized successfully!";
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (err) {
    console.error("Admin seed error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Seed failed" },
      { status: 500 }
    );
  }
}
