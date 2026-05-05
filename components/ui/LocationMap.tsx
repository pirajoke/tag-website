"use client";

import type React from "react";
import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

interface LocationMapProps {
  location?: string;
  address?: string;
  coordinates?: string;
  className?: string;
}

export function LocationMap({
  location = "New York, NY",
  address = "420 Lexington Ave, Suite 1402",
  coordinates = "40.7529° N, 73.9764° W",
  className,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [6, -6]);
  const rotateY = useTransform(mouseX, [-150, 150], [-6, 6]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isExpanded) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div className={className || ""}>
      <motion.div
        ref={containerRef}
        className="relative cursor-pointer select-none w-full"
        style={{ perspective: 1200 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-ivory border border-navy/10"
          style={{
            rotateX: isExpanded ? 0 : springRotateX,
            rotateY: isExpanded ? 0 : springRotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            height: isExpanded ? 420 : 220,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 35 }}
        >
          {/* Abstract map background (visible when collapsed) */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.04]">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                      <pattern id="grid-map" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" className="text-navy" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-map)" />
                  </svg>
                </div>

                {/* Abstract roads */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <line x1="0%" y1="40%" x2="100%" y2="40%" stroke="currentColor" className="text-navy/10" strokeWidth="3" />
                  <line x1="0%" y1="70%" x2="100%" y2="70%" stroke="currentColor" className="text-navy/10" strokeWidth="3" />
                  <line x1="35%" y1="0%" x2="35%" y2="100%" stroke="currentColor" className="text-navy/8" strokeWidth="2" />
                  <line x1="65%" y1="0%" x2="65%" y2="100%" stroke="currentColor" className="text-navy/8" strokeWidth="2" />
                  {[25, 50, 80].map((y, i) => (
                    <line key={`h-${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="currentColor" className="text-navy/5" strokeWidth="1" />
                  ))}
                  {[15, 50, 82].map((x, i) => (
                    <line key={`v-${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%" stroke="currentColor" className="text-navy/5" strokeWidth="1" />
                  ))}
                </svg>

                {/* Abstract buildings */}
                {[
                  { top: "20%", left: "8%", w: "12%", h: "18%" },
                  { top: "10%", left: "40%", w: "10%", h: "14%" },
                  { top: "55%", left: "72%", w: "16%", h: "20%" },
                  { top: "15%", left: "78%", w: "8%", h: "22%" },
                  { top: "60%", left: "20%", w: "14%", h: "12%" },
                  { top: "45%", left: "50%", w: "10%", h: "10%" },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="absolute rounded-sm bg-navy/10 border border-navy/5"
                    style={{ top: b.top, left: b.left, width: b.w, height: b.h }}
                  />
                ))}

                {/* Gold pin */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
                  animate={{ y: isHovered ? -4 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <div className="relative">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg" style={{ filter: "drop-shadow(0 0 12px rgba(201, 168, 76, 0.5))" }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#C9A84C" />
                      <circle cx="12" cy="9" r="2.5" fill="white" />
                    </svg>
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute top-[18px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold/20"
                      animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent opacity-50" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Google Maps iframe (visible when expanded) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1511.0!2d-73.97536!3d40.75246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2590279faaaab%3A0x3fcc07de0c5e0b4a!2s420%20Lexington%20Ave%2C%20New%20York%2C%20NY%2010170!5e0!3m2!1sen!2sus!4v1700000000000"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TAG Office — 420 Lexington Ave, Midtown Manhattan"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content overlay */}
          <div className="relative z-10 h-full flex flex-col justify-between p-5 pointer-events-none">
            {/* Top bar */}
            <div className="flex items-start justify-between">
              <motion.div
                className="flex items-center gap-2"
                animate={{ opacity: isExpanded ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold" style={{ filter: "drop-shadow(0 0 4px rgba(201, 168, 76, 0.3))" }}>
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" x2="9" y1="3" y2="18" />
                  <line x1="15" x2="15" y1="6" y2="21" />
                </svg>
              </motion.div>

              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-navy/5 shadow-sm"
                animate={{ scale: isHovered && !isExpanded ? 1.05 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] font-semibold text-navy tracking-wider uppercase">Midtown NYC</span>
              </motion.div>
            </div>

            {/* Bottom info */}
            <motion.div
              className="space-y-1"
              animate={{
                y: isExpanded ? 0 : 0,
                opacity: isExpanded ? 0 : 1,
              }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-navy font-serif font-bold text-base tracking-tight">{location}</h3>
              <p className="text-steel text-xs">{address}</p>
              <p className="text-steel/50 text-[10px] font-mono">{coordinates}</p>
              <motion.div
                className="h-px bg-gradient-to-r from-gold/50 via-gold/30 to-transparent mt-1"
                animate={{ scaleX: isHovered ? 1 : 0.4 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.div>
          </div>

          {/* Expand hint (bottom center) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-navy/10 pointer-events-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=420+Lexington+Ave+Suite+1402+New+York+NY+10170"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-navy hover:text-gold transition-colors uppercase tracking-wider"
                  onClick={(e) => e.stopPropagation()}
                >
                  Open in Google Maps
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Click to expand hint */}
        <motion.p
          className="text-center mt-3 text-[11px] text-steel/60 tracking-wide"
          animate={{ opacity: isHovered && !isExpanded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Click to view on map
        </motion.p>
      </motion.div>
    </div>
  );
}
