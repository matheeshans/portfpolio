"use client";

import { Sparkles } from "lucide-react";
import { skillCloud, skillGroups } from "@/lib/cv-data";
import { SectionBackdrop } from "./section-backdrop";
import { SectionHeading } from "./section-heading";
import { Reveal, Stagger, StaggerItem } from "./reveal";
import { TiltCard } from "./tilt-card";
import { SkillIconGlyph } from "./skill-icon";

const SKILL_EMOJIS = [
  "🌐", "🎨", "⚡", "🧩", "🐍", "➕", "🧠", "🗂️", "🏗️", "📱",
  "🚀", "🔎", "📣", "📊", "✨", "📈", "🧪", "🤖", "💬", "🌐",
  "🛡️", "🧭", "🔐", "🐧", "🪟", "🚨", "🏃", "🗃️", "🪲", "🔀",
  "📡", "📣", "📬", "📣", "📨",
] as const;

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative isolate scroll-mt-28 py-24 md:py-32"
    >
      <SectionBackdrop src="/images/cyber/network.svg" objectPosition="center" />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Core skills"
          title="A web-first toolkit — from pixels to packets."
          description="Development, UX, SEO and analytics on the front; networking, security and support underneath. Drag your cursor across the constellation to explore."
        />

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* Emoji skill constellation */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#10182a] via-[#101020] to-[#191027] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.45)] sm:p-6 lg:p-7">
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(34,211,238,0.16),transparent_35%),radial-gradient(circle_at_95%_100%,rgba(217,70,239,0.14),transparent_35%)]" />
              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold text-white sm:text-xl">
                    Modern technologies
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    A little snapshot of what I work with
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl">
                  ✨
                </span>
              </div>

              <div className="relative mt-5 grid grid-cols-5 gap-2 sm:grid-cols-6 sm:gap-2.5">
                {skillCloud.map((skill, index) => (
                  <div
                    key={skill}
                    className="group flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-2xl border border-white/[0.09] bg-white/[0.045] px-1 py-1.5 text-center transition duration-200 hover:-translate-y-1 hover:border-cyan-200/40 hover:bg-white/[0.09] sm:min-h-[62px] sm:gap-1.5"
                  >
                    <span
                      aria-hidden="true"
                      className="text-xl leading-none transition-transform duration-200 group-hover:scale-125 sm:text-2xl"
                    >
                      {SKILL_EMOJIS[index] ?? "💡"}
                    </span>
                    <span className="max-w-full text-[8px] leading-tight text-slate-300 sm:text-[9px]">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

              <div className="relative mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="inline-flex items-center gap-2 text-xs text-slate-400">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                  {skillCloud.length} skills across my toolkit
                </span>
                <span aria-hidden="true" className="text-sm text-violet-200">
                  🪄
                </span>
              </div>
            </div>
          </Reveal>

          {/* Skill groups */}
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {skillGroups.map((group, i) => (
              <StaggerItem
                key={group.id}
                className={i === 0 ? "sm:col-span-2" : ""}
              >
                <TiltCard className="p-6" intensity={6} glow={group.glow}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${group.gradient} text-slate-950 shadow-lg`}
                    >
                      <SkillIconGlyph name={group.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-200 transition hover:border-white/30 hover:bg-white/10"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
