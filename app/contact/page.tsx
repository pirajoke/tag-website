"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
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
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-12">
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy mb-4">Our Office</h3>
                <div className="space-y-3 text-steel"><p>{siteConfig.address}</p><p>420 Lexington Avenue, Suite 1402</p><p>New York, NY 10170</p></div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy mb-4">Direct Contact</h3>
                <div className="space-y-3">
                  <a href={`tel:${siteConfig.phone}`} className="block text-navy hover:text-gold transition-colors font-medium">{siteConfig.phone}</a>
                  <a href={`mailto:${siteConfig.email}`} className="block text-navy hover:text-gold transition-colors font-medium">{siteConfig.email}</a>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-navy mb-4">Follow Us</h3>
                <div className="flex gap-6">
                  <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-steel hover:text-gold transition-colors font-medium">Twitter / X</a>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-steel hover:text-gold transition-colors font-medium">LinkedIn</a>
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-steel hover:text-gold transition-colors font-medium">Facebook</a>
                </div>
              </div>
              <div className="aspect-video bg-navy-light relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center"><span className="text-gold font-serif text-3xl font-bold">NYC</span><p className="text-white/40 text-sm mt-2">39 Broadway, New York</p></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
