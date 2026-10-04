"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { mountScrollMotion } from "@/lib/scroll-motion";
const stages = [
  {
    verb: "Understand",
    label: "Start by listening.",
    text: "We get to know your service, your people and the challenges you’re facing. Your context shapes the work.",
    output: "A shared understanding of what matters.",
    tag: "YOUR PEOPLE + YOUR SERVICE",
  },
  {
    verb: "Identify",
    label: "See the whole picture.",
    text: "We review practice, records and the evidence behind your service. Together, we identify what’s working and what needs attention.",
    output: "Clear priorities, grounded in evidence.",
    tag: "EVIDENCE + INDEPENDENT REVIEW",
  },
  {
    verb: "Plan",
    label: "Make the next step clear.",
    text: "We turn those priorities into an achievable action plan, with clear responsibilities and a practical sequence of improvements.",
    output: "A plan your team can work with.",
    tag: "PRIORITIES + PRACTICAL ACTION",
  },
  {
    verb: "Improve",
    label: "Put better care into practice.",
    text: "We work alongside you to strengthen systems, develop your team and review progress. The person receiving care stays at the centre.",
    output: "Stronger practice and a clearer way forward.",
    tag: "YOUR TEAM + LASTING CHANGE",
  },
];
export function CareJourney() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<SVGPathElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    let mounted = true;
    const stopMotion = mountScrollMotion(
      "(min-width: 1000px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
      ({ gsap, ScrollTrigger }) => {
        section.dataset.scrub = "true";
        setEnhanced(true);
        const anim = gsap.fromTo(
          line.current,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            autoRound: false,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.55,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (!mounted) return;
                const next = Math.min(3, Math.floor(self.progress * 4));
                progress.current?.style.setProperty(
                  "transform",
                  `scaleX(${self.progress})`,
                );
                if (next !== last.current) {
                  last.current = next;
                  setActive(next);
                }
              },
            },
          },
        );
        document.fonts.ready.then(() => {
          if (mounted && section.isConnected) ScrollTrigger.refresh();
        });
        return () => {
          anim.scrollTrigger?.kill();
          anim.revert();
          delete section.dataset.scrub;
          if (mounted) setEnhanced(false);
        };
      },
    );
    return () => {
      mounted = false;
      stopMotion();
    };
  }, []);
  function goToStage(index: number) {
    if (enhanced && root.current) {
      const top = root.current.getBoundingClientRect().top + window.scrollY;
      const distance = root.current.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + distance * (index / 4 + 0.08),
        behavior: "smooth",
      });
    } else
      document.getElementById(`journey-stage-${index}`)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "center",
      });
  }
  return (
    <section
      className="care-journey"
      ref={root}
      aria-labelledby="journey-heading"
      id="our-approach"
    >
      <div className="journey-sticky">
        <div className="journey-progress" aria-hidden="true">
          <div ref={progress} />
        </div>
        <div className="container journey-layout">
          <div className="journey-editorial">
            <span className="eyebrow">THE WAY FORWARD, TOGETHER</span>
            <h2 id="journey-heading">
              From complexity
              <br />
              to clarity.
            </h2>
            <p>
              Good advice should take you somewhere.
              <br />
              Here’s how we turn understanding
              <br className="desktop-only" /> into meaningful action.
            </p>
            <div
              className="journey-stage-buttons"
              role="group"
              aria-label="Explore the four stages"
            >
              {stages.map((s, i) => (
                <button
                  type="button"
                  key={s.verb}
                  onClick={() => goToStage(i)}
                  className={enhanced && active === i ? "active" : ""}
                  aria-current={enhanced && active === i ? "step" : undefined}
                >
                  <span>0{i + 1}</span>
                  {s.verb}
                </button>
              ))}
            </div>
            <div className="journey-scroll-note">
              <span>
                {enhanced
                  ? "SCROLL TO FOLLOW THE JOURNEY"
                  : "FOUR CONNECTED STEPS"}
              </span>
            </div>
            <a href="#find-support" className="journey-skip">
              Find your starting point{" "}
            </a>
          </div>
          <div className="journey-visual">
            <div className="flow-map" aria-hidden="true">
              <div className="flow-map-label">
                <span>A CARE PROVIDER’S JOURNEY</span>
                <span>PEOPLE AT EVERY STEP</span>
              </div>
              <svg
                className="flow-path"
                viewBox="0 0 700 370"
                preserveAspectRatio="none"
              >
                <path
                  className="route-base"
                  d="M105 80 H520 Q595 80 595 155 V190 Q595 240 520 240 H180 Q105 240 105 295 V310 H570"
                />
                <path
                  ref={line}
                  className="route-draw"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  d="M105 80 H520 Q595 80 595 155 V190 Q595 240 520 240 H180 Q105 240 105 295 V310 H570"
                />
              </svg>
              {stages.map((s, i) => (
                <div
                  key={s.verb}
                  className={`flow-node node-${i} ${!enhanced || i <= active ? "reached" : ""} ${enhanced && i === active ? "current" : ""}`}
                >
                  <span className="node-circle">0{i + 1}</span>
                  <span className="node-label">{s.verb}</span>
                </div>
              ))}
              <div className="flow-centre">
                The person.
                <br />
                <span>Always at the centre.</span>
              </div>
            </div>
            <div className="journey-story">
              {stages.map((s, i) => (
                <article
                  id={`journey-stage-${i}`}
                  key={s.verb}
                  hidden={enhanced && i !== active}
                >
                  <span className="story-index">
                    0{i + 1} / {s.tag}
                  </span>
                  <h3>{s.label}</h3>
                  <p>{s.text}</p>
                  <div className="story-output">
                    <span>THE OUTCOME</span>
                    {s.output}
                  </div>
                </article>
              ))}
            </div>
            <Link
              href="/services/care-provider-consultancy"
              className="journey-detail-link"
            >
              Explore care provider consultancy{" "}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
