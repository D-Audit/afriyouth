import { Card, type CardTone } from "@/components/ui/Card";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/cn";

type Feature = { icon?: IconName; title: string; description?: string };

/** Grid of icon + title + description cards (values, collaboration areas, audiences…). */
export function FeatureCards({
  items,
  tone = "light",
  columns = 3,
  className,
}: {
  items: Feature[];
  tone?: CardTone;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];
  const dark = tone === "dark";
  return (
    <ul className={cn("grid gap-4 lg:gap-5", cols, className)}>
      {items.map((item, index) => (
        <li key={item.title} className="flex">
          <Reveal delay={(index % columns) * 0.06} className="flex w-full">
            <Card tone={tone} className="w-full">
              {item.icon && <FeatureIcon name={item.icon} tone={dark ? "dark" : "accent"} />}
              <h3 className={cn("font-display text-h3", item.icon && "mt-5")}>{item.title}</h3>
              {item.description && (
                <p className={cn("mt-2", dark ? "text-on-night-muted" : "text-muted")}>
                  {item.description}
                </p>
              )}
            </Card>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
