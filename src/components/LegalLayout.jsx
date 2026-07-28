import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "./Footer";
import { companyDetails, contactConfig } from "../constants";

/**
 * Shared chrome for the standalone content pages (privacy, terms, 404).
 *
 * These pages deliberately do not use <Navbar />: it is built for the
 * single-page layout and drives an IntersectionObserver over #home, #about,
 * #services and #contact, none of which exist here. A simple header with a
 * route link back to the homepage is the correct behaviour.
 */
export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div className="bg-[#EBE1D1] min-h-screen flex flex-col">
      <header className="border-b border-[#41644A]/20 bg-[#EBE1D1]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-[#0D4715] hover:text-[#E9762B] transition-colors font-black uppercase tracking-widest text-[10px] md:text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to CargoPanda
          </Link>
          <span className="text-[#41644A]/70 font-black uppercase tracking-widest text-[9px] md:text-[10px] hidden sm:block">
            {companyDetails.shortName}
          </span>
        </div>
      </header>

      <main className="flex-grow">
        <article className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D4715] tracking-tighter uppercase mb-3">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-[#41644A]/80 text-xs md:text-sm font-bold uppercase tracking-widest mb-8 md:mb-12 pb-6 border-b border-[#41644A]/20">
              Last updated: {lastUpdated}
            </p>
          )}

          <div className="legal-prose text-[#274d2a] text-sm md:text-base leading-relaxed space-y-6">
            {children}
          </div>

          <div className="mt-12 md:mt-16 pt-6 border-t border-[#41644A]/20 text-[#41644A] text-xs md:text-sm">
            <p className="font-bold mb-1">{companyDetails.legalName}</p>
            <p>{contactConfig.address}</p>
            <p className="text-[#41644A]/70 text-[11px] md:text-xs mt-1">
              Registered office: {companyDetails.registeredOffice}
            </p>
            <p>
              <a href={`mailto:${contactConfig.servicesEmail}`} className="hover:text-[#E9762B] transition-colors">
                {contactConfig.servicesEmail}
              </a>
              {" · "}
              <a href={`tel:+${contactConfig.phone.replace(/\D/g, "")}`} className="hover:text-[#E9762B] transition-colors">
                {contactConfig.phone}
              </a>
            </p>
            <p className="mt-1">CIN: {companyDetails.cin}</p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

/** Section heading inside a legal document. */
export const LegalSection = ({ id, heading, children }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="text-lg md:text-2xl font-black text-[#0D4715] tracking-tight uppercase mt-8 mb-3">
      {heading}
    </h2>
    <div className="space-y-4">{children}</div>
  </section>
);

/** Bulleted list with the site's styling. */
export const LegalList = ({ items }) => (
  <ul className="space-y-2 pl-1">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3">
        <span className="text-[#E9762B] font-black shrink-0 mt-0.5">·</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
