// Tiny generator for hand-drawn SVG paths. Seeded, so a stroke looks the same
// on the server and the client (no hydration mismatch) and between visits.

function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const f = (n: number) => Math.round(n * 10) / 10;

/** Smooth path through points (Catmull-Rom converted to cubic Béziers). */
function smooth(points: [number, number][]) {
  let d = `M${f(points[0][0])} ${f(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** A loose loop around a box, like circling a word with a pen. Doesn't close neatly. */
export function roughEllipse(cx: number, cy: number, rx: number, ry: number, seed = 1, turns = 1.12) {
  const r = rng(seed);
  const steps = 22;
  const start = -Math.PI * (0.55 + r() * 0.2);
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = start + (i / steps) * Math.PI * 2 * turns;
    const wobble = 1 + (r() - 0.5) * 0.07 + (i / steps) * 0.05;
    pts.push([cx + Math.cos(t) * rx * wobble, cy + Math.sin(t) * ry * wobble]);
  }
  return smooth(pts);
}

/** A slightly crooked line with a little jitter along the way. */
export function roughLine(x1: number, y1: number, x2: number, y2: number, seed = 1, jitter = 1.5) {
  const r = rng(seed);
  const n = 5;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const j = i === 0 || i === n ? 0 : (r() - 0.5) * 2 * jitter;
    pts.push([x1 + (x2 - x1) * t + j * 0.4, y1 + (y2 - y1) * t + j]);
  }
  return smooth(pts);
}

/** A box drawn as four separate strokes that overshoot at the corners. */
export function roughRect(x: number, y: number, w: number, h: number, seed = 1, over = 4) {
  const r = rng(seed);
  const o = () => (r() - 0.3) * over;
  return [
    roughLine(x - o(), y + o() * 0.3, x + w + o(), y + o() * 0.3, seed + 1),
    roughLine(x + w + o() * 0.3, y - o(), x + w + o() * 0.3, y + h + o(), seed + 2),
    roughLine(x + w + o(), y + h + o() * 0.3, x - o(), y + h + o() * 0.3, seed + 3),
    roughLine(x + o() * 0.3, y + h + o(), x + o() * 0.3, y - o(), seed + 4),
  ].join(" ");
}

/** A curved arrow from (x1,y1) to (x2,y2) with an open head. `bend` curves the shaft. */
export function roughArrow(x1: number, y1: number, x2: number, y2: number, bend = 0.25, seed = 1) {
  const r = rng(seed);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = mx - dy * bend;
  const cy = my + dx * bend;
  const shaft = `M${f(x1)} ${f(y1)} Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`;
  const angle = Math.atan2(y2 - cy, x2 - cx);
  const len = Math.max(8, Math.hypot(dx, dy) * 0.12);
  const a1 = angle + Math.PI - 0.5 - r() * 0.1;
  const a2 = angle + Math.PI + 0.45 + r() * 0.1;
  const head = `M${f(x2 + Math.cos(a1) * len)} ${f(y2 + Math.sin(a1) * len)} L${f(x2)} ${f(y2)} L${f(x2 + Math.cos(a2) * len)} ${f(y2 + Math.sin(a2) * len)}`;
  return `${shaft} ${head}`;
}

/** A quick scribbled underline: one stroke out, a shorter one back. */
export function roughUnderline(w: number, y: number, seed = 1) {
  const r = rng(seed);
  const back = `M${f(w * (0.92 + r() * 0.05))} ${f(y + 3)} Q${f(w * 0.5)} ${f(y + 6 + r() * 2)} ${f(w * (0.12 + r() * 0.08))} ${f(y + 5)}`;
  return `${roughLine(0, y, w, y - 2, seed, 1.2)} ${back}`;
}
