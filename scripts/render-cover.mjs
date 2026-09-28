// Renders brand/linkedin-cover.html to PNG at LinkedIn size (1584×396) and @2x.
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }
const file = fileURLToPath(new URL("../brand/linkedin-cover.html", import.meta.url));
const browser = await chromium.launch();
for (const [scale, name] of [[1, "linkedin-cover.png"], [2, "linkedin-cover@2x.png"]]) {
  const page = await browser.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: scale });
  await page.goto("file://" + file);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.locator(".cover").screenshot({ path: fileURLToPath(new URL(`../brand/${name}`, import.meta.url)) });
  await page.close();
}
await browser.close();
console.log("rendered brand/linkedin-cover.png and @2x");
