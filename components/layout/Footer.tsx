"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const showFooterCta = pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="site-footer"
      className="relative -mt-px overflow-hidden bg-navy text-white"
    >
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
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-serif md:-bottom-10"
        style={{
          fontSize: "clamp(8rem, 15vw, 18rem)",
          lineHeight: 0.8,
          fontWeight: 900,
          letterSpacing: "0",
          color: "transparent",
          WebkitTextStroke: "1px rgba(201,168,76,0.06)",
          background:
            "linear-gradient(180deg, rgba(201,168,76,0.08) 0%, transparent 65%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        TAG
      </div>

      {showFooterCta && (
        <div className="relative w-full overflow-hidden border-b border-white/5 py-3 z-10">
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
      )}

      {/* Main content */}
      <div
        className={`relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 sm:px-6 ${
          showFooterCta ? "py-12 md:py-12 lg:py-14" : "py-7 md:py-8 lg:py-9"
        }`}
      >
        {showFooterCta && (
          <div className="reveal-up grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
            <div>
              <h2 className="font-serif text-[3.15rem] font-bold leading-[0.98] sm:text-6xl md:text-7xl lg:text-[5.4rem] lg:leading-[1.02] xl:text-[6rem]">
                <span className="bg-gradient-to-b from-white to-white/45 bg-clip-text text-transparent">
                  Ready to Make
                </span>
                <br />
                <span className="bg-gradient-to-b from-gold to-gold/65 bg-clip-text text-transparent">
                  an Impact?
                </span>
              </h2>
            </div>

            <div className="flex flex-col items-start justify-center lg:max-w-xl">
              <p className="text-sm leading-relaxed text-white/50 md:text-base lg:text-lg">
                Let&apos;s discuss how TAG can help you achieve your strategic
                goals.
              </p>

              <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex justify-center rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-widest text-navy transition-colors duration-300 hover:bg-gold/90"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/services"
                  className="inline-flex justify-center rounded-full border border-white/20 px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Footer columns */}
        <div className="w-full">
          <div className="grid grid-cols-1 gap-7 py-7 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.1fr_1.35fr_1.25fr_0.8fr]">
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
              <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 md:grid-cols-1 lg:grid-cols-2">
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
              <ul className="space-y-1.5 break-words text-xs text-white/40">
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
          <div className="relative flex flex-col items-center justify-center gap-3 border-t border-white/5 pt-4 sm:min-h-9">
            <p className="text-center text-[10px] uppercase tracking-widest text-white/20">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all duration-300 hover:border-gold hover:text-gold sm:absolute sm:right-0 sm:top-4"
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
