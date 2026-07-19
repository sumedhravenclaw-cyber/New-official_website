/**
 * RavenClaw — Build Layout File
 *
 * Constructs the Figma layout for the digitalravenclaw site: variables (Light/Dark),
 * foundations, components, and page frames at 1440 / 375.
 *
 * Values mirror src/app/globals.css and the section components. When the code
 * changes, change them here too — this file is the bridge, not a second source.
 */

/* ----------------------------------------------------------------- tokens -- */

const TOKENS = {
  // name: [lightHex, darkHex]
  "surface/page": ["#FFFFFF", "#000000"],
  "surface/card": ["#FFFFFF", "#000000"],
  "surface/alt": ["#FFFFFF", "#000000"],
  "text/ink": ["#050505", "#F3F3F5"],
  "text/muted": ["#5A5A5A", "#A1A1A6"],
  "brand/golden": ["#EA9D12", "#F5B942"],
  "brand/violet": ["#631DFE", "#9A7BFE"],
  "border/subtle": ["#EBEBEB", "#1F1F1F"],
};

// Accent ramp used by the process rail, service cards and project cards.
const ACCENTS = {
  "accent/golden": "#EA9D12",
  "accent/blue": "#5B9EFE",
  "accent/magenta": "#A7069B",
  "accent/violet": "#631DFE",
  "accent/green": "#5E9929",
  "accent/red": "#CC2829",
};

const TYPE_SCALE = [
  ["Display / H1", 60, "Bold", 1.1],
  ["H2 / Section", 40, "Bold", 1.15],
  ["H3 / Card", 24, "Bold", 1.25],
  ["Body / Large", 18, "Regular", 1.6],
  ["Body / Base", 16, "Regular", 1.6],
  ["Body / Small", 14, "Regular", 1.55],
  ["Caption", 12, "Regular", 1.5],
  ["Eyebrow", 12, "Bold", 1.4],
];

const SPACE = [4, 8, 12, 16, 24, 32, 48, 64, 80, 96];
const RADII = [["sm", 6], ["md", 8], ["lg", 10], ["xl", 14], ["2xl", 16], ["full", 999]];

// Home page section stack — matches src/components/site/home-view.tsx order.
const HOME_SECTIONS = [
  ["Hero + About Flow", 720, "hero"],
  ["Why Choose Us", 520, "band"],
  ["Services", 640, "grid3"],
  ["Portfolio", 760, "grid3"],
  ["Testimonials", 480, "band"],
  ["Clients", 260, "logos"],
  ["Process", 900, "timeline"],
  ["Contact", 620, "split"],
  ["Let's Talk", 320, "cta"],
  ["Footer", 380, "footer"],
];

const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Contact", "More"];

const SERVICE_TITLES = [
  "Social Media Marketing",
  "Web Development",
  "AI Solutions",
  "Branding & Design",
  "Content Production",
  "SEO & Growth",
];

const ROUTES = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services/[slug]", "Service Detail"],
  ["/portfolio/[slug]", "Portfolio Detail"],
  ["/blog", "Blog"],
  ["/blog/[slug]", "Blog Post"],
  ["/case-studies", "Case Studies"],
  ["/case-studies/[slug]", "Case Study Detail"],
  ["/careers", "Careers"],
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
  ["/refund", "Refund"],
];

/* ---------------------------------------------------------------- helpers -- */

const FONT = "Inter";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

function solid(hex, opacity) {
  const paint = { type: "SOLID", color: hexToRgb(hex) };
  if (opacity !== undefined) paint.opacity = opacity;
  return [paint];
}

async function loadFonts() {
  for (const style of ["Regular", "Medium", "Bold"]) {
    await figma.loadFontAsync({ family: FONT, style });
  }
}

function text(content, opts) {
  const o = opts || {};
  const t = figma.createText();
  t.fontName = { family: FONT, style: o.weight || "Regular" };
  t.characters = content;
  t.fontSize = o.size || 16;
  t.fills = solid(o.color || "#050505", o.opacity);
  if (o.width) {
    t.resize(o.width, t.height);
    t.textAutoResize = "HEIGHT";
  }
  if (o.lineHeight) t.lineHeight = { unit: "PERCENT", value: o.lineHeight * 100 };
  if (o.spacing) t.letterSpacing = { unit: "PIXELS", value: o.spacing };
  return t;
}

