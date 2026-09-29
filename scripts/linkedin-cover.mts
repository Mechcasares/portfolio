// LinkedIn cover: one screen, half sketch and half real. The Eden room
// reservation card starts as a pen wireframe and turns into the shipped UI
// at the seam, taped onto crumpled paper. No text of my own: LinkedIn already
// shows name and role. Bottom left stays clear for the profile photo.
// Render with `node scripts/render-cover.mjs`.
import { writeFileSync } from "node:fs";
import { roughEllipse, roughLine, roughRect, roughArrow } from "../lib/rough.ts";

const W = 1584;
const H = 396;
const C = { bg: "#f4f3ef", ink: "#141413", pencil: "#57544d", pen: "#9b1c2e", warm: "#efa93b" };

// Screenshot coordinates (452×512 image) mapped onto the banner.
const S = 0.8;
const CX = 800;
const CY = 30;
const CROP = 440; // show the card down to here (image px), footer left out
const SEAM = 176; // image x where sketch becomes real
const X = (x: number) => +(CX + x * S).toFixed(1);
const Y = (y: number) => +(CY + y * S).toFixed(1);

const ink: string[] = [];
const pencil: string[] = [];
const pen: string[] = [];
let sd = 1;
const line = (a: string[], x1: number, y1: number, x2: number, y2: number, j = 0.5) => a.push(roughLine(X(x1), Y(y1), X(x2), Y(y2), sd++, j));
const box = (a: string[], x: number, y: number, w: number, h: number, over = 0.6) => a.push(roughRect(X(x), Y(y), w * S, h * S, sd++, over));
const text = (x: number, y: number, w: number) => line(pencil, x, y, x + w, y, 0.35);

// card outline with its rounded corner, and the header
ink.push(`M${X(SEAM + 8)} ${Y(1)} L${X(14)} ${Y(1)} Q ${X(1)} ${Y(1)} ${X(1)} ${Y(14)}`);
line(ink, 1, 14, 1, CROP + 30, 0.7);
text(30, 22, 64);
box(pencil, 14, 46, 276, 420, 2);

// event title + input
text(25, 63, 36); box(ink, 25, 72, 254, 17);
text(32, 80.5, 80);
// description
text(25, 105, 44); box(ink, 25, 114, 254, 59);
text(31, 125, 30); text(31, 136, 42); text(31, 147, 150); text(31, 158, 48);
// date row
pencil.push(roughEllipse(X(28), Y(191.5), 3.4, 3.4, sd++, 1.1));
box(ink, 37, 183, 106, 17); text(44, 191.5, 44);
box(ink, 148, 183, 44, 17); text(154, 191.5, 22);
// all day
box(ink, 38, 207, 9, 9, 0.3); text(52, 212, 40);
// location
pencil.push(roughEllipse(X(28), Y(238), 3.2, 3.6, sd++, 1.1));
box(ink, 37, 230, 242, 17); text(44, 238.5, 110);
line(pencil, 25, 258, 279, 258, 0.4);
// guests
text(25, 274, 34); box(ink, 36, 283, 243, 16);
box(pencil, 36, 301, 243, 122, 2);
for (const [i, ry] of [310, 339, 358, 386, 406].entries()) {
  pencil.push(roughEllipse(X(49), Y(ry), 6.5 * S, 6.5 * S, sd++, 1.1));
  line(ink, 61, ry - 2.5, 61 + [52, 62, 44, 56, 50][i], ry - 2.5, 0.3);
  text(61, ry + 4, 40);
}

// burgundy notes, on the sketch side only
pen.push(roughEllipse(X(90), Y(191.5), 70 * S, 16 * S, sd++, 1.12));
pen.push(roughArrow(X(-80), Y(150), X(18), Y(186), -0.3, sd++));

const d = (a: string[]) => a.join(" ");

