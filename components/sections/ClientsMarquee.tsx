"use client";

import { motion } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";

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
    <section className="relative py-16 md:py-20 bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] overflow-hidden [mask-image:radial-gradient(58%_58%,white,transparent_82%)]">
        <div className="absolute inset-0 before:absolute before:inset-x-[10%] before:bottom-8 before:h-48 before:bg-[radial-gradient(circle_at_bottom_center,var(--gradient-color),transparent_68%)] before:opacity-20" />
        <div className="absolute -left-1/2 top-[56%] z-10 aspect-[1/0.2] w-[200%] rounded-[100%] border-t border-gold/20 bg-white" />
        <Sparkles
          density={260}
          speed={0.45}
          opacity={0.45}
          opacitySpeed={1.8}
          size={1.2}
          color="var(--sparkles-color)"
          className="absolute inset-x-0 top-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_80%)]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-12"
      >
        <span className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.3em] border border-gold/30 px-4 py-2 mb-6">
          Trusted By Leaders
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy">
          Our Clients
        </h2>
        <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
      </motion.div>

      <div className="relative z-10">
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
