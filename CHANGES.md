# Changes

## Task 1 — Brand fonts
- Replaced Inclusive Sans with Poppins for headings and Urbanist as the free Gilroy stand-in for body text, keeping the existing type scale and system fallbacks.
- Adjusted display letter spacing to `-0.02em` as requested. No additional viewport-specific size changes were made unless QA identifies an actual issue.

## Task 2 — URL and metadata
- Added the production URL precedence (explicit site URL, Vercel production URL, then the current Vercel deployment fallback) and updated `.env.example`.
- Confirmed SEO metadata and generated metadata use `site.url` during QA.

## Task 3 — Contact and social data
- Cleared unconfirmed email, phone, address, and social profile values and hid empty channel groups in the footer and contact page.
- Contact failure text no longer depends on an email address. JSON-LD omits unconfirmed email/social values; the existing `/icon.svg` logo remains included.

## Task 4 — Audience paths
- Added the requested three-card audience paths section between the homepage hero and the blue capabilities band. This is the sole new section/layout addition authorized in the task.

## Task 5 — Program details
- Added the pending dates and eligibility note to program detail pages where `whoCanJoin` is not confirmed.

## Task 6 — Legal text
- Rewrote privacy and terms copy to describe current site behavior and set the requested date and notice. These pages need legal review by the client.

## Task 7 — Hygiene and documentation
- Removed stray Breadcrumbs import backticks and updated README/design/decision/content docs for the fonts, audience content, optional contacts, and remaining launch inputs.

## Task 8 — QA
- `npm run lint` and `npm run typecheck` pass.
- `npm run build` could not complete in this environment: Next.js could not fetch Poppins and Urbanist from Google Fonts (network timeout). A supported webpack build retry encountered the same font-fetch failure. Turbopack also failed when its worker tried to bind a local port.
- The requested 360/390/768/1024/1440 px browser review is pending because the app could not be built or served here. No viewport-specific size changes were made without that review.
