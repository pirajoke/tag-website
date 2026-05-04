"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "TAG's strategic guidance was instrumental in our campaign's success. Their deep understanding of New York politics and ability to navigate complex stakeholder landscapes set them apart.",
    name: "Vanessa L. Gibson",
    title: "Borough President",
    company: "The Bronx",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    quote:
      "Working with The Advance Group transformed our advocacy efforts. Their team brought a level of expertise and dedication that exceeded our expectations at every turn.",
    name: "Donovan Richards",
    title: "Borough President",
    company: "Queens",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    quote:
      "TAG delivered results when it mattered most. Their communications strategy and media relations expertise helped us build public support and achieve our policy goals.",
    name: "Carmen De La Rosa",
    title: "Assembly Member",
    company: "New York State",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    quote:
      "The Advance Group's lobbying expertise and government relations network are unmatched. They helped us navigate the regulatory landscape with precision and effectiveness.",
    name: "Michael Torres",
    title: "Executive Director",
    company: "NY Communities for Change",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, handleNext]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 600 : -600, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 600 : -600, opacity: 0 }),
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-24 bg-navy overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.3em] border border-gold/30 px-4 py-2 mb-6">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            What Our Clients Say
          </h2>
          <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        {/* Testimonial Card */}
        <div className="relative min-h-[320px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-gold/10 rounded-2xl p-8 md:p-12">
                <Quote className="w-12 h-12 text-gold/20 mb-6" />

                <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 italic font-light">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold/40 flex-shrink-0">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {current.name}
                    </h4>
                    <p className="text-gold text-sm font-medium">
                      {current.title}
                    </p>
                    <p className="text-white/40 text-xs">{current.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-2 bg-gold"
                    : "w-2 h-2 bg-gold/30 hover:bg-gold/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-6 max-w-sm mx-auto">
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 6, ease: "linear" }}
              className="h-full bg-gold/60"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
