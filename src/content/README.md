# Editing site content

Every word on the website lives in this folder. Components never contain copy, so you can change
text, links, programs and opportunities without touching any React code.

**Rules of thumb**

- Only edit the text inside quotes (`"…"`). Keep commas, brackets and field names as they are.
- Text in `[square brackets]` is placeholder content waiting for official copy. Search the folder
  for `[` to find everything that still needs replacing.
- Internal links start with `/` (e.g. `"/contact"`). External links start with `https://`.
- After editing, run `npm run typecheck`. If you mistype a field name or remove a required one,
  it will tell you exactly which file and line to fix.

## Files

| File               | What it controls                                                                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `site.ts`          | Organization name, wordmark text, tagline, description, site URL, social links, and short interface strings (menu labels, status names, "Learn more", filter labels). |
| `navigation.ts`    | Header menu, the blue "Get Involved" button, footer link groups, legal links, copyright line.                                                                         |
| `home.ts`          | Every section of the home page, top to bottom: hero, "How it all connects", section headings, audience tabs, final call to action.                                    |
| `about.ts`         | The About page: story, mission, vision, what makes us different, six values, approach, team placeholders.                                                             |
| `services.ts`      | The five labs and two supporting services, plus the five divisions. Each entry creates a page at `/services/<slug>` automatically.                                    |
| `programs.ts`      | Programs and their filters. Each program creates a page at `/programs/<slug>` automatically.                                                                          |
| `opportunities.ts` | Open calls shown on `/opportunities` and the home page.                                                                                                               |
| `impact.ts`        | Impact figures, stories of change and the resources list.                                                                                                             |
| `partners.ts`      | Partner logos and all text on the Partner With Us page.                                                                                                               |
| `contact.ts`       | Contact details (email, phone, location), contact form labels, errors and success messages.                                                                            |
| `legal.ts`         | Placeholder privacy policy, terms of use and the 404 page text.                                                                                                       |
| `types.ts`         | Shared type definitions. You don't normally need to edit it.                                                                                                          |

## Common tasks

### Add a program

1. Open `programs.ts` and copy one whole entry inside the `programs` list (from `{` to `},`).
2. Give it a new, unique `slug` using lowercase words and hyphens, e.g. `"climate-fellowship"`.
3. Fill in the fields. `status` must be one of `"open"`, `"upcoming"`, `"ongoing"`, `"closed"`.
   `topic` must be one of the service slugs (e.g. `"research"`). `audiences` can include
   `"young-people"`, `"organizations"` and `"partners"`.
4. The new page appears at `/programs/climate-fellowship`, in the filters, on the home page rail,
   on the related service page and in the sitemap.

### Open or close an opportunity

Change `status` in `opportunities.ts`. Open calls are listed first; closed calls stay visible but
de-emphasised. `nextStep` is the button: set its `label` and `href` (an internal page or an external
application form).

### Show real impact numbers

In `impact.ts`, change `value: null` to a number, e.g. `value: 1250`. The figure then counts up
when scrolled into view. While `value` is `null` the `placeholder` text (`"[00]"`) is shown.

### Replace a photo

Put the file in `public/images/` and set `src` on the matching `image` field, plus a meaningful
`alt` description. See `public/images/README.md` for photo guidance.

### The logo

The official logo is already built in (`src/components/brand/Wordmark.tsx`, favicon in
`src/app/icon.svg`). The stacked lockups for documents and social media are in
`public/images/brand/`. Follow the brand guidelines and do not redraw or recolour it.

### Sections that appear when you add content

These stay hidden while their list is empty, so the live site never shows placeholders: team
(`about.ts`), partner logos and partnership FAQ (`partners.ts`), impact figures, stories and
downloads (`impact.ts`), and the Opportunities page and menu item (`opportunities.ts`). Each list
has a commented example to copy.

### Open a program for applications

Programs show no status or dates until they are confirmed. In `programs.ts`, add
`status: "open"` to the program and point `apply.href` at the application form.
