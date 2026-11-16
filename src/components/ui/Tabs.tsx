"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type TabsProps = {
  label: string;
  tabs: { id: string; label: string; panel: ReactNode }[];
  className?: string;
};

/** WAI-ARIA tabs: arrow keys move between tabs, Home/End jump to first/last. */
export function Tabs({ label, tabs, className }: TabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function focusTab(index: number) {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, () => void> = {
      ArrowRight: () => focusTab(index + 1),
      ArrowLeft: () => focusTab(index - 1),
      Home: () => focusTab(0),
      End: () => focusTab(tabs.length - 1),
    };
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 py-1"
      >
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "min-h-11 shrink-0 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors duration-200 sm:px-5",
                selected
                  ? "border-ink bg-ink text-canvas"
                  : "border-ink/15 text-ink hover:bg-white",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={index !== active}
          tabIndex={0}
          className="mt-8 rounded-card-lg"
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
