import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { ResourceExplorer } from "@/components/sections/ResourceExplorer";
import { StatsGrid } from "@/components/sections/StatsGrid";
import { StoryCard } from "@/components/sections/StoryCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  impactPage,
  measures,
  products,
  resourceTypes,
  resources,
  stats,
  stories,
} from "@/content/impact";
import { ui } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(impactPage.meta, "/impact");

export default function ImpactPage() {
  const { hero, productsIntro, measuresIntro, statsIntro, storiesIntro, resourcesIntro, cta } =
    impactPage;
  const liveStats = stats.filter((stat) => stat.value !== null);
  const [featured, ...rest] = stories;
  return (
    <>
      <PageHero label={hero.label} heading={hero.heading} intro={hero.intro} />

      <Section labelledBy="products-heading">
        <SectionHeading
          id="products-heading"
          label={productsIntro.label}
          heading={productsIntro.heading}
          intro={productsIntro.intro}
          className="mb-12"
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {products.map((product, index) => (
            <li key={product.title} className="flex">
              <Reveal delay={(index % 2) * 0.06} className="flex w-full">
                <Card interactive className="flex w-full flex-col">
                  <FeatureIcon name={product.icon} />
                  <h3 className="mt-5 font-display text-h3">{product.title}</h3>
                  <p className="mt-2 flex-1 text-muted">{product.description}</p>
                  <Link
                    href={product.href}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium text-accent-ink after:absolute after:inset-0 after:rounded-card-lg"
                  >
                    {ui.learnMore}
                    <span className="sr-only">: {product.title}</span>
                    <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
                  </Link>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark" labelledBy="measures-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="measures-heading"
              tone="dark"
              label={measuresIntro.label}
              heading={measuresIntro.heading}
              intro={measuresIntro.intro}
            />
            <Button
              href={measuresIntro.cta.href}
              variant="outline-light"
              icon="arrow"
              className="mt-8"
            >
              {measuresIntro.cta.label}
            </Button>
          </div>
          <div className="lg:col-span-7">
            <CheckList items={measures} tone="dark" />
          </div>
        </div>
        {liveStats.length > 0 && (
          <div className="mt-20 grid gap-12 border-t border-night-line pt-16 lg:grid-cols-12">
            <SectionHeading
              tone="dark"
              label={statsIntro.label}
              heading={statsIntro.heading}
              intro={statsIntro.intro || undefined}
              className="lg:col-span-5"
            />
            <div className="lg:col-span-7">
              <StatsGrid stats={liveStats} />
            </div>
          </div>
        )}
      </Section>

      {featured && (
        <Section labelledBy="stories-heading">
          <SectionHeading
            id="stories-heading"
            label={storiesIntro.label}
            heading={storiesIntro.heading}
            className="mb-12"
          />
          <Reveal>
            <StoryCard story={featured} layout="wide" />
          </Reveal>
          {rest.length > 0 && (
            <ul className="mt-5 grid gap-5 md:grid-cols-2">
              {rest.map((story, index) => (
                <li key={story.id}>
                  <Reveal delay={index * 0.08}>
                    <StoryCard story={story} />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </Section>
      )}

      {resources.length > 0 && (
        <Section tone="sand" labelledBy="resources-heading">
          <SectionHeading
            id="resources-heading"
            label={resourcesIntro.label}
            heading={resourcesIntro.heading}
            intro={resourcesIntro.intro}
            className="mb-10"
          />
          <ResourceExplorer
            resources={resources}
            types={resourceTypes}
            filterLabel={resourcesIntro.filterLegend}
          />
        </Section>
      )}

      <CtaBand
        heading={cta.heading}
        intro={cta.intro}
        primary={cta.primary}
        secondary={cta.secondary}
      />
    </>
  );
}