/** Auto-layout frame. dir: "V" | "H" */
function stack(name, dir, opts) {
  const o = opts || {};
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = dir === "H" ? "HORIZONTAL" : "VERTICAL";
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "AUTO";
  f.itemSpacing = o.gap === undefined ? 16 : o.gap;
  const p = o.pad === undefined ? 0 : o.pad;
  f.paddingTop = o.padY === undefined ? p : o.padY;
  f.paddingBottom = o.padY === undefined ? p : o.padY;
  f.paddingLeft = o.padX === undefined ? p : o.padX;
  f.paddingRight = o.padX === undefined ? p : o.padX;
  f.fills = o.fill ? solid(o.fill, o.fillOpacity) : [];
  if (o.radius) f.cornerRadius = o.radius;
  if (o.stroke) {
    f.strokes = solid(o.stroke);
    f.strokeWeight = 1;
  }
  if (o.align) f.counterAxisAlignItems = o.align; // MIN | CENTER | MAX
  if (o.justify) f.primaryAxisAlignItems = o.justify;
  if (o.clip !== undefined) f.clipsContent = o.clip;
  return f;
}

/** Fixed-size frame (a viewport, a card slot, an image placeholder). */
function box(name, w, h, opts) {
  const o = opts || {};
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, h);
  f.fills = o.fill ? solid(o.fill, o.fillOpacity) : [];
  if (o.radius) f.cornerRadius = o.radius;
  if (o.stroke) {
    f.strokes = solid(o.stroke);
    f.strokeWeight = 1;
  }
  return f;
}

function fillWidth(node) {
  node.layoutAlign = "STRETCH";
  return node;
}

function newPage(name) {
  const p = figma.createPage();
  p.name = name;
  return p;
}

/* -------------------------------------------------------------- variables -- */

function buildVariables() {
  let collection;
  try {
    collection = figma.variables.createVariableCollection("RavenClaw");
  } catch (e) {
    figma.notify("Variables unavailable on this plan — skipping.");
    return null;
  }

  const lightMode = collection.modes[0].modeId;
  collection.renameMode(lightMode, "Light");
  const darkMode = collection.addMode("Dark");

  const made = {};
  for (const name of Object.keys(TOKENS)) {
    const pair = TOKENS[name];
    let v;
    try {
      v = figma.variables.createVariable(name, collection, "COLOR");
    } catch (e) {
      // Older API signature took the collection id.
      v = figma.variables.createVariable(name, collection.id, "COLOR");
    }
    v.setValueForMode(lightMode, hexToRgb(pair[0]));
    v.setValueForMode(darkMode, hexToRgb(pair[1]));
    made[name] = v;
  }

  // Accents are mode-independent — same hex in both.
  for (const name of Object.keys(ACCENTS)) {
    let v;
    try {
      v = figma.variables.createVariable(name, collection, "COLOR");
    } catch (e) {
      v = figma.variables.createVariable(name, collection.id, "COLOR");
    }
    v.setValueForMode(lightMode, hexToRgb(ACCENTS[name]));
    v.setValueForMode(darkMode, hexToRgb(ACCENTS[name]));
    made[name] = v;
  }

  return { collection: collection, vars: made, light: lightMode, dark: darkMode };
}

/* ------------------------------------------------------------- components -- */

function sectionHeader(eyebrow, title, theme) {
  const wrap = stack("Section Header", "V", { gap: 12, align: "CENTER" });
  wrap.appendChild(text(eyebrow.toUpperCase(), {
    size: 12, weight: "Bold", color: theme.violet, spacing: 1.5,
  }));
  wrap.appendChild(text(title, { size: 40, weight: "Bold", color: theme.ink }));
  return wrap;
}

function makeNavbar(theme, componentSet) {
  const nav = stack("Navbar", "H", {
    padX: 24, padY: 16, gap: 32, align: "CENTER", justify: "SPACE_BETWEEN",
    fill: theme.page,
  });
  nav.name = "Navbar / Desktop";
  nav.resize(1440, nav.height);
  nav.primaryAxisSizingMode = "FIXED";
  nav.layoutSizingHorizontal = "FIXED";

  const logo = stack("Logo", "V", { gap: 2, align: "MIN" });
  logo.appendChild(box("bird.png", 40, 40, { fill: theme.golden, radius: 8, fillOpacity: 0.25 }));
  logo.appendChild(text("DIGITAL RAVENCLAW", {
    size: 10, weight: "Bold", color: theme.violet, spacing: 1.6,
  }));
  nav.appendChild(logo);

  const links = stack("Links", "H", { gap: 32, align: "CENTER" });
  for (const label of NAV_LINKS) {
    links.appendChild(text(label, {
      size: 16, weight: label === "Home" ? "Bold" : "Medium",
      color: label === "Home" ? theme.golden : theme.ink,
    }));
  }
  links.appendChild(box("Theme Toggle", 32, 32, {
    fill: theme.ink, fillOpacity: 0.06, radius: 999,
  }));
  nav.appendChild(links);

  return nav;
}

