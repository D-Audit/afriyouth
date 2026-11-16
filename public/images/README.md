# Images

Put real photos and logos here, then reference them from the content files in `src/content/`.

| What          | Where                                            | Referenced from                                                                                |
| ------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Page photos   | `public/images/your-photo.jpg`                   | `image: { src: "/images/your-photo.jpg", alt: "…", placeholder: "…" }` in any content file     |
| Partner logos | `public/images/partners/name.svg`                | `logo` field in `src/content/partners.ts`                                                      |
| Official logo | `public/images/brand/logo.svg`, `logo-white.svg` | Built into `src/components/brand/Wordmark.tsx`; these files are for documents and social media |

## Photo guidelines

- **Style:** candid, natural light, real moments. Young African people learning, collaborating,
  researching, building prototypes, presenting, debating. Follow the "Image & Photography" page of the brand guidelines: young Africans working with technology, building and presenting.
- **Avoid:** staged stock poses, poverty imagery, "saviour" framing, safari/landscape clichés,
  heavy filters, or pattern/textile stereotypes used as decoration.
- **Consent:** only use photos of people who have agreed to appear on the website.
- **Size:** export JPG or WebP around 2000px on the long edge, under 500 KB. Next.js resizes and
  converts them automatically (AVIF/WebP), so you don't need multiple sizes.
- **Alt text:** describe what matters in the photo in one sentence (e.g. "Three participants
  reviewing survey results on a laptop"). Leave `alt: ""` only for purely decorative images.

Frames keep their shape, so replacing a placeholder with a photo does not move the layout.

## Photos currently in use (`public/images/photos/`)

The six photos on the site are the ones shown on the "Image & Photography" page of the Afri Youth
Innovation Labs brand guidelines, supplied by the client:

| File                 | Shows                                                   |
| -------------------- | ------------------------------------------------------- |
| `startup.jpg`        | A young woman holding up a "Start Up" sign in an office |
| `vr-electronics.jpg` | A young person in a VR headset working on electronics   |
| `solar-team.jpg`     | Three young engineers in hard hats beside solar panels  |
| `vr-design.jpg`      | A young woman in a VR headset working at a computer     |
| `circuit.jpg`        | A young woman working closely on a circuit board        |
| `soldering.jpg`      | A young person soldering electronics under a desk lamp  |

They were taken from the guidelines PDF, so AfriYouth should confirm it holds the licence to
publish them on a website. With only six photos, some appear on more than one page.
