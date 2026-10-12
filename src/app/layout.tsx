import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { profile } from "@/lib/cv-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
  keywords: [
    "Full Stack Developer",
    "Front-End Developer",
    "London",
    "JavaScript",
    "Python",
    "SEO",
    "Networking",
    "Cybersecurity",
    profile.name,
  ],
  authors: [{ name: profile.name, url: profile.linkedin }],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    type: "website",
    images: [{ url: "/images/cyber/secure-web.svg", width: 1600, height: 900 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Loaded at runtime so an offline build never fails; system fonts are the fallback. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
