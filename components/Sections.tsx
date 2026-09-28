import { site } from "@/content/site";
import { LocalTime } from "./LocalTime";
import { Reveal, WordReveal } from "./motion";

export function Capabilities() {
  return (
    <section className="section container" aria-labelledby="cap-title">
      <div className="section-head">
        <h2 id="cap-title">How I work</h2>
        <span className="mono muted">Strategy → Systems</span>
      </div>
      <div className="grid">
        <div className="cap-intro">
          <span className="mono muted">Beyond the screen</span>
          <h3>
            From the first question to the <em>last pixel</em> — and the pull request.
          </h3>
        </div>
        <ol className="cap-list">
          {site.capabilities.map((c, i) => (
            <Reveal key={c.label} as="li" className="cap-item" delay={i * 0.04}>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <h4>{c.label}</h4>
              <p>{c.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section container" aria-labelledby="about-title">
      <div className="section-head">
        <h2 id="about-title">About</h2>
        <span className="mono muted">7+ years</span>
      </div>
      <div className="grid">
        <p className="about-lead">
          <WordReveal text={site.about.intro} stagger={0.012} />
        </p>
        <Reveal className="about-side mono">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span>{site.location}</span>
            <LocalTime />
          </div>
        </Reveal>
        <Reveal className="about-body">
          {site.about.body.map((b) => (
            <p key={b.slice(0, 24)}>{b}</p>
          ))}
        </Reveal>
      </div>
      <div className="grid principles">
        {site.about.principles.map((pr, i) => (
          <Reveal key={pr.title} className="principle" delay={i * 0.08}>
            <span className="mono muted">{String(i + 1).padStart(2, "0")}</span>
            <h4>{pr.title}</h4>
            <p>{pr.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const [user] = site.email.split("@");
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <h2 id="contact-title" className="mono contact-lead">Contact</h2>
        <Reveal>
          <a className="contact-mail" href={`mailto:${site.email}`}>
            <span>Let’s <em>talk</em></span>
            <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </Reveal>
        <div>
          <a className="contact-address" href={`mailto:${site.email}`} aria-label={`Email ${user}`}>
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
