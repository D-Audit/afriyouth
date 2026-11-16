import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { OpportunityCard } from "@/components/sections/OpportunityCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { opportunities, opportunitiesPage } from "@/content/opportunities";
import { ui } from "@/content/site";
import { audienceLabel } from "@/lib/content-helpers";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(opportunitiesPage.meta, "/opportunities");

const statusOrder = { open: 0, upcoming: 1, closed: 2 } as const;

export default function OpportunitiesPage() {
  const { hero, listIntro, labels, empty, alerts } = opportunitiesPage;
  const sorted = [...opportunities].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  return (
    <>
      <PageHero label={hero.label} heading={hero.heading} intro={hero.intro} />

      {sorted.length > 0 ? (
        <Section labelledBy="calls-heading">
          <SectionHeading
            id="calls-heading"
            label={listIntro.label}
            heading={listIntro.heading}
            className="mb-12"
          />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((opportunity) => (
              <li key={opportunity.id} className="flex">
                <OpportunityCard
                  opportunity={opportunity}
                  labels={labels}
                  audienceLabel={audienceLabel(opportunity.audience)}
                />
              </li>
            ))}
          </ul>
        </Section>
      ) : (
        <Section>
          <p className="text-lead text-muted">{empty}</p>
          <Button href="/programs" icon="arrow" className="mt-6">
            {ui.viewPrograms}
          </Button>
        </Section>
      )}

      <CtaBand heading={alerts.heading} intro={alerts.intro} primary={alerts.cta} />
    </>
  );
}
