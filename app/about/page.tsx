"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { team, timeline } from "@/lib/data";

export default function AboutPage() {
  return (
    <>
      <Hero
        title="Together, We Make It Happen"
        subtitle="Three and a half decades of institutional knowledge, trust, and results."
        compact
      />

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              Our Mission
            </p>
            <h2 className="font-serif text-3xl font-bold leading-relaxed text-navy md:text-4xl">
              Founded and led by Scott Levenson since 1990, TAG is a diverse team
              working together to deliver results.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-steel lg:mx-0">
              Our combined expertise includes lobbying, campaigns and elections,
              communications, graphic design, fundraising, event management, and more.
              Together, we make it happen.
            </p>
            <div className="mx-auto mt-6 h-0.5 w-16 bg-gold lg:mx-0" />
          </div>

          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-navy/10 bg-ivory shadow-[0_24px_70px_rgba(42,33,24,0.10)] lg:max-w-none">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/team/scott-levenson.webp"
                alt="Scott Levenson, Founder and President of The Advance Group"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover grayscale"
                style={{ objectPosition: "center 34%" }}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/75 via-navy/35 to-transparent px-6 pb-6 pt-20">
              <p className="font-serif text-2xl font-bold text-white">
                Scott Levenson
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Founder &amp; President
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Our Journey</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy">35 Years of Impact</h2>
            <div className="mt-4 w-16 h-0.5 bg-gold mx-auto" />
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/30 hidden md:block" />
            <div className="space-y-12 md:space-y-0">
              {timeline.map((item, i) => (
                <motion.div key={item.year} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className={`relative md:flex md:items-center md:mb-16 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-gold font-serif text-3xl font-bold">{item.year}</span>
                    <h3 className="mt-2 font-serif text-xl font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 text-steel text-sm leading-relaxed">{item.description}</p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-ivory" />
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="relative scroll-mt-28 overflow-hidden bg-white py-20 md:py-24">
        <svg
          className="absolute bottom-0 right-0 text-navy/5"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip_team)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip_team">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 flex max-w-4xl flex-col items-center text-center">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-navy">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>

            <h2 className="mb-4 font-serif text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              Our Team
            </h2>
            <p className="max-w-2xl text-steel">
              A diverse team bringing creative and strategic abilities together
              to deliver results for our clients since 1990.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="group"
              >
                <div className="relative aspect-[8/9] overflow-hidden bg-navy/10">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.title}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    style={{ objectPosition: member.imagePosition }}
                  />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 px-6 pb-6 transition-transform duration-300 group-hover:translate-y-0">
                    <div className="bg-white px-5 py-4 shadow-[0_18px_40px_rgba(42,33,24,0.10)]">
                      <h3 className="font-sans text-lg font-bold tracking-normal text-gold">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium leading-snug text-navy">
                        {member.title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-3xl px-6 text-center">
            <p className="mb-8 font-serif text-lg text-navy leading-relaxed md:text-xl italic">
              &ldquo;What sets us apart is the institutional knowledge and trust
              we&apos;ve cultivated over three and a half decades. We don&apos;t
              just know the political landscape — we&apos;re embedded within
              it.&rdquo;
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-navy flex items-center justify-center">
                <Image
                  src="/images/team/scott-levenson.webp"
                  alt="Scott Levenson"
                  fill
                  sizes="56px"
                  className="object-cover grayscale"
                  style={{ objectPosition: "center 36%" }}
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-navy">Scott Levenson</p>
                <p className="text-steel text-sm">Founder & President</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
