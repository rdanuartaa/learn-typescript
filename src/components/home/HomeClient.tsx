"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Experience from "@/components/home/Experience";
import Navbar from "@/components/home/Navbar";
import Projects from "@/components/home/Projects";
import Skills from "@/components/home/Skills";
import Tools from "@/components/home/Tools";
import { content, Language, ThemeMode } from "./content";
import { PortfolioData } from "@/types/database";
import { getMergedContent } from "@/lib/supabase/data";
import styles from "./Home.module.scss";

type ActiveSection =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "tools"
  | "contact";

type HeroPhotoId = "backTwo" | "back" | "front";
type HeroPhotoSlot = "backTwo" | "back" | "front";

const heroPhotos: {
  id: HeroPhotoId;
  src: string;
  width: number;
  height: number;
  label: string;
}[] = [
  {
    id: "back",
    src: "/image/main/bountydanu.webp",
    width: 4388,
    height: 5992,
    label: "Foto profil belakang kiri",
  },
  {
    id: "front",
    src: "/image/main/frontd.webp",
    width: 2296,
    height: 2296,
    label: "Foto profil depan",
  },
  {
    id: "backTwo",
    src: "/image/main/back2.jpg",
    width: 2329,
    height: 3264,
    label: "Foto profil belakang kanan",
  },
];

const getPhotoSlot = (
  photoId: HeroPhotoId,
  activePhoto: HeroPhotoId,
): HeroPhotoSlot => {
  if (photoId === activePhoto) {
    return "front";
  }

  if (activePhoto === "front") {
    return photoId;
  }

  return photoId === "front" ? activePhoto : photoId;
};

type HomeClientProps = {
  initialData?: PortfolioData;
};

