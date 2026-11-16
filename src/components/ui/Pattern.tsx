import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Subtle geometric texture: quarter-circle arcs that join into a continuous "connected
 * paths" motif, echoing how AfriYouth links disciplines. Colour comes from `currentColor`.
 */
export function Pattern({ className, size = 44 }: { className?: string; size?: number }) {
  const id = useId();
  const half = size / 2;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <path
            d={`M0 ${half} A${half} ${half} 0 0 0 ${half} 0 M${half} ${size} A${half} ${half} 0 0 1 ${size} ${half}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <circle cx={half} cy={half} r="1.6" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
