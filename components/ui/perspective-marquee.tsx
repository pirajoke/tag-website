"use client";

import { useEffect, useRef } from "react";

interface PerspectiveMarqueeProps {
  items: string[];
  speed?: number;
  rotateY?: number;
  rotateX?: number;
  perspective?: number;
  background?: string;
  fadeColor?: string;
  color?: string;
}

export function PerspectiveMarquee({
  items,
  speed = 1,
  rotateY = -28,
  rotateX = 8,
  perspective = 1200,
  background = "#fafafa",
  fadeColor = "#fafafa",
  color = "#171717",
}: PerspectiveMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;
    let offset = 0;

    const animate = () => {
      offset -= speed;
      if (trackRef.current) {
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (Math.abs(offset) >= halfWidth) {
          offset += halfWidth;
        }
        trackRef.current.style.transform = `translateX(${offset}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background, perspective: `${perspective}px` }}
    >
      {/* Perspective container */}
      <div
        style={{
          transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="py-16 md:py-24"
      >
        {/* Scrolling track */}
        <div ref={trackRef} className="flex items-center whitespace-nowrap will-change-transform">
          {repeated.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-block mx-6 md:mx-10 text-4xl md:text-6xl lg:text-7xl font-bold select-none"
              style={{ color }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Edge fades — left */}
      <div
        className="absolute inset-y-0 left-0 w-1/4 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${fadeColor} 0%, ${fadeColor}00 100%)`,
        }}
      />
      {/* Edge fades — right */}
      <div
        className="absolute inset-y-0 right-0 w-1/4 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to left, ${fadeColor} 0%, ${fadeColor}00 100%)`,
        }}
      />

      {/* Blur overlay left */}
      <div
        className="absolute inset-y-0 left-0 w-[30%] z-20 pointer-events-none"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)",
        }}
      />
      {/* Blur overlay right */}
      <div
        className="absolute inset-y-0 right-0 w-[30%] z-20 pointer-events-none"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          maskImage: "linear-gradient(to left, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
