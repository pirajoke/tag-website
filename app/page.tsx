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
        mediaSrc="https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1280&h=720&fit=crop&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop&q=80"
        title="Shaping Policy. Winning Campaigns."
        date="Est. 1990"
        scrollToExpand="Scroll to Explore"
        textBlend
      />
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
