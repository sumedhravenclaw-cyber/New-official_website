/**
 * Emits ravenclaw-layout.svg — drag straight into Figma, which converts each
 * <g id="..."> into a named, editable layer.
 *
 * Token values mirror code.js (and therefore src/app/globals.css). Run:
 *   node figma-plugin/build-svg.js
 */

const fs = require("fs");
const path = require("path");

const T = {
  light: {
    page: "#FFFFFF", card: "#FFFFFF", ink: "#050505", muted: "#5A5A5A",
    golden: "#EA9D12", violet: "#631DFE", border: "#EBEBEB",
  },
  dark: {
    page: "#000000", card: "#000000", ink: "#F3F3F5", muted: "#A1A1A6",
    golden: "#F5B942", violet: "#9A7BFE", border: "#1F1F1F",
  },
};

const ACCENTS = ["#EA9D12", "#5B9EFE", "#A7069B", "#631DFE", "#5E9929", "#CC2829"];
const NAV = ["Home", "About", "Services", "Portfolio", "Contact", "More"];
const SERVICES = [
  "Social Media Marketing", "Web Development", "AI Solutions",
  "Branding & Design", "Content Production", "SEO & Growth",
];
const STEPS = ["Discover", "Strategise", "Design", "Build", "Launch", "Scale"];

const F = "Inter, Garet, sans-serif";

// Header block + two project rows + bottom padding.
const PORTFOLIO_H = 176 + 340 * 2 + 40;
let out = [];
const push = (s) => out.push(s);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function g(id, body) {
  return `<g id="${esc(id)}">${body}</g>`;
}

function rect(x, y, w, h, fill, opts) {
  const o = opts || {};
  let a = `x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"`;
  if (o.opacity !== undefined) a += ` fill-opacity="${o.opacity}"`;
  if (o.r) a += ` rx="${o.r}"`;
  if (o.stroke) a += ` stroke="${o.stroke}" stroke-width="1"`;
  return `<rect ${a}/>`;
}

function txt(x, y, s, opts) {
  const o = opts || {};
  let a = `x="${x}" y="${y}" font-family="${F}" font-size="${o.size || 16}"`;
  a += ` fill="${o.fill || "#050505"}"`;
  if (o.weight) a += ` font-weight="${o.weight}"`;
  if (o.anchor) a += ` text-anchor="${o.anchor}"`;
  if (o.spacing) a += ` letter-spacing="${o.spacing}"`;
  return `<text ${a}>${esc(s)}</text>`;
}

/* ------------------------------------------------------------ page blocks -- */

function navbar(t, w) {
  let b = rect(0, 0, w, 90, t.page);
  b += rect(0, 89, w, 1, t.border);
  b += rect(80, 20, 40, 40, t.golden, { opacity: 0.25, r: 8 });
  b += txt(80, 76, "DIGITAL RAVENCLAW", {
    size: 10, weight: 700, fill: t.violet, spacing: 1.6,
  });
  let x = w - 80;
  for (let i = NAV.length - 1; i >= 0; i--) {
    b += txt(x, 50, NAV[i], {
      size: 16, weight: i === 0 ? 700 : 500,
      fill: i === 0 ? t.golden : t.ink, anchor: "end",
    });
    x -= NAV[i].length * 9 + 32;
  }
  return g("Navbar / Desktop", b);
}

function hero(t, y) {
  let b = rect(0, y, 1440, 720, t.page);
  b += txt(720, y + 120, "WE BUILD BRANDS THAT MOVE", {
    size: 12, weight: 700, fill: t.violet, anchor: "middle", spacing: 2,
  });
  b += txt(720, y + 200, "Digital growth,", {
    size: 60, weight: 700, fill: t.ink, anchor: "middle",
  });
  b += txt(720, y + 268, "engineered end to end.", {
    size: 60, weight: 700, fill: t.ink, anchor: "middle",
  });
  b += txt(720, y + 316, "Social, web, AI and brand — one team, one throughline.", {
    size: 18, fill: t.muted, anchor: "middle",
  });
  b += rect(560, y + 356, 160, 52, t.golden, { r: 26 });
  b += txt(640, y + 388, "Book a call", {
    size: 15, weight: 700, fill: "#050505", anchor: "middle",
  });
  b += rect(740, y + 356, 160, 52, "none", { r: 26, stroke: t.ink });
  b += txt(820, y + 388, "See our work", {
    size: 15, weight: 700, fill: t.ink, anchor: "middle",
  });
  b += rect(270, y + 440, 900, 240, t.violet, { opacity: 0.08, r: 24 });
  b += txt(720, y + 566, "Hero art / phoenix", {
    size: 14, fill: t.muted, anchor: "middle",
  });
  return g("Section / Hero + About Flow", b);
}

