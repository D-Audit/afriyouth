import type { IconName } from "@/content/types";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type FeatureIconTone = "accent" | "ink" | "dark";

const tones: Record<FeatureIconTone, string> = {
  accent: "text-accent-ink",
  ink: "text-ink",
  dark: "text-accent-soft",
};

/** A standalone line icon (no background shape) used at the top of cards and list items. */
export function FeatureIcon({
  name,
  tone = "accent",
  className,
}: {
  name: IconName;
  tone?: FeatureIconTone;
  className?: string;
}) {
  return <Icon name={name} className={cn("size-8 shrink-0", tones[tone], className)} />;
}
