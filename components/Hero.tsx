import { site } from "@/content/site";
import { Arrow, Circled, Note } from "./hand";
import { HeroMark } from "./HeroMark";
import { Enter, WordReveal } from "./motion";
import { Rich } from "./Rich";

export function Hero() {
  const leadDelay = 0.2 + site.hero.lead.split(" ").length * 0.035;
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

      <div className="hero-top">
      <h1 id="hero-title" className="hero-title">
        <WordReveal text={site.hero.lead} delay={0.2} onMount />{" "}
        <Circled seed={7} delay={leadDelay + 0.5} trigger="mount">
          <WordReveal text={site.hero.accent} delay={leadDelay} onMount />
        </Circled>
      </h1>
      <HeroMark />
      </div>

      <div className="hero-note" aria-hidden="true">
        <Arrow box={[70, 56]} from={[64, 50]} to={[10, 6]} bend={-0.3} seed={4} delay={1.6} trigger="mount" />
        <Note delay={1.9} trigger="mount">{site.hero.note}</Note>
      </div>

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
