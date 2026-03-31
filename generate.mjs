import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- 設定 ---
const dataPath = process.argv[2] || "data.json";
const localeFilter = process.argv[3]; // 特定ロケールだけ生成したい場合

// --- データ読み込み ---
const data = JSON.parse(readFileSync(resolve(__dirname, dataPath), "utf-8"));
const templateName = data.template || "default";
const templatePath = resolve(__dirname, "templates", `${templateName}.html`);
const templateHtml = readFileSync(templatePath, "utf-8");

const outputDir = resolve(__dirname, "screenshots");
mkdirSync(outputDir, { recursive: true });

// --- テンプレート変数の置換 ---
function render(html, vars) {
  return html.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const val = vars[key];
    if (val === undefined) return `{{${key}}}`;
    return val;
  });
}

// --- メイン ---
async function main() {
  const browser = await chromium.launch();

  const locales = localeFilter
    ? { [localeFilter]: data.locales[localeFilter] }
    : data.locales;

  for (const [lang, vars] of Object.entries(locales)) {
    if (!vars) {
      console.warn(`Locale "${lang}" not found in data, skipping.`);
      continue;
    }

    // スクリーンショットパスを絶対パスに変換（file:// URL用）
    const renderVars = { ...vars, lang };
    if (vars.screenshot) {
      renderVars.screenshot = `file://${resolve(__dirname, vars.screenshot)}`;
    }

    const html = render(templateHtml, renderVars);

    // 一時HTMLを書き出し（file://でimgを読むため）
    const tmpHtmlPath = resolve(outputDir, `_tmp_${lang}.html`);
    writeFileSync(tmpHtmlPath, html);

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1290, height: 2796 });
    await page.goto(`file://${tmpHtmlPath}`, { waitUntil: "networkidle" });

    const outputPath = resolve(outputDir, `${templateName}_${lang}.png`);
    await page.screenshot({ path: outputPath, fullPage: false });
    console.log(`Generated: ${outputPath}`);

    await page.close();
  }

  await browser.close();
  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
