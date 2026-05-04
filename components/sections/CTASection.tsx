"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="relative py-24 bg-navy overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-red/5" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
            Ready to Make an Impact?
          </h2>
          <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto">
            Whether you&apos;re running a campaign, advocating for change, or building
            your organization, TAG has the experience and relationships to
            deliver results.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-red hover:bg-red/90 text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300"
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              className="inline-block border-2 border-gold text-gold hover:bg-gold hover:text-navy px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
