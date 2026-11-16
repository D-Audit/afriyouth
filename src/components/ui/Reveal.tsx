"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds before the animation starts; use small steps (0.05–0.15) for staggering. */
  delay?: number;
  className?: string;
};

/**
 * Fades, lifts and un-blurs content into view once.
 * With reduced motion, MotionConfig drops the movement and only the fade remains.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
