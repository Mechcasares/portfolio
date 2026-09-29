"use client";

import { motion, type Variants } from "motion/react";
import { site } from "@/content/site";
import { roughEllipse, roughLine, roughRect } from "@/lib/rough";

// The section is ordered from messy to clear, and the drawings follow: the first
// ones are loose, overdrawn pencil; each step is steadier; the last one isn't
// sketched at all, it's a clean interface. Same idea as how I work: explore by
// hand, end with something precise.

type Art = { pencil: string[]; pen: string[] };

const art: Record<string, Art> = {
  // Loose, overdrawn: a speech bubble scribbled twice.
  talk: {
    pencil: [
      roughRect(20, 10, 78, 40, 1, 9),
      roughRect(23, 12, 74, 37, 2, 7),
      roughLine(40, 50, 32, 66, 3, 2) + " " + roughLine(32, 66, 54, 50, 4, 2),
    ],
    pen: [roughLine(32, 24, 86, 23, 5, 3), roughLine(32, 36, 70, 37, 6, 3)],
  },
  // Still rough, a little calmer: a screen.
  screen: {
    pencil: [roughRect(16, 8, 88, 56, 7, 6), roughLine(16, 20, 104, 20, 8, 2), roughLine(28, 34, 70, 34, 9, 1.6), roughLine(28, 46, 60, 46, 10, 1.6)],
    pen: [roughEllipse(84, 42, 9, 9, 11, 1.12)],
  },
  // Steadier lines: code.
  code: {
    pencil: [roughLine(44, 20, 28, 36, 12, 0.5) + " " + roughLine(28, 36, 44, 52, 13, 0.5), roughLine(76, 20, 92, 36, 14, 0.5) + " " + roughLine(92, 36, 76, 52, 15, 0.5)],
    pen: [roughLine(66, 16, 54, 56, 16, 0.3)],
  },
  // Almost clean: a wireframe, the button circled.
  wire: {
    pencil: [roughRect(20, 8, 80, 56, 17, 1.2), roughLine(30, 22, 80, 22, 18, 0.3), roughLine(30, 32, 66, 32, 19, 0.3), roughRect(38, 42, 44, 12, 20, 0.6)],
    pen: [roughEllipse(60, 48, 30, 13, 21, 1.04)],
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

// Product Design: not a sketch. A small, finished interface (the same wireframe
// from the step before, now real) and a cursor clicking its main action.
function Product() {
  return (
    <motion.svg
      className="ch-art ch-art--product"
      viewBox="0 0 120 72"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
    >
      <rect x="20.5" y="6.5" width="79" height="59" rx="6" fill="#fff" stroke="#cbc7bd" />
      <rect x="20.5" y="6.5" width="79" height="11" rx="6" fill="#f4f3ef" />
      <rect x="20.5" y="12.5" width="79" height="5" fill="#f4f3ef" />
      <circle cx="27" cy="12" r="1.6" fill="var(--pen)" />
      <circle cx="32" cy="12" r="1.6" fill="#cbc7bd" />
      <rect x="30" y="25" width="44" height="4" rx="2" fill="#141413" />
      <rect x="30" y="33" width="58" height="3" rx="1.5" fill="#cbc7bd" />
      <rect x="30" y="39" width="40" height="3" rx="1.5" fill="#cbc7bd" />
      <rect x="30" y="48" width="36" height="10" rx="5" fill="var(--pen)" />
      <rect x="37" y="52" width="22" height="2" rx="1" fill="#fff" />
      <motion.g
        initial={{ x: 18, y: 12, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <path d="M60 53 L60 66 L63.6 62.6 L66.2 68 L68.4 67 L65.8 61.6 L70.6 61.4 Z" fill="#141413" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
      </motion.g>
    </motion.svg>
  );
}

export function Path() {
  const { path, sum } = site.about;
  return (
    <div className="path" aria-labelledby="path-title">
      <div className="path-head">
        <p id="path-title" className="code-label">// how I got here</p>
        <p className="path-scale" aria-hidden="true">
          <span>messy</span>
          <span className="path-scale-line" />
          <span className="path-scale-end">clear</span>
        </p>
      </div>

      <ol className="chapters">
        {path.map((c, i) => (
          <motion.li
            key={c.stage}
            className={`ch ch--${i + 1}${c.now ? " ch--now" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="ch-node" aria-hidden="true" />
            {c.art === "product" ? <Product /> : <Sketch name={c.art} />}
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
