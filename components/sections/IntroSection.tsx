"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const coreStats = [
  {
    value: 35,
    suffix: "+",
    label: "Years of Impact",
    description: "Shaping policy and winning campaigns since 1990 in New York City.",
    accent: "from-gold/20 to-gold/5",
    border: "border-gold/20",
    iconColor: "text-gold",
  },
  {
    value: 500,
    suffix: "+",
    label: "Campaigns Managed",
    description: "From borough races to nationally watched political contests.",
    accent: "from-navy/10 to-navy/5",
    border: "border-navy/10",
    iconColor: "text-navy",
  },
  {
    value: 16,
    prefix: "$",
    suffix: "M+",
    label: "Annual Revenue",
    description: "A leading political consulting firm with sustained growth.",
    accent: "from-gold/15 to-gold/5",
    border: "border-gold/15",
    iconColor: "text-gold",
  },
  {
    value: 7,
    suffix: "",
    label: "Core Disciplines",
    description: "Lobbying, campaigns, communications, design, fundraising, grants & events.",
    accent: "from-navy/8 to-navy/3",
    border: "border-navy/8",
    iconColor: "text-navy",
  },
];

function AnimatedNumber({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = value / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}

export function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [60, -60]), { stiffness: 100, damping: 30 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 100, damping: 30 });
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-32 bg-white overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-gold/[0.03] blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-navy/[0.03] blur-3xl"
        style={{ y: y2 }}
      />

      <motion.div style={{ scale, opacity }} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header with reveal animation */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-gold text-xs font-semibold uppercase mb-6"
          >
            Together, We Make It Happen
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy leading-[1.1] tracking-tight"
          >
            35 Years of
            <br />
            <span className="relative inline-block">
              Delivering Results
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-gold to-gold/30 origin-left"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-steel text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Founded and led by Scott Levenson since 1990, TAG is a diverse team
            of individuals with a broad mix of creative and strategic abilities.
            We leverage our unique experience into innovative and effective
            solutions for our clients.
          </motion.p>
        </div>

        {/* Stats — glass cards with count-up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.15 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative"
              style={{ perspective: 800 }}
            >
              <div className={`relative h-full rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.accent} backdrop-blur-sm p-7 flex flex-col justify-between min-h-[220px] overflow-hidden transition-shadow duration-500 hover:shadow-2xl hover:shadow-navy/5`}>
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Corner glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <span className="text-5xl md:text-[3.5rem] font-serif font-bold text-navy leading-none tracking-tight">
                    <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </span>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "2rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + 0.15 * i }}
                    className="h-[2px] bg-gold mt-3 mb-2"
                  />
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy/60">
                    {stat.label}
                  </p>
                </div>

                <p className="relative z-10 mt-auto pt-4 text-sm leading-relaxed text-navy/50">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 text-gold font-semibold text-sm uppercase tracking-[0.2em] hover:text-navy transition-colors duration-300"
          >
            <span>Learn Our Story</span>
            <motion.span
              className="inline-block"
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              &rarr;
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
