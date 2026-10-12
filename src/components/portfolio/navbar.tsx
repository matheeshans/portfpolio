"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Download, Menu, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#showcase", label: "Showcase" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400"
        style={{ scaleX: progress, opacity: visible ? 1 : 0 }}
      />

      <motion.header
        initial={false}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
        className="no-print fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav className="glass flex w-full max-w-6xl items-center justify-end gap-4 rounded-2xl px-4 py-2.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
          <ul className="portfolio-nav-links hidden items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-lg px-3 py-1.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="portfolio-nav-actions hidden items-center gap-2">
            <Link
              href="/cv"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-white"
            >
              <Download className="h-4 w-4" /> CV
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 px-3.5 py-1.5 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.35)] transition hover:brightness-110"
            >
              <Send className="h-4 w-4" /> Hire me
            </a>
          </div>

          <button
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="portfolio-mobile-navigation"
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="portfolio-nav-toggle grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-200"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && visible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id="portfolio-mobile-navigation"
            className="portfolio-nav-mobile no-print fixed inset-x-4 top-20 z-40 max-h-[calc(100svh-6rem)] overflow-y-auto"
          >
            <div className="glass rounded-2xl p-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5",
                  )}
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                <Link
                  href="/cv"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-slate-200"
                >
                  <Download className="h-4 w-4" /> CV
                </Link>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-3 py-2.5 text-sm font-semibold text-slate-950"
                >
                  <Send className="h-4 w-4" /> Hire me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
