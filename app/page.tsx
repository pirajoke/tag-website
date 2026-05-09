import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import dynamic from "next/dynamic";
import { IntroSection } from "@/components/sections/IntroSection";
import { ServicesTabs } from "@/components/sections/ServicesTabs";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";

const AboutTeaser = dynamic(() =>
  import("@/components/sections/AboutTeaser").then((mod) => mod.AboutTeaser)
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((mod) => mod.Testimonials)
);
const NewsGrid = dynamic(() =>
  import("@/components/sections/NewsGrid").then((mod) => mod.NewsGrid)
);

export default function Home() {
  return (
    <>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=1280&h=720&fit=crop&q=80"
        bgImageSrc="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&h=1080&fit=crop&q=80"
        title="Together, We Make It Happen"
        scrollToExpand="Scroll to Explore"
      />
      <ClientsMarquee />
      <IntroSection />
      <ServicesTabs />
      <AboutTeaser />
      <Testimonials />
      <NewsGrid limit={3} />
    </>
  );
}