function makeServiceCard(title, accentHex, theme) {
  const card = stack("Service Card", "V", {
    gap: 12, pad: 24, align: "CENTER", radius: 16,
    fill: accentHex, fillOpacity: 0.05, stroke: accentHex,
  });
  card.resize(384, card.height);
  card.layoutSizingHorizontal = "FIXED";

  const icon = box("Icon", 64, 64, { fill: accentHex, fillOpacity: 0.2, radius: 999 });
  card.appendChild(icon);
  card.appendChild(text(title, { size: 14, weight: "Bold", color: theme.ink }));

  const desc = text(
    "One-line summary of the offer, kept to two lines so the grid stays even.",
    { size: 12, color: theme.muted, width: 300, lineHeight: 1.6 }
  );
  desc.textAlignHorizontal = "CENTER";
  card.appendChild(desc);
  card.appendChild(text("View details →", { size: 11, weight: "Bold", color: accentHex }));
  return card;
}

function makeProjectCard(theme, accentHex) {
  const card = stack("Project Card", "V", {
    gap: 0, radius: 16, fill: theme.card, stroke: theme.border, clip: true,
  });
  card.resize(400, card.height);
  card.layoutSizingHorizontal = "FIXED";

  const img = box("Thumbnail 16:10", 400, 250, { fill: accentHex, fillOpacity: 0.18 });
  img.layoutAlign = "STRETCH";
  card.appendChild(img);

  const body = stack("Body", "V", { gap: 8, pad: 20, align: "MIN" });
  body.layoutAlign = "STRETCH";
  body.counterAxisSizingMode = "FIXED";
  body.appendChild(text("WEB DEVELOPMENT", {
    size: 10, weight: "Bold", color: accentHex, spacing: 1.4,
  }));
  body.appendChild(text("AJ Design Co.", { size: 20, weight: "Bold", color: theme.ink }));
  body.appendChild(text("Interior design studio · 2026", { size: 13, color: theme.muted }));
  card.appendChild(body);
  return card;
}

function makeButton(label, variant, theme) {
  const isPrimary = variant === "primary";
  const b = stack("Button / " + variant, "H", {
    padX: 28, padY: 14, gap: 8, radius: 999, align: "CENTER",
    fill: isPrimary ? theme.golden : undefined,
    stroke: isPrimary ? undefined : theme.ink,
  });
  b.appendChild(text(label, {
    size: 15, weight: "Bold", color: isPrimary ? "#050505" : theme.ink,
  }));
  return b;
}

/* ------------------------------------------------------------ page blocks -- */

