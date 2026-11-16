import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Media } from "@/components/ui/Media";
import { StackedCards } from "@/components/ui/StackedCards";
import type { Service } from "@/content/services";

type ServiceStackProps = {
  services: Service[];
  /** Accessible name for the list. */
  label: string;
  linkLabel: string;
};

/**
 * The areas of work as a pile of large cards (icon, summary and a few of the services offered on the left,
 * a compact photo on the right). Each whole card links to its detail page.
 */
export function ServiceStack({ services, label, linkLabel }: ServiceStackProps) {
  const total = String(services.length).padStart(2, "0");
  return (
    <StackedCards
      label={label}
      items={services.map((service, index) => (
        <article
          key={service.slug}
          className="group relative grid overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[0_-10px_30px_-18px_rgb(13_6_36/0.18),0_1px_2px_rgb(13_6_36/0.04)] md:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)]"
        >
          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <div className="flex items-center justify-between gap-4">
              <FeatureIcon name={service.icon} />
              <p aria-hidden="true" className="text-sm font-medium tabular-nums text-muted">
                <span className="text-ink">{String(index + 1).padStart(2, "0")}</span> / {total}
              </p>
            </div>
            <h3 className="mt-6 font-display text-h2 md:pt-2">{service.title}</h3>
            <p className="mt-3 max-w-md text-lead text-muted text-pretty">{service.summary}</p>
            <ul className="mt-5 hidden flex-wrap gap-2 sm:flex">
              {service.offers
                .flatMap((group) => group.items)
                .slice(0, 5)
                .map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-canvas px-3 py-1 text-[0.8125rem] font-medium text-ink"
                  >
                    {item}
                  </li>
                ))}
            </ul>
            <Link
              href={`/services/${service.slug}`}
              className="mt-5 inline-flex min-h-11 items-center gap-2 self-start font-medium text-accent-ink after:absolute after:inset-0 after:rounded-[1.75rem]"
            >
              {linkLabel}
              <span className="sr-only">: {service.title}</span>
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div className="order-first p-3 pb-0 md:order-none md:flex md:items-center md:p-5 md:pl-0">
            <Media
              image={service.image}
              parallax={false}
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 336px, 94vw"
              className="aspect-[2/1] w-full rounded-[1.25rem] md:aspect-[4/3] [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-out-soft group-hover:[&_img]:scale-105"
            />
          </div>
        </article>
      ))}
    />
  );
}
