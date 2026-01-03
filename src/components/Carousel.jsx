import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

// REMOVED: border-[#6b6b6b]/20 from all styles
const bgStyles = [
  'bg-[#a3a2a8]',
  'bg-[#a3a2a8]',
  'bg-[#a3a2a8]',
  'bg-[#a3a2a8]',
  'bg-[#a3a2a8]'
];

function CarouselItem({ item, index, itemWidth, trackItemOffset, x, transition }) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      /* REMOVED: border and shadow-2xl */
      className={`relative shrink-0 flex flex-col items-center justify-center text-center rounded-[24px] backdrop-blur-md px-10 overflow-hidden cursor-grab active:cursor-grabbing ${bgStyles[index % bgStyles.length]}`}
      style={{
        width: itemWidth,
        height: '80%',
        rotateY: rotateY,
        transformStyle: 'preserve-3d'
      }}
      transition={transition}
    >
      {/* Icon container - kept border-white/10 for a subtle glass effect, or remove if desired */}
      <div className="mb-6 md:mb-8 flex h-[60px] w-[60px] md:h-[80px] md:w-[80px] items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 shrink-0\">
        {React.cloneElement(item.icon, { className:"h-[32px] w-[32px] md:h-[40px] md:w-[40px] text-[#0D4715]" })}
      </div>

      <div className="flex flex-col items-center">
        <h2 className="mb-3 md:mb-4 font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#0D4715] leading-none tracking-tighter uppercase\">
          {item.title}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#41644A] leading-relaxed font-medium max-w-[250px] md:max-w-[300px]\">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Carousel({
  items = [],
  baseWidth = 300,
  autoplay = true,
  autoplayDelay = 3500,
  pauseOnHover = true,
  loop = true
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;
  
  const itemsForRender = useMemo(() => {
    if (!loop || items.length === 0) return items;
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      setPosition(1);
      x.set(-trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      setPosition(items.length);
      x.set(-items.length * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction = offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD ? 1 : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD ? -1 : 0;
    if (direction === 0) return;
    setPosition(prev => Math.max(0, Math.min(prev + direction, itemsForRender.length - 1)));
  };

  const activeIndex = items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : position;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      /* Container remains hidden without bg or borders */
      className="relative overflow-hidden p-2" 
      style={{ width: `${baseWidth}px`, height: '100%' }}
    >
      <motion.div
        className="flex h-full"
        drag="x"
        onDragEnd={handleDragEnd}
        style={{ 
          width: itemWidth, 
          gap: `${GAP}px`, 
          perspective: 1000, 
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x 
        }}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      <div className="flex w-full justify-center absolute bottom-4 left-0">
        <div className="flex gap-3 items-center bg-white/60 px-4 py-2 rounded-full backdrop-blur-md">
          {items.map((_, index) => (
            <motion.div
              key={index}
              onClick={() => setPosition(loop ? index + 1 : index)}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                activeIndex === index ? 'bg-[#0D4715] w-8 h-2' : 'bg-slate-300 w-2 h-2'
              }`}
              animate={{ scale: activeIndex === index ? 1.2 : 1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}