function buildSectionBlock(name, height, kind, theme) {
  const section = box(name, 1440, height, { fill: theme.page });
  section.name = "Section / " + name;

  // Content column: max-w-7xl (1280) centred, px-6 inner padding.
  const col = stack("Container 1280", "V", { gap: 32, padX: 24, padY: 64, align: "CENTER" });
  col.resize(1280, height);
  col.layoutSizingHorizontal = "FIXED";
  col.primaryAxisSizingMode = "FIXED";
  col.x = 80;
  col.y = 0;

  if (kind === "hero") {
    col.primaryAxisAlignItems = "CENTER";
    col.itemSpacing = 24;
    col.appendChild(text("WE BUILD BRANDS THAT MOVE", {
      size: 12, weight: "Bold", color: theme.violet, spacing: 2,
    }));
    const h1 = text("Digital growth,\nengineered end to end.", {
      size: 60, weight: "Bold", color: theme.ink, lineHeight: 1.1,
    });
    h1.textAlignHorizontal = "CENTER";
    col.appendChild(h1);
    const sub = text(
      "Social, web, AI and brand — one team, one throughline, measurable outcomes.",
      { size: 18, color: theme.muted, width: 620, lineHeight: 1.6 }
    );
    sub.textAlignHorizontal = "CENTER";
    col.appendChild(sub);
    const ctas = stack("CTA Row", "H", { gap: 16 });
    ctas.appendChild(makeButton("Book a call", "primary", theme));
    ctas.appendChild(makeButton("See our work", "secondary", theme));
    col.appendChild(ctas);
    col.appendChild(box("Hero Art / Phoenix", 900, 260, {
      fill: theme.violet, fillOpacity: 0.08, radius: 24,
    }));
  } else if (kind === "grid3") {
    col.appendChild(sectionHeader(
      name === "Services" ? "Our Services" : "Our Work",
      name === "Services" ? "Services That Drive Growth" : "Selected Projects",
      theme
    ));
    const grid = stack("Grid 3-up", "H", { gap: 24 });
    const accentList = Object.keys(ACCENTS).map(function (k) { return ACCENTS[k]; });
    for (let i = 0; i < 3; i++) {
      grid.appendChild(
        name === "Services"
          ? makeServiceCard(SERVICE_TITLES[i], accentList[i], theme)
          : makeProjectCard(theme, accentList[i])
      );
    }
    col.appendChild(grid);
    if (name === "Portfolio") {
      const grid2 = stack("Grid 3-up (row 2)", "H", { gap: 24 });
      for (let i = 3; i < 6; i++) grid2.appendChild(makeProjectCard(theme, accentList[i]));
      col.appendChild(grid2);
    }
  } else if (kind === "band") {
    col.appendChild(sectionHeader(
      name === "Testimonials" ? "Client Voices" : "Why Us",
      name === "Testimonials" ? "What Clients Say" : "Why Choose RavenClaw",
      theme
    ));
    const row = stack("Row", "H", { gap: 24 });
    for (let i = 0; i < 3; i++) {
      const c = stack("Card", "V", {
        gap: 12, pad: 24, radius: 16, fill: theme.card, stroke: theme.border, align: "MIN",
      });
      c.resize(384, c.height);
      c.layoutSizingHorizontal = "FIXED";
      c.appendChild(box("Avatar / Icon", 48, 48, {
        fill: theme.golden, fillOpacity: 0.2, radius: 999,
      }));
      c.appendChild(text("Point or quote heading", { size: 18, weight: "Bold", color: theme.ink }));
      c.appendChild(text(
        "Supporting copy that runs two to three lines and carries the actual substance.",
        { size: 14, color: theme.muted, width: 336, lineHeight: 1.6 }
      ));
      row.appendChild(c);
    }
    col.appendChild(row);
  } else if (kind === "logos") {
    col.itemSpacing = 24;
    col.appendChild(text("TRUSTED BY", {
      size: 12, weight: "Bold", color: theme.muted, spacing: 2,
    }));
    const row = stack("Logo Row", "H", { gap: 48, align: "CENTER" });
    for (let i = 0; i < 6; i++) {
      row.appendChild(box("Client Logo " + (i + 1), 120, 40, {
        fill: theme.ink, fillOpacity: 0.08, radius: 6,
      }));
    }
    col.appendChild(row);
  } else if (kind === "timeline") {
    col.appendChild(sectionHeader("How We Work", "Our Process", theme));
    const rail = stack("Timeline", "V", { gap: 24, align: "CENTER" });
    const accentList = Object.keys(ACCENTS).map(function (k) { return ACCENTS[k]; });
    const steps = ["Discover", "Strategise", "Design", "Build", "Launch", "Scale"];
    for (let i = 0; i < 6; i++) {
      const rowDir = i % 2 === 0 ? "left" : "right";
      const r = stack("Step " + (i + 1) + " · " + rowDir, "H", { gap: 24, align: "CENTER" });
      r.resize(1000, r.height);
      r.layoutSizingHorizontal = "FIXED";
      r.primaryAxisAlignItems = i % 2 === 0 ? "MIN" : "MAX";
      const c = stack("Step Card", "V", {
        gap: 6, pad: 20, radius: 14, fill: theme.card, stroke: theme.border, align: "MIN",
      });
      c.resize(420, c.height);
      c.layoutSizingHorizontal = "FIXED";
      c.appendChild(text("0" + (i + 1), { size: 12, weight: "Bold", color: accentList[i] }));
      c.appendChild(text(steps[i], { size: 20, weight: "Bold", color: theme.ink }));
      c.appendChild(text("What happens in this step, in one sentence.", {
        size: 13, color: theme.muted, width: 380, lineHeight: 1.6,
      }));
      r.appendChild(c);
      rail.appendChild(r);
    }
    col.appendChild(rail);
  } else if (kind === "split") {
    col.primaryAxisAlignItems = "CENTER";
    const split = stack("Split", "H", { gap: 48, align: "MIN" });
    const left = stack("Copy", "V", { gap: 16, align: "MIN" });
    left.resize(520, left.height);
    left.layoutSizingHorizontal = "FIXED";
    left.appendChild(text("GET IN TOUCH", {
      size: 12, weight: "Bold", color: theme.violet, spacing: 2,
    }));
    left.appendChild(text("Let's talk about\nyour next move.", {
      size: 40, weight: "Bold", color: theme.ink, lineHeight: 1.15,
    }));
    left.appendChild(text("digitalravenclaw@gmail.com", { size: 16, color: theme.muted }));
    const socials = stack("Socials", "H", { gap: 12 });
    for (let i = 0; i < 5; i++) {
      socials.appendChild(box("Social", 40, 40, {
        fill: theme.ink, fillOpacity: 0.06, radius: 999,
      }));
    }
    left.appendChild(socials);
    split.appendChild(left);

    const form = stack("Form", "V", {
      gap: 16, pad: 32, radius: 16, fill: theme.card, stroke: theme.border, align: "MIN",
    });
    form.resize(560, form.height);
    form.layoutSizingHorizontal = "FIXED";
    for (const label of ["Name", "Email", "Company", "Message"]) {
      const field = stack("Field / " + label, "V", { gap: 6, align: "MIN" });
      field.layoutAlign = "STRETCH";
      field.counterAxisSizingMode = "FIXED";
      field.appendChild(text(label, { size: 13, weight: "Medium", color: theme.ink }));
      const input = box("Input", 496, label === "Message" ? 120 : 48, {
        fill: theme.ink, fillOpacity: 0.04, radius: 10, stroke: theme.border,
      });
      input.layoutAlign = "STRETCH";
      field.appendChild(input);
      form.appendChild(field);
    }
    form.appendChild(makeButton("Send message", "primary", theme));
    split.appendChild(form);
    col.appendChild(split);
  } else if (kind === "cta") {
    col.primaryAxisAlignItems = "CENTER";
    const h = text("Ready when you are.", { size: 40, weight: "Bold", color: theme.ink });
    h.textAlignHorizontal = "CENTER";
    col.appendChild(h);
    col.appendChild(makeButton("Book a call", "primary", theme));
  } else if (kind === "footer") {
    col.counterAxisAlignItems = "MIN";
    const top = stack("Footer Top", "H", { gap: 64, align: "MIN" });
    top.resize(1232, top.height);
    top.layoutSizingHorizontal = "FIXED";
    top.primaryAxisAlignItems = "SPACE_BETWEEN";

    const brand = stack("Brand", "V", { gap: 12, align: "MIN" });
    brand.appendChild(box("bird.png", 40, 40, {
      fill: theme.golden, fillOpacity: 0.25, radius: 8,
    }));
    brand.appendChild(text("Digital growth, engineered end to end.", {
      size: 14, color: theme.muted, width: 280, lineHeight: 1.6,
    }));
    top.appendChild(brand);

    const cols = [
      ["Company", ["About", "Careers", "Blog", "Case Studies"]],
      ["Services", ["Social Media", "Web Development", "AI Solutions", "Branding"]],
      ["Legal", ["Privacy", "Terms", "Refund"]],
    ];
    for (const pair of cols) {
      const c = stack("Col / " + pair[0], "V", { gap: 10, align: "MIN" });
      c.appendChild(text(pair[0], { size: 13, weight: "Bold", color: theme.ink }));
      for (const item of pair[1]) {
        c.appendChild(text(item, { size: 14, color: theme.muted }));
      }
      top.appendChild(c);
    }
    col.appendChild(top);

    const rule = box("Divider", 1232, 1, { fill: theme.border });
    col.appendChild(rule);
    col.appendChild(text("© 2026 Digital RavenClaw. All rights reserved.", {
      size: 13, color: theme.muted,
    }));
  }

  section.appendChild(col);
  return section;
}

