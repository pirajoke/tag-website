'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Derived animations from natural scroll
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const mediaScale = useTransform(scrollYProgress, [0, 0.6], [0.55, 1]);
  const mediaMobileScale = useTransform(scrollYProgress, [0, 0.6], [0.7, 1]);
  const mediaRadius = useTransform(scrollYProgress, [0, 0.5], [24, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={sectionRef} className="relative h-[200vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image */}
        <motion.div className="absolute inset-0 z-0" style={{ opacity: bgOpacity }}>
          <Image
            src={bgImageSrc}
            alt="Background"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Expanding media */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <motion.div
            className="relative overflow-hidden"
            style={{
              width: '100vw',
              height: '100vh',
              scale: isMobile ? mediaMobileScale : mediaScale,
              borderRadius: mediaRadius,
            }}
          >
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                controls={false}
              />
            ) : (
              <Image
                src={mediaSrc}
                alt={title || 'Media'}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/30" />

            {/* Overlay content — fades in as media expands */}
            <motion.div
              className="absolute inset-0 z-20 flex flex-col items-center justify-between text-center px-6 py-10 md:px-12 md:py-16 bg-gradient-to-b from-black/50 via-transparent to-black/70"
              style={{ opacity: overlayOpacity }}
            >
              <div className="flex flex-col items-center">
                <span className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.3em] border border-gold/30 px-4 py-2 mb-5">
                  Est. 1990 &mdash; New York City
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif leading-[1.1]">
                  Together, We Make<br />It Happen
                </h2>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-white/90 text-base md:text-xl max-w-3xl font-light leading-relaxed">
                  Since 1990, TAG has represented political candidates, not-for-profits, corporations, advocacy groups, and labor unions — combining deep institutional knowledge with innovative strategy to deliver results.
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-white/50 text-xs md:text-sm uppercase tracking-wider">
                  <span>Lobbying</span>
                  <span className="text-gold">&#9670;</span>
                  <span>Campaigns</span>
                  <span className="text-gold">&#9670;</span>
                  <span>Communications</span>
                  <span className="text-gold">&#9670;</span>
                  <span>Design</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Title text over background */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center text-center pointer-events-none"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white font-serif leading-[1.05] mix-blend-difference px-4">
            {firstWord}
            <br />
            {restOfTitle}
          </h1>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          style={{ opacity: titleOpacity }}
        >
          <span className="text-white/50 text-xs uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
            initial={{ opacity: 0.5 }}
          >
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
