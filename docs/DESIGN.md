# Design system

Follows the official **Afri Youth Innovation Labs brand guidelines** (logo, colours, typography,
voice): clear Inclusive Sans headlines with an emphasis line, the brand Blue as the single action
colour, Steel Pink only as an accent and in the logo gradient, Dark Purple for text and dark
surfaces, real photography, and rounded dark feature panels next to light sections.

All tokens live in `src/app/globals.css` (`@theme`). The default Tailwind palette is disabled, so
only these tokens can be used in components.

## Logo

- The mark (figure with raised arms and three rays) is traced from the vector artwork in the
  brand guidelines PDF. It lives in `src/components/brand/Wordmark.tsx` (`LogoMark`, `Wordmark`).
  Do not redraw, recolour or stretch it.
- `gradient` version on light surfaces; one-colour `white` version on blue and dark surfaces.
- Full stacked lockups for use outside the site: `public/images/brand/logo.svg` and
  `logo-white.svg`.
- Favicon / app icon: the "Favicon & Mark" figure (no rays), white on brand Blue
  (`src/app/icon.svg`, `src/app/apple-icon.tsx`).

## Colour

Brand palette: Blue `#0301FF`, Duke Blue `#0200A7`, Steel Pink `#C723DF`, Dark Purple `#0D0624`,
White.

| Token            | Hex       | Role                                                  |
| ---------------- | --------- | ----------------------------------------------------- |
| `canvas`         | `#F5F5F7` | Page background                                       |
| `sand`           | `#ECECF3` | Alternate sections, light cards, chips                |
| `sand-deep`      | `#DDDDE8` | Hover on sand, dashed borders                         |
| `line`           | `#E2E2EC` | Hairline borders and dividers                         |
| `white`          | `#FFFFFF` | Raised light cards, form fields                       |
| `ink`            | `#0D0624` | Primary text (brand Dark Purple)                      |
| `muted`          | `#55516B` | Secondary text                                        |
| `night`          | `#0D0624` | Dark cards / sections / footer (brand Dark Purple)    |
| `night-raised`   | `#17103A` | Elements on night                                     |
| `night-line`     | `#2B2352` | Borders on night                                      |
| `on-night`       | `#F5F5F7` | Text on night                                         |
| `on-night-muted` | `#AAA6C2` | Secondary text on night                               |
| `accent`         | `#0301FF` | Brand Blue: primary buttons, links, emphasis on light |
| `accent-hover`   | `#0200A7` | Brand Duke Blue: button hover                         |
| `accent-ink`     | `#0301FF` | Blue text on light surfaces                           |
| `accent-soft`    | `#E58CF2` | Steel Pink tint: accent text on night                 |
| `accent-tint`    | `#E6E6FF` | Soft blue backgrounds (badges, chips)                 |
| `pink`           | `#C723DF` | Brand Steel Pink: gradients, glows, decoration        |
| `pink-tint`      | `#F6C9FB` | Emphasis text on solid blue                           |
| `duke`           | `#0200A7` | Brand Duke Blue surfaces                              |
| `danger`         | `#B3261E` | Form errors only (not a brand colour)                 |

`.bg-brand-gradient` / `.text-brand-gradient`: the pink-to-blue gradient of the logo figure. Use
it sparingly (final step of a journey, pull quotes).

### Verified contrast pairs (WCAG 2.2)

| Text / background           | Ratio  | Result |
| --------------------------- | ------ | ------ |
| ink / canvas                | 18.1:1 | AAA    |
| muted / canvas              | 7.0:1  | AAA    |
| muted / sand                | 6.4:1  | AA     |
| **white / accent** (button) | 8.6:1  | AAA    |
| white / accent-hover        | 13.5:1 | AAA    |
| accent-ink / canvas         | 7.9:1  | AAA    |
| accent-ink / accent-tint    | 7.0:1  | AAA    |
| on-night / night            | 18.1:1 | AAA    |
| on-night-muted / night      | 8.4:1  | AAA    |
| accent-soft / night         | 8.8:1  | AAA    |
| pink-tint / accent          | 6.0:1  | AA     |

Steel Pink `#C723DF` with white is only 4.4:1, so pink is never a background for small text; on
the gradient, text sits on the blue end or is heading-sized.

## Typography

| Role              | Font                                | Token / class         |
| ----------------- | ----------------------------------- | --------------------- |
| Titles & headings | **Inclusive Sans** 500–600           | `font-display`        |
| Body & UI         | **Inclusive Sans** 400               | `font-sans` (default) |
| Labels            | Inclusive Sans 500, sentence case   | `label-caps` utility  |

Inclusive Sans is self-hosted through `next/font` and used across the full site at different
weights. The title and body roles retain the same shared type scale for a consistent hierarchy.

Fluid type scale (`clamp()`), from 360px to 1440px+:

| Class          | Size      | Use                         |
| -------------- | --------- | --------------------------- |
| `text-hero`    | 30 → 44px | Home hero headline only     |
| `text-display` | 34 → 52px | 404, large statements       |
| `text-h1`      | 30 → 42px | Page heroes, impact figures |
| `text-h2`      | 24 → 32px | Section headings            |
| `text-h3`      | 18 → 20px | Card titles                 |
| `text-lead`    | 16 → 17px | Intros                      |
| `text-label`   | 13px      | Labels                      |

**Headline pattern:** every section title is `{ title, emphasis }`. The emphasis renders in
the accent colour (same weight, no italics), e.g. "Five capabilities, **one lab.**" Keep emphasis short (2–5 words).

