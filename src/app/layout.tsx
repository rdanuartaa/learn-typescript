import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { TranslationPatch } from "@/components/common/TranslationPatch/TranslationPatch";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher/LanguageSwitcher";

const geistHeading = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const interBody = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rizaldanuartaakbar.me"),
  title: "Rizal Danuarta Akbar | Full-Stack & Software Engineer",
  description:
    "Full-stack developer building practical business web and mobile applications with Next.js, React, TypeScript, Laravel, Flutter, and PostgreSQL.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Rizal Danuarta Akbar | Full-Stack & Software Engineer",
    description:
      "Practical business web and mobile applications built with Next.js, Laravel, Flutter, and PostgreSQL.",
    siteName: "Rizal Danuarta Akbar Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistHeading.variable} ${interBody.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TranslationPatch />
        {children}
        <LanguageSwitcher />
      </body>
    </html>
  );
}
