"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A glass card that tilts in 3D towards the cursor with a moving light glare.
 */
export function TiltCard({
  children,
  className,
  intensity = 10,
  glow = "rgba(103,232,249,0.35)",
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glow?: string;
}) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), {
    stiffness: 180,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), {
    stiffness: 180,
    damping: 18,
  });

  const glareX = useTransform(px, [0, 1], [0, 100]);
  const glareY = useTransform(py, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(520px circle at ${glareX}% ${glareY}%, ${glow}, transparent 55%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="perspective-1200 h-full">
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "glass group relative h-full overflow-hidden rounded-3xl transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_rgba(34,211,238,0.25)]",
          className,
        )}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glare }}
        />
        <div style={{ transform: "translateZ(30px)" }} className="relative h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
