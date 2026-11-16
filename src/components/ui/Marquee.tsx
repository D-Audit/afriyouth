import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Continuously scrolling row (pauses on hover/focus). The duplicate copy is hidden from
 * assistive technology. With reduced motion, items simply wrap and stay still.
 */
export function Marquee({ items, className }: { items: ReactNode[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-4 pr-4 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0"
    >
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "group/marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]",
        className,
      )}
    >
      <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
        {row(false)}
        <div className="contents motion-reduce:hidden">{row(true)}</div>
      </div>
    </div>
  );
}
