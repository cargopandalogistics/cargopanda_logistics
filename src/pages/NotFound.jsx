import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Truck } from "lucide-react";
import { contactConfig } from "../constants";

/**
 * Rendered to dist/404.html by scripts/prerender.mjs. Vercel serves that file
 * automatically for unmatched paths, with a genuine 404 status code — so this
 * replaces Vercel's raw "404: NOT_FOUND" page without weakening the status.
 *
 * The page carries <meta name="robots" content="noindex"> (injected by the
 * prerender), because an error page should never be indexed.
 */
export default function NotFound() {
  return (
    <div className="bg-[#EBE1D1] min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-[#0D4715] flex items-center justify-center text-[#E9762B] mb-8 shadow-xl">
        <Truck className="w-8 h-8 md:w-10 md:h-10" />
      </div>

      <p className="text-[#E9762B] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3">
        Error 404
      </p>

      <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#0D4715] tracking-tighter uppercase leading-[1.05] max-w-2xl mb-5">
        This one took a wrong turn
      </h1>

      <p className="text-[#41644A] text-sm md:text-lg font-semibold max-w-md mb-10 leading-relaxed">
        The page you are looking for does not exist, or has moved. Our cargo is better at finding
        its destination than this link was.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest bg-[#0D4715] text-white hover:bg-[#41644A] transition-colors w-full sm:w-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Homepage
        </Link>
        <a
          href={`mailto:${contactConfig.servicesEmail}`}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest bg-white/40 border border-[#0D4715]/20 text-[#0D4715] hover:bg-[#0D4715] hover:text-white transition-colors w-full sm:w-auto"
        >
          Contact Us
        </a>
      </div>

      <nav className="mt-12 pt-8 border-t border-[#41644A]/20 w-full max-w-md">
        <p className="text-[#41644A]/70 font-black uppercase tracking-widest text-[9px] md:text-[10px] mb-4">
          Looking for
        </p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-[#0D4715]">
          <Link to="/#about" className="hover:text-[#E9762B] transition-colors">About</Link>
          <Link to="/#services" className="hover:text-[#E9762B] transition-colors">Services</Link>
          <Link to="/#contact" className="hover:text-[#E9762B] transition-colors">Contact</Link>
          <Link to="/privacy-policy" className="hover:text-[#E9762B] transition-colors">Privacy</Link>
        </div>
      </nav>
    </div>
  );
}
