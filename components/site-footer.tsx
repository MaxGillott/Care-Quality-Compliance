import Link from "next/link";
import { MapPin } from "lucide-react";
import { Brand } from "@/components/brand";
import { services } from "@/lib/services";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              Professional expertise.
              <br />
              Independent advice.
              <br />
              Practical solutions.
            </p>
            <span className="footer-location">
              <MapPin size={14} aria-hidden="true" /> Supporting care across
              England
            </span>
          </div>
          <div>
            <h2>Explore</h2>
            <Link href="/">Home</Link>
            <Link href="/about">About us</Link>
            <Link href="/services">How we can help</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h2>How we can help</h2>
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </Link>
            ))}
          </div>
          <div className="footer-conversation">
            <h2>A human approach.</h2>
            <p>
              Not sure where to start?
              <br />
              You don’t need to have all the answers.
            </p>
            <Link href="/contact" className="text-link">
              Start a conversation
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Care Quality Compliance.</span>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy & cookies</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/terms">Terms of use</Link>
          </nav>
          <span>People first. Always.</span>
        </div>
        <p className="footer-disclaimer">
          Independent consultancy. Not affiliated with the Care Quality
          Commission (CQC). This website is not an emergency service.
        </p>
      </div>
    </footer>
  );
}
