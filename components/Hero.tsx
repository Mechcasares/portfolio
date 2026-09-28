import { site } from "@/content/site";
import { Enter, WordReveal } from "./motion";

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <Enter delay={0.1} className="hero-meta mono">
        <span className="dot" aria-hidden="true" />
        <span>{site.location}</span>
        <span className="sep">·</span>
        <span>{site.role}</span>
        <span className="sep">·</span>
        <span>{site.focus}</span>
      </Enter>

      <h1 id="hero-title" className="hero-title">
        <WordReveal text={site.hero.lead} delay={0.2} onMount />{" "}
        <em>
          <WordReveal text={site.hero.accent} delay={0.2 + site.hero.lead.split(" ").length * 0.035} onMount />
        </em>
      </h1>

      <div className="grid hero-bottom">
        <Enter delay={0.75} as="p" className="hero-support">
          {site.hero.supporting}
        </Enter>
        <Enter delay={0.95} className="hero-cue mono">
          <a href="#work" style={{ display: "inline-flex", gap: 12, alignItems: "center" }} className="hero-cue">
            <span className="arrow" aria-hidden="true">↓</span>
            Selected work
          </a>
        </Enter>
      </div>
    </section>
  );
}
