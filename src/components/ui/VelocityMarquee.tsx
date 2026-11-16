"use client";

import * as m from "motion/react-m";
import {
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Fragment, useRef } from "react";

const wrap = (min: number, max: number, value: number) =>
  ((((value - min) % (max - min)) + (max - min)) % (max - min)) + min;

/**
 * Oversized band of words that drifts on its own and reacts to scrolling: scroll faster
 * and it speeds up and leans; scroll up and it reverses. Purely decorative.
 */
export function VelocityMarquee({
  words,
  baseSpeed = 2.2,
}: {
  words: string[];
  baseSpeed?: number;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skewX = useTransform(velocity, [-2500, 0, 2500], [7, 0, -7]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < -0.05) direction.current = -1;
    else if (b > 0.05) direction.current = 1;
    const move = direction.current * baseSpeed * (delta / 1000) * (1 + Math.abs(b));
    baseX.set(baseX.get() - move);
  });

  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className={index % 2 === 0 ? "text-ink" : "text-outline"}>{word}</span>
          <svg viewBox="0 0 24 24" className="mx-[0.35em] size-[0.42em] shrink-0 text-accent">
            <path
              fill="currentColor"
              d="M12 0c.6 6.4 5 11 12 12-7 1-11.4 5.6-12 12-.6-6.4-5-11-12-12C7 11 11.4 6.4 12 0Z"
            />
          </svg>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line py-3.5 sm:py-4">
      <m.div
        style={reduce ? undefined : { x, skewX }}
        className="flex w-max whitespace-nowrap font-display text-[clamp(1.25rem,1rem+0.9vw,1.875rem)] font-medium leading-none tracking-[-0.025em]"
      >
        {row}
        {row}
      </m.div>
    </div>
  );
}
