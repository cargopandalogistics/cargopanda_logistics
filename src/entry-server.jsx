/**
 * Server entry, used only at build time by scripts/prerender.mjs.
 *
 * Renders the same component tree the browser renders, to an HTML string, so
 * each route ships with real content instead of an empty <div id="root">.
 *
 * StaticRouter stands in for BrowserRouter, which needs a real URL bar.
 *
 * Note on animations: `whileInView` must not be used in anything rendered here.
 * It emits opacity:0 on the server, and if the IntersectionObserver never fires
 * the content stays invisible for good. scripts/prerender.mjs fails the build if
 * it finds any. `initial` + `animate` is fine — it always resolves on mount.
 */

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppContent } from "./App.jsx";

/**
 * Every page the build should emit.
 *
 * `out`      — file written under dist/. Vercel serves dist/<dir>/index.html at
 *              /<dir>, and dist/404.html automatically for unmatched paths.
 * `noindex`  — adds a robots meta tag; only the error page should set this.
 *
 * Adding a route here is not enough on its own: it must also exist in the
 * <Routes> table in src/App.jsx, and be added to public/sitemap.xml unless it
 * is noindex.
 */
export const routes = [
  {
    path: "/",
    out: "index.html",
    title: "F&B Cold Chain & Last-Mile Logistics in Bangalore | CargoPanda",
    description:
      "Tech-driven cold chain and last-mile logistics for F&B brands in Bangalore. Real-time temperature monitoring, intracity and intercity reefer fleet.",
  },
  {
    path: "/privacy-policy",
    out: "privacy-policy/index.html",
    title: "Privacy Policy | CargoPanda Logistics",
    description:
      "How CargoPanda Logistics collects, uses and protects personal data submitted through this website, and your rights under India's DPDP Act 2023.",
  },
  {
    path: "/terms-of-service",
    out: "terms-of-service/index.html",
    title: "Terms of Service | CargoPanda Logistics",
    description:
      "The terms governing use of the CargoPanda Logistics website, quote enquiries and driver partnership enquiries.",
  },
  {
    path: "/404",
    out: "404.html",
    title: "Page Not Found | CargoPanda Logistics",
    description: "The page you are looking for does not exist or has moved.",
    noindex: true,
  },
];

export function render(url = "/") {
  return renderToString(
    <StaticRouter location={url}>
      <AppContent />
    </StaticRouter>
  );
}
