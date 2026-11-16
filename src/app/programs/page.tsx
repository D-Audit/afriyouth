import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ProgramExplorer } from "@/components/sections/ProgramExplorer";
import { programs, programsPage, statusOptions, topicOptions } from "@/content/programs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(programsPage.meta, "/programs");

export default function ProgramsPage() {
  const { hero, filters } = programsPage;
  return (
    <>
      <PageHero label={hero.label} heading={hero.heading} intro={hero.intro} />
      <Section className="pt-12 sm:pt-16">
        <ProgramExplorer
          programs={programs}
          labels={filters}

          topicOptions={topicOptions}
          statusOptions={statusOptions.filter((option) =>
            programs.some((program) => program.status === option.value),
          )}
        />
      </Section>
    </>
  );
}
