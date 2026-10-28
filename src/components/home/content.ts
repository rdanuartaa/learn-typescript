export type Language = "id" | "en" | "zh";
export type ThemeMode = "monochrome" | "colour";

export const languageOptions: { label: string; value: Language }[] = [
  { label: "Indonesia", value: "id" },
  { label: "English", value: "en" },
  { label: "中文", value: "zh" },
];

export type ExperienceItem = {
  period: string;
  role: string;
  description: string;
  details?: readonly string[];
};

export type ProjectItem = {
  title: string;
  description: string;
  image?: string;
  href?: string;
  demoHref?: string;
  repositoryHref?: string;
  details?: {
    role: string;
    challenge: string;
    solution: string;
    outcome: string;
  };
};

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
        "Saya adalah full-stack developer dan mahasiswa Teknik Informatika (IPK 3.80/4.00) dengan pengalaman pengembangan mobile profesional pada sistem Point of Sale (POS), serta 4 proyek web, mobile, AI, dan IoT yang telah di-deploy. Berfokus membangun aplikasi berorientasi produksi menggunakan React, Next.js, TypeScript, Laravel, Flutter, dan REST API, didukung pengalaman praktis dalam integrasi database, autentikasi, cloud storage, CI/CD, dan deployment.",
        "Pengalaman profesional di RUN System serta mendirikan Nusticky memperkuat pemahaman saya tentang operasional, pelanggan, dan prioritas bisnis. Konteks tersebut saya bawa ke setiap proyek: menyederhanakan alur kerja, menerjemahkan kebutuhan menjadi fitur yang andal, dan membangun produk yang mudah dipelihara bersama tim.",
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
          title: "Mobile",
          description:
            "Flutter, Dart, arsitektur Point of Sale (POS), dan mobile state management.",
        },
        {
          title: "Backend & API",
          description:
            "Python, PHP, Laravel, REST API, API integration, dan payment gateway.",
        },
        {
          title: "Database",
          description:
            "MySQL, PostgreSQL, database design, relasi data, dan query optimization.",
        },
        {
          title: "DevOps & Tools",
          description:
            "Docker, Nginx, GitLab, GitHub Actions, VPS, Vercel, Git, Bruno, NetBird, dan Figma.",
        },
        {
          title: "Additional",
          description:
            "VGG16, MQTT, ESP8266, operasional e-commerce, dan product development.",
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
        "Ringkasan pengalaman profesional, pengembangan produk, dan rekayasa perangkat lunak yang menggabungkan sisi bisnis dan sistem produksi.",
      items: [] as ExperienceItem[],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected Software Projects",
      summary:
        "Proyek yang menunjukkan kemampuan full-stack, integrasi sistem, dan deployment aplikasi produksi.",
      linkLabel: "Selengkapnya",
      demoLabel: "Demo",
      repositoryLabel: "Repository",
      items: [] as ProjectItem[],
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
        "I am a Full-Stack Developer and Informatics Engineering student with a 3.80/4.00 GPA, professional mobile development experience on a Point of Sale (POS) system, and 4 deployed web, mobile, AI, and IoT projects. I build production-oriented applications using React, Next.js, TypeScript, Laravel, Flutter, and REST APIs, with hands-on experience in database integration, authentication, cloud storage, CI/CD, and deployment.",
        "My professional experience at RUN System along with founding Nusticky sharpened my understanding of operations, customers, and commercial priorities. I bring that context to software projects: simplifying workflows, translating requirements into reliable features, and shipping maintainable products with a team.",
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
          title: "Mobile",
          description:
            "Flutter, Dart, Point of Sale (POS) architecture, and mobile state management.",
        },
        {
          title: "Backend & API",
          description:
            "Python, PHP, Laravel, REST API, API integration, and payment gateway.",
        },
        {
          title: "Database",
          description:
            "MySQL, PostgreSQL, database design, data relations, and query optimization.",
        },
        {
          title: "DevOps & Tools",
          description:
            "Docker, Nginx, GitLab, GitHub Actions, VPS, Vercel, Git, Bruno, NetBird, and Figma.",
        },
        {
          title: "Additional",
          description:
            "VGG16, MQTT, ESP8266, e-commerce operations, and product development.",
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
        "A proven track record combining mobile and full-stack software development, production systems, and business operations.",
      items: [] as ExperienceItem[],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected Software Projects",
      summary:
        "Business-focused web and mobile applications covering frontend, backend, databases, integrations, and deployment.",
      linkLabel: "View project",
      demoLabel: "Live demo",
      repositoryLabel: "Repository",
      items: [] as ProjectItem[],
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
      summary: "融合移动端与全栈开发、生产级系统以及商业运营实践的经验概览。",
      items: [] as ExperienceItem[],
    },
    projects: {
      eyebrow: "项目",
      title: "把想法变成产品",
      summary: "我通过商业策略、以用户为中心的设计，以及可持续的软件开发，把想法转化为数字产品。",
      linkLabel: "查看更多",
      items: [] as ProjectItem[],
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
