import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Accessibility",
  "Information about accessible navigation, readable content, reduced motion and getting support when using the Care Quality Compliance website.",
  "/accessibility",
);
export default function AccessibilityPage() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={11} />
            <span aria-current="page">Accessibility</span>
          </nav>
          <span className="eyebrow">SUPPORT SHOULD BE ACCESSIBLE</span>
          <h1>A website for everyone.</h1>
          <p className="intro-description">
            We want you to be able to understand our services and contact us in
            a way that works for you.
          </p>
          <p className="legal-updated">Last updated: 4 October 2026</p>
        </div>
      </section>
      <section className="section">
        <div className="container legal-content">
          <h2>Our approach</h2>
          <p>
            This website has been designed with the Web Content Accessibility
            Guidelines (WCAG) 2.2 Level AA in mind. This is a design target, not
            a claim of independently certified conformance. We continue to
            review the site and welcome reports of barriers.
          </p>
          <h2>Features designed to help</h2>
          <ul>
            <li>Clear headings, plain language and consistent navigation.</li>
            <li>
              Keyboard-operable links, menus and form controls with visible
              focus indicators.
            </li>
            <li>A skip link to move directly to the main content.</li>
            <li>
              Text labels and helpful validation messages on the enquiry form.
            </li>
            <li>
              Responsive layouts that support mobile screens and browser zoom.
            </li>
            <li>Alternative text for meaningful photographs.</li>
            <li>Reduced animation when your device requests reduced motion.</li>
            <li>
              A muted background film with a visible pause control. No audio
              plays.
            </li>
          </ul>
          <h2>Using the site with a keyboard</h2>
          <p>
            Press Tab to move between controls and Shift + Tab to move
            backwards. Enter activates links and buttons. Escape closes the
            mobile menu or services dropdown. The mobile menu keeps keyboard
            focus inside it until you close it. Frequently asked questions use
            standard expandable controls. In the quality-review and tender-stage
            tabs, use Left and Right Arrow to move between options, or Home and
            End to jump to the first or last option. Training filters use
            standard buttons, and topic details expand with Enter or Space.
          </p>
          <h2>Animations and readability</h2>
          <p>
            The site follows the reduced-motion setting on your device. The
            homepage film stays still when reduced motion or data saving is
            requested, unless you choose to play it. The scroll-led care journey
            becomes four ordinary, readable sections on mobile or with reduced
            motion. You can also enlarge text using your browser’s zoom
            controls. Our colour palette is designed to keep text readable, and
            information is not communicated through colour alone.
          </p>
          <h2>Contacting us about a barrier</h2>
          <p>
            Please use the <Link href="/contact">contact form</Link> to tell us
            which page you were using, what went wrong and, if you are
            comfortable sharing, which browser or assistive technology you use.
            Avoid sending health or other sensitive information.
          </p>
          <p>
            If you need information in an alternative format or an adjustment
            when speaking with our team, tell us what would help. We will
            discuss what we can reasonably provide.
          </p>
          <h2>Scope and limitations</h2>
          <p>
            External websites linked from this site have their own accessibility
            arrangements. Some interactions, including the guided enquiry form,
            require JavaScript. Automated checks do not replace testing with
            disabled users and assistive technologies.
          </p>
        </div>
      </section>
    </>
  );
}
