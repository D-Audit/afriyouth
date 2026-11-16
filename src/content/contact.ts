/**
 * contact.ts — contact details and the contact form.
 *
 * Shape:
 *   contactDetails → email, phone, address shown on /contact and in the footer
 *   contactPage    → page text, form labels, validation messages, success/error states
 *
 * `roles` values are also used by the server to validate submissions, so keep the
 * `value` keys unchanged (young-person, organization, partner) unless you update
 * src/lib/contact-schema.ts too.
 */
import type { PageMeta } from "./types";

export const contactDetails = {
  email: { label: "Email", display: "[hello@your-domain.org]", href: "mailto:hello@example.org" },
  phone: { label: "Phone", display: "[+000 000 000 000]", href: "tel:+000000000000" },
  address: { label: "Location", display: "[City, Country]" },
  socialLabel: "Follow us",
};

export const roles = [
  { value: "young-person", label: "A young person" },
  { value: "organization", label: "An organization" },
  { value: "partner", label: "A potential partner" },
] as const;

export type RoleValue = (typeof roles)[number]["value"];

export const contactPage = {
  meta: {
    title: "Contact",
    description:
      "Get in touch with AfriYouth Innovation Labs about programs, services or partnerships.",
  } satisfies PageMeta,
  hero: {
    label: "Contact",
    heading: { title: "Let's talk about", emphasis: "what you want to build." },
    intro: "Questions about our programs, labs or partnerships? Start here.",
  },
  detailsHeading: "Other ways to reach us",
  form: {
    heading: "Send us a message",
    requiredNote: "Fields marked * are required.",
    required: "*",
    fields: {
      role: { label: "I am…", placeholder: "Choose one" },
      name: { label: "Full name", autoComplete: "name" },
      email: { label: "Email address", autoComplete: "email" },
      organization: { label: "Organization", hint: "Optional", autoComplete: "organization" },
      message: { label: "Message", hint: "Tell us briefly what you're looking for." },
      honeypot: { label: "Leave this field empty" },
    },
    submit: "Send message",
    submitting: "Sending…",
    errorSummary: "Please fix the highlighted fields.",
    errors: {
      role: "Please choose who you are.",
      nameShort: "Please enter your name.",
      nameLong: "Name is too long.",
      email: "Please enter a valid email address.",
      organizationLong: "Organization name is too long.",
      messageShort: "Please write a message of at least 10 characters.",
      messageLong: "Message is too long (2,000 characters maximum).",
    },
    success: {
      heading: "Thank you, your message is on its way.",
      body: "We'll get back to you as soon as we can.",
      again: "Send another message",
    },
    failure:
      "Something went wrong and your message wasn't sent. Please try again, or email us directly.",
  },
};

/** Text used in the email sent to the team when the form is submitted (server-side only). */
export const contactEmail = {
  subject: (name: string, role: string) => `Website inquiry from ${name} (${role})`,
  defaultFrom: "AfriYouth website <onboarding@resend.dev>",
  labels: { role: "Role", name: "Name", email: "Email", organization: "Organization" },
};

