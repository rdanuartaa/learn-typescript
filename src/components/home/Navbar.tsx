"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import styles from "./Home.module.scss";

type NavbarProps = {
  nav: {
    brand: string;
    about: string;
    skills: string;
    experience: string;
    projects: string;
    tools: string;
    contact: string;
  };
  activeSection: SectionId;
  onActiveSectionChange: (section: SectionId) => void;
};

const links = [
  ["about", "about"],
  ["skills", "skills"],
  ["experience", "experience"],
  ["projects", "projects"],
  ["tools", "tools"],
  ["contact", "contact"],
] as const;

type SectionId = (typeof links)[number][1] | "home";

export default function Navbar({
  nav,
  activeSection,
  onActiveSectionChange,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeSectionRef = useRef<SectionId>(activeSection);
  const pendingSectionRef = useRef<SectionId | null>(null);
  const pendingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const sectionIds: SectionId[] = ["home", ...links.map(([, href]) => href)];
    let animationFrame = 0;

    const updateActiveSection = () => {
      const scrollElement = document.scrollingElement ?? document.documentElement;
      const pageHeight = Math.max(
        scrollElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
      );
      const scrollTop = scrollElement.scrollTop || window.scrollY;
      const isAtPageBottom =
        Math.ceil(scrollTop + window.innerHeight) >= pageHeight - 8;
      const viewportLine = window.innerHeight * 0.5;
      let currentSection: SectionId = "home";
      const pendingSection = pendingSectionRef.current;

      if (pendingSection) {
        const target = document.getElementById(pendingSection);

        if (target) {
          const rect = target.getBoundingClientRect();
          const targetReached =
            Math.abs(rect.top - 96) <= 28 ||
            (pendingSection === "contact" && isAtPageBottom);

          if (!targetReached) {
            return;
          }
        }

        pendingSectionRef.current = null;
      }

      if (isAtPageBottom) {
        if (activeSectionRef.current !== "contact") {
          activeSectionRef.current = "contact";
          onActiveSectionChange("contact");
        }
        return;
      }

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);

        if (!section) {
          return;
        }

        const rect = section.getBoundingClientRect();

        if (rect.top <= viewportLine && rect.bottom >= viewportLine) {
          currentSection = id;
        }
      });

      if (currentSection === "home") {
        sectionIds.forEach((id) => {
          const section = document.getElementById(id);

          if (!section) {
            return;
          }

          if (section.getBoundingClientRect().top <= viewportLine) {
            currentSection = id;
          }
        });
      }

      if (activeSectionRef.current !== currentSection) {
        activeSectionRef.current = currentSection;
        onActiveSectionChange(currentSection);
      }
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (pendingTimeoutRef.current) {
        window.clearTimeout(pendingTimeoutRef.current);
      }
    };
  }, [onActiveSectionChange]);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: SectionId,
  ) => {
    event.preventDefault();
    setIsOpen(false);
    pendingSectionRef.current = sectionId;
    activeSectionRef.current = sectionId;
    onActiveSectionChange(sectionId);

    if (pendingTimeoutRef.current) {
      window.clearTimeout(pendingTimeoutRef.current);
    }

    pendingTimeoutRef.current = window.setTimeout(() => {
      pendingSectionRef.current = null;
    }, 1400);

    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.pushState(null, "", `#${sectionId}`);
  };

  return (
    <header className={styles.siteHeader}>
      <nav className={styles.navbar} aria-label="Main navigation">
        <a
          href="#home"
          className={styles.logo}
          onClick={(event) => handleNavClick(event, "home")}
        >
          {nav.brand}
        </a>

        <button
          type="button"
          className={styles.navToggle}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <div
          className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ""}`}
        >
          {links.map(([key, href]) => (
            <a
              key={key}
              href={`#${href}`}
              className={activeSection === href ? styles.activeNavLink : ""}
              aria-current={activeSection === href ? "page" : undefined}
              onClick={(event) => handleNavClick(event, href)}
            >
              {nav[key]}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
