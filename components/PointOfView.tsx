import { Fragment } from "react";
import { site } from "@/content/site";
import { Arrow, Circled } from "./hand";
import { Reveal } from "./motion";
import { Rich } from "./Rich";

// The chain reads left to right from handwritten (human) to digital (system):
// the style of each word changes as the idea moves toward the product.
export function PointOfView() {
  return (
    <section className="section container pov" aria-labelledby="pov-title">
      <div className="section-head">
        <h2 id="pov-title">Point of view</h2>
        <span className="mono muted">Words → Product → Code</span>
      </div>

      <Reveal>
        <p className="pov-statement">
          I know how to <span className="pov-hand">tell the story</span>,{" "}
          <strong className="pov-ui">design the experience</strong> and understand{" "}
          <code className="pov-code">how the thing gets built</code>.
        </p>
      </Reveal>

      <ol className="chain">
        {site.chain.map((c, i) => (
          <Fragment key={c.word}>
            <Reveal as="li" className={`chain-item chain-item--${i}`} delay={i * 0.1}>
              <span className="mono chain-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="chain-word">
                {i === site.chain.length - 1 ? <Circled seed={23} delay={0.9}>{c.word}</Circled> : c.word}
              </span>
              <p className="chain-body"><Rich text={c.body} /></p>
            </Reveal>
            {i < site.chain.length - 1 && (
              <li className="chain-arrow" aria-hidden="true">
                <Arrow box={[48, 28]} from={[4, 18]} to={[44, 12]} bend={0.3} seed={60 + i} delay={0.3 + i * 0.12} />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </section>
  );
}
