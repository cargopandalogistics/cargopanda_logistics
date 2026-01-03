import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Mail, MapPin, Phone, LinkedinIcon, InstagramIcon } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { contactConfig } from "../constants";

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export default function Contact() {
  const socialLinks = [
    { icon: LinkedinIcon, href: 'https://www.linkedin.com/company/cargopanda-logistics07/', label: 'LinkedIn' },
    { icon: InstagramIcon, href: 'https://www.instagram.com/cargopandalogistics/?utm_source=qr', label: 'Instagram' },
  ];

  return (
    <SectionWrapper id="contact" className="bg-[#EBE1D1] overflow-hidden !py-0 !lg:py-0 my-0">
      <motion.div className="mx-auto max-w-7xl px-4 md:px-6" initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
        
        {/* Header Section */}
        <motion.div variants={fadeInUp} className="mb-0 text-center md:text-left">
          <span className="text-[#41644A] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-2 block">Get in touch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0D4715] tracking-tighter mb-2 md:mb-3 uppercase">Contact Us</h2>
          <p className="text-[#41644A] text-sm md:text-base lg:text-lg font-medium max-w-2xl leading-relaxed">Reach out to our dedicated support team.</p>
        </motion.div>

        {/* Contact Info Grid - Mobile stacked */}
        <div className="grid md:grid-cols-3 gap-0 border border-[#41644A]/20 rounded-xl md:rounded-[2rem] overflow-hidden shadow-sm mb-6 bg-white/30 backdrop-blur-sm">
          <Box icon={Mail} title="Email" description="We respond within 24 hours." variants={fadeInUp}>
            <div className="flex flex-col items-center text-center gap-2 w-full py-6 md:py-8">
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
                <a href={`mailto:${contactConfig.servicesEmail}`} className="font-extrabold text-lg sm:text-xl md:text-2xl lg:text-xl text-[#0D4715] hover:text-[#E9762B] transition-colors break-all">{contactConfig.servicesEmail}</a>
                <CopyButton textToCopy={contactConfig.servicesEmail} />
              </div>
            </div>
          </Box>
          <Box icon={MapPin} title="Office" description="Our headquarters in Bangalore." variants={fadeInUp}>
            <div className="flex flex-col items-center text-center gap-3 w-full py-6 md:py-8 px-4">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactConfig.address)}`} target="_blank" rel="noreferrer" className="font-extrabold text-sm sm:text-base md:text-lg lg:text-xl text-[#41644A] hover:text-[#0D4715]">{contactConfig.address}</a>
            </div>
          </Box>
          <Box icon={Phone} title="Phone" description="Mon-Sat, 9am-7pm." className="md:border-r-0" variants={fadeInUp}>
            <div className="flex flex-col gap-2 items-center text-center w-full py-6">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-2xl font-extrabold text-[#0D4715]">{contactConfig?.contactPerson?.name}</span>
              <span className="text-xs md:text-sm text-[#41644A]/80 tracking-wider">{contactConfig?.contactPerson?.designation}</span>

              <div className="h-2" />

              <a href={`tel:${contactConfig.phone}`} className="font-extrabold text-xl sm:text-2xl md:text-xl text-[#0D4715] hover:text-[#E9762B] transition-colors tracking-tight mt-1">{contactConfig.phone}</a>
            </div>
          </Box>
        </div>

        {/* Social Section */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center py-6 mb-8 md:mb-12 bg-[#41644A]/10 rounded-xl md:rounded-[2rem] border border-[#41644A]/20">
          <h3 className="text-base md:text-[20px] font-bold text-[#41644A] tracking-widest mb-4 md:mb-5">Find us online</h3>
          <div className="flex justify-center items-center gap-4 md:gap-6">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} className="bg-white/80 hover:bg-[#41644A] hover:text-white text-[#41644A] p-2.5 md:p-3 rounded-full border border-[#41644A]/20 transition-all shadow-sm group">
                <link.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

function Box({ icon: Icon, title, description, className = "", children, variants }) {
  return (
    <motion.div variants={variants} className={`flex flex-col border-b md:border-r md:border-b-0 border-[#41644A]/20 ${className}`}>
      <div className="bg-[#41644A]/5 flex items-center gap-x-3 border-b border-[#41644A]/20 p-3 md:p-4">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#41644A]/10 flex items-center justify-center text-[#41644A]">
          <Icon size={14} className="md:w-4 md:h-4" />
        </div>
        <h2 className="font-bold text-[10px] md:text-xs text-[#0D4715] uppercase tracking-widest">{title}</h2>
      </div>
      <div className="flex grow items-center p-4 md:p-6 py-6 md:py-8">{children}</div>
      <div className="border-t border-[#41644A]/10 p-2.5 md:p-3 bg-white/10">
        <p className="text-[#41644A]/60 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{description}</p>
      </div>
    </motion.div>
  );
}

function CopyButton({ textToCopy }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => { await navigator.clipboard.writeText(textToCopy); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <button onClick={handleCopy} className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-300">
      {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
    </button>
  );
}
