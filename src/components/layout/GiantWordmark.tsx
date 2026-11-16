"use client";

import * as m from "motion/react-m";
import type { Variants } from "motion/react";

const row: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const letter: Variants = {
  hidden: { y: "105%" },
  shown: { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * The brand name set large along the bottom of the footer. Its letters rise from
 * behind the bottom edge one after another the first time it is seen. Decorative: the
 * name is already given by the footer logo, so this is hidden from assistive technology.
 */
export function GiantWordmark({ text }: { text: string }) {
  return (
    <m.p
      aria-hidden="true"
      variants={row}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
      className="flex select-none justify-center overflow-hidden whitespace-nowrap font-display text-[clamp(3.25rem,11vw,10rem)] font-medium leading-[0.95] tracking-[-0.04em] text-accent"
    >
      {Array.from(text).map((char, index) => (
        <m.span key={index} variants={letter} className="inline-block will-change-transform">
          {char}
        </m.span>
      ))}
    </m.p>
  );
}
