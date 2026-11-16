import { cn } from "@/lib/cn";

/** Numbered horizontal steps (stacks on small screens). */
export function StepList({
  steps,
  tone = "light",
  className,
}: {
  steps: { title: string; description?: string }[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <ol
      className={cn(
        "grid gap-6 sm:grid-cols-2",
        steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        steps.length === 5 && "lg:grid-cols-5",
        steps.length === 6 && "lg:grid-cols-3 xl:grid-cols-6",
        className,
      )}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={cn("border-t pt-6", dark ? "border-night-line" : "border-ink/15")}
        >
          <span
            aria-hidden="true"
            className={cn("font-display text-h2", dark ? "text-accent-soft" : "text-accent-ink")}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
          {step.description && (
            <p className={cn("mt-2", dark ? "text-on-night-muted" : "text-muted")}>
              {step.description}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
