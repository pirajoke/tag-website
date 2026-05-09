'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
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

const clamp = (value: number): number => Math.min(Math.max(value, 0), 1);

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [showContent, setShowContent] = useState<boolean>(false);

  const progressRef = useRef<number>(0);
  const mediaFullyExpandedRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number>(0);
  const isMobileRef = useRef<boolean>(false);
  const showContentRef = useRef<boolean>(false);
  const frameRef = useRef<number | null>(null);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const videoOverlayRef = useRef<HTMLDivElement | null>(null);
  const imageOverlayRef = useRef<HTMLDivElement | null>(null);
  const expandedOverlayRef = useRef<HTMLDivElement | null>(null);
  const metaRef = useRef<HTMLDivElement | null>(null);
  const dateRef = useRef<HTMLParagraphElement | null>(null);
  const scrollLabelRef = useRef<HTMLParagraphElement | null>(null);
  const titleWrapRef = useRef<HTMLDivElement | null>(null);
  const firstTitleRef = useRef<HTMLHeadingElement | null>(null);
  const restTitleRef = useRef<HTMLHeadingElement | null>(null);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  useEffect(() => {
    const updateContentVisibility = (nextShowContent: boolean): void => {
      if (showContentRef.current === nextShowContent) return;
      showContentRef.current = nextShowContent;
      setShowContent(nextShowContent);
    };

    const applyProgress = (): void => {
      frameRef.current = null;

      const scrollProgress = progressRef.current;
      const isMobile = isMobileRef.current;
      const mediaWidth = 300 + scrollProgress * (isMobile ? 650 : 1250);
      const mediaHeight = 400 + scrollProgress * (isMobile ? 200 : 400);
      const textTranslateX = scrollProgress * (isMobile ? 180 : 150);

      if (backgroundRef.current) {
        backgroundRef.current.style.opacity = `${1 - scrollProgress}`;
      }

      if (mediaRef.current) {
        mediaRef.current.style.width = `${mediaWidth}px`;
        mediaRef.current.style.height = `${mediaHeight}px`;
      }

      if (videoOverlayRef.current) {
        videoOverlayRef.current.style.opacity = `${0.5 - scrollProgress * 0.3}`;
      }

      if (imageOverlayRef.current) {
        imageOverlayRef.current.style.opacity = `${0.7 - scrollProgress * 0.3}`;
      }

      if (expandedOverlayRef.current) {
        expandedOverlayRef.current.style.opacity =
          scrollProgress > 0.4 ? `${Math.min((scrollProgress - 0.4) * 2.5, 1)}` : '0';
      }

      if (metaRef.current) {
        metaRef.current.style.opacity = `${Math.max(1 - scrollProgress * 3, 0)}`;
      }

      if (dateRef.current) {
        dateRef.current.style.transform = `translateX(-${textTranslateX}vw)`;
      }

      if (scrollLabelRef.current) {
        scrollLabelRef.current.style.transform = `translateX(${textTranslateX}vw)`;
      }

      if (titleWrapRef.current) {
        titleWrapRef.current.style.opacity = `${Math.max(1 - scrollProgress * 2, 0)}`;
      }

      if (firstTitleRef.current) {
        firstTitleRef.current.style.transform = `translateX(-${textTranslateX}vw)`;
      }

      if (restTitleRef.current) {
        restTitleRef.current.style.transform = `translateX(${textTranslateX}vw)`;
      }
    };

    const requestApply = (): void => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(applyProgress);
    };

    const setProgress = (nextProgress: number): void => {
      const scrollProgress = clamp(nextProgress);
      progressRef.current = scrollProgress;

      if (scrollProgress >= 1) {
        mediaFullyExpandedRef.current = true;
        updateContentVisibility(true);
      } else if (scrollProgress < 0.75) {
        updateContentVisibility(false);
      }

      requestApply();
    };

    const syncViewport = (): void => {
      isMobileRef.current = window.innerWidth < 768;
      requestApply();
    };

    const handleWheel = (e: globalThis.WheelEvent): void => {
      if (mediaFullyExpandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        mediaFullyExpandedRef.current = false;
        e.preventDefault();
        return;
      }

      if (!mediaFullyExpandedRef.current) {
        e.preventDefault();
        setProgress(progressRef.current + e.deltaY * 0.00125);
      }
    };

    const handleTouchStart = (e: globalThis.TouchEvent): void => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: globalThis.TouchEvent): void => {
      if (!touchStartYRef.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;

      if (mediaFullyExpandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        mediaFullyExpandedRef.current = false;
        e.preventDefault();
        return;
      }

      if (!mediaFullyExpandedRef.current) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.011 : 0.007;
        setProgress(progressRef.current + deltaY * scrollFactor);
        touchStartYRef.current = touchY;
      }
    };

    const handleTouchEnd = (): void => {
      touchStartYRef.current = 0;
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpandedRef.current && window.scrollY > 0) {
        window.scrollTo(0, 0);
      }
    };

    progressRef.current = 0;
    mediaFullyExpandedRef.current = false;
    touchStartYRef.current = 0;
    updateContentVisibility(false);
    syncViewport();

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', syncViewport);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', syncViewport);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [mediaType]);

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <div ref={backgroundRef} className='absolute inset-0 z-0 h-full'>
            <Image
              src={bgImageSrc}
              alt='Background'
              width={1920}
              height={1080}
              sizes='100vw'
              className='w-screen h-screen'
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              priority
            />
            <div className='absolute inset-0 bg-black/40' />
          </div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <div
                ref={mediaRef}
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl'
                style={{
                  width: '300px',
                  height: '400px',
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  <div className='relative w-full h-full pointer-events-none'>
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload='metadata'
                      className='w-full h-full object-cover rounded-xl'
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <div
                      ref={videoOverlayRef}
                      className='absolute inset-0 bg-black/30 rounded-xl'
                      style={{ opacity: 0.5 }}
                    />
                  </div>
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      sizes='(min-width: 768px) 95vw, 95vw'
                      className='w-full h-full object-cover rounded-xl'
                      priority
                    />
                    <div
                      ref={imageOverlayRef}
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      style={{ opacity: 0.7 }}
                    />
                  </div>
                )}

                <div
                  ref={expandedOverlayRef}
                  className='absolute inset-0 z-20 flex flex-col items-center justify-between text-center px-8 py-12 md:py-16 rounded-xl bg-gradient-to-b from-black/50 via-transparent to-black/70'
                  style={{ opacity: 0 }}
                >
                  <div className='flex flex-col items-center'>
                    <span className='inline-block text-gold text-xs font-semibold uppercase tracking-[0.3em] border border-gold/30 px-4 py-2 mb-5'>
                      Est. 1990 &mdash; New York City
                    </span>
                    <h2 className='text-3xl md:text-5xl lg:text-6xl font-bold text-white font-serif leading-[1.1]'>
                      Together, We Make<br />It Happen
                    </h2>
                  </div>

                  <div className='flex flex-col items-center'>
                    <p className='text-white/90 text-lg md:text-xl max-w-3xl font-light leading-relaxed'>
                      Since 1990, TAG has represented political candidates, not-for-profits, corporations, advocacy groups, and labor unions &mdash; combining deep institutional knowledge with innovative strategy to deliver results.
                    </p>
                    <div className='mt-4 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white/50 text-sm uppercase tracking-wider'>
                      <span>Lobbying</span>
                      <span className='text-gold'>&#9670;</span>
                      <span>Campaigns</span>
                      <span className='text-gold'>&#9670;</span>
                      <span>Communications</span>
                      <span className='text-gold'>&#9670;</span>
                      <span>Design</span>
                    </div>
                  </div>
                </div>

                <div
                  ref={metaRef}
                  className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'
                >
                  {date && (
                    <p
                      ref={dateRef}
                      className='text-2xl text-gold/80'
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      ref={scrollLabelRef}
                      className='text-white/60 font-medium text-center text-sm uppercase tracking-[0.3em]'
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                ref={titleWrapRef}
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <h2
                  ref={firstTitleRef}
                  className='text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white font-serif leading-[1.05] transition-none'
                >
                  {firstWord}
                </h2>
                <h2
                  ref={restTitleRef}
                  className='text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-center text-white font-serif leading-[1.05] transition-none'
                >
                  {restOfTitle}
                </h2>
              </div>
            </div>

            {children && (
              <section
                className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20 transition-opacity duration-700'
                style={{ opacity: showContent ? 1 : 0 }}
              >
                {children}
              </section>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
