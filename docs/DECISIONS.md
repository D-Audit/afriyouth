# Decisions log

Key decisions made while building the site, with the reasoning, so the maintenance team can
revisit them knowingly.

## 18 Nov 2026

- Fonts changed from Inclusive Sans to Poppins for titles and Urbanist as a free Gilroy stand-in for body text, matching the brand guide while licensed Gilroy is unavailable.
- Unconfirmed contact details and social profiles were removed from public output.
- The three audience paths (young person, organization, partner) are the hero buttons on the home page.
- Privacy and terms text was rewritten to describe only the website's current behavior; client legal review is still needed.

## Inputs

- **No reference image or Stitch/Figma screens were attached** to the original brief. The visual
  language follows its written description. Later client supplied materials supersede older
  palette and typography notes; tokens in `globals.css` and section components are the places to
  adjust.
- **No official content.** Every name, figure, date, partner, person and quote is a clearly marked
  placeholder (photos are clearly credited stock stand-ins) (`[Program name]`, `[00]+`, `[Partner logo]`). Copy that is used verbatim comes only
  from the brief (mission, areas of work, brand themes, audiences). Program "formats" (e.g. "Youth
  research program") are generic descriptors derived from the listed areas of work, not real program names.

## Rebrand to the official materials (November 2026)

The client supplied the **brand guidelines** (logo, colours, typography, voice) and the
**"About Afri-Youth Innovation Labs" document (new version, 16 September 2026)**. The site was
rebuilt around them. Earlier entries below describe the pre-brand build; where they mention
the former palette or placeholder programs, this section supersedes them.

- **Logo:** traced from the vector artwork inside the guidelines PDF, not redrawn. Gradient mark
  on light surfaces, white mark on blue/dark, favicon from the "Favicon & Mark" version.
- **Colours:** brand Blue is the action colour (white text, 8.6:1), Dark Purple replaces black,
  Steel Pink appears only in gradients, glows and as a light tint on dark surfaces.
- **Fonts:** The brand guide specifies Poppins titles and Gilroy body text. On the user's later
  design direction, the website uses Poppins for titles and Urbanist as a free stand-in for Gilroy body text.
- **Mission and vision:** the September 2026 document is newer than the 2023 guidelines, so its
  mission and vision are used. The tagline is the one in the logo lockup, "Fueling Innovators for
  Sustainable Development"; "From evidence to impact" is used as a supporting line.
- **Content structure:** "What We Do" = five labs plus two supporting services, each with the
  exact service list from the document. "Programs" = the six named products people join. The
  five strategic divisions are a table on `/services`.
- **Internal notes were not published.** Phrases such as "this builds on our original incubation
  idea" or "possible tagline" were treated as strategy notes and rewritten for the public.
- **Only supplied material is used.** Text comes from the two client documents; headings and
  button labels are short restatements of it. No dates, statuses, "who it's for" lists, numbers,
  partners, team members, stories or contact details were supplied, so none are shown: programs
  carry no status or dates, and the impact figures, stories, downloads, team, partner logos,
  partnership FAQ and Opportunities page stay hidden (or out of the menu) until real entries are
  added in `src/content/`.
- **Product names are kept as written**, including the spelling "University Employability
  Programme"; running text stays in US English.
- **Photos** are the six from the "Image & Photography" page of the brand guidelines, as the
  client asked. The earlier Unsplash stand-ins were removed from the site. AfriYouth should
  confirm it holds the licence to publish the six photos.

## Stack

- **Next.js 16.4 (latest stable at build time), App Router, TypeScript strict, Tailwind CSS 4.**
  Kept the create-next-app defaults, including **Cache Components** and **Partial Prefetching**.
  All pages are prerendered at build time; detail pages use `generateStaticParams`.
- **Dependencies limited to the brief:** `next`, `react`, `lucide-react`, `motion`, `zod`, plus
  `prettier` (dev). No additional packages were added:
  - Email is sent with a plain `fetch` to Resend's HTTP API instead of the Resend SDK.
  - `cn()` is a 3-line helper instead of `clsx`/`tailwind-merge`. Components avoid passing
    conflicting utility classes.
  - Social icons use the official brand paths from Simple Icons (CC0), pasted into
    `SocialIcon.tsx`, because lucide-react v1 removed brand icons.
  - Lighthouse and the browser checks used during QA were run with temporary tools, not added to the project.
- **Fonts:** Inclusive Sans (variable, 300–700) for headings, body and labels, via
  `next/font` (self-hosted, `display: swap`, metric-matched fallbacks). The first version used an
  italic serif plus a monospace label font; after client review this read as "template-like", so
  headings moved to a clean professional sans and the emphasis line is now colour-only.

- **Lenis (`lenis@1.3.27`, pinned) was added on client request** for inertia ("smooth") scrolling.
  It is the only addition beyond the brief. It is driven from Motion's frame loop
  (`SmoothScroll.tsx`) so scroll-linked effects stay in sync, leaves touch devices on native
  scrolling, and turns itself off for `prefers-reduced-motion`. Native CSS `scroll-behavior: smooth`
  was removed because it fights Lenis.

## Content architecture

- All copy lives in `src/content/*.ts`. Besides the nine files named in the brief, three were
  added so no text remains in components: `home.ts` (home page sections), `legal.ts` (privacy,
  terms, 404) and `types.ts` (shared types).
- Short interface strings (menu labels, status names, "Learn more", filter labels) live in `ui`
  inside `site.ts`.
- Page sections receive content via props. The global chrome (`Header`, `Footer`) and a few small
  primitives (`StatusBadge`, `FilterChips`, `Media`, `CardRail`) read shared labels from
  `site.ts`/`navigation.ts` directly. These are site-wide strings that never differ per page, and
  this avoids threading them through every page. They are still edited only in content files.
- Content is typed with `satisfies`, so mistakes (unknown icon name, invalid status, wrong service
  slug) fail `npm run typecheck` instead of failing silently on the live site.
- Spelling: US English ("organization", "program") to match the brief.

## Design

- **Primary button = orange fill with ink text.** White on `#E8590C` is 3.6:1 and fails AA.
  Ink on orange (5.0:1) keeps the vivid colour. Small orange text uses darker `accent-ink`
  `#B4400A` (5.3:1 on canvas); on dark surfaces `accent-soft` `#F08A4B` (6.9:1). Full table in DESIGN.md.
- **Pattern:** an abstract quarter-arc "connected paths" motif generated in code, chosen to
  avoid textile/"tribal" clichés while still giving warmth and texture.
- **"How it all connects":** one ordered list of links, radial on desktop (xl), stacked with a
  connecting line on smaller screens. One DOM, so screen readers get a simple list.
- **Photos:** after client review, 18 free Unsplash photos of young Africans working, studying and
  meeting replaced the gradient placeholders (credits in `public/images/README.md`). They are
  stand-ins, not AfriYouth people; team portraits stay as placeholders so no stock face is
  presented as staff. Alt text describes what is in each photo.
- **Icons:** card icons are plain line icons in the accent colour; the tinted rounded tiles behind
  them were removed (client feedback: they looked generic). Decorative dots before labels and the
  wavy divider on the home page were removed for the same reason.
- **Placeholders** (where no photo is set, e.g. team portraits) are warm gradients with the pattern and a visible `[Photo: …]` caption, with
  `role="img"` and an aria-label. They use the same aspect ratio as the real image will, so
  swapping causes no layout shift.
- The home hero CTA ("Get Involved") points to `/opportunities`, the most direct next step for
  the largest audience (young people).

- **Palette moved to neutral "white smoke"** (`#F5F5F5` canvas, neutral greys, near-black night)
  after client review; the warm beige surfaces and all green were removed. Orange stays the only accent.
- **Header dropdowns:** "What We Do" and "Programs" open a menu (hover or click on desktop, an
  expandable list on mobile) whose chevron flips while open. Menu links are generated from
  `services.ts` and `programs.ts`, so new entries appear automatically.
- **Scroll motion:** Lenis inertia scrolling, photos that zoom in as they reach the middle of
  the screen and ease back as they leave (`Parallax`, which also drifts them slightly), word-by-word headline reveals (`TextReveal`, h2 only, never the LCP h1), blur-up
  reveals (`Reveal`), dark panels that scale in (`ScrollScale`) and a hero that drifts away on
  scroll (`ScrollDrift`). All respect reduced motion.

- **Intro loader** (`SiteLoader.tsx`, styles at the end of `globals.css`): the brand mark draws,
  a progress line fills and the panel lifts away after ~1.9s. It is pure CSS, so it cannot hang if
  JavaScript fails. It plays once per tab session (a tiny inline script in `<head>` marks repeat
  visits) and never for reduced-motion users. The hero entrance waits for it.
- **Labels are sentence case.** The uppercase, wide-tracked `label-caps` style read as cluttered
  next to Inclusive Sans; the utility now renders small medium-weight sentence-case text.
- **Cards:** program status badges sit on the photo so every card's title lines up; categories are
  one line in the accent colour; summaries are clamped to three lines so rows stay even.
  Filters are stacked rows (label left, chips right) on a white panel.

- **Pinned horizontal galleries** (`ScrollGallery.tsx`) for the home page program and
  opportunity rows: on desktop the section sticks and vertical scroll slides the cards
  sideways (1px down = 1px across), with a "01 / 06" counter and progress line; the page
  continues once the last card is in view. Only the photos zoom (130% at the right edge settling to 100% on the left);
  card text never scales. Phones, tablets and reduced-motion users get the
  swipeable `CardRail` instead. Tabbing to an off-screen card scrolls it into view.

- **Signature details, to avoid a template look** (client asked for something less generic):
  - `Highlight`: key headline words sit on a sun-washed gradient block (sky → blush → apricot →
    sand) that wipes in, used for the hero and page-header emphasis. Section h2s keep orange.
  - `VelocityMarquee`: an oversized band of the work areas under the hero, alternating solid and
    outlined words with a four-point star. It drifts on its own, speeds up and leans with scroll
    speed and reverses when scrolling up. Decorative (`aria-hidden`).
  - `HoverHeadline`: hovering the home headline parts and dims the letters near the cursor
    and pops small photo tiles (from `hero.hoverPhotos` in `home.ts`) along its path. Text
    size never changes. Mouse/trackpad only, off for reduced motion; the h1 keeps the full
    sentence as its accessible name.
  - `.grain`: a faint film-grain texture on the dark panels and footer.

- **Motion pass modelled on a client reference recording** (a product site with a floating nav,
  a growing hero visual, stacking cards, capsules that fall into line and an oversized footer
  wordmark). The motions were rebuilt around AfriYouth's own content; nothing was copied.
  - **Header** is a floating glass pill. It is transparent at the top of a page and gains its
    surface after 8px of scroll. The blur sits on the pill, not on `<header>`, so the fixed
    mobile panel keeps the viewport as its containing block.
  - **Home hero** is centred: community line, headline, intro, audience paths, then a wide photo
    "stage" (`HeroStage`) that grows from 90% to full width over the first 520px of scroll with
    an orange glow behind it. The entrance is a CSS sequence (`.hero-in`, `.hero-rise`,
    `.hero-stage-in`); the headline and photo move without fading so LCP is not delayed. The
    circuit motif and the scroll cue were removed.
  - **"How it all connects"** (`ConnectsAssemble`) replaced the radial diagram: on a solid
    orange band the five areas start scattered and tilted and slide into one connected column
    as the section scrolls in. Scatter is applied only after the browser confirms motion is
    allowed, so no-JS and reduced-motion visitors get the finished list.
  - **"What we do"** on the home page is a pile of sticky cards (`StackedCards` +
    `ServiceStack`). Sticking is CSS; only the slight shrink of covered cards is scripted.
    `/services` keeps the compact `ServiceGrid`.
  - **Closing CTA** is a centred statement; the **footer** content is uncovered with a parallax
    (`FooterReveal`) and ends in the brand name set large (`GiantWordmark`). A fixed
    "reveal" footer was rejected because it breaks when the footer is taller than the screen.
  - White text on orange is used only for the heading emphasis on the orange band (3.6:1, AA for
    large text). Everything smaller on orange is ink.

- **Client review of the motion pass:** type sizes were stepped down (hero 34 → 60px, h1 30 →
  42px, h2 24 → 32px), the footer wordmark was reduced so it sits fully inside the footer, and
  the reading-progress bar at the top of the window was removed.

## Accessibility

- The hero headline animates with **transform only** (no fade from 0) so it is visible on first
  paint. This was measured: fading it pushed LCP to 3.6s.
- Mobile menu is a full-height panel controlled by a button with `aria-expanded`/`aria-controls`.
  Focus moves in, Tab is trapped between the toggle and menu links, Escape closes and returns
  focus, the page behind does not scroll, and it closes automatically at desktop width.
- Stretched-link cards: the visible link carries the accessible name (plus a screen-reader-only
  suffix naming the card), while `::after` makes the whole card clickable.
- The logo link has no `aria-label`, so its accessible name matches the visible wordmark (an
  earlier label failed the "label-content-name-mismatch" audit).
- Contact form: native labels; required fields marked visually and with `required`; errors are
  linked via `aria-describedby`; on submit, focus moves to the first invalid field; success
  message receives focus; failure shows the fallback email.

## Performance

- `zod` is used only by the contact form (client) and the API route (server).
- `zod` runs in `jitless` mode so it never calls `eval` (which the CSP blocks and which logged
  a console issue).
- The motion library loads its feature bundle lazily (`LazyMotion` with a dynamic import), so
  animation code is not on the critical path.
- Images: `next/image` with explicit `sizes`, AVIF/WebP, `priority` only for the hero image.

**Measured (Lighthouse 12, mobile, production build on localhost):**

| Page                 | Perf            | A11y | Best practices          | SEO |
| -------------------- | --------------- | ---- | ----------------------- | --- |
| Home (3 runs)        | 91 / 97 / 92    | 100  | 100                     | 100 |
| /programs            | 97              | 100  | 100                     | 100 |
| /programs/policy-lab | 98              | 100  | 100                     | 100 |
| /partner             | 94              | 100  | 100                     | 100 |
| /contact             | 97              | 100  | 100 (after the zod fix) | 100 |
| /about, /impact      | 86 (single run) | 100  | 100                     | 100 |

CLS was 0 on every page. Total Blocking Time varied between runs because the test machine was
busy with other work; /about and /impact were measured once in that state. Re-measure on the
deployed site with PageSpeed Insights.

## Responsive QA

Checked in headless Chrome at 360, 390, 768, 1024, 1440 and 1920px for horizontal overflow, one
`h1` per page, content left hidden by animations, and console errors. All pages passed. Layout
issues found and fixed during QA: header CTA showing on mobile (a class conflict), the hero
placeholder caption hidden behind the floating card, the connects diagram overflowing at 1024px
(now radial from 1280px), and card rails clipping at the container edge (they now bleed to the
viewport edge).

## Security

- Security headers in `next.config.ts`: CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options:
DENY`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`; `poweredByHeader` off.
- CSP uses `'unsafe-inline'` for scripts because Next.js injects inline hydration scripts. A
  nonce-based CSP requires a `proxy.ts` and forces every page to render per request, giving up
  static prerendering. For a content site with no user accounts the static approach was preferred.
- Contact API: JSON-only, 10 KB body limit, zod validation, honeypot (silent success), naive
  per-IP rate limit (5 per 10 minutes per instance), newline stripping in the email subject,
  plain-text email (no HTML injection), no message contents in logs, secrets only on the server.
- In production without email configuration, the API returns 503 instead of pretending to
  succeed, so messages are never silently dropped.

## Known compromises

- Unknown `/programs/*` and `/services/*` slugs render the 404 page with `noindex` but an HTTP
  200 status, because those routes stream under Cache Components. Other unknown URLs return a real 404.
- Rate limiting is in-memory per instance (see README for upgrading).
- `upgrade-insecure-requests` is only added in production builds, and HSTS is always sent. Both
  are harmless on localhost.
- Static-only export (`output: "export"`) is not configured because the contact form needs a
  server. To host on a static-only service, move the form to a third-party form endpoint and enable export.
