import { z } from "zod";
import { contactPage, roles } from "@/content/contact";

// Avoid zod's eval-based fast path so the strict Content Security Policy is respected.
z.config({ jitless: true });

const errors = contactPage.form.errors;
const roleValues = roles.map((role) => role.value) as [
  (typeof roles)[number]["value"],
  ...(typeof roles)[number]["value"][],
];

/** Shared by the contact form (client) and the /api/contact route handler (server). */
export const contactSchema = z.object({
  role: z.enum(roleValues, { error: errors.role }),
  name: z
    .string({ error: errors.nameShort })
    .trim()
    .min(2, errors.nameShort)
    .max(120, errors.nameLong),
  email: z
    .string({ error: errors.email })
    .trim()
    .max(200, errors.email)
    .pipe(z.email({ error: errors.email })),
  organization: z.string().trim().max(160, errors.organizationLong).optional().or(z.literal("")),
  message: z
    .string({ error: errors.messageShort })
    .trim()
    .min(10, errors.messageShort)
    .max(2000, errors.messageLong),
  /** Honeypot: hidden from real users. The API silently drops submissions that fill it. */
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
