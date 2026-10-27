import { content as defaultContent, Language } from "@/components/home/content";
import { DbCvSetting, DbExperience, DbProject, PortfolioData } from "@/types/database";
import { getSupabasePublicServerClient } from "./server";

export const defaultProjects: DbProject[] = [
  {
    id: "project-1",
    title: "DiProperti",
    title_en: "DiProperti",
    description:
      "Featured — Next.js, Laravel, MySQL, Docker, Nginx, GitHub Actions, dan VPS. Membangun platform properti end-to-end dengan authentication, rekomendasi, perbandingan, simulasi KPR, dashboard admin, serta deployment CI/CD.",
    description_en:
      "A production-oriented property marketplace built with Next.js, Laravel, MySQL, Docker, Nginx, and GitHub Actions.",
    image: "/image/projects/diproperti.webp",
    href: "https://pameran-jti.polije.ac.id/pameran/product/693/aplikasi-eccomerce-properti-jember-diproperti",
    order_index: 0,
  },
  {
    id: "project-2",
    title: "Cuan Space",
    title_en: "Cuan Space",
    description:
      "Project Leader untuk marketplace produk digital Laravel dan Flutter: payment gateway, distribusi file digital aman, multi-role authentication, dan desain database yang scalable.",
    description_en:
      "A Laravel and Flutter marketplace for digital-product payments, role-based access, and secure file delivery.",
    image: "/image/projects/cuan.webp",
    href: "https://pameran-jti.polije.ac.id/pameran/product/307/cuan-space-aplikasi-e-commerce-produk-digital-gen-z",
    order_index: 1,
  },
  {
    id: "project-3",
    title: "Semboro Orange Quality Classification System",
    title_en: "Semboro Orange Quality Classification System",
    description:
      "VGG16, TensorFlow, ESP8266, MQTT, dan web dashboard untuk klasifikasi kualitas jeruk dan monitoring sortir secara real-time.",
    description_en:
      "An AI, IoT, and web platform for real-time orange-quality classification and sorting monitoring.",
    image: "/image/projects/semboro.jpg",
    href: "https://pameran-jti.polije.ac.id/pameran/product/496/klasifikasi-kualitas-jeruk-semboro-menggunakan-arsitektur-vgg16-yang-terintegrasi-dengan-iot-berbasis-web",
    order_index: 2,
  },
  {
    id: "project-4",
    title: "Edelweiss Tour & Travel Adventure",
    title_en: "Edelweiss Tour & Travel Adventure",
    description:
      "Website tour & travel modern berbasis Next.js 16, React 19, TypeScript, SCSS, Supabase, dan Cloudflare R2 dengan CMS admin dan direct booking WhatsApp.",
    description_en:
      "A modern travel-service platform built with Next.js 16, React 19, TypeScript, SCSS, Supabase, and Cloudflare R2, featuring an admin CMS and direct WhatsApp booking.",
    image: "/image/projects/edelweiss.webp",
    href: "https://edelweisstourandtravel.com/",
    order_index: 3,
  },
  {
    id: "project-5",
    title: "Nusticky on Shopee",
    title_en: "Nusticky on Shopee",
    description:
      "Toko e-commerce character sticker di Shopee yang menggabungkan desain produk, strategi penjualan, branding, dan pengelolaan operasional bisnis.",
    description_en:
      "A character sticker e-commerce shop on Shopee combining product design, sales strategy, branding, and operations.",
    image: "/image/projects/nusticky.webp",
    href: "https://shopee.co.id/nusticky",
    order_index: 4,
  },
  {
    id: "project-6",
    title: "Portfolio Website",
    title_en: "Portfolio Website",
    description:
      "Website portfolio personal dengan section About, Skills, Experience, Projects, Tools, dan Contact yang responsif serta interaktif.",
    description_en:
      "Personal portfolio website with interactive About, Skills, Experience, Projects, Tools, and Contact sections.",
    image: "/image/projects/portofolio.webp",
    href: "https://www.rizaldanuartaakbar.me",
    order_index: 5,
  },
];

