# css-app-store

Generate App Store screenshots with HTML/CSS templates and Playwright.

One command. Four languages. Pixel-perfect PNGs ready for App Store Connect.

<p align="center">
  <img src="docs/example-default.png?v=3" width="180" alt="Default template - English">
  <img src="docs/example-default-ja.png?v=3" width="180" alt="Default template - Japanese">
  <img src="docs/example-default-zh.png?v=3" width="180" alt="Default template - Chinese">
  <img src="docs/example-default-ko.png?v=3" width="180" alt="Default template - Korean">
</p>

<p align="center">
  <img src="docs/example-typography.png?v=3" width="180" alt="Typography template - English">
  <img src="docs/example-typography-ja.png?v=3" width="180" alt="Typography template - Japanese">
  <img src="docs/example-typography-zh.png?v=3" width="180" alt="Typography template - Chinese">
  <img src="docs/example-typography-ko.png?v=3" width="180" alt="Typography template - Korean">
</p>

<p align="center">
  <img src="docs/example-glass.png?v=3" width="180" alt="Glass template - English">
  <img src="docs/example-glass-ja.png?v=3" width="180" alt="Glass template - Japanese">
  <img src="docs/example-glass-zh.png?v=3" width="180" alt="Glass template - Chinese">
  <img src="docs/example-glass-ko.png?v=3" width="180" alt="Glass template - Korean">
</p>

<p align="center">
  <img src="docs/example-gradient.png?v=3" width="180" alt="Gradient template - English">
  <img src="docs/example-gradient-ja.png?v=3" width="180" alt="Gradient template - Japanese">
  <img src="docs/example-gradient-zh.png?v=3" width="180" alt="Gradient template - Chinese">
  <img src="docs/example-gradient-ko.png?v=3" width="180" alt="Gradient template - Korean">
</p>

<p align="center">
  <img src="docs/example-neon.png?v=3" width="180" alt="Neon template - English">
  <img src="docs/example-neon-ja.png?v=3" width="180" alt="Neon template - Japanese">
  <img src="docs/example-neon-zh.png?v=3" width="180" alt="Neon template - Chinese">
  <img src="docs/example-neon-ko.png?v=3" width="180" alt="Neon template - Korean">
</p>

<p align="center">
  <img src="docs/example-outline.png?v=3" width="180" alt="Outline template - English">
  <img src="docs/example-outline-ja.png?v=3" width="180" alt="Outline template - Japanese">
  <img src="docs/example-outline-zh.png?v=3" width="180" alt="Outline template - Chinese">
  <img src="docs/example-outline-ko.png?v=3" width="180" alt="Outline template - Korean">
</p>

<p align="center">
  <img src="docs/example-retro.png?v=3" width="180" alt="Retro template - English">
  <img src="docs/example-retro-ja.png?v=3" width="180" alt="Retro template - Japanese">
  <img src="docs/example-retro-zh.png?v=3" width="180" alt="Retro template - Chinese">
  <img src="docs/example-retro-ko.png?v=3" width="180" alt="Retro template - Korean">
</p>

<p align="center">
  <img src="docs/example-split.png?v=3" width="180" alt="Split template - English">
  <img src="docs/example-split-ja.png?v=3" width="180" alt="Split template - Japanese">
  <img src="docs/example-split-zh.png?v=3" width="180" alt="Split template - Chinese">
  <img src="docs/example-split-ko.png?v=3" width="180" alt="Split template - Korean">
</p>

<p align="center">
  <img src="docs/example-duotone.png?v=3" width="180" alt="Duotone template - English">
  <img src="docs/example-duotone-ja.png?v=3" width="180" alt="Duotone template - Japanese">
  <img src="docs/example-duotone-zh.png?v=3" width="180" alt="Duotone template - Chinese">
  <img src="docs/example-duotone-ko.png?v=3" width="180" alt="Duotone template - Korean">
</p>

<p align="center">
  <img src="docs/example-vertical.png?v=3" width="180" alt="Vertical template - English">
  <img src="docs/example-vertical-ja.png?v=3" width="180" alt="Vertical template - Japanese">
  <img src="docs/example-vertical-zh.png?v=3" width="180" alt="Vertical template - Chinese">
  <img src="docs/example-vertical-ko.png?v=3" width="180" alt="Vertical template - Korean">
</p>

## The Problem

App Store screenshots are marketing assets — bold typography, vivid gradients, carefully placed device mockups. Most teams build these in Figma or Photoshop, then manually export dozens of variants for each locale and device size.

Support 4 languages? That's 4x the manual work. Need to update a headline? Re-export everything. Change the background color? Open every file. This doesn't scale.

## The Solution

Write your screenshot layouts in HTML and CSS. Define per-locale text in a JSON file. Run a script. Get PNGs.

```
data.json          ← text, colors, image paths per locale
templates/*.html   ← HTML/CSS with {{variable}} placeholders
generate.mjs       ← Playwright renders each locale → PNG
```

1. **Design a template** in `templates/` using HTML and CSS. Use `{{placeholder}}` syntax for anything that varies by locale.
2. **Define your locales** in a JSON data file — one entry per language with text, colors, and asset paths.
3. **Run the generator** — Playwright opens each rendered page in a headless browser and captures a pixel-perfect screenshot at the exact App Store resolution.

## Why CSS?

The web platform is arguably the most heavily invested rendering engine in human history. Trillions of dollars of commerce, media, and communication flow through browsers every day. Decades of engineering by Google, Apple, Mozilla, and Microsoft have produced a typographic and layout engine of extraordinary power — and it's free, open, and runs everywhere.

Everything that Adobe Flash once did — and that designers used to build as rasterized PSDs — is now achievable in plain HTML and CSS. And because it's code, it's **versionable**, **diffable**, **templatable**, and **automatable**.

