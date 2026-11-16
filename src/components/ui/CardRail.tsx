"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ui } from "@/content/site";

/**
 * Horizontally scrollable row of cards with snap points. Works with touch, trackpad,
 * keyboard (Tab moves through cards; the region is focusable for arrow-key scrolling)
 * and the previous/next buttons.
 */
export function CardRail({ label, items }: { label: string; items: ReactNode[] }) {
  const scroller = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const node = scroller.current;
    if (!node) return;
    setEdges({
      start: node.scrollLeft <= 4,
      end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(node);
    node.addEventListener("scroll", updateEdges, { passive: true });
    return () => {
      observer.disconnect();
      node.removeEventListener("scroll", updateEdges);
    };
  }, [updateEdges]);

  function scrollByPage(direction: 1 | -1) {
    const node = scroller.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({
      left: direction * node.clientWidth * 0.85,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  const buttonClass =
    "inline-flex size-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink/5 disabled:opacity-35 disabled:hover:bg-transparent";

  return (
    <div>
      <div className="mb-5 hidden justify-end gap-2 sm:flex">
        <button
          type="button"
          className={buttonClass}
          onClick={() => scrollByPage(-1)}
          disabled={edges.start}
          aria-label={ui.scrollPrev}
        >
          <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => scrollByPage(1)}
          disabled={edges.end}
          aria-label={ui.scrollNext}
        >
          <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-5" />
        </button>
      </div>
      <ul
        ref={scroller}
        role="list"
        aria-label={label}
        tabIndex={0}
        // Bleeds to the right edge of the viewport so cards slide out of view naturally.
        className="scrollbar-none -mr-[calc(50vw-50%)] flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pr-[calc(50vw-50%)] pt-1 sm:gap-5"
      >
        {items.map((item, index) => (
          <li key={index} className="flex w-[82%] shrink-0 snap-start sm:w-[22rem]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
