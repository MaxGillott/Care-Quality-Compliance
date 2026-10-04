import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Privacy & Cookies",
  "How Care Quality Compliance handles website enquiries, necessary security information and cookies. No advertising, analytics cookies or website enquiry database.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={11} />
            <span aria-current="page">Privacy & cookies</span>
          </nav>
          <span className="eyebrow">YOUR INFORMATION, TREATED WITH CARE</span>
          <h1>Privacy & cookies.</h1>
          <p className="intro-description">
            A clear explanation of what this website does with your information.
          </p>
          <p className="legal-updated">Last updated: 3 October 2026</p>
        </div>
      </section>
      <section className="section">
        <div className="container legal-content">
          <h2>Who this notice covers</h2>
          <p>
            This notice covers the Care Quality Compliance website and initial
            enquiries about our independent professional services. Care Quality
            Compliance is responsible for deciding how the information you
            provide in an enquiry is used. You can use our{" "}
            <Link href="/contact">contact form</Link> to ask a privacy question
            or request information about the organisation responsible for your
            data.
          </p>
          <h2>Information you choose to share</h2>
          <p>
            The enquiry form asks for your name, email address, the type of
            support you need and a brief message. Your telephone number and
            organisation are optional. Please do not include medical records,
            diagnoses, safeguarding details or personal information about
            someone else. If sensitive information is needed for agreed
            professional work, we will discuss a suitable, secure way to share
            it separately.
          </p>
          <h2>What happens when you send an enquiry</h2>
          <p>
            Form information stays in your browser’s temporary memory while the
            page is open. It is not saved to local storage, session storage, a
            browser cookie or a website database. When you submit the form, the
            information is transmitted to our server for validation and passed
            to our email delivery provider, Resend, for delivery to the business
            mailbox.
          </p>
          <p>
            Sending an email necessarily means that the delivery provider and
            receiving mailbox process and may retain the message. The website’s
            no-database design does not mean that email enquiries are never
            retained. Enquiry information is used to understand and respond to
            your request, discuss potential services and manage relevant
            correspondence. It is not added to a marketing list or sold.
          </p>
          <h2>Our basis for processing</h2>
          <p>
            When you ask about services for yourself or your organisation,
            processing may be necessary to take steps at your request before
            entering a contract. We also have a legitimate interest in
            responding to business correspondence and protecting the website
            from abuse. Acknowledging this notice is not consent to marketing.
          </p>
          <h2>Necessary security processing</h2>
          <p>
            Hosting and email providers may process technical information,
            including an IP address and delivery logs, to operate and protect
            their services. When rate limiting is enabled, the application uses
            a keyed, one-way identifier derived from the connection address and
            a short-lived request counter. These counters expire after ten
            minutes and do not contain the enquiry, your name or your email
            address.
          </p>
          <p>
            Access to business correspondence should be restricted to the people
            who need it. Information may also be disclosed where required by
            law. Provider agreements, access controls and any safeguards needed
            for international transfers must be in place before live enquiry
            processing is enabled.
          </p>
          <h2>Retention</h2>
          <p>
            The website does not keep a database of your enquiry. Enquiry emails
            and business correspondence should be kept only as long as needed to
            respond, provide an agreed service or meet applicable legal and
            professional obligations. Retention for professional work depends on
            the type of engagement and will be addressed separately. You can ask
            about retention or request deletion using the contact form.
          </p>
          <h2>Cookies and tracking</h2>
          <p>
            This website does not set analytics, advertising or preference
            cookies. It does not use embedded Google Maps, social media tracking
            pixels or a third-party reviews widget. Fonts and photographs are
            served locally. A cookie consent banner is therefore not needed for
            these features.
          </p>
          <p>
            Links to external websites, including a Google review profile when
            available, take you to services with their own privacy and cookie
            policies. We do not load those services in the background.
          </p>
          <h2>Your rights</h2>
          <p>
            Under UK data protection law, rights may include access, correction,
            erasure, restriction, objection and portability, depending on the
            circumstances and lawful basis. You can use the{" "}
            <Link href="/contact">contact form</Link> to make a request. We may
            need to confirm your identity before responding.
          </p>
          <p>
            You can raise a concern with the Information Commissioner’s Office
            at{" "}
            <a
              href="https://ico.org.uk/make-a-complaint/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ico.org.uk<span className="sr-only"> (opens in a new tab)</span>
            </a>
            . We would welcome the opportunity to hear and address your concern
            first.
          </p>
          <h2>Changes to this notice</h2>
          <p>
            We will update this page if the website’s data handling changes. The
            date at the top identifies the latest version.
          </p>
        </div>
      </section>
    </>
  );
}
