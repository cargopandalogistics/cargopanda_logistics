/**
 * Build-time prerender.
 *
 * Why this exists
 * ---------------
 * The app is a client-rendered Vite/React SPA, so dist/index.html shipped as an
 * empty <div id="root">. Crawlers that do not execute JavaScript — including most
 * AI search bots — saw nothing at all, and the site had never been indexed.
 *
 * This script renders each route in src/entry-server.jsx to an HTML string at
 * build time and writes it into its own file under dist/. The app still boots
 * normally in the browser: main.jsx calls hydrateRoot, which attaches to the
 * prerendered DOM rather than rebuilding it.
 *
 * It uses react-dom/server rather than a headless browser deliberately — no
 * Chrome download, no extra build dependency, and nothing that can fail on
 * Vercel's build image.
 *
 * Routing note
 * ------------
 * There is no SPA rewrite on Vercel, which is what makes unmatched paths return
 * a genuine 404 instead of a soft 404. The trade-off is that a route only works
 * in production if it is prerendered to a real file here. Adding a <Route> in
 * App.jsx without adding it to `routes` in entry-server.jsx will 404 in prod
 * while working fine in `npm run dev`.
 *
 * Run automatically by `npm run build`, or on its own with `npm run prerender`.
 */

import { readFile, writeFile, rm, mkdir, stat } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const DIST = join(ROOT, "dist");
const SSR_DIR = join(ROOT, "dist-ssr");
const SSR_ENTRY = join(SSR_DIR, "entry-server.js");
const SITE = "https://www.cargopandalogistics.in";

const MIN_HTML_CHARS = 1000; // sanity floor — a real render is far larger

/**
 * Sanity check on the snapshot.
 *
 * Sections using framer-motion `whileInView` render here in their `initial`
 * state — style="opacity:0;transform:translateY(50px)" — because there is no
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
 * only measures now.
 */
function countHiddenInitialStates(html) {
  return (html.match(/opacity:0(?![.\d])/g) || []).length;
}

/** Swap the head tags that differ per route. */
function applyHeadTags(template, route) {
  const canonical = route.noindex
    ? null
    : `${SITE}${route.path === "/" ? "/" : `${route.path}`}`;

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /(<meta\s+name="description"[\s\S]*?content=")[\s\S]*?(")/,
      `$1${route.description}$2`
    )
    .replace(
      /(<meta\s+property="og:title"[^>]*content=")[^"]*(")/,
      `$1${route.title}$2`
    )
    .replace(
      /(<meta\s+name="twitter:title"[^>]*content=")[^"]*(")/,
      `$1${route.title}$2`
    )
    .replace(
      /(<meta\s+property="og:description"[\s\S]*?content=")[\s\S]*?(")/,
      `$1${route.description}$2`
    )
    .replace(
      /(<meta\s+name="twitter:description"[\s\S]*?content=")[\s\S]*?(")/,
      `$1${route.description}$2`
    );

  if (canonical) {
    html = html
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`);
  } else {
    // Error pages must never be indexed, and must not claim a canonical URL.
    html = html
      .replace(/\s*<link rel="canonical"[^>]*>/, "")
      .replace(
        /(<meta name="robots" content=")[^"]*(")/,
        "$1noindex, follow$2"
      );
  }

  return html;
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

  const { render, routes } = await import(pathToFileURL(SSR_ENTRY).href);

  if (!Array.isArray(routes) || routes.length === 0) {
    console.error("[prerender] entry-server.jsx exported no routes — nothing to build.");
    process.exit(1);
  }

  // Read the template once, before we start overwriting dist/index.html.
  const template = await readFile(join(DIST, "index.html"), "utf8");
  const marker = '<div id="root"></div>';

  if (!template.includes(marker)) {
    console.error(`[prerender] could not find ${marker} in dist/index.html — nothing injected.`);
    process.exit(1);
  }

  const results = [];

  for (const route of routes) {
    const appHtml = render(route.path);

    if (typeof appHtml !== "string" || appHtml.length < MIN_HTML_CHARS) {
      console.error(
        `[prerender] refusing to write ${route.out}: render of ${route.path} produced ` +
          `${appHtml?.length ?? 0} chars (expected at least ${MIN_HTML_CHARS}).`
      );
      process.exit(1);
    }

    const out = applyHeadTags(template, route).replace(
      marker,
      `<div id="root">${appHtml}</div>`
    );

    const target = join(DIST, route.out);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, out, "utf8");

    const words = appHtml
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ").length;

    results.push({
      route: route.path,
      file: route.out,
      words,
      bytes: out.length,
      hidden: countHiddenInitialStates(appHtml),
    });
  }

  // The SSR bundle is a build artefact only; it must not ship to the CDN.
  await rm(SSR_DIR, { recursive: true, force: true });

  console.log(`[prerender] wrote ${results.length} page(s):`);
  for (const r of results) {
    console.log(
      `  ${r.route.padEnd(20)} → ${r.file.padEnd(26)} ` +
        `~${String(r.words).padStart(4)} words, ${(r.bytes / 1024).toFixed(1)} kB` +
        (r.hidden ? `, ${r.hidden} in animation start state` : "")
    );
  }
}

main().catch((e) => {
  console.error("[prerender] failed:", e);
  process.exit(1);
});
