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
  shortName: "CargoPanda",
  // The survey-number form from the company registration record. This is the
  // registered office and belongs only where that is the legally relevant fact
  // (legal pages, invoices). It is NOT the public NAP — see contactConfig.address.
  registeredOffice:
    "17 Sy. No 43/4 J K Halli, R.M. Nagar, Krishnarajapuram, Bangalore North, Bangalore, Karnataka, India – 560036"
};

export const heroContent = {
  tagline: "Moving Forward!!!",
  title: "Cold Chain & Last-Mile Logistics for F&B Brands",
  description: "CargoPanda Logistics is a tech-driven logistics company focused on innovation, efficiency, reliability, and sustainability. From Intracity to Intercity and cold chain solutions, CargoPanda keeps your cargo moving forward with real-time visibility and dedicated support.",
};

export const aboutContent = {
  brandStory: "CargoPanda began with a simple idea: logistics should be as smart and agile as the businesses it serves. Built by a team of technology and supply chain professionals, CargoPanda blends on-ground expertise with data-driven decision-making to solve complex logistics challenges. From supporting F&B brands with reliable first and last mile delivery to orchestrating Q-Commerce shipments and temperature sensitive perishables, CargoPanda has grown into a trusted partner across the F&B sector.",
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

  // CANONICAL PUBLIC ADDRESS — must match the Google Business Profile exactly,
  // character for character. Google matches a website to a GBP listing by
  // comparing name, address and phone; any difference weakens that association.
  //
  // This is the postal/navigable form that Google has geocoded, not the
  // survey-number form from the registration record. For the registered office
  // see companyDetails.registeredOffice.
  //
  // If you change this, you must also update:
  //   · the LocalBusiness JSON-LD in index.html
  //   · the Google Business Profile
  //   · every directory listing (IndiaMART, Justdial, LinkedIn, ...)
  address: "17 Nai Punya Layout, Anandapura Circle, Bengaluru, Karnataka 560036, India",

  // Structured form of the same address, used to build the JSON-LD.
  addressParts: {
    street: "17 Nai Punya Layout, Anandapura Circle",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "560036",
    country: "IN"
  }
};
