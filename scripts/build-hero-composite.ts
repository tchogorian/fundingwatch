/**
 * Builds a single hero composite image: gradient + Robin Hood figure.
 * Run: npm run build:hero
 * Output: public/images/hero-composite.png
 */

import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

const W = 1920;
const H = 1080;
const FIGURE_HEIGHT_PCT = 0.92; // figure height = 92% of canvas
const PUBLIC_DIR = path.join(__dirname, "..", "public", "images");
const FIGURE_PATH = path.join(PUBLIC_DIR, "robin-hood-figure.png");
const OUTPUT_PATH = path.join(PUBLIC_DIR, "hero-composite.png");

// Hero gradient: 135deg, same as globals.css
const gradientSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a3d8f"/>
      <stop offset="30%" stop-color="#0b5dc2"/>
      <stop offset="55%" stop-color="#0e7dc0"/>
      <stop offset="78%" stop-color="#0a9cb8"/>
      <stop offset="100%" stop-color="#08b5c4"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>
`;

async function main() {
  if (!fs.existsSync(FIGURE_PATH)) {
    console.error("Figure not found:", FIGURE_PATH);
    console.error("Place robin-hood-figure.png in public/images/");
    process.exit(1);
  }

  // 1. Gradient as PNG
  const gradientBuffer = await sharp(Buffer.from(gradientSvg))
    .png()
    .resize(W, H)
    .toBuffer();

  // 2. Load figure, resize to 92% height, right-aligned
  const figureHeight = Math.round(H * FIGURE_HEIGHT_PCT);
  const figureMeta = await sharp(FIGURE_PATH).metadata();
  const figureAspect = (figureMeta.width ?? 1) / (figureMeta.height ?? 1);
  const figureWidth = Math.round(figureHeight * figureAspect);

  const figureResized = await sharp(FIGURE_PATH)
    .resize(figureWidth, figureHeight, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // 3. Composite: figure on top of gradient, right-aligned, bottom-aligned.
  // Use "lighten" so black in figure becomes transparent (shows gradient).
  const left = W - figureWidth;
  const top = H - figureHeight;

  const composite = await sharp(gradientBuffer)
    .composite([
      {
        input: figureResized,
        left: Math.max(0, left),
        top: Math.max(0, top),
        blend: "lighten",
      },
    ])
    .png()
    .toBuffer();

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, composite);
  console.log("Wrote", OUTPUT_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
