import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

/**
 * The single-page marketing site.
 *
 * Navbar lives here rather than in the app shell because it drives an
 * IntersectionObserver over #home, #about, #services and #contact — sections
 * that only exist on this route.
 */
export default function Home() {
  return (
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
}
