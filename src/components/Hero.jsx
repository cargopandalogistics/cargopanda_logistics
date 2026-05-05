"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { heroContent } from "../constants";
import AnimatedButton from "./AnimatedButton";
import InfiniteMarquee from "./InfiniteMarquee";
import { X, CheckCircle } from "lucide-react";

function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(13, 71, 21, ${0.05 + i * 0.01})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none opacity-50 md:opacity-100">
      <svg className="w-full h-full text-[#0D4715]" viewBox="0 0 696 316" fill="none">
        <title>Logistics Flow Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 25 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// ── Get Quote Modal ────────────────────────────────────────────────────────────

const QuoteModal = ({ open, onClose }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" }); }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/xkoyrkve", { // ← paste your Formspree Form ID
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName:  form.lastName,
          email:     form.email,
          phone:     form.phone,
          message:   form.message,
        }),
      });
      if (res.ok) setSubmitted(true);
      else throw new Error();
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-lg bg-[#0a3510] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ animation: "modalIn 0.28s cubic-bezier(.22,1,.36,1) both" }}
      >
        <style>{`@keyframes modalIn { from { opacity:0; transform:scale(.95) translateY(12px) } to { opacity:1; transform:scale(1) translateY(0) } }`}</style>
        <div className="h-1 w-full bg-gradient-to-r from-[#E9762B] via-[#f0a060] to-[#E9762B]" />

        <div className="p-6 md:p-8">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
          >
            <X size={15} />
          </button>

          {submitted ? (
            <div className="py-10 flex flex-col items-center text-center gap-4">
              <CheckCircle size={52} className="text-[#E9762B]" strokeWidth={1.4} />
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Quote Request Sent!</h3>
              <p className="text-[#a3b89a] text-sm max-w-xs">Our team will review your request and get back to you with a tailored quote shortly.</p>
              <button
                onClick={handleClose}
                className="mt-4 px-8 py-2.5 bg-[#E9762B] text-white text-sm font-bold rounded-xl hover:bg-[#d4661f] transition-colors uppercase tracking-wide"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-[#E9762B] text-xs font-bold uppercase tracking-widest mb-1">CargoPanda Logistics</p>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Get a Quote</h3>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex gap-3">
                  {[["First Name","firstName","Rahul"], ["Last Name","lastName","Sharma"]].map(([label, id, placeholder]) => (
                    <div key={id} className="flex-1 min-w-0">
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#a3b89a] mb-1.5">{label}</label>
                      <input
                        type="text" placeholder={placeholder} required
                        value={form[id]}
                        onChange={e => setForm(p => ({ ...p, [id]: e.target.value }))}
                        className="w-full bg-[#0D4715]/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#E9762B]/60 transition-all"
                      />
                    </div>
                  ))}
                </div>

                {[["Email Address","email","email","rahul@example.com"], ["Phone Number","phone","tel","+91 98765 43210"]].map(([label, id, type, placeholder]) => (
                  <div key={id}>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#a3b89a] mb-1.5">{label}</label>
                    <input
                      type={type} placeholder={placeholder} required
                      value={form[id]}
                      onChange={e => setForm(p => ({ ...p, [id]: e.target.value }))}
                      className="w-full bg-[#0D4715]/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#E9762B]/60 transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#a3b89a] mb-1.5">Message</label>
                  <textarea
                    placeholder="Tell us about your delivery requirements..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    rows={3}
                    className="w-full bg-[#0D4715]/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#E9762B]/60 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit" disabled={loading}
                  className="mt-1 w-full py-3.5 bg-[#E9762B] hover:bg-[#d4661f] text-white font-black uppercase tracking-widest rounded-xl transition-all duration-200 text-sm disabled:opacity-60"
                >
                  {loading ? "Sending…" : "Request Quote"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Hero Component ────────────────────────────────────────────────────────

const Hero = () => {
  const companyName = "CargoPanda Logistics";
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#EBE1D1] px-4 sm:px-6 lg:px-20 pt-20 md:pt-0">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

      {/* Quote Modal */}
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mb-12 md:mb-20">

        {/* Left Side: Branding & Headline */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="absolute -top-10 -left-10 w-32 md:w-64 h-16 md:h-32 bg-[#E9762B]/10 blur-[60px] rounded-full pointer-events-none"
            />

            <div className="flex flex-wrap overflow-hidden mb-4 md:mb-6 relative z-10 justify-center lg:justify-start items-center">
              {companyName.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "110%", rotateX: -90 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{
                    delay: index * 0.04,
                    duration: 0.6,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter 
                    ${char === " " ? "mr-2 sm:mr-3 md:mr-4" : ""} 
                    ${index < 10 ? "text-[#0D4715]" : "text-[#E9762B]"}`}
                >
                  {char}
                </motion.span>
              ))}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="h-1 md:h-1.5 w-full bg-gradient-to-r from-[#0D4715] via-[#E9762B] to-transparent mt-1 rounded-full opacity-60"
              />
            </div>

            <span className="inline-flex items-center gap-2 py-1 px-2 md:px-3 rounded-full bg-[#0D4715]/5 text-[#0D4715] font-black tracking-widest uppercase text-[8px] md:text-[9px] mb-4 md:mb-8 border border-[#0D4715]/10 backdrop-blur-sm mx-auto lg:mx-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E9762B] animate-pulse" />
              {heroContent.tagline}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-[#0D4715] leading-[1.1] tracking-tighter uppercase max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              Your trusted partner in <span className="text-[#E9762B] italic">Logistics Solutions For F&B'S.</span>
            </h1>
          </motion.div>
        </div>

        {/* Right Side: Description & CTA */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-start gap-6 md:gap-8"
          >
            <p className="text-base sm:text-lg md:text-xl text-[#274d2a] leading-relaxed font-semibold border-l-4 border-[#E9762B] pl-4 md:pl-6 max-w-lg">
              {heroContent.description}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-10 w-full sm:w-auto">
              <AnimatedButton
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("services");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else window.location.hash = "#services";
                }}
                variant="dark"
                className="w-full sm:w-auto text-[9px] sm:text-[11px] px-6 py-3"
              >
                Explore Services
              </AnimatedButton>

              {/* ← Get Quote button replaces Contact Us */}
              <AnimatedButton
                variant="light"
                className="w-full sm:w-auto text-[9px] sm:text-[11px] px-6 py-3"
                onClick={() => setQuoteOpen(true)}
              >
                Get Quote
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="absolute bottom-4 md:bottom-10 left-0 w-full opacity-20 pointer-events-none border-y border-[#0D4715]/10 py-2 md:py-4 bg-[#0D4715]/5 backdrop-blur-sm">
        <div className="flex whitespace-nowrap overflow-hidden text-[#0D4715] font-black text-3xl sm:text-4xl md:text-6xl lg:text-8xl uppercase tracking-tighter">
          <InfiniteMarquee
            items={["Efficiency", "Reliability", "Global Reach", "Speed"]}
            duration={30}
            className=""
            textClass="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-[#0D4715] uppercase tracking-tighter"
            gap="gap-6 md:gap-12"
          />
        </div>
      </div>

      {/* Right Side Decorative Line */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:block">
        <div className="h-64 w-[1px] bg-gradient-to-b from-transparent via-[#E9762B]/30 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;