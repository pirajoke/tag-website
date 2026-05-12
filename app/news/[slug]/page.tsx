import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/sections/CTASection";
import { news } from "@/lib/data";

const getSlug = (link: string) => link.split("/").filter(Boolean).at(-1);

const articleBody: Record<string, string[]> = {
  "affordable-housing-as-infrastructure-for-human-dignity": [
    "Affordable housing is more than a line item in a public budget. It shapes whether families can stay rooted, workers can reach opportunity, and neighborhoods can grow without losing the people who built them.",
    "The same is true for transit access and public infrastructure. When mobility is treated as a public good, policy can connect housing, jobs, schools, and healthcare into a more durable civic system.",
    "TAG works with clients to make those connections clear, build coalitions around practical policy goals, and communicate why infrastructure investments matter in everyday life.",
  ],
  "ai-generated-imagery-and-political-information": [
    "AI-generated imagery is changing how political information is created, shared, and challenged. The speed of synthetic content makes verification and message discipline more important than ever.",
    "Campaigns, advocacy groups, and public institutions need clear internal standards for what they publish, how they respond to manipulated media, and how they maintain trust with audiences.",
    "TAG helps clients prepare for this environment with sharper review processes, rapid response planning, and communications strategies built around credibility.",
  ],
  "tag-celebrates-35-years-of-strategic-excellence": [
    "Since 1990, The Advance Group has helped candidates, nonprofits, corporations, unions, and advocacy organizations move complex goals through a demanding public landscape.",
    "That work has always depended on a combination of relationships, strategy, and execution. TAG brings those disciplines together across lobbying, campaigns, communications, fundraising, creative, and events.",
    "The firm’s longevity reflects the trust built with clients and partners across New York and beyond, and the same practical focus continues to guide the work today.",
  ],
  "navigating-nycs-evolving-policy-landscape": [
    "New York City’s policy landscape changes quickly. Organizations that want to shape outcomes need to understand the process, the stakeholders, and the timing behind every decision.",
    "Effective engagement starts with clear goals and a realistic map of the public environment. From there, advocacy becomes a matter of disciplined relationships, message clarity, and follow-through.",
    "TAG helps clients move through that environment with strategy grounded in institutional knowledge and day-to-day execution.",
  ],
  "the-future-of-political-campaigning": [
    "Campaigns are now shaped by fragmented attention, faster news cycles, and more ways for voters to receive information. The fundamentals still matter, but execution has to be more precise.",
    "Digital tools can expand reach, but winning campaigns still depend on credible messages, local trust, field work, and a strong sense of what voters need to hear.",
    "TAG combines campaign experience with creative and communications strategy to help candidates and causes connect with audiences when it counts.",
  ],
  "effective-nonprofit-advocacy-strategies": [
    "Nonprofit advocacy works best when mission, coalition building, and public communication reinforce each other. A strong cause still needs a clear path to influence.",
    "That means identifying decision-makers, activating partners, preparing persuasive materials, and knowing when public pressure or quiet engagement will be most effective.",
    "TAG supports nonprofit clients with the strategy and execution needed to move from values to measurable outcomes.",
  ],
};

export function generateStaticParams() {
  return news
    .map((article) => getSlug(article.link))
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = news.find((item) => getSlug(item.link) === slug);

  if (!article) notFound();

  const body = articleBody[slug] ?? [article.excerpt];

  return (
    <>
      <section className="bg-navy px-6 pb-20 pt-32 text-white md:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {article.category}
          </p>
          <h1 className="mt-5 font-serif text-4xl font-bold leading-tight md:text-6xl">
            {article.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            {article.excerpt}
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      <article className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-7 text-lg leading-relaxed text-steel">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Link
            href="/news"
            className="mt-12 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-navy"
          >
            Back to News &rarr;
          </Link>
        </div>
      </article>

      <CTASection />
    </>
  );
}
