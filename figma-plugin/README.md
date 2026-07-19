# RavenClaw — Figma Layout

Two ways to get this site's layout into Figma. Both build the same design; they differ in
setup cost and in whether you get auto-layout.

**There is no `.fig` in this folder, and there cannot be.** That format is proprietary binary,
and Figma exposes no way to author one outside the editor. Everything below is a real,
supported import path.

## Option A — drag in the SVG (30 seconds, no setup)

`ravenclaw-layout.svg` → drag onto a Figma canvas. Figma converts it into named, editable
layers. Contains Home at 1440 (light + dark), Home at 375 (light + dark), and Foundations.

Trade-off: **no auto-layout.** Frames are static geometry — fine for review, layout reference
and redlining, not for responsive resizing.

Regenerate after changing tokens: `node figma-plugin/build-svg.js`

## Option B — run the plugin (2 minutes, full fidelity)

Gets you auto-layout frames, a Light/Dark variable collection, and component scaffolding.
Worth it if you intend to actually design in the file rather than just read it.

### Why it has to be a plugin

Figma's REST API is read-only for file *content*. Creating frames, auto-layout and variables
programmatically is only possible from inside the editor. You import it once; it runs in seconds.

### Run it

1. Figma desktop app (browser Figma cannot load local plugins) → create a **new blank design file**.
2. Menu → **Plugins → Development → Import plugin from manifest…**
3. Select `figma-plugin/manifest.json` from this repo.
4. Menu → **Plugins → Development → RavenClaw — Build Layout File**.

It builds into the *current* file, so run it in a blank one unless you want it merged.

### What the plugin produces

| Page | Contents |
|---|---|
| `00 · Cover` | Title board + the 12 app routes |
| `01 · Foundations` | Colour tokens (light/dark hex pairs), accent ramp, 8-step type scale, 4pt spacing, radii |
| `02 · Components` | Navbar, buttons, service card, project card |
| `03 · Desktop · 1440` | Home (light + dark) + 11 inner-page frames |
| `04 · Mobile · 375` | Home (light + dark), single-column |

Plus a **RavenClaw** variable collection with `Light` and `Dark` modes.

## Source of truth

Values are transcribed from the code, not invented:

- Colour tokens — `src/app/globals.css` (`:root` and `.dark`)
- Accent ramp — the process rail gradient in `src/components/site/process-section.tsx`
- Home section order — `src/components/site/home-view.tsx`
- Nav links — `src/components/site/navbar.tsx`
- Container width — `max-w-7xl` (1280) + `px-6` (24), as used across all sections
- Routes — `src/app/**/page.tsx`

**These files are a bridge, not a second source.** When the CSS tokens or section order change,
update `TOKENS` / `HOME_SECTIONS` in `code.js` *and* the `T` / section tables in `build-svg.js`,
then regenerate. The two generators duplicate the token values today — if this drifts more than
once, extract them into a shared JSON both read.

## Known gaps

- **Font.** Production uses Garet via `next/font/local`. Figma has no access to it, so the
  plugin renders in Inter. Upload Garet to your team library and swap the text styles.
- **Imagery.** Hero art, project thumbnails and client logos are tinted placeholder boxes.
  Drop real assets in — the frames are correctly sized (project thumbs are 16:10).
- **Components are frames.** They are not published components; promote with `Ctrl/Cmd+Alt+K`
  once the structure is settled, so instances stay linked.
- **Inner pages are skeletons.** Nav + hero + content band + footer, so the route map has
  somewhere to land. They are not designed out.
- **Variables are not bound to fills.** Swatches carry literal hex. Binding every fill to its
  variable is the natural next pass.
