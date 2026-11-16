import { LegalContent } from "@/components/sections/LegalContent";
import { privacyPage } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(privacyPage.meta, "/privacy");

export default function PrivacyPage() {
  return <LegalContent page={privacyPage} />;
}
