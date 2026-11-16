"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Makes the footer feel uncovered rather than scrolled in: its content starts shifted up
 * behind the page above and settles into place as the footer comes fully into view.
 * Works at any footer height (unlike a fixed "reveal" footer, which breaks when the
 * footer is taller than the screen).
 */
export function FooterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-28%", "0%"]);
  return (
    <div ref={ref} className="overflow-hidden">
      <m.div style={reduce ? undefined : { y }} className="will-change-transform">
        {children}
      </m.div>
    </div>
  );
}
