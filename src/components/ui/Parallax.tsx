"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** How far a photo zooms in at the moment it sits in the middle of the screen. */
const ZOOM = 1.1;

/**
 * Scroll behaviour for photos. As a photo crosses the screen it zooms in gently, peaks
 * when it reaches the middle, then eases back to its normal size as it moves on. With
 * `strength` above 0 it also drifts slightly slower than the page (the layer is oversized
 * so the edges never show). The parent must clip.
 */
export function Parallax({
  children,
  strength = 8,
  className,
}: {
  children: ReactNode;
  /** Total vertical drift as a percentage of the element's height; 0 turns drift off. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [1, ZOOM, 1]);
  return (
    <div ref={ref} className="absolute inset-0">
      <m.div
        style={reduce ? undefined : { y, scale }}
        className={cn(
          "absolute inset-x-0 will-change-transform",
          strength > 0 ? "-inset-y-[9%]" : "inset-y-0",
          className,
        )}
      >
        {children}
      </m.div>
    </div>
  );
}
