import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { creativeProjects } from "@/lib/data";

export default function ProjectsPage() {
  const featured = creativeProjects.slice(0, 3);
  const remaining = creativeProjects.slice(3);

  return (
    <>
      <Hero
        title="Creative Projects"
        subtitle="High-impact commercials, campaign videos, print concepts, and direct-response creative built to cut through the noise."
        compact
      />

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                Projects
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-navy md:text-5xl">
                Great campaigns are built on great creative.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-steel md:text-lg">
              TAG produces high-quality commercials, print, and direct mail
              that connect with voters and audiences when it counts most.
              The work spans candidate launches, advocacy campaigns,
              endorsements, and direct-response messages built for real races.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {featured.map((project) => (
              <article
                key={project.title}
                className="group overflow-hidden border border-navy/10 bg-white shadow-[0_18px_50px_rgba(42,33,24,0.06)]"
              >
                <div
                  className={`relative aspect-video overflow-hidden ${
                    project.image.includes("print-mail-collage")
                      ? "bg-[#0b3d68]"
                      : "bg-navy/10"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className={`transition duration-500 group-hover:scale-[1.03] ${
                      project.image.includes("print-mail-collage")
                        ? "object-contain"
                        : "object-cover"
                    }`}
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-navy">
                    {project.duration}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                    {project.category}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl font-bold leading-tight text-navy">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel">
                    {project.summary}
                  </p>
                  {project.href && (
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:text-navy"
                    >
                      Watch Project &rarr;
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              Success Stories
            </p>
            <h2 className="font-serif text-3xl font-bold text-navy md:text-4xl">
              Featured Results
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-navy p-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-gold">
                Borough President Race
              </span>
              <h3 className="mt-3 font-serif text-2xl font-bold text-white">
                Vanessa Gibson — Bronx BP
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                TAG served as general consultant for Vanessa Gibson&apos;s
                successful 2021 campaign for Bronx Borough President.
              </p>
              <div className="mt-6 flex gap-6">
                <div>
                  <span className="font-serif text-2xl font-bold text-gold">
                    2021
                  </span>
                  <p className="mt-1 text-xs text-white/40">Election Year</p>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-gold">
                    Won
                  </span>
                  <p className="mt-1 text-xs text-white/40">
                    Primary & General
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-navy p-8">
              <span className="text-sm font-semibold uppercase tracking-wider text-gold">
                Reelection Campaign
              </span>
              <h3 className="mt-3 font-serif text-2xl font-bold text-white">
                Donovan Richards — Queens BP
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                TAG provided strategic consulting for Donovan Richards&apos;
                successful reelection as Queens Borough President.
              </p>
              <div className="mt-6 flex gap-6">
                <div>
                  <span className="font-serif text-2xl font-bold text-gold">
                    2021
                  </span>
                  <p className="mt-1 text-xs text-white/40">Election Year</p>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-gold">
                    Reelected
                  </span>
                  <p className="mt-1 text-xs text-white/40">Result</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
                Ads
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-navy md:text-4xl">
                Campaign & Advocacy Work
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-steel">
              A working archive of TAG-produced creative: candidate launches,
              contrast ads, endorsements, advocacy concepts, and borough-wide
              campaign messages.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {remaining.map((project) => (
              <article
                key={project.title}
                className="group overflow-hidden bg-white"
              >
                <div
                  className={`relative aspect-video overflow-hidden ${
                    project.image.includes("print-mail-collage")
                      ? "bg-[#0b3d68]"
                      : "bg-navy/10"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className={`transition duration-500 group-hover:scale-[1.03] ${
                      project.image.includes("print-mail-collage")
                        ? "object-contain"
                        : "object-cover"
                    }`}
                  />
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                      {project.category}
                    </span>
                    <span className="text-xs font-medium text-steel/70">
                      {project.duration}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold leading-snug text-navy">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel">
                    {project.summary}
                  </p>
                  {project.href ? (
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:text-navy"
                    >
                      Watch &rarr;
                    </Link>
                  ) : (
                    <span className="mt-4 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-navy/35">
                      TAG Hosted
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
