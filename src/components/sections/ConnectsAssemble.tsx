"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { useScroll, useSpring, useTransform, type MotionStyle } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef, type CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/content/types";
import { MOTION_OK, useMediaQuery } from "@/lib/use-media-query";

type Node = { title: string; caption?: string; icon: IconName; href: string };

/**
 * Where each capsule starts before it falls into line: sideways (a share of `--spread`),
 * vertically (rem) and tilted (degrees). The pattern repeats if more areas are added.
 */
const SCATTER: { dx: number; dy: number; r: number }[] = [
  { dx: -1, dy: 5, r: -16 },
  { dx: 0.95, dy: 1.5, r: 13 },
  { dx: -0.35, dy: 7.5, r: 9 },
  { dx: 1.05, dy: 6, r: -11 },
  { dx: -0.9, dy: 3, r: 18 },
];

/**
 * "What makes us different": the five capabilities begin scattered and tilted, then slide into one
 * ordered, connected column as the section scrolls into view, ending at the centre label.
 *
 * It is a plain ordered list of links. The scatter is applied only after the browser
 * confirms motion is allowed, so without JavaScript, and for reduced-motion users, the list
 * is simply shown in its finished state.
 */
export function ConnectsAssemble({ nodes, centerLabel }: { nodes: Node[]; centerLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useMediaQuery(MOTION_OK);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "center 0.56"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 28, mass: 0.5 });
  // 1 = fully scattered, 0 = assembled. Read by the capsules through the `--p` variable.
  const scatter = useTransform(smooth, [0, 1], [1, 0]);
  const settle = useTransform(smooth, [0.72, 1], [0, 1]);
  const settleScale = useTransform(smooth, [0.72, 1], [0.6, 1]);

  return (
    <m.div
      ref={ref}
      style={animated ? ({ "--p": scatter } as MotionStyle) : undefined}
      className="relative mx-auto w-full max-w-[24rem] [--spread:14vw] sm:[--spread:24vw] lg:[--spread:30vw]"
    >
      {/* The line that ties the column together draws in as the capsules arrive. */}
      <m.div
        aria-hidden="true"
        style={animated ? { scaleY: smooth } : undefined}
        className="absolute bottom-10 left-1/2 top-6 w-px origin-top -translate-x-1/2 bg-white/25"
      />
      <ol className="relative space-y-3">
        {nodes.map((node, index) => {
          const from = SCATTER[index % SCATTER.length];
          return (
            <li
              key={node.title}
              style={{ "--dx": from.dx, "--dy": from.dy, "--r": from.r } as CSSProperties}
              className="[transform:translate(calc(var(--dx)*var(--spread)*var(--p,0)),calc(var(--dy)*1rem*var(--p,0)))_rotate(calc(var(--r)*1deg*var(--p,0)))] will-change-transform"
            >
              <Link
                href={node.href}
                className="group flex min-h-[3.75rem] items-stretch overflow-hidden rounded-full bg-canvas text-ink shadow-[0_1px_2px_rgb(13_6_36/0.08),0_6px_14px_-10px_rgb(13_6_36/0.3)] transition-transform duration-300 ease-out-soft hover:-translate-y-0.5 hover:scale-[1.02] motion-reduce:transform-none"
              >
                <span className="flex w-[5.5rem] shrink-0 items-center justify-center gap-2 text-accent-ink">
                  <span className="text-[0.8125rem] font-medium tabular-nums text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon name={node.icon} className="size-5" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col justify-center py-2.5 pl-4 pr-2">
                  <span className="font-display text-base font-medium leading-snug">
                    {node.title}
                  </span>
                  {node.caption && (
                    <span className="text-sm leading-snug text-muted">{node.caption}</span>
                  )}
                </span>
                <span className="flex items-center pr-5 text-muted transition-[color,transform] duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink">
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="size-5" />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      <m.p
        style={animated ? { opacity: settle, scale: settleScale } : undefined}
        className="relative mx-auto mt-4 flex w-fit items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 font-display text-base font-medium text-white"
      >
        <span aria-hidden="true" className="size-2 rounded-full bg-accent-soft" />
        {centerLabel}
      </m.p>
    </m.div>
  );
}
