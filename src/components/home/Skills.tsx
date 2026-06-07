import styles from "./Home.module.scss";

type SkillsProps = {
  isActive: boolean;
  content: {
    eyebrow: string;
    title: string;
    hardTitle: string;
    softTitle: string;
    hard: readonly { title: string; description: string }[];
    soft: readonly { title: string; description: string }[];
  };
};

function HardSkillIllustration({ variant }: { variant: number }) {
  if (variant === 1) {
    return (
      <svg className={styles.pillarVisual} viewBox="0 0 240 220" aria-hidden>
        <g className={styles.visualFloat}>
          <path d="M34 156h142" />
          <path d="M50 136l36-36 34 24 58-70" />
          <path d="M148 54h30v30" />
        </g>
        <g className={styles.visualCore}>
          <circle cx="70" cy="150" r="16" />
          <circle cx="120" cy="124" r="16" />
          <circle cx="178" cy="72" r="16" />
        </g>
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg className={styles.pillarVisual} viewBox="0 0 240 220" aria-hidden>
        <g className={styles.visualFloat}>
          <path d="M78 78L38 114l40 36" />
          <path d="M162 78l40 36-40 36" />
          <path d="M134 54l-36 112" />
        </g>
        <g className={styles.visualCore}>
          <rect x="74" y="58" width="92" height="112" rx="18" />
          <path d="M96 88h48M96 114h34M96 140h58" />
        </g>
      </svg>
    );
  }

  if (variant === 3) {
    return (
      <svg className={styles.pillarVisual} viewBox="0 0 240 220" aria-hidden>
        <g className={styles.visualFloat}>
          <rect x="54" y="48" width="132" height="150" rx="24" />
          <path d="M82 86h74M82 118h108M82 150h52" />
        </g>
        <g className={styles.visualCore}>
          <circle cx="164" cy="154" r="32" />
          <path d="M150 154l12 12 24-30" />
        </g>
      </svg>
    );
  }

  if (variant === 4) {
    return (
      <svg className={styles.pillarVisual} viewBox="0 0 240 220" aria-hidden>
        <g className={styles.visualFloat}>
          <path d="M72 74h86v52H72z" />
          <path d="M116 126v34M82 160h74" />
          <path d="M58 160h34v34H58zM104 160h34v34h-34zM150 160h34v34h-34z" />
        </g>
        <g className={styles.visualCore}>
          <circle cx="72" cy="74" r="14" />
          <circle cx="158" cy="74" r="14" />
          <circle cx="116" cy="126" r="14" />
        </g>
      </svg>
    );
  }

  return (
    <svg className={styles.pillarVisual} viewBox="0 0 240 220" aria-hidden>
      <g className={styles.visualFloat}>
        <path d="M64 94c8-26 32-42 60-34 12-22 46-20 58 2 22 2 38 18 38 40 0 24-18 42-46 42H82c-26 0-44-16-44-38 0-20 12-34 26-42" />
        <path d="M130 150V92" />
        <path d="M108 114l22-22 22 22" />
      </g>
      <g className={styles.visualCore}>
        <rect x="58" y="164" width="124" height="26" rx="8" />
        <path d="M76 177h54M156 177h8" />
        <path d="M196 164h18M196 190h18M214 164v26" />
      </g>
    </svg>
  );
}

function SoftSkillIllustration({ variant }: { variant: number }) {
  if (variant === 1) {
    return (
      <svg className={styles.pillarVisual} viewBox="0 0 240 220" aria-hidden>
        <g className={styles.visualFloat}>
          <path d="M72 96a48 48 0 1 1 86 30" />
          <path d="M110 150h48" />
          <path d="M118 174h32" />
        </g>
        <g className={styles.visualCore}>
          <path d="M104 104l18 18 36-42" />
          <circle cx="120" cy="96" r="64" />
        </g>
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg className={styles.pillarVisual} viewBox="0 0 240 220" aria-hidden>
        <g className={styles.visualFloat}>
          <path d="M120 42v24M72 62l18 18M168 62l-18 18M58 114h26M156 114h26" />
          <path d="M88 138h64" />
        </g>
        <g className={styles.visualCore}>
          <path d="M88 110a32 32 0 1 1 64 0c0 18-16 24-16 42h-32c0-18-16-24-16-42z" />
          <path d="M104 170h32" />
        </g>
      </svg>
    );
  }

  if (variant === 3) {
    return (
      <svg className={styles.pillarVisual} viewBox="0 0 240 220" aria-hidden>
        <g className={styles.visualFloat}>
          <path d="M54 70h118a22 22 0 0 1 22 22v34a22 22 0 0 1-22 22h-46l-38 30v-30H54a22 22 0 0 1-22-22V92a22 22 0 0 1 22-22z" />
        </g>
        <g className={styles.visualCore}>
          <path d="M76 104h74M76 128h46" />
          <circle cx="168" cy="128" r="8" />
        </g>
      </svg>
    );
  }

  if (variant === 4) {
    return (
      <svg className={styles.pillarVisual} viewBox="0 0 240 220" aria-hidden>
        <g className={styles.visualFloat}>
          <path d="M120 42l64 34-64 34-64-34 64-34z" />
          <path d="M74 106v42c0 18 92 18 92 0v-42" />
        </g>
        <g className={styles.visualCore}>
          <path d="M120 110v68" />
          <path d="M96 154l24 24 24-24" />
        </g>
      </svg>
    );
  }

  if (variant === 5) {
    return (
      <svg className={styles.pillarVisual} viewBox="0 0 240 220" aria-hidden>
        <g className={styles.visualFloat}>
          <circle cx="84" cy="88" r="24" />
          <circle cx="156" cy="88" r="24" />
          <circle cx="120" cy="142" r="24" />
        </g>
        <g className={styles.visualCore}>
          <path d="M64 170c10-28 34-42 56-28 22-14 46 0 56 28" />
          <path d="M96 110l24 32 24-32" />
        </g>
      </svg>
    );
  }

  if (variant === 6) {
    return (
      <svg className={styles.pillarVisual} viewBox="0 0 240 220" aria-hidden>
        <g className={styles.visualFloat}>
          <path d="M72 84h92a34 34 0 0 1 0 68H90" />
          <path d="M98 58L72 84l26 26" />
        </g>
        <g className={styles.visualCore}>
          <path d="M168 136l26 26-26 26" />
          <path d="M76 162h118" />
        </g>
      </svg>
    );
  }

  return (
    <svg className={styles.pillarVisual} viewBox="0 0 240 220" aria-hidden>
      <g className={styles.visualFloat}>
        <path d="M68 64h72a34 34 0 0 1 0 68H68z" />
        <path d="M92 92h56M92 116h34" />
      </g>
      <g className={styles.visualCore}>
        <path d="M86 154h92" />
        <path d="M150 126l28 28-28 28" />
        <circle cx="68" cy="154" r="14" />
      </g>
    </svg>
  );
}

