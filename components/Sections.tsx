import Image from "next/image";
import { site } from "@/content/site";
import { Arrow, Note, PenFrame, Underlined } from "./hand";
import { LocalTime } from "./LocalTime";
import { Reveal } from "./motion";
import { Rich } from "./Rich";
import { PointOfView } from "./PointOfView";

export function About() {
  return (
    <section id="about" className="section container" aria-labelledby="about-title">
      <div className="section-head">
        <h2 id="about-title">About</h2>
        <span className="mono muted">
          {site.location} · <LocalTime />
        </span>
      </div>

      <Reveal>
        <p className="about-title" aria-hidden="true">{site.about.title}</p>
      </Reveal>

      <div className="grid about-sheet">
        <Reveal className="about-photo" y={16}>
          <PenFrame />
          <div className="about-photo-img">
            <Image src="/images/about/mercedes-bw.webp" alt={site.fullName} width={2000} height={2000} sizes="(min-width: 720px) 34vw, 100vw" />
          </div>
          <Note delay={1.4}>hi! that’s me</Note>
        </Reveal>

        <div className="about-card">
          <Reveal>
            <dl className="facts">
              {site.about.facts.map((f) => (
                <div key={f.label} style={{ display: "contents" }}>
                  <dt>{f.label}:</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
              <dt>Who am I?</dt>
              <dd><Rich text={site.about.who} /></dd>
            </dl>
          </Reveal>
          <Reveal className="about-body" delay={0.1}>
            {site.about.body.map((b) => (
              <p key={b.slice(0, 24)}><Rich text={b} /></p>
            ))}
          </Reveal>
        </div>
      </div>
      <PointOfView />
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <h2 id="contact-title" className="mono contact-lead">Contact</h2>
        <Reveal>
          <a className="contact-mail" href={`mailto:${site.email}`}>
            Let’s <Underlined seed={9} delay={0.5}>talk</Underlined>
          </a>
        </Reveal>
        <div className="contact-row">
          <Arrow box={[88, 36]} from={[4, 4]} to={[82, 19]} bend={0.22} seed={12} delay={0.9} />
          <a className="contact-address" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        <footer className="footer mono">
          <span>© {new Date().getFullYear()} {site.fullName}</span>
          <div className="footer-links">
            {site.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
            ))}
          </div>
          <a href="#top">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