function buildHomeFrame(name, theme, width) {
  const isMobile = width === 375;
  const frame = stack(name, "V", { gap: 0, fill: theme.page });
  frame.resize(width, 100);
  frame.layoutSizingHorizontal = "FIXED";
  frame.clipsContent = true;

  if (!isMobile) {
    const nav = makeNavbar(theme);
    frame.appendChild(nav);
    nav.layoutAlign = "STRETCH";
  } else {
    const nav = stack("Navbar / Mobile", "H", {
      padX: 24, padY: 16, align: "CENTER", justify: "SPACE_BETWEEN", fill: theme.page,
    });
    nav.layoutAlign = "STRETCH";
    nav.counterAxisSizingMode = "FIXED";
    const logo = stack("Logo", "V", { gap: 2, align: "MIN" });
    logo.appendChild(box("bird.png", 32, 32, {
      fill: theme.golden, fillOpacity: 0.25, radius: 8,
    }));
    nav.appendChild(logo);
    const right = stack("Actions", "H", { gap: 8, align: "CENTER" });
    right.appendChild(box("Theme Toggle", 32, 32, {
      fill: theme.ink, fillOpacity: 0.06, radius: 999,
    }));
    right.appendChild(box("Menu", 32, 32, { fill: theme.ink, fillOpacity: 0.06, radius: 8 }));
    nav.appendChild(right);
    frame.appendChild(nav);
  }

  for (const s of HOME_SECTIONS) {
    if (isMobile) {
      // Mobile: single-column stand-in with the same section rhythm.
      const sec = stack("Section / " + s[0], "V", {
        gap: 16, padX: 20, padY: 48, align: "CENTER", fill: theme.page,
      });
      sec.layoutAlign = "STRETCH";
      sec.counterAxisSizingMode = "FIXED";
      sec.appendChild(text(s[0].toUpperCase(), {
        size: 11, weight: "Bold", color: theme.violet, spacing: 1.6,
      }));
      const h = text(s[0], { size: 28, weight: "Bold", color: theme.ink });
      h.textAlignHorizontal = "CENTER";
      sec.appendChild(h);
      const stackCount = s[2] === "grid3" ? 2 : 1;
      for (let i = 0; i < stackCount; i++) {
        const c = box("Card (stacked)", 335, 200, {
          fill: theme.card, stroke: theme.border, radius: 16,
        });
        sec.appendChild(c);
      }
      frame.appendChild(sec);
    } else {
      const sec = buildSectionBlock(s[0], s[1], s[2], theme);
      frame.appendChild(sec);
      sec.layoutAlign = "STRETCH";
    }
  }
  return frame;
}

