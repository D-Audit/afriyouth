import { LegalContent } from "@/components/sections/LegalContent";
import { termsPage } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(termsPage.meta, "/terms");

export default function TermsPage() {
  return <LegalContent page={termsPage} />;
}
