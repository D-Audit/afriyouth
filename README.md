# AfriYouth Innovation Labs: website

The public website for **AfriYouth Innovation Labs**. It is a gateway for three audiences:
young people looking for opportunities, organizations looking for services, and partners
exploring collaboration.

> **Status:** complete build with placeholder content. Every text, number, name and photo marked
> `[like this]` must be replaced with official content before launch. See
> [What to replace before launch](#what-to-replace-before-launch).

---

## Contents


1. [Stack and why](#stack-and-why)
2. [Getting started](#getting-started)
3. [Scripts](#scripts)
4. [Folder structure](#folder-structure)
5. [Editing content](#editing-content)
6. [Images and logo](#images-and-logo)
7. [Design tokens](#design-tokens)
8. [Contact form setup](#contact-form-setup)
9. [Environment variables](#environment-variables)
10. [Deployment](#deployment)
11. [Accessibility and performance checklist](#accessibility-and-performance-checklist)
12. [What to replace before launch](#what-to-replace-before-launch)
13. [Known limitations](#known-limitations)

More detail: [`docs/DESIGN.md`](docs/DESIGN.md) (design system) and
[`docs/DECISIONS.md`](docs/DECISIONS.md) (why things are the way they are).

---

## Stack and why

| Tool                                           | Why                                                                                                                                                             |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Next.js 16** (App Router, TypeScript strict) | Mainstream, well-documented, first-class hosting on Vercel and Netlify. Pages are prerendered to static HTML, so the site is fast and cheap to host.            |
| **Tailwind CSS 4**                             | Styling lives next to the markup; all colours, type sizes and radii come from one token file.                                                                   |
| **next/font**                                  | Poppins headings and Urbanist body text, self-hosted automatically. |
| **lucide-react**                               | One consistent outline icon set (1.5px stroke).                                                                                                                 |
| **motion** (Framer Motion)                     | Small, accessible scroll-reveal and count-up animations that respect "reduce motion".                                                                           |
| **zod**                                        | One validation schema shared by the contact form (browser) and the API route (server).                                                                          |
| **ESLint + Prettier**                          | Consistent, checked code.                                                                                                                                       |

### Fonts

The brand guide specifies Poppins for titles and Gilroy for body text. Urbanist is used as a free Gilroy stand-in; replace it with licensed Gilroy files if supplied.

There is **no database and no CMS**. Content is edited in typed files (see below). Every extra
dependency is something the maintenance team would have to update, so the list is kept short.

## Getting started

Requirements: **Node.js 20.9 or newer** (LTS recommended) and npm.

```bash
npm install
cp .env.example .env.local   # optional, see "Environment variables"
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Command                | What it does                                                    |
| ---------------------- | --------------------------------------------------------------- |
| `npm run dev`          | Development server with live reload.                            |
| `npm run build`        | Production build (also type-checks).                            |
| `npm start`            | Serves the production build locally (run `build` first).        |
| `npm run lint`         | ESLint (Next.js + TypeScript rules).                            |
| `npm run typecheck`    | TypeScript check of the whole project, including content files. |
| `npm run format`       | Formats everything with Prettier.                               |
| `npm run format:check` | Checks formatting without changing files (useful in CI).        |

## Folder structure

```
src/
├── app/                    Pages (one folder per URL) + SEO files
│   ├── page.tsx            Home (/)
│   ├── about/              /about
│   ├── services/           /services and /services/[slug] (7 areas of work)
│   ├── programs/           /programs (filterable) and /programs/[slug]
│   ├── opportunities/      /opportunities
│   ├── impact/             /impact (impact, stories, resources)
│   ├── partner/            /partner
│   ├── contact/            /contact
│   ├── privacy/, terms/    Privacy and terms pages
│   ├── api/contact/        Contact form endpoint (server only)
│   ├── not-found.tsx       404 page
│   ├── sitemap.ts, robots.ts, manifest.ts
│   ├── icon.svg, apple-icon.tsx, opengraph-image.tsx, twitter-image.tsx
│   ├── layout.tsx          Fonts, header, footer, global metadata
│   └── globals.css         Design tokens (colours, type scale, radii, shadows)
├── components/
│   ├── ui/                 Reusable building blocks (Button, Card, Tabs, Accordion, …)
│   ├── layout/             Header, Footer, SkipLink, PageHero, Section, Breadcrumbs
│   ├── sections/           Page sections (hero, card grids, filters, contact form, …)
│   └── brand/              Brand wordmark traced from the guide
├── content/                ALL website text (see src/content/README.md)
└── lib/                    Small helpers (SEO metadata, form schema, tokens for images)
public/images/              Photos and logos you add (see public/images/README.md)
docs/                       DESIGN.md and DECISIONS.md
```

## Editing content

All text lives in `src/content/`. Components receive content through props and never contain
copy, so **replacing text never requires touching components**.

- `site.ts`: name, description, social links, short interface labels
- `navigation.ts`: header and footer links
- `home.ts`, `about.ts`, `services.ts`, `programs.ts`, `opportunities.ts`, `impact.ts`,
  `partners.ts`, `contact.ts`, `legal.ts`: one file per page or topic

Each file starts with a comment describing its shape. **Full instructions with examples:
[`src/content/README.md`](src/content/README.md).**

Adding a service or program entry automatically creates its page and adds it to filters, related
lists and the sitemap.

## Images and logo

- **Photos:** put files in `public/images/` and set `src` (and `alt`) on the relevant `image`
  field in a content file. The site currently uses credited Unsplash stock photos as stand-ins (see
  `public/images/README.md`). If `src` is empty, a warm labelled placeholder (`[Photo: …]`) of the same shape
  is shown, so swapping in a real photo causes no layout shift. Images are served through
  `next/image` (responsive sizes, AVIF/WebP, lazy-loaded below the fold).
- **Photo style:** candid, natural light, young African people learning, collaborating and
  presenting. No clichés. Full guidance: [`public/images/README.md`](public/images/README.md).
- **Logo:** the official logo is traced from the brand guide in `src/components/brand/Wordmark.tsx`, with lockups in `public/images/brand/`.
- **Favicon / app icons:** replace `src/app/icon.svg`; update the mark in
  `src/app/apple-icon.tsx`. The social sharing image is generated by
  `src/app/opengraph-image.tsx` from the home headline.
- **Partner logos:** `public/images/partners/` + the `logo` field in `src/content/partners.ts`.

## Design tokens

All colours, fonts, type sizes, radii, shadows and animations are defined once in
`src/app/globals.css` (the `@theme` block) and used as Tailwind classes, e.g. `bg-canvas`,
`text-accent-ink`, `rounded-card-lg`, `text-h2`. The default Tailwind palette is switched off, so
components can only use these tokens.

| Token         | Value     | Use                                               |
| ------------- | --------- | ------------------------------------------------- |
| `canvas`      | `#F5F5F7` | Page background                                   |
| `sand`        | `#ECECF3` | Alternate sections, light cards                   |
| `ink`         | `#0D0624` | Main text (brand Dark Purple)                     |
| `muted`       | `#55516B` | Secondary text (AA on canvas and sand)            |
| `night`       | `#0D0624` | Dark cards and sections (brand Dark Purple)       |
| `accent`      | `#0301FF` | Brand Blue: buttons (white text), links, emphasis |
| `duke`        | `#0200A7` | Brand Duke Blue: hover, blue panels               |
| `pink`        | `#C723DF` | Brand Steel Pink: gradients and decoration only   |
| `accent-soft` | `#E58CF2` | Pink tint for accent text on dark backgrounds     |

The values follow the official brand guidelines. To adjust them, change `globals.css` (and `src/lib/tokens.ts`, which mirrors a few of
them for generated images). Full guide: [`docs/DESIGN.md`](docs/DESIGN.md).

## Contact form setup

The form at `/contact` validates in the browser and again on the server
(`src/app/api/contact/route.ts`) using the same zod schema. It includes a hidden honeypot field
for bots and a simple per-IP rate limit.

Delivery uses [Resend](https://resend.com) through its HTTP API (no extra package):

1. Create a Resend account and verify your sending domain.
2. Create an API key.
3. Set these environment variables in your hosting dashboard (or `.env.local` for local tests):
   - `RESEND_API_KEY`: the API key
   - `CONTACT_TO_EMAIL`: the inbox that should receive messages
   - `CONTACT_FROM_EMAIL`: optional, e.g. `AfriYouth Website <website@verified-domain>`
     (must be on your verified domain)
4. Redeploy.

Behaviour without these variables:

- **Development (`npm run dev`):** submissions are accepted and only metadata (role, message
  length) is logged to the terminal. Message contents are never logged.
- **Production:** the API responds with an error and the form shows a friendly retry message.

To use another provider, replace the `fetch` call in `src/app/api/contact/route.ts`.

Program pages link to the general contact form with the program named in the message, so visitors
can ask the team for current details without being shown an unconfirmed application process.

## Environment variables

See `.env.example`. None are required to build.

| Variable               | Required    | Exposed to browser | Purpose                                                                 |
| ---------------------- | ----------- | ------------------ | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Yes (it's public)  | Canonical URLs, sitemap, social cards. Defaults to `https://afriyouth-chi.vercel.app`. |
| `RESEND_API_KEY`       | For email   | **No**             | Resend API key                                                          |
| `CONTACT_TO_EMAIL`     | For email   | **No**             | Where form submissions are sent                                         |
| `CONTACT_FROM_EMAIL`   | Optional    | **No**             | Sender address on a verified domain                                     |

Never commit `.env.local`. It is git-ignored.

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel, **Add New → Project**, import the repo. The framework is detected automatically.
3. Add the environment variables above (Settings → Environment Variables).
4. Deploy. Add your custom domain under Settings → Domains, then set `NEXT_PUBLIC_SITE_URL` to it
   and redeploy.

### Netlify

1. **Add new site → Import an existing project**, pick the repo.
2. Build command `npm run build`. Netlify's Next.js runtime is applied automatically.
3. Add the same environment variables and deploy.

### Any Node.js host (VPS, Render, Railway, Docker…)

```bash
npm ci
npm run build
npm start          # serves on port 3000; set PORT to change it
```

Put it behind HTTPS. Security headers are already set in `next.config.ts`.

> **Static-only hosting** (no server, e.g. plain S3/GitHub Pages) is not supported out of the box
> because the contact form needs a server route. See `docs/DECISIONS.md` for the trade-offs.

## Accessibility and performance checklist

Verified during the build (results in `docs/DECISIONS.md`). Re-check after big content changes:

- [x] One `<h1>` per page; headings in order; landmarks (`header`, `nav`, `main`, `footer`)
- [x] Skip link to main content; visible focus outline on every interactive element
- [x] Mobile menu: keyboard operable, focus trapped while open, Escape closes, focus returns
- [x] Tabs (arrow keys, Home/End), accordion (`aria-expanded`), filter chips (`aria-pressed`)
- [x] Form: labels, required markers, errors linked with `aria-describedby`, focus moves to the first error
- [x] WCAG AA contrast for all text/background token pairs
- [x] Tap targets at least 44 px
- [x] `prefers-reduced-motion` respected (no movement, marquee stops, no smooth scroll)
- [x] Responsive from 360 px to 1920 px with no horizontal scrolling
- [x] Lighthouse mobile (Home): Performance 91–97, Accessibility 100, Best Practices 100, SEO 100
      (measured before the rebrand; re-measure on the live site)
- [x] Per-page titles/descriptions, Open Graph + Twitter cards, `sitemap.xml`, `robots.txt`, Organization JSON-LD
- [ ] After adding real photos: write meaningful `alt` text and keep files under ~500 KB
- [ ] After launch: run [PageSpeed Insights](https://pagespeed.web.dev/) on the live URL

## What to replace before launch

Before launch, confirm or replace:

- Official contact email, phone and address; social URLs (`site.ts`, `contact.ts`)
- Final domain in `NEXT_PUBLIC_SITE_URL`
- Licensed Gilroy font files if available
- More approved photos; six are currently used and some repeat on a page
- Program dates and eligibility
- Opportunity titles, deadlines, locations and links
- Impact figures (`value: null` → real numbers), stories and resources
- Partner logos and names
- Founding story, vision statement, team members
- Partnership FAQ answers and "how to start" details
- Legal review of the privacy and terms pages
- Reconcile which mission and vision statement is official

## Known limitations

- **Content editing is code-based.** Editors change TypeScript files and redeploy. This is
  deliberate (no CMS to maintain). A headless CMS can be added later because components already
  receive content through props.
- **Rate limiting is per server instance and in memory.** It deters casual spam but is not a hard
  guarantee on serverless hosting. Add a shared store (e.g. Upstash Redis) if spam becomes a problem.
- **Content Security Policy allows inline scripts** (`'unsafe-inline'`), which Next.js needs for
  hydration without a nonce setup. Everything else is locked to the site's own origin.
- **Unknown program/service URLs** show the 404 page with `noindex`, but return HTTP 200 because
  those pages stream (a Next.js Cache Components behaviour). All other unknown URLs return a real 404.
