"use client";

import { motion } from "framer-motion";
import { PerspectiveMarquee } from "@/components/ui/perspective-marquee";

const clientNames = [
  "NY Communities for Change",
  "Artbridge",
  "CORE",
  "Kamillah Hanks",
  "CWA Local 1180",
  "Edison Properties",
  "Hotel & Gaming Workers Union",
  "Donovan Richards",
  "Met Council on Housing",
  "StorageMart",
  "Vanessa L. Gibson",
  "Youngwoo & Associates",
  "Manhattan Mini Storage",
  "Climate Organizing Hub",
  "Freelancers Union",
  "Hotel Trades Council",
  "ZD Jasper Realty",
  "Jim Owles Democratic Club",
  "UFT",
  "Carmen De La Rosa",
];

export function ClientsMarquee() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 text-center mb-8"
      >
        <span className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.3em] border border-gold/30 px-4 py-2 mb-6">
          Trusted By Leaders
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy">
          Our Clients
        </h2>
        <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
      </motion.div>

      <PerspectiveMarquee
        items={clientNames}
        speed={1.2}
        rotateY={-25}
        rotateX={6}
        perspective={1200}
        background="#ffffff"
        fadeColor="#ffffff"
        color="#1a1a1a"
      />
    </section>
  );
}
