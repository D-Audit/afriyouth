/**
 * legal.ts — placeholder privacy policy and terms of use.
 *
 * Shape: { meta, label, heading, updated, notice, sections: { heading, body[] }[] }
 * IMPORTANT: these are placeholders, not legal advice. Replace with reviewed text.
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

const notice =
  "This page is a placeholder. It must be replaced with text reviewed by a qualified person before launch.";

export const privacyPage: LegalPage = {
  meta: {
    title: "Privacy Policy",
    description: "How AfriYouth Innovation Labs handles personal information.",
  },
  label: "Legal",
  heading: { title: "Privacy", emphasis: "policy" },
  updated: "Last updated: [DD Month YYYY]",
  notice,
  sections: [
    {
      heading: "Information we collect",
      body: [
        "[Placeholder] When you use the contact form we receive your name, email address, organization (optional), role and message.",
      ],
    },
    {
      heading: "How we use it",
      body: ["[Placeholder] We use this information only to respond to your inquiry."],
    },
    {
      heading: "Cookies and analytics",
      body: [
        "[Placeholder] This site does not set tracking cookies. Update this section if analytics are added.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "[Placeholder] Describe how people can access, correct or delete their data, and applicable laws.",
      ],
    },
    { heading: "Contact", body: ["[Placeholder] Contact details for privacy questions."] },
  ],
};

export const termsPage: LegalPage = {
  meta: {
    title: "Terms of Use",
    description: "Terms for using the AfriYouth Innovation Labs website.",
  },
  label: "Legal",
  heading: { title: "Terms", emphasis: "of use" },
  updated: "Last updated: [DD Month YYYY]",
  notice,
  sections: [
    {
      heading: "Using this website",
      body: ["[Placeholder] Conditions for using this website and its content."],
    },
    {
      heading: "Intellectual property",
      body: ["[Placeholder] Ownership of content, logos and resources."],
    },
    { heading: "External links", body: ["[Placeholder] Responsibility for third-party websites."] },
    { heading: "Changes", body: ["[Placeholder] How and when these terms may change."] },
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
