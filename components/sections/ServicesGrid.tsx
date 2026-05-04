"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export function ServicesGrid() {
  return (
    <section className="py-28 bg-ivory relative">
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.3em] border border-gold/30 px-4 py-2 mb-6">
            What We Do
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy">
            Our Expertise
          </h2>
          <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {services.slice(0, 3).map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(3).map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group block relative bg-white p-8 h-full overflow-hidden transition-all duration-300 border border-navy/5 hover:shadow-lg hover:border-l-4 hover:border-l-gold"
      >
        <ServiceIcon slug={service.slug} className="w-14 h-14 mb-6" />

        <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors duration-300">
          {service.title}
        </h3>

        <p className="mt-3 text-steel text-sm leading-relaxed line-clamp-3">
          {service.shortDescription}
        </p>

        <div className="mt-6 flex items-center gap-2 text-gold text-sm font-semibold uppercase tracking-wider">
          <span>Learn More</span>
          <span className="transform group-hover:translate-x-2 transition-transform duration-300">
            &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
