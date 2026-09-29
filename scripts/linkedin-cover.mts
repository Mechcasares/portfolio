// Generates brand/linkedin-cover.html with the same system as the portfolio's
// "how I got here": five chapters of the story on one thread, then → now, same
// drawings, same labels, Inter Tight + burgundy + saffron on the paper background.
// Render with `node scripts/render-cover.mjs`.
import { writeFileSync } from "node:fs";
import { roughArrow, roughEllipse, roughLine, roughRect } from "../lib/rough.ts";

const W = 1584;
const H = 396;
const C = { bg: "#f4f3ef", ink: "#141413", ink2: "#3b3a37", muted: "#7a7872", faint: "#a9a69e", pencil: "#57544d", pen: "#9b1c2e", warm: "#efa93b", card: "#fbf9f4", line: "#e1ded6", lineStrong: "#cbc7bd" };

// Same drawings as components/Path.tsx (120×72 box).
const art: Record<string, { pencil: string[]; pen: string[] }> = {
  talk: { pencil: [roughRect(22, 10, 76, 40, 1, 3), roughLine(40, 50, 34, 64, 2, 0.5) + " " + roughLine(34, 64, 52, 50, 3, 0.5)], pen: [roughLine(34, 24, 84, 24, 4, 1), roughLine(34, 36, 70, 36, 5, 1)] },
  screen: { pencil: [roughRect(16, 8, 88, 56, 6, 3), roughLine(16, 20, 104, 20, 7, 1), roughLine(28, 34, 70, 34, 8, 1), roughLine(28, 46, 60, 46, 9, 1)], pen: [roughEllipse(84, 42, 9, 9, 10, 1.05)] },
  code: { pencil: [roughLine(44, 20, 28, 36, 11, 0.6) + " " + roughLine(28, 36, 44, 52, 12, 0.6), roughLine(76, 20, 92, 36, 13, 0.6) + " " + roughLine(92, 36, 76, 52, 14, 0.6)], pen: [roughLine(66, 16, 54, 56, 15, 0.6)] },
  wire: {
    pencil: [roughRect(10, 12, 38, 50, 16, 2), roughLine(16, 24, 40, 24, 17, 0.5), roughRect(16, 44, 24, 8, 18, 1), roughRect(72, 12, 38, 50, 19, 2), roughLine(78, 24, 102, 24, 20, 0.5), roughLine(78, 32, 96, 32, 21, 0.5)],
    pen: [roughArrow(44, 48, 74, 30, -0.25, 22)],
  },
  product: {
    pencil: [roughEllipse(46, 28, 22, 22, 23, 1.04), roughEllipse(74, 28, 22, 22, 24, 1.04), roughEllipse(60, 50, 22, 22, 25, 1.04)],
    pen: [roughEllipse(60, 36, 5, 5, 26, 1.1), roughLine(59, 36, 61, 36.5, 27, 0.2)],
  },
};

const stages = [
  { key: "talk", stage: "Communication", adds: "storytelling" },
  { key: "screen", stage: "Digital", adds: "clarity" },
  { key: "code", stage: "Development", adds: "feasibility" },
  { key: "wire", stage: "UX/UI", adds: "structure" },
  { key: "product", stage: "Product Design", adds: "product thinking", now: true },
];

// LinkedIn places the profile photo over the bottom left: the cards start after it.
const CW = 200;
const GAP = 24;
const CX0 = W - 84 - (CW * 5 + GAP * 4);
const CY = 132;
const CH = 170;
const TY = 104; // the thread

