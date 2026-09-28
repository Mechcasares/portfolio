"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { roughArrow, roughEllipse, roughLine, roughRect } from "@/lib/rough";
import { site } from "@/content/site";
import { Rich } from "./Rich";

// Sketch coordinates match the real screenshot (1126 × 720), so the wipe lines up.
// The source image is cut off on the left and has marks in the corners, so we
// show a clean crop of it (the main area + the success panel) inside a window.
const W = 1126;
const H = 720;
const X0 = 186;
const X1 = 1110;
const Y0 = 8;
const Y1 = 712;
const CW = X1 - X0;
const CH = Y1 - Y0;

const structure = [
  roughRect(X0 + 4, Y0 + 4, CW - 8, CH - 8, 10, 6),
  roughRect(205, 85, 560, 603, 12, 6),
  roughLine(770, 10, 770, 710, 13, 3),
  roughLine(206, 30, 290, 30, 14, 2),
];

const details = [
  // tabs, search, filters
  roughLine(233, 117, 292, 117, 50, 1),
  roughLine(317, 117, 362, 117, 51, 1),
  roughLine(391, 117, 447, 117, 52, 1),
  roughLine(230, 139, 295, 140, 53, 1),
  roughRect(231, 168, 255, 32, 54, 3),
  roughRect(499, 168, 82, 32, 55, 3),
  // table
  roughLine(232, 226, 760, 226, 56, 1.5),
  ...[264, 310, 356, 402, 448, 494, 539, 584].map((y, i) =>
    [roughLine(276, y, 352, y, 60 + i, 1), roughLine(470, y, 640, y, 70 + i, 1)].join(" "),
  ),
  // success panel
  roughEllipse(946, 155, 60, 60, 80, 1.02),
  roughLine(920, 158, 940, 176, 81, 1) + " " + roughLine(940, 176, 972, 138, 82, 1),
  roughLine(852, 291, 1043, 291, 83, 1.5),
  roughLine(898, 340, 1026, 340, 84, 1),
  roughLine(858, 358, 1036, 358, 85, 1),
  roughLine(898, 376, 994, 376, 86, 1),
  roughRect(848, 478, 198, 32, 87, 3),
];

// Red pen: circle the success state, point at it, point at the table.
const notes = [
  roughEllipse(946, 155, 92, 88, 90),
  roughArrow(750, 58, 868, 118, -0.25, 91),
  roughArrow(560, 770, 500, 600, 0.25, 92),
];

function useStroke(progress: MotionValue<number>, start: number, end: number) {
  const pathLength = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start, start + 0.005], [0, 1]);
  return { pathLength, opacity };
}

function Group({
  paths,
  progress,
  from,
  to,
  className,
  width = 1.6,
}: {
  paths: string[];
  progress: MotionValue<number>;
  from: number;
  to: number;
  className: string;
  width?: number;
}) {
  return (
    <g className={className}>
      {paths.map((d, i) => (
        <GroupPath key={i} d={d} progress={progress} start={from + ((to - from) * i) / paths.length} end={from + ((to - from) * (i + 1.6)) / paths.length} width={width} />
      ))}
    </g>
  );
}

