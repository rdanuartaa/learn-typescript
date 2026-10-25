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
  title: "Rizal Danuarta Akbar | Full-Stack Developer",
  description:
    "Full-stack developer building production-ready web applications with Next.js, React, TypeScript, Laravel, MySQL, and Docker.",
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
