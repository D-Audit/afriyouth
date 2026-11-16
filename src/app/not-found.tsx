import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Pattern } from "@/components/ui/Pattern";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { notFoundPage } from "@/content/legal";
import { mainNav } from "@/content/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: notFoundPage.meta.title,
  description: notFoundPage.meta.description,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 text-accent/10 [mask-image:radial-gradient(circle_at_70%_40%,black,transparent_65%)]"
      >
        <Pattern size={56} />
      </div>
      <Container className="relative py-24 sm:py-32">
        <SectionHeading
          as="h1"
          size="display"
          label={notFoundPage.label}
          heading={notFoundPage.heading}
          intro={notFoundPage.intro}
        />
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={notFoundPage.primary.href} icon="arrow">
            {notFoundPage.primary.label}
          </Button>
          <Button href={notFoundPage.secondary.href} variant="secondary">
            {notFoundPage.secondary.label}
          </Button>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-1">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center text-muted underline-offset-4 hover:text-ink hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