export const defaultExperiences: DbExperience[] = [
  {
    id: "exp-1",
    period: "Nov 2023 - Present",
    period_en: "Nov 2023 - Present",
    role: "Founder Nusticky",
    role_en: "E-commerce Business Owner",
    description:
      "Nusticky adalah bisnis e-commerce character sticker yang berfokus pada produk visual kreatif dan penjualan berbasis marketplace.",
    description_en:
      "Nusticky is a character sticker e-commerce business focused on creative visual products and marketplace-based sales.",
    details: [
      "Mengoperasikan bisnis character sticker melalui marketplace Shopee dengan mengelola proses penjualan, produksi, dan distribusi dari awal hingga akhir.",
      "Mendesain produk sticker dan menjalankan strategi marketing, termasuk riset tren, pengembangan branding, dan optimasi harga.",
      "Mengelola catatan keuangan, kontrol inventaris, dan engagement pelanggan untuk menjaga pertumbuhan penjualan serta keberlanjutan bisnis.",
    ],
    details_en: [
      "Operated a character sticker business through Shopee marketplace, managing end-to-end sales, production, and distribution processes.",
      "Designed sticker products and executed marketing strategies, including trend research, branding development, and pricing optimization.",
      "Managed financial records, inventory control, and customer engagement, ensuring consistent sales growth and business sustainability.",
    ],
    order_index: 0,
  },
  {
    id: "exp-4",
    period: "Oct 2026",
    period_en: "Oct 2026",
    role: "Edelweiss Tour & Travel Adventure",
    role_en: "Edelweiss Tour & Travel Adventure",
    description:
      "Edelweiss Tour & Travel Adventure adalah website layanan perjalanan modern berbasis Next.js 16, React 19, Supabase, dan Cloudflare R2 dengan CMS admin dan direct WhatsApp booking.",
    description_en:
      "Edelweiss Tour & Travel Adventure is a modern travel service website powered by Next.js 16, React 19, Supabase, and Cloudflare R2 with an admin CMS and direct WhatsApp booking.",
    details: [
      "Membangun arsitektur full-stack website travel menggunakan Next.js 16 (App Router), React 19, TypeScript, dan SCSS Modules dengan pengalaman navigasi mobile-first.",
      "Mengimplementasikan dashboard admin CMS dengan Supabase Auth, PostgreSQL, dan Cloudflare R2 untuk manajemen CRUD paket tur, artikel, dan upload media.",
      "Mengintegrasikan direct booking WhatsApp otomatis untuk mempermudah reservasi dan konversi inquiry wisatawan secara real-time.",
    ],
    details_en: [
      "Engineered a full-stack travel platform using Next.js 16 (App Router), React 19, TypeScript, and SCSS Modules with a mobile-first navigation experience.",
      "Implemented an admin CMS dashboard with Supabase Auth, PostgreSQL, and Cloudflare R2 for autonomous CRUD management of tour packages, articles, and media uploads.",
      "Integrated direct WhatsApp booking to streamline reservations and convert traveler inquiries in real-time.",
    ],
    order_index: 1,
  },
  {
    id: "exp-2",
    period: "Apr 2026 - Mei 2026",
    period_en: "Apr 2026 - May 2026",
    role: "DiProperti",
    role_en: "DiProperti",
    description:
      "DiProperti adalah platform e-commerce properti untuk membantu pengguna menemukan dan mengevaluasi pilihan properti secara lebih terarah.",
    description_en:
      "DiProperti is a property e-commerce platform designed to help users discover and evaluate property options more intentionally.",
    details: [
      "Membangun antarmuka web responsif, memisahkan backend dan frontend, serta sistem database untuk mendukung manajemen properti serta interaksi pengguna.",
      "Menerapkan authentication, fitur rekomendasi, komparasi, simulasi kpr, dan dashboard administratif untuk meningkatkan usability dan efisiensi platform.",
      "Mengelola deployment dan infrastruktur sistem dengan praktik pengembangan modern serta DevOps untuk menjaga performa aplikasi tetap stabil.",
    ],
    details_en: [
      "Built responsive web interfaces, separated backend and frontend architecture, and database systems to support property management and user interactions.",
      "Implemented authentication, recommendation features, comparison tools, mortgage simulation, and administrative dashboards to improve usability and efficiency.",
      "Managed deployment and system infrastructure using modern development and DevOps practices to ensure stable application performance.",
    ],
    order_index: 2,
  },
  {
    id: "exp-3",
    period: "Oct 2025 - Dec 2025",
    period_en: "Oct 2025 - Dec 2025",
    role: "Semboro Orange Quality Classification System",
    role_en: "Semboro Orange Quality Classification System",
    description:
      "Sistem ini adalah platform klasifikasi kualitas jeruk berdasarkan grade yang menggabungkan AI, IoT, dan monitoring untuk mendukung proses sortir.",
    description_en:
      "This system is an orange quality classification platform that combines AI, IoT, and monitoring to support sorting workflows.",
    details: [
      "Mengembangkan model computer vision berbasis CNN VGG16 untuk klasifikasi kualitas jeruk berdasarkan grade A, B, dan reject secara otomatis.",
      "Mengintegrasikan komponen IoT seperti ESP8266, Load Cell, dan protokol MQTT untuk pemrosesan data real-time serta otomatisasi sortir.",
      "Membangun dashboard monitoring berbasis web untuk menampilkan hasil klasifikasi dan metrik performa sistem.",
    ],
    details_en: [
      "Developed a CNN VGG16-based computer vision model for automated orange quality classification.",
      "Integrated IoT components including ESP8266, Load Cell, and MQTT protocol for real-time data processing and sorting automation.",
      "Built a web-based monitoring dashboard to display classification results and system performance metrics.",
    ],
    order_index: 3,
  },
  {
    id: "exp-5",
    period: "Apr 2025 - Jun 2025",
    period_en: "Apr 2025 - Jun 2025",
    role: "Cuan Space",
    role_en: "Cuan Space",
    description:
      "Cuan Space adalah marketplace produk digital berbasis web dan mobile yang dirancang untuk transaksi serta distribusi file digital.",
    description_en:
      "Cuan Space is a web and mobile digital product marketplace designed for transactions and secure digital file distribution.",
    details: [
      "Memimpin project sebagai Project Leader dengan mengawasi perencanaan, pengembangan fitur, dan koordinasi tim.",
      "Mengembangkan marketplace web dan mobile berbasis Laravel serta Flutter dengan terintegrasi payment gateway dan pengiriman file digital yang aman.",
      "Menerapkan arsitektur database yang scalable dengan multi-role authentication dan system management.",
    ],
    details_en: [
      "Led the project as Project Leader, overseeing planning, feature development, and team coordination.",
      "Developed a Laravel and Flutter-based web and mobile marketplace with payment gateway integration and secure digital file delivery.",
      "Implemented scalable database architecture with multi-role authentication and system management.",
    ],
    order_index: 4,
  },
];

