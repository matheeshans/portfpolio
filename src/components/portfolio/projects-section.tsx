"use client";

import {
  Boxes,
  CircleHelp,
  CookingPot,
  Network,
  ParkingSquare,
} from "lucide-react";
import { projects } from "@/lib/cv-data";
import { SectionBackdrop } from "./section-backdrop";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";
import { TiltCard } from "./tilt-card";

const projectIcons = [
  ParkingSquare,
  CookingPot,
  Boxes,
  CircleHelp,
  Network,
];

const accents = [
  "from-cyan-300 to-sky-500",
  "from-amber-300 to-orange-500",
  "from-violet-300 to-fuchsia-500",
  "from-emerald-300 to-teal-500",
  "from-rose-300 to-pink-500",
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative isolate scroll-mt-28 py-24 md:py-32"
    >
      <SectionBackdrop
        src="/images/cyber/data-ai.svg"
        objectPosition="center"
        strength={0.3}
      />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Systems built around real operational needs."
          description="A selection of projects across IoT, business operations, IT support and networking. Each one focuses on making everyday information and workflows easier to manage."
        />

        <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = projectIcons[index % projectIcons.length];
            const accent = accents[index % accents.length];

            return (
              <StaggerItem key={project.id} className="h-full">
                <TiltCard
                  className="group relative flex h-full flex-col overflow-hidden p-6 md:p-7"
                  intensity={5}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${accent} opacity-[0.08] blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${accent} text-slate-950 shadow-lg shadow-black/20`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                      {project.category}
                    </span>
                  </div>

                  <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Project {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display relative mt-2 text-xl font-semibold leading-snug text-white md:text-2xl">
                    {project.name}
                  </h3>

                  <p className="relative mt-4 flex-1 text-sm leading-relaxed text-slate-300/90">
                    {project.summary}
                  </p>

                  <div className="relative mt-6 border-t border-white/10 pt-5">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Focus areas
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {project.focus.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] text-slate-200 transition-colors group-hover:border-white/20"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