// Crumpled paper: a jittered triangle mesh, each facet lit a little differently,
// with faint creases along some edges.
let ps = 5;
const pr = () => ((ps = (ps * 9301 + 49297) % 233280) / 233280);
const cell = 58;
const cols = Math.ceil(W / cell) + 2, rows = Math.ceil(H / cell) + 2;
const grid: [number, number][][] = [];
for (let j = 0; j < rows; j++) {
  grid.push([]);
  for (let i = 0; i < cols; i++) grid[j].push([(i - 1) * cell + (pr() - 0.5) * cell * 0.9, (j - 1) * cell + (pr() - 0.5) * cell * 0.9]);
}
const facets: string[] = [];
const creases: string[] = [];
const tri = (p: [number, number][]) => {
  const shade = 244 + Math.round((pr() - 0.5) * 9);
  const c = `rgb(${shade},${shade - 1},${shade - 5})`;
  facets.push(`<path d="M${p.map((q) => q.map((n) => n.toFixed(1)).join(" ")).join(" L")} Z" fill="${c}" stroke="${c}" stroke-width="1" />`);
  if (pr() < 0.22) creases.push(`M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)} L${p[1][0].toFixed(1)} ${p[1][1].toFixed(1)}`);
};
for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
  const [a1, b1, c1, d1] = [grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]];
  if (pr() < 0.5) { tri([a1, b1, c1]); tri([a1, c1, d1]); } else { tri([b1, d1, a1]); tri([b1, c1, d1]); }
}
const paper = `
  <filter id="soft"><feGaussianBlur stdDeviation="2.2" /></filter>
  <g filter="url(#soft)">${facets.join("")}</g>
  <path d="${creases.join(" ")}" stroke="#ffffff" stroke-width="1" opacity=".4" fill="none" />
  <path d="${creases.join(" ")}" stroke="#8a8578" stroke-width=".6" opacity=".12" fill="none" transform="translate(0.8 0.8)" />`;

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  html, body { margin: 0; background: ${C.bg}; }
  .cover { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: ${C.bg}; }
  .layer { position: absolute; inset: 0; }
  .grain { position: absolute; inset: 0; opacity: .3; mix-blend-mode: multiply; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.42 0 0 0 0 0.38 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  .shot { position: absolute; left: ${X(SEAM)}px; top: ${CY}px; width: ${(442 - SEAM) * S}px; height: ${CROP * S}px; overflow: hidden; }
  .shot img { position: absolute; left: ${-SEAM * S}px; top: 0; width: ${452 * S}px; filter: grayscale(1) contrast(1.1); mix-blend-mode: multiply; }
  .tape { position: absolute; background: ${C.warm}; opacity: .9; mix-blend-mode: multiply; }
</style></head>
<body><div class="cover">
  <svg class="layer" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${paper}
  </svg>

  <div class="shot"><img src="../public/images/eden/room-reservation.png" alt=""></div>

  <svg class="layer" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <defs><clipPath id="sketch"><rect x="0" y="0" width="${X(SEAM) + 3}" height="${H}" /></clipPath></defs>
    <g clip-path="url(#sketch)">
      <path d="${d(pencil)}" stroke="${C.pencil}" stroke-width="1.1" opacity=".85" />
      <path d="${d(ink)}" stroke="${C.ink}" stroke-width="1.3" />
    </g>
    <path d="${d(pen)}" stroke="${C.pen}" stroke-width="2.2" />
  </svg>

  <div class="tape" style="left:${X(SEAM) - 64}px; top:${CY - 14}px; width:128px; height:28px; transform: rotate(-4deg);"></div>
  <div class="tape" style="left:${X(442) - 52}px; top:${CY + CROP * S - 22}px; width:104px; height:26px; transform: rotate(-34deg);"></div>
  <div class="grain"></div>
</div></body></html>`;

writeFileSync(new URL("../brand/linkedin-cover.html", import.meta.url), html);
console.log("wrote brand/linkedin-cover.html");
