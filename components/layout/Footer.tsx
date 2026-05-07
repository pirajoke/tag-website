"use client";

import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/data";

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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      {/* Subtle static radial glow — no blur, no animation */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Giant BG text — static, no GSAP */}
      <div
        className="absolute -bottom-[3vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-serif"
        style={{
          fontSize: "22vw",
          lineHeight: 0.8,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(201,168,76,0.08)",
          background:
            "linear-gradient(180deg, rgba(201,168,76,0.12) 0%, transparent 60%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        TAG
      </div>

      {/* Marquee strip — GPU-accelerated */}
      <div className="relative w-full overflow-hidden border-b border-white/5 py-4 z-10">
        <div
          className="flex w-max animate-marquee text-[10px] md:text-xs font-bold tracking-[0.3em] text-white/20 uppercase"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        >
          {[...services, ...services, ...services, ...services].map((s, i) => (
            <span key={i} className="flex items-center gap-8 px-4">
              {s}
              <span className="text-gold/40">&#9670;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-20 pb-8 w-full max-w-5xl mx-auto">
        <div className="text-center reveal-up">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.05] mb-6">
            <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              Ready to Make
            </span>
            <br />
            <span className="bg-gradient-to-b from-gold to-gold/60 bg-clip-text text-transparent">
              an Impact?
            </span>
          </h2>

          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
            Let&apos;s discuss how TAG can help you achieve your strategic goals.
          </p>

          {/* CTA pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              href="/contact"
              className="bg-gold text-navy px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-gold/90 transition-colors duration-300"
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              className="border border-white/20 text-white/80 px-10 py-4 rounded-full text-sm font-semibold tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-300"
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* Footer columns */}
        <div className="w-full max-w-7xl mx-auto">
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
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
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
  );
}
