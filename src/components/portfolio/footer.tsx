"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { profile } from "@/lib/cv-data";
import { LinkedInIcon } from "./linkedin-icon";

export function Footer() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/views", { method: "POST", signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((json: { count?: number } | null) => {
        if (json && typeof json.count === "number") setViews(json.count);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-8">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-bold text-white">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {profile.title} · {profile.shortLocation}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <Link
            href="/cv"
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
          >
            Printable CV
          </Link>
        </div>

        <div className="flex flex-col items-center gap-2 text-xs text-slate-500 md:items-end">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
            <Eye className="h-3.5 w-3.5 text-cyan-300" />
            {views === null ? "—" : views.toLocaleString()} portfolio visits
          </span>
          <span>
            © {new Date().getFullYear()} · Next.js · Three.js · Framer Motion ·
            PostgreSQL
          </span>
        </div>
      </div>
    </footer>
  );
}
