"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { careers } from "@/lib/data";

export default function CareersPage() {
  return (
    <>
      <Hero title="Join Our Team" subtitle="Build your career at one of New York's most respected political consulting firms." compact />
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Life at TAG</p>
              <h2 className="font-serif text-3xl font-bold text-navy md:text-5xl">
                Where Careers Launch
              </h2>
              <div className="mt-3 w-12 h-0.5 bg-gold" />
              <div className="mt-8 grid gap-3">
                {careers.culture.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl border border-navy/5 bg-ivory/45 px-5 py-4"
                  >
                    <span className="mt-1 text-gold">&#9670;</span>
                    <p className="text-steel">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-navy/10 bg-ivory p-10 text-center shadow-[0_24px_70px_rgba(42,33,24,0.10)]">
                <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gold/15" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-white/70" />
                <div className="relative">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                    Glassdoor
                  </p>
                  <span className="mt-4 block font-serif text-7xl font-bold leading-none text-gold">
                    {careers.internship.rating}
                  </span>
                  <p className="mt-2 text-lg font-semibold text-navy">out of 5.0</p>
                  <p className="mt-1 text-sm text-steel">Glassdoor Rating</p>
                  <div className="mt-5 flex justify-center gap-1">
                    {[1,2,3,4,5].map((star) => (<span key={star} className={`text-2xl ${star <= Math.round(careers.internship.rating) ? "text-gold" : "text-steel/30"}`}>★</span>))}
                  </div>
                  <div className="mx-auto mt-6 h-px w-20 bg-gold/40" />
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-steel/60">
                    26% above industry average
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-ivory">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Opportunities</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy">Open Positions</h2>
            <div className="mt-4 w-16 h-0.5 bg-gold mx-auto" />
          </div>
          <div className="space-y-4">
            {careers.openPositions.map((pos, i) => {
              const isInternship = pos.type === "Internship";

              return (
              <motion.div key={pos.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="group rounded-2xl border border-navy/5 bg-white p-8 transition-colors hover:border-gold/30">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors">{pos.title}</h3>
                    <div className="flex gap-4 mt-2"><span className="text-steel text-sm">{pos.type}</span><span className="text-steel/30">&mdash;</span><span className="text-steel text-sm">{pos.location}</span></div>
                  </div>
                  <Link href="/contact" className="bg-gold hover:bg-gold/90 text-navy px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors flex-shrink-0 text-center">Apply</Link>
                </div>
                <p className="mt-4 text-steel text-sm leading-relaxed">{pos.description}</p>
                {isInternship && (
                  <div className="mt-6 border-t border-navy/10 pt-6">
                    <p className="text-sm leading-relaxed text-steel">
                      {careers.internship.description}
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {careers.internship.activities.map((activity) => (
                        <div
                          key={activity}
                          className="flex items-center gap-3 rounded-xl bg-ivory px-4 py-3"
                        >
                          <span className="text-gold">&#9670;</span>
                          <span className="text-sm text-navy/75">{activity}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-sm italic leading-relaxed text-steel/70">
                      {careers.internship.outcomes}
                    </p>
                  </div>
                )}
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
