"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { LocationMap } from "@/components/ui/LocationMap";
import { siteConfig } from "@/lib/data";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const fieldClass =
    "w-full rounded-2xl border border-navy/10 bg-ivory px-4 py-3 text-navy shadow-sm transition-colors focus:border-gold focus:bg-white focus:outline-none";
  const selectClass =
    "w-full appearance-none rounded-2xl border border-navy/10 bg-ivory px-4 py-3 pr-12 text-navy shadow-sm transition-colors focus:border-gold focus:bg-white focus:outline-none";

  return (
    <>
      <Hero title="Get in Touch" subtitle="Ready to make an impact? Let's talk about how TAG can help you achieve your goals." compact />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {submitted ? (
                <div className="bg-ivory p-12 text-center">
                  <span className="text-gold text-5xl">&#10003;</span>
                  <h3 className="mt-4 font-serif text-2xl font-bold text-navy">Thank You</h3>
                  <p className="mt-2 text-steel">We&apos;ll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div><label className="block text-navy text-sm font-semibold uppercase tracking-wider mb-2">First Name</label><input type="text" required className={fieldClass} /></div>
                    <div><label className="block text-navy text-sm font-semibold uppercase tracking-wider mb-2">Last Name</label><input type="text" required className={fieldClass} /></div>
                  </div>
                  <div><label className="block text-navy text-sm font-semibold uppercase tracking-wider mb-2">Email</label><input type="email" required className={fieldClass} /></div>
                  <div><label className="block text-navy text-sm font-semibold uppercase tracking-wider mb-2">Organization</label><input type="text" className={fieldClass} /></div>
                  <div>
                    <label className="block text-navy text-sm font-semibold uppercase tracking-wider mb-2">How Can We Help?</label>
                    <div className="relative">
                      <select className={selectClass}>
                        <option value="">Select a service...</option>
                        <option>Lobbying</option>
                        <option>Political Campaigns</option>
                        <option>Communications</option>
                        <option>Graphic Design</option>
                        <option>Fundraising</option>
                        <option>Grant Writing</option>
                        <option>Event Management</option>
                        <option>Other</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div><label className="block text-navy text-sm font-semibold uppercase tracking-wider mb-2">Message</label><textarea rows={5} required className={`${fieldClass} resize-none`} /></div>
                  <button type="submit" className="w-full bg-gold hover:bg-gold/90 text-navy py-4 rounded-full text-sm font-semibold tracking-widest uppercase transition-colors">Send Message</button>
                </form>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-10">
              {/* Office — fancy expand map + address card */}
              <LocationMap />
              <div className="bg-ivory border border-navy/5 rounded-2xl p-6 mt-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold text-navy">TAG Headquarters</h3>
                    <p className="text-steel text-sm mt-1">420 Lexington Ave, Suite 1402</p>
                    <p className="text-steel text-sm">New York, NY 10170</p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=420+Lexington+Ave+Suite+1402+New+York+NY+10170"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold hover:bg-gold hover:text-white transition-colors"
                    title="Open in Google Maps"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                  </a>
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-ivory border border-navy/5 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <h3 className="font-semibold text-navy text-sm uppercase tracking-wider">Phone</h3>
                  </div>
                  <a href={`tel:${siteConfig.phone}`} className="text-navy hover:text-gold transition-colors font-medium">{siteConfig.phone}</a>
                </div>
                <div className="bg-ivory border border-navy/5 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <h3 className="font-semibold text-navy text-sm uppercase tracking-wider">Email</h3>
                  </div>
                  <a href={`mailto:${siteConfig.email}`} className="text-navy hover:text-gold transition-colors font-medium text-sm">{siteConfig.email}</a>
                </div>
              </div>

              {/* Social */}
              <div className="text-center">
                <h3 className="font-serif text-2xl font-bold text-navy mb-6">Follow Us</h3>
                <div className="flex justify-center gap-5">
                  <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="flex h-14 w-14 items-center justify-center rounded-2xl border border-navy/10 bg-ivory text-steel shadow-sm transition-colors hover:border-gold/40 hover:text-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-14 w-14 items-center justify-center rounded-2xl border border-navy/10 bg-ivory text-steel shadow-sm transition-colors hover:border-gold/40 hover:text-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="flex h-14 w-14 items-center justify-center rounded-2xl border border-navy/10 bg-ivory text-steel shadow-sm transition-colors hover:border-gold/40 hover:text-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
