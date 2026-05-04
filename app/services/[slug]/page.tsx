import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/lib/data";
import { CTASection } from "@/components/sections/CTASection";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const currentIndex = services.indexOf(service);
  const nextService = services[(currentIndex + 1) % services.length];

  return (
    <>
      <section className="min-h-[50vh] pt-24 pb-16 bg-navy text-white flex items-center">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Our Services</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{service.icon}</span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold">{service.title}</h1>
          </div>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">{service.shortDescription}</p>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-steel leading-relaxed text-lg">{service.description}</p>
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-navy mb-8">What We Deliver</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.highlights.map((h) => (
                <div key={h} className="flex items-start gap-3 p-4 bg-ivory border-l-4 border-gold">
                  <span className="text-gold">&#9670;</span>
                  <span className="text-navy text-sm font-medium">{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 pt-12 border-t border-navy/10">
            <p className="text-steel text-sm uppercase tracking-wider mb-2">Next Service</p>
            <Link href={`/services/${nextService.slug}`} className="group flex items-center gap-4">
              <span className="text-3xl">{nextService.icon}</span>
              <span className="font-serif text-2xl font-bold text-navy group-hover:text-gold transition-colors">{nextService.title}</span>
              <span className="text-gold text-xl ml-auto group-hover:translate-x-2 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
