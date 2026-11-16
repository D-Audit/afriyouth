import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * A short pathway shown as numbered pills joined by arrows, e.g.
 * Incubation → Acceleration → Demo Day. It is an ordered list, so the sequence is
 * also clear to screen readers; the arrows are decorative.
 */
export function FlowSteps({
  steps,
  tone = "light",
  className,
}: {
  steps: string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-3", className)}>
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex min-h-11 items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 font-medium",
              dark
                ? "border-night-line bg-night-raised text-on-night"
                : "border-line bg-white text-ink shadow-soft",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full text-[0.8125rem] font-semibold tabular-nums",
                index === steps.length - 1
                  ? "bg-brand-gradient text-white"
                  : dark
                    ? "bg-white/10 text-on-night"
                    : "bg-accent-tint text-accent-ink",
              )}
            >
              {index + 1}
            </span>
            {step}
          </span>
          {index < steps.length - 1 && (
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.5}
              className={cn("size-4 shrink-0", dark ? "text-on-night-muted" : "text-muted")}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
