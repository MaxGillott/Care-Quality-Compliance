import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Terms of Use",
  "Terms for using the Care Quality Compliance website, including the scope of information, independent consultancy and enquiry handling.",
  "/terms",
);
export default function TermsPage() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={11} />
            <span aria-current="page">Terms of use</span>
          </nav>
          <span className="eyebrow">CLEAR FROM THE START</span>
          <h1>Terms of use.</h1>
          <p className="intro-description">
            Please read these terms when using the Care Quality Compliance
            website.
          </p>
          <p className="legal-updated">Last updated: 3 October 2026</p>
        </div>
      </section>
      <section className="section">
        <div className="container legal-content">
          <h2>About the information on this site</h2>
          <p>
            This website describes independent professional support available
            through Care Quality Compliance in England. Its content is general
            information and is not a substitute for advice based on your
            individual circumstances, a statutory assessment, clinical treatment
            or legal advice.
          </p>
          <h2>Independent advice</h2>
          <p>
            Care Quality Compliance is independent of the Care Quality
            Commission (CQC), local authorities and NHS decision-making bodies.
            Our advice, reviews, reports and training do not replace their
            statutory functions. We do not guarantee inspection ratings, funding
            decisions, tender awards or any other third-party outcome.
          </p>
          <h2>Enquiries and professional engagements</h2>
          <p>
            Submitting an enquiry does not create a professional-client
            relationship or commit either party to provide or purchase services.
            We will discuss suitability, scope, fees, timescales,
            confidentiality and any applicable cancellation rights before an
            engagement is agreed. Separate terms will apply to the work.
          </p>
          <h2>Urgent concerns</h2>
          <p>
            This website and its enquiry form are not emergency or safeguarding
            reporting services. If someone is in immediate danger, call 999. For
            safeguarding concerns, contact the relevant local authority. For
            urgent medical advice where there is no immediate danger, use NHS
            111.
          </p>
          <h2>Appropriate use</h2>
          <p>
            Please provide accurate information, avoid submitting sensitive
            personal details through the initial enquiry form, and do not use
            the website to send unlawful or harmful material or interfere with
            its operation.
          </p>
          <h2>Content and photography</h2>
          <p>
            Website content and design may be protected by intellectual property
            rights. You may use the site for personal and legitimate business
            information. Photography is illustrative and does not identify our
            staff, clients or particular care services. Third-party assets
            remain subject to their owners’ rights.
          </p>
          <h2>Availability and external links</h2>
          <p>
            We aim to keep information useful and current, but cannot promise
            uninterrupted availability or that general information will suit
            every circumstance. External links are provided for convenience and
            are governed by the external service’s own terms.
          </p>
          <h2>Your statutory rights</h2>
          <p>
            Nothing in these terms excludes rights or responsibilities that
            cannot lawfully be excluded, including liability for fraud or death
            or personal injury caused by negligence. Applicable consumer rights
            remain unaffected.
          </p>
          <h2>Questions</h2>
          <p>
            If you would like to clarify these terms or the scope of our
            support, please <Link href="/contact">contact us</Link> before
            relying on website information or agreeing services.
          </p>
        </div>
      </section>
    </>
  );
}
