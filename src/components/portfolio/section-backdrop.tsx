"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * A full-bleed, parallaxing photographic backdrop for a section.
 *
 * The parent section must be `relative isolate` so the `-z-10` layer stays
 * clamped to that section's stacking context and the copy always paints above
 * it.
 *
 * Contrast is managed in one place: the image is drawn at full strength and a
 * single flat scrim does all the darkening (`strength` is how much of the photo
 * survives, so the scrim alpha is simply `1 - strength`). Stacking a faded
 * image *and* a heavy scrim would multiply out to almost nothing — which is
 * exactly the trap this avoids.
 */
export function SectionBackdrop({
  src,
  /** Where the crop should sit, e.g. "center top". */
  objectPosition = "center",
  /** How much of the photo survives the scrim. 0.3 is a whisper, 0.6 is bold. */
  strength = 0.34,
  /** Colour wash pushing the photo toward the site palette. */
  tint = "5, 7, 13",
  /** Fade the top and bottom edges so sections blend seamlessly. */
  fadeEdges = true,
}: {
  src: string;
  objectPosition?: string;
  strength?: number;
  tint?: string;
  fadeEdges?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </motion.div>

      {/* The one and only darkening layer. */}
      <div
        className="absolute inset-0"
        style={{
          background: `rgba(${tint}, ${Math.round((1 - strength) * 100) / 100})`,
        }}
      />

      {/* Edge fade for seamless section-to-section transitions. */}
      {fadeEdges && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070d] via-transparent to-[#05070d]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070d]/75 via-transparent to-[#05070d]/75" />
        </>
      )}

      {/* Fine grid ties the photography back to the interface. */}
      <div className="grid-bg absolute inset-0 opacity-20" />
    </div>
  );
}
