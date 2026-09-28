// Generates brand/linkedin-cover.html with the same stroke generator, colors
// and textures as the site. Render it with `node scripts/render-cover.mjs`.
import { writeFileSync } from "node:fs";
import { roughArrow, roughEllipse, roughLine, roughRect } from "../lib/rough.ts";

const W = 1584;
const H = 396;
const C = { bg: "#f4f3ef", ink: "#141413", pencil: "#57544d", pen: "#9b1c2e", warm: "#efa93b", canvas: "#efece5", line: "#e1ded6", faint: "#a9a69e" };

// Card: left half is the sketch, right half the shipped UI. The split is the wipe line.
const card = { x: 640, y: 92, w: 420, h: 216 };
const split = 812;

const sketch = [
  roughRect(card.x, card.y, card.w, card.h, 3, 6),
  roughLine(card.x + 22, card.y + 34, card.x + 120, card.y + 32, 4, 2),
  roughLine(card.x + 22, card.y + 58, card.x + 150, card.y + 58, 5, 1.5),
  ...[96, 122, 148].map((dy, i) => roughLine(card.x + 22, card.y + dy, card.x + 150 - i * 18, card.y + dy, 10 + i, 1.2)),
  roughRect(card.x + 22, card.y + 170, 110, 28, 20, 3),
  roughEllipse(card.x + 150, card.y + 104, 11, 11, 21, 1.02),
].join(" ");

const pen = {
  circle: roughEllipse(card.x + 348, card.y + 184, 78, 30, 7),
  arrow: roughArrow(card.x + 150, card.y - 34, card.x + 300, card.y + 150, -0.38, 9),
  underline: roughLine(card.x + 190, card.y + 48, card.x + 290, card.y + 45, 17, 1.5),
  // A long pen line that runs edge to edge and ties everything together.
  thread: [
    "M -20 118",
    "C 120 60, 210 170, 330 132",
    "S 520 40, 600 96",
    "M 1068 250",
    "C 1120 300, 1180 318, 1240 300",
  ].join(" "),
  loop: roughEllipse(292, 74, 26, 20, 31, 1.3),
};

