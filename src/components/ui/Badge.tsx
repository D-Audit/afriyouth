import type { ReactNode } from "react";
import { ui } from "@/content/site";
import type { Status } from "@/content/types";
import { cn } from "@/lib/cn";

type BadgeTone = "neutral" | "accent" | "outline" | "dark";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-sand text-muted",
  accent: "bg-accent-tint text-accent-ink",
  outline: "bg-white text-ink ring-1 ring-inset ring-line [&>span]:text-accent",
  dark: "bg-night text-on-night",
};

export function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
}: {
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

const statusTones: Record<Status, BadgeTone> = {
  open: "outline",
  upcoming: "accent",
  ongoing: "dark",
  closed: "neutral",
};

/** Program / opportunity status tag with a coloured dot. */
export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <Badge tone={statusTones[status]} dot className={className}>
      {ui.statusLabels[status]}
    </Badge>
  );
}
