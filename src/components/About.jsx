import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PerspectiveCamera } from "@react-three/drei";
import SectionWrapper from "./SectionWrapper";
import { aboutContent } from "../constants";
import Carousel from "./Carousel";
import { Shield, Zap, Heart, RefreshCcw, CheckCircle2 } from "lucide-react";

const iconMap = [
  <Heart key="heart" />, <Zap key="zap" />, <Shield key="shield" />, <RefreshCcw key="refresh" />, <CheckCircle2 key="check" />
];

function TruckModel() {
  const { scene } = useGLTF("/models/11.glb");
  
  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <primitive 
      object={scene} 
      position={[10.5, -2.2, 0]} 
      rotation={[0, -1.57, 0]} 
      scale={7.5} 
    />
  );
}

const About = () => {
  const carouselItems = aboutContent.values.map((val, i) => ({
    id: i, title: val.title, description: val.desc, icon: iconMap[i],
  }));

  // Dynamic carousel width based on screen size
  const getCarouselWidth = () => {
    if (typeof window === 'undefined') return 800;
    if (window.innerWidth < 640) return 320;
    if (window.innerWidth < 768) return 400;
    if (window.innerWidth < 1024) return 500;
    return 800;
  };

  return (
    <div className="bg-[#EBE1D1]">
      <SectionWrapper id="about" className="pb-2">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="max-w-xl px-4 md:px-0">
            <p className="text-[#E9762B] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-3 block">Our Identity</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6 text-[#0D4715] leading-tight">About CargoPanda</h2>
            <p className="border-l-4 border-[#41644A] pl-4 md:pl-6 italic text-[#41644A] text-sm md:text-base lg:text-lg leading-relaxed">
              {aboutContent.brandStory}
            </p>
          </div>
          <div className="grid gap-4 px-4 md:px-0">
            <div className="bg-white/40 p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-[#41644A]/10 shadow-sm relative overflow-hidden">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#E9762B] mb-2 block">Purpose</span>
              <p className="text-[#0D4715] font-bold text-base md:text-lg lg:text-xl leading-snug">"{aboutContent.purpose}"</p>
            </div>
            <div className="bg-[#41644A] p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-white shadow-lg shadow-[#41644A]/20">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#E9762B]/80 mb-2 block">Vision</span>
              <p className="font-bold text-base md:text-lg lg:text-xl leading-snug">"{aboutContent.vision}"</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <div className="relative pt-0 pb-4 -mt-12 md:-mt-20 bg-[#41644A]/5 overflow-hidden">
        {/* Updated Heading */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 md:mb-8 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-[#0D4715] mb-3 md:mb-4">Our Core Values</h3>
          <p className="max-w-2xl mx-auto text-[#41644A] text-sm md:text-base lg:text-lg font-medium leading-relaxed italic opacity-90">
            Delivering trust, speed, and reliability.
          </p>
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto h-[400px] sm:h-[500px] md:h-[650px] flex justify-center items-center px-2 md:px-4">
          <div className="block md:hidden absolute inset-0 z-0 flex items-center justify-center">
            <img 
              src="/models/truck-static.png" 
              alt="CargoPanda Logistics Truck" 
              className="w-full h-full object-contain opacity-30 scale-75"
            />
          </div>
          {/* 3D Model - Optimized for mobile */}
          <div className="hidden md:block absolute inset-0 z-0">
            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
              <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={18} />
              <Suspense fallback={null}>
                <Stage environment="city" intensity={0.8} contactShadow={true} adjustCamera={false}>
                  <TruckModel />
                </Stage>
              </Suspense>
            </Canvas>
          </div>
          
          {/* Carousel - Responsive positioning */}
          <div className="absolute top-[5%] sm:top-[8%] md:top-[10%] left-1/2 -translate-x-1/2 w-[95%] sm:w-[85%] md:w-[82%] h-[70%] md:h-[60%] z-10 flex items-center justify-center">
            <div style={{ height: "300px", width: "100%", display: "flex", justifyContent: "center" }} className="sm:h-[350px] md:h-[400px]">
              <Carousel items={carouselItems} baseWidth={getCarouselWidth()} autoplay={true} loop={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
