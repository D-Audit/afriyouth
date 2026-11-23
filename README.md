# AfriYouth Innovation Labs

A responsive website created for the AfriYouth Innovation Labs Web Design Challenge. It introduces AfriYouth’s mission and connected areas of work, and gives young people, organizations and partners clear ways to explore programs, services, opportunities and collaboration.

## About AfriYouth

AfriYouth Innovation Labs seeks to empower Africa’s youth to generate evidence, shape policy and develop innovative solutions to pressing socio-economic challenges through research, human-centered design and entrepreneurship. Its work brings together research, policy, human-centered design, entrepreneurship and foresight to support inclusive and sustainable socio-economic transformation.

## Website experience

The site is organized around three audiences:

- **Young people** can explore programs and opportunities and find details on how to contact the team.
- **Organizations** can explore services across research, policy, innovation, impact and capacity building.
- **Partners and institutions** can learn about AfriYouth’s work and explore collaboration.

The website includes Home, About, Services, Programs, Opportunities, Impact, Partner and Contact pages, plus Privacy and Terms pages. Shared navigation, responsive layouts and a contact form provide clear routes through the site. Program pages present available information and direct visitors to the contact form for current details where dates or eligibility have not been confirmed.

## Design and technology

The visual identity follows the supplied AfriYouth brand guide, including its logo, color palette and typography. The site uses Poppins for headings and Urbanist as a free stand-in for the licensed Gilroy body font.

| Technology | Role |
| --- | --- |
| Next.js 16 App Router | Website pages and server-side contact endpoint |
| TypeScript | Application and content types |
| Tailwind CSS 4 | Responsive interface styling and design tokens |
| Motion | Scroll and interface animation with reduced-motion support |
| lucide-react | Consistent outline interface icons |
| Zod | Contact form validation |

## Included visual assets

The image and brand assets used by the website are included in this repository:

### Photography

Six photographs supplied in the AfriYouth brand guide are included in `public/images/photos/` and used throughout the site:

| Asset | Subject |
| --- | --- |
| `startup.jpg` | Young woman holding a “Start Up” sign |
| `vr-electronics.jpg` | Young person using a VR headset while working with electronics |
| `solar-team.jpg` | Three young engineers beside solar panels |
| `vr-design.jpg` | Young woman using a VR headset at a computer |
| `circuit.jpg` | Young woman working on a circuit board |
| `soldering.jpg` | Young person soldering electronics |

### Logos and icons

- `public/images/brand/logo.svg` and `logo-white.svg` are the supplied logo lockups for light and dark backgrounds.
- `src/components/brand/Wordmark.tsx` renders the AfriYouth logo in the website header, footer and loader.
- `src/app/icon.svg` and `src/app/apple-icon.tsx` provide the website icon assets.
- Interface icons are rendered from the `lucide-react` icon set; they are included through the project dependency rather than stored as individual image files.

### Fonts

Poppins and Urbanist are loaded with Next.js `next/font/google`, which fetches and self-hosts optimized font files as part of the build. The font binaries are generated for the built site and are not separate files in the repository. Urbanist is used as a free substitute for the brand guide’s paid Gilroy font.

## Project structure

```text
src/
├── app/          Pages, shared layout, metadata and contact API route
├── components/   Brand, layout, page sections and interface components
├── content/      Typed website copy and page data
└── lib/          Shared SEO, validation and utility code
public/images/    Brand lockups and supplied photography
public/           Website icons and other public assets
docs/             Design system and project decisions
```

## Running the project

Requires Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

The local site is available at <http://afriyouth-chi.vercel.app>.

## Challenge deliverables

The challenge deliverables are a functional deployed website with a working review URL, the Figma design file(s), and relevant project assets and documentation. The source code, included assets and project documentation are maintained together in this repository to support review and future handover.

## Project documentation

- [Design system](docs/DESIGN.md)
- [Project decisions](docs/DECISIONS.md)
- [Content editing guide](src/content/README.md)
- [Image and photo inventory](public/images/README.md)
