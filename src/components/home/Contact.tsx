"use client";

import { FormEvent, useState } from "react";
import styles from "./Home.module.scss";

type ContactProps = {
  content: {
    eyebrow: string;
    title: string;
    summary: string;
  };
};

const contactLinks = [
  {
    label: "Email",
    href: "mailto:akbardanu631@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rizal-danuarta-akbar-a52713376",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M6.5 10v8" />
        <path d="M6.5 6v.2" />
        <path d="M11 18v-8" />
        <path d="M11 13.5c0-2 1.2-3.5 3.2-3.5 2.1 0 3.3 1.4 3.3 3.8V18" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/rdanuartaa",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.5 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/rdanuakbr",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.6" />
        <path d="M17 7.2h.1" />
      </svg>
    ),
  },
  {
    label: "Shopee",
    href: "https://shopee.co.id/nusticky",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M6.5 8.5h13l-1.1 11H5.4l-1.1-11h2.2z" />
        <path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" />
        <path
          d="M9.5 14.8c.8.8 2.8 1.1 4.1.5 1.6-.7 1.4-2.8-.2-3.1l-1.9-.4c-1.6-.4-1.8-2.3-.2-3 .9-.4 2.4-.2 3.2.5"
          transform="translate(12 15.4) scale(.78) translate(-12 -14.1)"
        />
      </svg>
    ),
  },
];

export default function Contact({ content }: ContactProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text =
      message.trim() ||
      "Halo Rizal, saya ingin berdiskusi tentang project website.";
    const whatsappUrl = `https://wa.me/6285203794980?text=${encodeURIComponent(
      text,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className={`${styles.section} ${styles.contact}`}>
      <div className={styles.contactGrid}>
        <div className={styles.contactIntro}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2>{content.title}</h2>
        </div>

        <form className={styles.contactPanel} onSubmit={handleSubmit}>
          <p>{content.summary}</p>
          <label className={styles.contactField}>
            <span>Pesan</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Tulis pesan singkat untuk WhatsApp..."
              rows={6}
            />
          </label>
          <button type="submit" className={styles.contactSubmit}>
            Kirim ke WhatsApp
          </button>
        </form>

        <div className={styles.contactIconLinks}>
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              title={link.label}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
