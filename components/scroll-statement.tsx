"use client";
import { useEffect, useRef } from "react";
import { mountScrollMotion } from "@/lib/scroll-motion";
export function ScrollStatement() {
  const ref = useRef<HTMLHeadingElement>(null);
  const text = "Better care begins with a clearer understanding.";
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    return mountScrollMotion(
      "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
      ({ gsap }) => {
        const palette = getComputedStyle(root);
        gsap.fromTo(
          root.querySelectorAll(".statement-word"),
          { color: palette.getPropertyValue("--muted").trim() },
          {
            color: palette.getPropertyValue("--foreground").trim(),
            stagger: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 85%",
              end: "bottom 50%",
              scrub: 0.5,
            },
          },
        );
      },
    );
  }, []);
  return (
    <h2 ref={ref} className="editorial-statement" aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span className="statement-word" aria-hidden="true" key={i}>
          {word}{" "}
        </span>
      ))}
    </h2>
  );
}
