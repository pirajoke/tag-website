"use client";

import { useEffect, useRef, useState } from "react";
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
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const index = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) {
          setActiveIndex((current) => (current === index ? current : index));
        }
      },
      {
        root: null,
        rootMargin: "-28% 0px -38% 0px",
        threshold: [0.25, 0.45, 0.65],
      }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white pb-8 pt-8 md:pb-12 md:pt-10 lg:pt-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-12 lg:gap-8 xl:px-16">
        <div className="lg:col-span-5">
          <div className="mb-6 lg:sticky lg:top-28 lg:z-10 lg:bg-white lg:pb-4">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-navy md:text-4xl lg:text-5xl">
              How We Can Help
            </h2>
            <span className="mt-2 block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
              (Services)
            </span>
          </div>

          <div className="relative flex flex-col border-l border-navy/10 pl-5 md:pl-7">
            {TABS.map((tab, index) => (
              <div
                key={tab.id}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                data-index={index}
                className={`group relative flex min-h-[28vh] flex-col justify-center border-t border-navy/10 py-5 text-left first:border-t-0 md:min-h-[31vh] md:py-6 lg:min-h-[36vh] ${
                  activeIndex === index
                    ? "text-navy"
                    : "text-navy/28"
                }`}
              >
                <span
                  className={`absolute bottom-0 left-[-21px] top-0 w-[2px] transition-colors duration-300 md:left-[-33px] ${
                    activeIndex === index ? "bg-gold" : "bg-transparent"
                  }`}
                />

                <div className="flex items-start gap-3 md:gap-4">
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
                        <p className="max-w-sm pt-2 text-sm leading-relaxed text-steel md:text-base">
                          {tab.description}
                        </p>
                        <Link
                          href={`/services/${tab.slug}`}
                          className="mt-3 inline-block text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:text-navy"
                        >
                          Learn More &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:text-gold"
          >
            View All Services &rarr;
          </Link>
        </div>

        <div className="lg:col-span-7 lg:-ml-4 lg:pt-6 xl:-ml-8">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-navy/10 bg-navy/5 md:aspect-[4/3] lg:sticky lg:top-32 lg:aspect-[16/10] lg:rounded-[2.5rem]">
            {TABS.map((tab, index) => (
              <div
                key={tab.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
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
              <div className="flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-2 shadow-lg">
                <div className="h-2 w-2 rounded-full bg-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-navy">
                  {TABS[activeIndex].title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
