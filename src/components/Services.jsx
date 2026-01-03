import React from "react";
import SectionWrapper from "./SectionWrapper";
import SpotlightCard from "./SpotlightCard";
import { FlippingCard } from "./FlippingCard";
import { services } from "../constants";
import { CheckCircle2, Truck, Factory, ShieldCheck, Zap, BarChart3, Leaf } from "lucide-react";

const ServiceContent = ({ service }) => (
  <div className="flex flex-col h-full p-6 sm:p-8 md:p-10 lg:p-12 text-center items-center justify-center">
    <div className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-xl mb-6 md:mb-8 ${service.id === 'b2c' ? 'bg-[#E9762B]' : 'bg-[#41644A]'}`}>
      {service.id === "b2c" ? <Truck size={window.innerWidth < 768 ? 28 : 40} /> : <Factory size={window.innerWidth < 768 ? 28 : 40} />}
    </div>
    <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 md:mb-4 text-[#0D4715] tracking-tighter uppercase leading-none">{service.title}</h3>
    <p className="text-[#41644A] mb-6 md:mb-8 text-sm md:text-base leading-relaxed font-semibold">{service.desc}</p>
    <ul className="space-y-3 md:space-y-4">
      {service.points.map((p, idx) => (
        <li key={idx} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-black text-[#0D4715] uppercase tracking-widest">
          <CheckCircle2 className="text-[#41644A] w-4 h-4 md:w-5 md:h-5 shrink-0" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Services = () => {
  return (
    <SectionWrapper id="services" className="bg-[#EBE1D1]">
      <div className="text-center mb-12 md:mb-20 px-4">
        <span className="text-[#41644A] font-black uppercase tracking-[0.3em] text-[9px] md:text-xs mb-3 md:mb-4 block">Moving Forward!!!</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-[#0D4715] mb-4 md:mb-6 tracking-tighter uppercase">Our Services</h2>
        <p className="text-[#41644A] text-sm md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-bold">
          Predictable performance and seamless customer experience through tech-first logistics solutions.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24 px-4">
        {services.map((service, i) => {
          if (i < 2) {
            return (
              <FlippingCard
                key={i} 
                height={window.innerWidth < 640 ? 400 : window.innerWidth < 1024 ? 450 : 550}
                frontContent={
                  <div className="relative h-full w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden group">
                    <img src={`/images/${service.id}.png`} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
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

      <div className="bg-[#0D4715] rounded-2xl md:rounded-[3.5rem] p-6 sm:p-8 md:p-12 lg:p-20 text-white overflow-hidden relative shadow-2xl mx-4">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_#41644A,_transparent)]"></div>
        <div className="relative z-10 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 tracking-tighter uppercase">Why Choose CargoPanda?</h3>
            <p className="text-[#EBE1D1]/70 text-sm md:text-base lg:text-lg mb-8 md:mb-12 font-medium leading-relaxed">
              Built as a tech-first logistics partner, CargoPanda combines software, data, and on-ground operations to deliver performance you can measure and trust.
            </p>
            <div className="grid gap-6 md:gap-8">
              {[ 
                { icon: Zap, t: "AI-powered tracking & dispatch", d: "for intelligent routing and proactive exception handling." }, 
                { icon: BarChart3, t: "Scalable from startups to enterprises", d: "with modular services and flexible pricing." }, 
                { icon: ShieldCheck, t: "Dedicated support teams", d: "for operations, technology, and customer success." }, 
                { icon: Leaf, t: "Eco-friendly logistics", d: "through optimized routes and responsible fleet practices." } 
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl bg-[#41644A]/40 flex items-center justify-center text-[#E9762B] shrink-0">
                    <item.icon size={window.innerWidth < 768 ? 20 : 28}/>
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg lg:text-xl font-black uppercase tracking-tight mb-1 md:mb-2">{item.t}</h4>
                    <p className="text-slate-400 text-xs md:text-sm">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compact SpotlightCard for Dashboard */}
          <div className="flex justify-center">
            <SpotlightCard className="bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/10 shadow-2xl w-full max-w-[480px]">
              <div className="p-6 md:p-8 min-h-[200px] md:min-h-[260px]">
                <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-5">
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#E9762B] animate-pulse" />
                  <span className="text-[9px] md:text-sm font-black uppercase tracking-[0.18em] text-slate-400">Live Control Tower</span>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h4 className="text-xl md:text-2xl font-black text-white mb-2">Single dashboard for your logistics.</h4>
                    <p className="text-slate-400 leading-snug font-semibold text-sm md:text-base">Track shipments, monitor SLAs, and access analytics on one unified platform.</p>
                  </div>
                  <div className="bg-[#41644A]/20 border border-white/10 p-4 md:p-5 rounded-lg">
                    <div>
                      <div className="text-base md:text-lg lg:text-xl font-black text-white mb-1 tracking-tight">Actionable insights.</div>
                      <div className="text-sm md:text-base font-medium text-slate-400 leading-snug">Identify delays, optimize routes, and improve performance with data-driven recommendations.</div>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
