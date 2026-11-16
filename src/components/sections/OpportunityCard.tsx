import { CalendarClock, MapPin, Users } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Opportunity } from "@/content/opportunities";
import { cn } from "@/lib/cn";

type OpportunityCardProps = {
  opportunity: Opportunity;
  labels: { deadline: string; location: string; audience: string };
  audienceLabel: string;
  headingLevel?: "h2" | "h3";
  className?: string;
};

/** An opportunity with its status, key facts and one clear next-step button. */
export function OpportunityCard({
  opportunity,
  labels,
  audienceLabel,
  headingLevel = "h3",
  className,
}: OpportunityCardProps) {
  const Heading = headingLevel;
  const closed = opportunity.status === "closed";
  const facts = [
    { icon: CalendarClock, label: labels.deadline, value: opportunity.deadline },
    { icon: MapPin, label: labels.location, value: opportunity.location },
    { icon: Users, label: labels.audience, value: audienceLabel },
  ].filter((fact) => fact.value);

  return (
    <article
      className={cn(
        "flex w-full flex-col rounded-card-lg border p-6 transition-[transform,box-shadow] duration-300 ease-out-soft sm:p-7",
        closed
          ? "border-line bg-sand/60"
          : "border-line bg-white shadow-soft hover:-translate-y-1 hover:shadow-lift motion-reduce:transform-none",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="label-caps min-w-0 truncate text-accent-ink">{opportunity.type}</p>
        <StatusBadge status={opportunity.status} />
      </div>
      <Heading className="mt-3 font-display text-h3">{opportunity.title}</Heading>
      <p className="mt-2 line-clamp-3 min-h-[3lh] text-muted">{opportunity.summary}</p>
      <dl className="mt-5 flex-1 space-y-2 border-t border-line pt-5 text-sm">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-start gap-2.5">
            <fact.icon
              aria-hidden="true"
              strokeWidth={1.5}
              className="mt-0.5 size-4 shrink-0 text-accent-ink"
            />
            <dt className="text-muted">{fact.label}:</dt>
            <dd className="font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <Button
        href={opportunity.nextStep.href}
        variant={closed ? "secondary" : "primary"}
        icon="arrow"
        className="mt-6 self-start"
      >
        {opportunity.nextStep.label}
      </Button>
    </article>
  );
}
