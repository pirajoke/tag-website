"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  dark?: boolean;
  compact?: boolean;
}

export function Hero({
  title,
  subtitle,
  cta,
  dark = true,
  compact = false,
}: HeroProps) {
  const words = title.split(" ");

  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${
        compact ? "min-h-[60vh] pt-28" : "min-h-screen"
      } ${dark ? "bg-navy text-white" : "bg-ivory text-navy"}`}
    >
      {/* Layered background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/30 to-navy" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.03] rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-gold/20" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-gold/20" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.3em] border border-gold/30 px-4 py-2">
            Est. 1990 &mdash; New York City
          </span>
        </motion.div>

        <h1
          className={`font-serif font-bold leading-[1.05] ${
            compact
              ? "text-4xl md:text-5xl lg:text-6xl"
              : "text-5xl md:text-7xl lg:text-[5.5rem]"
          }`}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 w-24 h-[2px] bg-gold mx-auto origin-center"
        />

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
          >
            {subtitle}
          </motion.p>
        )}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={cta.href}
              className="group relative inline-flex items-center justify-center bg-red text-white px-10 py-5 text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:text-navy overflow-hidden"
            >
              <span className="relative z-10">{cta.label}</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center justify-center border border-white/20 text-white/80 px-10 py-5 text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Explore Services
            </Link>
          </motion.div>
        )}

        {!compact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-[1px] h-8 bg-gradient-to-b from-gold/60 to-transparent"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
