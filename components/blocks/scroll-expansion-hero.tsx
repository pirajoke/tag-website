'use client';

import { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  bgImageSrc,
  title,
}: ScrollExpandMediaProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    let frame = 0;
    let active = false;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setProgress = (progress: number) => {
      const expandProgress = Math.min(1, progress / 0.6);
      const mediaScale = 0.55 + (1 - 0.55) * expandProgress;
      const mobileScale = 0.7 + (1 - 0.7) * expandProgress;

      element.style.setProperty('--bg-opacity', String(Math.max(0, 1 - progress / 0.5)));
      element.style.setProperty('--media-scale', String(mediaScale));
      element.style.setProperty('--media-mobile-scale', String(mobileScale));
      element.style.setProperty('--media-radius', `${24 * Math.max(0, 1 - progress / 0.5)}px`);
      element.style.setProperty('--overlay-opacity', String(Math.min(1, Math.max(0, (progress - 0.3) / 0.3))));
      element.style.setProperty('--title-opacity', String(Math.max(0, 1 - progress / 0.3)));
      element.style.setProperty('--title-y', `${-60 * Math.min(1, progress / 0.3)}px`);
      element.style.setProperty('--hero-visibility', progress > 0.985 ? 'hidden' : 'visible');
      element.style.setProperty('--hero-pointer-events', progress > 0.985 ? 'none' : 'auto');
    };

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const range = Math.max(1, element.offsetHeight - window.innerHeight);
      const progress = reduceMotion ? 1 : Math.min(1, Math.max(0, -rect.top / range));
      setProgress(progress);
    };

    const schedule = () => {
      if (!active || frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) {
          update();
          return;
        }

        const rect = element.getBoundingClientRect();
        setProgress(rect.bottom < 0 ? 1 : 0);
      },
      { rootMargin: '120px 0px' }
    );

    update();
    observer.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const titleLines = title
    ? title
        .split('. ')
        .filter(Boolean)
        .map((line) => (line.endsWith('.') ? line : `${line}.`))
    : [];

  return (
    <div
      ref={sectionRef}
      className="relative h-[190vh] [--bg-opacity:1] [--media-scale:0.55] [--media-mobile-scale:0.7] [--media-radius:24px] [--overlay-opacity:0] [--title-opacity:1] [--title-y:0px] [--hero-visibility:visible] [--hero-pointer-events:auto]"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={
          {
            visibility: 'var(--hero-visibility)',
            pointerEvents: 'var(--hero-pointer-events)',
          } as unknown as CSSProperties
        }
      >
        <div
          className="absolute inset-0 z-0 transform-gpu will-change-opacity"
          style={{ opacity: 'var(--bg-opacity)' }}
        >
          <Image
            src={bgImageSrc}
            alt="Background"
            fill
            sizes="100vw"
            quality={62}
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div
            className="relative h-screen w-screen scale-[var(--media-mobile-scale)] transform-gpu overflow-hidden will-change-transform md:scale-[var(--media-scale)]"
            style={{
              borderRadius: 'var(--media-radius)',
            }}
          >
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
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
                alt={title || 'Media'}
                fill
                sizes="100vw"
                quality={66}
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/30" />

            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-between bg-gradient-to-b from-black/50 via-transparent to-black/70 px-6 py-10 text-center md:px-12 md:py-16"
              style={{ opacity: 'var(--overlay-opacity)' }}
            >
              <div className="flex flex-col items-center">
                <span className="mb-5 inline-block border border-gold/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  Est. 1990 &mdash; New York City
                </span>
                <h2 className="font-serif text-2xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Together, We Make<br />It Happen
                </h2>
              </div>

              <div className="flex flex-col items-center">
                <p className="max-w-3xl text-base font-light leading-relaxed text-white/90 md:text-xl">
                  Since 1990, TAG has represented political candidates, not-for-profits, corporations, advocacy groups, and labor unions — combining deep institutional knowledge with innovative strategy to deliver results.
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-wider text-white/50 md:gap-6 md:text-sm">
                  <span>Lobbying</span>
                  <span className="text-gold">&#9670;</span>
                  <span>Campaigns</span>
                  <span className="text-gold">&#9670;</span>
                  <span>Communications</span>
                  <span className="text-gold">&#9670;</span>
                  <span>Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-center"
          style={{
            opacity: 'var(--title-opacity)',
            transform: 'translate3d(0, var(--title-y), 0)',
          }}
        >
          <h1 className="px-4 font-serif text-5xl font-bold leading-[0.9] text-white/70 mix-blend-difference sm:text-6xl md:text-7xl lg:text-8xl">
            {titleLines.map((line) => (
              <span key={line} className="block whitespace-nowrap">
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div
          className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: 'var(--title-opacity)' }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">Scroll</span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/30 p-1">
            <div className="h-2 w-1 rounded-full bg-white/50 animate-scroll-dot" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
