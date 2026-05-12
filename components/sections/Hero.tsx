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
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${
        compact ? "min-h-[46vh] pt-20 pb-10" : "min-h-screen"
      } ${dark ? "bg-navy text-white" : "bg-ivory text-navy"}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/30 to-navy" />

      <div className={`relative z-10 max-w-6xl mx-auto px-6 text-center ${compact ? "-mt-2 md:-mt-4" : ""}`}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`font-serif font-bold leading-[1.05] ${
            compact
              ? "text-4xl md:text-5xl lg:text-6xl"
              : "text-5xl md:text-7xl lg:text-[5.5rem]"
          }`}
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 w-24 h-[2px] bg-gold mx-auto origin-center"
        />

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
          >
            {subtitle}
          </motion.p>
        )}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12 flex justify-center"
          >
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center bg-gold text-navy px-10 py-4 rounded-full text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-gold/90 hover:shadow-lg"
            >
              {cta.label}
            </Link>
          </motion.div>
        )}

        {!compact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
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
