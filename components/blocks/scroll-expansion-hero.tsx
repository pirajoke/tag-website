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
  const firstLineRef = useRef<HTMLSpanElement | null>(null);
  const secondLineRef = useRef<HTMLSpanElement | null>(null);
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
      const eased = easeOutCubic(progress);
      const isMobile = window.innerWidth < 768;

      const startWidth = isMobile
        ? Math.min(window.innerWidth * 0.72, 320)
        : Math.min(window.innerWidth * 0.22, 420);
      const endWidth = isMobile
        ? Math.min(window.innerWidth * 0.96, 760)
        : Math.min(window.innerWidth * 0.78, 1500);
      const startHeight = isMobile ? 390 : Math.min(window.innerHeight * 0.5, 500);
      const endHeight = isMobile
        ? Math.min(window.innerHeight * 0.78, 700)
        : Math.min(window.innerHeight * 0.78, 820);
      const textShift = eased * (isMobile ? 42 : 22);

      media.style.width = `${startWidth + (endWidth - startWidth) * eased}px`;
      media.style.height = `${startHeight + (endHeight - startHeight) * eased}px`;
      media.style.borderRadius = `${26 - 8 * eased}px`;
      media.style.transform = `translate3d(0, ${-10 * progress}px, 0)`;

      if (bgRef.current) {
        bgRef.current.style.opacity = `${1 - 0.28 * eased}`;
        bgRef.current.style.transform = `scale(${1 + 0.035 * eased})`;
      }

      if (overlayRef.current) {
        overlayRef.current.style.opacity = `${0.34 - 0.12 * eased}`;
      }

      if (firstLineRef.current) {
        firstLineRef.current.style.transform = `translate3d(-${textShift}vw, ${-8 * eased}px, 0)`;
      }

      if (secondLineRef.current) {
        secondLineRef.current.style.transform = `translate3d(${textShift}vw, ${8 * eased}px, 0)`;
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
    <section ref={sectionRef} className="relative h-[190svh] bg-navy">
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

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div
            ref={mediaRef}
            className="relative overflow-hidden shadow-2xl shadow-black/35 will-change-transform"
            style={{ width: 320, height: 460, borderRadius: 26 }}
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
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center">
          <h1 className="font-serif text-[clamp(3.6rem,8.6vw,9.4rem)] font-bold leading-[0.86] text-white/70 drop-shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
            <span ref={firstLineRef} className="block whitespace-nowrap will-change-transform">
              {titleParts.firstWord}
            </span>
            <span ref={secondLineRef} className="block whitespace-nowrap will-change-transform">
              {titleParts.rest}
            </span>
          </h1>
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
