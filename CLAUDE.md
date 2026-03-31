# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

App Store screenshot generator: HTML/CSS templates + Playwright capture. Write layouts in HTML/CSS, define per-locale text in JSON, run a script, get PNGs at exact App Store resolutions.

## Commands

```bash
npm install                          # install dependencies
npx playwright install chromium      # install browser (first time)
npm run generate                     # generate all locales from data.json
node generate.mjs data.json en       # single locale
node generate.mjs data-glass.json    # all locales with a different template/data file
```

Output goes to `screenshots/` (gitignored). Files are named `{template}_{locale}.png`.

## Architecture

**`generate.mjs`** — Single-file Playwright script. Loads a data JSON file, reads the template HTML, replaces `{{variable}}` placeholders with per-locale values, writes a temp HTML file, opens it in headless Chromium at 1290×2796 (iPhone 6.7"), and captures a PNG. The viewport size is hardcoded in generate.mjs.

**`templates/*.html`** — Self-contained HTML files with inline CSS. Each template uses `{{variableName}}` placeholders for locale-varying content. Templates have full access to the web platform (Google Fonts, SVG filters, CSS animations, etc). Currently: default, typography, glass, gradient, neon, outline, retro, split, duotone, vertical.

**`data*.json`** — Each data file pairs a template name with locale entries. Structure:
```json
{
  "template": "template-name",
  "locales": {
    "en": { "headline": "...", "backgroundColor": "#6C5CE7", ... },
    "ja": { "headline": "...", ... }
  }
}
```
Variables differ per template — some use `headline`/`screenshot`, others use `line1`/`line2`/`badge`/`accentColor`, etc. The variable names must match `{{placeholders}}` in the corresponding template HTML.

**`assets/`** — App screenshots and images referenced by `screenshot` variable in data JSON. Paths in data JSON are relative to project root (e.g., `"screenshot": "assets/placeholder.svg"`); generate.mjs converts them to absolute `file://` URLs.

## Adding a New Template

1. Create `templates/<name>.html` with `{{variable}}` placeholders and inline CSS
2. Create `data-<name>.json` with `"template": "<name>"` and locale entries matching the placeholders
3. Run `node generate.mjs data-<name>.json`

## Key Details

- Default viewport: 1290×2796 (iPhone 6.7"). Other supported sizes: 1320×2868 (6.9"), 1284×2778 (6.5"), 2064×2752 (iPad 13")
- Templates use `\n` in JSON strings for line breaks — the template HTML must handle this (typically via `white-space: pre-line` or similar)
- The `lang` variable is automatically injected (set to the locale key) — templates can use `{{lang}}` without defining it in data
- Temp HTML files (`_tmp_{lang}.html`) are written to `screenshots/` during generation
- No test suite — verification is visual (inspect the generated PNGs)
