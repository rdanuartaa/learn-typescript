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
import { content, languageOptions, Language, ThemeMode } from "./content";
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

export default function HomeClient() {
  const [language, setLanguage] = useState<Language>("id");
  const [theme, setTheme] = useState<ThemeMode>("monochrome");
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>("home");
  const [activeHeroPhoto, setActiveHeroPhoto] =
    useState<HeroPhotoId>("back");
  const [selectedHeroPhoto, setSelectedHeroPhoto] =
    useState<HeroPhotoId | null>(null);
  const copy = content[language];
  const handleActiveSectionChange = useCallback((section: ActiveSection) => {
    setActiveSection(section);
  }, []);

  useEffect(() => {
    const marqueeSelector = [
      `.${styles.pillarGrid}`,
      `.${styles.projectGrid}`,
      `.${styles.toolMarquee}`,
    ].join(",");
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
      <button
        type="button"
        className={styles.preferenceButton}
        aria-label={copy.controls.title}
        aria-haspopup="dialog"
        aria-expanded={isPreferencesOpen}
        onClick={() => setIsPreferencesOpen(true)}
      >
        <span>R</span>
      </button>

      {isPreferencesOpen ? (
        <div
          className={styles.modalOverlay}
          role="presentation"
          onClick={() => setIsPreferencesOpen(false)}
        >
          <div
            className={styles.preferenceModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="preferences-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 id="preferences-title">{copy.controls.title}</h2>
              <button
                type="button"
                className={styles.modalClose}
                aria-label="Close preferences"
                onClick={() => setIsPreferencesOpen(false)}
              >
                x
              </button>
            </div>

            <div className={styles.preferenceGroup}>
              <span>{copy.controls.theme}</span>
              <div className={styles.segmented}>
                <button
                  type="button"
                  className={
                    theme === "monochrome" ? styles.activeSegment : ""
                  }
                  onClick={() => setTheme("monochrome")}
                >
                  {copy.controls.monochrome}
                </button>
                <button
                  type="button"
                  className={theme === "colour" ? styles.activeSegment : ""}
                  onClick={() => setTheme("colour")}
                >
                  {copy.controls.colour}
                </button>
              </div>
            </div>

            <div className={styles.preferenceGroup}>
              <span>{copy.controls.language}</span>
              <div className={styles.segmented}>
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={
                      language === option.value ? styles.activeSegment : ""
                    }
                    onClick={() => setLanguage(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
                {copy.hero.primary}
              </a>
              <a href="#contact" className={styles.secondaryButton}>
                {copy.hero.secondary}
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

      <About content={copy.about} isActive={activeSection === "about"} />
      <Skills content={copy.skills} isActive={activeSection === "skills"} />
      <Experience content={copy.experience} />
      <Projects
        content={copy.projects}
        isActive={activeSection === "projects"}
      />
      <Tools content={copy.tools} isActive={activeSection === "tools"} />
      <Contact content={copy.contact} />
      <footer className={styles.siteFooter}>
        <span>Next.js 16</span>
        <span>TypeScript</span>
        <span>React 19</span>
        <span>Sass</span>
        <span>Vercel</span>
      </footer>
    </main>
  );
}
