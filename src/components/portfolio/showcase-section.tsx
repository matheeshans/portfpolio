"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { SqueezeSlide } from "@/components/ui/carousel-squeeze";
import { profile } from "@/lib/cv-data";
import { SectionBackdrop } from "./section-backdrop";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/** Client-only: the carousel measures itself with `useLayoutEffect`. */
const SqueezeCarousel = dynamic(
  () => import("@/components/ui/carousel-squeeze").then((m) => m.SqueezeCarousel),
  {
    ssr: false,
    loading: () => (
      <div className="h-[360px] w-full animate-pulse rounded-md bg-white/5" />
    ),
  },
);

/** A wordmark for the corner of the open panel. */
const mark = (text: string) => (
  <span className="inline-flex items-center gap-2 text-sm font-medium tracking-tight text-white">
    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
    {text}
  </span>
);

const slides: SqueezeSlide[] = [
  {
    id: "cybersecurity",
    title: "Security is a habit, not a checkbox.",
    description:
      "Cisco-certified in Introduction to Cybersecurity, Cyber Threat Management and Ethical Hacker — so authentication, input handling and dependency hygiene are designed in, never bolted on afterwards.",
    action: "See the certifications",
    href: "#certifications",
    overlay: mark("Cybersecurity & Ethical Hacking"),
    image: "/images/cyber/ethical-hacking.svg",
    imageAlt:
      "Illustration of a security testing terminal with a glowing shield and verification check",
  },
  {
    id: "noc",
    title: "Two and a half years inside a 24/7 network operations centre.",
    description:
      "At Hexad Tech Solutions I monitored enterprise infrastructure around the clock, triaged SLA-critical incidents and escalated with documentation clear enough for the next shift to act on.",
    action: "Read the experience",
    href: "#experience",
    overlay: mark("Network Operations · Hexad Tech"),
    image: "/images/cyber/network.svg",
    imageAlt:
      "Illustration of connected server racks and network status lights",
  },
  {
    id: "secure-web",
    title: "Websites built fast first, then hardened.",
    description:
      "freeCodeCamp-certified in JavaScript Algorithms and Data Structures — roughly 300 hours of project work behind the HTML5, CSS3 and JavaScript I ship, then HTTPS, safe defaults and least-privilege thinking borrowed straight from the network side.",
    action: "Verify the certification",
    href: "https://freecodecamp.org/certification/matheeshan/javascript-algorithms-and-data-structures-v8",
    target: "_blank",
    overlay: mark("Secure Web Development"),
    image: "/images/cyber/secure-web.svg",
    imageAlt:
      "Illustration of a secure website interface protected by a glowing shield and padlock",
  },
  {
    id: "threat",
    title: "Monitoring that catches the problem before the user does.",
    description:
      "Network monitoring, TCP/IP and subnetting fundamentals plus incident and SLA management — the same instincts that keep a site up also keep it honest under load.",
    action: "View the toolkit",
    href: "#skills",
    overlay: mark("Threat & Network Monitoring"),
    image: "/images/cyber/threat-map.svg",
    imageAlt:
      "Illustration of a wireframe globe with threat trajectories and alert hotspots",
  },
  {
    id: "data-ai",
    title: "Metrics beat opinions.",
    description:
      "Cisco Data Analytics Essentials, freeCodeCamp Scientific Computing with Python and Machine Learning with IBM Cognitive Class — website analytics turned into decisions rather than dashboards nobody opens.",
    action: "See the credentials",
    href: "#certifications",
    overlay: mark("Data Analytics, Python & AI"),
    image: "/images/cyber/data-ai.svg",
    imageAlt:
      "Illustration of a neural network with multicoloured connected data nodes",
  },
  {
    id: "soc",
    title: "Calm under an incident, clear in the write-up.",
    description:
      "Structured troubleshooting, root-cause analysis and plain-English reporting — the habits that come from working alerts on a live operations floor rather than reading about them.",
    action: "Get in touch",
    href: "#contact",
    overlay: mark("Security Operations Mindset"),
    image: "/images/cyber/soc.svg",
    imageAlt:
      "Illustration of a security operations centre dashboard with live network charts",
  },
  {
    id: "support",
    title: "Hardware, operating systems and the awkward faults in between.",
    description:
      "From Globe Digital IT Zone onwards: hardware diagnostics, OS update failures and software conflicts resolved end to end, improving first-time-fix rates and user satisfaction.",
    action: "Download the CV",
    href: "/cv",
    overlay: mark("IT Support & Diagnostics"),
    image: "/images/cyber/it-support.svg",
    imageAlt:
      "Illustration of a laptop repair bench with visible circuit traces and diagnostics",
  },
];

export function ShowcaseSection() {
  const [index, setIndex] = useState(0);

  return (
    <section
      id="showcase"
      className="relative isolate scroll-mt-28 py-24 md:py-32"
    >
      <SectionBackdrop
        src="/images/cyber/threat-map.svg"
        objectPosition="center"
        strength={0.32}
      />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <SectionHeading
          eyebrow="Showcase"
          title="Seven capabilities, one security-first mindset."
          description="Click a slat to open it, hover to widen it, or use the arrow keys. Every panel maps to something real on the CV."
        />

        <Reveal>
          <div className="glass glow-border relative overflow-hidden rounded-[2rem] p-5 sm:p-7 md:p-9">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl"
            />

            <div className="relative">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-slate-300 backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                  </span>
                  {slides[index]?.id
                    ? String(slides[index].id).replace(/-/g, " ")
                    : "showcase"}
                </p>
                <p className="font-display text-sm tabular-nums text-slate-400">
                  <span className="text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-1.5 text-slate-600">/</span>
                  {String(slides.length).padStart(2, "0")}
                </p>
              </div>

              <SqueezeCarousel
                slides={slides}
                label={`${profile.name} — capability showcase`}
                onIndexChange={setIndex}
                height="clamp(200px, 34cqi, 360px)"
                radius={14}
                gap={16}
                slatGap={8}
                slatWidth={10}
                duration={1000}
                hoverGrow
                autoplay
                interval={6000}
                controls
                accent="#22d3ee"
                accentForeground="#04121a"
                panelClassName="ring-1 ring-white/10"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
