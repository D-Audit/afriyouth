import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import type { Service } from "@/content/services";
import type { LinkItem } from "@/content/types";

type ServiceGridProps = {
  services: Service[];
  linkLabel: string;
  /** Optional dark call-to-action card appended after the services. */
  cta?: LinkItem & { text: string };
};

/** Grid of area-of-work cards; each whole card links to its detail page. */
export function ServiceGrid({ services, linkLabel, cta }: ServiceGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {services.map((service, index) => (
        <li key={service.slug} className="flex">
          <Reveal delay={(index % 4) * 0.06} className="flex w-full">
            <Card interactive className="flex w-full flex-col">
              <FeatureIcon name={service.icon} />
              <h3 className="mt-5 font-display text-h3">{service.title}</h3>
              <p className="mt-2 flex-1 text-muted">{service.summary}</p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium text-accent-ink after:absolute after:inset-0 after:rounded-card-lg"
              >
                {linkLabel}
                <span className="sr-only">: {service.title}</span>
                <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
              </Link>
            </Card>
          </Reveal>
        </li>
      ))}
      {cta && (
        <li className="flex">
          <Card tone="dark" interactive className="flex w-full flex-col justify-between">
            <p className="font-display text-h3">{cta.text}</p>
            <Link
              href={cta.href}
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-accent-soft after:absolute after:inset-0 after:rounded-card-lg"
            >
              {cta.label}
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
            </Link>
          </Card>
        </li>
      )}
    </ul>
  );
}
