"use client";

import { motion, type Variants } from "motion/react";
import { site } from "@/content/site";
import { roughArrow, roughEllipse, roughLine, roughRect } from "@/lib/rough";

// Small drawings, one per chapter (120×72 box). Pencil for the object,
// red pen for the one detail that matters.
const art: Record<string, { pencil: string[]; pen: string[] }> = {
  talk: {
    pencil: [roughRect(22, 10, 76, 40, 1, 3), roughLine(40, 50, 34, 64, 2, 0.5) + " " + roughLine(34, 64, 52, 50, 3, 0.5)],
    pen: [roughLine(34, 24, 84, 24, 4, 1), roughLine(34, 36, 70, 36, 5, 1)],
  },
  screen: {
    pencil: [roughRect(16, 8, 88, 56, 6, 3), roughLine(16, 20, 104, 20, 7, 1), roughLine(28, 34, 70, 34, 8, 1), roughLine(28, 46, 60, 46, 9, 1)],
    pen: [roughEllipse(84, 42, 9, 9, 10, 1.05)],
  },
  code: {
    pencil: [roughLine(44, 20, 28, 36, 11, 0.6) + " " + roughLine(28, 36, 44, 52, 12, 0.6), roughLine(76, 20, 92, 36, 13, 0.6) + " " + roughLine(92, 36, 76, 52, 14, 0.6)],
    pen: [roughLine(66, 16, 54, 56, 15, 0.6)],
  },
  wire: {
    pencil: [roughRect(20, 8, 80, 56, 16, 3), roughLine(30, 22, 80, 22, 17, 1), roughLine(30, 32, 66, 32, 18, 1), roughRect(38, 42, 44, 12, 19, 2)],
    pen: [roughEllipse(60, 48, 30, 13, 20)],
  },
  ship: {
    pencil: [roughRect(34, 30, 56, 34, 21, 2), roughRect(28, 22, 56, 34, 22, 2), roughRect(22, 14, 56, 34, 23, 2)],
    pen: [roughArrow(70, 60, 104, 14, -0.2, 24)],
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

function Art({ name }: { name: string }) {
  const a = art[name];
  return (
    <motion.svg className="ch-art" viewBox="0 0 120 72" aria-hidden="true" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.8 }}>
      <g className="pencil">
        {a.pencil.map((d, j) => (
          <motion.path key={j} d={d} variants={draw(j)} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
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

// How I got here: five short chapters on one thread. Each one hands a layer
// to the next (+ storytelling, + feasibility…) and the last line adds them up.
export function Path() {
  const { path, sum } = site.about;
  return (
    <div className="path" aria-labelledby="path-title">
      <div className="path-head">
        <p id="path-title" className="code-label">// how I got here</p>
        <span className="path-hint" aria-hidden="true">swipe →</span>
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
            <Art name={c.art} />
            <span className="ch-num">{String(i + 1).padStart(2, "0")}{c.now && <span className="ch-now">now</span>}</span>
            <h4 className="ch-name">{c.stage}</h4>
            <p className="ch-where">{c.where}</p>
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
