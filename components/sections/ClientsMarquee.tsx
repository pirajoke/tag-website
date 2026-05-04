"use client";

import { motion } from "framer-motion";

const clientNames = [
  "NY Communities for Change",
  "Artbridge",
  "CORE",
  "Kamillah Hanks",
  "CWA Local 1180",
  "Edison Properties",
  "NY/NJ Hotel & Gaming Workers Union",
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
  "Jim Owles Liberal Democratic Club",
  "UFT",
  "Carmen De La Rosa",
];

export function ClientsMarquee() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 text-center mb-12"
      >
        <span className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.3em] border border-gold/30 px-4 py-2 mb-6">
          Trusted By Leaders
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy">
          Our Clients
        </h2>
        <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Row 1 — left to right */}
        <div className="flex mb-4 animate-marquee">
          {[...clientNames, ...clientNames].map((name, i) => (
            <div
              key={`a-${i}`}
              className="flex-shrink-0 mx-3 px-6 py-3 border border-gray-200 bg-gray-50 flex items-center justify-center"
            >
              <span className="text-gray-500 font-semibold text-sm whitespace-nowrap uppercase tracking-wider">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 — right to left */}
        <div className="flex animate-marquee-reverse">
          {[...clientNames.slice(10), ...clientNames.slice(0, 10), ...clientNames.slice(10), ...clientNames.slice(0, 10)].map((name, i) => (
            <div
              key={`b-${i}`}
              className="flex-shrink-0 mx-3 px-6 py-3 border border-gray-200 bg-gray-50 flex items-center justify-center"
            >
              <span className="text-gray-500 font-semibold text-sm whitespace-nowrap uppercase tracking-wider">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
