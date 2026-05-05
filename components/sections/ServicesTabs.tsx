"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { services } from "@/lib/data";

const TABS = services.slice(0, 5).map((s, i) => ({
  id: String(i + 1).padStart(2, "0"),
  slug: s.slug,
  title: s.title,
  description: s.shortDescription,
  image: [
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop&q=80",
  ][i],
}));

const AUTO_PLAY_DURATION = 5000;

export function ServicesTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % TABS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + TABS.length) % TABS.length);
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, AUTO_PLAY_DURATION);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const variants = {
    enter: (d: number) => ({ y: d > 0 ? "-100%" : "100%", opacity: 0 }),
    center: { zIndex: 1, y: 0, opacity: 1 },
    exit: (d: number) => ({ zIndex: 0, y: d > 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="w-full px-6 md:px-12 xl:px-20 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Tabs */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
            <div className="mb-10">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
                How We Can Help
              </h2>
              <span className="text-[10px] font-semibold text-gold uppercase tracking-[0.3em] block mt-2 ml-0.5">
                (Services)
              </span>
            </div>

            <div className="flex flex-col">
              {TABS.map((tab, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(index)}
                    className={`group relative flex items-start gap-4 py-6 md:py-7 text-left transition-all duration-500 border-t border-navy/10 first:border-0 ${
                      isActive ? "text-navy" : "text-navy/30 hover:text-navy/70"
                    }`}
                  >
                    {/* Progress bar */}
                    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-navy/10">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className="absolute top-0 left-0 w-full bg-gold origin-top"
                          initial={{ height: "0%" }}
                          animate={isPaused ? { height: "0%" } : { height: "100%" }}
                          transition={{ duration: AUTO_PLAY_DURATION / 1000, ease: "linear" }}
                        />
                      )}
                    </div>

                    <span className="text-[9px] md:text-[10px] font-medium mt-1.5 tabular-nums opacity-50">
                      /{tab.id}
                    </span>

                    <div className="flex flex-col gap-2 flex-1">
                      <span
                        className={`text-xl md:text-2xl lg:text-3xl font-serif font-bold tracking-tight transition-colors duration-500 ${
                          isActive ? "text-navy" : ""
                        }`}
                      >
                        {tab.title}
                      </span>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-steel text-sm md:text-base leading-relaxed max-w-sm pb-1">
                              {tab.description}
                            </p>
                            <Link
                              href={`/services/${tab.slug}`}
                              className="inline-block text-gold text-sm font-semibold uppercase tracking-wider hover:text-navy transition-colors mt-2"
                            >
                              Learn More &rarr;
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>

            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors uppercase tracking-wider"
            >
              View All Services &rarr;
            </Link>
          </div>

          {/* Right: Image */}
          <div className="lg:col-span-7 flex flex-col justify-end h-full order-1 lg:order-2">
            <div
              className="relative group/gallery"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-[4/5] md:aspect-[4/3] lg:aspect-[16/11] rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-navy/5 border border-navy/10">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 260, damping: 32 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={handleNext}
                  >
                    <img
                      src={TABS[activeIndex].image}
                      alt={TABS[activeIndex].title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                  </motion.div>
                </AnimatePresence>

                {/* Nav arrows */}
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md border border-navy/10 flex items-center justify-center text-navy hover:bg-white transition-all active:scale-90"
                    aria-label="Previous"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md border border-navy/10 flex items-center justify-center text-navy hover:bg-white transition-all active:scale-90"
                    aria-label="Next"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
