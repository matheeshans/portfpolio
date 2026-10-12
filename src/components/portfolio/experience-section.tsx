"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { experience } from "@/lib/cv-data";
import { SectionBackdrop } from "./section-backdrop";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { TiltCard } from "./tilt-card";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative isolate scroll-mt-28 py-24 md:py-32"
    >
      <SectionBackdrop
        src="/images/cyber/soc.svg"
        objectPosition="center top"
        strength={0.3}
      />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Where the discipline comes from."
          description="From 24/7 network operations to hands-on IT support — a track record of structured troubleshooting, reliability and clear communication."
        />

        <div className="relative">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-300/60 via-violet-400/40 to-transparent md:left-1/2"
          />

          <ol className="space-y-12 md:space-y-20">
            {experience.map((job, i) => {
              const left = i % 2 === 0;
              return (
                <li key={job.id} className="relative md:grid md:grid-cols-2 md:gap-16">
                  {/* Node */}
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2"
                  >
                    <span className="relative grid h-5 w-5 place-items-center">
                      <span
                        className="absolute inset-0 rounded-full animate-pulse-ring"
                        style={{ background: job.accent, opacity: 0.6 }}
                      />
                      <span
                        className="relative h-3 w-3 rounded-full ring-4 ring-[#05070d]"
                        style={{
                          background: job.accent,
                          boxShadow: `0 0 18px ${job.accent}`,
                        }}
                      />
                    </span>
                  </motion.span>

                  {/* Period marker (desktop) */}
                  <div
                    className={`hidden md:flex md:items-start md:pt-4 ${
                      left ? "md:order-2 md:justify-start" : "md:order-1 md:justify-end"
                    }`}
                  >
                    <Reveal delay={0.1}>
                      <p
                        className="font-display text-5xl font-bold leading-none text-white/10 lg:text-6xl"
                        aria-hidden
                      >
                        {job.start.slice(0, 4)}
                      </p>
                      <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-400">
                        <Calendar className="h-4 w-4" />
                        {job.period}
                      </p>
                    </Reveal>
                  </div>

                  {/* Card */}
                  <div className={`pl-12 md:pl-0 ${left ? "md:order-1" : "md:order-2"}`}>
                    <Reveal>
                      <TiltCard className="p-6 md:p-7" intensity={5} glow={`${job.accent}55`}>
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className="grid h-10 w-10 place-items-center rounded-xl ring-1 ring-white/10"
                            style={{ background: `${job.accent}22`, color: job.accent }}
                          >
                            <Briefcase className="h-5 w-5" />
                          </span>
                          <div>
                            <h3 className="font-display text-xl font-semibold text-white">
                              {job.role}
                            </h3>
                            <p className="text-sm text-slate-300">{job.company}</p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 text-xs">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300 md:hidden">
                            <Calendar className="h-3.5 w-3.5" />
                            {job.period}
                          </span>
                          <span
                            className="rounded-full px-2.5 py-1 font-medium"
                            style={{ background: `${job.accent}1f`, color: job.accent }}
                          >
                            {job.type}
                          </span>
                          {job.location && (
                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300">
                              {job.location}
                            </span>
                          )}
                        </div>

                        <ul className="mt-5 space-y-2.5">
                          {job.highlights.map((h) => (
                            <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-slate-300/90">
                              <ChevronRight
                                className="mt-1 h-3.5 w-3.5 shrink-0"
                                style={{ color: job.accent }}
                              />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 border-t border-white/10 pt-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Skills applied
                          </p>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <li
                                key={skill}
                                className="rounded-full border px-2.5 py-1 text-xs transition hover:bg-white/10"
                                style={{
                                  borderColor: `${job.accent}33`,
                                  background: `${job.accent}12`,
                                  color: "#e2e8f0",
                                }}
                              >
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TiltCard>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