function sectionHead(t, y, eyebrow, title) {
  let b = txt(720, y + 64, eyebrow.toUpperCase(), {
    size: 12, weight: 700, fill: t.violet, anchor: "middle", spacing: 1.8,
  });
  b += txt(720, y + 112, title, {
    size: 40, weight: 700, fill: t.ink, anchor: "middle",
  });
  return b;
}

function servicesSec(t, y) {
  let b = rect(0, y, 1440, 640, t.page);
  b += sectionHead(t, y, "Our Services", "Services That Drive Growth");
  for (let i = 0; i < 6; i++) {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 80 + col * 432, cy = y + 176 + row * 216;
    const a = ACCENTS[i];
    b += rect(x, cy, 384, 192, a, { opacity: 0.05, r: 16, stroke: a });
    b += `<circle cx="${x + 192}" cy="${cy + 48}" r="32" fill="${a}" fill-opacity="0.2"/>`;
    b += txt(x + 192, cy + 108, SERVICES[i], {
      size: 14, weight: 700, fill: t.ink, anchor: "middle",
    });
    b += txt(x + 192, cy + 134, "One-line summary of the offer.", {
      size: 12, fill: t.muted, anchor: "middle",
    });
    b += txt(x + 192, cy + 166, "View details →", {
      size: 11, weight: 700, fill: a, anchor: "middle",
    });
  }
  return g("Section / Services", b);
}

// Thumb (250) + category label + title + breathing room. Anything tighter and
// row 2 clips row 1's caption.
const PROJECT_PITCH = 340;

function portfolioSec(t, y) {
  let b = rect(0, y, 1440, PORTFOLIO_H, t.page);
  b += sectionHead(t, y, "Our Work", "Selected Projects");
  const names = ["AJ Design Co.", "Travilo", "Nimbus SaaS",
                 "GlowUp Skincare", "Northwind", "Atlas Retail"];
  for (let i = 0; i < 6; i++) {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 80 + col * 432, cy = y + 176 + row * PROJECT_PITCH;
    const a = ACCENTS[i];
    b += rect(x, cy, 400, 250, a, { opacity: 0.18, r: 16 });
    b += txt(x + 200, cy + 130, "Thumbnail 16:10", {
      size: 12, fill: t.muted, anchor: "middle",
    });
    b += txt(x, cy + 278, "WEB DEVELOPMENT", {
      size: 10, weight: 700, fill: a, spacing: 1.4,
    });
    b += txt(x, cy + 304, names[i], { size: 20, weight: 700, fill: t.ink });
  }
  return g("Section / Portfolio", b);
}

function bandSec(t, y, id, eyebrow, title, h) {
  let b = rect(0, y, 1440, h, t.page);
  b += sectionHead(t, y, eyebrow, title);
  for (let i = 0; i < 3; i++) {
    const x = 80 + i * 432, cy = y + 176;
    b += rect(x, cy, 384, 200, t.card, { r: 16, stroke: t.border });
    b += `<circle cx="${x + 44}" cy="${cy + 44}" r="24" fill="${t.golden}" fill-opacity="0.2"/>`;
    b += txt(x + 24, cy + 108, "Point or quote heading", {
      size: 18, weight: 700, fill: t.ink,
    });
    b += txt(x + 24, cy + 140, "Supporting copy across two", { size: 14, fill: t.muted });
    b += txt(x + 24, cy + 162, "or three lines.", { size: 14, fill: t.muted });
  }
  return g("Section / " + id, b);
}

function clientsSec(t, y) {
  let b = rect(0, y, 1440, 260, t.page);
  b += txt(720, y + 72, "TRUSTED BY", {
    size: 12, weight: 700, fill: t.muted, anchor: "middle", spacing: 2,
  });
  for (let i = 0; i < 6; i++) {
    b += rect(180 + i * 180, y + 110, 120, 40, t.ink, { opacity: 0.08, r: 6 });
  }
  return g("Section / Clients", b);
}

