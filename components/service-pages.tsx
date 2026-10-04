import { PracticeCanvas } from "@/components/practice-canvas";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ChevronRight, Plus, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";
import { familyConcerns } from "@/lib/practice-tools";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  ConsultancyFinder,
  TrainingPlanner,
} from "@/components/service-workbench";
import {
  AssessmentOutline,
  CourseCatalogue,
  EvidenceExplorer,
  TenderJourney,
} from "@/components/service-explorers";

function Breadcrumb({ service }: { service: Service }) {
  return (
    <nav className="breadcrumb practice-breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <ChevronRight size={12} aria-hidden="true" />
      <Link href="/services">How we can help</Link>
      <ChevronRight size={12} aria-hidden="true" />
      <span aria-current="page">{service.title}</span>
    </nav>
  );
}
function Enquire({
  service,
  label = "Let’s discuss your needs",
  light = false,
}: {
  service: Service;
  label?: string;
  light?: boolean;
}) {
  return (
    <Button asChild variant={light ? "light" : "default"}>
      <Link href={`/contact?service=${service.slug}`}>{label}</Link>
    </Button>
  );
}
function ScopeIndex({ service, title }: { service: Service; title: string }) {
  return (
    <div className="scope-index">
      <div className="scope-index-heading">
        <span className="section-label">THE DETAIL OF OUR SUPPORT</span>
        <h2>{title}</h2>
        <p>{service.audience}</p>
      </div>
      <ul>
        {service.items.map((item, i) => (
          <li key={item}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
function PracticeNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="practice-note">
      <p>{children}</p>
    </div>
  );
}

export function ConsultancyPage({ service: s }: { service: Service }) {
  return (
    <PracticeCanvas className="practice-page consultancy-page">
      <section className="consultancy-hero">
        <div className="container">
          <Breadcrumb service={s} />
          <div className="consultancy-hero-grid">
            <div className="practice-hero-copy">
              <span className="section-label">
                01 / CARE PROVIDER CONSULTANCY
              </span>
              <h1>
                A stronger service.
                <br />
                From the
                <br />
                <span className="heading-indent">inside out.</span>
              </h1>
              <p>{s.description}</p>
              <Enquire service={s} />
            </div>
            <div
              className="service-blueprint"
              role="img"
              aria-label="People, practice and governance form a connected care service"
            >
              <div className="blueprint-top">
                <span>THE ANATOMY OF A STRONGER SERVICE</span>
                <span>01 / 03</span>
              </div>
              <div className="blueprint-centre">
                <span className="blueprint-orbit orbit-one" />
                <span className="blueprint-orbit orbit-two" />
                <span className="blueprint-orbit orbit-three" />
                <span className="blueprint-core">
                  Better
                  <br />
                  care.
                </span>
                <span className="blueprint-label label-people">
                  01 <strong>People</strong>
                </span>
                <span className="blueprint-label label-practice">
                  02 <strong>Practice</strong>
                </span>
                <span className="blueprint-label label-governance">
                  03 <strong>Governance</strong>
                </span>
              </div>
              <div className="blueprint-bottom">
                <p>
                  The people you support.
                  <br />
                  The team around them.
                  <br />
                  The systems that connect it all.
                </p>
                <ArrowDown size={27} strokeWidth={1.3} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="practice-audience">
            <span>BUILT AROUND YOUR SERVICE</span>
            <p>{s.audience}</p>
          </div>
        </div>
      </section>
      <section className="section consultancy-start">
        <div className="container">
          <div className="practice-section-heading">
            <span className="section-label">
              FIRST, LET’S FIND YOUR STARTING POINT
            </span>
            <h2>
              What needs to
              <br />
              work better?
            </h2>
            <p>
              Change starts with the right conversation. Choose the situation
              that feels closest to your service.
            </p>
          </div>
          <ConsultancyFinder />
        </div>
      </section>
      <section className="section consultancy-scope">
        <div className="container">
          <ScopeIndex
            service={s}
            title="Look at the whole service. Work on what matters."
          />
        </div>
      </section>
      <section className="section">
        <div className="container field-notes">
          <div className="field-notes-title">
            <span className="section-label">ADVICE YOU CAN PUT TO WORK</span>
            <h2>
              Not another
              <br />
              report on
              <br />a shelf.
            </h2>
            <p>
              Our role is to help you turn an independent perspective into
              practical change.
            </p>
          </div>
          <ol>
            {s.outcomes.map((o, i) => (
              <li key={o.title}>
                <Reveal>
                  <span className="field-note-number">0{i + 1}</span>
                  <div>
                    <h3>{o.title}</h3>
                    <p>{o.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PracticeCanvas>
  );
}

export function QualityPage({ service: s }: { service: Service }) {
  return (
    <PracticeCanvas className="practice-page quality-page">
      <section className="quality-hero">
        <div className="container">
          <Breadcrumb service={s} />
          <div className="quality-hero-grid">
            <div className="practice-hero-copy">
              <span className="section-label">02 / QUALITY & COMPLIANCE</span>
              <h1>
                Good care.
                <br />
                <span>Clear evidence.</span>
              </h1>
              <p>{s.description}</p>
              <Enquire
                service={s}
                label="Bring your service into focus"
                light
              />
            </div>
            <div
              className="quality-composition"
              role="img"
              aria-label="Connect what you see, what you know and what you do"
            >
              <div className="quality-frame frame-back" aria-hidden="true" />
              <div className="quality-frame frame-front">
                <div className="quality-frame-label">
                  <span>A CLOSER LOOK</span>
                  <Plus size={20} aria-hidden="true" />
                </div>
                <div className="quality-equation">
                  <span>What you see.</span>
                  <ArrowDown size={26} aria-hidden="true" />
                  <span>What you know.</span>
                  <ArrowDown size={26} aria-hidden="true" />
                  <strong>What you do.</strong>
                </div>
                <p>
                  Evidence becomes useful
                  <br />
                  when it leads to action.
                </p>
              </div>
            </div>
          </div>
          <div className="quality-footer-line">
            <span>PEOPLE AT THE CENTRE</span>
            <span>EVIDENCE IN CONTEXT</span>
            <span>IMPROVEMENT IN PRACTICE</span>
          </div>
        </div>
      </section>
      <section className="section quality-explore">
        <div className="container">
          <div className="practice-section-heading">
            <span className="section-label">EXPLORE THE WAY WE REVIEW</span>
            <h2>
              Look beneath
              <br />
              the paperwork.
            </h2>
            <p>
              Choose an area to see the questions, evidence and practical next
              steps an independent review can consider.
            </p>
          </div>
          <EvidenceExplorer />
        </div>
      </section>
      <section className="section quality-ledger">
        <div className="container">
          <ScopeIndex service={s} title="A connected view of quality." />
          <PracticeNote>
            Our reviews are independent advisory work. They do not replace a
            statutory inspection, certify compliance or guarantee a regulatory
            outcome.
          </PracticeNote>
        </div>
      </section>
      <section className="quality-change">
        <div className="container quality-change-grid">
          <span className="section-label">FROM INFORMATION TO IMPROVEMENT</span>
          <h2>
            See it.
            <br />
            Understand it.
            <br />
            Act on it.
          </h2>
          <div>
            {s.outcomes.map((o, i) => (
              <div className="quality-change-note" key={o.title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PracticeCanvas>
  );
}

export function ProcurementPage({ service: s }: { service: Service }) {
  return (
    <PracticeCanvas className="practice-page procurement-page">
      <section className="procurement-hero">
        <div className="container">
          <Breadcrumb service={s} />
          <span className="section-label">03 / PROCUREMENT & CONTRACTS</span>
          <div className="procurement-opening">
            <h1>
              From capable.
              <br />
              <span className="opportunity-word">To contract ready.</span>
            </h1>
            <div>
              <p>{s.description}</p>
              <Enquire
                service={s}
                label="Let’s explore your next opportunity"
              />
            </div>
          </div>
          <div
            className="capability-line"
            role="img"
            aria-label="Capability becomes evidence, evidence supports opportunity"
          >
            <span className="capability-trace" aria-hidden="true" />
            <span>Capability</span>
            <ArrowRight aria-hidden="true" />
            <span>Evidence</span>
            <ArrowRight aria-hidden="true" />
            <span>Opportunity</span>
          </div>
          <div className="practice-audience">
            <span>ADULT + CHILDREN’S SOCIAL CARE</span>
            <p>{s.audience}</p>
          </div>
        </div>
      </section>
      <section className="section procurement-route">
        <div className="container">
          <div className="practice-section-heading">
            <span className="section-label">
              FIVE STAGES. ONE CONNECTED APPROACH.
            </span>
            <h2>
              A bid is a journey.
              <br />
              Where are you now?
            </h2>
            <p>
              Explore the stages to see what to bring, what to consider and
              where professional support can help.
            </p>
          </div>
          <TenderJourney />
        </div>
      </section>
      <section className="section procurement-scope">
        <div className="container">
          <ScopeIndex service={s} title="Care expertise. Commercial clarity." />
          <div className="procurement-principle">
            <span>THE PRINCIPLE BEHIND EVERY RESPONSE</span>
            <p>
              Say what you can deliver.
              <br />
              Show how you know.
              <br />
              Plan how you’ll do it.
            </p>
            <div>
              No invented evidence. No guaranteed awards. Your final submission
              stays under your review and approval.
            </div>
          </div>
        </div>
      </section>
    </PracticeCanvas>
  );
}

export function TrainingPage({ service: s }: { service: Service }) {
  return (
    <PracticeCanvas className="practice-page training-page">
      <section className="training-hero">
        <div className="container">
          <Breadcrumb service={s} />
          <div className="training-opening">
            <div className="practice-hero-copy">
              <span className="section-label">04 / TRAINING & DEVELOPMENT</span>
              <h1>
                What if your team
                <br />
                felt more
                <br />
                <span>confident?</span>
              </h1>
              <p>{s.description}</p>
              <Button asChild>
                <a href="#course-catalogue">Find the right learning</a>
              </Button>
            </div>
            <div
              className="learning-composition"
              role="img"
              aria-label="Relevant knowledge builds confidence and supports everyday practice"
            >
              <div className="learning-sheet sheet-knowledge">
                <span>01 / UNDERSTAND</span>
                <strong>Knowledge.</strong>
                <p>Principles that make sense.</p>
              </div>
              <div className="learning-sheet sheet-confidence">
                <span>02 / CONNECT</span>
                <strong>Confidence.</strong>
                <p>Learning that feels relevant.</p>
              </div>
              <div className="learning-sheet sheet-practice">
                <span>03 / APPLY</span>
                <strong>Practice.</strong>
                <p>Skills for the everyday.</p>
              </div>
            </div>
          </div>
          <div className="training-caption">
            <span>REAL SITUATIONS. PRACTICAL LEARNING.</span>
            <p>Shaped around your people, their experience and your service.</p>
          </div>
        </div>
      </section>
      <section className="section course-section" id="course-catalogue">
        <div className="container">
          <div className="practice-section-heading">
            <span className="section-label">THE LEARNING CATALOGUE</span>
            <h2>
              Good practice
              <br />
              starts with understanding.
            </h2>
            <p>
              Browse the topics, explore a focus area or build a starting
              outline for your team.
            </p>
          </div>
          <CourseCatalogue />
        </div>
      </section>
      <section className="section training-builder" id="training-planner">
        <div className="container">
          <div className="practice-section-heading">
            <span className="section-label">MAKE THE LEARNING YOURS</span>
            <h2>
              Your people.
              <br />
              Your priorities.
            </h2>
            <p>
              Combine up to four priorities. We’ll discuss the content, format
              and access needs with you.
            </p>
          </div>
          <TrainingPlanner />
          <PracticeNote>
            This catalogue is not presented as accredited training. Delivery,
            group size, fees and any attendance documentation are confirmed in
            your proposal.
          </PracticeNote>
        </div>
      </section>
      <section className="section learning-method">
        <div className="container">
          <span className="section-label">HOW THE LEARNING TAKES SHAPE</span>
          <div className="learning-method-rows">
            {s.outcomes.map((o, i) => (
              <Reveal key={o.title}>
                <div>
                  <span>0{i + 1}</span>
                  <h2>{o.title}</h2>
                  <p>{o.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PracticeCanvas>
  );
}

export function AssessmentsPage({ service: s }: { service: Service }) {
  return (
    <PracticeCanvas className="practice-page assessments-page">
      <section className="assessment-hero">
        <div className="container">
          <Breadcrumb service={s} />
          <div className="assessment-opening">
            <div className="assessment-lead">
              <span className="section-label">
                05 / INDEPENDENT ASSESSMENTS
              </span>
              <h1>
                A fresh perspective.
                <br />A fuller
                <br />
                understanding.
              </h1>
              <Enquire service={s} label="Talk through the circumstances" />
            </div>
            <div className="perspective-diagram">
              <div className="perspective-top">
                <span>THE PERSON’S VOICE</span>
                <span>THE AVAILABLE EVIDENCE</span>
              </div>
              <div className="perspective-circles" aria-hidden="true">
                <span />
                <span />
                <strong>
                  The whole
                  <br />
                  person.
                </strong>
              </div>
              <p>
                Different perspectives.
                <br />
                One person at the centre.
              </p>
            </div>
          </div>
          <div className="assessment-intro">
            <span>
              INDEPENDENT IN PERSPECTIVE.
              <br />
              PERSONAL IN APPROACH.
            </span>
            <p>{s.description}</p>
          </div>
        </div>
      </section>
      <section className="section assessment-purpose">
        <div className="container">
          <AssessmentOutline />
        </div>
      </section>
      <section className="section assessment-process">
        <div className="container assessment-process-grid">
          <div>
            <span className="section-label">A CAREFUL, CONSIDERED PROCESS</span>
            <h2>
              Listen closely.
              <br />
              Consider fully.
              <br />
              Explain clearly.
            </h2>
            <p>
              An independent report can inform a decision. It does not
              automatically change a statutory decision or replace the
              responsibilities of the relevant authority.
            </p>
          </div>
          <ol>
            {s.outcomes.map((o, i) => (
              <li key={o.title}>
                <span className="assessment-step">0{i + 1}</span>
                <div>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section assessment-scope">
        <div className="container">
          <ScopeIndex
            service={s}
            title="The right expertise for the question."
          />
        </div>
      </section>
    </PracticeCanvas>
  );
}

export function FamilyPage({ service: s }: { service: Service }) {
  return (
    <PracticeCanvas className="practice-page family-page">
      <section className="family-page-hero">
        <div className="container">
          <Breadcrumb service={s} />
          <div className="family-opening">
            <div className="practice-hero-copy">
              <span className="section-label">06 / SUPPORT FOR FAMILIES</span>
              <h1>
                You don’t need
                <br />
                all the answers
                <br />
                <span>to begin.</span>
              </h1>
              <p>{s.description}</p>
              <Enquire service={s} label="Talk to someone who understands" />
              <span className="family-reassurance">
                A conversation first. We agree any work and fees with you.
              </span>
            </div>
            <div className="family-photo">
              <Image
                src="/images/family-support.jpg"
                alt="An illustrative photograph of a woman offering support to an older man at home"
                fill
                preload
                sizes="(max-width:760px) 100vw, 45vw"
              />
              <div className="family-photo-caption">
                A LITTLE CLARITY.
                <br />A LITTLE LESS TO CARRY.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section family-questions">
        <div className="container family-question-grid">
          <div>
            <span className="section-label">
              START WITH WHAT’S WORRYING YOU
            </span>
            <h2>
              Let’s untangle
              <br />
              it, together.
            </h2>
            <p>
              You do not need to know which service to ask for. These are some
              of the things families come to us to understand.
            </p>
            <p className="family-quiet-note">
              We listen to the circumstances and keep the person you care about
              at the centre.
            </p>
          </div>
          <div className="concern-accordion">
            {familyConcerns.map((concern, i) => (
              <details key={concern.question} open={i === 0}>
                <summary>
                  <span>{concern.question}</span>
                  <Plus size={21} aria-hidden="true" />
                </summary>
                <div>
                  <p>{concern.intro}</p>
                  <p>{concern.help}</p>
                  <ul>
                    {concern.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="family-conversation">
        <div className="container">
          <div className="conversation-letter">
            <span className="section-label">YOUR FIRST CONVERSATION</span>
            <h2>
              You tell us what’s happening.
              <br />
              We help you find a way forward.
            </h2>
            <div className="conversation-letter-body">
              <div>
                <p>
                  A brief, general outline is enough to start. Tell us what you
                  would like help understanding and how you prefer to be
                  contacted.
                </p>
                <p>
                  Please keep medical records, diagnoses and identifying details
                  about someone else out of the initial enquiry. We’ll agree a
                  secure way to discuss sensitive information if needed.
                </p>
                <Enquire service={s} label="Start a conversation" />
              </div>
              <ol>
                {s.outcomes.map((o, i) => (
                  <li key={o.title}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{o.title}</h3>
                      <p>{o.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="family-urgent">
        <div className="container">
          <div>
            <span className="section-label">WHEN HELP CAN’T WAIT</span>
            <h2>If someone needs urgent help.</h2>
          </div>
          <div>
            <p>
              This is not an emergency service. If someone is in immediate
              danger, call <a href="tel:999">999</a>. For safeguarding concerns,
              contact the relevant local authority’s safeguarding team. For
              urgent medical advice when it is not life-threatening, contact{" "}
              <a href="tel:111">NHS 111</a>.
            </p>
          </div>
        </div>
      </section>
    </PracticeCanvas>
  );
}
