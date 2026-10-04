import type { Metadata } from "next";
export const siteName = "Care Quality Compliance";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: `${title} | ${siteName}` },
    description,
    alternates: siteUrl ? { canonical: `${siteUrl}${path}` } : undefined,
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      type: "website",
      locale: "en_GB",
      ...(siteUrl ? { url: `${siteUrl}${path}` } : {}),
      siteName,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
export function structuredData(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