function processSec(t, y) {
  let b = rect(0, y, 1440, 900, t.page);
  b += sectionHead(t, y, "How We Work", "Our Process");
  b += `<defs><linearGradient id="rail" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#EA9D12"/><stop offset="0.2" stop-color="#5B9EFE"/>
    <stop offset="0.4" stop-color="#A7069B"/><stop offset="0.6" stop-color="#631DFE"/>
    <stop offset="0.8" stop-color="#5E9929"/><stop offset="1" stop-color="#CC2829"/>
  </linearGradient></defs>`;
  b += rect(719, y + 180, 2, 660, "url(#rail)");
  for (let i = 0; i < 6; i++) {
    const cy = y + 190 + i * 108;
    const left = i % 2 === 0;
    const x = left ? 220 : 800;
    const a = ACCENTS[i];
    b += rect(x, cy, 420, 88, t.card, { r: 14, stroke: t.border });
    b += txt(x + 20, cy + 28, "0" + (i + 1), { size: 12, weight: 700, fill: a });
    b += txt(x + 20, cy + 54, STEPS[i], { size: 20, weight: 700, fill: t.ink });
    b += txt(x + 20, cy + 76, "What happens in this step.", { size: 13, fill: t.muted });
    b += `<circle cx="720" cy="${cy + 44}" r="7" fill="${a}"/>`;
  }
  return g("Section / Process", b);
}

function contactSec(t, y) {
  let b = rect(0, y, 1440, 620, t.page);
  b += txt(80, y + 100, "GET IN TOUCH", {
    size: 12, weight: 700, fill: t.violet, spacing: 2,
  });
  b += txt(80, y + 160, "Let's talk about", { size: 40, weight: 700, fill: t.ink });
  b += txt(80, y + 208, "your next move.", { size: 40, weight: 700, fill: t.ink });
  b += txt(80, y + 254, "digitalravenclaw@gmail.com", { size: 16, fill: t.muted });
  for (let i = 0; i < 5; i++) {
    b += `<circle cx="${100 + i * 52}" cy="${y + 300}" r="20" fill="${t.ink}" fill-opacity="0.06"/>`;
  }
  b += rect(800, y + 64, 560, 480, t.card, { r: 16, stroke: t.border });
  const fields = ["Name", "Email", "Company", "Message"];
  let fy = y + 104;
  for (const f of fields) {
    const h = f === "Message" ? 108 : 48;
    b += txt(832, fy, f, { size: 13, weight: 500, fill: t.ink });
    b += rect(832, fy + 12, 496, h, t.ink, { opacity: 0.04, r: 10, stroke: t.border });
    fy += h + 40;
  }
  b += rect(832, y + 470, 180, 48, t.golden, { r: 24 });
  b += txt(922, y + 500, "Send message", {
    size: 15, weight: 700, fill: "#050505", anchor: "middle",
  });
  return g("Section / Contact", b);
}

function ctaSec(t, y) {
  let b = rect(0, y, 1440, 320, t.page);
  b += txt(720, y + 140, "Ready when you are.", {
    size: 40, weight: 700, fill: t.ink, anchor: "middle",
  });
  b += rect(640, y + 180, 160, 52, t.golden, { r: 26 });
  b += txt(720, y + 212, "Book a call", {
    size: 15, weight: 700, fill: "#050505", anchor: "middle",
  });
  return g("Section / Let's Talk", b);
}

function footerSec(t, y) {
  let b = rect(0, y, 1440, 380, t.page);
  b += rect(0, y, 1440, 1, t.border);
  b += rect(80, y + 64, 40, 40, t.golden, { opacity: 0.25, r: 8 });
  b += txt(80, y + 130, "Digital growth, engineered", { size: 14, fill: t.muted });
  b += txt(80, y + 152, "end to end.", { size: 14, fill: t.muted });
  const cols = [
    ["Company", ["About", "Careers", "Blog", "Case Studies"]],
    ["Services", ["Social Media", "Web Development", "AI Solutions", "Branding"]],
    ["Legal", ["Privacy", "Terms", "Refund"]],
  ];
  cols.forEach((c, i) => {
    const x = 700 + i * 220;
    b += txt(x, y + 76, c[0], { size: 13, weight: 700, fill: t.ink });
    c[1].forEach((item, j) => {
      b += txt(x, y + 106 + j * 26, item, { size: 14, fill: t.muted });
    });
  });
  b += rect(80, y + 280, 1280, 1, t.border);
  b += txt(80, y + 316, "© 2026 Digital RavenClaw. All rights reserved.", {
    size: 13, fill: t.muted,
  });
  return g("Section / Footer", b);
}

