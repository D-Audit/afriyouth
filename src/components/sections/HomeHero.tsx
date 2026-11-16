import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HoverHeadline } from "@/components/ui/HoverHeadline";
import { Media } from "@/components/ui/Media";
import { ScrollDrift } from "@/components/ui/ScrollDrift";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";
import type { homePage } from "@/content/home";
import { HeroStage } from "./HeroStage";

type HeroContent = (typeof homePage)["hero"];

/** Position in the entrance sequence; each step starts 90ms after the one before. */
const step = (index: number) => ({ "--i": index }) as CSSProperties;

/**
 * Home hero: a centred statement (community line, headline, intro, audience paths) above a
 * large photo stage that grows as the page scrolls, closed by the moving band of work areas.
 */
export function HomeHero({
  content,
  marqueeWords,
}: {
  content: HeroContent;
  /** Words for the moving band along the bottom of the hero. */
  marqueeWords: string[];
}) {
  const { heading, floatingCard, community } = content;
  return (
    <section className="relative isolate -mt-[4.5rem] overflow-hidden bg-canvas pt-[4.5rem]">
      {/* Atmosphere: two soft colour glows and a faint grid that fades out from the top. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-48 -top-56 size-[42rem] rounded-full bg-pink/15 blur-[120px]" />
        <div className="absolute -left-56 top-40 size-[34rem] rounded-full bg-accent-tint/70 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(13_6_36/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(13_6_36/0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]" />
      </div>

      <Container className="pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pt-16">
        <ScrollDrift className="mx-auto flex max-w-[54rem] flex-col items-center text-center">
          <div
            style={step(0)}
            className="hero-in flex max-w-full items-center gap-3 rounded-full border border-line bg-white/70 py-1.5 pl-1.5 pr-4 shadow-[0_1px_2px_rgb(13_6_36/0.04)] backdrop-blur"
          >
            <ul aria-hidden="true" className="flex shrink-0">
              {community.photos.map((src, index) => (
                <li
                  key={src}
                  className="relative -ml-2 size-7 overflow-hidden rounded-full ring-2 ring-white first:ml-0"
                  style={{ zIndex: community.photos.length - index }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="28px"
                    loading="eager"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
            <p className="text-left text-[0.8125rem] font-medium leading-snug text-ink">
              {community.text}
            </p>
          </div>

          <div className="hero-rise mt-7">
            <HoverHeadline
              title={heading.title}
              emphasis={heading.emphasis}
              photos={content.hoverPhotos}
              className="font-display text-hero font-medium text-balance"
            />
          </div>
          <p style={step(2)} className="hero-in mt-6 max-w-2xl text-lead text-muted text-pretty">
            {content.intro}
          </p>
          <div style={step(3)} className="hero-in mt-9 w-full">
            {content.pathsLabel && <p className="label-caps text-muted">{content.pathsLabel}</p>}
            <ul className="mt-3 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              {content.paths.map((path, index) => (
                <li key={path.href}>
                  <Button
                    href={path.href}
                    size="lg"
                    variant={index === 0 ? "primary" : "secondary"}
                    icon="arrow"
                    className="w-full sm:w-auto"
                  >
                    {path.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </ScrollDrift>

        <div
          style={step(4)}
          className="hero-stage-in mx-auto mt-14 w-full max-w-[60rem] sm:mt-16"
        >
          <HeroStage
            card={
              <div
                data-surface="dark"
                className="grain rounded-card-lg bg-night p-5 text-on-night shadow-lift sm:max-w-[18rem] sm:p-6"
              >
                <p className="label-caps inline-flex items-center gap-2 text-accent-soft">
                  <span aria-hidden="true" className="relative flex size-2">
                    <span className="absolute inline-flex size-full rounded-full bg-accent-soft opacity-70 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-2 rounded-full bg-accent-soft" />
                  </span>
                  {floatingCard.label}
                </p>
                <p className="mt-2 font-display text-lg">{floatingCard.title}</p>
                <p className="mt-2 text-sm text-on-night-muted">{floatingCard.text}</p>
                <Link
                  href={floatingCard.link.href}
                  className="group/link mt-2 inline-flex min-h-11 items-center gap-2 font-medium text-on-night underline-offset-4 hover:underline"
                >
                  {floatingCard.link.label}
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-4 transition-transform duration-300 ease-out-soft group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            }
          >
            <Media
              image={content.image}
              eager
              objectPosition="center 20%"
              parallax={false}
              zoom={false}
              sizes="(min-width: 960px) 960px, 94vw"
              className="aspect-[4/3] w-full"
            />
          </HeroStage>
        </div>
      </Container>
      <VelocityMarquee words={marqueeWords} />
    </section>
  );
}