/* ------------------------------------------------------------ foundations -- */

function buildFoundations(page, theme) {
  const root = stack("Foundations", "V", { gap: 64, pad: 80, fill: theme.page, align: "MIN" });
  root.name = "Foundations";

  // --- Colour ---
  const colorSec = stack("Colour", "V", { gap: 24, align: "MIN" });
  colorSec.appendChild(text("Colour tokens", { size: 32, weight: "Bold", color: theme.ink }));
  colorSec.appendChild(text(
    "Bound to the RavenClaw variable collection. Light and Dark are separate modes — switch the frame's mode to preview.",
    { size: 14, color: theme.muted, width: 640, lineHeight: 1.6 }
  ));

  const swatchRow = stack("Semantic", "H", { gap: 16 });
  for (const name of Object.keys(TOKENS)) {
    const s = stack("Swatch", "V", { gap: 8, align: "MIN" });
    s.appendChild(box("Chip", 120, 72, {
      fill: TOKENS[name][0], radius: 10, stroke: theme.border,
    }));
    s.appendChild(text(name, { size: 11, weight: "Medium", color: theme.ink }));
    s.appendChild(text(TOKENS[name][0] + " / " + TOKENS[name][1], {
      size: 10, color: theme.muted,
    }));
    swatchRow.appendChild(s);
  }
  colorSec.appendChild(swatchRow);

  const accentRow = stack("Accents", "H", { gap: 16 });
  for (const name of Object.keys(ACCENTS)) {
    const s = stack("Swatch", "V", { gap: 8, align: "MIN" });
    s.appendChild(box("Chip", 120, 72, { fill: ACCENTS[name], radius: 10 }));
    s.appendChild(text(name, { size: 11, weight: "Medium", color: theme.ink }));
    s.appendChild(text(ACCENTS[name], { size: 10, color: theme.muted }));
    accentRow.appendChild(s);
  }
  colorSec.appendChild(text("Accent ramp (process rail / card tints)", {
    size: 14, weight: "Bold", color: theme.ink,
  }));
  colorSec.appendChild(accentRow);
  root.appendChild(colorSec);

  // --- Type ---
  const typeSec = stack("Typography", "V", { gap: 20, align: "MIN" });
  typeSec.appendChild(text("Type scale", { size: 32, weight: "Bold", color: theme.ink }));
  typeSec.appendChild(text(
    "Production font is Garet (next/font/local). Inter stands in here — swap the text styles to Garet once it is uploaded to the team library.",
    { size: 14, color: theme.muted, width: 640, lineHeight: 1.6 }
  ));
  for (const row of TYPE_SCALE) {
    const r = stack("Row", "H", { gap: 32, align: "CENTER" });
    const label = text(row[0], { size: 12, weight: "Medium", color: theme.muted });
    label.resize(160, label.height);
    label.textAutoResize = "HEIGHT";
    r.appendChild(label);
    r.appendChild(text("The quick brown fox", {
      size: row[1], weight: row[2], color: theme.ink, lineHeight: row[3],
    }));
    r.appendChild(text(row[1] + "px · " + row[2] + " · " + row[3], {
      size: 11, color: theme.muted,
    }));
    typeSec.appendChild(r);
  }
  root.appendChild(typeSec);

  // --- Spacing & radii ---
  const spaceSec = stack("Spacing & Radius", "V", { gap: 20, align: "MIN" });
  spaceSec.appendChild(text("Spacing scale (4pt)", {
    size: 32, weight: "Bold", color: theme.ink,
  }));
  const spaceRow = stack("Steps", "H", { gap: 16, align: "MAX" });
  for (const s of SPACE) {
    const c = stack("Step", "V", { gap: 8, align: "CENTER" });
    c.appendChild(box("Bar", 32, s, { fill: theme.violet, radius: 4 }));
    c.appendChild(text(String(s), { size: 11, color: theme.muted }));
    spaceRow.appendChild(c);
  }
  spaceSec.appendChild(spaceRow);

  spaceSec.appendChild(text("Corner radius", { size: 20, weight: "Bold", color: theme.ink }));
  const radRow = stack("Radii", "H", { gap: 16 });
  for (const r of RADII) {
    const c = stack("Radius", "V", { gap: 8, align: "CENTER" });
    c.appendChild(box("Chip", 72, 72, {
      fill: theme.ink, fillOpacity: 0.06, radius: r[1], stroke: theme.border,
    }));
    c.appendChild(text(r[0] + " · " + r[1], { size: 11, color: theme.muted }));
    radRow.appendChild(c);
  }
  spaceSec.appendChild(radRow);
  root.appendChild(spaceSec);

  page.appendChild(root);
  return root;
}

