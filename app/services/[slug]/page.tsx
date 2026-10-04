import "../../service-pages.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

import { services } from "@/lib/services";
import { pageMetadata, siteUrl, structuredData } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Faq } from "@/components/faq";
import { CtaSection } from "@/components/cta-section";
import {
  ConsultancyPage,
  QualityPage,
  ProcurementPage,
  TrainingPage,
  AssessmentsPage,
  FamilyPage,
} from "@/components/service-pages";
const practicePages = {
  "care-provider-consultancy": ConsultancyPage,
  "quality-and-compliance": QualityPage,
  "procurement-and-contracts": ProcurementPage,
  "training-and-development": TrainingPage,
  "independent-assessments": AssessmentsPage,
  "family-support": FamilyPage,
};
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return service
    ? pageMetadata(
        service.title,
        service.intro + " Independent support across England.",
        `/services/${slug}`,
      )
    : {};
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  const PracticePage = practicePages[slug as keyof typeof practicePages];
  const nonce = (await headers()).get("x-nonce") || undefined;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.description,
    serviceType: s.title,
    areaServed: { "@type": "AdministrativeArea", name: "England" },
    provider: {
      "@type": "Organization",
      name: "Care Quality Compliance",
      ...(siteUrl ? { "@id": `${siteUrl}/#organisation` } : {}),
    },
    ...(siteUrl ? { url: `${siteUrl}/services/${s.slug}` } : {}),
  };
  return (
    <>
      <PracticePage service={s} />
      <section className="section">
        <div className="container faq-section-grid">
          <div>
            <span className="eyebrow">A LITTLE MORE CLARITY</span>
            <h2>
              Your questions,
              <br />
              answered.
            </h2>
            <Link href={`/contact?service=${s.slug}`} className="text-link">
              Ask us something else
            </Link>
          </div>
          <Faq items={s.faqs} />
        </div>
      </section>
      <div className="service-related">
        <div className="container related-inner">
          <span>Care is connected. So is our support.</span>
          <p>Discover the other ways we can help.</p>
          <Button asChild variant="outline" size="small">
            <Link href="/services">Explore all services</Link>
          </Button>
        </div>
      </div>
      <CtaSection />
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData(schema) }}
      />
    </>
  );
}
