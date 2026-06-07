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

```bash
npm run build
```

Jika build berhasil, push ke repository dan hubungkan ke Vercel.
