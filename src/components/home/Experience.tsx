"use client";

import { useMemo, useState } from "react";
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
          {visibleItems.map((item) => (
            <article key={item.role} className={styles.timelineItem}>
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
          ))}
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
