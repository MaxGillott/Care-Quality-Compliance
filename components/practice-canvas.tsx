"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { mountScrollMotion } from "@/lib/scroll-motion";

/** Quiet assembly motion for the existing diagrams. Reading never depends on animation. */
export function PracticeCanvas({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    return mountScrollMotion(
      "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
      ({ gsap }) => {
        root
          .querySelectorAll<HTMLElement>(".learning-sheet")
          .forEach((sheet, i) => {
            gsap.fromTo(
              sheet,
              { x: i === 1 ? 26 : -20 },
              {
                x: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: sheet.parentElement,
                  start: "top 75%",
                  end: "bottom 50%",
                  scrub: 0.6,
                },
              },
            );
          });
        root
          .querySelectorAll<HTMLElement>(
            ".quality-frame.frame-front, .service-blueprint, .perspective-diagram",
          )
          .forEach((object) => {
            gsap.fromTo(
              object,
              { y: 22 },
              {
                y: -10,
                ease: "none",
                scrollTrigger: {
                  trigger: object.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            );
          });
        const trace = root.querySelector(".capability-trace");
        if (trace)
          gsap.fromTo(
            trace,
            { scaleX: 0.1 },
            {
              scaleX: 1,
              transformOrigin: "left",
              ease: "none",
              scrollTrigger: {
                trigger: trace.parentElement,
                start: "top 90%",
                end: "top 35%",
                scrub: 0.4,
              },
            },
          );
      },
    );
  }, []);
  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
