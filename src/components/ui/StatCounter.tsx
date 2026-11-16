"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { Stat } from "@/content/impact";

/**
 * Shows a figure that counts up when scrolled into view.
 * While `value` is null (official figures pending) the placeholder text is shown instead.
 */
export function StatCounter({ stat, className }: { stat: Stat; className?: string }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(numberRef, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const target = stat.value;

  useEffect(() => {
    const node = numberRef.current;
    if (!node || target === null || !inView) return;
    if (reduceMotion) {
      node.textContent = target.toLocaleString("en");
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = Math.round(latest).toLocaleString("en");
      },
    });
    return () => controls.stop();
  }, [inView, target, reduceMotion]);

  return (
    <div className={className}>
      <p className="font-display text-h1 tabular-nums">
        <span ref={numberRef}>{target === null ? stat.placeholder : (0).toLocaleString("en")}</span>
        {stat.suffix && <span className="text-accent-soft">{stat.suffix}</span>}
      </p>
      <p className="mt-2 text-on-night-muted">{stat.label}</p>
    </div>
  );
}
