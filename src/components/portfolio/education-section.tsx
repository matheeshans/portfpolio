"use client";

import { GraduationCap, Calendar } from "lucide-react";
import { education } from "@/lib/cv-data";
import { SectionBackdrop } from "./section-backdrop";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";
import { TiltCard } from "./tilt-card";

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative isolate scroll-mt-28 py-24 md:py-32"
    >
      <SectionBackdrop
        src="/images/cyber/data-ai.svg"
        objectPosition="center"
        strength={0.3}
      />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Education"
          title="Computer science, built on network engineering."
          description="A BSc (Hons) in Computer Science on top of a Level 5 HND in Network Engineering — theory and infrastructure in equal measure."
        />

        <Stagger className="grid gap-6 md:grid-cols-2">
          {education.map((item, i) => (
            <StaggerItem key={item.id} className="h-full">
              <TiltCard
                className="p-7 md:p-8"
                intensity={6}
                glow={i === 0 ? "rgba(103,232,249,0.35)" : "rgba(167,139,250,0.35)"}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${
                      i === 0
                        ? "from-cyan-400 to-sky-500"
                        : "from-violet-400 to-fuchsia-500"
                    } text-slate-950 shadow-lg`}
                  >
                    <GraduationCap className="h-6 w-6" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.period}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-xl font-semibold leading-snug text-white md:text-2xl">
                  {item.degree}
                </h3>
                <p className="mt-2 text-sm font-medium text-cyan-200">
                  {item.institution}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300/90">
                  {item.detail}
                </p>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Skills covered
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <li
                      key={skill}
                      className={`rounded-full border border-white/10 bg-gradient-to-r ${
                        i === 0
                          ? "from-cyan-400/10 to-sky-500/10"
                          : "from-violet-400/10 to-fuchsia-500/10"
                      } px-3 py-1 text-xs text-slate-200 transition hover:border-white/30 hover:bg-white/10`}
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
    </section>
  );
}
