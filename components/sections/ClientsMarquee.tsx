"use client";

import { motion } from "framer-motion";

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
  const repeated = [...clientNames, ...clientNames];

  return (
    <section className="py-16 bg-white overflow-hidden">
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

      {/* Flat straight marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center whitespace-nowrap">
          {repeated.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="inline-flex items-center mx-4 px-6 py-3 bg-gray-50 border border-navy/5 rounded-lg"
            >
              <div className="w-10 h-10 bg-navy flex items-center justify-center rounded-md mr-3 flex-shrink-0">
                <span className="text-gold font-serif text-sm font-bold">
                  {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
              </div>
              <span className="text-navy font-medium text-sm whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
