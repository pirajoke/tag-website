"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface LogoItem {
  name: string;
  src?: string;
}

interface AnimatedCarouselProps {
  title?: string;
  logos: LogoItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  itemsPerViewMobile?: number;
  itemsPerViewDesktop?: number;
}

export function AnimatedCarousel({
  title,
  logos,
  autoPlay = true,
  autoPlayInterval = 3000,
  itemsPerViewMobile = 3,
  itemsPerViewDesktop = 5,
}: AnimatedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(itemsPerViewDesktop);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const update = () =>
      setItemsPerView(
        window.innerWidth < 768 ? itemsPerViewMobile : itemsPerViewDesktop
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [itemsPerViewMobile, itemsPerViewDesktop]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % logos.length);
  }, [logos.length]);

  useEffect(() => {
    if (!autoPlay) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, next]);

  const getVisibleLogos = () => {
    const visible: { logo: LogoItem; index: number }[] = [];
    for (let i = 0; i < itemsPerView; i++) {
      const idx = (currentIndex + i) % logos.length;
      visible.push({ logo: logos[idx], index: idx });
    }
    return visible;
  };

  return (
    <div className="w-full">
      {title && (
        <p className="text-center text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-10">
          {title}
        </p>
      )}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex items-center justify-center gap-2 md:gap-4 px-8">
          <AnimatePresence mode="popLayout">
            {getVisibleLogos().map(({ logo, index }) => (
              <motion.div
                key={`${logo.name}-${index}`}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex-1 min-w-0 flex items-center justify-center px-3 py-5 md:px-6 md:py-6"
              >
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-10 md:h-14 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                ) : (
                  <span className="text-navy/50 font-semibold text-xs md:text-sm text-center whitespace-nowrap hover:text-navy transition-colors duration-300">
                    {logo.name}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
