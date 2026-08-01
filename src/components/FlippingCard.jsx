import React from "react";

export function FlippingCard({
  className = "",
  frontContent,
  backContent,
  // Height is a CSS class rather than a number so the correct value applies at
  // every breakpoint from the first paint. It used to be computed from
  // window.innerWidth, which has no meaning during the build-time prerender —
  // every card shipped at its desktop height and then snapped on mobile.
  heightClass = "h-[400px] sm:h-[450px] lg:h-[550px]",
  width = "100%",
}) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  // Hover-to-flip is a pointer affordance; on touch devices the tap handler
  // covers it. A media query answers this without reading window during render.
  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <div
      className={`group/flipping-card [perspective:2000px] ${className}`}
      style={{ "--width": typeof width === "number" ? `${width}px` : width }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => canHover() && setIsFlipped(true)}
      onMouseLeave={() => canHover() && setIsFlipped(false)}
    >
      <div className={`relative rounded-2xl md:rounded-[2.5rem] transition-all duration-700 [transform-style:preserve-3d] ${heightClass} w-[var(--width)] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)] overflow-hidden shadow-2xl">
          {/* This wrapper provides the 3D Depth */}
          {/* NB: these className strings used to end with a stray backslash
              (`justify-center\`), which Tailwind cannot match — so the class was
              silently dropped and the content was never actually centred. */}
          <div className="[transform:translateZ(60px)] md:[transform:translateZ(80px)] h-full w-full flex items-center justify-center">
            {frontContent}
          </div>
        </div>

        {/* Back Face */}
        {/* overflow-hidden mirrors the front face, which already had it. Its
            absence here is why long back-face copy escaped the card outline on
            mobile rather than being clipped by it. */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-white border border-slate-100 [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden shadow-2xl">
          {/* translateZ(100px) makes the text "pop" out toward the user */}
          <div className="[transform:translateZ(80px)] md:[transform:translateZ(100px)] h-full w-full flex items-center justify-center">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}