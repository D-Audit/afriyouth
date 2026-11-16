"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Grows a block from slightly inset to full size as it scrolls into view —
 * used for the large dark panels so they "arrive" instead of just appearing.
 */
export function ScrollScale({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.45"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  return (
    <m.div ref={ref} style={reduce ? undefined : { scale, y }} className={className}>
      {children}
    </m.div>
  );
}
