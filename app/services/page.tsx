import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ServiceGrid } from "@/components/service-grid";
import { CtaSection } from "@/components/cta-section";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "How We Can Help",
  "Explore independent care consultancy, quality and compliance, procurement, professional training, assessments and family support across England.",
  "/services",
);
export default function ServicesPage() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={11} />
            <span aria-current="page">How we can help</span>
          </nav>
          <div className="services-intro-grid">
            <div>
              <span className="eyebrow">OUR SERVICES</span>
              <h1>
                People. Care. Quality.
                <br />
                <span>Possibility.</span>
              </h1>
              <p className="intro-description">
                Supporting people. Strengthening services. Creating
                opportunities. Independent professional support, built around
                what you need.
              </p>
            </div>
            <div className="services-intro-note">
              <p>
                Whether you’re improving your care service, developing your team
                or finding support for someone you love, we’ll help you take the
                next step.
              </p>
              <Link className="text-link" href="/contact">
                Not sure where to start? Let’s talk
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ServiceGrid />
        </div>
      </section>
      <CtaSection />
    </>
  );
}
