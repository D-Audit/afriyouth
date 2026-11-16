import { useId } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * The official Afri Youth Innovation Labs mark: a figure with raised arms and three rays,
 * traced from the vector artwork in the brand guidelines (do not redraw or restyle it).
 * The full stacked lockups live in public/images/brand/ (logo.svg, logo-white.svg).
 */
const MARK = {
  body: "M8.52 112.59C3.05 117.84-.2 123.81 5.87 129.18 35.08 150.54 65.52 169.74 72.89 207.91 76.89 232.93 70.35 277.3 81.89 275.29 178.6 258.43 197.84 86.96 157.57 96.83 141.24 100.83 117.29 120.8 101.89 121.85 43.51 125.82 46.63 80.64 15.87 104.94 13.08 107.14 11.03 110.19 8.52 112.59Z",
  head: "M119.91 81.7C119.91 97.16 107.38 109.7 91.93 109.7 76.47 109.7 63.94 97.16 63.94 81.7 63.94 66.23 76.47 53.7 91.93 53.7 107.38 53.7 119.91 66.23 119.91 81.7Z",
  rays: [
    "M20.61 32.27 21.41 31.32C25.11 26.95 31.6 26.41 35.96 30.11L47.24 39.66C51.61 43.36 52.14 49.86 48.45 54.22L47.64 55.17C43.95 59.54 37.46 60.07 33.09 56.38L21.82 46.83C17.45 43.13 16.91 36.63 20.61 32.27Z",
    "M96.09 1.96H94.86C89.13 1.96 84.52 6.57 84.52 12.29V27.07C84.52 32.79 89.13 37.4 94.85 37.4H96.09C101.81 37.4 106.41 32.79 106.42 27.07V12.29C106.42 6.57 101.81 1.96 96.09 1.96Z",
    "M168.63 32.27 167.83 31.32C164.14 26.95 157.64 26.41 153.27 30.11L142 39.66C137.64 43.36 137.1 49.86 140.8 54.22L141.59 55.17C145.29 59.54 151.79 60.07 156.15 56.38L167.42 46.83C171.79 43.13 172.33 36.63 168.63 32.27Z",
  ],
} as const;

export const MARK_PATHS = MARK;
/** Intrinsic size of the mark artwork (viewBox units). */
export const MARK_SIZE = { width: 180, height: 278 } as const;

/**
 * Brand mark. `gradient` is the primary version for light surfaces; `white` is the
 * one-colour version for blue and dark surfaces, as shown in the brand guidelines.
 */
export function LogoMark({
  variant = "gradient",
  className,
}: {
  variant?: "gradient" | "white";
  className?: string;
}) {
  const id = useId();
  const white = variant === "white";
  return (
    <svg
      viewBox={`0 0 ${MARK_SIZE.width} ${MARK_SIZE.height}`}
      aria-hidden="true"
      focusable="false"
      className={cn("h-10 w-auto shrink-0", className)}
    >
      {!white && (
        <defs>
          <linearGradient
            id={id}
            gradientUnits="userSpaceOnUse"
            x1="10.5"
            y1="73"
            x2="171.3"
            y2="296.4"
          >
            <stop stopColor="#E629DA" />
            <stop offset="1" stopColor="#0301FF" />
          </linearGradient>
        </defs>
      )}
      <path d={MARK.body} fill={white ? "#fff" : `url(#${id})`} />
      <path d={[MARK.head, ...MARK.rays].join(" ")} fill={white ? "#fff" : "#460DF4"} />
    </svg>
  );
}

/**
 * Horizontal logo for the header and footer: the mark plus the name on two lines
 * ("Afri Youth" / "Innovation Labs", with "Innovation" in brand blue), following the
 * compact lockup in the brand guidelines.
 */
export function Wordmark({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  const { first, accent, rest } = site.wordmark;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark variant={dark ? "white" : "gradient"} />
      <span
        className={cn(
          "flex flex-col font-display text-[0.9375rem] font-bold leading-[1.08] tracking-[-0.02em]",
          dark ? "text-on-night" : "text-ink",
        )}
      >
        <span>{first}</span>
        <span>
          <span className={dark ? undefined : "text-accent"}>{accent}</span> {rest}
        </span>
      </span>
    </span>
  );
}
