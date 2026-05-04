import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=1280&h=720&fit=crop&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop&q=80"
        title="Shaping Policy. Winning Campaigns."
        date="Est. 1990"
        scrollToExpand="Scroll to Explore"
        textBlend
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Together, We Make It Happen
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy leading-tight">
            35 Years of Delivering Results
          </h2>
          <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          <p className="mt-8 text-steel text-lg leading-relaxed max-w-3xl mx-auto">
            Founded and led by Scott Levenson since 1990, TAG is a diverse team
            of individuals with a broad mix of creative and strategic abilities.
            Our combined expertise spans lobbying, campaigns and elections,
            communications, graphic design, fundraising, grant writing, and
            event management.
          </p>
          <p className="mt-4 text-steel text-lg leading-relaxed max-w-3xl mx-auto">
            What sets us apart is the institutional knowledge and trust
            we&apos;ve cultivated over three and a half decades. From managing
            nationally watched political races to producing internationally
            recognized events, we leverage our unique experience into innovative
            and effective solutions.
          </p>
        </div>
      </ScrollExpandMedia>
      <StatsBar />
      <ServicesGrid />
      <ClientsMarquee />
      <AboutTeaser />
      <Testimonials />
      <NewsGrid limit={3} />
      <CTASection />
    </>
  );
}