export default function Skills({ content, isActive }: SkillsProps) {
  const hardSkillLoop = [...content.hard, ...content.hard, ...content.hard];
  const reversedSoftSkills = content.soft
    .map((skill, index) => ({ ...skill, number: index + 1 }))
    .toReversed();
  const softSkillLoop = [
    ...reversedSoftSkills,
    ...reversedSoftSkills,
    ...reversedSoftSkills,
  ];

  return (
    <section
      id="skills"
      className={`${styles.section} ${styles.sectionDark} ${styles.skills}`}
      data-marquee-active={isActive ? "true" : undefined}
    >
      <div className={styles.container}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h2>{content.title}</h2>

        <div className={styles.skillGroups}>
          <div className={styles.skillGroup}>
            <div className={styles.skillGroupHeader}>
              <span>01</span>
              <h3>{content.hardTitle}</h3>
            </div>
            <div className={styles.pillarGrid}>
              <div className={styles.pillarTrack}>
                {hardSkillLoop.map((skill, index) => {
                  const skillNumber = (index % content.hard.length) + 1;
                  const isDuplicate = index >= content.hard.length;

                  return (
                    <article
                      key={`${skill.title}-${index}`}
                      className={styles.pillarCard}
                      tabIndex={isDuplicate ? -1 : 0}
                      aria-hidden={isDuplicate}
                      aria-label={`${skill.title}: ${skill.description}`}
                    >
                      <div className={styles.pillarCardInner}>
                        <div
                          className={`${styles.pillarFace} ${styles.pillarFront}`}
                        >
                          <HardSkillIllustration variant={skillNumber} />
                          <span>{String(skillNumber).padStart(2, "0")}</span>
                          <h4>{skill.title}</h4>
                        </div>
                        <div
                          className={`${styles.pillarFace} ${styles.pillarBack}`}
                        >
                          <HardSkillIllustration variant={skillNumber} />
                          <span>{String(skillNumber).padStart(2, "0")}</span>
                          <p>{skill.description}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.skillGroup}>
            <div className={styles.skillGroupHeader}>
              <span>02</span>
              <h3>{content.softTitle}</h3>
            </div>
            <div className={`${styles.pillarGrid} ${styles.softSkillSlider}`}>
              <div className={`${styles.pillarTrack} ${styles.softSkillTrack}`}>
                {softSkillLoop.map((skill, index) => {
                  const isDuplicate = index >= reversedSoftSkills.length;

                  return (
                    <article
                      key={`${skill.title}-${index}`}
                      className={styles.pillarCard}
                      tabIndex={isDuplicate ? -1 : 0}
                      aria-hidden={isDuplicate}
                      aria-label={`${skill.title}: ${skill.description}`}
                    >
                      <div className={styles.pillarCardInner}>
                        <div
                          className={`${styles.pillarFace} ${styles.pillarFront}`}
                        >
                          <SoftSkillIllustration variant={skill.number} />
                          <span>{String(skill.number).padStart(2, "0")}</span>
                          <h4>{skill.title}</h4>
                        </div>
                        <div
                          className={`${styles.pillarFace} ${styles.pillarBack}`}
                        >
                          <SoftSkillIllustration variant={skill.number} />
                          <span>{String(skill.number).padStart(2, "0")}</span>
                          <p>{skill.description}</p>
                        </div>
                      </div>
                    </article>
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
