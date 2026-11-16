"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type AccordionItem = { question: string; answer: string };

/** Disclosure list. Each header is a button with aria-expanded controlling its panel. */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left text-lg font-medium"
              >
                {item.question}
                <Plus
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={cn(
                    "size-5 shrink-0 text-accent-ink transition-transform duration-300 ease-out-soft",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 text-muted"
            >
              <p className="max-w-2xl">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
