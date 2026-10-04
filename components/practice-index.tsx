"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { mountScrollMotion } from "@/lib/scroll-motion";
import { PracticeArtwork } from "@/components/practice-artwork";
import styles from "./practice-index.module.css";
type Practice = { slug: string; title: string; intro: string };
const captions = [
  ["The whole service.", "The human detail."],
  ["Look closer.", "See what matters."],
  ["Show your strengths.", "Find what’s next."],
  ["Knowledge shared.", "Confidence built."],
  ["A fresh perspective.", "A clearer picture."],
  ["A little clarity.", "A little less to carry."],
];
export function PracticeIndex({ services }: { services: Practice[] }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const folio = useRef<HTMLDivElement>(null);
  useEffect(() => {
    return mountScrollMotion(
      "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
      ({ gsap }) => {
        gsap.fromTo(
          folio.current,
          { y: 35, rotate: -2 },
          {
            y: -20,
            rotate: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );
      },
    );
  }, []);
  return (
    <div className={styles.index} ref={root}>
      <div className={styles.folioColumn} aria-hidden="true">
        <div className={styles.folio} ref={folio} data-practice={active}>
          <div className={styles.folioHead}>
            <span>THE CARE INDEX</span>
            <span>0{active + 1} / 06</span>
          </div>
          <div className={styles.illustration} key={active}>
            <PracticeArtwork index={active} />
          </div>
          <p className={styles.folioCaption}>
            {captions[active][0]}
            <br />
            {captions[active][1]}
          </p>
          <div className={styles.folioFoot}>
            <span>Independent thinking.</span>
            <span>Practical care.</span>
          </div>
        </div>
        <p className={styles.indexNote}>
          Six areas of expertise.
          <br />
          One connected approach.
        </p>
      </div>
      <div className={styles.entries}>
        {services.map((service, i) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className={styles.entry}
            data-active={active === i}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <span className={styles.number}>0{i + 1}</span>
            <div className={styles.entryCopy}>
              <h3>{service.title}</h3>
              <p>{service.intro}</p>
            </div>
            <span className={styles.explore}>
              Explore
              <span className={styles.exploreLine} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
