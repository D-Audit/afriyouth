/**
 * impact.ts — how we measure impact, our knowledge products, and (once available) impact
 * figures, stories and downloadable resources (/impact and the home page).
 *
 * Shape:
 *   impactPage → hero and section text
 *   products   → the knowledge products published by the labs
 *   measures   → what our Impact & Learning Services cover
 *   stats      → Stat[]; the figures section appears once at least one `value` is a number.
 *   stories    → Story[]; the stories section appears once there is at least one story.
 *   resourceTypes / resources → filterable downloads; the section appears once there is one.
 *
 * Nothing on this page is invented: figures, stories and downloads stay hidden until real,
 * verified ones are added below.
 */
import type { IconName, ImageSlot, PageMeta } from "./types";

export type Stat = {
  value: number | null;
  placeholder: string;
  suffix?: string;
  label: string;
};

export type Story = {
  id: string;
  label: string;
  title: string;
  excerpt: string;
  attribution: string;
  image: ImageSlot;
};

export type ResourceType = "report" | "policy-brief" | "futures-study" | "case-study";

export type Resource = {
  id: string;
  title: string;
  type: ResourceType;
  year: string;
  summary: string;
  href: string;
  linkLabel: string;
};

export const impactPage = {
  meta: {
    title: "Impact & Insights",
    description:
      "AfriYouth Innovation Labs products and Impact & Learning Services: evidence reports, policy solutions, futures studies and impact measurement.",
  } satisfies PageMeta,
  hero: {
    label: "Impact & insights",
    heading: { title: "Evidence.", emphasis: "Innovation. Impact." },
    intro:
      "Many organizations implement projects but struggle to demonstrate whether they actually work.",
  },
  productsIntro: {
    label: "Knowledge products",
    heading: { title: "Our", emphasis: "products." },
    intro: "",
  },
  measuresIntro: {
    label: "How we measure",
    heading: { title: "Impact &", emphasis: "Learning Services." },
    intro: "Our Impact & Learning Services provide:",
    cta: { label: "Impact & Learning Services", href: "/services/impact-learning" },
  },
  statsIntro: {
    label: "Impact at a glance",
    heading: { title: "Change you can", emphasis: "count on." },
    intro: "",
  },
  storiesIntro: {
    label: "Stories of change",
    heading: { title: "Behind every number,", emphasis: "a person." },
  },
  resourcesIntro: {
    label: "Resources",
    heading: { title: "Reports, briefs", emphasis: "and studies." },
    intro: "Filter by type to find what you need.",
    filterLegend: "Filter resources by type",
  },
  cta: {
    heading: { title: "Evidence.", emphasis: "Innovation. Impact." },
    intro: "Talk to us about research, policy and impact measurement.",
    primary: { label: "Start a conversation", href: "/contact?role=organization" },
    secondary: { label: "See what we do", href: "/services" },
  },
};

export const products: { icon: IconName; title: string; description: string; href: string }[] = [
  {
    icon: "file-text",
    title: "AfriYouth Evidence Reports",
    description:
      "Evidence on Africa's emerging socio-economic challenges, including company and organization evidence reports.",
    href: "/services/research-evidence",
  },
  {
    icon: "scale",
    title: "AfriYouth Policy Solutions Series",
    description:
      "Our most important intellectual product: research translated into actionable policies and institutional reforms.",
    href: "/services/policy-governance",
  },
  {
    icon: "telescope",
    title: "Africa 2050 Futures Series",
    description: "For example: “Africa's Youth Workforce in 2050: Four Possible Futures”.",
    href: "/services/foresight-futures",
  },
  {
    icon: "chart-line",
    title: "AfriYouth Impact Dashboard",
    description: "The product of our Impact & Learning Services.",
    href: "/services/impact-learning",
  },
];

export const measures: string[] = [
  "Theory of Change",
  "Logical frameworks",
  "M&E systems",
  "KPIs",
  "Baseline studies",
  "Outcome measurement",
  "Impact measurement and evaluation",
  "Learning reports",
  "Impact storytelling",
];

/**
 * Impact figures. Hidden until real numbers exist. To publish one, set `value`, e.g.
 *   { value: 1250, placeholder: "", suffix: "+", label: "young people reached" }
 */
export const stats: Stat[] = [
  { value: null, placeholder: "", suffix: "+", label: "young people reached" },
  { value: null, placeholder: "", suffix: "+", label: "research and policy outputs" },
  { value: null, placeholder: "", suffix: "+", label: "ventures and solutions supported" },
  { value: null, placeholder: "", label: "countries engaged" },
];

/**
 * Stories of change. Hidden while empty. Use real, consented stories only:
 *   { id: "story-1", label: "Story of change", title: "…", excerpt: "…",
 *     attribution: "Name, Role, Country",
 *     image: { src: "/images/photos/your-photo.jpg", alt: "…", placeholder: "" } }
 */
export const stories: Story[] = [];

export const resourceTypes: { value: ResourceType; label: string }[] = [
  { value: "report", label: "Evidence reports" },
  { value: "policy-brief", label: "Policy briefs" },
  { value: "futures-study", label: "Futures studies" },
  { value: "case-study", label: "Case studies" },
];

/**
 * Downloadable publications. Hidden while empty. Add each one as it is published:
 *   { id: "r1", title: "…", type: "report", year: "2026", summary: "…",
 *     href: "/files/report.pdf", linkLabel: "Download" }
 */
export const resources: Resource[] = [];
