"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { creativeProjects } from "@/lib/data";

type CreativeProject = (typeof creativeProjects)[number];

function getYouTubeEmbedUrl(href?: string) {
  if (!href) return null;

  try {
    const url = new URL(href);
    const videoId =
      url.hostname.includes("youtu.be")
        ? url.pathname.slice(1)
        : url.searchParams.get("v");

    return videoId
      ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
      : null;
  } catch {
    return null;
  }
}

export default function ProjectsPage() {
  const featured = creativeProjects.slice(0, 3);
  const remaining = creativeProjects.slice(3).filter((project) => project.href);
  const [activeProject, setActiveProject] = useState<CreativeProject | null>(
    null
  );
  const activeEmbedUrl = getYouTubeEmbedUrl(activeProject?.href);

  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

  return (
    <>
      <Hero
        title="Creative Projects"
        subtitle="High-impact commercials, campaign videos, print concepts, and direct-response creative built to cut through the noise."
        compact
      />

      <section className="bg-white pb-20 pt-14 md:pb-24 md:pt-16">
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
            {featured.map((project) => {
              const embedUrl = getYouTubeEmbedUrl(project.href);

              return (
              <article
                key={project.title}
                className="group overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-[0_18px_50px_rgba(42,33,24,0.06)]"
              >
                <button
                  type="button"
                  disabled={!embedUrl}
                  onClick={() => embedUrl && setActiveProject(project)}
                  className={`relative block aspect-video w-full overflow-hidden text-left ${
                    project.image.includes("print-mail-collage")
                      ? "bg-[#0b3d68]"
                      : "bg-navy/10"
                  } ${embedUrl ? "cursor-pointer" : "cursor-default"}`}
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
                  {embedUrl && (
                    <span className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-colors duration-300 group-hover:bg-navy/20">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-navy shadow-[0_14px_40px_rgba(42,33,24,0.25)] transition-transform duration-300 group-hover:scale-105">
                        <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-gold" />
                      </span>
                    </span>
                  )}
                </button>
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
                  {embedUrl && (
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="mt-5 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:text-navy"
                    >
                      Watch Project &rarr;
                    </button>
                  )}
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="-mt-16 bg-white pb-20 pt-4 md:-mt-24 md:pt-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-4xl rounded-[1.5rem] border border-navy/5 bg-white px-6 py-12 text-center shadow-[0_24px_70px_rgba(42,33,24,0.08)] md:px-12">
            <p className="font-serif text-5xl font-medium leading-none text-gold md:text-6xl">
              #14
            </p>
            <h3 className="mt-7 text-2xl font-semibold leading-tight text-navy md:text-3xl">
              City &amp; State Political Consultants Power 75
            </h3>
            <p className="mt-4 text-2xl text-steel/80">2021</p>
          </div>

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
            <article className="group relative min-h-[320px] overflow-hidden rounded-2xl bg-navy p-8 shadow-[0_28px_80px_rgba(42,33,24,0.18)] transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-1 bg-gold" />
              <div className="absolute -right-10 -top-12 font-serif text-[8rem] font-bold leading-none text-white/[0.04]">
                01
              </div>
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="mb-7 flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold uppercase tracking-wider text-gold">
                      Borough President Race
                    </span>
                    <span className="rounded-full border border-gold/35 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                      Won
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
                    Vanessa Gibson — Bronx BP
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
                    TAG served as general consultant for Vanessa Gibson&apos;s
                    successful 2021 campaign for Bronx Borough President.
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div>
                    <span className="font-serif text-3xl font-bold text-gold">
                      2021
                    </span>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/35">
                      Election Year
                    </p>
                  </div>
                  <div>
                    <span className="font-serif text-3xl font-bold text-gold">
                      Primary
                    </span>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/35">
                      &amp; General
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className="group relative min-h-[320px] overflow-hidden rounded-2xl bg-navy p-8 shadow-[0_28px_80px_rgba(42,33,24,0.18)] transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-1 bg-gold" />
              <div className="absolute -right-10 -top-12 font-serif text-[8rem] font-bold leading-none text-white/[0.04]">
                02
              </div>
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="mb-7 flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold uppercase tracking-wider text-gold">
                      Reelection Campaign
                    </span>
                    <span className="rounded-full border border-gold/35 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                      Reelected
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
                    Donovan Richards — Queens BP
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
                    TAG provided strategic consulting for Donovan Richards&apos;
                    successful reelection as Queens Borough President.
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div>
                    <span className="font-serif text-3xl font-bold text-gold">
                      2021
                    </span>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/35">
                      Election Year
                    </p>
                  </div>
                  <div>
                    <span className="font-serif text-3xl font-bold text-gold">
                      Queens
                    </span>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/35">
                      Borough-wide
                    </p>
                  </div>
                </div>
              </div>
            </article>
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
            {remaining.map((project) => {
              const embedUrl = getYouTubeEmbedUrl(project.href);

              return (
              <article
                key={project.title}
                className="group overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-[0_18px_50px_rgba(42,33,24,0.06)]"
              >
                <button
                  type="button"
                  disabled={!embedUrl}
                  onClick={() => embedUrl && setActiveProject(project)}
                  className={`relative block aspect-video w-full overflow-hidden text-left ${
                    project.image.includes("print-mail-collage")
                      ? "bg-[#0b3d68]"
                      : "bg-navy/10"
                  } ${embedUrl ? "cursor-pointer" : "cursor-default"}`}
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
                  {embedUrl && (
                    <span className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-colors duration-300 group-hover:bg-navy/20">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-navy shadow-[0_14px_40px_rgba(42,33,24,0.25)] transition-transform duration-300 group-hover:scale-105">
                        <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-gold" />
                      </span>
                    </span>
                  )}
                </button>
                <div className="p-5">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                    {project.category}
                  </p>
                  <h3 className="font-serif text-xl font-bold leading-snug text-navy">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel">
                    {project.summary}
                  </p>
                  {embedUrl ? (
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="mt-4 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:text-navy"
                    >
                      Watch &rarr;
                    </button>
                  ) : (
                    <span className="mt-4 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-navy/35">
                      TAG Hosted
                    </span>
                  )}
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {activeProject && activeEmbedUrl && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/85 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.title}
          onClick={() => setActiveProject(null)}
        >
          <div
            className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-video bg-black">
              <iframe
                src={activeEmbedUrl}
                title={activeProject.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  {activeProject.category}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold leading-tight text-navy">
                  {activeProject.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="inline-flex justify-center rounded-full border border-navy/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:border-gold hover:text-gold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <CTASection />
    </>
  );
}
