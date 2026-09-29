import { site } from "@/content/site";
import { Reveal } from "./motion";

// How I got here, read like a diff: every stage adds one layer (+ storytelling,
// + feasibility…) and the last line is the sum. A code convention people already
// read without thinking, used once, where it carries meaning.
export function Path() {
  const { path, sum } = site.about;
  return (
    <div className="path" aria-labelledby="path-title">
      <div className="path-head">
        <p id="path-title" className="code-label">// how I got here</p>
        <p className="path-flow" aria-hidden="true">
          {path.map((p, i) => (
            <span key={p.stage}>
              {i > 0 && <span className="path-flow-arrow">→</span>}
              <span className={p.now ? "path-flow-now" : undefined}>{p.stage}</span>
            </span>
          ))}
        </p>
      </div>

      <ol className="path-list">
        {path.map((p, i) => (
          <Reveal as="li" key={p.stage} className={`path-row${p.now ? " path-row--now" : ""}`} delay={i * 0.06}>
            <span className="path-node" aria-hidden="true" />
            <div className="path-stage">
              <span className="path-name">{p.stage}</span>
              <span className="path-detail">{p.detail}</span>
            </div>
            <p className="path-body">{p.body}</p>
            <span className="path-adds">+ {p.adds}</span>
          </Reveal>
        ))}
      </ol>

      <Reveal className="path-sum" delay={0.1}>
        <span className="path-sum-eq" aria-hidden="true">=</span>
        <span className="path-sum-text">
          {sum.map((s, i) => (
            <span key={s}>
              {i > 0 && <span className="path-sum-plus"> + </span>}
              <strong>{s}</strong>
            </span>
          ))}
        </span>
      </Reveal>
    </div>
  );
}
