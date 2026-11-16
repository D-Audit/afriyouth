import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/sections/CtaBand";

import { PartnersStrip } from "@/components/sections/PartnersStrip";
import { ProgramCard } from "@/components/sections/ProgramCard";

import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CardRail } from "@/components/ui/CardRail";
import { CheckList } from "@/components/ui/CheckList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partnerPage, partners, partnersStrip } from "@/content/partners";
import { programs } from "@/content/programs";
import { getService } from "@/content/services";
import { ui } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(partnerPage.meta, "/partner");

export default function PartnerPage() {
  const { hero, areas, faq, cta } = partnerPage;
  const partnerPrograms = programs;
  const fundingItems =
    getService("funding-readiness")?.offers.flatMap((group) => group.items) ?? [];

  return (
    <>
      <PageHero label={hero.label} heading={hero.heading} intro={hero.intro}>
        <Button href={hero.primary.href} icon="arrow">
          {hero.primary.label}
        </Button>
        <Button href={hero.secondary.href} variant="secondary">
          {hero.secondary.label}
        </Button>
      </PageHero>

      <Section labelledBy="areas-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="areas-heading"
              label={areas.label}
              heading={areas.heading}
              intro={areas.intro}
            />
            <Button href={areas.cta.href} variant="secondary" icon="arrow" className="mt-8">
              {areas.cta.label}
            </Button>
          </div>
          <div className="lg:col-span-7">
            <CheckList items={fundingItems} />
          </div>
        </div>
      </Section>

      <Section tone="sand" labelledBy="partner-programs-heading" className="overflow-hidden">
        <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="partner-programs-heading"
            label={partnerPage.programs.label}
            heading={partnerPage.programs.heading}
          />
          <Button
            href={partnerPage.programs.cta.href}
            variant="secondary"
            icon="arrow"
            className="self-start sm:self-auto"
          >
            {partnerPage.programs.cta.label}
          </Button>
        </div>
        <CardRail
          label={partnerPage.programs.label}
          items={partnerPrograms.map((program) => (
            <ProgramCard key={program.slug} program={program} linkLabel={ui.viewDetails} />
          ))}
        />
      </Section>

      {(faq.items.length > 0 || partners.length > 0) && (
        <Section labelledBy={faq.items.length > 0 ? "faq-heading" : undefined}>
          {faq.items.length > 0 && (
            <div className="grid gap-10 lg:grid-cols-12">
              <SectionHeading
                id="faq-heading"
                label={faq.label}
                heading={faq.heading}
                className="lg:col-span-4"
              />
              <Accordion items={faq.items} className="lg:col-span-8" />
            </div>
          )}
          {partners.length > 0 && (
            <div className={faq.items.length > 0 ? "mt-20" : undefined}>
              <PartnersStrip
                partners={partners}
                label={partnersStrip.label}
                intro={partnersStrip.intro}
              />
            </div>
          )}
        </Section>
      )}

      <CtaBand heading={cta.heading} intro={cta.intro} primary={cta.primary} />
    </>
  );
}
