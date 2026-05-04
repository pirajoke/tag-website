"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const coreStats = [
  {
    value: "35+",
    label: "Years of Impact",
    description:
      "Shaping policy and winning campaigns since 1990 in New York City.",
    bg: "bg-navy",
    text: "text-white",
  },
  {
    value: "500+",
    label: "Campaigns Managed",
    description:
      "From borough races to nationally watched political contests.",
    bg: "bg-ivory",
    text: "text-navy",
  },
  {
    value: "$16M+",
    label: "Annual Revenue",
    description:
      "A leading political consulting firm with sustained growth.",
    bg: "bg-gold",
    text: "text-navy",
  },
  {
    value: "7",
    label: "Core Disciplines",
    description:
      "Lobbying, campaigns, communications, design, fundraising, grants & events.",
    bg: "bg-navy-light",
    text: "text-white",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function IntroSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Together, We Make It Happen
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight">
            35 Years of Delivering Results
          </h2>
          <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-steel text-lg leading-relaxed">
            Founded and led by Scott Levenson since 1990, TAG is a diverse team
            of individuals with a broad mix of creative and strategic abilities.
            We leverage our unique experience into innovative and effective
            solutions for our clients.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {coreStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`${stat.bg} ${stat.text} rounded-2xl p-8 flex flex-col justify-between min-h-[240px] shadow-sm hover:shadow-xl transition-shadow duration-300`}
            >
              <div>
                <span className="text-5xl font-serif font-bold leading-none">
                  {stat.value}
                </span>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider opacity-80">
                  {stat.label}
                </p>
              </div>
              <p className="mt-4 text-sm leading-relaxed opacity-70">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider hover:text-navy transition-colors"
          >
            Learn Our Story
            <span className="transform group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
