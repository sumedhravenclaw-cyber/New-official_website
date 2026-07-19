/**
 * Exports each board of ravenclaw-layout.svg as its own portfolio image.
 *
 * These are the pieces shown in the UI/UX Design tab — the designs themselves,
 * viewed full size in the lightbox. Region coordinates track the transforms in
 * build-svg.js; if a board moves there, move it here too.
 *
 *   node figma-plugin/build-gallery.js
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "ravenclaw-layout.svg");
const OUT_DIR = path.join(__dirname, "..", "public", "images", "portfolio", "uiux");

// Requiring build-svg regenerates the SVG and hands back its board geometry, so
// the crops always match the file they are cropping.
const geo = require("./build-svg.js");
const { DESKTOP_H, MOBILE_H, BOARD_Y: Y, BOARDS: B } = geo;

const BOARDS = [
  {
    name: "home-desktop-light",
    crop: { x: B.desktopLight.x, y: Y, w: B.desktopLight.w, h: DESKTOP_H },
    outW: 1000,
  },
  {
    name: "home-desktop-dark",
    crop: { x: B.desktopDark.x, y: Y, w: B.desktopDark.w, h: DESKTOP_H },
    outW: 1000,
  },
  {
    // Both phones in one frame — a single 375-wide board is ~1:8.8 and reads as
    // an unusable sliver in the grid.
    name: "home-mobile",
    crop: { x: B.mobilePair.x, y: Y, w: B.mobilePair.w, h: MOBILE_H },
    outW: 800,
  },
  {
    name: "foundations",
    crop: { x: B.foundations.x, y: Y, w: B.foundations.w, h: B.foundations.h },
    outW: 1200,
  },
];

// librsvg has neither Inter nor Garet here and falls back to a serif that reads
// nothing like the brand. Rasterisation only — the source SVG keeps its stack.
const RASTER_FONTS = "Segoe UI, Arial, DejaVu Sans, sans-serif";
const raw = fs.readFileSync(SRC, "utf8");

fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const manifest = [];
  for (const b of BOARDS) {
    const outH = Math.round((b.outW * b.crop.h) / b.crop.w);
    const svg = raw
      .replace(/width="\d+"/, `width="${b.outW}"`)
      .replace(/height="\d+"/, `height="${outH}"`)
      .replace(
        /viewBox="[^"]+"/,
        `viewBox="${b.crop.x} ${b.crop.y} ${b.crop.w} ${b.crop.h}"`
      )
      .replace(/font-family="[^"]*"/g, `font-family="${RASTER_FONTS}"`);

    const out = path.join(OUT_DIR, `${b.name}.webp`);
    const info = await sharp(Buffer.from(svg), { density: 144 })
      .resize(b.outW, outH, { fit: "cover" })
      .webp({ quality: 86 })
      .toFile(out);

    manifest.push({ name: b.name, w: info.width, h: info.height });
    console.log(
      `${b.name}.webp  ${info.width}x${info.height}  ` +
      `${(info.size / 1024).toFixed(1)} KB  (1:${(info.height / info.width).toFixed(2)})`
    );
  }
  console.log("\nw/h for site-data:");
  for (const m of manifest) console.log(`  ${m.name}: w: ${m.w}, h: ${m.h},`);
})().catch((err) => {
  console.error("Export failed:", err.message);
  process.exit(1);
});
