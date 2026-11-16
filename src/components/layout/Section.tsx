import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type SectionTone = "canvas" | "sand" | "dark";

const tones: Record<SectionTone, string> = {
  canvas: "bg-canvas text-ink",
  sand: "bg-sand text-ink",
  dark: "bg-night text-on-night",
};

/** Vertical rhythm wrapper for page sections. `labelledBy` should point at the section's heading id. */
export function Section({
  tone = "canvas",
  labelledBy,
  className,
  containerClassName,
  children,
}: {
  tone?: SectionTone;
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      data-surface={tone === "dark" ? "dark" : undefined}
      className={cn("py-16 sm:py-24", tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
