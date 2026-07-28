/**
 * Build-time prerender.
 *
 * Why this exists
 * ---------------
 * The app is a client-rendered Vite/React SPA, so `dist/index.html` shipped as
 * an empty <div id="root">. Crawlers that do not execute JavaScript — including
 * most AI search bots — saw nothing at all. Google renders JS only on a delayed
 * best-effort second pass, and in this case it had never indexed the site.
 *
 * This script renders the real component tree to an HTML string at build time
 * and injects it into dist/index.html. The app still boots normally in the
 * browser: main.jsx calls createRoot().render(), which replaces the snapshot on
 * mount. We are not hydrating, so there are no hydration-mismatch warnings.
 *
 * It uses react-dom/server rather than a headless browser deliberately — no
 * Chrome download, no extra build dependency, and nothing that can fail on
 * Vercel's build image.
 *
 * Run automatically by `npm run build`, or on its own with `npm run prerender`
 * (after a client build has produced dist/).
 */

import { readFile, writeFile, rm, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const DIST = join(ROOT, "dist");
const SSR_DIR = join(ROOT, "dist-ssr");
const SSR_ENTRY = join(SSR_DIR, "entry-server.js");

const MIN_HTML_CHARS = 2000; // sanity floor — a real render is far larger

/**
 * Neutralise framer-motion's `initial` state in the static snapshot.
 *
 * Sections wrapped in `whileInView` render with inline
 * `style="opacity:0;transform:translateY(50px)"`, because on the server there is
 * no viewport and the enter animation never runs. The text is still in the HTML,
 * but shipping the About / Services / Contact blocks at opacity:0 counts as
 * hidden content and causes a flash before hydration.
 *
 * framer-motion's <MotionConfig isStatic> was supposed to prevent this and does
 * not in v12 — verified against real build output — so we strip it here instead.
 * Doing it as a post-process is also more robust: it does not depend on
 * framer-motion internals that may change between releases.
 *
 * Deliberately narrow:
 *   · `opacity:0` becomes `opacity:1`, but `opacity:0.2` and friends are left
 *     alone (that one is the footer watermark, and is intentional).
 *   · inline `transform:` / `filter:` declarations are dropped — every one in
 *     this app's output is a motion initial. `will-change:transform` is a
 *     different property and survives untouched.
 *   · Tailwind classes such as `opacity-0` or `[transform:translateZ(60px)]` are
 *     class names, not style attributes, so they are never matched.
 */
function neutraliseInitialStyles(html) {
  let changed = 0;

  const out = html.replace(/style="([^"]*)"/g, (full, css) => {
    let v = css
      .replace(/(^|;)(\s*)opacity\s*:\s*0(?![.\d])/gi, "$1$2opacity:1")
      .replace(/(^|;)\s*(transform|filter)\s*:[^;]*/gi, "$1")
      .replace(/;;+/g, ";")
      .replace(/^;|;$/g, "")
      .trim();

    if (v !== css) changed += 1;
    return v ? `style="${v}"` : "";
  });

  return { html: out, changed };
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(join(DIST, "index.html")))) {
    console.error("[prerender] dist/index.html not found — run `vite build` first.");
    process.exit(1);
  }
  if (!(await exists(SSR_ENTRY))) {
    console.error(`[prerender] ${SSR_ENTRY} not found — the SSR build step did not run.`);
    process.exit(1);
  }

  const { render } = await import(pathToFileURL(SSR_ENTRY).href);
  const rendered = render("/");

  if (typeof rendered !== "string" || rendered.length < MIN_HTML_CHARS) {
    console.error(
      `[prerender] refusing to write: render produced ${rendered?.length ?? 0} chars ` +
        `(expected at least ${MIN_HTML_CHARS}). Leaving dist/index.html untouched.`
    );
    process.exit(1);
  }

  const { html: appHtml, changed } = neutraliseInitialStyles(rendered);

  const stillHidden = (appHtml.match(/opacity:0(?![.\d])/g) || []).length;
  if (stillHidden > 0) {
    console.warn(`[prerender] warning: ${stillHidden} element(s) still render at opacity:0`);
  }

  const template = await readFile(join(DIST, "index.html"), "utf8");
  const marker = '<div id="root"></div>';

  if (!template.includes(marker)) {
    console.error(`[prerender] could not find ${marker} in dist/index.html — nothing injected.`);
    process.exit(1);
  }

  const out = template.replace(marker, `<div id="root">${appHtml}</div>`);
  await writeFile(join(DIST, "index.html"), out, "utf8");

  // The SSR bundle is a build artefact only; it must not ship to the CDN.
  await rm(SSR_DIR, { recursive: true, force: true });

  const words = appHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ").length;

  console.log(
    `[prerender] injected ${appHtml.length.toLocaleString()} chars (~${words} words) ` +
      `into dist/index.html — total ${out.length.toLocaleString()} bytes, ` +
      `${changed} hidden-state style attribute(s) neutralised`
  );
}

main().catch((e) => {
  console.error("[prerender] failed:", e);
  process.exit(1);
});
