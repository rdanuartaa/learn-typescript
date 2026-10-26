# Portfolio Rizal Danuarta Akbar

Personal portfolio website yang dibangun dengan Next.js, TypeScript, React, dan Sass. Website ini menampilkan profil, about, skills, experience, projects, tools, contact, serta interaksi visual responsif untuk desktop dan mobile.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Tech Stack

| Area | Teknologi |
| --- | --- |
| Framework | Next.js 16 |
| UI Library | React 19 |
| Bahasa | TypeScript |
| Styling | Sass / SCSS Modules |
| Assets | Local image assets, SVG tool icons |
| Deploy | Vercel |
| Quality | ESLint, production build check |

## Fitur Utama

- Hero section dengan stack foto interaktif yang bisa dipilih.
- Layout responsif dengan penyesuaian khusus mobile.
- Multi-language content melalui data terstruktur di `content.ts`.
- Theme preference dark/light.
- Skills, Projects, dan Tools marquee yang tetap auto-scroll tetapi bisa digeser manual.
- Project cards dengan flip interaction, preview image, dan tombol `href`.
- Experience timeline dengan pagination otomatis jika item lebih dari 5.
- Contact section dengan WhatsApp form dan social icon links.
- Footer kecil berisi framework, bahasa, UI stack, dan deploy platform.

## Struktur Project

```txt
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/home/
    About.tsx
    Contact.tsx
    Experience.tsx
    HomeClient.tsx
    Home.module.scss
    Navbar.tsx
    Projects.tsx
    Skills.tsx
    Tools.tsx
    content.ts
public/
  image/
    main/
    projects/
    tools/
```

## Menjalankan Project

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka:

```txt
http://localhost:3000
```

## Script

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Mengubah Konten

Mayoritas konten portfolio ada di:

```txt
src/components/home/content.ts
```

Contoh bagian project:

```ts
{
  title: "Nama Project",
  description: "Deskripsi singkat project.",
  image: "/image/projects/example.png",
  href: "https://link-project.com",
}
```

Gunakan `href: "#contact"` untuk scroll ke section contact, atau URL penuh untuk link eksternal.

## Deploy

Project ini siap dideploy ke Vercel.

### Supabase (wajib untuk CV dan konten dinamis)

1. Buka **SQL Editor** pada project Supabase `wkzneptksvmiifxqyndc`, lalu jalankan seluruh isi [supabase-schema.sql](./supabase-schema.sql). Ini membuat tabel `cv_settings`, `projects`, `experiences`, bucket `portfolio`, dan data awal.
   Jika schema lama sudah pernah diterapkan, jalankan [supabase-security-migration.sql](./supabase-security-migration.sql) satu kali untuk menutup policy write publik tanpa menghapus data.
2. Di Vercel, buka **Project → Settings → Environment Variables** dan tambahkan variabel berikut untuk **Production**, **Preview**, dan **Development**:

   ```txt
   NEXT_PUBLIC_SUPABASE_URL=https://wkzneptksvmiifxqyndc.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<Supabase Publishable key / legacy anon key>
   SUPABASE_SECRET_KEY=<Supabase secret key / legacy service_role key>
   ```

   Jangan gunakan prefix `NEXT_PUBLIC_` untuk `SUPABASE_SECRET_KEY`. Admin API sekarang gagal tertutup jika key server ini tidak tersedia; public/anon key tidak lagi digunakan sebagai fallback untuk mutation.
3. Redeploy aplikasi di Vercel setelah menyimpan environment variables. Variabel baru hanya dibaca oleh deployment baru.
4. Masuk ke `/admin`, lalu gunakan **Seed data default** sekali jika tabel project atau experience masih kosong. Upload CV melalui tab **Upload CV**; file akan disimpan di Supabase Storage dan URL-nya otomatis tersimpan di `cv_settings`.
5. Pastikan user administrator memiliki row dengan `id` yang sama di `public.admins` dan `role` bernilai `admin` atau `superadmin`. User Supabase Auth tanpa row tersebut akan menerima `403` pada seluruh mutation API.
6. Setelah migrasi, reset password admin yang pernah digunakan sebelumnya dan revoke semua sesi aktif melalui Supabase Authentication. Menghapus literal dari HEAD tidak menghapusnya dari Git history.

File `.env.example` menyediakan template lokal. Salin menjadi `.env.local` dan isi key asli untuk menjalankan integrasi di komputer sendiri.

```bash
npm run build
```

Jika build berhasil, push ke repository dan hubungkan ke Vercel.
