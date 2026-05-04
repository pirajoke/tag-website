"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { clients } from "@/lib/data";

const categories = [
  { key: "political" as const, label: "Political" },
  { key: "nonprofit" as const, label: "Nonprofit" },
  { key: "corporate" as const, label: "Corporate" },
  { key: "labor" as const, label: "Labor" },
];

export default function ClientsPage() {
  const [active, setActive] = useState<keyof typeof clients>("political");

  return (
    <>
      <Hero title="Who We Work With" subtitle="Since 1990, we've represented political candidates, not-for-profits, corporations, advocacy groups, and labor unions." compact />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <button key={cat.key} onClick={() => setActive(cat.key)} className={`px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${active === cat.key ? "bg-navy text-gold" : "bg-ivory text-navy hover:bg-navy/10"}`}>{cat.label}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients[active].map((client) => (
                <div key={client} className="p-6 bg-ivory border border-navy/5 hover:border-gold/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-navy-light flex items-center justify-center flex-shrink-0">
                      <span className="text-gold font-serif text-lg font-bold">{client[0]}</span>
                    </div>
                    <span className="text-navy font-medium group-hover:text-red transition-colors">{client}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="mt-24">
            <div className="text-center mb-12">
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Success Stories</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">Featured Results</h2>
              <div className="mt-4 w-16 h-0.5 bg-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-navy p-8">
                <span className="text-gold text-sm font-semibold uppercase tracking-wider">Borough President Race</span>
                <h3 className="mt-3 font-serif text-2xl font-bold text-white">Vanessa Gibson — Bronx BP</h3>
                <p className="mt-3 text-white/60 text-sm leading-relaxed">TAG served as general consultant for Vanessa Gibson&apos;s successful 2021 campaign for Bronx Borough President.</p>
                <div className="mt-6 flex gap-6">
                  <div><span className="text-gold font-serif text-2xl font-bold">2021</span><p className="text-white/40 text-xs mt-1">Election Year</p></div>
                  <div><span className="text-gold font-serif text-2xl font-bold">Won</span><p className="text-white/40 text-xs mt-1">Primary & General</p></div>
                </div>
              </div>
              <div className="bg-navy p-8">
                <span className="text-gold text-sm font-semibold uppercase tracking-wider">Reelection Campaign</span>
                <h3 className="mt-3 font-serif text-2xl font-bold text-white">Donovan Richards — Queens BP</h3>
                <p className="mt-3 text-white/60 text-sm leading-relaxed">TAG provided strategic consulting for Donovan Richards&apos; successful reelection as Queens Borough President.</p>
                <div className="mt-6 flex gap-6">
                  <div><span className="text-gold font-serif text-2xl font-bold">2021</span><p className="text-white/40 text-xs mt-1">Election Year</p></div>
                  <div><span className="text-gold font-serif text-2xl font-bold">Reelected</span><p className="text-white/40 text-xs mt-1">Result</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
