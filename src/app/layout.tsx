import type { Metadata, Viewport } from "next";
import { Figtree, Poppins } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SiteLoader, LOADER_SCRIPT } from "@/components/layout/SiteLoader";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { site } from "@/content/site";
import { tokens } from "@/lib/tokens";
import "lenis/dist/lenis.css";
import "./globals.css";

/** Brand typography: Poppins for titles, headings and prominent text. */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/**
 * Body text. The brand guidelines name Gilroy, which is a commercially licensed typeface and
 * was not supplied as font files, so the site uses Figtree (a free geometric sans with very
 * similar proportions) until a Gilroy web licence is in place. To switch: put the licensed
 * .woff2 files in src/app/fonts/ and replace this with `localFont` from "next/font/local",
 * keeping `variable: "--font-body"`. Nothing else needs to change.
 */
const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: tokens.canvas,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.locale}
      className={`${poppins.variable} ${body.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOADER_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SiteLoader />
        <SkipLink />
        <MotionProvider>
          <SmoothScroll>
            <Header />
            <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