/* -------------------------------------------------------------- component -- */

function buildComponents(page, theme) {
  const root = stack("Components", "V", { gap: 48, pad: 80, fill: theme.page, align: "MIN" });
  root.appendChild(text("Components", { size: 32, weight: "Bold", color: theme.ink }));
  root.appendChild(text(
    "Detached frames, not published components. Select a frame and press Ctrl/Cmd+Alt+K to promote it once you are happy with the structure.",
    { size: 14, color: theme.muted, width: 640, lineHeight: 1.6 }
  ));

  const navRow = stack("Navbar", "V", { gap: 12, align: "MIN" });
  navRow.appendChild(text("Navbar / Desktop", { size: 16, weight: "Bold", color: theme.ink }));
  navRow.appendChild(makeNavbar(theme));
  root.appendChild(navRow);

  const btnRow = stack("Buttons", "V", { gap: 12, align: "MIN" });
  btnRow.appendChild(text("Buttons", { size: 16, weight: "Bold", color: theme.ink }));
  const btns = stack("Row", "H", { gap: 16, align: "CENTER" });
  btns.appendChild(makeButton("Book a call", "primary", theme));
  btns.appendChild(makeButton("See our work", "secondary", theme));
  btnRow.appendChild(btns);
  root.appendChild(btnRow);

  const cardRow = stack("Cards", "V", { gap: 12, align: "MIN" });
  cardRow.appendChild(text("Cards", { size: 16, weight: "Bold", color: theme.ink }));
  const cards = stack("Row", "H", { gap: 24, align: "MIN" });
  cards.appendChild(makeServiceCard(SERVICE_TITLES[0], ACCENTS["accent/golden"], theme));
  cards.appendChild(makeProjectCard(theme, ACCENTS["accent/blue"]));
  cardRow.appendChild(cards);
  root.appendChild(cardRow);

  page.appendChild(root);
  return root;
}

/* ------------------------------------------------------------------ cover -- */

