"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="relative py-24 bg-navy overflow-hidden">
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
              className="inline-block bg-gold text-navy px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-gold/90 hover:shadow-lg"
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              className="inline-block border-2 border-gold/60 text-gold px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-gold hover:text-navy"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
