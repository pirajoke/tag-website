"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const Sparkles = dynamic(
  () => import("@/components/ui/sparkles").then((mod) => mod.Sparkles),
  { ssr: false, loading: () => null }
);

type ClientLogo = {
  name: string;
  domain: string;
  logoSrc?: string;
  logoClassName?: string;
};

const clients: ClientLogo[] = [
  { name: "NY Communities for Change", domain: "nycommunities.org" },
  {
    name: "Artbridge",
    domain: "art-bridge.org",
    logoSrc: "/logos/artbridge.png",
    logoClassName: "h-8 w-24 opacity-75",
  },
  { name: "CORE", domain: "coreresponse.org" },
  { name: "CWA Local 1180", domain: "cwa1180.org", logoSrc: "/logos/cwa.svg" },
  { name: "Edison Properties", domain: "edisonproperties.com" },
  { name: "Hotel & Gaming Workers Union", domain: "hotelworkers.org" },
  { name: "Met Council on Housing", domain: "metcouncilonhousing.org" },
  { name: "StorageMart", domain: "storage-mart.com" },
  { name: "Youngwoo & Associates", domain: "youngwoo.com" },
  { name: "Manhattan Mini Storage", domain: "manhattanministorage.com" },
  { name: "Climate Organizing Hub", domain: "climateorganizinghub.org" },
  { name: "Freelancers Union", domain: "freelancersunion.org" },
  { name: "Hotel Trades Council", domain: "hotelworkers.org" },
  { name: "ZD Jasper Realty", domain: "zdjasper.com" },
  { name: "Jim Owles Democratic Club", domain: "jimowles.org" },
  { name: "UFT", domain: "uft.org" },
  {
    name: "Carmen De La Rosa",
    domain: "council.nyc.gov",
    logoSrc: "/logos/carmen-de-la-rosa.png",
    logoClassName: "h-12 w-12 object-contain opacity-75",
  },
  { name: "Kamillah Hanks", domain: "kamillahhanks.com" },
  { name: "Donovan Richards", domain: "queensbp.org" },
  { name: "Vanessa L. Gibson", domain: "bronxboropres.nyc.gov" },
];

const row1 = clients.slice(0, 10);
const row2 = clients.slice(10, 20);

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: ClientLogo[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex items-center whitespace-nowrap hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((client, i) => (
          <ClientCard key={`${client.name}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}

function ClientCard({ client }: { client: ClientLogo }) {
  const [fallback, setFallback] = useState(false);
  const [failed, setFailed] = useState(false);
  const logoSrc = client.logoSrc ?? (fallback
    ? `https://www.google.com/s2/favicons?domain=${client.domain}&sz=128`
    : `https://logo.clearbit.com/${client.domain}?size=180`);

  return (
    <div className="group mx-3 inline-flex h-24 min-w-[230px] shrink-0 items-center justify-center rounded-lg border border-navy/8 bg-white px-7 shadow-[0_18px_50px_rgba(42,33,24,0.06)]">
      <div className="flex w-full items-center justify-center gap-4">
        {!failed && (
          <Image
            src={logoSrc}
            alt={`${client.name} logo`}
            width={80}
            height={44}
            unoptimized
            className={cn(
              "h-11 w-20 shrink-0 object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100",
              client.logoClassName
            )}
            loading="lazy"
            onError={() => {
              if (client.logoSrc) {
                setFailed(true);
                return;
              }
              if (!fallback) {
                setFallback(true);
                return;
              }
              setFailed(true);
            }}
          />
        )}
        <span className="max-w-[130px] whitespace-normal text-left text-xs font-semibold leading-tight tracking-normal text-navy/70">
          {client.name}
        </span>
      </div>
    </div>
  );
}

export function ClientsMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSparkles(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-12 md:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] overflow-hidden [mask-image:radial-gradient(58%_58%,white,transparent_82%)]">
        <div className="absolute inset-0 before:absolute before:inset-x-[10%] before:bottom-8 before:h-48 before:bg-[radial-gradient(circle_at_bottom_center,var(--gradient-color),transparent_68%)] before:opacity-20" />
        {showSparkles && (
          <Sparkles
            density={120}
            speed={0.35}
            opacity={0.25}
            opacitySpeed={1.4}
            size={1}
            color="var(--sparkles-color)"
            className="absolute inset-x-0 top-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_80%)]"
          />
        )}
      </div>

      <div className="relative z-10 mx-auto mb-8 max-w-7xl px-6 text-center reveal-up">
        <span className="inline-block border border-gold/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Trusted By Leaders
        </span>
      </div>

      <div className="relative z-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent md:w-32" />

        <div className="flex flex-col gap-5">
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse />
        </div>
      </div>
    </section>
  );
}
