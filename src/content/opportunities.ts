/**
 * opportunities.ts — ways to get involved, shown on /opportunities and the home page.
 *
 * Shape:
 *   opportunitiesPage → hero, labels and the "how to apply" steps
 *   opportunities     → Opportunity[] (title, type, status, deadline, audience, next step)
 *
 * Set `status` to "open", "upcoming" or "closed". Closed calls stay visible but de-emphasised.
 * `nextStep.href` can be an internal page ("/contact") or an external form URL.
 */
import type { AudienceKey, LinkItem, PageMeta, Status } from "./types";

export type Opportunity = {
  id: string;
  title: string;
  type: string;
  status: Exclude<Status, "ongoing">;
  /** Optional: only when a date is confirmed. */
  deadline?: string;
  /** Optional. Leave out until a place (or "Online") is confirmed. */
  location?: string;
  audience: AudienceKey;
  summary: string;
  nextStep: LinkItem;
  /** Optional link to a related program slug. */
  programSlug?: string;
};

export const audienceLabels: Record<AudienceKey, string> = {
  "young-people": "Young people",
  organizations: "Organizations",
  partners: "Partners",
};

export const opportunitiesPage = {
  meta: {
    title: "Opportunities",
    description:
      "Ways to get involved with AfriYouth Innovation Labs: programs for young people, services for organizations and partnerships.",
  } satisfies PageMeta,
  hero: {
    label: "Opportunities",
    heading: { title: "Find your", emphasis: "next step." },
    intro:
      "Programs to join, services to commission and ways to partner. Each one says who it's for and exactly what to do next.",
  },
  listIntro: {
    label: "Opportunities",
    heading: { title: "Open now and", emphasis: "coming up." },
  },
  labels: {
    deadline: "Dates",
    location: "Location",
    audience: "For",
    relatedProgram: "Related program",
  },
  empty: "There are no open calls at the moment.",
  alerts: {
    heading: { title: "Get", emphasis: "in touch." },
    intro: "Tell us what you're looking for.",
    cta: { label: "Contact us", href: "/contact" },
  },
};

/**
 * No calls have been supplied yet, so this list is empty and the Opportunities page is left
 * out of the menu and the home page. Add a call when one is confirmed, for example:
 *   { id: "call-1", title: "Policy Innovation Challenge", type: "Call for applications",
 *     status: "open", deadline: "30 June 2027", location: "Kigali", audience: "young-people",
 *     summary: "…", nextStep: { label: "Apply now", href: "https://…" },
 *     programSlug: "policy-innovation-challenge" }
 */
export const opportunities: Opportunity[] = [];
