# css-app-store

Generate App Store screenshots with HTML/CSS templates and Playwright.

## Why CSS?

App Store screenshots are marketing assets — bold typography, vivid gradients, carefully placed device mockups. Most teams build these in Figma or Photoshop, then manually export dozens of variants for each locale and device size. This is slow, error-prone, and impossible to automate.

**CSS is the answer.** The web platform is arguably the most heavily invested rendering engine in history. Trillions of dollars of commerce, media, and communication run through browsers. The result is a typographic and layout engine of extraordinary power — one that keeps getting better every year.

Consider what CSS gives you *for free*:

- **Typography** — Variable fonts, `font-weight: 100..900` on a continuous axis, `font-stretch`, optical sizing. Text shaping for Latin, CJK, Arabic, Devanagari, and every other Unicode script. Kerning, ligatures, and OpenType features via `font-feature-settings`.
- **Writing modes** — Horizontal left-to-right, right-to-left (`direction: rtl`), vertical top-to-bottom (`writing-mode: vertical-rl`) for Japanese tategaki or Mongolian. Mix them freely in the same layout.
- **Layout** — Flexbox and Grid handle any composition you can imagine. Center anything. Overlap layers with `position: absolute`. Aspect-ratio-aware containers. Subgrid for nested alignment.
- **Effects** — Gradients (linear, radial, conic), `backdrop-filter: blur()`, `mix-blend-mode`, `clip-path`, `mask-image`, CSS transforms in 3D, keyframe animations, scroll-driven animations. Shadows, glows, glassmorphism.
- **Text effects** — `text-shadow`, `background-clip: text` for gradient text, `text-stroke`, `text-decoration` with custom underlines, `text-emphasis` for CJK emphasis marks. You can even distort text along paths using SVG `<textPath>` embedded in HTML.
- **Responsiveness** — `clamp()`, `min()`, `max()`, container queries, `@media` queries. One template can adapt to iPhone 6.5", 6.7", 6.9", and iPad 13" just by changing the viewport size.

Everything that Adobe Flash once did — and that designers used to build as rasterized PSDs — is now achievable in plain HTML and CSS, rendered by the same engine that powers every website on Earth. And because it's code, it's versionable, diffable, templatable, and automatable.

## How It Works

```
data.json          ← text, colors, image paths per locale
templates/*.html   ← HTML/CSS with {{variable}} placeholders
generate.mjs       ← Playwright renders each locale → PNG
```

1. **Design a template** in `templates/` using HTML and CSS. Use `{{placeholder}}` syntax for anything that varies by locale (headline text, screenshot image, colors).
2. **Define your locales** in `data.json` — one entry per language with the text and asset paths.
3. **Run the generator** — Playwright opens each rendered page in a headless browser and captures a pixel-perfect screenshot at the exact App Store resolution.

The output is a set of PNGs ready to upload to App Store Connect.

## Quick Start

```bash
npm install
npx playwright install chromium

# Generate all locales
npm run generate

# Generate a single locale
node generate.mjs data.json en
```

Output appears in `screenshots/`.

## Project Structure

```
css-app-store/
├── templates/
│   └── default.html       # Duolingo-style: solid bg + headline + device mockup
├── assets/                 # App screenshots and images used in templates
├── data.json               # Per-locale variables (text, colors, image paths)
├── generate.mjs            # Playwright capture script
└── screenshots/            # Generated PNGs (gitignored)
```

## Adding a Template

1. Create `templates/my-template.html` with `{{variable}}` placeholders
2. Set `"template": "my-template"` in `data.json`
3. Add any new variables to each locale entry

Templates have full access to CSS — use Google Fonts, SVG filters, `@keyframes`, blend modes, whatever you need. The only constraint is the canvas size (App Store screenshot dimensions).

## App Store Screenshot Sizes

| Device         | Resolution      |
|----------------|-----------------|
| iPhone 6.9"    | 1320 x 2868    |
| iPhone 6.7"    | 1290 x 2796    |
| iPhone 6.5"    | 1284 x 2778    |
| iPad 13"       | 2064 x 2752    |

## The Workflow

The real power emerges when you combine this with an AI agent:

> "Generate App Store screenshots for ja, en, zh-Hans, ko with this new headline and these screenshots."

The agent updates `data.json`, swaps in localized screenshots, runs `generate.mjs`, and delivers a complete set of store-ready assets — in seconds, not hours.

## License

MIT
