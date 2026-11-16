import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { PartnersStrip } from "@/components/sections/PartnersStrip";
import { StepList } from "@/components/sections/StepList";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPage } from "@/content/about";
import { partners, partnersStrip } from "@/content/partners";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(aboutPage.meta, "/about");

export default function AboutPage() {
  const { hero, story, mission, vision, different, values, approach, team, cta } = aboutPage;
  return (
    <>
      <PageHero label={hero.label} heading={hero.heading} intro={hero.intro} image={hero.image} />

      <Section labelledBy="story-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading
            id="story-heading"
            label={story.label}
            heading={story.heading}
            className="lg:col-span-5"
          />
          <div className="space-y-5 text-lead text-muted lg:col-span-7">
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {[mission, vision].map((statement, index) => (
            <Reveal key={statement.label} delay={index * 0.08}>
              <div
                data-surface={index === 0 ? "dark" : undefined}
                className={
                  index === 0
                    ? "grain h-full rounded-card-lg bg-duke bg-[radial-gradient(120%_120%_at_0%_100%,rgb(199_35_223/0.55),transparent_60%)] p-8 text-white sm:p-10"
                    : "h-full rounded-card-lg bg-sand p-8 sm:p-10"
                }
              >
                <h2
                  className={
                    index === 0 ? "label-caps text-pink-tint" : "label-caps text-accent-ink"
                  }
                >
                  {statement.label}
                </h2>
                <p className="mt-5 font-display text-h3">{statement.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="sand" labelledBy="different-heading">
        <SectionHeading
          id="different-heading"
          label={different.label}
          heading={different.heading}
          intro={different.intro}
          className="mb-12"
        />
        <FeatureCards items={different.points} columns={4} />
      </Section>

      <Section labelledBy="values-heading">
        <SectionHeading
          id="values-heading"
          label={values.label}
          heading={values.heading}
          intro={values.intro}
          className="mb-12"
        />
        <FeatureCards items={values.items} columns={3} />
      </Section>

      <Section tone="dark" labelledBy="approach-heading">
        <SectionHeading
          id="approach-heading"
          tone="dark"
          label={approach.label}
          heading={approach.heading}
          className="mb-14"
        />
        <StepList steps={approach.steps} tone="dark" />
      </Section>

      {(team.members.length > 0 || partners.length > 0) && (
        <Section labelledBy={team.members.length > 0 ? "team-heading" : undefined}>
          {team.members.length > 0 && (
            <>
              <SectionHeading
                id="team-heading"
                label={team.label}
                heading={team.heading}
                intro={team.intro || undefined}
                className="mb-12"
              />
              <ul className="grid gap-5 min-[420px]:grid-cols-2 lg:grid-cols-4">
                {team.members.map((member) => (
                  <li key={member.name}>
                    <Media
                      image={member.image}
                      sizes="(min-width: 1024px) 22vw, (min-width: 420px) 45vw, 100vw"
                      className="aspect-[1/1] rounded-card-lg"
                    />
                    <h3 className="mt-4 text-lg font-medium">{member.name}</h3>
                    <p className="text-muted">{member.role}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
          {partners.length > 0 && (
            <div className={team.members.length > 0 ? "mt-20" : undefined}>
              <PartnersStrip
                partners={partners}
                label={partnersStrip.label}
                intro={partnersStrip.intro}
              />
            </div>
          )}
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
