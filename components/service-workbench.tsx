"use client";
import Link from "next/link";
import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  consultancyPaths,
  trainingTopics,
  trainingTeams,
} from "@/lib/interactive-services";

export function ConsultancyFinder() {
  const [selected, setSelected] = useState(0);
  const path = consultancyPaths[selected];
  return (
    <div className="finder-layout">
      <div className="finder-question">
        <span className="tool-label">A STARTING POINT, BUILT AROUND YOU</span>
        <h3>What’s on your mind?</h3>
        <p>Choose the situation that feels closest to yours.</p>
        <div
          className="finder-choices"
          role="group"
          aria-label="Your consultancy priority"
        >
          {consultancyPaths.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={selected === i}
              className={selected === i ? "is-selected" : ""}
              onClick={() => setSelected(i)}
            >
              <span>0{i + 1}</span>
              {p.label}
            </button>
          ))}
        </div>
        <p className="tool-footnote">
          Every service is different. This is a conversation starter, not a
          compliance assessment.
        </p>
      </div>
      <div className="finder-result" aria-live="polite" aria-atomic="true">
        <div className="result-topline">
          <span>A POSSIBLE WAY FORWARD</span>
          <span>0{selected + 1} / 03</span>
        </div>
        <h4>{path.title}</h4>
        <p>{path.intro}</p>
        <ol>
          {path.steps.map((step, i) => (
            <li key={step}>
              <span>{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <div className="finder-outcome">
          <span>WORKING TOWARDS</span>
          <p>{path.outcome}</p>
        </div>
        <Link
          className="text-link"
          href={`/contact?service=care-provider-consultancy&focus=${path.id}`}
        >
          Talk through this with us{" "}
        </Link>
      </div>
    </div>
  );
}

export function TrainingPlanner() {
  const [selected, setSelected] = useState<string[]>([]);
  const [team, setTeam] = useState<string>(trainingTeams[0]);
  function toggle(id: string) {
    setSelected((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : previous.length < 4
          ? [...previous, id]
          : previous,
    );
  }
  const plan = selected.map((id) => trainingTopics.find((t) => t.id === id)!);
  const query = new URLSearchParams({
    service: "training-and-development",
    team,
    topics: selected.join(","),
  });
  return (
    <div className="training-layout">
      <div className="training-options">
        <span className="tool-label">BUILD A FIRST OUTLINE</span>
        <h3>What would help your team?</h3>
        <p>Choose up to four priorities. We’ll tailor the detail together.</p>
        <div className="team-selector">
          <label htmlFor="training-team">Who is the training for?</label>
          <select
            id="training-team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            {trainingTeams.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div
          className="topic-options"
          role="group"
          aria-label="Training priorities"
        >
          {trainingTopics.map((topic) => {
            const active = selected.includes(topic.id);
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => toggle(topic.id)}
                aria-pressed={active}
                disabled={!active && selected.length === 4}
                className={active ? "selected" : ""}
              >
                <span>{topic.label}</span>
                {active ? (
                  <Check size={16} aria-hidden="true" />
                ) : (
                  <Plus size={16} aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
        <p className="tool-footnote">
          These are starting priorities, not fixed courses or accredited
          qualifications.
        </p>
      </div>
      <div className="learning-outline">
        <div className="outline-heading">
          <span>YOUR LEARNING OUTLINE</span>
          <span aria-live="polite">
            {selected.length.toString().padStart(2, "0")} / 04
          </span>
        </div>
        <div className="outline-team">
          For your <strong>{team.toLowerCase()}</strong>
        </div>
        {plan.length ? (
          <ol className="selected-topics">
            {plan.map((t, i) => (
              <li key={t.id}>
                <span className="module-number">0{i + 1}</span>
                <div>
                  <strong>{t.label}</strong>
                  <p>{t.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(t.id)}
                  aria-label={`Remove ${t.label}`}
                >
                  <X size={15} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <div className="empty-outline">
            <span className="outline-line" />
            <p>
              Good learning starts
              <br />
              with the right questions.
            </p>
            <span>Select a topic to start your outline.</span>
          </div>
        )}
        <div className="outline-footer">
          {plan.length ? (
            <>
              <Button asChild className="training-enquire">
                <Link href={`/contact?${query.toString()}`}>
                  Discuss this training plan{" "}
                </Link>
              </Button>
              <button
                type="button"
                className="clear-outline"
                onClick={() => setSelected([])}
              >
                Clear selection
              </button>
            </>
          ) : (
            <p>Your selected topics will travel with your enquiry.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function ServiceWorkbench() {
  const [active, setActive] = useState<"consultancy" | "training">(
    "consultancy",
  );
  return (
    <section className="workbench-section section" id="find-support">
      <div className="container">
        <div className="workbench-heading">
          <div>
            <span className="eyebrow">LET’S MAKE IT RELEVANT TO YOU</span>
            <h2>
              A useful place
              <br />
              to start.
            </h2>
          </div>
          <p>
            One service may need a clearer picture.
            <br />
            Another may need a more confident team.
            <br />
            Start with what matters to yours.
          </p>
        </div>
        <div
          className="workbench-tabs"
          role="group"
          aria-label="Choose a support tool"
        >
          <button
            type="button"
            aria-pressed={active === "consultancy"}
            aria-controls="consultancy-tool"
            onClick={() => setActive("consultancy")}
            className={active === "consultancy" ? "active" : ""}
          >
            01 <span>Strengthen my service</span>
          </button>
          <button
            type="button"
            aria-pressed={active === "training"}
            aria-controls="training-tool"
            onClick={() => setActive("training")}
            className={active === "training" ? "active" : ""}
          >
            02 <span>Develop my team</span>
          </button>
        </div>
        <div className="workbench-content">
          <div id="consultancy-tool" hidden={active !== "consultancy"}>
            <ConsultancyFinder />
          </div>
          <div id="training-tool" hidden={active !== "training"}>
            <TrainingPlanner />
          </div>
        </div>
      </div>
    </section>
  );
}
