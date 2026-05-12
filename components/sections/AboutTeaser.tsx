"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { creativeProjects, siteConfig } from "@/lib/data";

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

export function AboutTeaser() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoProject = creativeProjects[1];
  const embedUrl = getYouTubeEmbedUrl(videoProject.href);

  useEffect(() => {
    if (!isVideoOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  return (
    <section className="bg-white pb-16 pt-10 md:pb-24 md:pt-14 lg:-mt-2">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:order-2"
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              About TAG
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy leading-tight">
              {siteConfig.tagline}
            </h2>
            <div className="mt-4 w-16 h-0.5 bg-gold" />
            <p className="mt-6 text-steel leading-relaxed">
              Founded and led by Scott Levenson since 1990, TAG is a diverse
              team working together to deliver results. From city hall to state
              capitals to federal agencies, we don&apos;t just know the political
              landscape — we&apos;re embedded within it.
            </p>
            <p className="mt-4 text-steel leading-relaxed">
              Our combined expertise includes lobbying, campaigns and elections,
              communications, graphic design, fundraising, event management,
              and more. Together, we make it happen.
            </p>
            <Link
              href="/about"
              className="inline-block mt-8 text-gold font-semibold text-sm uppercase tracking-wider hover:text-navy transition-colors"
            >
              Our Story &rarr;
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:order-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-navy-light shadow-[0_24px_70px_rgba(42,33,24,0.14)] md:rounded-[2rem]">
              <Image
                src="/images/projects/01-let-s-get-to-work-donovan-richards-for-queens-borough-president.jpg"
                alt="Donovan Richards campaign video still"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-6 text-center sm:p-12">
                  <span className="font-serif text-6xl font-bold text-gold sm:text-7xl md:text-8xl">
                    35+
                  </span>
                  <p className="mt-3 text-base font-light text-white/60 sm:mt-4 sm:text-lg">
                    Years Shaping Policy
                  </p>
                  <p className="text-white/40 text-sm mt-1">Since 1990</p>
                  <button
                    type="button"
                    onClick={() => embedUrl && setIsVideoOpen(true)}
                    className="mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-gold px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-navy transition-all duration-300 hover:bg-white sm:mt-7 sm:px-6 sm:text-xs sm:tracking-[0.18em]"
                  >
                    <span aria-hidden="true" className="text-sm leading-none">
                      &#9658;
                    </span>
                    Play Video
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {isVideoOpen && embedUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={videoProject.title}
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-navy shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-navy transition-colors hover:bg-gold"
              aria-label="Close video"
            >
              &times;
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={embedUrl}
                title={videoProject.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
