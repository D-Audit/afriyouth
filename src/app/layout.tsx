import type { Metadata, Viewport } from "next";
import { Inclusive_Sans } from "next/font/google";
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

/** One typeface across the site; the shared type scale keeps headings and body copy distinct. */
const inclusiveSans = Inclusive_Sans({
  variable: "--font-inclusive-sans",
  subsets: ["latin"],
  weight: "variable",
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
      className={`${inclusiveSans.variable} antialiased`}
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
