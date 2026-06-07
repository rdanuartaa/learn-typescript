import styles from "./Home.module.scss";
import type { CSSProperties } from "react";

type ToolLogoStyle = CSSProperties & {
  "--tool-logo"?: string;
};

const languageLogos = [
  { name: "TypeScript", src: "/image/tools/language/typescript-svgrepo-com.svg" },
  { name: "JavaScript", src: "/image/tools/language/javascript-svgrepo-com.svg" },
  { name: "Python", src: "/image/tools/language/python-svgrepo-com.svg" },
  { name: "Dart", src: "/image/tools/language/dart-svgrepo-com.svg" },
  { name: "PHP", src: "/image/tools/language/php2-svgrepo-com.svg" },
  { name: "Laravel", src: "/image/tools/language/laravel-svgrepo-com.svg" },
  { name: "React", src: "/image/tools/language/react-svgrepo-com.svg" },
  { name: "Next.js", src: "/image/tools/language/nextjs-icon-svgrepo-com.svg" },
  { name: "Flutter", src: "/image/tools/language/flutter-svgrepo-com.svg" },
  { name: "MySQL", src: "/image/tools/language/mysql-logo-svgrepo-com.svg" },
  { name: "SCSS", src: "/image/tools/language/scss2-svgrepo-com.svg" },
];

const appLogos = [
  { name: "Figma", src: "/image/tools/apps/figma-seeklogo.svg" },
  { name: "Canva", src: "/image/tools/apps/canva-seeklogo.svg" },
  { name: "CorelDRAW", src: "/image/tools/apps/coreldraw-x7-vector-logo-fix.svg" },
  { name: "VS Code", src: "/image/tools/apps/vs-code-svgrepo-com.svg" },
  { name: "Git", src: "/image/tools/apps/git-svgrepo-com.svg" },
  { name: "GitHub", src: "/image/tools/apps/github-142-svgrepo-com.svg" },
  { name: "Docker", src: "/image/tools/apps/docker-svgrepo-com.svg" },
  { name: "Linux", src: "/image/tools/apps/linux-svgrepo-com.svg" },
  { name: "Nginx", src: "/image/tools/apps/nginx-svgrepo-com.svg" },
  { name: "Cloudflare", src: "/image/tools/apps/cloudflare-svgrepo-com.svg" },
  { name: "Vercel", src: "/image/tools/apps/vercel-svgrepo-com.svg" },
  { name: "Postman", src: "/image/tools/apps/postman-icon-svgrepo-com.svg" },
  { name: "Grafana", src: "/image/tools/apps/grafana-svgrepo-com.svg" },
  { name: "Prometheus", src: "/image/tools/apps/prometheus-svgrepo-com.svg" },
  { name: "Arduino", src: "/image/tools/apps/arduino-svgrepo-com.svg" },
];

const repeatLogos = <T,>(items: readonly T[]) => [...items, ...items, ...items];

type ToolsProps = {
  isActive: boolean;
  content: {
    eyebrow: string;
    title: string;
    summary: string;
    laneTitles?: {
      primary: string;
      secondary: string;
    };
    groups: readonly { title: string; items: readonly string[] }[];
  };
};

export default function Tools({ content, isActive }: ToolsProps) {
  const languageGroup = content.groups[0];
  const frameworkGroup = content.groups[1];
  const appGroup = content.groups[2];
  const logoLoop = repeatLogos(languageLogos);
  const appLogoLoop = repeatLogos(appLogos);
  const primaryLaneTitle =
    content.laneTitles?.primary ??
    `${languageGroup?.title ?? ""} & ${frameworkGroup?.title ?? ""}`.trim();
  const secondaryLaneTitle =
    content.laneTitles?.secondary ?? `${appGroup?.title ?? ""} & Tools`.trim();

  return (
    <section
      id="tools"
      className={`${styles.section} ${styles.tools}`}
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

        <div className={styles.toolMarquees}>
          <div className={styles.toolLane}>
            <div className={styles.toolLaneHeader}>
              <span>01</span>
              <h3>{primaryLaneTitle}</h3>
            </div>
            <div className={styles.toolMarquee}>
              <div className={styles.toolTrack}>
                {logoLoop.map((logo, index) => {
                  const logoStyle: ToolLogoStyle = {
                    "--tool-logo": `url(${logo.src})`,
                  };

                  return (
                    <span
                      key={`${logo.name}-${index}`}
                      className={styles.toolLogoItem}
                      style={logoStyle}
                      role="img"
                      aria-label={logo.name}
                      title={logo.name}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.toolLane}>
            <div className={styles.toolLaneHeader}>
              <span>02</span>
              <h3>{secondaryLaneTitle}</h3>
            </div>
            <div className={styles.toolMarquee}>
              <div className={`${styles.toolTrack} ${styles.toolTrackReverse}`}>
                {appLogoLoop.map((logo, index) => {
                  const logoStyle: ToolLogoStyle = {
                    "--tool-logo": `url(${logo.src})`,
                  };

                  return (
                    <span
                      key={`${logo.name}-${index}`}
                      className={styles.toolLogoItem}
                      style={logoStyle}
                      role="img"
                      aria-label={logo.name}
                      title={logo.name}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
