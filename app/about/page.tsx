"use client";

import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { team, timeline } from "@/lib/data";

export default function AboutPage() {
  return (
    <>
      <Hero
        title="Together We Make It Happen"
        subtitle="Three and a half decades of institutional knowledge, trust, and results."
        compact
      />

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Our Mission
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy leading-relaxed">
            We are a diverse team of individuals with a broad mix of creative
            and strategic abilities, united by a commitment to delivering results
            for our clients.
          </h2>
          <div className="mt-6 w-16 h-0.5 bg-gold mx-auto" />
        </div>
      </section>

      <section className="py-24 bg-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Our Journey</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy">35 Years of Impact</h2>
            <div className="mt-4 w-16 h-0.5 bg-gold mx-auto" />
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/30 hidden md:block" />
            <div className="space-y-12 md:space-y-0">
              {timeline.map((item, i) => (
                <motion.div key={item.year} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className={`relative md:flex md:items-center md:mb-16 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-gold font-serif text-3xl font-bold">{item.year}</span>
                    <h3 className="mt-2 font-serif text-xl font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 text-steel text-sm leading-relaxed">{item.description}</p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-ivory" />
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team — cnippet style */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Decorative SVG */}
        <svg
          className="absolute right-0 bottom-0 text-navy/5"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip_team)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip_team">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header */}
          <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center px-6 text-center">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-navy">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>

            <h2 className="relative mb-4 font-serif text-4xl font-bold text-navy tracking-tight sm:text-5xl">
              Our Leadership Team
              <svg
                className="absolute -top-2 -right-8 -z-10 w-24 text-gold/20"
                fill="currentColor"
                height="86"
                viewBox="0 0 108 86"
                width="108"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="28"
                />
              </svg>
            </h2>
            <p className="max-w-2xl text-steel">
              A diverse team bringing creative and strategic abilities together
              to deliver results for our clients since 1990.
            </p>
          </div>

          {/* Marquee */}
          <div className="relative w-full">
            <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

            <div className="flex animate-marquee gap-6">
              {[...team, ...team, ...team, ...team].map((member, i) => (
                <div key={`${member.name}-${i}`} className="group flex w-64 shrink-0 flex-col">
                  <div className="relative h-[22rem] w-full overflow-hidden rounded-2xl bg-navy/10">
                    {/* Placeholder portrait — initials on gradient bg */}
                    <div className="absolute inset-0 bg-gradient-to-b from-navy-light to-navy flex items-center justify-center grayscale transition-all duration-300 group-hover:grayscale-0">
                      <span className="text-gold/30 font-serif text-8xl font-bold select-none">
                        {member.name.split(" ").map((n: string) => n[0]).join("")}
                      </span>
                    </div>

                    {/* Frosted glass name overlay */}
                    <div className="absolute bottom-0 w-full bg-white/85 backdrop-blur-sm p-3">
                      <h3 className="font-semibold text-navy text-base">
                        {member.name}
                      </h3>
                      <p className="text-steel text-sm">
                        {member.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured quote */}
          <div className="mx-auto mt-20 max-w-3xl px-6 text-center">
            <p className="mb-8 font-serif text-lg text-navy leading-relaxed md:text-xl italic">
              &ldquo;What sets us apart is the institutional knowledge and trust
              we&apos;ve cultivated over three and a half decades. We don&apos;t
              just know the political landscape — we&apos;re embedded within
              it.&rdquo;
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-navy flex items-center justify-center">
                <span className="text-gold font-serif text-lg font-bold">SL</span>
              </div>
              <div className="text-center">
                <p className="font-semibold text-navy">Scott Levenson</p>
                <p className="text-steel text-sm">President & Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-6">Recognition</p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white px-8 py-6 border border-navy/5 rounded-xl">
              <span className="text-gold font-serif text-3xl font-bold">#14</span>
              <p className="mt-2 text-navy text-sm font-medium">City & State Political Consultants Power 75</p>
              <p className="text-steel text-xs mt-1">2021</p>
            </div>
            <div className="bg-white px-8 py-6 border border-navy/5 rounded-xl">
              <span className="text-gold font-serif text-3xl font-bold">35+</span>
              <p className="mt-2 text-navy text-sm font-medium">Years in NYC Politics</p>
              <p className="text-steel text-xs mt-1">Since 1990</p>
            </div>
            <div className="bg-white px-8 py-6 border border-navy/5 rounded-xl">
              <span className="text-gold font-serif text-3xl font-bold">$16M+</span>
              <p className="mt-2 text-navy text-sm font-medium">Annual Revenue</p>
              <p className="text-steel text-xs mt-1">2026</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
