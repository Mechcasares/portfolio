// Generates brand/linkedin-cover.html from the portfolio's own pieces: the hero
// tangle, the "how I got here" drawings on one thread, the // and + labels,
// Inter Tight + Kalam, burgundy + saffron. Render with `node scripts/render-cover.mjs`.
import { writeFileSync } from "node:fs";
import { roughArrow, roughEllipse, roughLine, roughRect } from "../lib/rough.ts";

const W = 1584;
const H = 396;
const C = { bg: "#f4f3ef", ink: "#141413", ink2: "#3b3a37", muted: "#7a7872", pencil: "#57544d", pen: "#9b1c2e", warm: "#efa93b", card: "#fbf9f4", line: "#e1ded6", lineStrong: "#cbc7bd" };

// LinkedIn puts the profile photo over the bottom left, so the story starts after it.
const Y = 236; // the thread
const X0 = 470;
const X1 = 1470;

// The hero tangle: loops that relax into a straight line.
function tangle() {
  // Loops start top left (clear of the profile photo) and drift down onto the thread.
  const pts: string[] = [];
  const steps = 140;
  const sx = 150;
  const sy = 120;
  for (let i = 0; i <= steps; i++) {
    const p = i / steps;
    const t = p * 6 * Math.PI * 2;
    const k = Math.pow(1 - p, 1.3);
    const bx = sx + (600 - sx) * p;
    const by = sy + (Y - sy) * (p * p * (3 - 2 * p));
    const x = bx - 30 * k * Math.sin(t);
    const y = by - 30 * k * Math.cos(t) + 30 * k;
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return `M${pts.join(" L")} L ${X1} ${Y}`;
}

// Same drawings as the portfolio chapters (120×72 box), scaled on the thread.
const art: Record<string, { pencil: string[]; pen: string[] }> = {
  talk: { pencil: [roughRect(22, 10, 76, 40, 1, 3), roughLine(40, 50, 34, 64, 2, 0.5) + " " + roughLine(34, 64, 52, 50, 3, 0.5)], pen: [roughLine(34, 24, 84, 24, 4, 1), roughLine(34, 36, 70, 36, 5, 1)] },
  screen: { pencil: [roughRect(16, 8, 88, 56, 6, 3), roughLine(16, 20, 104, 20, 7, 1), roughLine(28, 34, 70, 34, 8, 1), roughLine(28, 46, 60, 46, 9, 1)], pen: [roughEllipse(84, 42, 9, 9, 10, 1.05)] },
  code: { pencil: [roughLine(44, 20, 28, 36, 11, 0.6) + " " + roughLine(28, 36, 44, 52, 12, 0.6), roughLine(76, 20, 92, 36, 13, 0.6) + " " + roughLine(92, 36, 76, 52, 14, 0.6)], pen: [roughLine(66, 16, 54, 56, 15, 0.6)] },
  wire: { pencil: [roughRect(20, 8, 80, 56, 16, 3), roughLine(30, 22, 80, 22, 17, 1), roughLine(30, 32, 66, 32, 18, 1), roughRect(38, 42, 44, 12, 19, 2)], pen: [roughEllipse(60, 48, 30, 13, 20)] },
  ship: { pencil: [roughRect(34, 30, 56, 34, 21, 2), roughRect(28, 22, 56, 34, 22, 2), roughRect(22, 14, 56, 34, 23, 2)], pen: [roughArrow(70, 60, 104, 14, -0.2, 24)] },
};
const stages = [
  { key: "talk", adds: "storytelling" },
  { key: "screen", adds: "clarity" },
  { key: "code", adds: "feasibility" },
  { key: "wire", adds: "structure" },
  { key: "ship", adds: "product thinking", now: true },
];
const xs = stages.map((_, i) => 700 + i * 180);

const drawings = stages.map((s, i) => {
  const a = art[s.key];
  const x = xs[i] - 60;
  const y = Y - 112;
  const card = `<rect x="${x - 10}" y="${y - 10}" width="140" height="92" rx="6" fill="${C.card}" stroke="${s.now ? C.pen : C.line}" stroke-opacity="${s.now ? 0.5 : 1}" />`;
  const pencil = a.pencil.map((d) => `<path d="${d}" />`).join("");
  const pen = a.pen.map((d) => `<path d="${d}" />`).join("");
  return `${card}<g transform="translate(${x} ${y})"><g fill="none" stroke="${C.pencil}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${pencil}</g><g fill="none" stroke="${C.pen}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${pen}</g></g>`;
}).join("");

const nodes = stages.map((s, i) =>
  s.now
    ? `<circle cx="${xs[i]}" cy="${Y}" r="10" fill="${C.pen}" fill-opacity=".16" /><circle cx="${xs[i]}" cy="${Y}" r="6" fill="${C.pen}" />`
    : `<circle cx="${xs[i]}" cy="${Y}" r="5.5" fill="${C.bg}" stroke="${C.lineStrong}" stroke-width="1.6" />`,
).join("");

const adds = stages.map((s, i) =>
  `<text x="${xs[i]}" y="${Y + 34}" text-anchor="middle" class="adds">+ ${s.adds}</text>`,
).join("");

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="stylesheet" href="../node_modules/@fontsource-variable/inter-tight/index.css">
<link rel="stylesheet" href="../node_modules/@fontsource/kalam/700.css">
<style>
  html, body { margin: 0; background: ${C.bg}; }
  .cover { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: ${C.bg}; }
  .grain { position: absolute; inset: 0; opacity: .32; mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.42 0 0 0 0 0.38 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  svg { position: absolute; inset: 0; }
  text { font-family: "Inter Tight Variable", "Inter Tight", sans-serif; }
  .label { font-size: 15px; font-weight: 500; fill: ${C.pen}; }
  .adds { font-size: 14px; font-weight: 600; fill: ${C.pen}; }
  .sum { font-size: 22px; font-weight: 600; fill: ${C.ink}; letter-spacing: -0.3px; }
  .plus { fill: #a9a69e; font-weight: 400; }
  .eq { fill: ${C.pen}; }
  .hand { font-family: "Kalam", cursive; font-weight: 700; font-size: 24px; fill: ${C.pen}; }
</style></head>
<body><div class="cover">
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- saffron shape, same as behind the About photo -->
  <path d="M 1560 -40 C 1640 30, 1620 150, 1540 170 C 1470 188, 1420 120, 1440 60 C 1455 10, 1500 -60, 1560 -40 Z" fill="${C.warm}" />

  <text x="${xs[0] - 70}" y="92" class="label">// how I got here</text>

  <!-- the thread: starts tangled, ends straight -->
  <path d="${tangle()}" fill="none" stroke="${C.pen}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="${X1}" cy="${Y}" r="5" fill="${C.pen}" />

  ${drawings}
  ${nodes}
  ${adds}

  <!-- the sum, bottom right -->
  <text x="${X1}" y="${H - 42}" text-anchor="end" class="sum"><tspan class="eq">= </tspan>storytelling<tspan class="plus"> + </tspan>design<tspan class="plus"> + </tspan>technology</text>

  <!-- handwritten note on the start of the tangle -->
  <text x="236" y="64" class="hand" transform="rotate(-5 236 64)">it starts messy</text>
  <path d="${roughArrow(230, 58, 196, 84, 0.35, 41)}" fill="none" stroke="${C.pen}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
<div class="grain"></div>
</div></body></html>`;

writeFileSync(new URL("../brand/linkedin-cover.html", import.meta.url), html);
console.log("wrote brand/linkedin-cover.html");
