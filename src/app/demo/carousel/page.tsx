import type { Metadata } from "next";
import Link from "next/link";
import { CarouselSqueezeDemoClient } from "@/components/demo/carousel-squeeze-demo-client";

export const metadata: Metadata = {
  title: "SqueezeCarousel — Component Demo",
  description: "Original demo of the squeeze carousel component.",
};

export default function CarouselDemoPage() {
  return (
    <main className="dark min-h-screen bg-background py-16 text-foreground">
      <div className="mx-auto mb-8 flex w-full max-w-6xl items-center justify-between px-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            SqueezeCarousel
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            The unmodified demo from <code>demo.tsx</code>.
          </p>
        </div>
        <Link
          href="/"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40"
        >
          ← Back to portfolio
        </Link>
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <CarouselSqueezeDemoClient />
      </div>
    </main>
  );
}
