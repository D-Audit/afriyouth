"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Inertia ("buttery") scrolling for mouse wheels and trackpads, powered by Lenis.
 * Lenis is driven from Motion's frame loop so scroll-linked animations (useScroll)
 * read the same position Lenis just wrote — no jitter. Touch devices keep native
 * scrolling, and users who ask for reduced motion get instant, 1:1 scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.085,
        wheelMultiplier: 0.95,
        anchors: { offset: -96 },
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
