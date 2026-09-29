"use client";

import { motion, type Variants } from "motion/react";
import { site } from "@/content/site";
import { roughArrow, roughEllipse, roughLine, roughRect } from "@/lib/rough";

// One drawing per chapter of my story, all in the same hand: pencil for the
// object, red pen for the detail that chapter taught me.

type Art = { pencil: string[]; pen: string[] };

const art: Record<string, Art> = {
  // Communication: a speech bubble, the story inside it.
  talk: {
    pencil: [roughRect(22, 10, 76, 40, 1, 3), roughLine(40, 50, 34, 64, 2, 0.5) + " " + roughLine(34, 64, 52, 50, 3, 0.5)],
    pen: [roughLine(34, 24, 84, 24, 4, 1), roughLine(34, 36, 70, 36, 5, 1)],
  },
  // Digital: a screen, with what people click.
  screen: {
    pencil: [roughRect(16, 8, 88, 56, 6, 3), roughLine(16, 20, 104, 20, 7, 1), roughLine(28, 34, 70, 34, 8, 1), roughLine(28, 46, 60, 46, 9, 1)],
    pen: [roughEllipse(84, 42, 9, 9, 10, 1.05)],
  },
  // Development: code.
  code: {
    pencil: [roughLine(44, 20, 28, 36, 11, 0.6) + " " + roughLine(28, 36, 44, 52, 12, 0.6), roughLine(76, 20, 92, 36, 13, 0.6) + " " + roughLine(92, 36, 76, 52, 14, 0.6)],
    pen: [roughLine(66, 16, 54, 56, 15, 0.6)],
  },
  // UX/UI: a flow. One screen leads to the next.
  wire: {
    pencil: [
      roughRect(10, 12, 38, 50, 16, 2), roughLine(16, 24, 40, 24, 17, 0.5), roughRect(16, 44, 24, 8, 18, 1),
      roughRect(72, 12, 38, 50, 19, 2), roughLine(78, 24, 102, 24, 20, 0.5), roughLine(78, 32, 96, 32, 21, 0.5),
    ],
    pen: [roughArrow(44, 48, 74, 30, -0.25, 22)],
  },
  // Product Design: where users, business and technology overlap. That spot is the job.
  product: {
    pencil: [roughEllipse(46, 28, 22, 22, 23, 1.04), roughEllipse(74, 28, 22, 22, 24, 1.04), roughEllipse(60, 50, 22, 22, 25, 1.04)],
    pen: [roughEllipse(60, 36, 5, 5, 26, 1.1), roughLine(59, 36, 61, 36.5, 27, 0.2)],
  },
};

const draw = (i: number): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  shown: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 0.55, ease: [0.65, 0, 0.35, 1] as const, delay: i * 0.12 }, opacity: { duration: 0.01, delay: i * 0.12 } },
  },
});

function Sketch({ name }: { name: string }) {
  const a = art[name];
  return (
    <motion.svg className="ch-art" viewBox="0 0 120 72" aria-hidden="true" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.8 }}>
      <g className="pencil">
        {a.pencil.map((d, j) => (
          <motion.path key={j} d={d} variants={draw(j)} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </g>
      <g className="pen">
        {a.pen.map((d, j) => (
          <motion.path key={j} d={d} variants={draw(a.pencil.length + j)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        ))}
      </g>
    </motion.svg>
  );
}

export function Path() {
  const { path, sum } = site.about;
  return (
    <div className="path" aria-labelledby="path-title">
      <div className="path-head">
        <p id="path-title" className="code-label">// how I got here</p>
        <p className="path-flow" aria-hidden="true">
          then <span className="path-flow-arrow">→</span> <strong>now</strong>
        </p>
      </div>

      <ol className="chapters">
        {path.map((c, i) => (
          <motion.li
            key={c.stage}
            className={`ch${c.now ? " ch--now" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="ch-node" aria-hidden="true" />
            <Sketch name={c.art} />
            <span className="ch-era">{c.era}</span>
            <h4 className="ch-name">
              {c.stage}
              {c.now && <span className="ch-now">now</span>}
            </h4>
            <p className="ch-body">{c.body}</p>
            <span className="ch-adds">+ {c.adds}</span>
          </motion.li>
        ))}
      </ol>

      <p className="path-sum">
        <span className="path-sum-eq" aria-hidden="true">=</span>
        <span>
          {sum.map((s, i) => (
            <span key={s}>
              {i > 0 && <span className="path-sum-plus"> + </span>}
              <strong>{s}</strong>
            </span>
          ))}
        </span>
      </p>
    </div>
  );
}