const organic = (cx: number, cy: number, r: number, seed: number) => {
  // A soft, slightly imperfect filled circle.
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const N = 18;
  const pts = Array.from({ length: N }, (_, i) => {
    const t = (i / N) * Math.PI * 2;
    const k = 1 + (rnd() - 0.5) * 0.035;
    return [cx + Math.cos(t) * r * k, cy + Math.sin(t) * r * k];
  });
  const mid = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M ${mid(pts[N - 1], pts[0]).join(" ")}`;
  for (let i = 0; i < N; i++) {
    const p = pts[i];
    const m = mid(p, pts[(i + 1) % N]);
    d += ` Q ${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return d + " Z";
};

const ticks = Array.from({ length: 22 }, (_, i) => {
  const x = 596 + i * 24;
  const h = i % 5 === 0 ? 10 : 5;
  return `<line x1="${x}" y1="44" x2="${x}" y2="${44 + h}" />`;
}).join("");

const cross = (x: number, y: number) =>
  `<path d="M${x - 6} ${y} H${x + 6} M${x} ${y - 6} V${y + 6}" />`;

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
</style></head>
<body><div class="cover">
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="${C.pencil}" opacity=".22" />
    </pattern>
    <clipPath id="left"><rect x="0" y="0" width="${split}" height="${H}" /></clipPath>
    <clipPath id="right"><rect x="${split}" y="0" width="${W - split}" height="${H}" /></clipPath>
  </defs>

  <!-- notebook panel with organic corners -->
  <path d="M 612 40 H 1066 Q 1098 40 1098 72 V 330 Q 1098 356 1068 356 H 598 Q 568 356 568 318 V 84 Q 568 40 612 40 Z" fill="${C.canvas}" />
  <path d="M 612 40 H 1066 Q 1098 40 1098 72 V 330 Q 1098 356 1068 356 H 598 Q 568 356 568 318 V 84 Q 568 40 612 40 Z" fill="url(#dots)" />
  <g stroke="${C.faint}" stroke-width="1">${ticks}</g>
  <rect x="604" y="28" width="86" height="22" fill="${C.warm}" opacity=".55" transform="rotate(-6 647 39)" style="mix-blend-mode:multiply" />

  <!-- shipped UI (right of the split) -->
  <g clip-path="url(#right)">
    <rect x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" rx="12" fill="#fff" />
    <rect x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" rx="12" fill="none" stroke="${C.line}" />
    <rect x="${card.x + 190}" y="${card.y + 26}" width="120" height="12" rx="6" fill="${C.ink}" />
    <rect x="${card.x + 190}" y="${card.y + 52}" width="150" height="8" rx="4" fill="${C.line}" />
    <rect x="${card.x + 186}" y="${card.y + 82}" width="210" height="34" rx="8" fill="${C.bg}" />
    <circle cx="${card.x + 206}" cy="${card.y + 99}" r="8" fill="${C.warm}" />
    <rect x="${card.x + 222}" y="${card.y + 95}" width="90" height="8" rx="4" fill="${C.pencil}" opacity=".55" />
    <rect x="${card.x + 360}" y="${card.y + 91}" width="26" height="16" rx="8" fill="${C.ink}" />
    <circle cx="${card.x + 378}" cy="${card.y + 99}" r="6" fill="#fff" />
    <rect x="${card.x + 186}" y="${card.y + 126}" width="210" height="34" rx="8" fill="${C.bg}" />
    <circle cx="${card.x + 206}" cy="${card.y + 143}" r="8" fill="${C.pen}" opacity=".85" />
    <rect x="${card.x + 222}" y="${card.y + 139}" width="70" height="8" rx="4" fill="${C.pencil}" opacity=".55" />
    <rect x="${card.x + 290}" y="${card.y + 170}" width="116" height="30" rx="15" fill="${C.pen}" />
    <rect x="${card.x + 318}" y="${card.y + 182}" width="60" height="6" rx="3" fill="#fff" opacity=".9" />
  </g>

  <!-- the sketch (left of the split) -->
  <g clip-path="url(#left)" fill="none" stroke="${C.pencil}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="${sketch}" />
  </g>

  <!-- the wipe line -->
  <line x1="${split}" y1="${card.y - 18}" x2="${split}" y2="${card.y + card.h + 18}" stroke="${C.pen}" stroke-width="2" />

  <!-- red pen: thinking on top of the product -->
  <g fill="none" stroke="${C.pen}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="${pen.circle}" />
    <path d="${pen.arrow}" />
    <path d="${pen.thread}" stroke-width="2.2" />
    <path d="${pen.loop}" stroke-width="2.2" />
  </g>
  <path d="${pen.underline}" fill="none" stroke="${C.warm}" stroke-width="9" stroke-linecap="round" opacity=".55" style="mix-blend-mode:multiply" />

  <!-- signature shapes -->
  <path d="${organic(1432, 318, 84, 5)}" fill="${C.warm}" />
  <path d="${organic(1284, 192, 122, 11)}" fill="${C.pen}" />
  <path d="${roughEllipse(1284, 192, 142, 138, 13, 1.06)}" fill="none" stroke="${C.ink}" stroke-width="1.4" stroke-linecap="round" opacity=".45" />

  <!-- small digital marks -->
  <g stroke="${C.faint}" stroke-width="1.2" fill="none">
    ${cross(1124, 60)}${cross(1124, 336)}${cross(1520, 44)}${cross(470, 340)}
  </g>
  <g fill="${C.ink}">
    <circle cx="1510" cy="120" r="3" /><circle cx="1526" cy="120" r="3" opacity=".5" /><circle cx="1542" cy="120" r="3" opacity=".25" />
  </g>
  <!-- tiny doodle: a hand drawn asterisk -->
  <g stroke="${C.ink}" stroke-width="2" stroke-linecap="round" fill="none">
    <path d="${roughLine(468, 58, 468, 86, 41, 1)} ${roughLine(455, 64, 481, 80, 42, 1)} ${roughLine(481, 64, 455, 80, 43, 1)}" />
  </g>

  <!-- the palette as tokens, sitting on the thread -->
  <g>
    <circle cx="372" cy="176" r="13" fill="${C.ink}" />
    <circle cx="404" cy="176" r="13" fill="${C.pen}" />
    <circle cx="436" cy="176" r="13" fill="${C.warm}" />
    <circle cx="468" cy="176" r="13" fill="${C.bg}" stroke="${C.line}" />
    <path d="${roughLine(356, 206, 484, 204, 51, 1)}" fill="none" stroke="${C.pencil}" stroke-width="1.4" stroke-linecap="round" />
    <path d="M356 200 v10 M484 198 v10" stroke="${C.pencil}" stroke-width="1.4" stroke-linecap="round" />
  </g>
</svg>
<div class="grain"></div>
</div></body></html>`;

writeFileSync(new URL("../brand/linkedin-cover.html", import.meta.url), html);
console.log("wrote brand/linkedin-cover.html");
