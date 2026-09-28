import { site } from "@/content/site";
import { Tangle } from "./Tangle";
import { Enter, WordReveal } from "./motion";
import { Rich } from "./Rich";

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <Enter delay={0.1} className="hero-meta mono">
        <span className="dot" aria-hidden="true" />
        <span>{site.location}</span>
        <span className="sep">·</span>
        <span>{site.role} @ {site.current.short}</span>
        <span className="sep">·</span>
        <span>Communication → Product</span>
      </Enter>

      <h1 id="hero-title" className="hero-title">
        <WordReveal text={site.hero.title} delay={0.2} onMount />
      </h1>
      <Tangle delay={0.8} />

      <div className="grid hero-bottom">
        <Enter delay={0.75} as="p" className="hero-support">
          <Rich text={site.hero.supporting} />
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