function buildCover(page, theme) {
  const cover = stack("Cover", "V", {
    gap: 24, pad: 96, fill: theme.page, align: "MIN", justify: "CENTER",
  });
  cover.resize(1600, 960);
  cover.layoutSizingHorizontal = "FIXED";
  cover.primaryAxisSizingMode = "FIXED";

  cover.appendChild(text("DIGITAL RAVENCLAW", {
    size: 14, weight: "Bold", color: theme.violet, spacing: 3,
  }));
  cover.appendChild(text("Website Layout", { size: 96, weight: "Bold", color: theme.ink }));
  cover.appendChild(text(
    "Generated from the Next.js source. Foundations, components and page frames at 1440 and 375.",
    { size: 20, color: theme.muted, width: 720, lineHeight: 1.6 }
  ));

  const routeList = stack("Routes", "V", { gap: 6, align: "MIN" });
  routeList.appendChild(text("Routes in the app", {
    size: 14, weight: "Bold", color: theme.ink,
  }));
  for (const r of ROUTES) {
    const row = stack("Route", "H", { gap: 16, align: "CENTER" });
    const p = text(r[0], { size: 13, weight: "Medium", color: theme.golden });
    p.resize(220, p.height);
    p.textAutoResize = "HEIGHT";
    row.appendChild(p);
    row.appendChild(text(r[1], { size: 13, color: theme.muted }));
    routeList.appendChild(row);
  }
  cover.appendChild(routeList);

  page.appendChild(cover);
  return cover;
}

/* ------------------------------------------------------------------- main -- */

async function main() {
  await loadFonts();

  const lightTheme = {
    page: TOKENS["surface/page"][0],
    card: TOKENS["surface/card"][0],
    ink: TOKENS["text/ink"][0],
    muted: TOKENS["text/muted"][0],
    golden: TOKENS["brand/golden"][0],
    violet: TOKENS["brand/violet"][0],
    border: TOKENS["border/subtle"][0],
  };
  const darkTheme = {
    page: TOKENS["surface/page"][1],
    card: TOKENS["surface/card"][1],
    ink: TOKENS["text/ink"][1],
    muted: TOKENS["text/muted"][1],
    golden: TOKENS["brand/golden"][1],
    violet: TOKENS["brand/violet"][1],
    border: TOKENS["border/subtle"][1],
  };

  buildVariables();

  // Cover
  const coverPage = newPage("00 · Cover");
  buildCover(coverPage, lightTheme);

  // Foundations
  const foundationsPage = newPage("01 · Foundations");
  buildFoundations(foundationsPage, lightTheme);

  // Components
  const componentsPage = newPage("02 · Components");
  buildComponents(componentsPage, lightTheme);

  // Desktop
  const desktopPage = newPage("03 · Desktop · 1440");
  const home = buildHomeFrame("Home · 1440 · Light", lightTheme, 1440);
  desktopPage.appendChild(home);
  home.x = 0;
  home.y = 0;

  const homeDark = buildHomeFrame("Home · 1440 · Dark", darkTheme, 1440);
  desktopPage.appendChild(homeDark);
  homeDark.x = 1600;
  homeDark.y = 0;

  // Inner-page placeholders so the route map has somewhere to land.
  let x = 3200;
  for (const r of ROUTES.slice(1)) {
    const f = stack(r[1] + " · 1440", "V", { gap: 0, fill: lightTheme.page });
    f.resize(1440, 100);
    f.layoutSizingHorizontal = "FIXED";
    const nav = makeNavbar(lightTheme);
    f.appendChild(nav);
    nav.layoutAlign = "STRETCH";
    const hero = buildSectionBlock(r[1], 420, "cta", lightTheme);
    f.appendChild(hero);
    hero.layoutAlign = "STRETCH";
    const body = buildSectionBlock("Content", 720, "band", lightTheme);
    f.appendChild(body);
    body.layoutAlign = "STRETCH";
    const foot = buildSectionBlock("Footer", 380, "footer", lightTheme);
    f.appendChild(foot);
    foot.layoutAlign = "STRETCH";
    desktopPage.appendChild(f);
    f.x = x;
    f.y = 0;
    x += 1600;
  }

  // Mobile
  const mobilePage = newPage("04 · Mobile · 375");
  const mHome = buildHomeFrame("Home · 375 · Light", lightTheme, 375);
  mobilePage.appendChild(mHome);
  mHome.x = 0;
  mHome.y = 0;
  const mHomeDark = buildHomeFrame("Home · 375 · Dark", darkTheme, 375);
  mobilePage.appendChild(mHomeDark);
  mHomeDark.x = 500;
  mHomeDark.y = 0;

  // Drop the default empty page Figma starts new files with.
  const blank = figma.root.children.filter(function (p) {
    return p.name === "Page 1" && p.children.length === 0;
  });
  for (const p of blank) p.remove();

  await figma.setCurrentPageAsync(coverPage);
  figma.viewport.scrollAndZoomIntoView(coverPage.children);
  figma.notify("RavenClaw layout built — 5 pages.");
  figma.closePlugin();
}

main().catch(function (err) {
  figma.notify("Build failed: " + err.message, { error: true });
  figma.closePlugin();
});
