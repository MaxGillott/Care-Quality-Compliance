"use client";
import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  reviewAreas,
  tenderStages,
  assessmentPurposes,
} from "@/lib/practice-tools";
import { trainingTopics } from "@/lib/interactive-services";

function ExplorerTabs({
  prefix,
  label,
  items,
  active,
  onChange,
}: {
  prefix: string;
  label: string;
  items: readonly { id: string; label: string }[];
  active: number;
  onChange: (value: number) => void;
}) {
  function keyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const key = event.key;
    let next = index;
    if (key === "ArrowRight") next = (index + 1) % items.length;
    else if (key === "ArrowLeft")
      next = (index - 1 + items.length) % items.length;
    else if (key === "Home") next = 0;
    else if (key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    onChange(next);
    document.getElementById(`${prefix}-tab-${items[next].id}`)?.focus();
  }
  return (
    <div className="explorer-tabs" role="tablist" aria-label={label}>
      {items.map((item, i) => (
        <button
          type="button"
          key={item.id}
          id={`${prefix}-tab-${item.id}`}
          role="tab"
          aria-selected={active === i}
          aria-controls={`${prefix}-panel-${item.id}`}
          tabIndex={active === i ? 0 : -1}
          onClick={() => onChange(i)}
          onKeyDown={(e) => keyDown(e, i)}
        >
          <span className="tab-number">0{i + 1}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
export function EvidenceExplorer() {
  const [active, setActive] = useState(0);
  return (
    <div className="evidence-explorer">
      <ExplorerTabs
        prefix="evidence"
        label="Review areas"
        items={reviewAreas}
        active={active}
        onChange={setActive}
      />
      {reviewAreas.map((area, i) => (
        <div
          key={area.id}
          id={`evidence-panel-${area.id}`}
          role="tabpanel"
          aria-labelledby={`evidence-tab-${area.id}`}
          tabIndex={0}
          hidden={i !== active}
          className="evidence-panel"
        >
          <div className="evidence-questions">
            <span className="section-label">
              THE QUESTIONS BEHIND THE PAPERWORK
            </span>
            <h3>{area.title}</h3>
            <p>{area.intro}</p>
            <ol>
              {area.questions.map((q, index) => (
                <li key={q}>
                  <span>0{index + 1}</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
          <div className="evidence-document">
            <div className="document-masthead">
              <span>REVIEW NOTES</span>
              <span>{String(i + 1).padStart(2, "0")} / 04</span>
            </div>
            <dl>
              <div>
                <dt>Information we may consider</dt>
                <dd>{area.lookFor}</dd>
              </div>
              <div>
                <dt>A possible next step</dt>
                <dd>{area.next}</dd>
              </div>
            </dl>
            <p className="document-note">
              An example of our review approach, not an assessment of your
              service or a regulatory checklist.
            </p>
            <Button asChild variant="outline">
              <Link
                href={`/contact?service=quality-and-compliance&area=${area.id}`}
              >
                Discuss this review
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
export function TenderJourney() {
  const [active, setActive] = useState(0);
  return (
    <div className="tender-explorer">
      <ExplorerTabs
        prefix="tender"
        label="Tender stages"
        items={tenderStages}
        active={active}
        onChange={setActive}
      />
      {tenderStages.map((stage, i) => (
        <div
          role="tabpanel"
          key={stage.id}
          id={`tender-panel-${stage.id}`}
          aria-labelledby={`tender-tab-${stage.id}`}
          tabIndex={0}
          hidden={active !== i}
          className="tender-panel"
        >
          <div className="tender-chapter">
            <span className="chapter-figure" aria-hidden="true">
              0{i + 1}
            </span>
            <div>
              <span className="section-label">THE QUESTION TO START WITH</span>
              <h3>{stage.question}</h3>
              <p>{stage.text}</p>
            </div>
          </div>
          <div className="tender-brief">
            <span className="section-label">A USEFUL STARTING BRIEF</span>
            <h4>{stage.title}</h4>
            <ul>
              {stage.bring.map((item) => (
                <li key={item}>
                  <Check size={16} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="tender-support">
              <span>Where we can help</span>
              <p>{stage.support.join(" · ")}</p>
            </div>
            <Button asChild>
              <Link
                href={`/contact?service=procurement-and-contracts&stage=${stage.id}`}
              >
                Talk about this stage
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
const courseGroups = [
  "All topics",
  "Care practice",
  "Safety",
  "Leadership",
] as const;
const category = (id: string) =>
  ["leadership", "quality", "inspection"].includes(id)
    ? "Leadership"
    : ["safeguarding", "risk", "capacity", "incidents", "boundaries"].includes(
          id,
        )
      ? "Safety"
      : "Care practice";
export function CourseCatalogue() {
  const [group, setGroup] = useState<string>("All topics");
  const filtered = trainingTopics.filter(
    (t) => group === "All topics" || category(t.id) === group,
  );
  return (
    <div className="course-catalogue">
      <div className="course-toolbar">
        <div
          role="group"
          aria-label="Filter training topics"
          className="course-filters"
        >
          {courseGroups.map((name) => (
            <button
              type="button"
              key={name}
              aria-pressed={group === name}
              onClick={() => setGroup(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <p className="course-count" role="status">
          {filtered.length} topics to explore
        </p>
      </div>
      <div className="course-index">
        {trainingTopics.map((topic, i) => (
          <details
            key={topic.id}
            className="course-row"
            hidden={group !== "All topics" && category(topic.id) !== group}
          >
            <summary>
              <span className="course-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="course-name">
                <span>{category(topic.id)}</span>
                <strong>{topic.label}</strong>
              </span>
              <Plus size={21} aria-hidden="true" />
            </summary>
            <div className="course-description">
              <p>{topic.description}</p>
              <p>
                Content, delivery and any attendance documentation are agreed
                around your team’s needs.
              </p>
              <Link
                className="text-link"
                href={`/contact?service=training-and-development&topics=${topic.id}`}
              >
                Discuss this topic
              </Link>
            </div>
          </details>
        ))}
      </div>
      <a href="#training-planner" className="catalogue-to-plan">
        Combine topics into a tailored plan{" "}
      </a>
    </div>
  );
}
export function AssessmentOutline() {
  const [active, setActive] = useState(0);
  const purpose = assessmentPurposes[active];
  return (
    <div className="assessment-outline">
      <div className="assessment-choices">
        <span className="section-label">START WITH THE PURPOSE</span>
        <h3>
          What do you need
          <br />
          to understand?
        </h3>
        <div role="group" aria-label="Assessment purpose">
          {assessmentPurposes.map((p, i) => (
            <button
              type="button"
              key={p.id}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              <span>0{i + 1}</span>
              {p.label}
            </button>
          ))}
        </div>
        <p>
          We agree the expertise, scope, intended use and fees before any work
          begins.
        </p>
      </div>
      <div className="report-folio" aria-live="polite" aria-atomic="true">
        <div className="folio-heading">
          <span>AN ILLUSTRATIVE REPORT OUTLINE</span>
          <span>0{active + 1}</span>
        </div>
        <h4>{purpose.title}</h4>
        <p>{purpose.text}</p>
        <ol>
          {purpose.sections.map((section, i) => (
            <li key={section}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {section}
            </li>
          ))}
        </ol>
        <Button asChild variant="outline">
          <Link
            href={`/contact?service=independent-assessments&purpose=${purpose.id}`}
          >
            Discuss the scope
          </Link>
        </Button>
      </div>
    </div>
  );
}
