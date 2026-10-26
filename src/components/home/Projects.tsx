import Image, { type ImageLoader } from "next/image";
import styles from "./Home.module.scss";
import type { MouseEvent } from "react";

type ProjectsProps = {
  isActive: boolean;
  content: {
    eyebrow: string;
    title: string;
    summary: string;
    linkLabel: string;
    demoLabel?: string;
    repositoryLabel?: string;
    items: readonly {
      title: string;
      description: string;
      href?: string;
      image?: string;
      demoHref?: string;
      repositoryHref?: string;
      details?: {
        role: string;
        challenge: string;
        solution: string;
        outcome: string;
      };
    }[];
  };
};

const projectDetailLabels = ["Role", "Challenge", "Solution", "Outcome"] as const;
const passthroughImageLoader: ImageLoader = ({ src }) => src;

function ProjectDetails({
  details,
  isDuplicate,
}: {
  details: NonNullable<ProjectsProps["content"]["items"][number]["details"]>;
  isDuplicate: boolean;
}) {
  const values = [
    details.role,
    details.challenge,
    details.solution,
    details.outcome,
  ];

  return (
    <dl className={styles.projectDetails}>
      {projectDetailLabels.map((label, index) => (
        <div
          key={label}
          className={styles.projectDetailRow}
          data-label={isDuplicate ? label : undefined}
          data-value={isDuplicate ? values[index] : undefined}
        >
          <dt>{isDuplicate ? null : label}</dt>
          <dd>{isDuplicate ? null : values[index]}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Projects({ content, isActive }: ProjectsProps) {
  const projectLoop = [0, 1, 2].flatMap((loopIndex) =>
    content.items.map((project, itemIndex) => ({
      project,
      itemIndex,
      loopIndex,
    })),
  );
  const handleProjectLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) {
      return;
    }

    const target = document.querySelector(href);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="projects"
      className={`${styles.section} ${styles.projects}`}
      data-marquee-active={isActive ? "true" : undefined}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h2>{content.title}</h2>
          </div>
          <p>{content.summary}</p>
        </div>

        <div className={styles.projectGrid}>
          <div className={styles.projectTrack}>
            {projectLoop.map(({ project, itemIndex, loopIndex }) => {
              const isDuplicate = loopIndex !== 1;
              const projectHref = project.href ?? "#contact";
              const projectLinks = [
                { label: content.linkLabel, href: projectHref },
                project.demoHref
                  ? {
                      label: content.demoLabel ?? "Live demo",
                      href: project.demoHref,
                    }
                  : null,
                project.repositoryHref
                  ? {
                      label: content.repositoryLabel ?? "Repository",
                      href: project.repositoryHref,
                    }
                  : null,
              ].filter((link): link is { label: string; href: string } =>
                Boolean(link),
              );
              return (
                <article
                  key={`${project.title}-${loopIndex}-${itemIndex}`}
                  className={styles.projectCard}
                  aria-hidden={isDuplicate || undefined}
                  aria-label={
                    isDuplicate
                      ? undefined
                      : `${project.title}: ${project.description}`
                  }
                  tabIndex={isDuplicate ? -1 : 0}
                  data-nosnippet={isDuplicate ? "" : undefined}
                >
                  <div className={styles.projectCardInner}>
                    <div className={`${styles.projectFace} ${styles.projectFront}`}>
                      <div
                        className={styles.projectPreview}
                        aria-hidden
                        data-has-image={project.image ? "true" : undefined}
                      >
                        {project.image ? (
                          <Image
                            loader={passthroughImageLoader}
                            unoptimized
                            className={styles.projectImage}
                            src={project.image}
                            alt={
                              isDuplicate
                                ? ""
                                : `${project.title} project screenshot`
                            }
                            fill
                            sizes="(max-width: 580px) 68vw, (max-width: 880px) 50vw, 324px"
                          />
                        ) : (
                          <span />
                        )}
                      </div>
                      <h3
                        title={isDuplicate ? undefined : project.title}
                        data-visual-text={isDuplicate ? project.title : undefined}
                      >
                        {isDuplicate ? null : project.title}
                      </h3>
                    </div>
                    <div className={`${styles.projectFace} ${styles.projectBack}`}>
                      {project.details ? (
                        <ProjectDetails
                          details={project.details}
                          isDuplicate={isDuplicate}
                        />
                      ) : (
                        <p
                          data-visual-text={
                            isDuplicate ? project.description : undefined
                          }
                        >
                          {isDuplicate ? null : project.description}
                        </p>
                      )}
                      <div className={styles.projectLinks}>
                        {projectLinks.map((link) => {
                          const isExternalLink = link.href.startsWith("http");

                          return (
                            <a
                              key={`${link.label}-${link.href}`}
                              href={link.href}
                              target={isExternalLink ? "_blank" : undefined}
                              rel={
                                isExternalLink
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              tabIndex={isDuplicate ? -1 : undefined}
                              data-visual-text={
                                isDuplicate ? link.label : undefined
                              }
                              onClick={(event) =>
                                handleProjectLinkClick(event, link.href)
                              }
                            >
                              {isDuplicate ? null : link.label}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
