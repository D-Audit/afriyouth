import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import { Section } from "@/components/layout/Section";
import { StageGrid } from "@/components/sections/StageGrid";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { FlowSteps } from "@/components/ui/FlowSteps";
import { Media } from "@/components/ui/Media";
import { getProgram, programs, programsPage, type ProgramSection } from "@/content/programs";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();
  return pageMetadata(
    { title: program.name, description: program.summary },
    `/programs/${program.slug}`,
  );
}

function DetailBlock({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line pt-10">
      <h2 id={id} className="font-display text-h2">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** Renders one content section of a program in the layout chosen in programs.ts. */
function SectionBody({ section }: { section: ProgramSection }) {
  const titles = section.items.map((item) => item.title);
  switch (section.layout) {
    case "stages":
      return <StageGrid stages={section.items} columns={2} headingLevel="h3" />;
    case "flow":
      return <FlowSteps steps={titles} />;
    case "list":
      return <CheckList items={titles} />;
    case "chips":
      return (
        <ul className="flex flex-wrap gap-2">
          {titles.map((title) => (
            <li
              key={title}
              className="rounded-full bg-accent-tint px-4 py-2 font-medium text-accent-ink"
            >
              {title}
            </li>
          ))}
        </ul>
      );
    case "cards":
      return (
        <ul className="grid gap-4 sm:grid-cols-2">
          {section.items.map((item) => (
            <li
              key={item.title}
              className="rounded-card border border-line bg-white p-5 shadow-soft"
            >
              <h3 className="font-display text-[1.0625rem]">{item.title}</h3>
              {item.description && <p className="mt-2 text-muted">{item.description}</p>}
            </li>
          ))}
        </ul>
      );
  }
}

export default function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProgramPageContent params={params} />
    </Suspense>
  );
}

async function ProgramPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const { detail, hero } = programsPage;
  const service = getService(program.topic);

  return (
    <>
      <PageHero
        label={program.format}
        heading={{ title: program.name }}
        intro={program.summary}
        breadcrumbs={[
          { label: hero.label, href: "/programs" },
          { label: program.name, href: `/programs/${program.slug}` },
        ]}
      >
        {program.status && <StatusBadge status={program.status} />}
      </PageHero>

      <Section className="pt-12 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-8">
            <Media
              image={program.image}
              eager
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="aspect-[16/9] rounded-card-lg"
            />

            <DetailBlock id="overview" title={detail.overviewLabel}>
              <div className="space-y-4 text-lead text-muted">
                {program.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {program.highlight && (
                <figure className="mt-8 overflow-hidden rounded-card-lg bg-brand-gradient p-7 text-white sm:p-9">
                  <figcaption className="label-caps text-white/85">
                    {program.highlight.label}
                  </figcaption>
                  <blockquote className="mt-3 font-display text-h2 text-balance">
                    “{program.highlight.text}”
                  </blockquote>
                </figure>
              )}
            </DetailBlock>

            {program.sections.map((section) => (
              <DetailBlock key={section.id} id={section.id} title={section.title}>
                {section.intro && (
                  <p className="-mt-2 mb-7 max-w-2xl text-lead text-muted">{section.intro}</p>
                )}
                <SectionBody section={section} />
              </DetailBlock>
            ))}

            {program.whoCanJoin && (
              <DetailBlock id="who" title={detail.whoLabel}>
                <ul className="flex flex-wrap gap-2">
                  {program.whoCanJoin.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-white px-4 py-2 font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </DetailBlock>
            )}
            {!program.whoCanJoin && (
              <DetailBlock id="eligibility-dates" title={detail.eligibilityDatesLabel}>
                <p className="text-lead text-muted">{detail.pendingNote}</p>
              </DetailBlock>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div
              data-surface="dark"
              className="rounded-card-lg bg-night p-7 text-on-night shadow-lift lg:sticky lg:top-24"
            >
              {program.status && (
                <div className="mb-5 flex items-center justify-between gap-3">
                  <p className="label-caps text-on-night-muted">{detail.statusLabel}</p>
                  <StatusBadge status={program.status} />
                </div>
              )}
              {program.outcome && (
                <p className="mb-6 flex items-baseline justify-between gap-3 border-b border-night-line pb-5">
                  <span className="label-caps text-on-night-muted">{program.outcome.label}</span>
                  <span className="text-right font-medium">{program.outcome.value}</span>
                </p>
              )}
              <h2 className="font-display text-h3">{detail.applyHeading}</h2>
              <p className="mt-2 text-sm text-on-night-muted">{program.apply.note}</p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href={program.apply.href} icon="arrow" className="w-full">
                  {program.apply.label}
                </Button>
                <Button href={detail.questions.href} variant="outline-light" className="w-full">
                  {detail.questions.label}
                </Button>
              </div>
              {service && (
                <p className="mt-6 border-t border-night-line pt-5 text-sm text-on-night-muted">
                  {detail.relatedLabel}:{" "}
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-medium text-accent-soft underline-offset-4 hover:underline"
                  >
                    {service.title}
                  </Link>
                </p>
              )}
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