## Layout

- Container: `container-site`, max 1320px, fluid side padding 16px → 40px.
- 12-column grid (`lg:grid-cols-12`) for split layouts; card grids use 2–4 columns.
- Section rhythm: `py-20 sm:py-28` (`Section` component). Alternate canvas, sand and night.
- Radius: cards `rounded-card` (20px) and `rounded-card-lg` (24px); feature bands 32px; buttons and chips pill.
- Shadows: `shadow-soft` (resting cards), `shadow-lift` (hover, floating cards).

## Pattern

`Pattern` (`src/components/ui/Pattern.tsx`) is an SVG generated in code: quarter-circle arcs that
join into continuous "connected paths". It is used only as a very faint texture (photo
placeholders, page-hero edge, CTA band, footer). Colour comes from `currentColor` at low opacity.

## Components

`src/components/ui/`

| Component                                   | Notes                                                                                                                                                                                                                |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                                    | `primary` (brand blue, white text), `secondary` (outline), `ghost`, `inverse`, `outline-light` (on dark). Optional `icon="arrow" \| "external"`. Renders `Link`, `<a>` or `<button>` automatically. Min height 44px. |
| `Badge`, `StatusBadge`                      | Mono pill. Status → colour: open = outline, upcoming = accent, ongoing = dark, closed = neutral.                                                                                                                     |
| `Card`                                      | `light` / `sand` / `dark`, optional `interactive` hover lift.                                                                                                                                                        |
| `SectionHeading`                            | Pill label (Eyebrow) + headline (accent-coloured emphasis) + intro. `as="h1"` for page heroes. Tones: light, dark.                                                                                                   |
| `Container`                                 | Max-width wrapper.                                                                                                                                                                                                   |
| `Reveal`                                    | Fade + 18px rise on scroll, once. Reduced motion: fade only.                                                                                                                                                         |
| `Accordion`                                 | Disclosure buttons with `aria-expanded` / `aria-controls`.                                                                                                                                                           |
| `Tabs`                                      | WAI-ARIA tabs with roving tabindex, arrows/Home/End.                                                                                                                                                                 |
| `FilterChips`                               | Labelled group of `aria-pressed` toggles with an "All" option.                                                                                                                                                       |
| `Input`, `Textarea`, `Select` (`Field.tsx`) | Label, hint, error, required mark, `aria-invalid`, `aria-describedby`.                                                                                                                                               |
| `FeatureIcon`                               | A standalone lucide line icon (32px, accent colour, no background shape).                                                                                                                                            |
| `StatCounter`                               | Count-up when visible; shows placeholder while value is `null`.                                                                                                                                                      |
| `Marquee`                                   | CSS marquee, pauses on hover, duplicate hidden from screen readers, static under reduced motion.                                                                                                                     |
| `Media`                                     | `next/image` wrapper or labelled warm placeholder of identical size.                                                                                                                                                 |
| `CardRail`                                  | Horizontally scrolling, snap-aligned card row with previous/next buttons.                                                                                                                                            |
| `StackedCards`                              | Sticky pile of cards; covered cards shrink slightly. Sticking is CSS, so it works without JS.                                                                                                                        |
| `FlowSteps`, `CheckList`                    | A pathway as numbered pills joined by arrows; a two-column list with check marks.                                                                                                                                    |
| `Pattern`                                   | Faint geometric texture.                                                                                                                                                                                             |
| `Icon`, `SocialIcon`                        | Content-referenced lucide icons; official brand glyphs from Simple Icons (CC0).                                                                                                                                      |

`src/components/layout/`: `Header` (sticky floating pill; glass surface after scroll; mobile menu
with focus trap), `Footer` (with `FooterReveal` and `GiantWordmark`), `SkipLink`, `PageHero`,
`Section`, `Breadcrumbs`, `PageSkeleton`, `NewsletterForm`.

`src/lib/use-media-query.ts`: `useMediaQuery` reports `false` on the server and first paint, so
scroll-driven layouts (`ScrollGallery`, `ConnectsAssemble`) start from their static form.

## Iconography

lucide-react line icons, `strokeWidth={1.5}` everywhere, 16–32px, drawn directly in the accent
colour with **no background tiles or circles**. Card icons are 32px and sit top-left above the
title; inline icons (meta rows, buttons) are 16–20px. Social links use the official brand marks
(filled, 18px, from Simple Icons). Icons are decorative (`aria-hidden`), and meaning is always
also given in text.

## Motion principles

1. **Purposeful.** Motion shows structure: content arriving, cards piling up, parts connecting.
   Scroll-linked motion animates only `transform` and `opacity`.
2. **One easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (`ease-out-soft`), 200–800ms.
3. **Above-the-fold text never starts invisible.** The hero uses a transform-only rise so the
   headline paints immediately (good for LCP).
4. **Scroll reveals:** fade + 18px rise, once per element, small stagger (60ms) in grids.
5. **Hover:** cards lift 4px with a deeper shadow; arrows nudge 2px.
6. **Count-up** for real impact numbers only.
7. **Reduced motion:** `MotionConfig reducedMotion="user"` removes movement; CSS disables the
   marquee, smooth scrolling and transitions. Nothing is hidden behind an animation.
8. **Scroll-driven sections have a static form.** Sticky positioning is CSS; scattered or pinned
   states are switched on only after the browser confirms motion is allowed.
9. The animation library is loaded lazily after hydration so it never blocks the first paint.
