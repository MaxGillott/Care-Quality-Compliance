"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  LockKeyhole,
  LoaderCircle,
  Send,
  CircleCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  audiences,
  interests,
  enquirySchema,
  serviceInterests,
} from "@/lib/enquiry-schema";
type FormData = {
  audience: string;
  interest: string;
  name: string;
  email: string;
  phone: string;
  organisation: string;
  message: string;
  consent: boolean;
  website: string;
};
export function EnquiryForm({
  initialService = "",
  consultation = false,
  initialMessage = "",
}: {
  initialService?: string;
  consultation?: boolean;
  initialMessage?: string;
}) {
  const [data, setData] = useState<FormData>({
    audience:
      initialService === "family-support" ? "Family member / relative" : "",
    interest: serviceInterests[initialService] || "",
    name: "",
    email: "",
    phone: "",
    organisation: "",
    message: initialMessage,
    consent: false,
    website: "",
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const previousStep = useRef(1);
  const submitLock = useRef(false);
  useEffect(() => {
    if (previousStep.current !== step || sent) headingRef.current?.focus();
    previousStep.current = step;
  }, [step, sent]);
  const setField = (key: keyof FormData, value: string | boolean) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
    setServerError("");
  };
  const validate = () => {
    const result = enquirySchema.safeParse(data);
    const relevant =
      step === 1
        ? ["audience", "interest"]
        : step === 2
          ? ["name", "email", "phone", "organisation", "message"]
          : Object.keys(data);
    const next: Record<string, string> = {};
    if (!result.success)
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (relevant.includes(key) && !next[key]) next[key] = issue.message;
      }
    setErrors(next);
    if (Object.keys(next).length) {
      setTimeout(() => errorRef.current?.focus(), 30);
      return false;
    }
    return true;
  };
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    if (submitLock.current) return;
    submitLock.current = true;
    setSending(true);
    setServerError("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, consultation }),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok) {
        if (response.status === 429)
          throw new Error(
            "You’ve made a few attempts. Please wait ten minutes before trying again. Your enquiry is still here while this page stays open.",
          );
        throw new Error(
          "We couldn’t send your enquiry right now. Nothing has been saved by this website. Please keep this page open and try again later.",
        );
      }
      setSent(true);
      setData({
        audience: "",
        interest: "",
        name: "",
        email: "",
        phone: "",
        organisation: "",
        message: "",
        consent: false,
        website: "",
      });
    } catch (error) {
      setServerError(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "We couldn’t confirm delivery. Please try again in a few minutes.",
      );
      setTimeout(() => errorRef.current?.focus(), 30);
    } finally {
      setSending(false);
      submitLock.current = false;
    }
  }
  const ErrorText = ({ field }: { field: string }) =>
    errors[field] ? (
      <span className="field-error" id={`${field}-error`}>
        {errors[field]}
      </span>
    ) : null;
  const inputProps = (field: keyof FormData) => ({
    id: field,
    name: field,
    value: String(data[field]),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setField(field, e.target.value),
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });
  if (sent)
    return (
      <div className="contact-form-card form-success">
        <span className="success-icon">
          <CircleCheck size={31} strokeWidth={1.5} />
        </span>
        <h2 ref={headingRef} tabIndex={-1}>
          Thank you for reaching out.
        </h2>
        <p>
          Your enquiry has been sent to our team. We’ll review what you’ve
          shared and contact you using the details you provided.
        </p>
        <p>We look forward to finding a way forward together.</p>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  return (
    <div className="contact-form-card">
      <div className="form-progress" aria-label={`Step ${step} of 3`}>
        {["Your needs", "A little about you", "Review & send"]
          .map((label, i) => (
            <span
              key={label}
              className={
                step === i + 1 ? "current" : step > i + 1 ? "complete" : ""
              }
              aria-current={step === i + 1 ? "step" : undefined}
            >
              <b>{step > i + 1 ? <Check size={12} /> : i + 1}</b>
              {label}
              {i < 2 && <span className="sr-only">then</span>}
            </span>
          ))
          .reduce<React.ReactNode[]>(
            (all, el, i) =>
              i === 0
                ? [el]
                : [
                    ...all,
                    <i
                      className="progress-line"
                      key={`line-${i}`}
                      aria-hidden="true"
                    />,
                    el,
                  ],
            [],
          )}
      </div>
      <form onSubmit={submit} noValidate>
        <div className="anti-bot" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(e) => setField("website", e.target.value)}
          />
        </div>
        <div className="form-step" key={step}>
          <div className="form-step-header">
            <h2 ref={headingRef} tabIndex={-1}>
              {step === 1
                ? "How can we help?"
                : step === 2
                  ? "Let’s get to know you."
                  : "Your next step starts here."}
            </h2>
            <p>
              {step === 1
                ? "A few details will help us find the right support for you."
                : step === 2
                  ? "Tell us a little about yourself and what you need."
                  : "Take a moment to check your details before sending."}
            </p>
          </div>
          {Object.keys(errors).length > 0 && (
            <div
              className="form-alert"
              role="alert"
              tabIndex={-1}
              ref={errorRef}
            >
              <strong>Please check the following:</strong>
              <ul>
                {Object.entries(errors).map(([key, message]) => (
                  <li key={key}>
                    <a href={`#${key}`}>{message}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {step === 1 && (
            <>
              <fieldset
                id="audience"
                aria-describedby={
                  errors.audience ? "audience-error" : undefined
                }
              >
                <legend>
                  I am a… <span className="required">*</span>
                </legend>
                <div className="choice-grid">
                  {audiences.map((option) => (
                    <label
                      className={`choice ${data.audience === option ? "selected" : ""}`}
                      key={option}
                    >
                      <input
                        type="radio"
                        name="audience"
                        value={option}
                        checked={data.audience === option}
                        onChange={() => setField("audience", option)}
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <ErrorText field="audience" />
              </fieldset>
              <div className="field">
                <label htmlFor="interest" className="field-label">
                  I’m interested in… <span className="required">*</span>
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={data.interest}
                  onChange={(e) => setField("interest", e.target.value)}
                  required
                  aria-invalid={!!errors.interest}
                  aria-describedby={
                    errors.interest ? "interest-error" : undefined
                  }
                >
                  <option value="">Choose the support you need</option>
                  {interests.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <ErrorText field="interest" />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="name" className="field-label">
                    Your name <span className="required">*</span>
                  </label>
                  <input
                    {...inputProps("name")}
                    autoComplete="name"
                    maxLength={100}
                    required
                    placeholder="Full name"
                  />
                  <ErrorText field="name" />
                </div>
                <div className="field">
                  <label htmlFor="email" className="field-label">
                    Email address <span className="required">*</span>
                  </label>
                  <input
                    {...inputProps("email")}
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    placeholder="you@example.com"
                  />
                  <ErrorText field="email" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="phone" className="field-label">
                    Phone <span>(optional)</span>
                  </label>
                  <input
                    {...inputProps("phone")}
                    type="tel"
                    autoComplete="tel"
                    maxLength={30}
                  />
                  <ErrorText field="phone" />
                </div>
                <div className="field">
                  <label htmlFor="organisation" className="field-label">
                    Organisation <span>(optional)</span>
                  </label>
                  <input
                    {...inputProps("organisation")}
                    autoComplete="organization"
                    maxLength={150}
                  />
                  <ErrorText field="organisation" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="message" className="field-label">
                  What would you like help with?{" "}
                  <span className="required">*</span>
                </label>
                <textarea
                  {...inputProps("message")}
                  rows={5}
                  maxLength={1500}
                  required
                  placeholder="A brief outline is a good place to start…"
                  aria-describedby={`message-hint${errors.message ? " message-error" : ""}`}
                />
                <p id="message-hint" className="field-hint">
                  Please don’t include medical records, diagnoses, safeguarding
                  details or information that identifies someone else. We’ll
                  agree a secure way to discuss sensitive information.
                </p>
                <ErrorText field="message" />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <dl className="review-summary">
                <div>
                  <dt>I am a</dt>
                  <dd>{data.audience}</dd>
                </div>
                <div>
                  <dt>Support needed</dt>
                  <dd>
                    {data.interest}
                    {consultation ? " · Consultation requested" : ""}
                  </dd>
                </div>
                <div>
                  <dt>Name</dt>
                  <dd>{data.name}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{data.email}</dd>
                </div>
                {data.phone && (
                  <div>
                    <dt>Phone</dt>
                    <dd>{data.phone}</dd>
                  </div>
                )}
                {data.organisation && (
                  <div>
                    <dt>Organisation</dt>
                    <dd>{data.organisation}</dd>
                  </div>
                )}
                <div>
                  <dt>Your enquiry</dt>
                  <dd className="message">{data.message}</dd>
                </div>
              </dl>
              <label className="check-label" htmlFor="consent">
                <input
                  type="checkbox"
                  id="consent"
                  checked={data.consent}
                  onChange={(e) => setField("consent", e.target.checked)}
                  required
                  aria-describedby={
                    errors.consent ? "consent-error" : undefined
                  }
                />
                <span>
                  I have read the{" "}
                  <Link href="/privacy" target="_blank">
                    privacy notice
                    <span className="sr-only"> (opens in a new tab)</span>
                  </Link>{" "}
                  and understand my details will be used to respond to this
                  enquiry. <span className="required">*</span>
                </span>
              </label>
              <ErrorText field="consent" />
            </>
          )}
          {serverError && (
            <div
              className="form-alert"
              role="alert"
              ref={errorRef}
              tabIndex={-1}
            >
              {serverError}
            </div>
          )}
          <div className="form-footer">
            {step > 1 ? (
              <button
                type="button"
                className="form-back"
                onClick={() => {
                  setErrors({});
                  setServerError("");
                  setStep(step - 1);
                }}
                disabled={sending}
              >
                <ArrowLeft size={14} />
                Back
              </button>
            ) : (
              <p>
                <LockKeyhole size={12} aria-hidden="true" /> Just a
                conversation. No obligation.
              </p>
            )}
            <Button type="submit" disabled={sending}>
              {sending
                ? "Sending…"
                : step === 3
                  ? "Send your enquiry"
                  : "Continue"}
              {sending && (
                <LoaderCircle
                  size={17}
                  className="spinner"
                  aria-hidden="true"
                />
              )}
            </Button>
          </div>
        </div>
        <p className="form-privacy">
          Your privacy matters. No marketing lists. No tracking cookies.
          <br />
          Read our <Link href="/privacy">privacy notice</Link>. Fields marked *
          are required.
        </p>
      </form>
    </div>
  );
}
