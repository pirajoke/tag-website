"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { services } from "@/lib/data";

export default function ServicesPage() {
  return (
    <>
      <Hero title="Our Expertise" subtitle="Seven core disciplines, one strategic vision. We deliver comprehensive solutions tailored to your goals." compact />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {services.map((service, i) => (
            <motion.div key={service.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`py-16 ${i < services.length - 1 ? "border-b border-navy/10" : ""}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{service.icon}</span>
                    <span className="text-gold text-sm font-semibold uppercase tracking-widest">0{i + 1}</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy">{service.title}</h2>
                  <div className="mt-3 w-12 h-0.5 bg-gold" />
                  <p className="mt-6 text-steel leading-relaxed">{service.description}</p>
                  <Link href={`/services/${service.slug}`} className="inline-block mt-6 text-gold font-semibold text-sm uppercase tracking-wider hover:text-navy transition-colors">Learn More &rarr;</Link>
                </div>
                <div className="bg-ivory p-8">
                  <h4 className="text-navy font-semibold text-sm uppercase tracking-wider mb-4">Key Capabilities</h4>
                  <ul className="space-y-3">
                    {service.highlights.map((h) => (<li key={h} className="flex items-start gap-3 text-steel text-sm"><span className="text-gold mt-1">&#9670;</span>{h}</li>))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
