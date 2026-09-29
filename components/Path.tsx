import { site } from "@/content/site";
import { Reveal } from "./motion";

// How I got here, read like a diff: every stage adds one layer (+ storytelling,
// + feasibility…) and the last line is the sum. A code convention people already
// read without thinking, used once, where it carries meaning.
export function Path() {
  const { path, sum } = site.about;
  return (
    <div className="path" aria-labelledby="path-title">
      <p id="path-title" className="code-label">// how I got here</p>

      <ol className="path-list">
        {path.map((p, i) => (
          <Reveal as="li" key={p.stage} className={`path-row${p.now ? " path-row--now" : ""}`} delay={i * 0.05} y={12}>
            <span className="path-node" aria-hidden="true" />
            <span className="path-name">{p.stage}</span>
            <span className="path-adds">+ {p.adds}</span>
            <p className="path-body">
              <span className="path-detail">{p.detail}.</span> {p.body}
            </p>
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
