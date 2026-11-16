import type { MetadataRoute } from "next";
import { mainNav } from "@/content/navigation";
import { programs } from "@/content/programs";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...mainNav.map((item) => item.href),
    "/contact",
    "/privacy",
    "/terms",
    ...services.map((service) => `/services/${service.slug}`),
    ...programs.map((program) => `/programs/${program.slug}`),
  ];
  return paths.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
