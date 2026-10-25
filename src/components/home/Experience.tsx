"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Home.module.scss";

const ITEMS_PER_PAGE = 5;

type ExperienceProps = {
  content: {
    eyebrow: string;
    title: string;
    summary: string;
    items: readonly {
      period: string;
      role: string;
      description: string;
      details?: readonly string[];
    }[];
  };
};

export default function Experience({ content }: ExperienceProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const pageCount = Math.ceil(content.items.length / ITEMS_PER_PAGE);
  const activePage = Math.min(currentPage, Math.max(pageCount - 1, 0));
  const shouldShowPagination = content.items.length > ITEMS_PER_PAGE;
  const visibleItems = useMemo(() => {
    const start = activePage * ITEMS_PER_PAGE;

    return content.items.slice(start, start + ITEMS_PER_PAGE);
  }, [activePage, content.items]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 0), pageCount - 1));
  };

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateActiveItem = () => {
      const sectionEl = document.getElementById("experience");
      if (!sectionEl) return;

      const sectionRect = sectionEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if experience section is reasonably visible in the viewport
      if (sectionRect.bottom < 100 || sectionRect.top > viewportHeight - 100) {
        return;
      }

      // Reading focal line: ~40% from top of viewport (natural resting reading position on mobile)
      const focusY = viewportHeight * 0.4;
      let closestRole: string | null = null;
      let minDistance = Infinity;

      for (const el of itemRefs.current) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        // If the focus line is within this item
        if (rect.top <= focusY && rect.bottom >= focusY) {
          closestRole = el.getAttribute("data-role") || null;
          break;
        }

        // Otherwise find item whose center is closest to focusY
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - focusY);

        if (rect.bottom > 80 && rect.top < viewportHeight - 80) {
          if (distance < minDistance) {
            minDistance = distance;
            closestRole = el.getAttribute("data-role") || null;
          }
        }
      }

      if (closestRole) {
        setActiveRole(closestRole);
      }
    };

    const handleScroll = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        updateActiveItem();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial check
    updateActiveItem();

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [visibleItems]);

  return (
    <section
      id="experience"
      className={`${styles.section} ${styles.experience}`}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h2>{content.title}</h2>
          </div>
          <p>{content.summary}</p>
        </div>

        <div className={styles.timeline}>
          {visibleItems.map((item, index) => {
            const isNusticky = item.role.toLowerCase().includes("nusticky");
            const isActive = activeRole === item.role;

            return (
              <article
                key={item.role}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={`${styles.timelineItem} ${
                  isNusticky ? styles.timelineItemNusticky : ""
                } ${isActive ? styles.timelineItemActive : ""}`}
                data-role={item.role}
                data-nusticky={isNusticky ? "true" : undefined}
                data-active={isActive ? "true" : undefined}
                onClick={() => setActiveRole(item.role)}
              >
                <span>{item.period}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.description}</p>
                  {item.details ? (
                    <ul className={styles.timelineDetails}>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        {shouldShowPagination ? (
          <nav
            className={styles.timelinePagination}
            aria-label="Experience pagination"
          >
            <button
              type="button"
              onClick={() => goToPage(activePage - 1)}
              disabled={activePage === 0}
              aria-label="Previous experience page"
            >
              Prev
            </button>
            <div>
              {Array.from({ length: pageCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  className={activePage === index ? styles.activePage : ""}
                  onClick={() => goToPage(index)}
                  aria-label={`Go to experience page ${index + 1}`}
                  aria-current={activePage === index ? "page" : undefined}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => goToPage(activePage + 1)}
              disabled={activePage === pageCount - 1}
              aria-label="Next experience page"
            >
              Next
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
