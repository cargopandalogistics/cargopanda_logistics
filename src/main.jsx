import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css' // <--- THIS LINE IS CRITICAL. IT LOADS TAILWIND.

const container = document.getElementById('root')

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

/**
 * `npm run build` prerenders the page into #root (see scripts/prerender.mjs),
 * so in production there is already real markup here. hydrateRoot attaches to
 * that existing DOM and only wires up event handlers.
 *
 * createRoot would instead throw the prerendered markup away and rebuild the
 * whole tree, making the browser do layout and paint twice on every load —
 * noticeably sluggish on mobile.
 *
 * The empty check keeps `npm run dev` working, where index.html ships with an
 * empty #root and there is nothing to hydrate.
 */
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
