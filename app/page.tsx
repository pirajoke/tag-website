import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1280&h=720&fit=crop&q=80"
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
      <NewsGrid limit={3} />
      <CTASection />
    </>
  );
}
