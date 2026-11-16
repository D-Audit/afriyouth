/**
 * Shared content types used by every file in src/content/.
 * Components import these types so content and UI stay in sync.
 * You normally do not need to edit this file when changing text.
 */

/** Names of the icons available to content. Mapped to lucide-react in components/ui/Icon.tsx. */
export type IconName =
  | "search"
  | "scale"
  | "lightbulb"
  | "rocket"
  | "graduation-cap"
  | "telescope"
  | "chart-line"
  | "users"
  | "building"
  | "handshake"
  | "sprout"
  | "globe"
  | "compass"
  | "target"
  | "network"
  | "book-open"
  | "file-text"
  | "mail"
  | "phone"
  | "map-pin"
  | "calendar"
  | "clock"
  | "badge-check"
  | "hand-heart"
  | "waypoints";

export type SocialPlatform = "linkedin" | "instagram" | "x" | "youtube" | "facebook";

/** A link with visible text. Internal links start with "/". */
export type LinkItem = {
  label: string;
  href: string;
};

/** A headline whose last part is set in the accent colour for emphasis. */
export type Headline = {
  title: string;
  emphasis?: string;
};

/**
 * An image slot. Leave `src` empty to show a labelled placeholder.
 * To use a real photo, put it in public/images/ and set src to "/images/your-file.jpg".
 */
export type ImageSlot = {
  src?: string;
  alt: string;
  /** Shown on the placeholder, e.g. "Young people collaborating in a workshop". */
  placeholder: string;
};

export type SectionIntro = {
  label: string;
  heading: Headline;
  intro?: string;
};

/** Slug-based audience keys used for filtering and tabs. */
export type AudienceKey = "young-people" | "organizations" | "partners";

export type Status = "open" | "upcoming" | "ongoing" | "closed";

export type PageMeta = {
  title: string;
  description: string;
};
