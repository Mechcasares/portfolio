// LinkedIn cover: minimal. One burgundy pen line that starts as a small tangle
// and ends straight, landing on a dot over a saffron circle. Paper and grain.
// No text. Bottom left stays clear for the profile photo.
// Render with `node scripts/render-cover.mjs`.
import { writeFileSync } from "node:fs";

const W = 1584;
const H = 396;
const C = { bg: "#f4f3ef", pen: "#9b1c2e", warm: "#efa93b" };

// A few loops that loosen out, then a straight run to the dot.
function penLine() {
  const pts: [number, number][] = [];
  const x0 = 560, x1 = 920, y = 190;
  const N = 900;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const k = Math.pow(1 - t, 0.9);
    const a = t * 8 * Math.PI * 2;
    const bx = x0 + Math.pow(t, 1.5) * (x1 - x0);
    const r = 1 + 0.18 * Math.sin(i * 0.05);
    pts.push([bx - Math.sin(a) * 40 * k * r, y - Math.cos(a) * 32 * k * r + 32 * k]);
  }
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) d += ` L${f(pts[i][0])} ${f(pts[i][1])}`;
  d += ` C 1000 ${y}, 1120 ${y}, 1236 ${y}`;
  return d;
}

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
  <circle cx="1292" cy="214" r="74" fill="${C.warm}" />
  <path d="${penLine()}" fill="none" stroke="${C.pen}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="1242" cy="190" r="12" fill="${C.pen}" />
</svg>
<div class="grain"></div>
</div></body></html>`;

writeFileSync(new URL("../brand/linkedin-cover.html", import.meta.url), html);
console.log("wrote brand/linkedin-cover.html");
