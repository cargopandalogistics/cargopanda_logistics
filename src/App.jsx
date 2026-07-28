import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/**
 * The page tree, without a router.
 *
 * Kept separate from <App /> so the build-time prerender
 * (src/entry-server.jsx) can wrap the same tree in a StaticRouter.
 * Do not add a router in here.
 */
export const AppContent = () => (
  <div className="bg-slate-50 antialiased overflow-x-hidden">
    <Navbar />
    <main>
      <Hero />
      <About />
      <Services />
      <Contact />
    </main>
    <Footer />
  </div>
);

const App = () => (
  // Anything using React Router hooks (such as Navbar) must be inside this tag
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
