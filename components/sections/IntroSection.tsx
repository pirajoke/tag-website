"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const coreStats = [
  {
    value: 35,
    suffix: "+",
    label: "Years of Impact",
    description: "Shaping policy and winning campaigns since 1990 in New York City.",
    accent: "from-gold/20 to-gold/5",
    border: "border-gold/20",
  },
  {
    value: 500,
    suffix: "+",
    label: "Campaigns Managed",
    description: "From borough races to nationally watched political contests.",
    accent: "from-navy/10 to-navy/5",
    border: "border-navy/10",
  },
  {
    value: 16,
    prefix: "$",
    suffix: "M+",
    label: "Annual Revenue",
    description: "A leading political consulting firm with sustained growth.",
    accent: "from-gold/15 to-gold/5",
    border: "border-gold/15",
  },
  {
    value: 7,
    suffix: "",
    label: "Core Disciplines",
    description: "Lobbying, campaigns, communications, design, fundraising, grants & events.",
    accent: "from-navy/8 to-navy/3",
    border: "border-navy/8",
  },
];

function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
  start,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  start: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    const duration = 1200;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [start, value]);

  return (
    <span className="inline-block min-w-[2.1ch] tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export function IntroSection() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const stats = statsRef.current;
    if (!stats) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setAnimateStats(true);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(stats);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-5 md:pt-14 md:pb-6">
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-gold/[0.03]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-navy/[0.03]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center reveal-up">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Together, We Make It Happen
          </p>

          <h2 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-navy md:text-5xl lg:text-[3.5rem]">
            35 Years of
            <br />
            <span className="gold-underline">Delivering Results</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-steel">
            Founded and led by Scott Levenson since 1990, TAG is a diverse team
            of individuals with a broad mix of creative and strategic abilities.
            We leverage our unique experience into innovative and effective
            solutions for our clients.
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coreStats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative reveal-up"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className={`relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.accent} p-7 transition-shadow duration-300 hover:shadow-2xl hover:shadow-navy/5`}>
                <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gold/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <span className="font-serif text-5xl font-bold leading-none tracking-tight text-navy md:text-[3.5rem]">
                    <AnimatedStat
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      start={animateStats}
                    />
                  </span>
                  <div className="mb-2 mt-3 h-[2px] w-8 bg-gold" />
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy/60">
                    {stat.label}
                  </p>
                </div>

                <p className="relative z-10 mt-auto pt-4 text-sm leading-relaxed text-navy/50">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative left-1/2 mt-14 flex w-[100vw] -translate-x-1/2 justify-center reveal-up">
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:text-navy"
          >
            <span>Learn Our Story</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