export const defaultCvSetting: DbCvSetting = {
  id: "main",
  cv_url:
    "https://wkzneptksvmiifxqyndc.supabase.co/storage/v1/object/public/portfolio/cv/1793114640664-Rizal-Danuarta-Akbar-CV.pdf",
  cv_filename: "Rizal-Danuarta-Akbar-CV.pdf",
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

  const isEn = language === "en";
  const useDynamicContent = language !== "zh";

  const dynamicProjects = useDynamicContent
    ? portfolioData.projects.map((p) => {
        const title = isEn && p.title_en ? p.title_en : p.title;
        const baseProject = base.projects.items.find(
          (item) => item.title.toLowerCase() === title.toLowerCase(),
        );
        const isLegacyPortfolioUrl =
          p.href === "https://rizaldanuartabuilds.vercel.app";
        const image =
          p.image?.startsWith("/image/projects/") &&
          baseProject?.image?.endsWith(".webp")
            ? baseProject.image
            : p.image || baseProject?.image || undefined;

        return {
          ...baseProject,
          title,
          description:
            isEn && p.description_en ? p.description_en : p.description,
          image,
          href: isLegacyPortfolioUrl
            ? "https://www.rizaldanuartaakbar.me"
            : p.href || baseProject?.href || undefined,
        };
      })
    : [];

  const dynamicExperiences = useDynamicContent
    ? portfolioData.experiences.map((e) => ({
        period: isEn && e.period_en ? e.period_en : e.period,
        role: isEn && e.role_en ? e.role_en : e.role,
        description:
          isEn && e.description_en ? e.description_en : e.description,
        details:
          isEn && e.details_en && e.details_en.length > 0
            ? e.details_en
            : e.details,
      }))
    : [];

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