/* ------------------------------------------------------------------ pages -- */

// Section heights must sum to the frame background, or content spills onto the
// canvas. Derive it instead of hardcoding.
const DESKTOP_H =
  90 + 720 + 520 + 640 + PORTFOLIO_H + 480 + 260 + 900 + 620 + 320 + 380;

function homeDesktop(t, label, ox) {
  let y = 90;
  let b = rect(0, 0, 1440, DESKTOP_H, t.page);
  b += navbar(t, 1440);
  b += hero(t, y); y += 720;
  b += bandSec(t, y, "Why Choose Us", "Why Us", "Why Choose RavenClaw", 520); y += 520;
  b += servicesSec(t, y); y += 640;
  b += portfolioSec(t, y); y += PORTFOLIO_H;
  b += bandSec(t, y, "Testimonials", "Client Voices", "What Clients Say", 480); y += 480;
  b += clientsSec(t, y); y += 260;
  b += processSec(t, y); y += 900;
  b += contactSec(t, y); y += 620;
  b += ctaSec(t, y); y += 320;
  b += footerSec(t, y);
  return `<g id="${esc(label)}" transform="translate(${ox},120)">${b}</g>`;
}

// [label, card count]. Height is derived from the card count rather than given
// as a literal — hand-tuned heights were shorter than their contents, so cards
// overlapped the next section's heading.
const MOBILE_SECS = [
  ["Hero", 2], ["Why Choose Us", 1], ["Services", 2], ["Portfolio", 2],
  ["Testimonials", 1], ["Clients", 1], ["Process", 2], ["Contact", 1],
  ["Let's Talk", 1], ["Footer", 1],
];

// Cards start at y+100, are 132 tall on a 150 pitch, plus 40 of bottom padding.
const mobileSecH = (cards) => 100 + (cards - 1) * 150 + 132 + 40;
const MOBILE_H =
  72 + MOBILE_SECS.reduce((a, s) => a + mobileSecH(s[1]), 0);

function homeMobile(t, label, ox) {
  const W = 375;
  let b = rect(0, 0, W, MOBILE_H, t.page);
  b += rect(0, 0, W, 72, t.page) + rect(0, 71, W, 1, t.border);
  b += rect(20, 20, 32, 32, t.golden, { opacity: 0.25, r: 8 });
  b += rect(W - 84, 20, 32, 32, t.ink, { opacity: 0.06, r: 999 });
  b += rect(W - 44, 20, 32, 32, t.ink, { opacity: 0.06, r: 8 });
  let y = 72;
  const secs = MOBILE_SECS;
  for (const s of secs) {
    b += txt(W / 2, y + 40, s[0].toUpperCase(), {
      size: 11, weight: 700, fill: t.violet, anchor: "middle", spacing: 1.6,
    });
    b += txt(W / 2, y + 78, s[0], {
      size: 26, weight: 700, fill: t.ink, anchor: "middle",
    });
    const cards = s[1];
    for (let i = 0; i < cards; i++) {
      b += rect(20, y + 100 + i * 150, 335, 132, t.card, { r: 16, stroke: t.border });
    }
    y += mobileSecH(cards);
    b += rect(0, y - 1, W, 1, t.border);
  }
  return `<g id="${esc(label)}" transform="translate(${ox},120)">${b}</g>`;
}

