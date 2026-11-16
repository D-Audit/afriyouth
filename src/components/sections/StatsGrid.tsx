import { StatCounter } from "@/components/ui/StatCounter";
import type { Stat } from "@/content/impact";

/** Figures on a dark surface. Each counts up when official numbers are set in impact.ts. */
export function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-10 min-[420px]:grid-cols-2">
      {stats.map((stat) => (
        <li key={stat.label} className="border-t border-night-line pt-6">
          <StatCounter stat={stat} />
        </li>
      ))}
    </ul>
  );
}
