import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardTone = "light" | "sand" | "dark";

const tones: Record<CardTone, string> = {
  light: "bg-white text-ink border border-line",
  sand: "bg-sand text-ink",
  dark: "bg-night text-on-night",
};

type CardProps = {
  as?: ElementType;
  tone?: CardTone;
  /** Adds hover lift. Use with a stretched link inside (see CardLink). */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
};

export function Card({
  as: Tag = "div",
  tone = "light",
  interactive,
  className,
  children,
}: CardProps) {
  return (
    <Tag
      data-surface={tone === "dark" ? tone : undefined}
      className={cn(
        "relative rounded-card-lg p-6 sm:p-7",
        tones[tone],
        interactive &&
          "shadow-soft transition-[transform,box-shadow] duration-300 ease-out-soft focus-within:-translate-y-1 focus-within:shadow-lift hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none",
        !interactive && tone === "light" && "shadow-soft",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
