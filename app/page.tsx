import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { ServicesTabs } from "@/components/sections/ServicesTabs";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=1280&h=720&fit=crop&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop&q=80"
        title="Shaping Policy. Winning Campaigns."
        scrollToExpand="Scroll to Explore"
        textBlend
      />
      <IntroSection />
      <ServicesTabs />
      <ClientsMarquee />
      <AboutTeaser />
      <Testimonials />
      <NewsGrid limit={3} />
    </>
  );
}
