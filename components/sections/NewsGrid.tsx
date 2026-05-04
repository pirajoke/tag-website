"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { news } from "@/lib/data";

export function NewsGrid({ limit = 3 }: { limit?: number }) {
  const articles = news.slice(0, limit);

  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Stay Informed
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy">
            News & Insights
          </h2>
          <div className="mt-4 w-16 h-0.5 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-navy/5 group hover:shadow-lg transition-shadow"
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gold text-xs font-semibold uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-steel/40 text-xs">&mdash;</span>
                  <span className="text-steel/60 text-xs">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="mt-3 text-steel text-sm leading-relaxed">
                  {article.excerpt}
                </p>
                <Link
                  href={article.link}
                  className="mt-4 inline-block text-gold text-sm font-semibold uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                >
                  Read More &rarr;
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/news"
            className="text-navy font-semibold text-sm uppercase tracking-wider hover:text-gold transition-colors"
          >
            View All Articles &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
