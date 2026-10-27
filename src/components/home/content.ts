export type Language = "id" | "en" | "zh";
export type ThemeMode = "monochrome" | "colour";

export const languageOptions: { label: string; value: Language }[] = [
  { label: "Indonesia", value: "id" },
  { label: "English", value: "en" },
  { label: "中文", value: "zh" },
];

export const content = {
  id: {
    nav: {
      brand: "Portfolio Rizal Danuarta Akbar",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      tools: "Tools",
      contact: "Contact",
    },
    controls: {
      title: "Preferensi Tampilan",
      theme: "Mode",
      language: "Bahasa",
      monochrome: "Monocrom",
      colour: "Colour Full",
    },
    hero: {
      eyebrow: "Full-Stack Developer | Software Engineer",
      title: "Hallo, Saya Rizal Danuarta Akbar",
      lead: "Next.js · React · TypeScript · Laravel · Flutter\nSaya membangun aplikasi web dan mobile praktis yang membantu bisnis menyederhanakan alur kerja serta mengubah ide menjadi produk digital yang andal.",
      primary: "Lihat Projects",
      github: "GitHub",
      secondary: "Hubungi Saya",
      photo: "Foto Profil",
      badge: "Section portfolio siap dikembangkan.",
    },
    about: {
      eyebrow: "About",
      title: "Tentang Saya",
      paragraphs: [
        "Saya adalah full-stack developer yang berfokus pada aplikasi web bisnis dan pengalaman mobile pendukung. Saya membangun antarmuka, API, database, serta alur deployment dengan Next.js, React, TypeScript, Laravel, Flutter, PostgreSQL/MySQL, dan Docker.",
        "Pengalaman menjalankan Nusticky memperkuat pemahaman saya tentang operasional, pelanggan, dan prioritas bisnis. Konteks tersebut saya bawa ke setiap proyek: menyederhanakan alur kerja, menerjemahkan kebutuhan menjadi fitur yang andal, dan membangun produk yang mudah dipelihara bersama tim.",
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "Hard Skill & Soft Skill",
      hardTitle: "Hard Skill",
      softTitle: "Soft Skill",
      hard: [
        {
          title: "Frontend",
          description:
            "React, Next.js, TypeScript, JavaScript, HTML, CSS, dan Sass.",
        },
        {
          title: "Backend",
          description:
            "PHP, Laravel, REST API, authentication, dan integrasi layanan.",
        },
        {
          title: "Database",
          description:
            "MySQL, PostgreSQL, database design, relasi data, dan query aplikasi.",
        },
        {
          title: "DevOps & Deployment",
          description:
            "Docker, Nginx, GitHub Actions, VPS, Vercel, dan Git.",
        },
        {
          title: "Additional",
          description:
            "Flutter, Python, MQTT, ESP8266, TensorFlow/VGG16, strategi bisnis, dan product design.",
        },
      ],
      soft: [
        {
          title: "Pemecahan Masalah",
          description:
            "Mampu menganalisis masalah dan menemukan solusi yang efektif.",
        },
        {
          title: "Berpikir Kreatif",
          description:
            "Menciptakan ide dan pendekatan baru untuk menghasilkan solusi yang inovatif.",
        },
        {
          title: "Komunikasi",
          description:
            "Menyampaikan ide dan informasi secara jelas kepada tim maupun stakeholder.",
        },
        {
          title: "Kepemimpinan",
          description:
            "Mampu mengarahkan tim dan mengambil keputusan untuk mencapai tujuan bersama.",
        },
        {
          title: "Kerja Sama Tim",
          description:
            "Bekerja sama secara efektif dalam lingkungan kolaboratif dan multidisiplin.",
        },
        {
          title: "Adaptabilitas",
          description:
            "Cepat beradaptasi dengan teknologi, tantangan, dan lingkungan kerja yang dinamis.",
        },
        {
          title: "Belajar Berkelanjutan",
          description:
            "Memiliki semangat belajar yang tinggi untuk terus berkembang dan mengikuti perubahan industri.",
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Pengalaman Kerja & Proses Berkembang",
      summary:
        "Ringkasan pengalaman dan apa yang saya buat dengan menggabungkan sisi bisnis, teknis, produk, dan pengembangan sistem.",
      items: [
        {
          period: "Nov 2023 - Present",
          role: "Founder Nusticky",
          description:
            "Nusticky adalah bisnis e-commerce character sticker yang berfokus pada produk visual kreatif dan penjualan berbasis marketplace.",
          details: [
            "Mengoperasikan bisnis character sticker melalui marketplace Shopee dengan mengelola proses penjualan, produksi, dan distribusi dari awal hingga akhir.",
            "Mendesain produk sticker dan menjalankan strategi marketing, termasuk riset tren, pengembangan branding, dan optimasi harga.",
            "Mengelola catatan keuangan, kontrol inventaris, dan engagement pelanggan untuk menjaga pertumbuhan penjualan serta keberlanjutan bisnis.",
          ],
        },
        {
          period: "Oct 2026",
          role: "Edelweiss Tour & Travel Adventure",
          description:
            "Edelweiss Tour & Travel Adventure adalah website layanan perjalanan modern berbasis Next.js 16, React 19, Supabase, dan Cloudflare R2 dengan CMS admin dan direct WhatsApp booking.",
          details: [
            "Membangun arsitektur full-stack website travel menggunakan Next.js 16 (App Router), React 19, TypeScript, dan SCSS Modules dengan pengalaman navigasi mobile-first.",
            "Mengimplementasikan dashboard admin CMS dengan Supabase Auth, PostgreSQL, dan Cloudflare R2 untuk manajemen CRUD paket tur, artikel, dan upload media.",
            "Mengintegrasikan direct booking WhatsApp otomatis untuk mempermudah reservasi dan konversi inquiry wisatawan secara real-time.",
          ],
        },
        {
          period: "Apr 2026 - Mei 2026",
          role: "DiProperti",
          description:
            "DiProperti adalah platform e-commerce properti untuk membantu pengguna menemukan dan mengevaluasi pilihan properti secara lebih terarah.",
          details: [
            "Membangun antarmuka web responsif, memisahkan backend dan frontend, serta sistem database untuk mendukung manajemen properti serta interaksi pengguna.",
            "Menerapkan authentication, fitur rekomendasi, komparasi, simulasi kpr, dan dashboard administratif untuk meningkatkan usability dan efisiensi platform.",
            "Mengelola deployment dan infrastruktur sistem dengan praktik pengembangan modern serta DevOps untuk menjaga performa aplikasi tetap stabil.",
          ],
        },
        {
          period: "Oct 2025 - Dec 2025",
          role: "Semboro Orange Quality Classification System",
          description:
            "Sistem ini adalah platform klasifikasi kualitas jeruk berdasarkan grade yang menggabungkan AI, IoT, dan monitoring untuk mendukung proses sortir.",
          details: [
            "Mengembangkan model computer vision berbasis CNN VGG16 untuk klasifikasi kualitas jeruk berdasarkan grade A, B, dan reject secara otomatis.",
            "Mengintegrasikan komponen IoT seperti ESP8266, Load Cell, dan protokol MQTT untuk pemrosesan data real-time serta otomatisasi sortir.",
            "Membangun dashboard monitoring berbasis web untuk menampilkan hasil klasifikasi dan metrik performa sistem.",
          ],
        },
        {
          period: "Apr 2025 - Jun 2025",
          role: "Cuan Space",
          description:
            "Cuan Space adalah marketplace produk digital berbasis web dan mobile yang dirancang untuk transaksi serta distribusi file digital.",
          details: [
            "Memimpin project sebagai Project Leader dengan mengawasi perencanaan, pengembangan fitur, dan koordinasi tim.",
            "Mengembangkan marketplace web dan mobile berbasis Laravel serta Flutter dengan terintegrasi payment gateway dan pengiriman file digital yang aman.",
            "Menerapkan arsitektur database yang scalable dengan multi-role authentication dan system management.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected Software Projects",
      summary:
        "Proyek yang menunjukkan kemampuan full-stack, integrasi sistem, dan deployment aplikasi produksi.",
      linkLabel: "Selengkapnya",
      demoLabel: "Demo",
      repositoryLabel: "Repository",
      items: [
        {
          title: "DiProperti",
          description:
            "Featured — Next.js, Laravel, MySQL, Docker, Nginx, GitHub Actions, dan VPS. Membangun platform properti end-to-end dengan authentication, rekomendasi, perbandingan, simulasi KPR, dashboard admin, serta deployment CI/CD.",
          image: "/image/projects/diproperti.webp",
          href: "https://pameran-jti.polije.ac.id/pameran/product/693/aplikasi-eccomerce-properti-jember-diproperti",
          demoHref: "https://dipropertijember.my.id",
          repositoryHref: "https://github.com/rdanuartaa/project_diproperti",
          details: {
            role: "Full-Stack Developer",
            challenge: "Menyatukan pencarian dan evaluasi properti dalam satu alur yang praktis.",
            solution: "Membangun fitur pencarian, perbandingan, simulasi KPR, autentikasi, dan dashboard admin dengan Next.js serta Laravel.",
            outcome: "Menghasilkan platform siap deploy dengan MySQL, Docker, Nginx, GitHub Actions, dan VPS.",
          },
        },
        {
          title: "Cuan Space",
          description:
            "Project Leader untuk marketplace produk digital Laravel dan Flutter: payment gateway, distribusi file digital aman, multi-role authentication, dan desain database yang scalable.",
          image: "/image/projects/cuan.webp",
          href: "https://pameran-jti.polije.ac.id/pameran/product/307/cuan-space-aplikasi-e-commerce-produk-digital-gen-z",
          repositoryHref: "https://github.com/rdanuartaa/project_cuanspace",
          details: {
            role: "Project Leader & Full-Stack Developer",
            challenge: "Mendukung penjualan produk digital melalui web dan mobile dengan distribusi file yang aman.",
            solution: "Memimpin pengembangan Laravel dan Flutter, payment gateway, multi-role authentication, dan alur pengiriman file.",
            outcome: "Menghasilkan prototipe marketplace end-to-end untuk penjual dan pembeli produk digital.",
          },
        },
        {
          title: "Semboro Orange Quality Classification System",
          description:
            "VGG16, TensorFlow, ESP8266, MQTT, dan web dashboard untuk klasifikasi kualitas jeruk dan monitoring sortir secara real-time.",
          image: "/image/projects/semboro.jpg",
          href: "https://pameran-jti.polije.ac.id/pameran/product/496/klasifikasi-kualitas-jeruk-semboro-menggunakan-arsitektur-vgg16-yang-terintegrasi-dengan-iot-berbasis-web",
          repositoryHref: "https://github.com/rdanuartaa/project_jtech",
          details: {
            role: "AI, IoT & Web Developer",
            challenge: "Mengurangi inkonsistensi proses manual dalam menentukan grade jeruk Semboro.",
            solution: "Mengintegrasikan VGG16, ESP8266, load cell, MQTT, dan dashboard monitoring web.",
            outcome: "Menghasilkan prototipe klasifikasi dan monitoring proses sortir secara real-time.",
          },
        },
        {
          title: "Edelweiss Tour & Travel Adventure",
          description:
            "Website tour & travel modern berbasis Next.js 16, React 19, TypeScript, SCSS, Supabase, dan Cloudflare R2 dengan CMS admin dan direct booking WhatsApp.",
          image: "/image/projects/edelweiss.webp",
          href: "https://edelweisstourandtravel.com/",
          repositoryHref: "https://github.com/rdanuartaa/new-edelweiss",
          details: {
            role: "Full-Stack Web Developer",
            challenge: "Membangun platform travel modern yang responsif di mobile, mudah dikelola lewat admin dashboard, dan terintegrasi pemesanan WhatsApp cepat.",
            solution: "Mengembangkan aplikasi dengan Next.js 16, React 19, TypeScript, SCSS Modules, Supabase (PostgreSQL & Auth), Cloudflare R2, dan direct WhatsApp booking.",
            outcome: "Website travel berperforma tinggi dengan sistem CMS mandiri untuk paket tur dan artikel serta konversi reservasi langsung.",
          },
        },
        {
          title: "Nusticky on Shopee",
          description:
            "Toko e-commerce character sticker di Shopee yang menggabungkan desain produk, strategi penjualan, branding, dan pengelolaan operasional bisnis.",
          image: "/image/projects/nusticky.webp",
          href: "https://shopee.co.id/nusticky",
        },
        {
          title: "Portfolio Website",
          description:
            "Website portfolio personal dengan section About, Skills, Experience, Projects, Tools, dan Contact yang responsif serta interaktif.",
          image: "/image/projects/portofolio.webp",
          href: "https://www.rizaldanuartaakbar.me",
          repositoryHref: "https://github.com/rdanuartaa/learn-typescript",
        },
      ],
    },
    tools: {
      eyebrow: "Tools",
      title: "Apa yang Ada di Meja Saya?",
      summary:
        "Mulai dari desain, pengembangan, hingga deployment, inilah tools yang paling sering saya gunakan untuk membangun produk digital.",
      laneTitles: {
        primary: "Bahasa & Framework",
        secondary: "Aplikasi & Tools",
      },
      groups: [
        { title: "Bahasa", items: ["HTML", "CSS", "JavaScript", "TypeScript"] },
        { title: "Framework", items: ["Next.js", "React", "Sass", "Git", "GitHub"] },
        {
          title: "Aplikasi",
          items: ["Visual Studio Code", "Figma", "Canva", "Chrome DevTools"],
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Mari membangun solusi yang berguna",
      summary:
        "Terbuka untuk posisi full-stack atau software engineering serta proyek aplikasi web bisnis dan mobile.",
      messageLabel: "Pesan",
      messagePlaceholder: "Tulis pesan singkat untuk WhatsApp...",
      submitLabel: "Kirim ke WhatsApp",
      defaultMessage: "Halo Rizal, saya ingin berdiskusi tentang proyek atau peluang kerja.",
    },
  },
  en: {
    nav: {
      brand: "Rizal Danuarta Akbar Portfolio",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      tools: "Tools",
      contact: "Contact",
    },
    controls: {
      title: "Display Preferences",
      theme: "Mode",
      language: "Language",
      monochrome: "Monochrome",
      colour: "Colour Full",
    },
    hero: {
      eyebrow: "Full-Stack Developer | Software Engineer",
      title: "Hello, I am Rizal Danuarta Akbar",
      lead: "Next.js · React · TypeScript · Laravel · Flutter\nI build practical web and mobile applications that help businesses streamline workflows and turn ideas into reliable digital products.",
      primary: "View Projects",
      github: "GitHub",
      secondary: "Contact Me",
      photo: "Profile Photo",
      badge: "Portfolio sections ready to grow.",
    },
    about: {
      eyebrow: "About",
      title: "About Me",
      paragraphs: [
        "I am a full-stack developer focused on business web applications and supporting mobile experiences. I build interfaces, APIs, databases, and deployment workflows with Next.js, React, TypeScript, Laravel, Flutter, PostgreSQL/MySQL, and Docker.",
        "Running Nusticky sharpened my understanding of operations, customers, and commercial priorities. I bring that context to software projects: simplifying workflows, translating requirements into reliable features, and shipping maintainable products with a team.",
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "Hard Skills & Soft Skills",
      hardTitle: "Hard Skills",
      softTitle: "Soft Skills",
      hard: [
        {
          title: "Frontend",
          description:
            "React, Next.js, TypeScript, JavaScript, HTML, CSS, and Sass.",
        },
        {
          title: "Backend",
          description:
            "PHP, Laravel, REST APIs, authentication, and service integrations.",
        },
        {
          title: "Database",
          description:
            "MySQL, PostgreSQL, database design, data relations, and application queries.",
        },
        {
          title: "DevOps & Deployment",
          description:
            "Docker, Nginx, GitHub Actions, VPS, Vercel, and Git.",
        },
        {
          title: "Additional",
          description:
            "Flutter, Python, MQTT, ESP8266, TensorFlow/VGG16, business strategy, and product design.",
        },
      ],
      soft: [
        {
          title: "Problem Solving",
          description:
            "Able to analyze problems and find effective solutions.",
        },
        {
          title: "Creative Thinking",
          description:
            "Creating new ideas and approaches to produce innovative solutions.",
        },
        {
          title: "Communication",
          description:
            "Communicating ideas and information clearly to teams and stakeholders.",
        },
        {
          title: "Leadership",
          description:
            "Able to guide teams and make decisions to achieve shared goals.",
        },
        {
          title: "Teamwork",
          description:
            "Working effectively in collaborative and multidisciplinary environments.",
        },
        {
          title: "Adaptability",
          description:
            "Quickly adapting to technology, challenges, and dynamic work environments.",
        },
        {
          title: "Continuous Learning",
          description:
            "Having a strong learning mindset to keep growing and follow industry changes.",
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Work Experience & Growth Process",
      summary:
        "A short overview combining business, technical, product, and system development experience.",
      items: [
        {
          period: "Nov 2023 - Present",
          role: "E-commerce Business Owner",
          description:
            "Nusticky is a character sticker e-commerce business focused on creative visual products and marketplace-based sales.",
          details: [
            "Operated a character sticker business through Shopee marketplace, managing end-to-end sales, production, and distribution processes.",
            "Designed sticker products and executed marketing strategies, including trend research, branding development, and pricing optimization.",
            "Managed financial records, inventory control, and customer engagement, ensuring consistent sales growth and business sustainability.",
          ],
        },
        {
          period: "Oct 2026",
          role: "Edelweiss Tour & Travel Adventure",
          description:
            "Edelweiss Tour & Travel Adventure is a modern travel service website powered by Next.js 16, React 19, Supabase, and Cloudflare R2 with an admin CMS and direct WhatsApp booking.",
          details: [
            "Engineered a full-stack travel platform using Next.js 16 (App Router), React 19, TypeScript, and SCSS Modules with a mobile-first navigation experience.",
            "Implemented an admin CMS dashboard with Supabase Auth, PostgreSQL, and Cloudflare R2 for autonomous CRUD management of tour packages, articles, and media uploads.",
            "Integrated direct WhatsApp booking to streamline reservations and convert traveler inquiries in real-time.",
          ],
        },
        {
          period: "Apr 2026 - May 2026",
          role: "DiProperti",
          description:
            "DiProperti is a property e-commerce platform designed to help users discover and evaluate property options more intentionally.",
          details: [
            "Built responsive web interfaces, separated backend and frontend architecture, and database systems to support property management and user interactions.",
            "Implemented authentication, recommendation features, comparison tools, mortgage simulation, and administrative dashboards to improve usability and efficiency.",
            "Managed deployment and system infrastructure using modern development and DevOps practices to ensure stable application performance.",
          ],
        },
        {
          period: "Oct 2025 - Dec 2025",
          role: "Semboro Orange Quality Classification System",
          description:
            "This system is an orange quality classification platform that combines AI, IoT, and monitoring to support sorting workflows.",
          details: [
            "Developed a CNN VGG16-based computer vision model for automated orange quality classification.",
            "Integrated IoT components including ESP8266, Load Cell, and MQTT protocol for real-time data processing and sorting automation.",
            "Built a web-based monitoring dashboard to display classification results and system performance metrics.",
          ],
        },
        {
          period: "Apr 2025 - Jun 2025",
          role: "Cuan Space",
          description:
            "Cuan Space is a web and mobile digital product marketplace designed for transactions and secure digital file distribution.",
          details: [
            "Led the project as Project Leader, overseeing planning, feature development, and team coordination.",
            "Developed a Laravel and Flutter-based web and mobile marketplace with payment gateway integration and secure digital file delivery.",
            "Implemented scalable database architecture with multi-role authentication and system management.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected Software Projects",
      summary:
        "Business-focused web and mobile applications covering frontend, backend, databases, integrations, and deployment.",
      linkLabel: "View project",
      demoLabel: "Live demo",
      repositoryLabel: "Repository",
      items: [
        {
          title: "DiProperti",
          description:
            "A production-oriented property marketplace built with Next.js, Laravel, MySQL, Docker, Nginx, and GitHub Actions.",
          image: "/image/projects/diproperti.webp",
          href: "https://pameran-jti.polije.ac.id/pameran/product/693/aplikasi-eccomerce-properti-jember-diproperti",
          demoHref: "https://dipropertijember.my.id",
          repositoryHref: "https://github.com/rdanuartaa/project_diproperti",
          details: {
            role: "Full-Stack Developer",
            challenge: "Unify property discovery and evaluation in one practical workflow.",
            solution: "Built search, comparison, mortgage simulation, authentication, and admin features with Next.js and Laravel.",
            outcome: "Delivered a deployable platform using MySQL, Docker, Nginx, GitHub Actions, and a VPS.",
          },
        },
        {
          title: "Cuan Space",
          description:
            "A Laravel and Flutter marketplace for digital-product payments, role-based access, and secure file delivery.",
          image: "/image/projects/cuan.webp",
          href: "https://pameran-jti.polije.ac.id/pameran/product/307/cuan-space-aplikasi-e-commerce-produk-digital-gen-z",
          repositoryHref: "https://github.com/rdanuartaa/project_cuanspace",
          details: {
            role: "Project Leader & Full-Stack Developer",
            challenge: "Support digital-product sales across web and mobile with secure fulfillment.",
            solution: "Led Laravel and Flutter development, payment integration, role-based access, and file delivery workflows.",
            outcome: "Produced an end-to-end marketplace prototype for digital-product sellers and customers.",
          },
        },
        {
          title: "Semboro Orange Quality Classification System",
          description:
            "An AI, IoT, and web platform for real-time orange-quality classification and sorting monitoring.",
          image: "/image/projects/semboro.jpg",
          href: "https://pameran-jti.polije.ac.id/pameran/product/496/klasifikasi-kualitas-jeruk-semboro-menggunakan-arsitektur-vgg16-yang-terintegrasi-dengan-iot-berbasis-web",
          repositoryHref: "https://github.com/rdanuartaa/project_jtech",
          details: {
            role: "AI, IoT & Web Developer",
            challenge: "Reduce inconsistency in the manual grading of Semboro oranges.",
            solution: "Integrated VGG16, ESP8266, load-cell telemetry, MQTT, and a web monitoring dashboard.",
            outcome: "Created a real-time classification and sorting-monitoring prototype.",
          },
        },
        {
          title: "Edelweiss Tour & Travel Adventure",
          description:
            "A modern travel-service platform built with Next.js 16, React 19, TypeScript, SCSS, Supabase, and Cloudflare R2, featuring an admin CMS and direct WhatsApp booking.",
          image: "/image/projects/edelweiss.webp",
          href: "https://edelweisstourandtravel.com/",
          repositoryHref: "https://github.com/rdanuartaa/new-edelweiss",
          details: {
            role: "Full-Stack Web Developer",
            challenge: "Deliver a responsive travel platform with seamless mobile booking, autonomous CMS management, and fast asset delivery.",
            solution: "Engineered with Next.js 16 (App Router), React 19, TypeScript, SCSS Modules, Supabase (PostgreSQL & Auth), Cloudflare R2, and WhatsApp direct routing.",
            outcome: "Delivered a high-performance travel web platform with autonomous CMS management for tour packages and articles, boosting direct customer bookings.",
          },
        },
        {
          title: "Nusticky on Shopee",
          description:
            "A character sticker e-commerce store on Shopee combining product design, sales strategy, branding, and business operations management.",
          image: "/image/projects/nusticky.webp",
          href: "https://shopee.co.id/nusticky",
        },
        {
          title: "Portfolio Website",
          description:
            "A responsive and interactive personal portfolio website with About, Skills, Experience, Projects, Tools, and Contact sections.",
          image: "/image/projects/portofolio.webp",
          href: "https://www.rizaldanuartaakbar.me",
          repositoryHref: "https://github.com/rdanuartaa/learn-typescript",
        },
      ],
    },
    tools: {
      eyebrow: "Tools",
      title: "Technology I Use",
      summary:
        "The languages, frameworks, infrastructure, and product tools I use to build and ship reliable applications.",
      laneTitles: {
        primary: "Languages & Frameworks",
        secondary: "Apps & Tools",
      },
      groups: [
        { title: "Languages", items: ["HTML", "CSS", "JavaScript", "TypeScript"] },
        { title: "Frameworks", items: ["Next.js", "React", "Sass", "Git", "GitHub"] },
        {
          title: "Apps",
          items: ["Visual Studio Code", "Figma", "Canva", "Chrome DevTools"],
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let us build something useful",
      summary:
        "Available for full-stack and software engineering roles, plus business web and mobile application projects.",
      messageLabel: "Message",
      messagePlaceholder: "Write a short message for WhatsApp...",
      submitLabel: "Send via WhatsApp",
      defaultMessage: "Hi Rizal, I would like to discuss a project or job opportunity.",
    },
  },
  zh: {
    nav: {
      brand: "Rizal Danuarta Akbar 作品集",
      about: "关于",
      skills: "技能",
      experience: "经验",
      projects: "项目",
      tools: "工具",
      contact: "联系",
    },
    controls: {
      title: "显示设置",
      theme: "模式",
      language: "语言",
      monochrome: "单色",
      colour: "全彩",
    },
    hero: {
      eyebrow: "全栈开发者 | 软件工程师",
      title: "你好，我是 Rizal Danuarta Akbar",
      lead: "我是一名软件工程师，结合设计、商业与技术，把想法转化为可直接使用的数字产品。",
      primary: "查看项目",
      github: "GitHub",
      secondary: "联系我",
      photo: "个人照片",
      badge: "作品集模块可继续扩展。",
    },
    about: {
      eyebrow: "关于",
      title: "关于我",
      paragraphs: [
        "我对应用开发、商业策略和现代技术充满兴趣。我相信，一个好的产品来自强大的技术、合适的设计，以及对用户需求的深入理解。",
        "我的优势横跨三个互相补充的领域：设计、商业和编程。自己经营业务的经历让我学会理解用户需求、发现市场机会，并创造真正有价值的解决方案。凭借这些能力，我希望继续贡献、学习并与团队共同成长，打造能为用户和企业带来影响的产品。",
      ],
    },
    skills: {
      eyebrow: "技能",
      title: "硬技能与软技能",
      hardTitle: "硬技能",
      softTitle: "软技能",
      hard: [
        {
          title: "商业策略",
          description:
            "理解市场需求，开发产品，并为用户和业务创造相关价值。",
        },
        {
          title: "软件开发",
          description:
            "通过功能性和可持续的应用开发，将想法转化为数字解决方案。",
        },
        {
          title: "产品设计",
          description:
            "通过有效并以用户需求为中心的设计，打造直观的用户体验。",
        },
        {
          title: "系统架构",
          description:
            "设计可扩展、高效且易于继续开发的系统结构、数据库和应用流程。",
        },
        {
          title: "DevOps 与部署",
          description:
            "管理部署、集成和应用维护，让产品在生产环境中稳定运行并可直接使用。",
        },
      ],
      soft: [
        {
          title: "问题解决",
          description: "能够分析问题并找到有效的解决方案。",
        },
        {
          title: "创造性思维",
          description: "创造新的想法和方法，形成创新的解决方案。",
        },
        {
          title: "沟通能力",
          description: "向团队和利益相关者清晰传达想法与信息。",
        },
        {
          title: "领导力",
          description: "能够引导团队并做出决策，以实现共同目标。",
        },
        {
          title: "团队协作",
          description: "在协作和跨领域环境中高效合作。",
        },
        {
          title: "适应能力",
          description: "快速适应技术、挑战和动态工作环境。",
        },
        {
          title: "持续学习",
          description: "保持强烈学习动力，持续成长并跟进行业变化。",
        },
      ],
    },
    experience: {
      eyebrow: "经验",
      title: "工作经验与成长过程",
      summary: "结合商业、技术、产品与系统开发经验的简短总结。",
      items: [
        {
          period: "2023年11月 - 至今",
          role: "Nusticky 创始人",
          description:
            "Nusticky 是一个角色贴纸电商业务，专注于创意视觉产品和电商平台销售。",
          details: [
            "通过 Shopee 电商平台运营角色贴纸业务，管理从销售、生产到配送的完整流程。",
            "设计贴纸产品并执行营销策略，包括趋势研究、品牌发展和定价优化。",
            "管理财务记录、库存控制和客户互动，确保销售增长和业务可持续性。",
          ],
        },
        {
          period: "2026年10月",
          role: "Edelweiss Tour & Travel Adventure",
          description:
            "Edelweiss Tour & Travel Adventure 是基于 Next.js 16、React 19、Supabase 和 Cloudflare R2 的现代旅行服务网站，具备后台 CMS 和 WhatsApp 快速预订功能。",
          details: [
            "使用 Next.js 16 (App Router)、React 19、TypeScript 和 SCSS Modules 构建全栈旅游平台，提供移动端优先的交互体验。",
            "基于 Supabase 认证、PostgreSQL 与 Cloudflare R2 实现 CMS 管理后台，支持旅游套餐、文章与媒体上传的自主管理。",
            "集成 WhatsApp 一键快捷预订功能，实现游客咨询的即时转化与高效行程预约。",
          ],
        },
        {
          period: "2026年4月 - 2026年5月",
          role: "DiProperti",
          description:
            "DiProperti 是一个房产电商平台，帮助用户更有方向地发现和评估房产选择。",
          details: [
            "构建响应式网页界面，拆分后端与前端架构，并设计数据库系统来支持房产管理与用户交互。",
            "实现身份认证、推荐功能、对比功能、房贷模拟和管理后台，以提升平台可用性与效率。",
            "使用现代开发与 DevOps 实践管理部署和系统基础设施，确保应用性能稳定。",
          ],
        },
        {
          period: "2025年10月 - 2025年12月",
          role: "Semboro 橙子质量分类系统",
          description:
            "该系统是一个橙子质量分类平台，结合人工智能、物联网和监控功能来支持分拣流程。",
          details: [
            "开发基于 CNN VGG16 的计算机视觉模型，用于自动化识别橙子的质量等级。",
            "集成 ESP8266、称重传感器和 MQTT 协议等物联网组件，实现实时数据处理和自动分拣。",
            "构建基于网页的监控仪表盘，用于展示分类结果和系统性能指标。",
          ],
        },
        {
          period: "2025年4月 - 2025年6月",
          role: "Cuan Space",
          description:
            "Cuan Space 是一个网页与移动端数字产品交易平台，面向交易和安全的数字文件分发。",
          details: [
            "担任项目负责人，负责规划、功能开发和团队协调。",
            "开发基于 Laravel 和 Flutter 的网页与移动端交易平台，并集成支付网关和安全的数字文件交付流程。",
            "实现可扩展的数据库架构，并支持多角色身份认证和系统管理。",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "项目",
      title: "把想法变成产品",
      summary: "我通过商业策略、以用户为中心的设计，以及可持续的软件开发，把想法转化为数字产品。",
      linkLabel: "查看更多",
      items: [
        {
          title: "DiProperti",
          description: "一个房产交易平台，帮助用户根据偏好发现、比较和评估房产。",
          image: "/image/projects/diproperti.webp",
          href: "https://pameran-jti.polije.ac.id/pameran/product/693/aplikasi-eccomerce-properti-jember-diproperti",
        },
        {
          title: "Semboro 橙子质量分类系统",
          description:
            "基于人工智能和物联网的橙子质量分拣平台，配备用于展示分类结果和系统指标的监控仪表盘。",
          image: "/image/projects/semboro.jpg",
          href: "https://pameran-jti.polije.ac.id/pameran/product/496/klasifikasi-kualitas-jeruk-semboro-menggunakan-arsitektur-vgg16-yang-terintegrasi-dengan-iot-berbasis-web",
        },
        {
          title: "Edelweiss Tour & Travel Adventure",
          description:
            "基于 Next.js 16、React 19、TypeScript、SCSS、Supabase 和 Cloudflare R2 构建的现代旅游服务平台，配备后台 CMS 与 WhatsApp 快速预订功能。",
          image: "/image/projects/edelweiss.webp",
          href: "https://edelweisstourandtravel.com/",
          repositoryHref: "https://github.com/rdanuartaa/new-edelweiss",
          details: {
            role: "全栈 Web 开发者 (Full-Stack Developer)",
            challenge: "构建快速且移动端适配的旅游平台，具备后台管理系统与 WhatsApp 即时预订功能。",
            solution: "采用 Next.js 16 (App Router)、React 19、TypeScript、SCSS 模块、Supabase (PostgreSQL & Auth)、Cloudflare R2 对象存储及 CMS 管理后台。",
            outcome: "实现了高性能的旅游服务平台，支持自主套餐/文章管理与一键 WhatsApp 快速预订。",
          },
        },
        {
          title: "Cuan Space",
          description:
            "一个网页与移动端数字产品交易平台，支持支付网关、安全文件分发和多角色身份认证。",
          image: "/image/projects/cuan.webp",
          href: "https://pameran-jti.polije.ac.id/pameran/product/307/cuan-space-aplikasi-e-commerce-produk-digital-gen-z",
        },
        {
          title: "Nusticky on Shopee",
          description:
            "Shopee 上的角色贴纸电商店铺，结合产品设计、销售策略、品牌建设和业务运营管理。",
          image: "/image/projects/nusticky.webp",
          href: "https://shopee.co.id/nusticky",
        },
        {
          title: "个人作品集网站",
          description: "一个响应式、交互式个人作品集网站，包含关于、技能、经验、项目、工具和联系模块。",
          image: "/image/projects/portofolio.webp",
          href: "https://www.rizaldanuartaakbar.me",
        },
      ],
    },
    tools: {
      eyebrow: "工具",
      title: "我的工作台上有什么？",
      summary: "从设计、开发到部署，这些是我最常用来构建数字产品的工具。",
      laneTitles: {
        primary: "语言与框架",
        secondary: "应用与工具",
      },
      groups: [
        { title: "语言", items: ["HTML", "CSS", "JavaScript", "TypeScript"] },
        { title: "框架", items: ["Next.js", "React", "Sass", "Git", "GitHub"] },
        {
          title: "应用",
          items: ["Visual Studio Code", "Figma", "Canva", "Chrome DevTools"],
        },
      ],
    },
    contact: {
      eyebrow: "联系",
      title: "一起创造有影响力的作品",
      summary: "欢迎就合作、产品开发、商业机会，以及以增长和创新为核心的项目联系我。",
    },
  },
} as const;
