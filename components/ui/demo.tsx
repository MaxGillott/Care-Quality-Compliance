import Link from "next/link";

import { Button } from "./button";
// Accessible brand adaptation of the supplied alternate dark hero.
export default function DarkGradientHero() {
  return (
    <section className="dark-hero-demo">
      <div className="container">
        <p className="eyebrow">Care Quality Compliance</p>
        <h1>Where professional expertise meets compassionate care.</h1>
        <p>
          Independent professional support for care providers, families and
          organisations across England.
        </p>
        <Button asChild variant="light">
          <Link href="/contact">Start a conversation</Link>
        </Button>
      </div>
    </section>
  );
}
