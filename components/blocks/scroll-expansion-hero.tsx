import { ReactNode } from 'react';
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
  const titleLines = title
    ? title
        .split('. ')
        .filter(Boolean)
        .map((line) => (line.endsWith('.') ? line : `${line}.`))
    : [];

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy">
      <Image
        src={bgImageSrc}
        alt="New York City skyline"
        fill
        sizes="100vw"
        quality={64}
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="relative aspect-[4/5] w-[min(28vw,520px)] min-w-[300px] max-w-[520px] overflow-hidden rounded-[24px] shadow-2xl shadow-black/35 md:aspect-[3/4]">
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
              alt={title || 'TAG campaign strategy'}
              fill
              sizes="(min-width: 768px) 30vw, 78vw"
              quality={60}
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/25" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center">
        <h1 className="font-serif text-5xl font-bold leading-[0.9] text-white/72 mix-blend-difference sm:text-6xl md:text-7xl lg:text-8xl">
          {titleLines.map((line) => (
            <span key={line} className="block whitespace-nowrap">
              {line}
            </span>
          ))}
        </h1>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/30 p-1">
          <div className="h-2 w-1 rounded-full bg-white/50 animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
};

export default ScrollExpandMedia;
