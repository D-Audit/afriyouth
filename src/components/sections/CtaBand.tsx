import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Pattern } from "@/components/ui/Pattern";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollScale } from "@/components/ui/ScrollScale";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Headline, LinkItem } from "@/content/types";

type CtaBandProps = {
  label?: string;
  heading: Headline;
  intro?: string;
  primary: LinkItem;
  secondary?: LinkItem;
  id?: string;
};

/** Closing call to action: a large centred statement on a dark panel with a rising accent glow. */
export function CtaBand({
  label,
  heading,
  intro,
  primary,
  secondary,
  id = "cta-heading",
}: CtaBandProps) {
  return (
    <section aria-labelledby={id} className="py-16 sm:py-24">
      <Container>
        <ScrollScale>
          <div
            data-surface="dark"
            className="grain relative overflow-hidden rounded-[2rem] bg-night px-6 py-16 text-on-night sm:px-12 sm:py-24 lg:py-28"
          >
            <div
              aria-hidden="true"
              className="absolute -bottom-[22rem] left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-accent/35 blur-[110px] motion-safe:animate-[glow-breathe_9s_ease-in-out_infinite]"
            />
            <Pattern className="text-on-night/[0.04]" size={56} />
            <div className="relative flex flex-col items-center gap-10">
              <SectionHeading
                id={id}
                tone="dark"
                align="center"
                size="h1"
                label={label}
                heading={heading}
                intro={intro}
              />
              <Reveal className="flex flex-wrap justify-center gap-3">
                <Button href={primary.href} size="lg" icon="arrow">
                  {primary.label}
                </Button>
                {secondary && (
                  <Button href={secondary.href} size="lg" variant="outline-light">
                    {secondary.label}
                  </Button>
                )}
              </Reveal>
            </div>
          </div>
        </ScrollScale>
      </Container>
    </section>
  );
}
