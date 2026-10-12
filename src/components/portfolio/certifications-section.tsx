"use client";

import { motion } from "framer-motion";
import { Award, CircleCheck } from "lucide-react";
import { certificationGroups, totalLearningItems } from "@/lib/cv-data";
import { SectionBackdrop } from "./section-backdrop";
import { SectionHeading } from "./section-heading";
import { Stagger, StaggerItem } from "./reveal";
import { TiltCard } from "./tilt-card";

const providers = [
  "freeCodeCamp",
  "HP LIFE",
  "Claude",
  "HubSpot Academy",
  "Cisco Networking Academy",
  "IBM Cognitive Class",
  "Google Skillshop",
  "Semrush Academy",
  "Udemy",
  "Pearson BTEC",
  "University of Hertfordshire",
];

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative isolate scroll-mt-28 py-24 md:py-32"
    >
      <SectionBackdrop
        src="/images/cyber/ethical-hacking.svg"
        objectPosition="center"
        strength={0.3}
      />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Certificates & courses"
          title={`${totalLearningItems}+ learning credentials across web, programming, AI, data and networking.`}
          description="Formal certificates and professional-development courses, grouped by provider so you can quickly find the learning most relevant to you."
        />

      </div>

      {/* Marquee */}
      <div className="relative mb-14 overflow-hidden border-y border-white/5 py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {[...providers, ...providers].map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="font-display inline-flex items-center gap-3 text-lg font-semibold text-slate-400"
            >
              <Award className="h-5 w-5 text-cyan-300/80" />
              {p}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {certificationGroups.map((group) => (
            <StaggerItem key={group.id} className="h-full">
              <TiltCard className="flex h-full flex-col p-6" intensity={6}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-base font-semibold text-white">
                    {group.provider}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full bg-gradient-to-r ${group.gradient} px-2.5 py-0.5 text-xs font-bold text-slate-950`}
                  >
                    {group.items.length}
                  </span>
                </div>
                <div
                  className={`mt-4 h-px w-full bg-gradient-to-r ${group.gradient} opacity-60`}
                />
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-snug text-slate-300/90"
                    >
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300/90" />
                      <span>{item}</span>
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
