import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { values } from "@/lib/services";
import { pageMetadata } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/cta-section";
export const metadata = pageMetadata(
  "About Us",
  "Meet the approach behind Care Quality Compliance. Led by Social Workers, Health Care and Medical Professionals, with independent advice and a human approach.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={11} />
            <span aria-current="page">About us</span>
          </nav>
          <span className="eyebrow">EXPERIENCE YOU CAN TRUST</span>
          <h1>
            Professional by nature.
            <br />
            <span>Human at heart.</span>
          </h1>
          <p className="intro-description">
            Care Quality Compliance brings together professional expertise and
            genuine compassion. We help people, strengthen services and create
            better opportunities across health and social care in England.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container story-grid">
          <Reveal className="story-copy">
            <span className="eyebrow">A LITTLE ABOUT US</span>
            <h2>
              We understand the system.
              <br />
              We never lose sight of the person.
            </h2>
            <p>
              Families can struggle to navigate systems. Care providers face
              increasing expectations around quality and compliance.
              Organisations need the right people, processes and evidence to
              demonstrate that they can deliver excellent care.
            </p>
            <p>
              Our team understands these challenges from professional
              experience. Led by experienced Social Workers, Health Care and
              Medical Professionals, we bring knowledge of safeguarding,
              assessment, care planning, quality assurance, workforce
              development, compliance and procurement.
            </p>
            <p>
              Our approach is professional and independent, but always grounded
              in compassion. We see the person behind the process.
            </p>
            <Link className="text-link" href="/contact">
              Find out how we can work together
            </Link>
          </Reveal>
          <Reveal className="story-image" delay={100}>
            <Image
              src="/images/consultancy.jpg"
              alt="Two professionals listening carefully and discussing a plan"
              fill
              sizes="(max-width:700px) 90vw, 45vw"
            />
          </Reveal>
        </div>
      </section>
      <section className="about-statement">
        <div className="container">
          <span className="eyebrow">OUR BELIEF</span>
          <h2>
            Good care starts with understanding
            <br className="desktop-only" /> the person, not simply the service.
          </h2>
          <p>
            Whether we’re supporting a family or an organisation, our focus is
            on practical solutions that keep people at the centre.
          </p>
        </div>
      </section>
      <section className="section" id="values">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WHAT GUIDES US</span>
              <h2>
                People first.
                <br />
                Always.
              </h2>
            </div>
            <p
              className="approach-description"
              style={{ color: "var(--muted)" }}
            >
              Six values guide how we listen, advise and work alongside the
              people who place their trust in us.
            </p>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 80}>
                <div className="value-item">
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section outcomes-section">
        <div className="container story-grid">
          <div>
            <span className="eyebrow">
              PROFESSIONAL EXPERTISE. PRACTICAL SUPPORT.
            </span>
            <h2>
              A partner in
              <br />
              your next chapter.
            </h2>
          </div>
          <div className="story-copy">
            <p>
              We don’t believe in identifying problems and simply leaving you
              with a report. We listen to the circumstances, assess the
              available evidence, identify areas of concern or opportunity and
              work towards practical solutions.
            </p>
            <p>
              For care providers, that means helping you strengthen your
              organisation and prepare for future opportunities. For families,
              it means helping you understand complex systems and keeping the
              person you care about at the centre.
            </p>
            <Link href="/services" className="text-link">
              Explore our expertise
            </Link>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