### What CSS gives you for free

**Typography at every level.** Variable fonts with continuous axes (`font-weight: 100..900`, `font-stretch`, `font-optical-sizing`). Full Unicode text shaping — Latin, CJK, Arabic, Devanagari, Thai, and every other script. Kerning, ligatures, small caps, and stylistic alternates via `font-feature-settings`. Google Fonts gives you instant access to thousands of typefaces.

**Every writing direction.** Horizontal left-to-right. Right-to-left for Arabic and Hebrew (`direction: rtl`). Vertical top-to-bottom for Japanese tategaki (`writing-mode: vertical-rl`). Traditional Mongolian script. Mix them freely in the same layout — CSS handles the bidi algorithm for you.

**Layout that just works.** Flexbox and CSS Grid handle any composition. Center anything in one line. Overlap layers with `position: absolute`. Aspect-ratio containers. Subgrid for nested alignment. No more slicing PSDs into layers.

**Visual effects rivaling native apps.** Gradients (linear, radial, conic). Glassmorphism with `backdrop-filter: blur()`. Blend modes (`mix-blend-mode`, `background-blend-mode`). Clipping and masking (`clip-path`, `mask-image`). Full 3D transforms. Keyframe animations.

**Text effects that used to require Photoshop:**

- **3D extrusion** — stacked `text-shadow` layers for depth
- **Gradient text** — `background-clip: text` with linear/radial/conic gradients
- **Neon glow** — layered `text-shadow` with vivid colors and large blur radii
- **Glitch effects** — `clip-path` with animation and pseudo-elements
- **Outlined text** — `-webkit-text-stroke` for hollow lettering
- **Variable font animation** — animate weight, width, slant, and custom axes in real-time
- **Halftone, retro, frosted** — blend modes + SVG filters + CSS

See [Mandy Michael's CodePen](https://codepen.io/mandymichael) for dozens of stunning pure-CSS text effects, [Jen Simmons' Layout Lab](https://labs.jensimmons.com/) for layout experiments, and [V-Fonts](https://v-fonts.com/) for variable font exploration.

### 10 included templates

**`default`** — Classic App Store style. Solid color background, bold headline at the top, app screenshot in a phone frame below.

**`typography`** — Text-only with bold 3D typography, banner accents, and a patterned background.

**`glass`** — Glassmorphism card with frosted blur effect and badge label.

**`gradient`** — Vivid gradient background with large display text.

**`neon`** — Dark background with glowing neon text effect.

**`outline`** — Bold outlined/hollow text on a minimal background.

**`retro`** — Retro/vintage aesthetic with halftone patterns and warm tones.

**`split`** — Split-screen layout for before/after or feature comparison.

**`duotone`** — Duotone color treatment with high-contrast two-color palette.

**`vertical`** — Vertical Japanese-style layout with `writing-mode: vertical-rl`.

All templates support `{{variable}}` substitution for text, colors, and image paths. Create your own by writing any HTML/CSS you want.

## Quick Start

```bash
npm install
npx playwright install chromium

# Generate all locales (default template with app screenshot)
npm run generate

# Generate all locales (typography-only template)
node generate.mjs data-typography.json

# Generate a single locale
node generate.mjs data.json en
```

Output appears in `screenshots/`.

## Project Structure

```
css-app-store/
├── templates/
│   ├── default.html          # App screenshot + headline
│   ├── typography.html       # Text-only with 3D effects
│   ├── glass.html            # Glassmorphism card
│   ├── gradient.html         # Gradient background
│   ├── neon.html             # Neon glow text
│   ├── outline.html          # Outlined/hollow text
│   ├── retro.html            # Retro/vintage style
│   ├── split.html            # Split-screen layout
│   ├── duotone.html          # Duotone color treatment
│   └── vertical.html         # Vertical Japanese text
├── assets/
│   └── placeholder.svg       # "Your App Here" placeholder
├── data.json                 # Data for default template
├── data-*.json               # Data for each template (e.g., data-glass.json)
├── generate.mjs              # Playwright capture script
├── docs/                     # Example images for README
└── screenshots/              # Generated output (gitignored)
```

## Creating Your Own Template

1. Create `templates/my-template.html`
2. Use `{{variableName}}` for anything that changes per locale
3. Create a data JSON file with `"template": "my-template"` and locale entries
4. Run `node generate.mjs my-data.json`

Templates have the full power of the web platform — Google Fonts, SVG filters, `@keyframes`, CSS custom properties, blend modes, 3D transforms, `<canvas>`, inline SVG. The only constraint is the canvas size.

### Template ideas

- **Gradient mesh background** with `conic-gradient` and `mix-blend-mode`
- **Kinetic typography** — Playwright captures a single frame, but you can set `animation-delay` to pick the exact pose
- **Parallax depth** — layered elements with different scales for a 3D composition
- **Manga/comic panel** — `clip-path` polygons with dynamic panel layouts

## App Store Screenshot Sizes

| Device         | Resolution   |
|----------------|--------------|
| iPhone 6.9"    | 1320 x 2868 |
| iPhone 6.7"    | 1290 x 2796 |
| iPhone 6.5"    | 1284 x 2778 |
| iPad 13"       | 2064 x 2752 |

## The AI Agent Workflow

The real power emerges when you combine this with an AI coding agent:

> *"Generate App Store screenshots in Japanese, English, Chinese, and Korean with this headline and these app screenshots."*

The agent updates the JSON, swaps in localized screenshots, runs `generate.mjs`, and delivers a complete set of store-ready assets — in seconds, not hours. No Figma. No manual exports. No forgetting to update the Korean version.

Because the templates are just HTML files with `{{placeholders}}`, any LLM can read, understand, and modify them. The entire pipeline is text in, PNGs out.

## License

MIT
