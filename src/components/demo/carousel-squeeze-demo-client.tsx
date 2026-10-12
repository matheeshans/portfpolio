"use client";

import dynamic from "next/dynamic";

/**
 * The carousel uses `useLayoutEffect`, which React does not run on the server.
 * Loading it client-side only keeps the console clean and avoids any
 * first-paint mismatch while the strip measures itself.
 */
const SqueezeCarouselDemo = dynamic(
  () => import("./carousel-squeeze-demo"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full px-6 py-10">
        <div className="h-[320px] w-full animate-pulse rounded-md bg-white/5" />
      </div>
    ),
  },
);

export function CarouselSqueezeDemoClient() {
  return <SqueezeCarouselDemo />;
}
