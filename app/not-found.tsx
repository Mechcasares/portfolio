import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container hero">
      <p className="mono muted">404</p>
      <h1 className="hero-title" style={{ marginTop: 24 }}>This page doesn’t exist.</h1>
      <Link href="/" className="story-cta" style={{ marginTop: 40 }}>
        <span className="label">Back home</span> <span className="arrow">→</span>
      </Link>
    </section>
  );
}
