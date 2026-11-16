import type { Metadata } from "next";
import { site } from "@/content/site";
import type { PageMeta } from "@/content/types";

/** Builds per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata(meta: PageMeta, path: string): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}
