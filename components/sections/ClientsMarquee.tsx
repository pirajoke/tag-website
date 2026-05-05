"use client";

import { motion } from "framer-motion";

const clients = [
  "NY Communities for Change",
  "Artbridge",
  "CORE",
  "CWA Local 1180",
  "Edison Properties",
  "Hotel & Gaming Workers Union",
  "Met Council on Housing",
  "StorageMart",
  "Youngwoo & Associates",
  "Manhattan Mini Storage",
  "Climate Organizing Hub",
  "Freelancers Union",
  "Hotel Trades Council",
  "ZD Jasper Realty",
  "Jim Owles Democratic Club",
  "UFT",
  "Carmen De La Rosa",
  "Kamillah Hanks",
  "Donovan Richards",
  "Vanessa L. Gibson",
];

const row1 = clients.slice(0, 10);
const row2 = clients.slice(10, 20);

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex items-center whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="inline-flex items-center justify-center mx-3 px-8 py-4 bg-gray-50/80 rounded-xl border border-navy/5 min-w-[180px]"
          >
            <span className="text-navy font-semibold text-sm tracking-tight whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientsMarquee() {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
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
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex flex-col gap-4">
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse />
        </div>
      </div>
    </section>
  );
}
