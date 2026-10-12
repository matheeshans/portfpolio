"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { heroIntro, profile } from "@/lib/cv-data";

export function PortfolioIntro() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closingRef = useRef(false);
  const bodyOverflowRef = useRef("");
  const rootOverflowRef = useRef("");

  const restorePageScroll = useCallback(() => {
    document.body.style.overflow = bodyOverflowRef.current;
    document.documentElement.style.overflow = rootOverflowRef.current;
  }, []);

  const dismiss = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    closeTimerRef.current = setTimeout(() => {
      restorePageScroll();
      setVisible(false);
    }, 850);
  }, [restorePageScroll]);

  useEffect(() => {
    bodyOverflowRef.current = document.body.style.overflow;
    rootOverflowRef.current = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    enterButtonRef.current?.focus();

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      void video.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Unable to autoplay the portfolio intro video.", error);
      });
    }

    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
      restorePageScroll();
    };
  }, [dismiss, restorePageScroll]);

  if (!visible) return null;

  return (
    <motion.section
      aria-label="Portfolio introduction"
      aria-hidden={closing}
      initial={{ opacity: 1 }}
      animate={{ opacity: closing ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed inset-0 z-[100] isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-black text-white"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
      >
        <source src="/videos/introduction-video.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(5,7,13,0.35)_0%,rgba(5,7,13,0.72)_65%,#05070d_100%)]"
      />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 sm:p-9">
        <p className="font-display text-sm tracking-[0.12em] text-white/80 sm:text-base">
          {profile.firstName}
          <span className="ml-1 text-cyan-200">{profile.lastName}</span>
        </p>
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
          Portfolio
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center"
      >
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-cyan-200/85 sm:text-sm">
          {profile.title}
        </p>
        <h1 className="font-display max-w-3xl text-balance text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl">
          {profile.firstName}{" "}
          <span className="text-gradient">{profile.lastName}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/70 sm:text-lg">
          {heroIntro.lead}
        </p>
        <button
          ref={enterButtonRef}
          type="button"
          onClick={dismiss}
          className="group mt-10 inline-flex min-h-12 items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_34px_rgba(34,211,238,0.3)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
        >
          Enter portfolio
          <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
        </button>
      </motion.div>
    </motion.section>
  );
}
