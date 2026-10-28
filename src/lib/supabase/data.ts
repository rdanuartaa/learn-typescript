import { content as defaultContent, Language } from "@/components/home/content";
import { DbCvSetting, DbExperience, DbProject, PortfolioData } from "@/types/database";
import { getSupabasePublicServerClient } from "./server";

export const defaultProjects: DbProject[] = [];
export const defaultExperiences: DbExperience[] = [];


export const defaultCvSetting: DbCvSetting = {
  id: "main",
  cv_url: "",
  cv_filename: "",
};

function getCvDownloadUrl(cv: DbCvSetting | null | undefined) {
  if (!cv?.cv_url) {
    return undefined;
  }

  try {
    const url = new URL(cv.cv_url);

    if (url.pathname.includes("/storage/v1/object/")) {
      url.searchParams.set(
        "download",
        cv.cv_filename || "Rizal-Danuarta-Akbar-CV.pdf",
      );
    }

    return url.toString();
  } catch {
    return cv.cv_url;
  }
}

export async function fetchProjectsServer(): Promise<DbProject[]> {
  const client = getSupabasePublicServerClient();
  if (!client) {
    return defaultProjects;
  }

  try {
    const { data, error } = await client
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultProjects;
    }

    return data as DbProject[];
  } catch (err) {
    console.error("Failed to fetch projects from Supabase:", err);
    return defaultProjects;
  }
}

export async function fetchExperiencesServer(): Promise<DbExperience[]> {
  const client = getSupabasePublicServerClient();
  if (!client) {
    return defaultExperiences;
  }

  try {
    const { data, error } = await client
      .from("experiences")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultExperiences;
    }

    return data as DbExperience[];
  } catch (err) {
    console.error("Failed to fetch experiences from Supabase:", err);
    return defaultExperiences;
  }
}

export async function fetchCvSettingServer(): Promise<DbCvSetting | null> {
  const client = getSupabasePublicServerClient();
  if (!client) {
    return defaultCvSetting;
  }

  try {
    const { data, error } = await client
      .from("cv_settings")
      .select("*")
      .eq("id", "main")
      .maybeSingle();

    if (error || !data) {
      return defaultCvSetting;
    }

    return data as DbCvSetting;
  } catch (err) {
    console.error("Failed to fetch CV setting from Supabase:", err);
    return defaultCvSetting;
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const [projects, experiences, cv] = await Promise.all([
    fetchProjectsServer(),
    fetchExperiencesServer(),
    fetchCvSettingServer(),
  ]);

  return {
    projects,
    experiences,
    cv,
  };
}

const normalizeProjectImage = (img?: string | null) => {
  if (!img) return undefined;
  if (img.startsWith("/image/projects/") && img.endsWith(".png")) {
    return img.replace(/\.png$/, ".webp");
  }
  return img;
};

/**
 * Merge dynamic Supabase data into localized content object
 */
export function getMergedContent(
  language: Language,
  portfolioData?: PortfolioData | null
) {
  const base = defaultContent[language];
  if (!portfolioData) {
    return {
      ...base,
      cvUrl: undefined as string | undefined,
    };
  }

  const isEn = language === "en" || language === "zh";

  const dynamicProjects = (portfolioData.projects || []).map((p) => {
    const title = isEn && p.title_en ? p.title_en : p.title;
    const isLegacyPortfolioUrl =
      p.href === "https://rizaldanuartabuilds.vercel.app";
    const image = normalizeProjectImage(p.image);

    return {
      title,
      description:
        isEn && p.description_en ? p.description_en : p.description,
      image,
      href: isLegacyPortfolioUrl
        ? "https://www.rizaldanuartaakbar.me"
        : p.href || undefined,
    };
  });

  const dynamicExperiences = (portfolioData.experiences || []).map((e) => ({
    period: isEn && e.period_en ? e.period_en : e.period,
    role: isEn && e.role_en ? e.role_en : e.role,
    description:
      isEn && e.description_en ? e.description_en : e.description,
    details:
      isEn && e.details_en && e.details_en.length > 0
        ? e.details_en
        : e.details,
  }));

  return {
    ...base,
    cvUrl: getCvDownloadUrl(portfolioData.cv),
    projects: {
      ...base.projects,
      items: dynamicProjects.length > 0 ? dynamicProjects : base.projects.items,
    },
    experience: {
      ...base.experience,
      items:
        dynamicExperiences.length > 0
          ? dynamicExperiences
          : base.experience.items,
    },
  };
}
