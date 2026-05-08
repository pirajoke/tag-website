"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { navLinks, siteConfig } from "@/lib/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let frame = 0;

    const updateScrolled = () => {
      frame = 0;
      const next = window.scrollY > 24;

      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrolled);
    };

    updateScrolled();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled
            ? "bg-white shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-gold font-serif text-2xl font-bold tracking-tight">
              TAG
            </span>
            <span className={`hidden sm:block text-sm font-light tracking-wider uppercase transition-colors duration-300 ${
              scrolled ? "text-navy/70" : "text-white/80"
            }`}>
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                  scrolled
                    ? "text-navy/70 hover:text-gold"
                    : "text-white/80 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="border border-gold/60 hover:bg-gold hover:text-navy text-gold px-5 py-2 text-sm font-medium tracking-wide uppercase rounded-full transition-all duration-300"
            >
              Get in Touch
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                scrolled ? "bg-navy" : "bg-white"
              } ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                scrolled ? "bg-navy" : "bg-white"
              } ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                scrolled ? "bg-navy" : "bg-white"
              } ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-navy animate-fade-in-up">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white text-2xl font-serif tracking-wide hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              </div>
            ))}
            <div>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 border border-gold/60 hover:bg-gold hover:text-navy text-gold px-8 py-3 text-lg font-medium tracking-wide uppercase rounded-full transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
