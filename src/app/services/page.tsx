import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { divisions, services, servicesPage } from "@/content/services";
import { ui } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(servicesPage.meta, "/services");

export default function ServicesPage() {
  const { hero, listIntro, divisionsIntro, detail } = servicesPage;
  return (
    <>
      <PageHero label={hero.label} heading={hero.heading} intro={hero.intro} />
      <Section labelledBy="areas-heading">
        <SectionHeading
          id="areas-heading"
          label={listIntro.label}
          heading={listIntro.heading}
          intro={listIntro.intro}
          className="mb-12"
        />
        <ServiceGrid services={services} linkLabel={ui.learnMore} />
      </Section>

      <Section tone="sand" labelledBy="divisions-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading
            id="divisions-heading"
            label={divisionsIntro.label}
            heading={divisionsIntro.heading}
            intro={divisionsIntro.intro}
            className="lg:col-span-4"
          />
          <Reveal className="lg:col-span-8">
            <div className="overflow-hidden rounded-card-lg border border-line bg-white shadow-soft">
              <table className="w-full text-left">
                <thead>
                  <tr className="label-caps border-b border-line text-muted">
                    <th scope="col" className="px-5 py-4 font-medium sm:px-7">
                      {divisionsIntro.divisionHeading}
                    </th>
                    <th scope="col" className="px-5 py-4 font-medium sm:px-7">
                      {divisionsIntro.productsHeading}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {divisions.map((division) => (
                    <tr key={division.title} className="align-top">
                      <th scope="row" className="px-5 py-5 font-normal sm:px-7">
                        <Link
                          href={division.href}
                          className="group inline-flex items-center gap-2 font-display text-[1.0625rem] font-semibold text-ink hover:text-accent-ink"
                        >
                          {division.title}
                          <ArrowRight
                            aria-hidden="true"
                            strokeWidth={1.5}
                            className="size-4 shrink-0 text-accent-ink transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
                          />
                        </Link>
                      </th>
                      <td className="px-5 py-5 text-muted sm:px-7">
                        {division.products.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted">{divisionsIntro.note}</p>
          </Reveal>
        </div>
      </Section>

      <CtaBand heading={detail.cta.heading} intro={detail.cta.intro} primary={detail.cta.primary} />
    </>
  );
}
