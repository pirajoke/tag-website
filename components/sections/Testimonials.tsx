"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

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
  {
    id: 5,
    quote:
      "The team understood the political moment quickly, sharpened the message, and kept our campaign moving with focus.",
    name: "Laurie Cumbo",
    title: "Former Council Member",
    company: "New York City",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    quote:
      "TAG brought discipline, relationships, and clear execution to a complex public-facing effort.",
    name: "Community Partner",
    title: "Executive Lead",
    company: "Advocacy Client",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  },
];

const rows = [testimonials.slice(0, 3), testimonials.slice(3)];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="mx-3 flex h-[198px] w-[calc(100vw-56px)] max-w-[350px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-navy/8 bg-white px-5 py-5 shadow-[0_18px_50px_rgba(42,33,24,0.06)] transition-all duration-300 hover:border-gold/35 hover:shadow-[0_22px_60px_rgba(42,33,24,0.10)] md:h-[208px] md:w-[420px] md:max-w-none md:px-6">
      <div>
        <Quote className="mb-3 h-5 w-5 text-gold/30 md:h-6 md:w-6" />
        <p className="line-clamp-3 text-sm italic leading-relaxed text-navy/65">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-gold/30 bg-navy/10 md:h-11 md:w-11">
          <Image
            src={item.image}
            alt={item.name}
            width={44}
            height={44}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <h4 className="truncate font-serif text-base font-bold leading-tight text-navy md:text-lg">
            {item.name}
          </h4>
          <p className="truncate text-xs font-semibold text-gold">
            {item.title}
          </p>
          <p className="truncate text-xs text-steel/70">{item.company}</p>
        </div>
      </div>
    </article>
  );
}

function TestimonialMarqueeRow({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-1">
      <div
        className={`flex w-max items-stretch hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, index) => (
          <TestimonialCard key={`${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
              Testimonials
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-navy md:text-4xl">
              What Clients Say
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-steel">
            A few notes from campaigns, advocacy partners, and public-sector
            leaders who have worked with TAG.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-32" />

        <div className="flex flex-col gap-4">
          <TestimonialMarqueeRow items={rows[0]} />
          <TestimonialMarqueeRow items={rows[1]} reverse />
        </div>
      </div>
    </section>
  );
}
