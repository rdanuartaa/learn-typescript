import { content as defaultContent, Language } from "@/components/home/content";
import { DbCvSetting, DbExperience, DbProject, PortfolioData } from "@/types/database";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "./client";
import { getSupabasePublicServerClient } from "./server";

export const defaultProjects: DbProject[] = [
  {
    id: "project-1",
    title: "DiProperti",
    title_en: "DiProperti",
    description:
      "Featured — Next.js, Laravel, MySQL, Docker, Nginx, GitHub Actions, dan VPS. Membangun platform properti end-to-end dengan authentication, rekomendasi, perbandingan, simulasi KPR, dashboard admin, serta deployment CI/CD.",
    description_en:
      "A property marketplace platform that helps users discover, compare, and evaluate properties based on their preferences.",
    image: "/image/projects/diproperti.png",
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
      "A web and mobile digital product marketplace designed for transactions and secure digital file distribution with Laravel and Flutter.",
    image: "/image/projects/cuan.png",
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
      "An AI and IoT-based orange quality sorting platform with a monitoring dashboard for classification results and system metrics.",
    image: "/image/projects/semboro.jpg",
    href: "https://pameran-jti.polije.ac.id/pameran/product/496/klasifikasi-kualitas-jeruk-semboro-menggunakan-arsitektur-vgg16-yang-terintegrasi-dengan-iot-berbasis-web",
    order_index: 2,
  },
  {
    id: "project-4",
    title: "Edelweiss Tour & Travel Adventure",
    title_en: "Edelweiss Tour & Travel Adventure",
    description:
      "Website company profile tour & travel responsif dengan integrasi booking WhatsApp.",
    description_en:
      "A responsive company profile website for tour and travel services with direct WhatsApp booking integration.",
    image: "/image/projects/edelweiss.png",
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
    image: "/image/projects/nusticky.png",
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
    image: "/image/projects/portofolio.png",
    href: "https://rizaldanuartabuilds.vercel.app",
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
    order_index: 1,
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
    order_index: 2,
  },
  {
    id: "exp-4",
    period: "Jul 2025",
    period_en: "Jul 2025",
    role: "Edelweiss Tour & Travel Adventure",
    role_en: "Edelweiss Tour & Travel Adventure",
    description:
      "Edelweiss Tour & Travel Adventure adalah website layanan perjalanan yang menampilkan paket wisata, informasi bisnis, dan akses booking cepat.",
    description_en:
      "Edelweiss Tour & Travel Adventure is a travel service website for presenting tour packages, business information, and quick booking access.",
    details: [
      "Mengembangkan website company profile untuk menampilkan paket tour, layanan, dan informasi bisnis.",
      "Menerapkan desain web responsif dengan integrasi booking WhatsApp langsung untuk kebutuhan customer inquiries.",
      "Menyusun sistem manajemen konten dan mengoptimalkan performa agar lebih mudah diakses di berbagai perangkat.",
    ],
    details_en: [
      "Developed a company profile website to showcase tour packages, services, and business information.",
      "Implemented responsive web design with direct WhatsApp booking integration for customer inquiries.",
      "Structured content management system and optimized performance for better accessibility across devices.",
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
  cv_url: "",
  cv_filename: "",
};

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

  const dynamicProjects = portfolioData.projects.map((p) => ({
    title: isEn && p.title_en ? p.title_en : p.title,
    description: isEn && p.description_en ? p.description_en : p.description,
    image: p.image || undefined,
    href: p.href || undefined,
  }));

  const dynamicExperiences = portfolioData.experiences.map((e) => ({
    period: isEn && e.period_en ? e.period_en : e.period,
    role: isEn && e.role_en ? e.role_en : e.role,
    description: isEn && e.description_en ? e.description_en : e.description,
    details:
      isEn && e.details_en && e.details_en.length > 0
        ? e.details_en
        : e.details,
  }));

  return {
    ...base,
    cvUrl: portfolioData.cv?.cv_url || undefined,
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
