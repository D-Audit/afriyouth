"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

/** Pixels of page scroll over which the stage grows to full size. */
const TRAVEL = 520;

/**
 * The hero's photo "stage". It starts slightly inset with a soft brand-gradient glow behind it and
 * grows to full width as the page begins to scroll, while the card on top floats at its own
 * speed. Everything is driven by the window scroll position, so the first paint is
 * identical on the server and in the browser (no jump on hydration).
 */
export function HeroStage({
  children,
  card,
}: {
  /** The photo. */
  children: ReactNode;
  /** Card that overlaps the bottom-left corner of the photo. */
  card: ReactNode;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, TRAVEL], [0.9, 1]);
  const glow = useTransform(scrollY, [0, TRAVEL], [0.55, 1]);
  const glowScale = useTransform(scrollY, [0, TRAVEL], [0.85, 1.05]);
  const cardY = useTransform(scrollY, [0, TRAVEL * 1.6], [28, -44]);

  return (
    <div className="relative">
      <m.div
        aria-hidden="true"
        style={reduce ? undefined : { opacity: glow, scale: glowScale }}
        className="pointer-events-none absolute inset-x-[6%] -bottom-6 top-[12%] -z-10 rounded-[50%] bg-[linear-gradient(110deg,rgb(199_35_223/0.45),rgb(3_1_255/0.45))] blur-[90px]"
      />
      <m.div
        style={reduce ? undefined : { scale }}
        className="origin-top overflow-hidden rounded-[1.75rem] shadow-lift ring-1 ring-ink/5 will-change-transform sm:rounded-[2.25rem]"
      >
        {children}
      </m.div>
      <m.div
        style={reduce ? undefined : { y: cardY }}
        className="relative mt-4 sm:absolute sm:bottom-8 sm:left-8 sm:mt-0 lg:bottom-12 lg:left-12"
      >
        {card}
      </m.div>
    </div>
  );
}
