"use client";

import { clients } from "@/lib/data";

const allClients = [
  ...clients.political.slice(0, 6),
  ...clients.nonprofit.slice(0, 3),
  ...clients.labor.slice(0, 3),
];

export function ClientsMarquee() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
          Trusted By Leaders
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy">
          Our Clients
        </h2>
        <div className="mt-4 w-16 h-0.5 bg-gold mx-auto" />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-marquee">
          {[...allClients, ...allClients].map((client, i) => (
            <div
              key={`${client}-${i}`}
              className="flex-shrink-0 mx-8 px-8 py-4 bg-ivory border border-navy/5 flex items-center justify-center"
            >
              <span className="text-navy/70 font-medium text-sm whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
