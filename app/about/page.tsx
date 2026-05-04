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

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Leadership</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy">Our Team</h2>
            <div className="mt-4 w-16 h-0.5 bg-gold mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="group">
                <div className="aspect-[3/4] bg-navy-light relative overflow-hidden mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gold font-serif text-5xl font-bold opacity-20">{member.name.split(" ").map((n) => n[0]).join("")}</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-navy">{member.name}</h3>
                <p className="text-gold text-sm font-medium mt-1">{member.title}</p>
                <p className="mt-3 text-steel text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-6">Recognition</p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white px-8 py-6 border border-navy/5">
              <span className="text-gold font-serif text-3xl font-bold">#14</span>
              <p className="mt-2 text-navy text-sm font-medium">City & State Political Consultants Power 75</p>
              <p className="text-steel text-xs mt-1">2021</p>
            </div>
            <div className="bg-white px-8 py-6 border border-navy/5">
              <span className="text-gold font-serif text-3xl font-bold">35+</span>
              <p className="mt-2 text-navy text-sm font-medium">Years in NYC Politics</p>
              <p className="text-steel text-xs mt-1">Since 1990</p>
            </div>
            <div className="bg-white px-8 py-6 border border-navy/5">
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
