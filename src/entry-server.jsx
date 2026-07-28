/**
 * Server entry, used only at build time by scripts/prerender.mjs.
 *
 * Renders the same component tree the browser renders, to an HTML string, so
 * dist/index.html ships with real content instead of an empty <div id="root">.
 *
 * StaticRouter stands in for BrowserRouter, which needs a real URL bar.
 *
 * Note on animations: sections using framer-motion `whileInView` render here in
 * their `initial` state (opacity:0), because there is no viewport on the server
 * to trigger the enter animation. <MotionConfig isStatic> was tried and does not
 * suppress this in framer-motion v12. scripts/prerender.mjs strips those inline
 * styles from the snapshot instead — see neutraliseInitialStyles() there.
 */

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppContent } from "./App.jsx";

export function render(url = "/") {
  return renderToString(
    <StaticRouter location={url}>
      <AppContent />
    </StaticRouter>
  );
}
