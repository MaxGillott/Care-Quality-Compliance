import Link from "next/link";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand${light ? " brand-light" : ""}`}
      aria-label="Care Quality Compliance home"
    >
      <span className="brand-wordmark">
        Care Quality
        <br />
        Compliance<span className="brand-period">.</span>
      </span>
    </Link>
  );
}
