/**
 * navigation.ts — header menu, header call-to-action and footer link groups.
 *
 * Shape:
 *   mainNav    → NavItem[] shown in the header (desktop and mobile). Items with a `menu`
 *                open a dropdown (desktop) or an expandable list (mobile).
 *   headerCta  → the blue "Get Involved" button
 *   footerNav  → groups of { heading, links: LinkItem[] }
 *   legalNav   → small links in the footer bottom bar
 *
 * Internal links must start with "/" and match a page in src/app/.
 */
import { opportunities } from "./opportunities";
import { programs } from "./programs";
import { services } from "./services";
import type { IconName, LinkItem } from "./types";

export type NavMenuLink = LinkItem & { description?: string; icon?: IconName };

export type NavItem = LinkItem & {
  /** Dropdown contents. The parent page is always offered as the first "overview" link. */
  menu?: { overviewLabel: string; overviewDescription: string; links: NavMenuLink[] };
};

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "What We Do",
    href: "/services",
    menu: {
      overviewLabel: "Everything we do",
      overviewDescription: "Our labs and supportive services.",
      links: services.map((service) => ({
        label: service.shortTitle,
        href: `/services/${service.slug}`,
        description: service.summary,
        icon: service.icon,
      })),
    },
  },
  {
    label: "Programs",
    href: "/programs",
    menu: {
      overviewLabel: "All programs",
      overviewDescription: "See every program.",
      links: programs.map((program) => ({
        label: program.name,
        href: `/programs/${program.slug}`,
        description: program.format,
        icon: services.find((service) => service.slug === program.topic)?.icon,
      })),
    },
  },
  ...(opportunities.length > 0 ? [{ label: "Opportunities", href: "/opportunities" }] : []),
  { label: "Impact", href: "/impact" },
  { label: "Partner With Us", href: "/partner" },
];

export const headerCta: LinkItem = { label: "Get Involved", href: "/contact" };

export const footerNav: { heading: string; links: LinkItem[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "What We Do", href: "/services" },
      { label: "Impact & Insights", href: "/impact" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { label: "Programs", href: "/programs" },
      ...(opportunities.length > 0 ? [{ label: "Opportunities", href: "/opportunities" }] : []),
      { label: "Partner With Us", href: "/partner" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: LinkItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const footer = {
  contactHeading: "Contact",
  copyright: (year: number) => `© ${year} AfriYouth Innovation Labs. All rights reserved.`,
};
