/**
 * partners.ts — partner logos and the "Partner With Us" page.
 *
 * Shape:
 *   partners     → Partner[]; the logo strip is hidden until at least one partner is added.
 *                  Put an SVG/PNG in public/images/partners/ and set logo to
 *                  "/images/partners/name.svg".
 *   partnersStrip→ heading text for the logo strip on the home and about pages
 *   partnerPage  → all text for /partner (collaboration areas, audiences, steps, CTA)
 */
import type { PageMeta } from "./types";

export type Partner = {
  name: string;
  logo?: string;
  href?: string;
};

/**
 * Confirmed partners. The logo strip is hidden while this list is empty. Add entries like:
 *   { name: "Organization name", logo: "/images/partners/name.svg", href: "https://…" }
 */
export const partners: Partner[] = [];

export const partnersStrip = {
  label: "Partners & collaborators",
  intro: "Organizations we work with.",
};

export const partnerPage = {
  meta: {
    title: "Partner With Us",
    description:
      "Partner with AfriYouth Innovation Labs on research, policy, innovation, foresight and career development for Africa's youth.",
  } satisfies PageMeta,
  hero: {
    label: "Partner with us",
    heading: { title: "Build what's next", emphasis: "with Africa's youth." },
    intro:
      "We transform community-driven ideas into practical and scalable solutions that contribute to the socio-economic transformation of Africa and beyond.",
    primary: { label: "Start a partnership inquiry", href: "/contact?role=partner" },
    secondary: { label: "See our programs", href: "/programs" },
  },
  /**
   * What we offer partners: the "Funding & Investment Readiness" service list.
   * (Partnership areas beyond this have not been supplied.)
   */
  areas: {
    label: "Resource mobilization & partnerships",
    heading: { title: "A service across", emphasis: "everything we do." },
    intro: "Resource Mobilization & Partnerships is a cross-cutting service.",
    cta: { label: "Funding & Investment Readiness", href: "/services/funding-readiness" },
  },
  programs: {
    label: "Programs",
    heading: { title: "Our", emphasis: "programs." },
    cta: { label: "View all programs", href: "/programs" },
  },
  faq: {
    label: "Questions",
    heading: { title: "Partnership", emphasis: "questions." },
    /**
     * The section is hidden while this list is empty. Add confirmed answers like:
     *   { question: "What kinds of organizations do you partner with?", answer: "…" }
     * Suggested questions: minimum commitment, co-branding, reporting on results.
     */
    items: [] as { question: string; answer: string }[],
  },
  cta: {
    heading: { title: "Let's start", emphasis: "a conversation." },
    intro: "Tell us about your organization.",
    primary: { label: "Send a partnership inquiry", href: "/contact?role=partner" },
  },
};
