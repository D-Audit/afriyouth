import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import type { privacyPage } from "@/content/legal";

type LegalPage = typeof privacyPage;

/** Shared layout for the privacy and terms placeholder pages. */
export function LegalContent({ page }: { page: LegalPage }) {
  return (
    <>
      <PageHero label={page.label} heading={page.heading} intro={page.updated} />
      <Section className="pt-12 sm:pt-16">
        <div className="max-w-3xl">
          <p
            role="note"
            className="rounded-card bg-accent-tint px-5 py-4 font-medium text-accent-ink"
          >
            {page.notice}
          </p>
          <div className="mt-12 space-y-10">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-h3">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
