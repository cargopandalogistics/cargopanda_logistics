import React from "react";

export function FlippingCard({
  className = "",
  frontContent,
  backContent,
  height = 450,
  width = "100%",
}) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  return (
    <div
      className={`group/flipping-card [perspective:2000px] ${className}`}
      style={{
        "--height": `${height}px`,
        "--width": typeof width === "number" ? `${width}px` : width,
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => window.innerWidth >= 1024 && setIsFlipped(true)}
      onMouseLeave={() => window.innerWidth >= 1024 && setIsFlipped(false)}
    >
      <div className={`relative rounded-2xl md:rounded-[2.5rem] transition-all duration-700 [transform-style:preserve-3d] h-[var(--height)] w-[var(--width)] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)] overflow-hidden shadow-2xl">
          {/* This wrapper provides the 3D Depth */}
          <div className="[transform:translateZ(60px)] md:[transform:translateZ(80px)] h-full w-full flex items-center justify-center\">
            {frontContent}
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-white border border-slate-100 [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl">
          {/* translateZ(100px) makes the text "pop" out toward the user */}
          <div className="[transform:translateZ(80px)] md:[transform:translateZ(100px)] h-full w-full flex items-center justify-center\">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}