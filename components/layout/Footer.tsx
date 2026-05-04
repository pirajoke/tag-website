import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <span className="text-gold font-serif text-3xl font-bold">
              TAG
            </span>
            <p className="mt-3 text-white/60 text-sm leading-relaxed">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 text-white/40 text-xs">
              Est. {siteConfig.founded} &mdash; New York City
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>{siteConfig.address}</li>
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-gold transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold transition-colors">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-wider mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors text-sm"
              >
                Twitter / X
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors text-sm"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p className="text-white/30 text-xs">
            420 Lexington Avenue, Suite 1402, New York, NY 10170
          </p>
        </div>
      </div>
    </footer>
  );
}
