import {
  BarChart3,
  Car,
  CheckCircle,
  CheckCircle2,
  Factory,
  Joystick,
  Leaf, Route,
  ShieldCheck,
  Truck,
  X,
  Zap
} from "lucide-react";
import { useEffect, useState } from "react";
import { services } from "../constants";
import { FlippingCard } from "./FlippingCard";
import SectionWrapper from "./SectionWrapper";
import SpotlightCard from "./SpotlightCard";

// ── Data ──────────────────────────────────────────────────────────────────────

const whyPoints = [
  { icon: Zap,         t: "Real Time Temperature Monitoring",   desc: "Live cold-chain visibility across every shipment." },
  { icon: Leaf,        t: "Eco-Friendly Logistics",             desc: "Greener routes, lower emissions, better planet." },
  { icon: ShieldCheck, t: "Dedicated Support Teams",            desc: "24/7 experts at your side, always." },
  { icon: Route,       t: "Route Optimization & Trip Planning", desc: "AI-powered paths that save time and fuel." },
  { icon: BarChart3,   t: "Scalable Model for Business Growth", desc: "Grows with you from startup to enterprise." },
];

const driverPoints = [
  { icon: Joystick, t: "Join Us",           desc: "Grow your earnings by providing full-time transport solutions with a trusted partner." },
  { icon: Car,      t: "Why Drive With Us", desc: "Excellent opportunities. Transparent on-time payments. Better earnings. Hassle-free operations." },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const ServiceContent = ({ service }) => (
  <div className="flex flex-col h-full p-6 sm:p-8 md:p-10 lg:p-12 text-center items-center justify-center">
    <div className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-xl mb-6 md:mb-8 ${service.id === 'b2c' ? 'bg-[#E9762B]' : 'bg-[#41644A]'}`}>
      {service.id === "b2c"
        ? <Truck className="w-7 h-7 md:w-10 md:h-10" />
        : <Factory className="w-7 h-7 md:w-10 md:h-10" />}
    </div>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 md:mb-4 text-[#0D4715] tracking-tighter uppercase leading-none">{service.title}</h3>
    <p className="text-[#41644A] mb-4 md:mb-8 text-sm md:text-base leading-relaxed font-semibold">{service.desc}</p>
    {/* The intercity card's bullets run to ~140 characters, roughly five times
        the other card's. Uppercase + widest tracking made them wrap far enough
        to spill outside the fixed-height card on mobile. Tighter tracking and
        top-aligned icons keep multi-line bullets inside the card. */}
    <ul className="space-y-2.5 md:space-y-4 text-left w-full">
      {service.points.map((p, idx) => (
        <li key={idx} className="flex items-start gap-2 md:gap-3 text-[11px] md:text-sm font-black text-[#0D4715] uppercase tracking-wide md:tracking-widest leading-snug">
          <CheckCircle2 className="text-[#41644A] w-4 h-4 md:w-5 md:h-5 shrink-0 mt-px" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  </div>
);

const FeatureCard = ({ icon: Icon, t, desc }) => (
  <div className="group flex gap-4 items-start p-5 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10">
    <div className="shrink-0 w-12 h-12 rounded-xl bg-[#41644A]/50 flex items-center justify-center text-[#E9762B] group-hover:bg-[#E9762B]/20 transition-colors duration-300">
      <Icon size={22} strokeWidth={1.8} />
    </div>
    <div className="min-w-0">
      <h4 className="text-sm md:text-base font-black uppercase tracking-wide text-white mb-1 leading-tight">{t}</h4>
      <p className="text-[#a3b89a] text-xs md:text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const Divider = () => (
  <div className="flex items-center gap-4 my-10 md:my-14">
    <div className="flex-1 h-px bg-white/10" />
    <div className="w-2 h-2 rounded-full bg-[#E9762B]/60" />
    <div className="w-2 h-2 rounded-full bg-[#E9762B]/30" />
    <div className="w-2 h-2 rounded-full bg-[#E9762B]/60" />
    <div className="flex-1 h-px bg-white/10" />
  </div>
);

// ── Join Us Modal ─────────────────────────────────────────────────────────────

const Modal = ({ open, onClose }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
      setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {  // ← Driver Partnership Form ID
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

  const Field = ({ label, id, type = "text", placeholder, half }) => (
    <div className={half ? "flex-1 min-w-0" : "w-full"}>
      <label className="block text-xs font-bold uppercase tracking-widest text-[#a3b89a] mb-1.5">{label}</label>
      <input
        id={id} type={type} placeholder={placeholder}
        value={form[id]}
        onChange={e => setForm(p => ({ ...p, [id]: e.target.value }))}
        required
        className="w-full bg-[#0D4715]/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#E9762B]/60 focus:bg-[#0D4715]/80 transition-all"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
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
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
          >
            <X size={15} />
          </button>

          {submitted ? (
            <div className="py-10 flex flex-col items-center text-center gap-4">
              <CheckCircle size={52} className="text-[#E9762B]" strokeWidth={1.4} />
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">We'll Be In Touch!</h3>
              <p className="text-[#a3b89a] text-sm max-w-xs">Thanks for reaching out. Our driver partnership team will contact you shortly.</p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-2.5 bg-[#E9762B] text-white text-sm font-bold rounded-xl hover:bg-[#d4661f] transition-colors uppercase tracking-wide"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-[#E9762B] text-xs font-bold uppercase tracking-widest mb-1">Driver Partnership</p>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Join CargoPanda</h3>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <Field label="First Name" id="firstName" placeholder="First Name"  half />
                  <Field label="Last Name"  id="lastName"  placeholder="Last Name" half />
                </div>
                <Field label="Email Address" id="email" type="email" placeholder="email@example.com" />
                <Field label="Phone Number"  id="phone" type="tel"   placeholder="+91 0000000000" />
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#a3b89a] mb-1.5">Message</label>
                  <textarea
                    placeholder="Tell us about your vehicle and experience..."
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
                  {loading ? "Submitting…" : "Submit Application"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <SectionWrapper id="services" className="bg-[#EBE1D1]">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Section header */}
      <div className="text-center mb-12 md:mb-20 px-4">
        <span className="text-[#41644A] font-black uppercase tracking-[0.3em] text-[9px] md:text-xs mb-3 md:mb-4 block">Moving Forward!!!</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-[#0D4715] mb-4 md:mb-6 tracking-tighter uppercase">Our Services</h2>
        <p className="text-[#41644A] text-sm md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-bold">
          Predictable performance and seamless customer experience through tech-first logistics solutions.
        </p>
      </div>

      {/* Service cards */}
      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24 px-4">
        {services.map((service, i) => {
          if (i < 2) {
            return (
              <FlippingCard
                key={i}
                heightClass="h-[520px] sm:h-[480px] lg:h-[550px]"
                frontContent={
                  <div className="relative h-full w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden group">
                    {/* WebP at 1400px. These were 2624px PNGs weighing 6.3 MB and
                        5.4 MB — together the entire 12 MB page payload Lighthouse
                        flagged, for images displayed at roughly 550px tall.
                        Explicit width/height let the browser reserve space before
                        the image loads, which keeps layout shift down. */}
                    <img
                      src={`/images/${service.id}.webp`}
                      alt={service.title}
                      width="1400"
                      height="871"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D4715]/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-12">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none">{service.title}</h3>
                      <p className="text-[#E9762B] font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] mt-3 md:mt-4 opacity-80">Hover to Discover</p>
                    </div>
                  </div>
                }
                backContent={<ServiceContent service={service} />}
              />
            );
          }
          return (
            <SpotlightCard key={i} className="rounded-2xl md:rounded-[2.5rem] h-full bg-white/50 border border-[#41644A]/10">
              <ServiceContent service={service} />
            </SpotlightCard>
          );
        })}
      </div>

      {/* Why Choose + Driver Partnership dark card */}
      <div className="bg-[#0D4715] rounded-2xl md:rounded-[3.5rem] p-6 sm:p-10 md:p-14 lg:p-20 text-white overflow-hidden relative shadow-2xl mx-4">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 80% 10%, #7dbe6a 0%, transparent 60%), radial-gradient(circle at 10% 90%, #41644A 0%, transparent 50%)" }}
        />

        <div className="relative z-10">

          {/* ── Why Choose CargoPanda ── */}
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block text-[#E9762B] text-xs font-bold uppercase tracking-[0.25em] mb-3">Our Advantages</span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">Why Choose CargoPanda?</h3>
          </div>

          {/* Single column on mobile, 2 cols on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {whyPoints.map((item, idx) => (
              <FeatureCard key={idx} {...item} />
            ))}
          </div>

          <Divider />

          {/* ── Driver Partnership ── */}
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block text-[#E9762B] text-xs font-bold uppercase tracking-[0.25em] mb-3">Opportunities</span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">Driver Partnership</h3>
          </div>

          {/* Single column on mobile, 2 cols on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-12">
            {driverPoints.map((item, idx) => (
              <FeatureCard key={idx} {...item} />
            ))}
          </div>

          {/* ── CTA Button ── */}
          <div className="flex justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="px-10 py-4 bg-[#E9762B] hover:bg-[#d4661f] text-white font-black uppercase tracking-widest rounded-2xl text-sm transition-all duration-200 shadow-lg hover:shadow-[0_0_32px_rgba(233,118,43,0.4)] hover:-translate-y-0.5"
            >
              Join Us as a Driver
            </button>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;