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
const HERO_MEDIA_ASPECT = 16 / 9;

const ScrollExpandMedia = ({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  scrollToExpand = "Scroll to Explore",
}: ScrollExpandMediaProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const cardScrimRef = useRef<HTMLDivElement | null>(null);
  const firstLineRef = useRef<HTMLSpanElement | null>(null);
  const secondLineRef = useRef<HTMLSpanElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);

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

    const applyProgress = () => {
      frame = 0;

      const section = sectionRef.current;
      const media = mediaRef.current;
      if (!section || !media) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = clamp(-rect.top / Math.max(rect.height - viewportHeight, 1));
      const expandProgress = clamp(progress / 0.68);
      const contentProgress = clamp((progress - 0.56) / 0.26);
      const eased = easeOutCubic(expandProgress);
      const contentEase = easeOutCubic(contentProgress);
      const isMobile = window.innerWidth < 768;

      const startWidth = isMobile
        ? Math.min(window.innerWidth * 0.86, 380)
        : Math.min(window.innerWidth * 0.42, 720);
      const maxEndWidth = isMobile
        ? Math.min(window.innerWidth * 0.94, 760)
        : Math.min(window.innerWidth * 0.84, 1480);
      const maxEndHeight = isMobile
        ? Math.min(window.innerHeight * 0.58, 620)
        : Math.min(window.innerHeight * 0.76, 820);
      const endWidth = Math.min(maxEndWidth, maxEndHeight * HERO_MEDIA_ASPECT);
      const startHeight = startWidth / HERO_MEDIA_ASPECT;
      const endHeight = endWidth / HERO_MEDIA_ASPECT;
      const titleOpacity = clamp(1 - contentProgress * 1.25);

      media.style.width = `${startWidth + (endWidth - startWidth) * eased}px`;
      media.style.height = `${startHeight + (endHeight - startHeight) * eased}px`;
      media.style.borderRadius = `${26 - 14 * eased}px`;
      media.style.transform = `translate3d(0, ${-10 * progress}px, 0)`;

      if (bgRef.current) {
        bgRef.current.style.opacity = `${1 - 0.76 * contentEase}`;
        bgRef.current.style.transform = `scale(${1 + 0.03 * eased})`;
      }

      if (overlayRef.current) {
        overlayRef.current.style.opacity = `${0.34 - 0.18 * contentEase}`;
      }

      if (cardScrimRef.current) {
        cardScrimRef.current.style.opacity = `${0.1 + 0.52 * contentEase}`;
      }

      if (firstLineRef.current) {
        firstLineRef.current.style.transform = `translate3d(0, ${-6 * eased}px, 0)`;
        firstLineRef.current.style.opacity = `${titleOpacity}`;
      }

      if (secondLineRef.current) {
        secondLineRef.current.style.transform = `translate3d(0, ${6 * eased}px, 0)`;
        secondLineRef.current.style.opacity = `${titleOpacity}`;
      }

      if (introRef.current) {
        introRef.current.style.opacity = `${contentEase}`;
        introRef.current.style.transform = `translate3d(0, ${22 - 22 * contentEase}px, 0)`;
      }

      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = `${clamp(1 - progress * 2.8)}`;
        scrollHintRef.current.style.transform = `translate3d(-50%, ${10 * progress}px, 0)`;
      }
    };

    const requestApply = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(applyProgress);
    };

    applyProgress();
    window.addEventListener("scroll", requestApply, { passive: true });
    window.addEventListener("resize", requestApply);

    return () => {
      window.removeEventListener("scroll", requestApply);
      window.removeEventListener("resize", requestApply);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[230svh] bg-white">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: "scale(1)" }}
        >
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
          <div
            ref={mediaRef}
            className="relative aspect-video w-[min(86vw,380px)] overflow-hidden shadow-2xl shadow-black/35 will-change-transform md:w-[min(42vw,720px)]"
            style={{ borderRadius: 26 }}
          >
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
            <div ref={overlayRef} className="absolute inset-0 bg-black" style={{ opacity: 0.34 }} />
            <div ref={cardScrimRef} className="absolute inset-0 bg-black" style={{ opacity: 0.1 }} />
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
              <h1 className="max-w-[92%] font-serif text-[clamp(2.3rem,5vw,5.8rem)] font-bold leading-[0.94] text-white/70 drop-shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
                <span ref={firstLineRef} className="block will-change-transform">
                  {titleParts.firstWord}
                </span>
                <span ref={secondLineRef} className="block [text-wrap:balance] will-change-transform">
                  {titleParts.rest}
                </span>
              </h1>
            </div>
            <div
              ref={introRef}
              className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center text-white opacity-0"
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

        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 will-change-transform"
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
