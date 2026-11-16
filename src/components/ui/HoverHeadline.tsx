"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import { cn } from "@/lib/cn";

const RADIUS = 110; // px around the cursor that letters react to
const PUSH = 16; // max sideways push in px
const SPAWN_EVERY = 70; // px of cursor travel between photo tiles
const TILE = 56; // tile size in px

type Letter = { el: HTMLSpanElement; x: number; y: number };

/** Writes a letter's offset straight to the DOM (no React re-render per mouse move). */
function styleLetter(el: HTMLElement, transform: string, opacity: string) {
  el.style.transform = transform;
  el.style.opacity = opacity;
}

/**
 * Hero headline with a hover interaction: letters near the cursor part and dim, and small
 * photo tiles pop up along the cursor's path, then fade. Text keeps its normal size.
 * Only for precise pointers (mouse/trackpad) with motion allowed; otherwise it is a plain
 * headline. The visible letters are split for animation, the h1's accessible name is the
 * full sentence.
 */
export function HoverHeadline({
  title,
  emphasis,
  photos,
  className,
}: {
  title: string;
  emphasis?: string;
  photos: string[];
  className?: string;
}) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const letters = useRef<Letter[]>([]);
  const last = useRef<{ x: number; y: number } | null>(null);
  const nextTile = useRef(0);
  const frame = useRef(0);
  const enabled = useRef(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => (enabled.current = query.matches);
    update();
    query.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  // Letter centres relative to the headline, measured on entry (layout can change on resize).
  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const box = root.getBoundingClientRect();
    letters.current = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-letter]")).map(
      (el) => {
        const r = el.getBoundingClientRect();
        return { el, x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      },
    );
  }, []);

  const spawnTile = useCallback(
    (x: number, y: number) => {
      const tile = tilesRef.current[nextTile.current % photos.length];
      nextTile.current += 1;
      if (!tile) return;
      const rotate = (Math.random() - 0.5) * 16;
      tile.style.left = `${x - TILE / 2}px`;
      tile.style.top = `${y - TILE / 2}px`;
      tile.getAnimations().forEach((animation) => animation.cancel());
      tile.animate(
        [
          { opacity: 0, transform: `scale(0.4) rotate(${rotate}deg)` },
          { opacity: 1, transform: `scale(1) rotate(${rotate}deg)`, offset: 0.25 },
          { opacity: 1, transform: `scale(1) rotate(${rotate}deg)`, offset: 0.7 },
          { opacity: 0, transform: `scale(0.85) translateY(-8px) rotate(${rotate}deg)` },
        ],
        { duration: 1100, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    },
    [photos.length],
  );

  function onPointerEnter() {
    if (!enabled.current) return;
    measure();
    last.current = null;
  }

  function onPointerMove(event: PointerEvent<HTMLHeadingElement>) {
    if (!enabled.current || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      for (const letter of letters.current) {
        const dx = letter.x - x;
        const dy = letter.y - y;
        const p = Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
        const eased = p * p;
        styleLetter(
          letter.el,
          eased ? `translateX(${Math.sign(dx) * eased * PUSH}px)` : "",
          eased ? String(1 - eased * 0.7) : "",
        );
      }
    });

    const prev = last.current;
    if (!prev || Math.hypot(x - prev.x, y - prev.y) > SPAWN_EVERY) {
      if (prev) spawnTile(x, y);
      last.current = { x, y };
    }
  }

  function onPointerLeave() {
    cancelAnimationFrame(frame.current);
    for (const letter of letters.current) {
      styleLetter(letter.el, "", "");
    }
    last.current = null;
  }

  const renderWords = (text: string) =>
    text.split(" ").map((word, w, words) => (
      <span key={w}>
        <span className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, c) => (
            <span
              key={c}
              data-letter
              className="inline-block transition-[transform,opacity] duration-500 ease-out-soft"
            >
              {char}
            </span>
          ))}
        </span>
        {w < words.length - 1 && " "}
      </span>
    ));

  const label = emphasis ? `${title} ${emphasis}` : title;

  return (
    <h1
      ref={rootRef}
      aria-label={label}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("relative", className)}
    >
      <span aria-hidden="true">
        {renderWords(title)}
        {emphasis && (
          <>
            {" "}
            <span className="highlight">{renderWords(emphasis)}</span>
          </>
        )}
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0">
        {photos.map((src, index) => (
          <div
            key={src}
            ref={(node) => {
              tilesRef.current[index] = node;
            }}
            className="absolute overflow-hidden rounded-xl opacity-0 shadow-lift ring-1 ring-black/5"
            style={{ width: TILE, height: TILE }}
          >
            <Image src={src} alt="" fill sizes={`${TILE}px`} className="object-cover" />
          </div>
        ))}
      </span>
    </h1>
  );
}
