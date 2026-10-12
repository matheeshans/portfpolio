"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Award,
  Briefcase,
  Download,
  ExternalLink,
  GraduationCap,
  MapPin,
  Shield,
  type LucideProps,
} from "lucide-react";
import {
  heroHighlights,
  heroIntro,
  profile,
  type HeroHighlight,
} from "@/lib/cv-data";
import { CyberShieldScene } from "./cyber-shield-scene";
import { LinkedInIcon } from "./linkedin-icon";

const ease = [0.22, 1, 0.36, 1] as const;

const HIGHLIGHT_ICONS: Record<
  HeroHighlight["icon"],
  React.ComponentType<LucideProps>
> = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  award: Award,
  shield: Shield,
};

export function HeroSection() {
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const introVoiceRef = useRef<HTMLAudioElement>(null);
  const introBufferTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    introVoiceRef.current?.load();
  }, []);

  const clearIntroBufferTimer = () => {
    if (introBufferTimerRef.current) {
      clearTimeout(introBufferTimerRef.current);
      introBufferTimerRef.current = null;
    }
  };

  const syncIntroVoice = (forceSeek = false) => {
    const video = introVideoRef.current;
    const voice = introVoiceRef.current;
    if (
      !video ||
      !voice ||
      voice.readyState === HTMLMediaElement.HAVE_NOTHING ||
      !Number.isFinite(video.duration) ||
      !Number.isFinite(voice.duration)
    ) {
      return;
    }

    if (
      forceSeek ||
      voice.ended ||
      Math.abs(voice.currentTime - video.currentTime) > 0.35
    ) {
      voice.currentTime = Math.min(video.currentTime, voice.duration);
    }
    voice.playbackRate = video.playbackRate;

    if (!video.paused && voice.paused && voice.currentTime < voice.duration) {
      void voice.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Unable to play the introduction voiceover.", error);
        video.pause();
      });
    }
  };

  const pauseIntroVoice = () => {
    clearIntroBufferTimer();
    const voice = introVoiceRef.current;
    if (voice && !voice.paused) voice.pause();
  };

  const handleIntroBuffering = () => {
    clearIntroBufferTimer();
    introBufferTimerRef.current = setTimeout(() => {
      const video = introVideoRef.current;
      if (
        video &&
        video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA
      ) {
        pauseIntroVoice();
      }
    }, 300);
  };

  const resumeIntroPlayback = () => {
    clearIntroBufferTimer();
    syncIntroVoice();
  };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-28 md:py-24"
    >
      {/* Cybersecurity defence lattice — vector, so it stays crisp at any size. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      >
        <CyberShieldScene
          className={`absolute inset-0 h-full w-full opacity-[0.58] saturate-[0.8] ${isIntroPlaying ? "hidden" : ""}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,7,13,0.38)_0%,rgba(5,7,13,0.22)_48%,rgba(5,7,13,0.08)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/45 via-[#05070d]/35 to-[#05070d]/90" />
      </div>

      {/* Ambient glows + grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[140px] animate-aurora" />
        <div className="absolute -right-24 bottom-0 h-[420px] w-[620px] rounded-full bg-violet-600/[0.07] blur-[130px] animate-aurora [animation-delay:-6s]" />
        <div className="grid-bg absolute inset-x-0 bottom-0 h-[70%] opacity-25" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center">
        {/* Copy */}
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            Open to {profile.title} roles
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="font-display mt-6 text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          >
            {profile.firstName}{" "}
            <span className="text-gradient">{profile.lastName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="font-display mt-4 text-xl font-medium text-cyan-200 sm:text-2xl"
          >
            {profile.title}
          </motion.p>

          {/* The claim */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="text-shadow-soft mt-6 max-w-3xl text-lg font-medium leading-snug text-slate-100 text-balance sm:text-xl md:text-2xl"
          >
            {heroIntro.lead}
          </motion.p>

          {/* The evidence */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base"
          >
            {heroIntro.support}
          </motion.p>

          {/* Credentials at a glance */}
          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36, ease }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2"
          >
            {heroHighlights.map((h) => {
              const Icon = HIGHLIGHT_ICONS[h.icon];
              return (
                <li
                  key={h.label}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/[0.07] px-3.5 py-1.5 text-xs font-medium text-cyan-100 backdrop-blur sm:text-sm"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                  {h.label}
                </li>
              );
            })}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52, ease }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.35)] transition hover:brightness-110"
            >
              Explore the portfolio
            </a>
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-300/40"
            >
              <Download className="h-4 w-4" /> View CV
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-300/40"
            >
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease }}
            className="mt-10 w-full max-w-2xl"
          >
            <p className="mb-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
              <span>A quick introduction</span>
            </p>
            <div className="rounded-2xl border border-cyan-300/20 bg-white/[0.04] p-1.5 shadow-[0_0_55px_rgba(34,211,238,0.12)]">
              <video
                ref={introVideoRef}
                className="block aspect-video w-full rounded-xl bg-[#05070d]"
                controls
                playsInline
                preload="auto"
                aria-label="Matheeshan's introduction video with synchronized voiceover"
                onPlay={() => {
                  setIsIntroPlaying(true);
                  syncIntroVoice();
                }}
                onPlaying={resumeIntroPlayback}
                onWaiting={handleIntroBuffering}
                onSeeking={pauseIntroVoice}
                onSeeked={() => syncIntroVoice(true)}
                onPause={() => {
                  setIsIntroPlaying(false);
                  pauseIntroVoice();
                }}
                onEnded={() => {
                  setIsIntroPlaying(false);
                  pauseIntroVoice();
                }}
                onError={() => {
                  setIsIntroPlaying(false);
                  pauseIntroVoice();
                }}
                onRateChange={() => syncIntroVoice()}
              >
                <source
                  src="/videos/introduction-video.mp4"
                  type="video/mp4"
                />
                Your browser does not support embedded videos.
              </video>
              <audio
                ref={introVoiceRef}
                className="hidden"
                preload="auto"
                aria-hidden="true"
                tabIndex={-1}
                onCanPlay={() => syncIntroVoice()}
              >
                <source
                  src="/videos/introduction-voice-synced.mp3"
                  type="audio/mpeg"
                />
              </audio>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-slate-400 transition hover:text-cyan-200"
        aria-label="Scroll to the about section"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-xs tracking-[0.2em] uppercase"
        >
          Scroll
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
