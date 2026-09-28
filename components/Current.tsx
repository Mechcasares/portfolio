import { site } from "@/content/site";
import { Circled, Note } from "./hand";
import { Reveal } from "./motion";
import { Rich } from "./Rich";

// "Currently" note: CFY as context for the work, not as branding.
export function Current() {
  const c = site.current;
  return (
    <Reveal className="now">
      <div className="now-head">
        <span className="mono now-label">
          <span className="now-pulse" aria-hidden="true" /> Currently
        </span>
        <p className="now-title">
          {c.role} at{" "}
          <Circled seed={19} delay={0.5}>{c.name}</Circled>
        </p>
        <Note delay={1.1} className="now-note">AI x retail, in production</Note>
      </div>
      <p className="now-blurb"><Rich text={c.blurb} /></p>
      <dl className="now-facts">
        {c.facts.map((f) => (
          <div key={f.label}>
            <dt className="mono">{f.label}</dt>
            <dd><Rich text={f.value} /></dd>
          </div>
        ))}
      </dl>
      <p className="now-foot">
        Happy to walk through this work in a call.{" "}
        <a href={c.source.href} target="_blank" rel="noreferrer">{c.source.label} ↗</a>
      </p>
    </Reveal>
  );
}
