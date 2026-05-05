import { CheckCircle2, Heart, RefreshCcw, Shield, Zap } from "lucide-react";

export const navLinks = [
  { id: "home", title: "Home" },
  { id: "about", title: "About" },
  { id: "services", title: "Services" },
  { id: "contact", title: "Contact" },
];

export const companyDetails = {
  legalName: "CargoPanda Logistics (OPC) Private Limited",
  cin: "U49299KA2025OPC193533",
  incDate: "14/08/2025",
  shortName: "CargoPanda"
};

export const heroContent = {
  tagline: "Moving Forward!!!",
  title: "Your trusted partner in logistics solutions For F&B.",
  description: "CargoPanda Logistics is a tech-driven logistics company focused on innovation, efficiency, reliability, and sustainability. From Intracity to Intercity and cold chain solutions, CargoPanda keeps your cargo moving forward with real-time visibility and dedicated support.",
};

export const aboutContent = {
  brandStory: "CargoPanda began with a simple idea: logistics should be as smart and agile as the businesses it serves. Built by a team of technology and supply chain professionals, CargoPanda blends on-ground expertise with data-driven decision-making to solve complex logistics challenges. From supporting F&B's with reliable first and last mile delivery to orchestrating Q-Commerce shipments and temperature sensitive perishables, CargoPanda has grown into trusted partner across F&B'S sectors.",
  purpose: "To deliver first to mid mile logistics services with a focus on innovation, efficiency & sustainability, creating value for our customers and partners.",
  vision: "To be the preferred logistics provider, connecting businesses across the country with speed, reliability, and efficiency.",
  values: [
    { title: "Integrity & Transparency", desc: "We operate with honesty, accountability, and clear communication across every shipment.", icon: Heart },
    { title: "Innovation & Technology", desc: "We leverage advanced technology and automation to optimize operations and enhance visibility.", icon: Zap },
    { title: "Reliability & Excellence", desc: "We are committed to consistent, on-time delivery and high service standards.", icon: Shield },
    { title: "Continuous Improvement", desc: "We constantly refine our processes, tools, and training to stay ahead.", icon: RefreshCcw },
    { title: "Safety & Compliance", desc: "We prioritize safety while meeting regulatory and industry standards.", icon: CheckCircle2 }
  ]
};

export const services = [
  {
    id: "b2c",
    tag: "B2C Logistics",
    title: "Fast & Reliable Last-Mile Delivery",
    desc: "Reliable delivery with real-time tracking, ensuring every shipment reaches your destination safely and on schedule.",
    points: ["Real-time shipment tracking", "Same-day and next-day delivery", "Seamless platform integration"]
  },
  {
    id: "b2b",
    tag: "B2B Logistics",
    title: "Intra and Inter city Delivery",
    desc: "From cross-city supply runs to state-to-state freight, CargoPanda keeps your goods moving — fresh, fast, and on schedule.",
  points: [
    "INTRA CITY: Central kitchen to outlets, B2B supply chains & mother hub to dark store distribution with full cold chain support for perishables",
    "INTER CITY: Dedicated & on-demand fleet specialized in F&B long haul — reefer and ambient vehicles for seamless state-to-state transport",
  ]

  },
];

export const contactConfig = {
  phone: "+91 84310 72894",
  servicesEmail: "hemanth@cargopandalogistics.in",
  mediaEmail: "media@cargopanda.in",
  contactPerson: { name: "Hemanth A", designation: "Director" },
  address: "17 Sy. No 43/4 J K Halli, R.M. Nagar, Krishnarajapuram, Bangalore North, Bangalore, Karnataka, India – 560036"
};