export default function HomeClient({ initialData }: HomeClientProps = {}) {
  const [language, setLanguage] = useState<Language>("id");
  const [theme, setTheme] = useState<ThemeMode>("monochrome");
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");
  const [portfolioData, setPortfolioData] = useState<PortfolioData | undefined>(initialData);
  const [activeHeroPhoto, setActiveHeroPhoto] =
    useState<HeroPhotoId>("back");
  const [selectedHeroPhoto, setSelectedHeroPhoto] =
    useState<HeroPhotoId | null>(null);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setPortfolioData(data);
      })
      .catch(() => {});
  }, []);

  const copy = getMergedContent(language, portfolioData);
  const handleActiveSectionChange = useCallback((section: ActiveSection) => {
    setActiveSection(section);
  }, []);

  useEffect(() => {
    const marqueeSelector = `.${styles.toolMarquee}`;
    const marquees = Array.from(
      document.querySelectorAll<HTMLElement>(marqueeSelector),
    );
    const cleanups: (() => void)[] = [];

    marquees.forEach((marquee) => {
      const getLoopWidth = () => marquee.scrollWidth / 3;
      const centerScroll = () => {
        marquee.scrollLeft = getLoopWidth();
      };
      const recycleScroll = () => {
        const loopWidth = getLoopWidth();

        if (loopWidth <= 0) {
          return;
        }

        if (marquee.scrollLeft < loopWidth * 0.35) {
          marquee.scrollLeft += loopWidth;
        } else if (marquee.scrollLeft > loopWidth * 1.65) {
          marquee.scrollLeft -= loopWidth;
        }
      };
      let isDragging = false;
      let startX = 0;
      let startScrollLeft = 0;

      requestAnimationFrame(centerScroll);

      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target as HTMLElement;

        if (target.closest("a, button")) {
          return;
        }

        isDragging = true;
        startX = event.clientX;
        startScrollLeft = marquee.scrollLeft;
        marquee.classList.add(styles.marqueeDragging);
        marquee.setPointerCapture(event.pointerId);
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (!isDragging) {
          return;
        }

        marquee.scrollLeft = startScrollLeft - (event.clientX - startX);
        recycleScroll();
      };

      const stopDragging = (event: PointerEvent) => {
        if (!isDragging) {
          return;
        }

        isDragging = false;
        marquee.classList.remove(styles.marqueeDragging);

        if (marquee.hasPointerCapture(event.pointerId)) {
          marquee.releasePointerCapture(event.pointerId);
        }
      };

      const handleWheel = (event: WheelEvent) => {
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
          return;
        }

        event.preventDefault();
        marquee.scrollLeft += event.deltaY;
        recycleScroll();
      };

      const handleScroll = () => {
        if (!isDragging) {
          recycleScroll();
        }
      };

      marquee.addEventListener("pointerdown", handlePointerDown);
      marquee.addEventListener("pointermove", handlePointerMove);
      marquee.addEventListener("pointerup", stopDragging);
      marquee.addEventListener("pointercancel", stopDragging);
      marquee.addEventListener("scroll", handleScroll);
      marquee.addEventListener("wheel", handleWheel, { passive: false });

      cleanups.push(() => {
        marquee.removeEventListener("pointerdown", handlePointerDown);
        marquee.removeEventListener("pointermove", handlePointerMove);
        marquee.removeEventListener("pointerup", stopDragging);
        marquee.removeEventListener("pointercancel", stopDragging);
        marquee.removeEventListener("scroll", handleScroll);
        marquee.removeEventListener("wheel", handleWheel);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <main
      className={styles.page}
      data-theme={theme}
      data-active-section={activeSection}
    >
      <Navbar
        nav={copy.nav}
        activeSection={activeSection}
        onActiveSectionChange={handleActiveSectionChange}
      />

      <section id="home" className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className={styles.lead}>{copy.hero.lead}</p>
            <div className={styles.heroActions}>
              <a href="#projects" className={styles.primaryButton}>
                <span>{copy.hero.primary}</span>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              {copy.cvUrl ? (
                <a
                  href={copy.cvUrl}
                  className={styles.secondaryButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download CV</span>
                </a>
              ) : null}

              <a href="#contact" className={styles.outlineButton}>
                {copy.hero.secondary}
              </a>

              <a
                href="https://github.com/rdanuartaa"
                className={styles.iconButton}
                target="_blank"
                rel="noreferrer"
                title={copy.hero.github || "GitHub Profile"}
                aria-label={copy.hero.github || "GitHub Profile"}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.photoStage}>
            <div
              className={styles.photoStack}
              role="group"
              aria-label={copy.hero.photo}
            >
              {heroPhotos.map((photo) => {
                const slot = getPhotoSlot(photo.id, activeHeroPhoto);
                const slotClass =
                  slot === "front"
                    ? styles.heroPhotoSlotFront
                    : slot === "back"
                      ? styles.heroPhotoSlotBack
                      : styles.heroPhotoSlotBackTwo;
                const imageClass =
                  photo.id === "back"
                    ? styles.heroPhotoImageBack
                    : photo.id === "backTwo"
                      ? styles.heroPhotoImageBackTwo
                      : styles.heroPhotoImageFront;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    className={`${styles.heroPhotoCard} ${slotClass} ${
                      selectedHeroPhoto === photo.id
                        ? styles.heroPhotoCardActive
                        : ""
                    }`}
                    aria-label={photo.label}
                    onClick={() => {
                      setActiveHeroPhoto(photo.id);
                      setSelectedHeroPhoto(photo.id);
                    }}
                  >
                    <Image
                      className={`${styles.heroPhotoImage} ${imageClass}`}
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      alt=""
                      priority
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <About
        content={copy.about}
        isActive={activeSection === "about"}
        cvUrl={copy.cvUrl}
      />
      <Skills content={copy.skills} isActive={activeSection === "skills"} />
      <Experience content={copy.experience} />
      <Projects
        content={copy.projects}
        isActive={activeSection === "projects"}
      />
      <Tools content={copy.tools} isActive={activeSection === "tools"} />
      <Contact content={copy.contact} />
    </main>
  );
}
