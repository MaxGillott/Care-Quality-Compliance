import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const pages = [
    "",
    "/about",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/contact",
    "/privacy",
    "/accessibility",
    "/terms",
  ];
  return pages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-10-03"),
    changeFrequency: path.startsWith("/services") ? "monthly" : "yearly",
    priority:
      path === ""
        ? 1
        : path.startsWith("/services/")
          ? 0.85
          : path === "/services"
            ? 0.9
            : 0.5,
  }));
}
