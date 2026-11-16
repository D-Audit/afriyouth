"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

/** Hero content eases upward and softens as the page starts to scroll away from it. */
export function ScrollDrift({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -90]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.35]);
  return (
    <m.div style={reduce ? undefined : { y, opacity }} className={className}>
      {children}
    </m.div>
  );
}
