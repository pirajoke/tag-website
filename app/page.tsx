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
        mediaSrc="https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=1280&h=720&fit=crop&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop&q=80"
        title="Shaping Policy. Winning Campaigns."
        date="Est. 1990"
        scrollToExpand="Scroll to Explore"
        textBlend
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            The Advance Group
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-navy leading-tight">
            New York&apos;s Premier Political Consulting Firm
          </h2>
          <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          <p className="mt-8 text-steel text-lg leading-relaxed max-w-3xl mx-auto">
            For over three decades, TAG has been at the forefront of political
            strategy, government relations, and public affairs in New York City.
            We combine deep institutional knowledge with innovative approaches to
            deliver results for campaigns, advocacy groups, labor unions, and
            corporations.
          </p>
          <p className="mt-4 text-steel text-lg leading-relaxed max-w-3xl mx-auto">
            From City Hall to Albany to Washington, our team navigates the
            complex landscape of government with precision, integrity, and an
            unmatched network of relationships built over 35 years.
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
