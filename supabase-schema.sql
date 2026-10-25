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
  role TEXT DEFAULT 'superadmin',
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
CREATE POLICY "Public can view cv_settings" ON public.cv_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view experiences" ON public.experiences;
CREATE POLICY "Public can view experiences" ON public.experiences FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view admins" ON public.admins;
CREATE POLICY "Public can view admins" ON public.admins FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow modify admins" ON public.admins;
CREATE POLICY "Allow modify admins" ON public.admins FOR ALL USING (true) WITH CHECK (true);

-- Izinkan modifikasi (INSERT, UPDATE, DELETE) dari aplikasi
DROP POLICY IF EXISTS "Allow modify cv_settings" ON public.cv_settings;
CREATE POLICY "Allow modify cv_settings" ON public.cv_settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow modify projects" ON public.projects;
CREATE POLICY "Allow modify projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow modify experiences" ON public.experiences;
CREATE POLICY "Allow modify experiences" ON public.experiences FOR ALL USING (true) WITH CHECK (true);

-- ==========================================================
-- 5. STORAGE BUCKET: portfolio
-- ==========================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
DROP POLICY IF EXISTS "Public can read portfolio bucket" ON storage.objects;
CREATE POLICY "Public can read portfolio bucket" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Allow upload to portfolio bucket" ON storage.objects;
CREATE POLICY "Allow upload to portfolio bucket" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Allow update portfolio bucket" ON storage.objects;
CREATE POLICY "Allow update portfolio bucket" ON storage.objects
FOR UPDATE USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "Allow delete from portfolio bucket" ON storage.objects;
CREATE POLICY "Allow delete from portfolio bucket" ON storage.objects
FOR DELETE USING (bucket_id = 'portfolio');

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
    'Website company profile tour & travel responsif dengan integrasi booking WhatsApp.',
    'A responsive company profile website for tour and travel services with direct WhatsApp booking integration.',
    '/image/projects/edelweiss.png',
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
    'Apr 2026 - Mei 2026',
    'Apr 2026 - May 2026',
    'DiProperti',
    'DiProperti',
    'DiProperti adalah platform e-commerce properti untuk membantu pengguna menemukan dan mengevaluasi pilihan properti secara lebih terarah.',
    'DiProperti is a property e-commerce platform designed to help users discover and evaluate property options more intentionally.',
    '["Membangun antarmuka web responsif, memisahkan backend dan frontend, serta sistem database untuk mendukung manajemen properti serta interaksi pengguna.", "Menerapkan authentication, fitur rekomendasi, komparasi, simulasi kpr, dan dashboard administratif untuk meningkatkan usability dan efisiensi platform.", "Mengelola deployment dan infrastruktur sistem dengan praktik pengembangan modern serta DevOps untuk menjaga performa aplikasi tetap stabil."]'::jsonb,
    '["Built responsive web interfaces, separated backend and frontend architecture, and database systems to support property management and user interactions.", "Implemented authentication, recommendation features, comparison tools, mortgage simulation, and administrative dashboards to improve usability and efficiency.", "Managed deployment and system infrastructure using modern development and DevOps practices to ensure stable application performance."]'::jsonb,
    1
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
    2
  ),
  (
    'Jul 2025',
    'Jul 2025',
    'Edelweiss Tour & Travel Adventure',
    'Edelweiss Tour & Travel Adventure',
    'Edelweiss Tour & Travel Adventure adalah website layanan perjalanan yang menampilkan paket wisata, informasi bisnis, dan akses booking cepat.',
    'Edelweiss Tour & Travel Adventure is a travel service website for presenting tour packages, business information, and quick booking access.',
    '["Mengembangkan website company profile untuk menampilkan paket tour, layanan, dan informasi bisnis.", "Menerapkan desain web responsif dengan integrasi booking WhatsApp langsung untuk kebutuhan customer inquiries.", "Menyusun sistem manajemen konten dan mengoptimalkan performa agar lebih mudah diakses di berbagai perangkat."]'::jsonb,
    '["Developed a company profile website to showcase tour packages, services, and business information.", "Implemented responsive web design with direct WhatsApp booking integration for customer inquiries.", "Structured content management system and optimized performance for better accessibility across devices."]'::jsonb,
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

