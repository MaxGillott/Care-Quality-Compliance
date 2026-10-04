import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl, structuredData } from "@/lib/site";
import "./globals.css";
import "./editorial.css";
import "./atelier.css";
import "./controls.css";
const bodyFont = localFont({
  src: "../public/fonts/ibm-plex-sans.woff2",
  weight: "100 700",
  style: "normal",
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : new URL("http://localhost:3000"),
  title: {
    default:
      "Care Quality Compliance | Independent Care Consultancy in England",
    template: "%s | Care Quality Compliance",
  },
  description:
    "Independent health and social care consultancy across England. Practical support for care providers, quality and compliance, procurement, training and families.",
  robots: siteUrl
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Care Quality Compliance",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Care Quality Compliance. Professional expertise. Compassionate care.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  applicationName: "Care Quality Compliance",
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") || undefined;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Care Quality Compliance",
    description:
      "Independent professional support for care providers, families and organisations across England.",
    ...(siteUrl ? { url: siteUrl, "@id": `${siteUrl}/#organisation` } : {}),
    areaServed: { "@type": "AdministrativeArea", name: "England" },
    knowsAbout: [
      "Social care consultancy",
      "Care quality and compliance",
      "Social care procurement",
      "Safeguarding",
      "Professional training",
      "Independent assessments",
    ],
  };
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={bodyFont.variable}
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <script
          nonce={nonce}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData(schema) }}
        />
      </body>
    </html>
  );
}
