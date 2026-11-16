import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Pattern } from "@/components/ui/Pattern";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Headline, ImageSlot, LinkItem } from "@/content/types";
import { Breadcrumbs } from "./Breadcrumbs";``
type PageHeroProps = {
  label: string;
  heading: Headline;
  intro?: string;
  breadcrumbs?: LinkItem[];
  image?: ImageSlot;
  /** Buttons or other content shown under the intro. */
  children?: ReactNode;
  /** Optional element shown on the right on large screens (instead of an image). */
  aside?: ReactNode;
};

/** Top-of-page header used by every page except Home. Contains the page's only <h1>. */
export function PageHero({
  label,
  heading,
  intro,
  breadcrumbs,
  image,
  children,
  aside,
}: PageHeroProps) {
  const side = image ? (
    <Media
      image={image}
      eager
      sizes="(min-width: 1024px) 40vw, 100vw"
      className="aspect-[4/3] rounded-card-lg"
    />
  ) : (
    aside
  );

  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-1/3 text-accent/10 [mask-image:linear-gradient(to_left,black,transparent)] lg:block"
      >
        <Pattern />
      </div>
      <Container className="relative pb-14 pt-10 sm:pb-20 sm:pt-14">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={side ? "grid items-center gap-10 lg:grid-cols-12" : undefined}>
          <div className={side ? "lg:col-span-7" : undefined}>
            <div className="animate-rise">
              <SectionHeading as="h1" size="h1" label={label} heading={heading} intro={intro} />
            </div>
            {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          </div>
          {side && <div className="lg:col-span-5">{side}</div>}
        </div>
      </Container>
    </section>
  );
}
