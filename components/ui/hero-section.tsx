"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { mountScrollMotion } from "@/lib/scroll-motion";
import { Button } from "@/components/ui/button";

function filmSource() {
  return window.matchMedia("(max-width: 700px)").matches
    ? "/video/quiet-moment-mobile.mp4"
    : "/video/quiet-moment-desktop.mp4";
}

export default function HeroSection() {
  const section = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [filmAvailable, setFilmAvailable] = useState(true);
  const manuallyPaused = useRef(false);

  useEffect(() => {
    const element = video.current;
    const root = section.current;
    if (!element || !root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let inView = true;
    let ready = false;
    let disposed = false;
    let paint = 0;
    const play = () => {
      if (
        !ready ||
        manuallyPaused.current ||
        reduced.matches ||
        connection?.saveData ||
        !inView ||
        document.hidden
      )
        return;
      if (!element.getAttribute("src")) element.src = filmSource();
      element.play().catch(() => setPlaying(false));
    };
    const visibility = () => {
      if (document.hidden) element.pause();
      else play();
    };
    const preferences = () => {
      if (reduced.matches) element.pause();
      else play();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) play();
        else element.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(root);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", preferences);
    // Paint the heading and responsive poster before the decorative film
    // competes for bandwidth. Manual playback remains available immediately.
    const poster = root.querySelector("img");
    void Promise.all([
      document.fonts.ready,
      poster?.decode().catch(() => undefined),
    ]).then(() => {
      if (disposed) return;
      paint = requestAnimationFrame(() => {
        paint = requestAnimationFrame(() => {
          if (disposed) return;
          ready = true;
          play();
        });
      });
    });
    const stopMotion = mountScrollMotion(
      "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
      ({ gsap }) => {
        gsap.fromTo(
          media.current,
          { yPercent: 0, scale: 1.025 },
          {
            yPercent: 12,
            scale: 1.09,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );
      },
    );
    return () => {
      disposed = true;
      cancelAnimationFrame(paint);
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", preferences);
      element.pause();
      stopMotion();
    };
  }, []);

  function toggleFilm() {
    const element = video.current;
    if (!element) return;
    if (playing) {
      manuallyPaused.current = true;
      element.pause();
    } else {
      manuallyPaused.current = false;
      if (!element.getAttribute("src")) element.src = filmSource();
      element.play().catch(() => setFilmAvailable(false));
    }
  }

  return (
    <section className="cinema-hero" ref={section} aria-labelledby="hero-title">
      <div className="cinema-media" ref={media} aria-hidden="true">
        <Image
          src="/images/quiet-moment-poster.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="cinema-poster"
        />
        <video
          ref={video}
          className="cinema-film"
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setPlaying(false);
            setFilmAvailable(false);
          }}
        />
      </div>
      <div className="cinema-scrim" aria-hidden="true" />
      <div className="container cinema-content">
        <div className="cinema-kicker">
          INDEPENDENT HEALTH & SOCIAL CARE CONSULTANCY
        </div>
        <h1 id="hero-title">
          Professional expertise.
          <br />
          Compassionate care.
        </h1>
        <div className="cinema-bottom">
          <div className="cinema-intro">
            <span className="cinema-index">01 / A MORE HUMAN APPROACH</span>
            <p>
              Helping care providers build better services.
              <br />
              Supporting the people at the heart of them.
            </p>
          </div>
          <div className="cinema-actions">
            <Button asChild variant="light" className="hero-action">
              <Link href="/contact">Let’s talk about your service </Link>
            </Button>
            <Link href="#our-work" className="film-link">
              Discover how we help
            </Link>
          </div>
        </div>
        <div className="cinema-footnote">
          <span>PEOPLE. QUALITY. OPPORTUNITY.</span>
          <div>
            <span className="film-credit">A MOMENT OF HUMAN CONNECTION</span>
            {filmAvailable && (
              <button
                type="button"
                onClick={toggleFilm}
                className="film-control"
              >
                {playing ? (
                  <Pause size={12} aria-hidden="true" />
                ) : (
                  <Play size={12} aria-hidden="true" />
                )}
                <span>{playing ? "Pause film" : "Play film"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
