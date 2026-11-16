"use client";

import * as m from "motion/react-m";
import { useLenis } from "lenis/react";
import {
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type ReactNode,
} from "react";
import { MOTION_OK, useMediaQuery } from "@/lib/use-media-query";
import { CardRail } from "./CardRail";

type Layout = { distance: number; view: number; cards: { left: number; width: number }[] };

const PIN_QUERY = `(min-width: 1024px) and ${MOTION_OK}`;

type ScrollGalleryProps = {
  /** Section heading and actions, shown above the cards while they slide. */
  header: ReactNode;
  /** Accessible name for the list of cards. */
  label: string;
  items: ReactNode[];
  /** Heading id that names the section. */
  labelledBy?: string;
};

/**
 * Pinned horizontal gallery. On desktop the section sticks to the screen and vertical
 * scrolling slides the cards sideways; once the last card is in view the page carries on.
 * On phones/tablets, and for reduced-motion users, it falls back to the swipeable CardRail.
 */
export function ScrollGallery({ header, label, items, labelledBy }: ScrollGalleryProps) {
  const pinned = useMediaQuery(PIN_QUERY);

  if (!pinned) {
    return (
      <section aria-labelledby={labelledBy} className="overflow-hidden py-14 sm:py-20">
        <div className="container-site">
          <div className="mb-6">{header}</div>
          <CardRail label={label} items={items} />
        </div>
      </section>
    );
  }

  return <PinnedGallery header={header} label={label} items={items} labelledBy={labelledBy} />;
}

function PinnedGallery({ header, label, items, labelledBy }: ScrollGalleryProps) {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [layout, setLayout] = useState<Layout>({ distance: 0, view: 0, cards: [] });
  const { distance } = layout;
  const [active, setActive] = useState(0);
  const lenis = useLenis();

  // Horizontal travel = how far the row of cards overflows its container.
  // Card positions are kept so each card can zoom by how far it sits outside the view.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const cards = Array.from(track.children as HTMLCollectionOf<HTMLElement>).map((node) => ({
        left: node.offsetLeft,
        width: node.offsetWidth,
      }));
      setLayout({
        distance: Math.max(0, track.scrollWidth - track.clientWidth),
        view: track.clientWidth,
        cards,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });
  const x = useTransform(smooth, (value) => -value * distance);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.min(items.length - 1, Math.round(value * (items.length - 1))));
  });

  // Keyboard users: tabbing to an off-screen card scrolls the page so that card slides in.
  const onFocus = useCallback(
    (event: FocusEvent<HTMLUListElement>) => {
      const outer = outerRef.current;
      const card = (event.target as HTMLElement).closest("li");
      if (!outer || !card || distance === 0) return;
      const offset = Math.min(distance, Math.max(0, card.offsetLeft));
      const top = outer.getBoundingClientRect().top + window.scrollY + offset;
      if (lenis) lenis.scrollTo(top, { immediate: true });
      else window.scrollTo({ top });
    },
    [distance, lenis],
  );

  const total = String(items.length).padStart(2, "0");

  return (
    <section
      ref={outerRef}
      aria-labelledby={labelledBy}
      className="relative"
      // One pixel of vertical scroll moves the cards one pixel sideways.
      style={{ height: `calc(100dvh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden pt-[4.5rem]">
        <div className="container-site">
          <div className="mb-8">{header}</div>
          <m.ul
            ref={trackRef}
            role="list"
            aria-label={label}
            onFocus={onFocus}
            style={{ x }}
            className="flex gap-5 will-change-transform"
          >
            {items.map((item, index) => (
              <GalleryCard key={index} x={x} view={layout.view} card={layout.cards[index]}>
                {item}
              </GalleryCard>
            ))}
          </m.ul>
          <div aria-hidden="true" className="mt-8 flex items-center gap-4 text-sm text-muted">
            <span className="w-14 font-medium tabular-nums text-ink">
              {String(active + 1).padStart(2, "0")}
              <span className="text-muted"> / {total}</span>
            </span>
            <div className="h-px flex-1 overflow-hidden bg-line">
              <m.div style={{ scaleX: smooth }} className="h-full origin-left bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One card in the pinned row. The card and its text stay still and crisp; only the photo
 * zooms. Photos enter from the right at 130% and settle to 100% as they travel left,
 * via the `--zoom` variable that Media reads.
 */
function GalleryCard({
  x,
  view,
  card,
  children,
}: {
  x: MotionValue<number>;
  view: number;
  card?: { left: number; width: number };
  children: ReactNode;
}) {
  const zoom = useTransform(x, (value) => {
    if (!card || !view) return 1;
    const center = card.left + value + card.width / 2;
    const t = Math.min(1, Math.max(0, center / view)); // 0 = left edge, 1 = right edge
    return 1 + 0.3 * t * t;
  });
  const style = { "--zoom": zoom } as MotionStyle;

  return (
    <m.li style={style} className="flex w-[22rem] shrink-0 xl:w-[23.5rem]">
      {children}
    </m.li>
  );
}
