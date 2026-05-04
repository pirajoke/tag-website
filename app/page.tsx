import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { NewsGrid } from "@/components/sections/NewsGrid";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero
        title="Shaping Policy. Winning Campaigns. Delivering Results."
        subtitle="New York's premier strategic consulting firm — 35+ years of lobbying, campaigns, and communications excellence."
        cta={{ label: "Get in Touch", href: "/contact" }}
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
