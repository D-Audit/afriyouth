import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Stage = { title: string; description?: string };

/**
 * Numbered stages of a journey (for example the ten stages of the Evidence-to-Impact
 * Accelerator) as a grid of cards. The last stage carries the brand gradient, marking
 * the destination. An ordered list, so the sequence is announced to screen readers.
 */
export function StageGrid({
  stages,
  tone = "light",
  columns = 5,
  headingLevel = "h3",
  className,
}: {
  stages: Stage[];
  tone?: "light" | "dark";
  columns?: 2 | 5;
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  const dark = tone === "dark";
  const Heading = headingLevel;
  return (
    <ol
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-4",
        columns === 5 && "md:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      {stages.map((stage, index) => {
        const last = index === stages.length - 1;
        return (
          <li key={stage.title} className="flex">
            <Reveal delay={(index % 5) * 0.05} className="flex w-full">
              <div
                className={cn(
                  "flex w-full flex-col rounded-card p-4 sm:p-5",
                  last
                    ? "bg-brand-gradient text-white"
                    : dark
                      ? "border border-night-line bg-night-raised text-on-night"
                      : "border border-line bg-white text-ink shadow-soft",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-display text-[0.8125rem] font-semibold tabular-nums tracking-normal",
                    last ? "text-white/80" : dark ? "text-accent-soft" : "text-accent-ink",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Heading className="mt-6 font-display text-[1.0625rem] leading-snug sm:mt-8">
                  {stage.title}
                </Heading>
                {stage.description && (
                  <p
                    className={cn(
                      "mt-1.5 text-sm leading-relaxed",
                      last ? "text-white/90" : dark ? "text-on-night-muted" : "text-muted",
                    )}
                  >
                    {stage.description}
                  </p>
                )}
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