function GroupPath({ d, progress, start, end, width }: { d: string; progress: MotionValue<number>; start: number; end: number; width: number }) {
  const style = useStroke(progress, start, Math.min(end, 1));
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    />
  );
}

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // A light spring keeps the drawing moving smoothly between scroll ticks.
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  // Stages: sketch structure → details → red pen notes → wipe to the real UI.
  // Everything happens in the first ~80% of a short section; the rest holds the result.
  const wipe = useTransform(p, [0.44, 0.7], [100, 0]);
  const clipPath = useTransform(wipe, (v) => `inset(0 ${v}% 0 0 round 0 0 10px 10px)`);
  const edgeLeft = useTransform(wipe, (v) => `${100 - v}%`);
  const edgeOpacity = useTransform(p, [0.42, 0.45, 0.68, 0.72], [0, 1, 1, 0]);
  const chrome = useTransform(p, [0.4, 0.5], [0, 1]);
  const notesOpacity = useTransform(p, [0.62, 0.7], [1, 0]);
  const noteA = useTransform(p, [0.3, 0.33], [0, 1]);
  const noteB = useTransform(p, [0.34, 0.37], [0, 1]);
  const shipped = useTransform(p, [0.72, 0.78], [0, 1]);
  const shippedRotate = useTransform(p, [0.72, 0.78], [-14, -6]);
  const shippedScale = useTransform(p, [0.72, 0.78], [1.25, 1]);
  const active = useTransform(p, [0, 0.12, 0.26, 0.42, 0.66, 1], [0, 1, 2, 3, 4, 4]);

  return (
    <section ref={ref} className="process" aria-labelledby="process-title">
      <div className="process-sticky">
        <div className="container process-inner">
          <div className="process-head">
            <h2 id="process-title" className="mono">How I work</h2>
            <p className="process-kicker">
              From something complex to something that feels <span className="hand-inline">obvious</span>.
            </p>
          </div>

          <div className="process-grid">
            <div className="process-canvas">
              <motion.div className="process-chrome" style={{ opacity: chrome }} aria-hidden="true">
                <i /><i /><i />
                <span>app.ping · invoices</span>
              </motion.div>
              <div className="process-frame" style={{ aspectRatio: `${CW} / ${CH}` }}>
                <svg className="sketch" viewBox={`${X0} ${Y0} ${CW} ${CH}`} aria-hidden="true">
                  <Group paths={structure} progress={p} from={0} to={0.12} className="pencil" width={2.6} />
                  <Group paths={details} progress={p} from={0.08} to={0.3} className="pencil" width={2} />
                  <motion.g className="pen" style={{ opacity: notesOpacity }}>
                    <Group paths={notes} progress={p} from={0.26} to={0.4} className="pen" width={3.2} />
                  </motion.g>
                </svg>

                <motion.div className="process-shot" style={{ clipPath }}>
                  <Image
                    src="/images/ping/invoice-sent.png"
                    alt="Ping invoice confirmation, the shipped screen"
                    width={W}
                    height={H}
                    sizes="(min-width: 960px) 70vw, 120vw"
                    style={{
                      position: "absolute",
                      maxWidth: "none",
                      width: `${(W / CW) * 100}%`,
                      height: `${(H / CH) * 100}%`,
                      left: `${(-X0 / CW) * 100}%`,
                      top: `${(-Y0 / CH) * 100}%`,
                    }}
                  />
                </motion.div>
                <motion.span className="process-edge" style={{ left: edgeLeft, opacity: edgeOpacity }} aria-hidden="true" />

                <motion.span className="note process-note process-note--a" style={{ opacity: noteA }} aria-hidden="true">
                  <motion.span style={{ opacity: notesOpacity }}>say what was sent, to who</motion.span>
                </motion.span>
                <motion.span className="note process-note process-note--b" style={{ opacity: noteB }} aria-hidden="true">
                  <motion.span style={{ opacity: notesOpacity }}>scan fast, act later</motion.span>
                </motion.span>
                <motion.span className="note process-stamp" style={{ opacity: shipped, rotate: shippedRotate, scale: shippedScale }} aria-hidden="true">
                  shipped ✓
                </motion.span>
              </div>
            </div>

            <ol className="process-steps">
              {site.process.map((s, i) => (
                <Step key={s.title} index={i} active={active} title={s.title} body={s.body} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ index, active, title, body }: { index: number; active: MotionValue<number>; title: string; body: string }) {
  const opacity = useTransform(active, [index - 1, index - 0.4, index, index + 0.6, index + 1], [0.28, 0.28, 1, 1, 0.28]);
  const x = useTransform(active, [index - 0.5, index, index + 1], [0, 6, 0]);
  return (
    <motion.li className="process-step" style={{ opacity, x }}>
      <span className="mono">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <h3>{title}</h3>
        <p><Rich text={body} /></p>
      </div>
    </motion.li>
  );
}
