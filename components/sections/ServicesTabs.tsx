"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

export function ServicesTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;

    const updateActive = () => {
      frame = 0;
      if (window.innerWidth < 1024) return;

      const rect = section.getBoundingClientRect();
      const range = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / range));
      const nextIndex = Math.min(
        TABS.length - 1,
        Math.floor(progress * TABS.length)
      );
      setActiveIndex(nextIndex);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white pt-8 pb-14 md:pt-10 lg:h-[500vh] lg:py-0">
      <div className="w-full px-6 md:px-12 xl:px-20 mx-auto max-w-7xl lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-8 lg:mb-10">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
                How We Can Help
              </h2>
              <span className="text-[10px] font-semibold text-gold uppercase tracking-[0.3em] block mt-2 ml-0.5">
                (Services)
              </span>
            </div>

            <div className="relative flex flex-col border-l border-navy/10 pl-5 md:pl-8 lg:min-h-[520px] lg:justify-center">
              {TABS.map((tab, index) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative border-t border-navy/10 py-5 text-left first:border-t-0 md:py-6 lg:py-7 ${
                    activeIndex === index ? "text-navy" : "text-navy/25 hover:text-navy/50"
                  }`}
                >
                  <span
                    className={`absolute bottom-0 left-[-21px] top-0 w-[2px] transition-colors duration-300 md:left-[-33px] ${
                      activeIndex === index ? "bg-gold" : "bg-transparent"
                    }`}
                  />

                  <div className="flex items-start gap-4">
                    <span className="mt-2 text-[10px] font-medium tabular-nums opacity-50">
                      /{tab.id}
                    </span>
                    <div className="flex-1">
                      <span className="block font-serif text-2xl font-bold tracking-tight transition-colors duration-300 md:text-3xl">
                        {tab.title}
                      </span>
                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          activeIndex === index
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-sm pt-3 text-sm leading-relaxed text-steel md:text-base">
                            {tab.description}
                          </p>
                          <Link
                            href={`/services/${tab.slug}`}
                            className="mt-4 inline-block text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:text-navy"
                          >
                            Learn More &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Link
              href="/services"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors uppercase tracking-wider"
            >
              View All Services &rarr;
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-navy/10 bg-navy/5 md:aspect-[4/3] lg:h-[62vh] lg:min-h-[460px] lg:max-h-[640px] lg:aspect-auto lg:rounded-[2.5rem]">
              {TABS.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    activeIndex === index
                      ? "scale-100 opacity-100"
                      : "scale-105 opacity-0"
                  }`}
                >
                  <Image
                    src={tab.image}
                    alt={tab.title}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-6 left-6 z-20 md:bottom-8 md:left-8">
                <div className="flex items-center gap-2 rounded-full border border-navy/10 bg-white/85 px-4 py-2 shadow-lg backdrop-blur-md">
                  <div className="h-2 w-2 rounded-full bg-gold" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-navy">
                    {TABS[activeIndex].title}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 z-20 md:bottom-8 md:right-8">
                <div className="flex items-center gap-1.5 rounded-full border border-navy/10 bg-white/85 px-3 py-2 shadow-lg backdrop-blur-md">
                  <span className="text-[11px] font-bold tabular-nums text-navy">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] text-steel">/</span>
                  <span className="text-[11px] tabular-nums text-steel">
                    {String(TABS.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
