/**
 * legal.ts — concise privacy policy and terms of use.
 *
 * Shape: { meta, label, heading, updated, notice, sections: { heading, body[] }[] }
 * Client review is still required before these pages are treated as approved legal copy.
 */
import type { PageMeta } from "./types";

type LegalPage = {
  meta: PageMeta;
  label: string;
  heading: { title: string; emphasis?: string };
  updated: string;
  notice: string;
  sections: { heading: string; body: string[] }[];
};

const notice = "This page summarizes how this website works and will be reviewed by AfriYouth Innovation Labs.";

export const privacyPage: LegalPage = {
  meta: {
    title: "Privacy Policy",
    description: "How AfriYouth Innovation Labs handles personal information.",
  },
  label: "Legal",
  heading: { title: "Privacy", emphasis: "policy" },
  updated: "Last updated: 18 November 2026",
  notice,
  sections: [
    {
      heading: "Information we collect",
      body: ["The contact form collects your name, email address, organization (optional), role and message."],
    },
    {
      heading: "How we use it",
      body: ["We use this information only to reply to your message."],
    },
    {
      heading: "Cookies and browser storage",
      body: ["This site sets no tracking cookies. It uses sessionStorage only to remember that the intro animation was shown."],
    },
    {
      heading: "External links",
      body: ["External links lead to websites AfriYouth Innovation Labs does not control."],
    },
  ],
};

export const termsPage: LegalPage = {
  meta: {
    title: "Terms of Use",
    description: "Terms for using the AfriYouth Innovation Labs website.",
  },
  label: "Legal",
  heading: { title: "Terms", emphasis: "of use" },
  updated: "Last updated: 18 November 2026",
  notice,
  sections: [
    {
      heading: "Using this website",
      body: ["Use this website for its information and contact features."],
    },
    {
      heading: "Intellectual property",
      body: ["Website content and logos belong to AfriYouth Innovation Labs."],
    },
    { heading: "External links", body: ["External links lead to websites AfriYouth Innovation Labs does not control."] },
  ],
};

export const notFoundPage = {
  meta: { title: "Page not found", description: "The page you're looking for doesn't exist." },
  label: "Error 404",
  heading: { title: "This page has", emphasis: "wandered off." },
  intro: "The link may be broken or the page may have moved. Try one of these instead.",
  primary: { label: "Back to home", href: "/" },
  secondary: { label: "Contact us", href: "/contact" },
};
