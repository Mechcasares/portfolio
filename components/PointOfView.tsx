import { site } from "@/content/site";
import { Reveal } from "./motion";
import { Rich } from "./Rich";

// One typeface, hierarchy by size and weight. The only nod to code is the
// comment label and the braces: a detail, not the visual language.
export function PointOfView() {
  return (
    <div className="pov" aria-label="How I think">
      <p className="code-label">// how I think</p>

      <Reveal>
        <p className="pov-statement">
          I tell the story, shape the experience and understand{" "}
          <span className="pov-build"><span className="brace">{"{"}</span>how it gets built<span className="brace">{"}"}</span></span>.
        </p>
      </Reveal>

      <ol className="chain">
        {site.chain.map((c, i) => (
          <Reveal as="li" key={c.word} className={`chain-item${i === site.chain.length - 1 ? " chain-item--last" : ""}`} delay={i * 0.08}>
            <span className="chain-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="chain-word">{c.word}</span>
            <p className="chain-body"><Rich text={c.body} /></p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
