import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageHero } from "@/components/layout/PageHero";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import { FlowSteps } from "@/components/ui/FlowSteps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { programs } from "@/content/programs";
import { getService, services, servicesPage } from "@/content/services";
import { ui } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return pageMetadata(
    { title: service.title, description: service.summary },
    `/services/${service.slug}`,
  );
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ServicePageContent params={params} />
    </Suspense>
  );
}

async function ServicePageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { detail, hero } = servicesPage;
  const related = programs.filter((program) => program.topic === service.slug);
  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <PageHero
        label={service.title}
        heading={service.heading}
        intro={service.intro}
        image={service.image}
        breadcrumbs={[
          { label: hero.label, href: "/services" },
          { label: service.title, href: `/services/${service.slug}` },
        ]}
      >
        <Button href={detail.cta.primary.href} icon="arrow">
          {detail.cta.primary.label}
        </Button>
      </PageHero>

      <Section labelledBy="offers-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              id="offers-heading"
              label={detail.offersLabel}
              heading={detail.offersHeading}
              className="mb-10"
            />
            <div className="space-y-10">
              {service.offers.map((group, index) => (
                <div key={group.title ?? index}>
                  {group.title && <h3 className="mb-4 font-display text-h3">{group.title}</h3>}
                  <CheckList items={group.items} />
                </div>
              ))}
            </div>
            {service.model && (
              <div className="mt-12 rounded-card-lg bg-sand p-6 sm:p-8">
                <h3 className="label-caps text-muted">{service.model.label}</h3>
                <FlowSteps steps={service.model.steps} className="mt-4" />
              </div>
            )}
          </div>
          <aside className="space-y-4 lg:col-span-4 lg:pt-24">
            {service.products.length > 0 && (
              <Card tone="dark" className="grain overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute -right-24 -top-24 size-56 rounded-full bg-accent/60 blur-[70px]"
                />
                <div className="relative">
                  <h2 className="label-caps text-accent-soft">
                    {service.products.length > 1
                      ? detail.productsLabelPlural
                      : detail.productsLabel}
                  </h2>
                  <ul className="mt-5 space-y-5">
                    {service.products.map((product) => (
                      <li key={product.name} className="border-t border-night-line pt-5">
                        <p className="font-display text-h3">{product.name}</p>
                        {product.description && (
                          <p className="mt-2 text-on-night-muted">{product.description}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}
          </aside>
        </div>
      </Section>

      <Section tone="sand" labelledBy="related-heading">
        <h2 id="related-heading" className="font-display text-h2">
          {detail.relatedLabel}
        </h2>
        {related.length > 0 ? (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((program) => (
              <li key={program.slug} className="flex">
                <ProgramCard program={program} linkLabel={ui.viewDetails} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-muted">{detail.relatedEmpty}</p>
        )}

        <h2 className="label-caps mt-16 text-muted">{detail.otherAreasLabel}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/services/${item.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-ink/15 bg-white px-4 text-sm font-medium transition-colors hover:border-ink"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        heading={detail.cta.heading}
        intro={detail.cta.intro}
        primary={detail.cta.primary}
        secondary={detail.cta.secondary}
      />
    </>
  );
}
