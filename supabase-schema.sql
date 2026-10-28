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
    'Agu 2026 - Sekarang',
    'Aug 2026 - Present',
    'Mobile Developer Intern | RUN System',
    'Mobile Developer Intern | RUN System',
    'Pengembangan aplikasi mobile Point of Sale (POS) ACC+ berbasis Flutter dan Dart dengan integrasi REST API backend, pembayaran QRIS, dan penanganan operasional transaksi.',
    'Contributed to the ACC+ Point of Sale (POS) mobile application using Flutter and Dart, integrating backend REST APIs and core operational workflows.',
    '["Mengembangkan aplikasi mobile POS ACC+ menggunakan Flutter dan Dart, mengintegrasikan REST API backend serta mengimplementasikan 4 fitur operasional & transaksi: warehouse filtering, pembayaran QRIS, pelunasan piutang, dan penanganan kembalian transaksi.", "Memvalidasi request & response API menggunakan Bruno, mengakses sumber daya internal via NetBird VPN, dan berkolaborasi melalui GitLab untuk manajemen source code, testing, debugging, dan alur deployment."]'::jsonb,
    '["Contribute to the ACC+ POS mobile application using Flutter and Dart, integrating backend REST APIs and implementing 4 transaction and operational features: warehouse filtering, QRIS payment, receivables settlement, and transaction change handling.", "Validate API requests and responses using Bruno, access internal development resources through NetBird VPN, and collaborate through GitLab for source-code management, testing, debugging, and deployment workflows."]'::jsonb,
    0
  ),
  (
    'Nov 2023 - Sekarang',
    'Nov 2023 - Present',
    'Founder & E-Commerce Business Owner | Nusticky',
    'Founder & E-Commerce Business Owner | Nusticky',
    'Nusticky adalah bisnis e-commerce character sticker yang berfokus pada produk visual kreatif dan penjualan berbasis marketplace Shopee.',
    'Nusticky is a character sticker e-commerce business focused on creative visual products and marketplace-based sales.',
    '["Mengelola operasional e-commerce end-to-end mencakup pengembangan produk, branding, penetapan harga, inventaris, penjualan, customer service, dan fulfillment untuk 25+ produk aktif dan 4.000+ pesanan berhasil.", "Melakukan riset produk dan pasar serta mengelola catatan inventaris dan keuangan, meraih predikat Shopee Star Seller dengan rating kepuasan 4.9/5.0 dari 1.800+ ulasan pembeli dan 100% response rate chat."]'::jsonb,
    '["Manage end-to-end e-commerce operations covering product development, branding, pricing, inventory, sales, customer service, and fulfillment across 25+ active products and 4,000+ completed orders.", "Conduct product and market research while maintaining inventory and financial records, achieving Shopee Star Seller status with a 4.9/5.0 customer satisfaction rating across 1,800+ reviews and a 100% chat response rate."]'::jsonb,
    1
  ),
  (
    'Okt 2026',
    'Oct 2026',
    'Edelweiss Tour & Travel Adventure | Full-Stack Travel Platform',
    'Edelweiss Tour & Travel Adventure | Full-Stack Travel Platform',
    'Edelweiss Tour & Travel Adventure adalah website layanan perjalanan modern berbasis Next.js 16, React 19, Supabase, dan Cloudflare R2 dengan CMS admin dan direct WhatsApp booking.',
    'Edelweiss Tour & Travel Adventure is a modern travel service website powered by Next.js 16, React 19, Supabase, and Cloudflare R2 with an admin CMS and direct WhatsApp booking.',
    '["Membangun platform travel full-stack responsif dengan fitur paket tur dan artikel dinamis, dukungan multi-bahasa, pemesanan WhatsApp, dan navigasi mobile-first.", "Mengembangkan admin CMS untuk 2 modul konten utama—paket wisata dan artikel, dengan manajemen CRUD, Supabase PostgreSQL/Auth, Row-Level Security, dan Cloudflare R2 untuk penyimpanan aset media."]'::jsonb,
    '["Engineered a responsive full-stack travel platform featuring dynamic tour packages and articles, multi-language support, WhatsApp booking, and mobile-focused navigation.", "Built an admin CMS for 2 core content modules—tour packages and articles, with CRUD management, Supabase PostgreSQL/Auth, Row-Level Security, and Cloudflare R2 object storage for media assets."]'::jsonb,
    2
  ),
  (
    'Apr 2026 - Mei 2026',
    'Apr 2026 - May 2026',
    'DiProperti | Full-Stack Property Marketplace',
    'DiProperti | Full-Stack Property Marketplace',
    'DiProperti adalah platform marketplace properti untuk membantu pengguna menemukan, mengevaluasi, membandingkan properti, serta simulasi KPR secara terarah.',
    'DiProperti is a full-stack property marketplace connecting property search, evaluation, comparison, mortgage simulation, and administrative management.',
    '["Mengembangkan platform marketplace properti full-stack dengan 8 fitur utama, termasuk autentikasi, komparasi properti, rekomendasi, simulasi KPR, dan dashboard administratif.", "Mengintegrasikan Next.js dengan Laravel REST API dan MySQL, menerapkan multi-role authentication, mengkontainerisasi layanan dengan Docker, serta membangun alur deployment menggunakan GitHub Actions, Nginx, VPS, dan Vercel."]'::jsonb,
    '["Developed a full-stack property marketplace with 8 core features, including authentication, property comparison, recommendations, mortgage simulation, and an administrative dashboard.", "Integrated Next.js with Laravel REST APIs and MySQL, implemented multi-role authentication, containerized services with Docker, and established a deployment workflow using GitHub Actions, Nginx, VPS, and Vercel."]'::jsonb,
    3
  ),
  (
    'Okt 2025 - Des 2025',
    'Oct 2025 - Dec 2025',
    'Semboro Orange Quality Classification | AI & IoT',
    'Semboro Orange Quality Classification | AI & IoT',
    'Sistem klasifikasi kualitas dan sortir jeruk Semboro otomatis menggabungkan deep learning VGG16, IoT ESP8266, telemetri MQTT, dan monitoring web real-time.',
    'This system is an automated orange quality classification platform that combines VGG16 deep learning, ESP8266 IoT telemetry, and real-time monitoring to support sorting workflows.',
    '["Mengintegrasikan model klasifikasi VGG16 (akurasi uji 99.16%, 3 kelas kualitas) ke dalam sistem IoT sortir fisik otomatis.", "Mengintegrasikan ESP8266 dan MQTT untuk komunikasi data IoT serta mengembangkan web dashboard berbasis Flask untuk monitoring hasil klasifikasi dan data perangkat secara real-time."]'::jsonb,
    '["Integrated a team-developed VGG16 classification model (99.16% test accuracy, 3 quality classes) into an IoT system.", "Integrated ESP8266 and MQTT for IoT data communication and developed a Flask web dashboard for real-time monitoring of classification results and device data."]'::jsonb,
    4
  ),
  (
    'Apr 2025 - Mei 2025',
    'Apr 2025 - May 2025',
    'Cuan Space | Web & Mobile Digital Product Marketplace',
    'Cuan Space | Web & Mobile Digital Product Marketplace',
    'Cuan Space adalah marketplace produk digital berbasis web (Laravel) dan mobile (Flutter) yang dirancang untuk transaksi, integrasi payment gateway Midtrans, serta distribusi file digital aman.',
    'Cuan Space is a web and mobile digital product marketplace designed for transactions, Midtrans payment gateway checkout, and secure digital file delivery.',
    '["Mengembangkan aplikasi web Laravel dan mobile Flutter terintegrasi yang mendukung 3 user role (Admin, Seller, Buyer) dan 6 fitur utama, mengoordinasikan pengembangan fitur dan eksekusi proyek.", "Membangun 35+ endpoint REST API terproteksi Laravel Sanctum serta mengintegrasikan payment gateway Midtrans dengan webhook callback otomatis untuk rekonsiliasi transaksi real-time dan distribusi aset digital yang aman."]'::jsonb,
    '["Integrated Laravel web and Flutter mobile applications supporting 3 user roles (Admin, Seller, Buyer) and 6 core features, coordinating feature development and project execution.", "Engineered 35+ REST API endpoints secured with Laravel Sanctum and integrated Midtrans payment gateway with automated webhook callbacks, enabling real-time transaction reconciliation and protected digital asset delivery."]'::jsonb,
    5
  )
) AS v(period, period_en, role, role_en, description, description_en, details, details_en, order_index)
WHERE NOT EXISTS (SELECT 1 FROM public.experiences);

-- Seed Admin Profile
INSERT INTO public.admins (id, email, full_name, role)
SELECT id, email, 'Rizal Danuarta Akbar', 'superadmin'
FROM auth.users
WHERE email = 'akbardanu631@gmail.com'
ON CONFLICT (id) DO NOTHING;
