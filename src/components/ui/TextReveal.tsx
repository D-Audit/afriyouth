"use client";

import * as m from "motion/react-m";
import type { Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.045 } },
};

const word: Variants = {
  hidden: { y: "110%" },
  shown: { y: "0%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function Words({ text, className }: { text: string; className?: string }) {
  return text.split(" ").map((part, index) => (
    <span key={index}>
      {index > 0 && " "}
      <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
        <m.span variants={word} className={`inline-block will-change-transform ${className ?? ""}`}>
          {part}
        </m.span>
      </span>
    </span>
  ));
}

/**
 * Headline whose words slide up from behind a mask, one after another, the first time
 * it scrolls into view. The text stays in the DOM in reading order for screen readers.
 */
export function TextReveal({
  title,
  emphasis,
  emphasisClassName,
}: {
  title: string;
  emphasis?: string;
  emphasisClassName?: string;
}) {
  return (
    <m.span
      variants={container}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      <Words text={title} />
      {emphasis && (
        <>
          {" "}
          <Words text={emphasis} className={emphasisClassName} />
        </>
      )}
    </m.span>
  );
}
