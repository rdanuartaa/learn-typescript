-- ==========================================================
-- SUPABASE SCHEMA & SEED FOR RIZAL DANUARTA AKBAR PORTFOLIO
-- ==========================================================
-- Jalankan skrip SQL ini di Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==========================================================

-- 1. Table: cv_settings (Menyimpan URL dan nama file CV aktif)
CREATE TABLE IF NOT EXISTS public.cv_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  cv_url TEXT NOT NULL DEFAULT '',
  cv_filename TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: projects (Menyimpan daftar project portofolio)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT NOT NULL,
  description_en TEXT,
  image TEXT,
  href TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: experiences (Menyimpan riwayat pengalaman kerja)
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  period TEXT NOT NULL,
  period_en TEXT,
  role TEXT NOT NULL,
  role_en TEXT,
  description TEXT NOT NULL,
  description_en TEXT,
  details JSONB NOT NULL DEFAULT '[]'::jsonb,
  details_en JSONB DEFAULT '[]'::jsonb,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Table: admins (Menampilkan profil akun admin di Table Editor)
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT DEFAULT 'Rizal Danuarta Akbar',
  role TEXT NOT NULL DEFAULT 'superadmin' CHECK (role IN ('admin', 'superadmin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================
ALTER TABLE public.cv_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Izinkan publik membaca data (SELECT)
DROP POLICY IF EXISTS "Public can view cv_settings" ON public.cv_settings;
CREATE POLICY "Public can view cv_settings" ON public.cv_settings FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can view experiences" ON public.experiences;
CREATE POLICY "Public can view experiences" ON public.experiences FOR SELECT TO anon, authenticated USING (true);

-- Mutasi hanya dilakukan oleh server menggunakan secret/service-role key.
-- Tidak ada policy write untuk role anon/authenticated.
DROP POLICY IF EXISTS "Allow modify cv_settings" ON public.cv_settings;
DROP POLICY IF EXISTS "Allow modify projects" ON public.projects;
DROP POLICY IF EXISTS "Allow modify experiences" ON public.experiences;
DROP POLICY IF EXISTS "Public can view admins" ON public.admins;
DROP POLICY IF EXISTS "Allow modify admins" ON public.admins;

REVOKE ALL ON public.cv_settings FROM anon, authenticated;
REVOKE ALL ON public.projects FROM anon, authenticated;
REVOKE ALL ON public.experiences FROM anon, authenticated;
REVOKE ALL ON public.admins FROM anon, authenticated;
GRANT SELECT ON public.cv_settings TO anon, authenticated;
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT SELECT ON public.experiences TO anon, authenticated;

-- ==========================================================
-- 5. STORAGE BUCKET: portfolio
-- ==========================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
DROP POLICY IF EXISTS "Public can read portfolio bucket" ON storage.objects;
CREATE POLICY "Public can read portfolio bucket" ON storage.objects
FOR SELECT TO anon, authenticated USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Allow upload to portfolio bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow update portfolio bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete from portfolio bucket" ON storage.objects;


-- Atomic reorder functions. Only the server service role may execute them.
CREATE OR REPLACE FUNCTION public.reorder_projects(p_items JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  requested_count INTEGER;
  existing_count INTEGER;
  updated_count INTEGER;
BEGIN
  IF jsonb_typeof(p_items) <> 'array' THEN
    RAISE EXCEPTION 'p_items must be an array';
  END IF;

  requested_count := jsonb_array_length(p_items);
  IF requested_count < 1 OR requested_count > 100 THEN
    RAISE EXCEPTION 'p_items must contain 1-100 entries';
  END IF;

  LOCK TABLE public.projects IN SHARE ROW EXCLUSIVE MODE;
  SELECT COUNT(*) INTO existing_count FROM public.projects;
  IF existing_count <> requested_count THEN
    RAISE EXCEPTION 'reorder must include every project';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM jsonb_to_recordset(p_items) AS item(id UUID, order_index INTEGER)
    GROUP BY item.id
    HAVING item.id IS NULL OR COUNT(*) > 1
  ) OR EXISTS (
    SELECT 1
    FROM jsonb_to_recordset(p_items) AS item(id UUID, order_index INTEGER)
    GROUP BY item.order_index
    HAVING item.order_index IS NULL
      OR item.order_index < 0
      OR item.order_index >= requested_count
      OR COUNT(*) > 1
  ) THEN
    RAISE EXCEPTION 'invalid or duplicate reorder entry';
  END IF;

  UPDATE public.projects AS target
  SET order_index = item.order_index
  FROM jsonb_to_recordset(p_items) AS item(id UUID, order_index INTEGER)
  WHERE target.id = item.id;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  IF updated_count <> requested_count THEN
    RAISE EXCEPTION 'one or more project ids do not exist';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.reorder_projects(JSONB) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reorder_projects(JSONB) TO service_role;

CREATE OR REPLACE FUNCTION public.reorder_experiences(p_items JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  requested_count INTEGER;
  existing_count INTEGER;
  updated_count INTEGER;
BEGIN
  IF jsonb_typeof(p_items) <> 'array' THEN
    RAISE EXCEPTION 'p_items must be an array';
  END IF;

  requested_count := jsonb_array_length(p_items);
  IF requested_count < 1 OR requested_count > 100 THEN
    RAISE EXCEPTION 'p_items must contain 1-100 entries';
  END IF;

  LOCK TABLE public.experiences IN SHARE ROW EXCLUSIVE MODE;
  SELECT COUNT(*) INTO existing_count FROM public.experiences;
  IF existing_count <> requested_count THEN
    RAISE EXCEPTION 'reorder must include every experience';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM jsonb_to_recordset(p_items) AS item(id UUID, order_index INTEGER)
    GROUP BY item.id
    HAVING item.id IS NULL OR COUNT(*) > 1
  ) OR EXISTS (
    SELECT 1
    FROM jsonb_to_recordset(p_items) AS item(id UUID, order_index INTEGER)
    GROUP BY item.order_index
    HAVING item.order_index IS NULL
      OR item.order_index < 0
      OR item.order_index >= requested_count
      OR COUNT(*) > 1
  ) THEN
    RAISE EXCEPTION 'invalid or duplicate reorder entry';
  END IF;

  UPDATE public.experiences AS target
  SET order_index = item.order_index
  FROM jsonb_to_recordset(p_items) AS item(id UUID, order_index INTEGER)
  WHERE target.id = item.id;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  IF updated_count <> requested_count THEN
    RAISE EXCEPTION 'one or more experience ids do not exist';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.reorder_experiences(JSONB) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.reorder_experiences(JSONB) TO service_role;


-- ==========================================================
-- 6. DATA AWAL (SEED DATA)
-- ==========================================================

-- Seed CV Settings
INSERT INTO public.cv_settings (id, cv_url, cv_filename, updated_at)
VALUES ('main', '', 'Belum diunggah', NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed Projects (Hanya jika tabel kosong)
INSERT INTO public.projects (title, title_en, description, description_en, image, href, order_index)
SELECT * FROM (VALUES
  (
    'DiProperti',
    'DiProperti',
    'Featured — Next.js, Laravel, MySQL, Docker, Nginx, GitHub Actions, dan VPS. Membangun platform properti end-to-end dengan authentication, rekomendasi, perbandingan, simulasi KPR, dashboard admin, serta deployment CI/CD.',
    'A property marketplace platform that helps users discover, compare, and evaluate properties based on their preferences.',
    '/image/projects/diproperti.png',
    'https://pameran-jti.polije.ac.id/pameran/product/693/aplikasi-eccomerce-properti-jember-diproperti',
    0
  ),
  (
    'Cuan Space',
    'Cuan Space',
    'Project Leader untuk marketplace produk digital Laravel dan Flutter: payment gateway, distribusi file digital aman, multi-role authentication, dan desain database yang scalable.',
    'A web and mobile digital product marketplace designed for transactions and secure digital file distribution with Laravel and Flutter.',
    '/image/projects/cuan.png',
    'https://pameran-jti.polije.ac.id/pameran/product/307/cuan-space-aplikasi-e-commerce-produk-digital-gen-z',
    1
  ),
  (
    'Semboro Orange Quality Classification System',
    'Semboro Orange Quality Classification System',
    'VGG16, TensorFlow, ESP8266, MQTT, dan web dashboard untuk klasifikasi kualitas jeruk dan monitoring sortir secara real-time.',
    'An AI and IoT-based orange quality sorting platform with a monitoring dashboard for classification results and system metrics.',
    '/image/projects/semboro.jpg',
    'https://pameran-jti.polije.ac.id/pameran/product/496/klasifikasi-kualitas-jeruk-semboro-menggunakan-arsitektur-vgg16-yang-terintegrasi-dengan-iot-berbasis-web',
    2
  ),
  (
    'Edelweiss Tour & Travel Adventure',
    'Edelweiss Tour & Travel Adventure',
    'Website tour & travel modern berbasis Next.js 16, React 19, TypeScript, SCSS, Supabase, dan Cloudflare R2 dengan CMS admin dan direct booking WhatsApp.',
    'A modern travel-service platform built with Next.js 16, React 19, TypeScript, SCSS, Supabase, and Cloudflare R2, featuring an admin CMS and direct WhatsApp booking.',
    '/image/projects/edelweiss.webp',
    'https://edelweisstourandtravel.com/',
    3
  ),
  (
    'Nusticky on Shopee',
    'Nusticky on Shopee',
    'Toko e-commerce character sticker di Shopee yang menggabungkan desain produk, strategi penjualan, branding, dan pengelolaan operasional bisnis.',
    'A character sticker e-commerce shop on Shopee combining product design, sales strategy, branding, and operations.',
    '/image/projects/nusticky.png',
    'https://shopee.co.id/nusticky',
    4
  ),
  (
    'Portfolio Website',
    'Portfolio Website',
    'Website portfolio personal dengan section About, Skills, Experience, Projects, Tools, dan Contact yang responsif serta interaktif.',
    'Personal portfolio website with interactive About, Skills, Experience, Projects, Tools, and Contact sections.',
    '/image/projects/portofolio.png',
    'https://rizaldanuartabuilds.vercel.app',
    5
  )
) AS v(title, title_en, description, description_en, image, href, order_index)
WHERE NOT EXISTS (SELECT 1 FROM public.projects);

-- Seed Experiences (Hanya jika tabel kosong)
INSERT INTO public.experiences (period, period_en, role, role_en, description, description_en, details, details_en, order_index)
SELECT * FROM (VALUES
  (
    'Nov 2023 - Present',
    'Nov 2023 - Present',
    'Founder Nusticky',
    'E-commerce Business Owner',
    'Nusticky adalah bisnis e-commerce character sticker yang berfokus pada produk visual kreatif dan penjualan berbasis marketplace.',
    'Nusticky is a character sticker e-commerce business focused on creative visual products and marketplace-based sales.',
    '["Mengoperasikan bisnis character sticker melalui marketplace Shopee dengan mengelola proses penjualan, produksi, dan distribusi dari awal hingga akhir.", "Mendesain produk sticker dan menjalankan strategi marketing, termasuk riset tren, pengembangan branding, dan optimasi harga.", "Mengelola catatan keuangan, kontrol inventaris, dan engagement pelanggan untuk menjaga pertumbuhan penjualan serta keberlanjutan bisnis."]'::jsonb,
    '["Operated a character sticker business through Shopee marketplace, managing end-to-end sales, production, and distribution processes.", "Designed sticker products and executed marketing strategies, including trend research, branding development, and pricing optimization.", "Managed financial records, inventory control, and customer engagement, ensuring consistent sales growth and business sustainability."]'::jsonb,
    0
  ),
  (
    'Oct 2026',
    'Oct 2026',
    'Edelweiss Tour & Travel Adventure',
    'Edelweiss Tour & Travel Adventure',
    'Edelweiss Tour & Travel Adventure adalah website layanan perjalanan modern berbasis Next.js 16, React 19, Supabase, dan Cloudflare R2 dengan CMS admin dan direct WhatsApp booking.',
    'Edelweiss Tour & Travel Adventure is a modern travel service website powered by Next.js 16, React 19, Supabase, and Cloudflare R2 with an admin CMS and direct WhatsApp booking.',
    '["Membangun arsitektur full-stack website travel menggunakan Next.js 16 (App Router), React 19, TypeScript, dan SCSS Modules dengan pengalaman navigasi mobile-first.", "Mengimplementasikan dashboard admin CMS dengan Supabase Auth, PostgreSQL, dan Cloudflare R2 untuk manajemen CRUD paket tur, artikel, dan upload media.", "Mengintegrasikan direct booking WhatsApp otomatis untuk mempermudah reservasi dan konversi inquiry wisatawan secara real-time."]'::jsonb,
    '["Engineered a full-stack travel platform using Next.js 16 (App Router), React 19, TypeScript, and SCSS Modules with a mobile-first navigation experience.", "Implemented an admin CMS dashboard with Supabase Auth, PostgreSQL, and Cloudflare R2 for autonomous CRUD management of tour packages, articles, and media uploads.", "Integrated direct WhatsApp booking to streamline reservations and convert traveler inquiries in real-time."]'::jsonb,
    1
  ),
  (
    'Apr 2026 - Mei 2026',
    'Apr 2026 - May 2026',
    'DiProperti',
    'DiProperti',
    'DiProperti adalah platform e-commerce properti untuk membantu pengguna menemukan dan mengevaluasi pilihan properti secara lebih terarah.',
    'DiProperti is a property e-commerce platform designed to help users discover and evaluate property options more intentionally.',
    '["Membangun antarmuka web responsif, memisahkan backend dan frontend, serta sistem database untuk mendukung manajemen properti serta interaksi pengguna.", "Menerapkan authentication, fitur rekomendasi, komparasi, simulasi kpr, dan dashboard administratif untuk meningkatkan usability dan efisiensi platform.", "Mengelola deployment dan infrastruktur sistem dengan praktik pengembangan modern serta DevOps untuk menjaga performa aplikasi tetap stabil."]'::jsonb,
    '["Built responsive web interfaces, separated backend and frontend architecture, and database systems to support property management and user interactions.", "Implemented authentication, recommendation features, comparison tools, mortgage simulation, and administrative dashboards to improve usability and efficiency.", "Managed deployment and system infrastructure using modern development and DevOps practices to ensure stable application performance."]'::jsonb,
    2
  ),
  (
    'Oct 2025 - Dec 2025',
    'Oct 2025 - Dec 2025',
    'Semboro Orange Quality Classification System',
    'Semboro Orange Quality Classification System',
    'Sistem ini adalah platform klasifikasi kualitas jeruk berdasarkan grade yang menggabungkan AI, IoT, dan monitoring untuk mendukung proses sortir.',
    'This system is an orange quality classification platform that combines AI, IoT, and monitoring to support sorting workflows.',
    '["Mengembangkan model computer vision berbasis CNN VGG16 untuk klasifikasi kualitas jeruk berdasarkan grade A, B, dan reject secara otomatis.", "Mengintegrasikan komponen IoT seperti ESP8266, Load Cell, dan protokol MQTT untuk pemrosesan data real-time serta otomatisasi sortir.", "Membangun dashboard monitoring berbasis web untuk menampilkan hasil klasifikasi dan metrik performa sistem."]'::jsonb,
    '["Developed a CNN VGG16-based computer vision model for automated orange quality classification.", "Integrated IoT components including ESP8266, Load Cell, and MQTT protocol for real-time data processing and sorting automation.", "Built a web-based monitoring dashboard to display classification results and system performance metrics."]'::jsonb,
    3
  ),
  (
    'Apr 2025 - Jun 2025',
    'Apr 2025 - Jun 2025',
    'Cuan Space',
    'Cuan Space',
    'Cuan Space adalah marketplace produk digital berbasis web dan mobile yang dirancang untuk transaksi serta distribusi file digital.',
    'Cuan Space is a web and mobile digital product marketplace designed for transactions and secure digital file distribution.',
    '["Memimpin project sebagai Project Leader dengan mengawasi perencanaan, pengembangan fitur, dan koordinasi tim.", "Mengembangkan marketplace web dan mobile berbasis Laravel serta Flutter dengan terintegrasi payment gateway dan pengiriman file digital yang aman.", "Menerapkan arsitektur database yang scalable dengan multi-role authentication dan system management."]'::jsonb,
    '["Led the project as Project Leader, overseeing planning, feature development, and team coordination.", "Developed a Laravel and Flutter-based web and mobile marketplace with payment gateway integration and secure digital file delivery.", "Implemented scalable database architecture with multi-role authentication and system management."]'::jsonb,
    4
  )
) AS v(period, period_en, role, role_en, description, description_en, details, details_en, order_index)
WHERE NOT EXISTS (SELECT 1 FROM public.experiences);

-- Seed Admin Profile
INSERT INTO public.admins (id, email, full_name, role)
SELECT id, email, 'Rizal Danuarta Akbar', 'superadmin'
FROM auth.users
WHERE email = 'akbardanu631@gmail.com'
ON CONFLICT (id) DO NOTHING;
