"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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

function TabItem({
  tab,
  index,
  isActive,
  onVisible,
}: {
  tab: (typeof TABS)[0];
  index: number;
  isActive: boolean;
  onVisible: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-40% 0px -40% 0px",
  });

  useEffect(() => {
    if (isInView) {
      onVisible(index);
    }
  }, [isInView, index, onVisible]);

  return (
    <div
      ref={ref}
      className={`group relative flex items-start gap-4 py-10 md:py-14 text-left transition-all duration-500 border-t border-navy/10 first:border-0 ${
        isActive ? "text-navy" : "text-navy/25"
      }`}
    >
      {/* Gold accent bar */}
      <motion.div
        className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px]"
        initial={false}
        animate={{
          backgroundColor: isActive
            ? "rgba(201, 168, 76, 1)"
            : "rgba(42, 33, 24, 0.08)",
        }}
        transition={{ duration: 0.4 }}
      />

      <span className="text-[9px] md:text-[10px] font-medium mt-2 tabular-nums opacity-50">
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
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
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
    </div>
  );
}

export function ServicesTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prevIndex = useRef(0);

  const handleVisible = React.useCallback((index: number) => {
    setDirection(index > prevIndex.current ? 1 : -1);
    prevIndex.current = index;
    setActiveIndex(index);
  }, []);

  const variants = {
    enter: (d: number) => ({ y: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { zIndex: 1, y: 0, opacity: 1 },
    exit: (d: number) => ({
      zIndex: 0,
      y: d > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="w-full px-6 md:px-12 xl:px-20 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left: Tabs — scroll driven */}
          <div className="lg:col-span-5 flex flex-col order-2 lg:order-1 pt-4">
            <div className="mb-10">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
                How We Can Help
              </h2>
              <span className="text-[10px] font-semibold text-gold uppercase tracking-[0.3em] block mt-2 ml-0.5">
                (Services)
              </span>
            </div>

            <div className="flex flex-col">
              {TABS.map((tab, index) => (
                <TabItem
                  key={tab.id}
                  tab={tab}
                  index={index}
                  isActive={activeIndex === index}
                  onVisible={handleVisible}
                />
              ))}
            </div>

            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors uppercase tracking-wider"
            >
              View All Services &rarr;
            </Link>
          </div>

          {/* Right: Sticky image */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
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
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={TABS[activeIndex].image}
                      alt={TABS[activeIndex].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                  </motion.div>
                </AnimatePresence>

                {/* Active service label */}
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md border border-navy/10 shadow-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <span className="text-[11px] font-semibold text-navy uppercase tracking-wider">
                      {TABS[activeIndex].title}
                    </span>
                  </motion.div>
                </div>

                {/* Counter */}
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20">
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/85 backdrop-blur-md border border-navy/10 shadow-lg">
                    <span className="text-[11px] font-bold text-navy tabular-nums">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] text-steel">/</span>
                    <span className="text-[11px] text-steel tabular-nums">
                      {String(TABS.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
