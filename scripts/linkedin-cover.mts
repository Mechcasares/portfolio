// LinkedIn cover: an editorial collage. A real screen (Eden, room reservation)
// in grayscale that turns into a pen sketch halfway through, held with saffron
// tape and marked in burgundy. Name and role small, top left.
// Bottom left stays clear for the profile photo.
// Render with `node scripts/render-cover.mjs`.
import { writeFileSync } from "node:fs";
import { roughEllipse, roughLine, roughRect, roughArrow } from "../lib/rough.ts";

const W = 1584;
const H = 396;
const C = { bg: "#f4f3ef", ink: "#141413", pencil: "#57544d", faint: "#b9b5ab", pen: "#9b1c2e", warm: "#efa93b" };

// The card: real on the left, drawn on the right. The seam sits at x = SEAM.
const S = 0.753; // screenshot scale
const IX = 880 - 6 * S; // screenshot position so its card edge lands on x 880
const IY = 36 - 4 * S;
const SEAM = 1100;
const R = 1400; // right edge of the drawn card
const TOP = 36;
const HEAD = TOP + 34 * S;

const ink: string[] = [];
const pencil: string[] = [];
const pen: string[] = [];

// card frame continues from the screenshot
ink.push(roughLine(SEAM - 2, TOP, R - 10, TOP, 1, 0.6));
ink.push(`M${R - 10} ${TOP} Q ${R} ${TOP} ${R} ${TOP + 10}`);
ink.push(roughLine(R, TOP + 10, R, 392, 2, 0.8));
pencil.push(roughLine(SEAM - 2, HEAD, R, HEAD, 3, 0.5));

// title and subtitle, as pencil marks
ink.push(roughLine(1122, 84, 1212, 84, 4, 0.4), roughLine(1122, 87, 1206, 86, 5, 0.4));
pencil.push(roughLine(1122, 102, 1254, 102, 6, 0.5));

// chips
pencil.push(roughRect(1122, 116, 30, 16, 7, 3), roughRect(1160, 116, 58, 16, 8, 3), roughRect(1226, 116, 22, 16, 9, 3));

// the room photo, drawn
const fx = 1122, fy = 146, fw = 262, fh = 118;
ink.push(roughRect(fx, fy, fw, fh, 10, 4));
pencil.push(roughLine(fx, fy + 62, fx + fw, fy + 50, 11, 0.6)); // floor line
ink.push(roughRect(fx + 22, fy + 16, 58, 34, 12, 2)); // screen on the wall
for (const [i, lx] of [1236, 1284, 1332].entries()) {
  ink.push(roughLine(lx, fy, lx, fy + 16 + i * 2, 20 + i, 0.3));
  ink.push(roughEllipse(lx, fy + 20 + i * 2, 16, 4.5, 30 + i, 1.05));
}
// table in perspective, reaching out of the frame
ink.push(roughLine(1170, fy + 96, 1420, fy + 64, 40, 0.8));
ink.push(roughLine(1196, fy + 110, 1440, fy + 76, 41, 0.8));
ink.push(roughLine(1170, fy + 96, 1196, fy + 110, 42, 0.4));
// chairs
for (let i = 0; i < 4; i++) {
  const cx = 1200 + i * 46, cy = fy + 86 - i * 6;
  pencil.push(`M${cx} ${cy} q -4 -18 6 -20 q 10 -1 10 16`);
  const bx = 1216 + i * 50, by = fy + 118 - i * 7;
  pencil.push(`M${bx} ${by} q 2 14 12 13 q 9 -1 8 -15`);
}

// meeting services
pencil.push(roughLine(1122, 290, 1232, 290, 50, 0.5));
for (let i = 0; i < 3; i++) {
  const y = 304 + i * 30;
  pencil.push(roughRect(1122, y, 262, 20, 60 + i, 2));
  pen.push(`M${1130} ${y + 11} l 4 5 l 9 -11`);
  pencil.push(roughLine(1154, y + 10, 1154 + 70 - i * 10, y + 10, 70 + i, 0.4));
}

// burgundy: circle what matters, point at it
pen.push(roughEllipse(1286, fy + 24, 78, 22, 80, 1.14));
pen.push(roughArrow(1476, 84, 1372, 162, 0.3, 81));

const d = (a: string[]) => a.join(" ");

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  @font-face { font-family: "Inter Tight"; src: url("../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2") format("woff2"); font-weight: 100 900; }
  html, body { margin: 0; background: ${C.bg}; }
  .cover { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: ${C.bg}; font-family: "Inter Tight", sans-serif; color: ${C.ink}; }
  .grain { position: absolute; inset: 0; opacity: .34; mix-blend-mode: multiply; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.42 0 0 0 0 0.38 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
  .shot { position: absolute; left: ${880 - 8}px; top: ${TOP - 8}px; width: ${SEAM - 872}px; height: ${H}px; overflow: hidden; }
  .shot img { position: absolute; left: ${IX - 872}px; top: ${IY - (TOP - 8)}px; width: ${452 * S}px; filter: grayscale(1) contrast(1.12) brightness(.98); mix-blend-mode: multiply; }
  svg { position: absolute; inset: 0; }
  .piece { position: absolute; inset: 0; transform: translateX(-150px); }
  .tape { position: absolute; background: ${C.warm}; opacity: .88; mix-blend-mode: multiply; }
  .name { position: absolute; left: 64px; top: 46px; font-size: 22px; font-weight: 640; letter-spacing: -0.01em; }
  .role { position: absolute; left: 64px; top: 80px; font-size: 11px; font-weight: 560; letter-spacing: 0.12em; text-transform: uppercase; color: ${C.pencil}; line-height: 1.7; }
</style></head>
<body><div class="cover">
  <div class="name">Mercedes Casares</div>
  <div class="role">Staff Product Designer<br>Buenos Aires</div>

  <div class="piece">
  <div class="shot"><img src="../public/images/eden/room-reservation.png" alt=""></div>

  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="${d(pencil)}" stroke="${C.pencil}" stroke-width="1.1" opacity=".85" />
    <path d="${d(ink)}" stroke="${C.ink}" stroke-width="1.3" />
    <path d="${d(pen)}" stroke="${C.pen}" stroke-width="2.2" />
  </svg>

  <div class="tape" style="left:${SEAM - 70}px; top:18px; width:140px; height:30px; transform: rotate(-5deg);"></div>
  <div class="tape" style="left:848px; top:296px; width:88px; height:26px; transform: rotate(-38deg);"></div>
  </div>
  <div class="grain"></div>
</div></body></html>`;

writeFileSync(new URL("../brand/linkedin-cover.html", import.meta.url), html);
console.log("wrote brand/linkedin-cover.html");
