"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { LocationMap } from "@/components/ui/LocationMap";
import { siteConfig } from "@/lib/data";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

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
                    <div><label className="block text-navy text-sm font-semibold uppercase tracking-wider mb-2">First Name</label><input type="text" required className="w-full px-4 py-3 bg-ivory border border-navy/10 focus:border-gold focus:outline-none text-navy" /></div>
                    <div><label className="block text-navy text-sm font-semibold uppercase tracking-wider mb-2">Last Name</label><input type="text" required className="w-full px-4 py-3 bg-ivory border border-navy/10 focus:border-gold focus:outline-none text-navy" /></div>
                  </div>
                  <div><label className="block text-navy text-sm font-semibold uppercase tracking-wider mb-2">Email</label><input type="email" required className="w-full px-4 py-3 bg-ivory border border-navy/10 focus:border-gold focus:outline-none text-navy" /></div>
                  <div><label className="block text-navy text-sm font-semibold uppercase tracking-wider mb-2">Organization</label><input type="text" className="w-full px-4 py-3 bg-ivory border border-navy/10 focus:border-gold focus:outline-none text-navy" /></div>
                  <div><label className="block text-navy text-sm font-semibold uppercase tracking-wider mb-2">How Can We Help?</label><select className="w-full px-4 py-3 bg-ivory border border-navy/10 focus:border-gold focus:outline-none text-navy"><option value="">Select a service...</option><option>Lobbying</option><option>Political Campaigns</option><option>Communications</option><option>Graphic Design</option><option>Fundraising</option><option>Grant Writing</option><option>Event Management</option><option>Other</option></select></div>
                  <div><label className="block text-navy text-sm font-semibold uppercase tracking-wider mb-2">Message</label><textarea rows={5} required className="w-full px-4 py-3 bg-ivory border border-navy/10 focus:border-gold focus:outline-none text-navy resize-none" /></div>
                  <button type="submit" className="w-full bg-gold hover:bg-gold/90 text-navy py-4 rounded-full text-sm font-semibold tracking-widest uppercase transition-colors">Send Message</button>
                </form>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-10">
              {/* Office — interactive map card + address */}
              <div className="flex flex-col items-center gap-6">
                <LocationMap
                  location="TAG Headquarters"
                  address="420 Lexington Ave, Suite 1402, New York, NY 10170"
                  coordinates="40.7529° N, 73.9764° W"
                />
                <div className="text-center">
                  <h3 className="font-serif text-lg font-bold text-navy">420 Lexington Ave, Suite 1402</h3>
                  <p className="text-steel text-sm mt-1">New York, NY 10170</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=420+Lexington+Ave+Suite+1402+New+York+NY+10170"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-gold text-sm font-semibold uppercase tracking-wider hover:text-navy transition-colors"
                  >
                    Open in Google Maps &rarr;
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
              <div>
                <h3 className="font-semibold text-navy text-sm uppercase tracking-wider mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-ivory border border-navy/5 flex items-center justify-center text-steel hover:text-gold hover:border-gold/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-ivory border border-navy/5 flex items-center justify-center text-steel hover:text-gold hover:border-gold/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-ivory border border-navy/5 flex items-center justify-center text-steel hover:text-gold hover:border-gold/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
