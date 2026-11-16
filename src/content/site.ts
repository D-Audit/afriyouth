/**
 * site.ts — organization-wide details and shared interface text.
 *
 * Shape:
 *   site      → name, wordmark lines, tagline, description, URL, social links
 *   ui        → short interface strings reused across many components
 *               (menu labels, status names, filter labels, placeholder captions)
 *
 * Text in [square brackets] is placeholder content waiting for official copy.
 */
import type { SocialPlatform, Status } from "./types";

export const site = {
  name: "AfriYouth Innovation Labs",
  shortName: "AfriYouth",
  /**
   * The name as it is set in the logo: two lines, with "Innovation" in brand blue.
   * The logo artwork itself lives in src/components/brand/Wordmark.tsx and
   * public/images/brand/ and must not be redrawn (see the brand guidelines).
   */
  wordmark: { first: "Afri Youth", accent: "Innovation", rest: "Labs" },
  /** Official brand line from the logo lockup. */
  tagline: "Fueling Innovators for Sustainable Development",
  /** One-line positioning used under the footer logo. */
  positioning: "From evidence to impact: an African research, innovation and policy lab.",
  description:
    "AfriYouth Innovation Labs is a research, innovation and policy consulting firm that identifies, nurtures and advances promising ideas from Africa's young innovators to address the Sustainable Development Goals (SDGs).",
  /** Set NEXT_PUBLIC_SITE_URL in your hosting environment; this is the fallback. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.org",
  locale: "en",
  social: [
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/afriyouth-placeholder",
    },
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/afriyouth-placeholder",
    },
    { platform: "x", label: "X (Twitter)", href: "https://x.com/afriyouth-placeholder" },
    {
      platform: "youtube",
      label: "YouTube",
      href: "https://www.youtube.com/@afriyouth-placeholder",
    },
  ] satisfies { platform: SocialPlatform; label: string; href: string }[],
};

export const ui = {
  skipLink: "Skip to main content",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  mainNavLabel: "Main",
  footerNavLabel: "Footer",
  breadcrumbLabel: "Breadcrumb",
  homeCrumb: "Home",
  learnMore: "Learn more",
  viewDetails: "View details",
  viewPrograms: "See our programs",
  scrollPrev: "Scroll to previous cards",
  scrollNext: "Scroll to next cards",
  filterAll: "All",
  filterResultsLabel: (count: number) => `${count} result${count === 1 ? "" : "s"} shown`,
  filterEmpty: "Nothing matches these filters yet. Try clearing one of them.",
  filterClear: "Clear filters",
  photoPrefix: "Photo",
  externalLinkSuffix: "(opens in a new tab)",
  statusLabels: {
    open: "Open",
    upcoming: "Upcoming",
    ongoing: "Ongoing",
    closed: "Closed",
  } satisfies Record<Status, string>,
};