const cards = stages.map((s, i) => {
  const x = CX0 + i * (CW + GAP);
  const a = art[s.key];
  const ax = x + (CW - 120) / 2;
  const ay = CY + 20;
  const pencil = a.pencil.map((d) => `<path d="${d}" />`).join("");
  const pen = a.pen.map((d) => `<path d="${d}" />`).join("");
  return `
  <rect x="${x}" y="${CY}" width="${CW}" height="${CH}" rx="6" fill="${s.now ? "#ffffff" : C.card}" stroke="${s.now ? C.pen : C.line}" stroke-opacity="${s.now ? 0.45 : 1}" />
  <g transform="translate(${ax} ${ay})">
    <g fill="none" stroke="${C.pencil}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${pencil}</g>
    <g fill="none" stroke="${C.pen}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${pen}</g>
  </g>
  <text x="${x + 18}" y="${CY + 124}" class="stage${s.now ? " now" : ""}">${s.stage}</text>
  <text x="${x + 18}" y="${CY + 150}" class="adds">+ ${s.adds}</text>
  ${s.now
    ? `<circle cx="${x + 20}" cy="${TY}" r="11" fill="${C.pen}" fill-opacity=".16" /><circle cx="${x + 20}" cy="${TY}" r="6.5" fill="${C.pen}" />`
    : `<circle cx="${x + 20}" cy="${TY}" r="6" fill="${C.bg}" stroke="${C.lineStrong}" stroke-width="1.6" />`}`;
}).join("");

const lastNode = CX0 + 4 * (CW + GAP) + 20;

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="stylesheet" href="../node_modules/@fontsource-variable/inter-tight/index.css">
<style>
  html, body { margin: 0; background: ${C.bg}; }
  .cover { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: ${C.bg}; }
  .grain { position: absolute; inset: 0; opacity: .32; mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.42 0 0 0 0 0.38 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  svg { position: absolute; inset: 0; }
  text { font-family: "Inter Tight Variable", "Inter Tight", sans-serif; }
  .label { font-size: 16px; font-weight: 500; fill: ${C.pen}; }
  .flow { font-size: 15px; fill: ${C.muted}; }
  .flow-now { fill: ${C.pen}; font-weight: 600; }
  .stage { font-size: 18px; font-weight: 600; letter-spacing: -0.3px; fill: ${C.ink}; }
  .stage.now { fill: ${C.pen}; }
  .adds { font-size: 14px; font-weight: 600; fill: ${C.pen}; }
  .sum { font-size: 22px; font-weight: 600; letter-spacing: -0.3px; fill: ${C.ink}; }
  .plus { fill: ${C.faint}; font-weight: 400; }
  .eq { fill: ${C.pen}; }
</style></head>
<body><div class="cover">
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- saffron shape, same as behind the About photo -->
  <path d="M ${W + 60} -30 C ${W - 30} -60, ${W - 150} -10, ${W - 160} 44 C ${W - 170} 96, ${W - 100} 124, ${W - 30} 110 C ${W + 40} 96, ${W + 90} 20, ${W + 60} -30 Z" fill="${C.warm}" />

  <!-- labels -->
  <text x="96" y="${TY - 30}" class="label">// how I got here</text>
  <text x="96" y="${TY + 5}" class="flow">then <tspan fill="${C.faint}">→</tspan> <tspan class="flow-now">now</tspan></text>

  <!-- the thread -->
  <line x1="200" y1="${TY}" x2="${lastNode}" y2="${TY}" stroke="${C.lineStrong}" stroke-width="1.6" />
  <line x1="${lastNode}" y1="${TY}" x2="${lastNode + CW * 0.6}" y2="${TY}" stroke="${C.pen}" stroke-width="1.6" />
  <circle cx="200" cy="${TY}" r="3" fill="${C.lineStrong}" />

  ${cards}

  <!-- the sum -->
  <text x="${W - 84}" y="${H - 40}" text-anchor="end" class="sum"><tspan class="eq">= </tspan>storytelling<tspan class="plus"> + </tspan>design<tspan class="plus"> + </tspan>technology<tspan class="plus"> + </tspan>product thinking</text>
</svg>
<div class="grain"></div>
</div></body></html>`;

writeFileSync(new URL("../brand/linkedin-cover.html", import.meta.url), html);
console.log("wrote brand/linkedin-cover.html");
