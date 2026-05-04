"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

export function AboutTeaser() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              About TAG
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy leading-tight">
              {siteConfig.tagline}
            </h2>
            <div className="mt-4 w-16 h-0.5 bg-gold" />
            <p className="mt-6 text-steel leading-relaxed">
              Founded in 1990 by Scott Levenson, The Advance Group has spent
              over three decades building deep, enduring relationships across
              every level of government. From city hall to state capitals to
              federal agencies, we don&apos;t just know the political
              landscape—we&apos;re embedded within it.
            </p>
            <p className="mt-4 text-steel leading-relaxed">
              Our diverse team combines creative and strategic abilities to
              deliver results for political candidates, not-for-profits,
              corporations, advocacy groups, and labor unions. We leverage our
              unique experience into innovative and effective solutions.
            </p>
            <Link
              href="/about"
              className="inline-block mt-8 text-gold font-semibold text-sm uppercase tracking-wider hover:text-navy transition-colors"
            >
              Our Story &rarr;
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-navy-light relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-12">
                  <span className="text-gold font-serif text-8xl font-bold">
                    35+
                  </span>
                  <p className="mt-4 text-white/60 text-lg font-light">
                    Years Shaping Policy
                  </p>
                  <p className="text-white/40 text-sm mt-1">Since 1990</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
