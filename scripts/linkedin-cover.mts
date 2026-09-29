// LinkedIn cover: an abstract piece built only from the brand's DNA (paper,
// pencil, one burgundy pen line, saffron, a precise grid). No text, no copies of
// the site. Left: loose, hand made, exploring. Right: exact, digital, resolved.
// One continuous pen line crosses from one to the other.
// Render with `node scripts/render-cover.mjs`.
import { writeFileSync } from "node:fs";
import { roughEllipse, roughLine, roughRect } from "../lib/rough.ts";

const W = 1584;
const H = 396;
const C = { bg: "#f4f3ef", ink: "#141413", pencil: "#57544d", faint: "#b9b5ab", pen: "#9b1c2e", warm: "#efa93b" };

let seed = 7;
const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);

// The pen line: dense scribble top left, loosening loops across the middle,
// then a straight run into the grid, ending on the burgundy dot.
function penLine() {
  const pts: [number, number][] = [];
  // scribble cluster: many small overlapping ellipses, drawn smoothly
  const N = 900;
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const a = i * 0.16;
    const r = 30 + 14 * Math.sin(i * 0.021) + 8 * Math.sin(i * 0.057);
    const cx = 200 + t * 130 + 10 * Math.sin(i * 0.011);
    const cy = 112 + 8 * Math.cos(i * 0.017);
    pts.push([cx + Math.cos(a) * r * 1.35, cy + Math.sin(a * 1.03) * r * 0.85]);
  }
  // loosening loops: each loop wider apart and smaller, until the line runs straight
  const loops = 520;
  const sx = pts[pts.length - 1][0];
  const sy = pts[pts.length - 1][1];
  for (let i = 1; i <= loops; i++) {
    const t = i / loops;
    const k = Math.pow(1 - t, 1.25);
    const a = t * 5 * Math.PI * 2;
    const bx = sx + t * (1090 - sx);
    const by = sy + Math.sin(t * Math.PI) * 110 + t * 20;
    pts.push([bx - Math.sin(a) * 58 * k, by - Math.cos(a) * 46 * k + 46 * k]);
  }
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) d += ` L${f(pts[i][0])} ${f(pts[i][1])}`;
  const [lx, ly] = pts[pts.length - 1];
  d += ` C ${f(lx + 60)} ${f(ly)}, ${1180} 206, 1296 206`;
  return d;
}

// Precise dot grid on the right.
const dots: string[] = [];
for (let x = 1200; x <= 1528; x += 16) for (let y = 62; y <= 350; y += 16) dots.push(`<circle cx="${x}" cy="${y}" r="1.2" />`);

// Pencil exploration marks around the scribble: hatching, a couple of loose shapes.
const hatch = Array.from({ length: 11 }, (_, i) => roughLine(470 + i * 9, 250, 490 + i * 9, 222, 30 + i, 0.6)).join(" ");
const pencilMarks = [
  roughEllipse(640, 290, 46, 40, 41, 1.12),
  roughRect(820, 70, 70, 54, 42, 7),
  hatch,
  roughLine(96, 40, 150, 22, 43, 1.5),
  roughLine(104, 56, 164, 38, 44, 1.5),
].join(" ");

// Crisp digital marks inside the grid.
const cross = (x: number, y: number) => `M${x - 7} ${y} H${x + 7} M${x} ${y - 7} V${y + 7}`;

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  html, body { margin: 0; background: ${C.bg}; }
  .cover { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: ${C.bg}; }
  .grain { position: absolute; inset: 0; opacity: .34; mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.42 0 0 0 0 0.38 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  svg { position: absolute; inset: 0; }
</style></head>
<body><div class="cover">
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- saffron: one large organic form, crossing from loose to exact -->
  <path d="M 980 430 C 900 380, 920 250, 1010 210 C 1100 170, 1210 190, 1270 250 C 1330 310, 1300 420, 1240 460 Z" fill="${C.warm}" />

  <!-- the grid, and a perfect square: the digital side -->
  <g fill="${C.faint}">${dots.join("")}</g>
  <rect x="1360.5" y="94.5" width="112" height="112" fill="none" stroke="${C.ink}" stroke-width="1.5" />
  <path d="${cross(1360.5, 94.5)} ${cross(1472.5, 206.5)}" stroke="${C.ink}" stroke-width="1" />
  <line x1="1200" y1="206.5" x2="1360" y2="206.5" stroke="${C.ink}" stroke-width="1" stroke-dasharray="3 5" />

  <!-- pencil exploration -->
  <path d="${pencilMarks}" fill="none" stroke="${C.pencil}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".8" />

  <!-- the one pen line -->
  <path d="${penLine()}" fill="none" stroke="${C.pen}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />

  <!-- where it lands: a solid, exact dot -->
  <circle cx="1296" cy="206" r="15" fill="${C.pen}" />
</svg>
<div class="grain"></div>
</div></body></html>`;

writeFileSync(new URL("../brand/linkedin-cover.html", import.meta.url), html);
console.log("wrote brand/linkedin-cover.html");
