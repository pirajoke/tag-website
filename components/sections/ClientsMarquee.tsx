"use client";

import { motion } from "framer-motion";
import { AnimatedCarousel, LogoItem } from "@/components/ui/logo-carousel";

const clientLogos: LogoItem[] = [
  { name: "NY Communities for Change" },
  { name: "Artbridge" },
  { name: "CORE" },
  { name: "Kamillah Hanks" },
  { name: "CWA Local 1180" },
  { name: "Edison Properties" },
  { name: "NY/NJ Hotel & Gaming Workers Union" },
  { name: "Donovan Richards" },
  { name: "Met Council on Housing" },
  { name: "StorageMart" },
  { name: "Vanessa L. Gibson" },
  { name: "Youngwoo & Associates" },
  { name: "Manhattan Mini Storage" },
  { name: "Climate Organizing Hub" },
  { name: "Freelancers Union" },
  { name: "Hotel Trades Council" },
  { name: "ZD Jasper Realty" },
  { name: "Jim Owles Liberal Democratic Club" },
  { name: "UFT" },
  { name: "Carmen De La Rosa" },
];

export function ClientsMarquee() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.3em] border border-gold/30 px-4 py-2 mb-6">
            Trusted By Leaders
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy">
            Our Clients
          </h2>
          <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </motion.div>

        <AnimatedCarousel
          logos={clientLogos}
          autoPlay
          autoPlayInterval={2500}
          itemsPerViewMobile={2}
          itemsPerViewDesktop={5}
        />
      </div>
    </section>
  );
}
