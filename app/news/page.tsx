"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { news } from "@/lib/data";

const allCategories = ["All", ...new Set(news.map((n) => n.category))];

export default function NewsPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? news : news.filter((n) => n.category === filter);

  return (
    <>
      <Hero title="News & Insights" subtitle="Commentary, analysis, and updates from The Advance Group." compact />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {allCategories.map((cat) => (<button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${filter === cat ? "bg-navy text-gold" : "bg-ivory text-navy hover:bg-navy/10"}`}>{cat}</button>))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <motion.article key={article.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="group overflow-hidden rounded-2xl border border-navy/5 bg-ivory transition-shadow hover:shadow-lg">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-gold text-xs font-semibold uppercase tracking-wider">{article.category}</span>
                    <span className="text-steel/40 text-xs">&mdash;</span>
                    <span className="text-steel/60 text-xs">{new Date(article.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors leading-snug">{article.title}</h3>
                  <p className="mt-3 text-steel text-sm leading-relaxed">{article.excerpt}</p>
                  <Link href={article.link} className="mt-4 inline-block text-gold text-sm font-semibold uppercase tracking-wider">Read More &rarr;</Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
