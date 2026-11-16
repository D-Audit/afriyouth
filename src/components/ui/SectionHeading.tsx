import type { Headline } from "@/content/types";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Highlight } from "./Highlight";
import { TextReveal } from "./TextReveal";

type SectionHeadingProps = {
  label?: string;
  heading: Headline;
  intro?: string;
  as?: "h1" | "h2";
  size?: "display" | "h1" | "h2";
  align?: "start" | "center";
  /** `accent` is for headings that sit on the solid blue band. */
  tone?: "light" | "dark" | "accent";
  id?: string;
  className?: string;
};

const sizes = { display: "text-display", h1: "text-h1", h2: "text-h2" };

/** Pill label + headline (emphasis in the accent colour) + optional intro paragraph. */
export function SectionHeading({
  label,
  heading,
  intro,
  as: Tag = "h2",
  size = "h2",
  align = "start",
  tone = "light",
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const mutedText = {
    light: "text-muted",
    dark: "text-on-night-muted",
    accent: "text-white/85",
  }[tone];
  // On the solid blue band the heading is white and the emphasis is a pale pink (6.0:1).
  const emphasisText = {
    light: "text-accent-ink",
    dark: "text-accent-soft",
    accent: "text-pink-tint",
  }[tone];
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {label && (
        <Eyebrow tone={tone} className="mb-5">
          {label}
        </Eyebrow>
      )}
      <Tag
        id={id}
        className={cn(
          "font-display text-balance",
          sizes[size],
          dark && "text-on-night",
          tone === "accent" && "text-white",
        )}
      >
        {Tag === "h2" ? (
          <TextReveal
            title={heading.title}
            emphasis={heading.emphasis}
            emphasisClassName={emphasisText}
          />
        ) : (
          <>
            {heading.title}
            {heading.emphasis && (
              <>
                {" "}
                {tone !== "light" ? (
                  <span className={emphasisText}>{heading.emphasis}</span>
                ) : (
                  <Highlight>{heading.emphasis}</Highlight>
                )}
              </>
            )}
          </>
        )}
      </Tag>
      {intro && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-lead text-pretty",
            mutedText,
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
