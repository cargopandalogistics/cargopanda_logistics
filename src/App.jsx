import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

/**
 * Route table, without a router.
 *
 * Kept separate from <App /> so the build-time prerender
 * (src/entry-server.jsx) can wrap the same tree in a StaticRouter and render
 * each path to its own HTML file. Do not add a router in here.
 *
 * Every path added below must also be listed in the `routes` export of
 * src/entry-server.jsx, or it will not be prerendered — and, because there is
 * no SPA rewrite on Vercel, it will 404 in production.
 */
export const AppContent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
