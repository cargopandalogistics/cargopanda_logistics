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
 * Sanity check on the snapshot.
 *
 * Sections using framer-motion `whileInView` render here in their `initial`
 * state — `style="opacity:0;transform:translateY(50px)"` — because there is no
 * viewport on the server to trigger the enter animation.
 *
 * That is fine and is left alone deliberately. An earlier version of this script
 * rewrote those styles to make the content visible, which turned out to be both
 * unnecessary and harmful:
 *
 *   · Unnecessary — inline CSS does not remove text from the HTML. Crawlers that
 *     do not execute JavaScript parse the markup, not the styles, so the copy was
 *     always extractable. Google executes JS and sees the final animated state.
 *   · Harmful — rewriting the DOM after React rendered it guaranteed a hydration
 *     mismatch on every affected element, forcing React to discard and rebuild
 *     the tree instead of hydrating it.
 *
 * Server and client markup must match exactly for hydrateRoot to work, so this
 * only measures now. A sharp change in the count is worth investigating.
 */
function countHiddenInitialStates(html) {
  return (html.match(/opacity:0(?![.\d])/g) || []).length;
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

  // Injected verbatim — see countHiddenInitialStates() above for why the markup
  // is deliberately not post-processed.
  const appHtml = rendered;
  const hiddenCount = countHiddenInitialStates(appHtml);

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
      `${hiddenCount} element(s) in animation start state`
  );
}

main().catch((e) => {
  console.error("[prerender] failed:", e);
  process.exit(1);
});
