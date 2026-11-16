import { cn } from "@/lib/cn";

type EyebrowTone = "light" | "dark" | "accent";

const tones: Record<EyebrowTone, string> = {
  light: "border-line bg-white text-ink shadow-[0_1px_2px_rgb(13_6_36/0.04)]",
  dark: "border-night-line bg-night-raised text-on-night",
  /** On the solid blue surfaces. */
  accent: "border-white/25 bg-white/10 text-white",
};

/** Small pill label shown above a section heading so each section is clearly signposted. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: EyebrowTone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.8125rem] font-medium",
        tones[tone],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", tone === "light" ? "bg-accent" : "bg-accent-soft")}
      />
      {children}
    </p>
  );
}