function foundations(ox) {
  const t = T.light;
  let b = rect(0, 0, 1200, 1100, t.page, { r: 0 });
  b += txt(64, 80, "Foundations", { size: 40, weight: 700, fill: t.ink });

  b += txt(64, 150, "Colour — semantic (light / dark)", {
    size: 16, weight: 700, fill: t.ink,
  });
  const sem = [
    ["surface/page", "#FFFFFF", "#000000"], ["surface/card", "#FFFFFF", "#000000"],
    ["text/ink", "#050505", "#F3F3F5"], ["text/muted", "#5A5A5A", "#A1A1A6"],
    ["brand/golden", "#EA9D12", "#F5B942"], ["brand/violet", "#631DFE", "#9A7BFE"],
    ["border/subtle", "#EBEBEB", "#1F1F1F"],
  ];
  sem.forEach((s, i) => {
    const x = 64 + i * 160;
    b += rect(x, 172, 72, 56, s[1], { r: 10, stroke: t.border });
    b += rect(x + 76, 172, 56, 56, s[2], { r: 10, stroke: t.border });
    b += txt(x, 248, s[0], { size: 11, weight: 500, fill: t.ink });
    b += txt(x, 266, s[1] + " / " + s[2], { size: 9, fill: t.muted });
  });

  b += txt(64, 330, "Colour — accent ramp", { size: 16, weight: 700, fill: t.ink });
  const names = ["golden", "blue", "magenta", "violet", "green", "red"];
  ACCENTS.forEach((a, i) => {
    const x = 64 + i * 160;
    b += rect(x, 352, 132, 56, a, { r: 10 });
    b += txt(x, 428, "accent/" + names[i], { size: 11, weight: 500, fill: t.ink });
    b += txt(x, 446, a, { size: 9, fill: t.muted });
  });

  b += txt(64, 510, "Type scale", { size: 16, weight: 700, fill: t.ink });
  const scale = [
    ["Display / H1", 48, 700], ["H2 / Section", 34, 700], ["H3 / Card", 22, 700],
    ["Body / Large", 18, 400], ["Body / Base", 16, 400], ["Body / Small", 14, 400],
    ["Caption", 12, 400],
  ];
  let ty = 550;
  scale.forEach((s) => {
    b += txt(64, ty, s[0], { size: 11, weight: 500, fill: t.muted });
    b += txt(200, ty, "The quick brown fox", {
      size: s[1], weight: s[2], fill: t.ink,
    });
    b += txt(900, ty, s[1] + "px · " + (s[2] === 700 ? "Bold" : "Regular"), {
      size: 11, fill: t.muted,
    });
    ty += s[1] + 26;
  });

  b += txt(64, ty + 40, "Spacing (4pt) & radius", { size: 16, weight: 700, fill: t.ink });
  [4, 8, 12, 16, 24, 32, 48, 64, 80, 96].forEach((s, i) => {
    b += rect(64 + i * 56, ty + 150 - s, 32, s, t.violet, { r: 4 });
    b += txt(64 + i * 56, ty + 168, String(s), { size: 10, fill: t.muted });
  });
  [["sm", 6], ["md", 8], ["lg", 10], ["xl", 14], ["2xl", 16], ["full", 999]]
    .forEach((r, i) => {
      b += rect(700 + i * 80, ty + 90, 60, 60, t.ink, {
        opacity: 0.06, r: r[1], stroke: t.border,
      });
      b += txt(700 + i * 80, ty + 168, r[0], { size: 10, fill: t.muted });
    });

  return `<g id="01 · Foundations" transform="translate(${ox},120)">${b}</g>`;
}

/* ------------------------------------------------------------------ build -- */

// Canvas must clear the tallest board (desktop, offset 120 from the top).
const W = 6200, H = DESKTOP_H + 240;
push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`);
push(rect(0, 0, W, H, "#F4F4F5"));

const boards = [
  ["Home · 1440 · Light", 0],
  ["Home · 1440 · Dark", 1600],
  ["Home · 375 · Light", 3200],
  ["Home · 375 · Dark", 3700],
  ["01 · Foundations", 4300],
];
boards.forEach((bd) => {
  push(txt(bd[1], 100, bd[0], { size: 20, weight: 700, fill: "#050505" }));
});

push(homeDesktop(T.light, "Home · 1440 · Light", 0));
push(homeDesktop(T.dark, "Home · 1440 · Dark", 1600));
push(homeMobile(T.light, "Home · 375 · Light", 3200));
push(homeMobile(T.dark, "Home · 375 · Dark", 3700));
push(foundations(4300));

push("</svg>");

const dest = path.join(__dirname, "ravenclaw-layout.svg");
fs.writeFileSync(dest, out.join("\n"), "utf8");
console.log("Wrote " + dest + " (" + (fs.statSync(dest).size / 1024).toFixed(1) + " KB)");

// Board geometry, so build-gallery.js can crop without re-deriving these — a
// second copy of the numbers is exactly how the crops drift out of alignment.
module.exports = {
  DESKTOP_H,
  MOBILE_H,
  BOARD_Y: 120,
  BOARDS: {
    desktopLight: { x: 0, w: 1440 },
    desktopDark: { x: 1600, w: 1440 },
    mobilePair: { x: 3200, w: 875 },
    foundations: { x: 4300, w: 1200, h: 1100 },
  },
};
