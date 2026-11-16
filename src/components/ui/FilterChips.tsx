"use client";

import { useId } from "react";
import { ui } from "@/content/site";
import { cn } from "@/lib/cn";

type FilterChipsProps<T extends string> = {
  label: string;
  options: { value: T; label: string }[];
  /** null means "All". */
  value: T | null;
  onChange: (value: T | null) => void;
  className?: string;
};

/** A labelled group of toggle chips. Exactly one option (or "All") is active. */
export function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: FilterChipsProps<T>) {
  const labelId = useId();
  const chips: { value: T | null; label: string }[] = [
    { value: null, label: ui.filterAll },
    ...options,
  ];

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className={cn("grid gap-3 sm:grid-cols-[9rem_1fr] sm:items-start", className)}
    >
      <p id={labelId} className="label-caps text-muted sm:pt-2.5">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => {
          const pressed = chip.value === value;
          return (
            <button
              key={chip.value ?? "all"}
              type="button"
              aria-pressed={pressed}
              onClick={() => onChange(chip.value)}
              className={cn(
                "min-h-10 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                pressed
                  ? "border-ink bg-ink text-canvas"
                  : "border-line bg-white text-ink hover:border-ink/40",
              )}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
