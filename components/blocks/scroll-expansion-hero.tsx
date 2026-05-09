"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import Image from "next/image";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

type HeroMetrics = {
  viewportWidth: number;
  viewportHeight: number;
  isMobile: boolean;
  startWidth: number;
  endWidth: number;
  startHeight: number;
  endHeight: number;
};

const getMetrics = (): HeroMetrics => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight || 1;
  const isMobile = viewportWidth < 768;

  return {
    viewportWidth,
    viewportHeight,
    isMobile,
    startWidth: isMobile
      ? Math.min(viewportWidth * 0.72, 320)
      : Math.min(viewportWidth * 0.24, 420),
    endWidth: isMobile
      ? Math.min(viewportWidth * 0.96, 760)
      : Math.min(viewportWidth * 0.88, 1500),
    startHeight: isMobile ? 390 : Math.min(viewportHeight * 0.5, 500),
    endHeight: isMobile
      ? Math.min(viewportHeight * 0.78, 700)
      : Math.min(viewportHeight * 0.86, 820),
  };
};

const ScrollExpandMedia = ({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  scrollToExpand = "Scroll to Explore",
}: ScrollExpandMediaProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const metricsRef = useRef<HeroMetrics | null>(null);

  const titleParts = useMemo(() => {
    if (!title) return { firstWord: "", rest: "" };

    const [firstWord, ...rest] = title.split(" ");
    return {
      firstWord,
      rest: rest.join(" "),
    };
  }, [title]);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      metricsRef.current = getMetrics();
    };

    const applyProgress = () => {
      frame = 0;

      const section = sectionRef.current;
      if (!section) return;
      if (!metricsRef.current) measure();

      const metrics = metricsRef.current;
      if (!metrics) return;

      const rect = section.getBoundingClientRect();
      const progress = clamp(
        -rect.top / Math.max(rect.height - metrics.viewportHeight, 1)
      );
      const expandProgress = clamp(progress / 0.68);
      const contentProgress = clamp((progress - 0.56) / 0.26);
      const eased = easeOutCubic(expandProgress);
      const contentEase = easeOutCubic(contentProgress);
      const textShift = eased * (metrics.isMobile ? 44 : 24);
      const titleOpacity = clamp(1 - contentProgress * 1.25);
      const style = section.style;

      style.setProperty(
        "--hero-card-w",
        `${metrics.startWidth + (metrics.endWidth - metrics.startWidth) * eased}px`
      );
      style.setProperty(
        "--hero-card-h",
        `${metrics.startHeight + (metrics.endHeight - metrics.startHeight) * eased}px`
      );
      style.setProperty("--hero-card-r", `${26 - 14 * eased}px`);
      style.setProperty("--hero-card-y", `${-10 * progress}px`);
      style.setProperty("--hero-bg-opacity", `${1 - 0.76 * contentEase}`);
      style.setProperty("--hero-bg-scale", `${1 + 0.03 * eased}`);
      style.setProperty("--hero-overlay-opacity", `${0.34 - 0.18 * contentEase}`);
      style.setProperty("--hero-scrim-opacity", `${0.1 + 0.52 * contentEase}`);
      style.setProperty("--hero-title-shift", `${textShift}vw`);
      style.setProperty("--hero-title-y", `${8 * eased}px`);
      style.setProperty("--hero-title-opacity", `${titleOpacity}`);
      style.setProperty("--hero-intro-opacity", `${contentEase}`);
      style.setProperty("--hero-intro-y", `${22 - 22 * contentEase}px`);
      style.setProperty("--hero-hint-opacity", `${clamp(1 - progress * 2.8)}`);
      style.setProperty("--hero-hint-y", `${10 * progress}px`);
    };

    const requestApply = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(applyProgress);
    };

    const onResize = () => {
      measure();
      requestApply();
    };

    measure();
    applyProgress();
    window.addEventListener("scroll", requestApply, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", requestApply);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-scroll-section relative h-[230svh] bg-white">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="hero-bg absolute inset-0">
          <Image
            src={bgImageSrc}
            alt="New York City skyline"
            fill
            sizes="100vw"
            quality={64}
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/42" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-white/85" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="hero-media-card relative overflow-hidden shadow-2xl shadow-black/35">
            {mediaType === "video" ? (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
                controls={false}
              />
            ) : (
              <Image
                src={mediaSrc}
                alt={title || "TAG campaign strategy"}
                fill
                sizes="(min-width: 1024px) 68vw, 94vw"
                quality={62}
                className="object-cover"
                priority
              />
            )}
            <div className="hero-media-overlay absolute inset-0 bg-black" />
            <div className="hero-media-scrim absolute inset-0 bg-black" />
            <div
              className="hero-intro pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center text-white"
            >
              <div className="mb-7 inline-flex items-center border border-gold/25 bg-navy/10 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold md:text-xs">
                EST. 1990 — NEW YORK CITY
              </div>
              <h2 className="font-serif text-4xl font-bold leading-[0.92] text-white/88 md:text-6xl lg:text-7xl">
                Together, We Make
                <br />
                It Happen
              </h2>
              <p className="mt-24 max-w-4xl text-base leading-relaxed text-white/78 md:text-xl">
                Since 1990, TAG has represented political candidates,
                not-for-profits, corporations, advocacy groups, and labor unions
                — combining deep institutional knowledge with innovative
                strategy to deliver results.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 md:text-xs">
                <span>Lobbying</span>
                <span className="text-gold">◆</span>
                <span>Campaigns</span>
                <span className="text-gold">◆</span>
                <span>Communications</span>
                <span className="text-gold">◆</span>
                <span>Design</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center">
          <h1 className="font-serif text-[clamp(3.6rem,8.6vw,9.4rem)] font-bold leading-[0.86] text-white/70 drop-shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
            <span className="hero-title-first block whitespace-nowrap">
              {titleParts.firstWord}
            </span>
            <span className="hero-title-second block whitespace-nowrap">
              {titleParts.rest}
            </span>
          </h1>
        </div>

        <div
          className="hero-scroll-hint absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">
            {scrollToExpand}
          </span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/30 p-1">
            <div className="h-2 w-1 rounded-full bg-white/50 animate-scroll-dot" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollExpandMedia;
