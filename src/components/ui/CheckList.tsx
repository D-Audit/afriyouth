import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

/** A list of short items, each with a check mark. Two columns from the `sm` breakpoint. */
export function CheckList({
  items,
  tone = "light",
  columns = 2,
  className,
}: {
  items: string[];
  tone?: "light" | "dark";
  columns?: 1 | 2;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <ul className={cn("grid gap-x-8", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex items-start gap-3 border-t py-3.5",
            dark ? "border-night-line" : "border-line",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center",
              dark ? "text-accent-soft" : "text-accent-ink",
            )}
          >
            <Check strokeWidth={2} className="size-4" />
          </span>
          <span className="font-medium">{item}</span>
        </li>
      ))}
    </ul>
  );
}
