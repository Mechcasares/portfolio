"use client";

import { site } from "@/content/site";
import { roughArrow, roughEllipse, roughLine, roughRect } from "@/lib/rough";
import { motion, type Variants } from "motion/react";
import { Reveal } from "./motion";
import { Rich } from "./Rich";

// Everyday things that "just make sense", drawn by hand in a 160×120 box.
// Pencil for the object, red pen for the part that makes it obvious.
const doodles: Record<string, { pencil: string[]; pen: string[] }> = {
  door: {
    pencil: [roughRect(44, 6, 72, 110, 1, 4), roughLine(30, 116, 130, 116, 2, 1)],
    pen: [roughLine(100, 44, 100, 78, 3, 1), roughLine(100, 44, 108, 44, 4, 0.5) + " " + roughLine(100, 78, 108, 78, 5, 0.5)],
  },
  sign: {
    pencil: [roughLine(80, 58, 80, 116, 6, 1), roughRect(24, 14, 112, 44, 7, 4)],
    pen: [roughArrow(42, 36, 118, 36, 0, 8)],
  },
  steps: {
    pencil: [
      roughEllipse(30, 26, 9, 9, 9, 1.02), roughLine(50, 26, 132, 26, 10, 1),
      roughEllipse(30, 60, 9, 9, 11, 1.02), roughLine(50, 60, 120, 60, 12, 1),
      roughEllipse(30, 94, 9, 9, 13, 1.02), roughLine(50, 94, 110, 94, 14, 1),
    ],
    pen: [roughLine(25, 26, 29, 31, 15, 0.3) + " " + roughLine(29, 31, 37, 19, 16, 0.3), roughLine(25, 60, 29, 65, 17, 0.3) + " " + roughLine(29, 65, 37, 53, 18, 0.3)],
  },
  ui: {
    pencil: [roughRect(14, 10, 132, 98, 19, 4), roughLine(14, 28, 146, 28, 20, 1), roughLine(30, 44, 110, 44, 21, 1), roughLine(30, 56, 90, 56, 22, 1), roughRect(52, 72, 56, 22, 23, 2)],
    pen: [roughEllipse(80, 83, 44, 20, 24)],
  },
};

// The whole card draws as one sequence once the card is on screen: pencil first,
// then the red pen. Triggering per stroke made small screens draw in fragments.
const draw = (i: number): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  shown: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.6, ease: [0.65, 0, 0.35, 1] as const, delay: i * 0.14 }, opacity: { duration: 0.01, delay: i * 0.14 } },
  },
});

function Doodle({ pencil, pen }: { pencil: string[]; pen: string[] }) {
  return (
    <motion.svg viewBox="0 0 160 120" aria-hidden="true" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.6 }}>
      <g className="pencil">
        {pencil.map((d, j) => (
          <motion.path key={j} d={d} variants={draw(j)} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </g>
      <g className="pen">
        {pen.map((d, j) => (
          <motion.path key={j} d={d} variants={draw(pencil.length + 1 + j)} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </g>
    </motion.svg>
  );
}

export function Obvious() {
  const o = site.obvious;
  return (
    <section className="section container obvious" aria-labelledby="obvious-title">
      <div className="section-head">
        <h2 id="obvious-title">Good design feels obvious</h2>
        <span className="mono muted">Not only on screens</span>
      </div>
      <div className="obvious-grid">
        <Reveal className="obvious-text">
          <h3>{o.title}</h3>
          <p><Rich text={o.body} /></p>
        </Reveal>
        <ul className="obvious-items">
          {o.items.map((it, i) => (
            <Reveal as="li" key={it.key} className="obvious-item" delay={i * 0.08}>
              <Doodle pencil={doodles[it.key].pencil} pen={doodles[it.key].pen} />
              <span className="obvious-label">{it.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
