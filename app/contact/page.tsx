import Link from "next/link";
import {
  ChevronRight,
  MessageCircle,
  HeartHandshake,
  LockKeyhole,
} from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/site";
import { enquiryOutline } from "@/lib/interactive-services";
export const metadata = pageMetadata(
  "Let’s Talk",
  "Speak to Care Quality Compliance about consultancy, quality and compliance, procurement, training, assessments or family support. Start a no-obligation conversation.",
  "/contact",
);
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const single = (key: string) =>
    typeof query[key] === "string" ? query[key] : undefined;
  const params = {
    service: single("service"),
    intent: single("intent"),
    topics: single("topics"),
    team: single("team"),
    focus: single("focus"),
    area: single("area"),
    stage: single("stage"),
    purpose: single("purpose"),
  };
  return (
    <>
      <section className="contact-section">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={11} />
            <span aria-current="page">Contact</span>
          </nav>
          <div className="contact-grid">
            <div className="contact-copy">
              <span className="eyebrow">LET’S FIND A WAY FORWARD</span>
              <h1>
                {params.intent === "consultation"
                  ? "A conversation."
                  : "Tell us what"}
                <br />
                {params.intent === "consultation"
                  ? "A clearer path."
                  : "you need."}
                <br />
                <span>We’re listening.</span>
              </h1>
              <p>
                Whether you’re strengthening a care service, exploring a new
                opportunity or looking for support for someone you love, we’d
                like to hear from you.
              </p>
              <div className="contact-promises">
                <div>
                  <MessageCircle size={19} strokeWidth={1.6} />
                  <div>
                    <strong>A conversation, not a commitment.</strong>
                    <p>We’ll discuss your needs before agreeing any work.</p>
                  </div>
                </div>
                <div>
                  <HeartHandshake size={19} strokeWidth={1.6} />
                  <div>
                    <strong>The right people for your needs.</strong>
                    <p>Independent, professionally led support.</p>
                  </div>
                </div>
                <div>
                  <LockKeyhole size={18} strokeWidth={1.6} />
                  <div>
                    <strong>Your information, treated with care.</strong>
                    <p>Used to respond to you. Never for marketing.</p>
                  </div>
                </div>
              </div>
              <div className="contact-aside">
                <strong>If someone needs urgent help</strong>
                <p>
                  This is not an emergency service. If someone is in immediate
                  danger, call 999. For safeguarding concerns, contact your
                  local authority’s safeguarding team. For urgent medical
                  advice, contact NHS 111.
                </p>
              </div>
            </div>
            <EnquiryForm
              initialService={params.service}
              initialMessage={enquiryOutline(params)}
              consultation={params.intent === "consultation"}
            />
          </div>
        </div>
      </section>
      <section className="contact-other">
        <div className="container contact-other-inner">
          <div>
            <h2>A little more clarity before we talk?</h2>
            <p>
              Explore our services and find the support that feels right for
              you.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/services">How we can help</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
