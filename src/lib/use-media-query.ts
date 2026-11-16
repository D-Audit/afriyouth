"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Motion is allowed (the visitor has not asked the OS to reduce it). */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Subscribes to a CSS media query. The server render and the first client paint always
 * report `false`, so scroll-driven layouts start from their static, no-JavaScript-safe
 * form and only switch on once the browser confirms the query.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
