"use client";

import dynamic from "next/dynamic";

function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-24 w-24 rounded-full border border-cyan-300/30 animate-pulse-ring" />
    </div>
  );
}

/** Three.js scenes are browser-only – load them lazily with SSR disabled. */
export const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: SceneFallback,
});

export const SkillsScene = dynamic(() => import("./skills-scene"), {
  ssr: false,
  loading: SceneFallback,
});
