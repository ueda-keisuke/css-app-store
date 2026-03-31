# css-app-store

App Store screenshot generator: HTML/CSS templates + Playwright capture.

## Architecture

- `templates/` — HTML/CSS templates with `{{variable}}` placeholders
- `data.json` — locale-specific text, colors, screenshot paths
- `generate.mjs` — Playwright script that renders templates and captures PNGs
- `assets/` — app screenshots and other images used in templates
- `screenshots/` — generated output (gitignored)

## Usage

```bash
npm install
npx playwright install chromium
npm run generate            # all locales
node generate.mjs data.json en   # single locale
```

## Adding Templates

1. Create `templates/<name>.html` with `{{variable}}` placeholders
2. Set `"template": "<name>"` in data.json
3. Add corresponding variables to each locale in data.json

## App Store Screenshot Sizes

- iPhone 6.9": 1320 x 2868 or 1290 x 2796
- iPhone 6.7": 1290 x 2796
- iPhone 6.5": 1284 x 2778 or 1242 x 2688
- iPad 13": 2064 x 2752
