import Link from "next/link";

import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <section className="not-found">
      <span className="eyebrow">A SMALL DETOUR</span>
      <h1>
        Let’s get you
        <br />
        back on track.
      </h1>
      <p>We couldn’t find this page. Our services are a good place to start.</p>
      <Button asChild>
        <Link href="/services">Explore our services</Link>
      </Button>
    </section>
  );
}
