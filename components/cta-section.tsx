import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
export function CtaSection() {
  return (
    <section className="closing-section">
      <div className="container">
        <Reveal>
          <div className="closing-top">
            <span className="eyebrow">
              YOUR NEXT STEP STARTS WITH A CONVERSATION
            </span>
            <span className="closing-location">
              INDEPENDENT SUPPORT, ACROSS ENGLAND
            </span>
          </div>
          <div className="closing-main">
            <h2>
              Let’s make
              <br />
              care better.
            </h2>
            <div>
              <p>
                Tell us what’s on your mind.
                <br />
                We’ll listen, understand and find
                <br />a practical way forward, together.
              </p>
              <Button asChild variant="light" className="closing-action">
                <Link href="/contact">Start a conversation</Link>
              </Button>
              <Link
                href="/contact?intent=consultation"
                className="closing-consultation"
              >
                Or request a consultation
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
