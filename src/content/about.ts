/**
 * about.ts — all text for /about.
 *
 * Shape:
 *   aboutPage.hero          → page header + photo slot
 *   aboutPage.story         → why AfriYouth exists
 *   aboutPage.mission/vision→ official statements
 *   aboutPage.different     → "What makes us different" points
 *   aboutPage.values        → the six brand keywords (icon + title + description)
 *   aboutPage.approach      → the AfriYouth philosophy as numbered steps
 *   aboutPage.team          → team profiles (hidden until real people are added)
 */
import type { IconName, ImageSlot, PageMeta } from "./types";

export const aboutPage = {
  meta: {
    title: "About",
    description:
      "AfriYouth Innovation Labs is a research, innovation and policy consulting firm that identifies, nurtures and advances promising ideas from Africa's young innovators to address the SDGs.",
  } satisfies PageMeta,
  hero: {
    label: "About AfriYouth",
    heading: { title: "Fueling innovators for", emphasis: "sustainable development." },
    intro:
      "AfriYouth Innovation Labs is a research, innovation and policy consulting firm that identifies, nurtures and advances promising ideas from Africa's young innovators to address the Sustainable Development Goals (SDGs).",
    image: {
      src: "/images/photos/solar-team.jpg",
      alt: "Three young engineers in hard hats reviewing plans beside solar panels",
      placeholder: "Three young engineers in hard hats reviewing plans beside solar panels",
    } satisfies ImageSlot,
  },
  story: {
    label: "Why we exist",
    heading: { title: "The largest workforce", emphasis: "in the world by 2030." },
    paragraphs: [
      "By 2030, Africa will have the largest workforce in the world. We need to give youth the ability and capacity to solve African problems, empowering their future independence and self-reliance.",
      "Through human-centered design, applied research and innovation, we transform community-driven ideas into practical and scalable solutions that contribute to the socio-economic transformation of Africa and beyond.",
    ],
  },
  mission: {
    label: "Mission",
    text: "To empower Africa's youth to generate evidence, shape policy, and develop innovative solutions to Africa's most pressing socio-economic challenges through research, human-centered design, and entrepreneurship.",
  },
  vision: {
    label: "Vision",
    text: "To build an Africa where empowered young people use evidence, innovation, and entrepreneurship to solve complex challenges, shape policies and drive inclusive and sustainable socio-economic transformation by 2050.",
  },
  different: {
    label: "What makes us different",
    heading: {
      title: "Most organizations pick one lane.",
      emphasis: "We connect them.",
    },
    intro:
      "Our competitive advantage brings five capabilities together: research, policy, human-centered design, entrepreneurship and foresight. This positions AfriYouth as an African innovation and policy lab, rather than simply a youth-focused consultancy.",
    points: [
      { title: "Youth organizations", description: "Most focus on training." },
      { title: "Incubators", description: "Most focus on startups." },
      { title: "Think tanks", description: "Most focus on research and policy." },
      { title: "Consulting firms", description: "Most focus on clients." },
    ],
  },
  values: {
    label: "Our brand keywords",
    heading: { title: "Six keywords that", emphasis: "define us." },
    intro:
      "Six keywords form the cornerstone of our identity and purpose. They are the building blocks of our brand, representing our dedication to empowering youth, nurturing innovation, and making a lasting impact on a global scale.",
    items: [
      { icon: "lightbulb", title: "Innovation" },
      { icon: "users", title: "Youth Empowerment" },
      { icon: "sprout", title: "Sustainability" },
      { icon: "globe", title: "Global Impact" },
      { icon: "hand-heart", title: "Human-Centered Design" },
      { icon: "compass", title: "Leadership Development" },
    ] satisfies { icon: IconName; title: string }[],
  },
  approach: {
    label: "Our philosophy",
    heading: { title: "Think. Research. Design.", emphasis: "Build. Influence. Scale." },
    steps: [
      { title: "Think" },
      { title: "Research" },
      { title: "Design" },
      { title: "Build" },
      { title: "Influence" },
      { title: "Scale" },
    ],
  },
  /**
   * Team profiles. The section is hidden while `members` is empty. To show it, add entries:
   *   { name: "Full name", role: "Role", image: { src: "/images/team/name.jpg", alt: "Portrait of …", placeholder: "" } }
   * Only publish people who have agreed to appear on the website.
   */
  team: {
    label: "Our team",
    heading: { title: "The people", emphasis: "behind the labs." },
    intro: "",
    members: [] as { name: string; role: string; image: ImageSlot }[],
  },
  cta: {
    heading: { title: "From evidence", emphasis: "to impact." },
    intro: "Research. Design. Innovate. Transform.",
    primary: { label: "Explore programs", href: "/programs" },
    secondary: { label: "Contact us", href: "/contact" },
  },
};
