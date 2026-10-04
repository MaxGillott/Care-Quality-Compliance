import { MessageSquareQuote } from "lucide-react";
export function Reviews() {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL;
  let url: string | undefined;
  try {
    const parsed = new URL(raw || "");
    if (
      parsed.protocol === "https:" &&
      [
        "google.com",
        "www.google.com",
        "maps.google.com",
        "g.page",
        "maps.app.goo.gl",
      ].includes(parsed.hostname)
    )
      url = parsed.href;
  } catch {}
  return (
    <section className="reviews-section" id="reviews">
      <div className="container reviews-grid">
        <div>
          <span className="eyebrow">TRUST IS EARNED, NOT CLAIMED</span>
          <h2>
            Real experiences.
            <br />
            Honest feedback.
          </h2>
          <p>
            Choosing professional support is a personal decision.
            <br className="desktop-only" /> We believe you deserve to hear from
            the people we help.
          </p>
        </div>
        <div className="reviews-panel">
          <div className="review-panel-top">
            <span className="google-word" aria-label="Google">
              <span>G</span>
              <span>o</span>
              <span>o</span>
              <span>g</span>
              <span>l</span>
              <span>e</span>
            </span>
            <span className="reviews-label">Independent reviews</span>
          </div>
          <MessageSquareQuote size={31} strokeWidth={1.3} aria-hidden="true" />
          <h3>Your experience matters.</h3>
          <p>
            {url
              ? "Read genuine feedback from people who have worked with us, or share your own experience on Google."
              : "We’ll share genuine Google reviews here when our verified business profile is available. Every voice matters."}
          </p>
          {url ? (
            <a
              className="text-link"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our Google reviews
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="review-note">
              Real feedback. No invented testimonials.
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
