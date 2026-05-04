"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig, navLinks } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  "Lobbying",
  "Political Campaigns",
  "Communications",
  "Graphic Design",
  "Fundraising",
  "Grant Writing",
  "Event Management",
];

export function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "15vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current, columnsRef.current],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes footer-breathe {
              0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
              100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.7; }
            }
            @keyframes footer-marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
            .footer-marquee { animation: footer-marquee 35s linear infinite; }
            .footer-giant {
              font-size: 22vw;
              line-height: 0.8;
              font-weight: 900;
              letter-spacing: -0.04em;
              color: transparent;
              -webkit-text-stroke: 1px rgba(201,168,76,0.08);
              background: linear-gradient(180deg, rgba(201,168,76,0.12) 0%, transparent 60%);
              -webkit-background-clip: text;
              background-clip: text;
            }
          `,
        }}
      />

      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-navy text-white">
          {/* Aurora glow */}
          <div className="footer-breathe absolute left-1/2 top-1/2 h-[50vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[100px] pointer-events-none z-0 bg-gold/10" />

          {/* Grid */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundSize: "60px 60px",
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
            }}
          />

          {/* Giant BG text */}
          <div
            ref={giantTextRef}
            className="footer-giant absolute -bottom-[3vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-serif"
          >
            TAG
          </div>

          {/* Marquee strip */}
          <div className="absolute top-10 left-0 w-full overflow-hidden border-y border-white/5 bg-navy/80 backdrop-blur-md py-3 z-10">
            <div className="flex w-max footer-marquee text-[10px] md:text-xs font-bold tracking-[0.3em] text-white/20 uppercase">
              {[...services, ...services, ...services, ...services].map(
                (s, i) => (
                  <span key={i} className="flex items-center gap-8 px-4">
                    {s}
                    <span className="text-gold/40">&#9670;</span>
                  </span>
                )
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-16 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-center leading-[1.05] mb-6"
            >
              <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                Ready to Make
              </span>
              <br />
              <span className="bg-gradient-to-b from-gold to-gold/60 bg-clip-text text-transparent">
                an Impact?
              </span>
            </h2>

            <p className="text-white/50 text-lg max-w-xl text-center mb-10">
              Let&apos;s discuss how TAG can help you achieve your strategic
              goals.
            </p>

            {/* CTA pills */}
            <div
              ref={linksRef}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <Link
                href="/contact"
                className="bg-gold text-navy px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300"
              >
                Get in Touch
              </Link>
              <Link
                href="/services"
                className="border border-white/20 text-white/80 px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* Footer columns */}
          <div
            ref={columnsRef}
            className="relative z-20 w-full px-6 md:px-12 pb-6"
          >
            <div className="max-w-7xl mx-auto">
              <div className="border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                {/* Brand */}
                <div>
                  <span className="text-gold font-serif text-2xl font-bold">
                    TAG
                  </span>
                  <p className="mt-2 text-white/40 text-xs leading-relaxed">
                    {siteConfig.tagline}
                  </p>
                </div>

                {/* Nav */}
                <div>
                  <h4 className="text-gold/60 text-[10px] font-bold uppercase tracking-widest mb-3">
                    Navigate
                  </h4>
                  <ul className="space-y-1.5">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-white/40 hover:text-gold text-xs transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-gold/60 text-[10px] font-bold uppercase tracking-widest mb-3">
                    Contact
                  </h4>
                  <ul className="space-y-1.5 text-xs text-white/40">
                    <li>420 Lexington Ave, Suite 1402</li>
                    <li>New York, NY 10170</li>
                    <li>
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="hover:text-gold transition-colors"
                      >
                        {siteConfig.phone}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="hover:text-gold transition-colors"
                      >
                        {siteConfig.email}
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Social */}
                <div>
                  <h4 className="text-gold/60 text-[10px] font-bold uppercase tracking-widest mb-3">
                    Follow
                  </h4>
                  <ul className="space-y-1.5">
                    <li>
                      <a
                        href={siteConfig.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-gold text-xs transition-colors"
                      >
                        Twitter / X
                      </a>
                    </li>
                    <li>
                      <a
                        href={siteConfig.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-gold text-xs transition-colors"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href={siteConfig.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-gold text-xs transition-colors"
                      >
                        Facebook
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-white/20 text-[10px] uppercase tracking-widest">
                  &copy; {new Date().getFullYear()} {siteConfig.name}. All
                  rights reserved.
                </p>
                <button
                  onClick={scrollToTop}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-gold hover:border-gold transition-all duration-300 group"
                >
                  <svg
                    className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
