"use client";

import Link from "next/link";
import {
  BadgeCheck,
  Clock,
  ExternalLink,
  Languages,
  MapPin,
  Send,
} from "lucide-react";
import { focusAreas, profile, stats } from "@/lib/cv-data";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import { TiltCard } from "./tilt-card";
import { SkillIconGlyph } from "./skill-icon";
import { LinkedInIcon } from "./linkedin-icon";
import { SectionBackdrop } from "./section-backdrop";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative isolate scroll-mt-28 py-24 md:py-32"
    >
      <SectionBackdrop
        src="/images/cyber/secure-web.svg"
        objectPosition="center"
        strength={0.3}
      />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        {/* Intro */}
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
            About me
          </p>
          <h2 className="font-display mt-5 text-3xl font-bold leading-[1.05] text-white sm:text-4xl md:text-5xl">
            A full stack developer with a{" "}
            <span className="text-gradient">network engineer&apos;s</span>{" "}
            discipline.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-300 md:text-lg">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-slate-200">
              <MapPin className="h-4 w-4 text-cyan-300" />
              {profile.location}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:brightness-110"
            >
              <Send className="h-4 w-4" /> Let&apos;s work together
            </a>
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40"
            >
              View full CV
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40"
            >
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>
          </div>
        </Reveal>

        {/* Stats + quick facts */}
        <div className="space-y-5">
          <Stagger className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="glass glow-border rounded-2xl p-5">
                  <p className="font-display text-3xl font-bold text-white md:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                    {s.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15}>
            <div className="glass rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Quick facts
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{profile.workAuthorization}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                  <span>Availability: {profile.availability}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Languages className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                  <span>
                    {profile.languages
                      .map((l) => `${l.name} (${l.level})`)
                      .join(" · ")}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                  <span>Preferred roles: {profile.preferredRoles.join(" · ")}</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Focus areas */}
      <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {focusAreas.map((f) => (
          <StaggerItem key={f.title} className="h-full">
            <TiltCard className="p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-200 ring-1 ring-white/10">
                <SkillIconGlyph name={f.icon} className="h-5 w-5" />
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
                {f.description}
              </p>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
      </div>
    </section>
  );
}
