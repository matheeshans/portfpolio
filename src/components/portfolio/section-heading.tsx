import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 md:mb-16 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
        {eyebrow}
      </p>
      <h2 className="font-display text-shadow-soft mt-5 text-3xl font-bold leading-[1.05] text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-shadow-soft mt-5 text-base leading-relaxed text-slate-200 md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
