import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { ConnectsAssemble } from "@/components/sections/ConnectsAssemble";
import { CtaBand } from "@/components/sections/CtaBand";
import { HomeHero } from "@/components/sections/HomeHero";
import { PartnersStrip } from "@/components/sections/PartnersStrip";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { ServiceStack } from "@/components/sections/ServiceStack";
import { StageGrid } from "@/components/sections/StageGrid";
import { StatsGrid } from "@/components/sections/StatsGrid";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollGallery } from "@/components/ui/ScrollGallery";
import { ScrollScale } from "@/components/ui/ScrollScale";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPage } from "@/content/about";
import { contactDetails } from "@/content/contact";
import { homePage } from "@/content/home";
import { stats } from "@/content/impact";
import { partners, partnersStrip } from "@/content/partners";
import { getProgram, programs } from "@/content/programs";
import { services } from "@/content/services";
import { site, ui } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata(homePage.meta, "/"),
  title: { absolute: homePage.meta.title },
};

function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    ...(contactDetails.email.display ? { email: contactDetails.email.display } : {}),
    ...(site.social.length > 0 ? { sameAs: site.social.map((social) => social.href) } : {}),
    logo: `${site.url}/icon.svg`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function HomePage() {
  const { connects, whatWeDo, flagship, programsRail, why, finalCta } = homePage;
  const flagshipStages =
    getProgram(flagship.programSlug)?.sections.find(
      (section) => section.id === flagship.stagesSectionId,
    )?.items ?? [];
  const hasStats = stats.some((stat) => stat.value !== null);

  return (
    <>
      <OrganizationJsonLd />
      <HomeHero content={homePage.hero} marqueeWords={homePage.hero.marquee} />

      <section
        aria-labelledby="connects-heading"
        data-surface="dark"
        className="bg-brand-blend relative overflow-hidden py-14 text-white sm:py-20"
      >
        <div className="container-site relative">
          <SectionHeading
            id="connects-heading"
            tone="accent"
            align="center"
            size="h2"
            fontClassName="font-display font-medium"
            introClassName="text-base leading-relaxed"
            label={connects.label}
            heading={connects.heading}
            intro={connects.intro}
          />
          <div className="mt-10 sm:mt-14">
            <ConnectsAssemble nodes={connects.areas} centerLabel={connects.centerLabel} />
          </div>
        </div>
      </section>

      <Section labelledBy="services-heading" className="sm:pb-28">
        <SectionHeading
          id="services-heading"
          label={whatWeDo.label}
          heading={whatWeDo.heading}
          intro={whatWeDo.intro}
          className="mb-10 md:mb-14"
        />
        <ServiceStack services={services} label={whatWeDo.label} linkLabel={ui.learnMore} />
        <Reveal className="mt-10 flex flex-col items-start gap-4 rounded-card-lg bg-sand p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl font-display text-h3">{whatWeDo.ctaCard}</p>
          <Button href={whatWeDo.cta.href} variant="primary" icon="arrow" className="shrink-0">
            {whatWeDo.cta.label}
          </Button>
        </Reveal>
      </Section>

      <section aria-labelledby="flagship-heading" className="pb-4">
        <div className="container-site">
          <ScrollScale>
            <div
              data-surface="dark"
              className="grain relative overflow-hidden rounded-[2rem] bg-night px-5 py-14 text-on-night sm:px-10 sm:py-20 lg:px-14"
            >
              <div
                aria-hidden="true"
                className="absolute -right-40 -top-56 size-[32rem] rounded-full bg-accent/30 blur-[110px]"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-64 -left-40 size-[28rem] rounded-full bg-pink/15 blur-[110px]"
              />
              <div className="relative">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <SectionHeading
                    id="flagship-heading"
                    tone="dark"
                    label={flagship.label}
                    heading={flagship.heading}
                    intro={flagship.intro}
                  />
                  <Button
                    href={flagship.cta.href}
                    variant="inverse"
                    icon="arrow"
                    className="shrink-0 self-start lg:self-auto"
                  >
                    {flagship.cta.label}
                  </Button>
                </div>
                <StageGrid stages={flagshipStages} tone="dark" className="mt-12" />
              </div>
            </div>
          </ScrollScale>
        </div>
      </section>

      <ScrollGallery
        labelledBy="programs-heading"
        label={programsRail.railLabel}
        header={
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="programs-heading"
              label={programsRail.label}
              heading={programsRail.heading}
            />
            <Button
              href={programsRail.cta.href}
              variant="secondary"
              icon="arrow"
              className="self-start sm:self-auto"
            >
              {programsRail.cta.label}
            </Button>
          </div>
        }
        items={programs.map((program) => (
          <ProgramCard key={program.slug} program={program} linkLabel={ui.viewDetails} />
        ))}
      />

      <section aria-labelledby="why-heading" className="pb-20 sm:pb-24">
        <div className="container-site">
          <ScrollScale>
            <div
              data-surface="dark"
              className="bg-brand-blend relative overflow-hidden rounded-[2rem] px-6 py-16 text-white sm:px-12 sm:py-20 lg:px-16"
            >
              <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-7">
                  <SectionHeading
                    id="why-heading"
                    tone="accent"
                    size="h1"
                    label={why.label}
                    heading={why.heading}
                    intro={why.intro}
                  />
                  <Button href={why.cta.href} variant="inverse" icon="arrow" className="mt-10">
                    {why.cta.label}
                  </Button>
                </div>
                <div className="space-y-4 lg:col-span-5">
                  {[aboutPage.mission, aboutPage.vision].map((statement, index) => (
                    <Reveal key={statement.label} delay={index * 0.08}>
                      <div className="rounded-card-lg border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:p-7">
                        <h3 className="label-caps text-pink-tint">{statement.label}</h3>
                        <p className="mt-3 text-[1.0625rem] leading-relaxed text-white">
                          {statement.text}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              {hasStats && (
                <div className="relative mt-14 [&_li]:border-white/20 [&_p+p]:text-white/80">
                  <StatsGrid stats={stats.filter((stat) => stat.value !== null)} />
                </div>
              )}
            </div>
          </ScrollScale>
        </div>
      </section>

      {partners.length > 0 && (
        <section className="pb-20 sm:pb-24">
          <div className="container-site">
            <PartnersStrip
              partners={partners}
              label={partnersStrip.label}
              intro={partnersStrip.intro}
            />
          </div>
        </section>
      )}

      <CtaBand
        label={finalCta.label}
        heading={finalCta.heading}
        intro={finalCta.intro}
        primary={finalCta.primary}
        secondary={finalCta.secondary}
      />
    </>
  );
}
