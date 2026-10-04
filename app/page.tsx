import Image from "next/image";
import Link from "next/link";

import HeroSection from "@/components/ui/hero-section";
import { Reveal } from "@/components/ui/reveal";
import { ServiceGrid } from "@/components/service-grid";
import { CtaSection } from "@/components/cta-section";
import { Reviews } from "@/components/reviews";
import { ScrollStatement } from "@/components/scroll-statement";
import { CareJourney } from "@/components/care-journey";
import { ServiceWorkbench } from "@/components/service-workbench";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Independent Health & Social Care Consultancy",
  "Professional support for care providers and families across England. Explore quality and compliance, procurement, training, independent assessments and family support.",
  "/",
);
export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="editorial-intro section" id="our-work">
        <div className="container">
          <div className="section-rule">
            <span>01 / OUR PURPOSE</span>
            <span>PROFESSIONALLY LED. PERSONALLY INVESTED.</span>
          </div>
          <div className="intro-editorial-grid">
            <ScrollStatement />
            <div className="intro-editorial-copy">
              <p>Care is complex. Our role is to help you see a way through.</p>
              <p>
                We bring Social Work, Health Care and Medical expertise to the
                decisions that shape people’s lives. Independent advice.
                Practical support. And a firm belief that better services begin
                with understanding people.
              </p>
              <Link href="/about" className="text-link">
                Meet the thinking behind our work{" "}
              </Link>
            </div>
          </div>
          <div className="editorial-principles">
            <span>People at the centre.</span>
            <span>Quality in the detail.</span>
            <span>Opportunity ahead.</span>
          </div>
        </div>
      </section>
      <section className="editorial-services section" id="services">
        <div className="container">
          <Reveal className="editorial-section-head">
            <div>
              <span className="eyebrow">02 / HOW WE CAN HELP</span>
              <h2>
                Different challenges.
                <br />
                The same human approach.
              </h2>
            </div>
            <p>
              For care providers, professionals and families.
              <br />
              Expertise that connects the whole picture.
            </p>
          </Reveal>
          <ServiceGrid />
        </div>
      </section>
      <CareJourney />
      <ServiceWorkbench />
      <section className="human-section section">
        <div className="container human-grid">
          <Reveal className="human-portrait">
            <Image
              src="/images/consultancy.jpg"
              alt="Two professionals listening and talking through a plan"
              fill
              sizes="(max-width:700px) 100vw, 45vw"
            />
            <span className="portrait-caption">
              GOOD CONVERSATIONS. BETTER UNDERSTANDING.
            </span>
          </Reveal>
          <Reveal className="human-copy">
            <span className="eyebrow">THE PEOPLE BEHIND THE PROCESS</span>
            <h2>
              Professional by nature.
              <br />
              Human at heart.
            </h2>
            <p>
              We know the pressures care providers face. The expectations on
              your teams. The responsibility that comes with every decision.
            </p>
            <p>
              Our experience spans safeguarding, assessment, care planning,
              quality assurance, workforce development and procurement. We bring
              that knowledge to your circumstances, with care and independence.
            </p>
            <Link href="/about" className="text-link">
              A little more about us{" "}
            </Link>
            <div className="human-signoff">
              We see the person
              <br />
              behind the process.
            </div>
          </Reveal>
        </div>
      </section>
      <section className="family-editorial">
        <div className="family-editorial-image">
          <Image
            src="/images/care-conversation.jpg"
            alt="Hands held in a gesture of reassurance and support"
            fill
            sizes="(max-width:700px) 100vw, 50vw"
          />
        </div>
        <div className="family-editorial-copy">
          <span className="eyebrow">AND WHEN IT’S SOMEONE YOU LOVE</span>
          <h2>
            You don’t have to
            <br />
            find the way alone.
          </h2>
          <p>
            Care assessments. Unfamiliar systems. Difficult decisions. We’re
            here to listen and help your family understand the next step.
          </p>
          <Link href="/services/family-support" className="text-link">
            Support for your family
          </Link>
        </div>
      </section>
      <Reviews />
      <CtaSection />
    </>
  );
}
