/**
 * home.ts — text for the home page (/), section by section, top to bottom.
 *
 * Shape:
 *   hero         → headline, supporting line, audience-path buttons, community row, photo + floating card
 *   connects     → "What makes us different": the five capabilities on the blue band
 *   whatWeDo     → labs and services heading
 *   flagship     → the Evidence-to-Impact Accelerator (its ten stages come from programs.ts)
  *   programsRail → heading for the horizontal program cards
 *   why          → the "why now" statement with mission and vision (text from about.ts)
 
 *   finalCta     → closing dark call to action
 */
import type { IconName, ImageSlot, LinkItem, PageMeta } from "./types";

export const homePage = {
  meta: {
    title: "AfriYouth Innovation Labs | From evidence to impact",
    description:
      "AfriYouth Innovation Labs is a research, innovation and policy consulting firm that identifies, nurtures and advances promising ideas from Africa's young innovators to address the SDGs.",
  } satisfies PageMeta,
  hero: {
    heading: { title: "Where young Africa turns", emphasis: "evidence into impact." },
    intro:
      "We are a research, innovation and policy consulting firm that identifies, nurtures and advances promising ideas from Africa's young innovators to address the Sustainable Development Goals.",
    /** Small photo tiles that pop up along the cursor when hovering the headline (desktop). */
    hoverPhotos: [
      "/images/photos/startup.jpg",
      "/images/photos/vr-electronics.jpg",
      "/images/photos/solar-team.jpg",
      "/images/photos/vr-design.jpg",
      "/images/photos/circuit.jpg",
      "/images/photos/soldering.jpg",
    ],
    /** Small row above the headline: overlapping photos plus the brand line. */
    community: {
      text: "Fueling innovators for sustainable development",
      photos: [
        "/images/photos/startup.jpg",
        "/images/photos/circuit.jpg",
        "/images/photos/vr-design.jpg",
        "/images/photos/solar-team.jpg",
      ],
    },
    pathsLabel: "",
    paths: [
      { label: "I'm a young person", href: "/programs" },
      { label: "I'm an organization", href: "/services" },
      { label: "I'm a partner", href: "/partner" },
    ] satisfies LinkItem[],
    image: {
      src: "/images/photos/vr-design.jpg",
      alt: "A young person wearing a virtual reality headset in a bright workspace",
      placeholder: "A young person wearing a virtual reality headset in a bright workspace",
    } satisfies ImageSlot,
    floatingCard: {
      label: "Our flagship",
      title: "Evidence-to-Impact Accelerator",
      text: "Ten stages, from Discover to Scale.",
      link: { label: "See how it works", href: "/programs/evidence-to-impact-accelerator" },
    },
    /** Words on the moving band under the hero photo. */
    marquee: [
      "Research",
      "Policy",
      "Human-Centered Design",
      "Entrepreneurship",
      "Foresight",
      "Evidence",
      "Innovation",
      "Impact",
    ],
  },
  connects: {
    label: "What makes us different",
    heading: { title: "Five capabilities,", emphasis: "one lab." },
    intro:
      "Research, policy, human-centered design, entrepreneurship and foresight work together here to turn evidence into practical solutions for Africa's challenges.",
    centerLabel: "From evidence to impact",
    areas: [
      {
        title: "Research",
        icon: "search",
        href: "/services/research-evidence",
      },
      {
        title: "Policy",
        icon: "scale",
        href: "/services/policy-governance",
      },
      {
        title: "Human-Centered Design",
        icon: "lightbulb",
        href: "/services/innovation-venture",
      },
      {
        title: "Entrepreneurship",
        icon: "rocket",
        href: "/services/innovation-venture",
      },
      {
        title: "Foresight",
        icon: "telescope",
        href: "/services/foresight-futures",
      },
    ] satisfies { title: string; icon: IconName; href: string }[],
  },
  whatWeDo: {
    label: "What we do",
    heading: { title: "Labs and services that", emphasis: "work as one." },
    intro:
      "Research, policy, innovation, foresight and career development, with our supportive services.",
    ctaCard: "Not sure which lab fits? Start with an overview of everything we do.",
    cta: { label: "Explore what we do", href: "/services" },
  },
  flagship: {
    label: "Our flagship",
    heading: { title: "The Evidence-to-Impact", emphasis: "Accelerator." },
    intro:
      "Instead of having disconnected research, incubation and training programs, we combine them.",
    programSlug: "evidence-to-impact-accelerator",
    stagesSectionId: "stages",
    cta: { label: "Explore the accelerator", href: "/programs/evidence-to-impact-accelerator" },
  },
  programsRail: {
    label: "Programs",
    heading: { title: "Our", emphasis: "programs." },
    cta: { label: "All programs", href: "/programs" },
    railLabel: "Programs",
  },
  why: {
    label: "Why now",
    heading: {
      title: "By 2030, Africa will have",
      emphasis: "the largest workforce in the world.",
    },
    intro:
      "We need to give youth the ability and capacity to solve African problems, empowering their future independence and self-reliance.",
    cta: { label: "About AfriYouth", href: "/about" },
  },
  finalCta: {
    label: "Get involved",
    heading: { title: "From evidence", emphasis: "to impact." },
    intro: "Research. Design. Innovate. Transform.",
    primary: { label: "Explore programs", href: "/programs" },
    secondary: { label: "Contact us", href: "/contact" },
  },
};
