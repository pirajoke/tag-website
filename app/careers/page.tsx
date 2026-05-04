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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Life at TAG</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">Where Careers Launch</h2>
              <div className="mt-3 w-12 h-0.5 bg-gold" />
              <div className="mt-8 space-y-4">
                {careers.culture.map((item) => (<div key={item} className="flex items-start gap-3"><span className="text-gold mt-1">&#9670;</span><p className="text-steel">{item}</p></div>))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-ivory p-12 text-center">
                <span className="text-gold font-serif text-7xl font-bold">{careers.internship.rating}</span>
                <p className="text-navy font-semibold mt-2">out of 5.0</p>
                <p className="text-steel text-sm mt-1">Glassdoor Rating</p>
                <div className="mt-4 flex justify-center gap-1">
                  {[1,2,3,4,5].map((star) => (<span key={star} className={`text-2xl ${star <= Math.round(careers.internship.rating) ? "text-gold" : "text-steel/30"}`}>★</span>))}
                </div>
                <p className="text-steel/60 text-xs mt-3">26% above industry average</p>
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
            {careers.openPositions.map((pos, i) => (
              <motion.div key={pos.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-white p-8 border border-navy/5 hover:border-gold/30 transition-colors group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-navy group-hover:text-red transition-colors">{pos.title}</h3>
                    <div className="flex gap-4 mt-2"><span className="text-steel text-sm">{pos.type}</span><span className="text-steel/30">&mdash;</span><span className="text-steel text-sm">{pos.location}</span></div>
                  </div>
                  <Link href="/contact" className="bg-red hover:bg-red/90 text-white px-6 py-2.5 text-sm font-semibold tracking-wide uppercase transition-colors flex-shrink-0 text-center">Apply</Link>
                </div>
                <p className="mt-4 text-steel text-sm leading-relaxed">{pos.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Start Your Journey</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">Internship Program</h2>
          </div>
          <p className="text-white/70 text-center leading-relaxed max-w-2xl mx-auto">{careers.internship.description}</p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {careers.internship.activities.map((activity) => (<div key={activity} className="flex items-center gap-3 bg-white/5 px-6 py-4"><span className="text-gold">&#9670;</span><span className="text-white/80 text-sm">{activity}</span></div>))}
          </div>
          <p className="mt-12 text-white/50 text-center text-sm italic leading-relaxed max-w-2xl mx-auto">{careers.internship.outcomes}</p>
        </div>
      </section>
      <CTASection />
    </>
  );
}
