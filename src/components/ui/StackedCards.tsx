"use client";

import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

/** How much smaller each card further back in the pile ends up. */
const SHRINK = 0.035;

/**
 * A pile of cards. Each card sticks near the top of the screen while the next one slides
 * up over it, and the covered cards shrink slightly so their top edges stay visible as a
 * stack. The sticking is plain CSS (`position: sticky`); only the shrink is scripted, so
 * the section reads normally with JavaScript off or with reduced motion.
 */
export function StackedCards({ label, items }: { label: string; items: ReactNode[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.12", "end end"] });

  return (
    <ol
      ref={ref}
      aria-label={label}
      className="[--stack-step:0.5rem] [--stack-top:5.25rem] sm:[--stack-step:0.875rem] sm:[--stack-top:6rem]"
    >
      {items.map((item, index) => (
        <StackedCard key={index} index={index} total={items.length} progress={scrollYProgress}>
          {item}
        </StackedCard>
      ))}
    </ol>
  );
}

function StackedCard({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  // A card starts shrinking when the next one begins to cover it and stops at the end.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * SHRINK]);

  return (
    <li
      style={{ "--n": index } as CSSProperties}
      className="sticky top-[calc(var(--stack-top)+var(--n)*var(--stack-step))] pb-5 last:pb-0 sm:pb-6"
    >
      <m.div style={reduce ? undefined : { scale }} className="origin-top will-change-transform">
        {children}
      </m.div>
    </li>
  );
}
