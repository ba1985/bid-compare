import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  projects,
  cities,
  getProjectBySlug,
  getCityBySlug,
  getCostData,
  formatCurrency,
  slugToTitle,
} from "@/lib/costData";

interface Props {
  params: Promise<{ project: string; city: string }>;
}

export async function generateStaticParams() {
  const params: { project: string; city: string }[] = [];
  for (const project of projects) {
    for (const city of cities) {
      params.push({ project: project.slug, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: projectSlug, city: citySlug } = await params;
  const project = getProjectBySlug(projectSlug);
  const city = getCityBySlug(citySlug);
  if (!project || !city) return {};

  const cost = getCostData(project, city);
  const title = `Average Cost of ${project.name} in ${city.name}, ${city.state} (2026)`;
  const description = `${project.name} in ${city.name} costs ${formatCurrency(cost.low)}–${formatCurrency(cost.high)}, with a typical price of ${formatCurrency(cost.avg)}. See cost breakdowns, what to watch for in bids, and compare your contractor quotes free.`;

  return {
    title,
    description,
    keywords: `${project.name.toLowerCase()} cost ${city.name}, average ${project.name.toLowerCase()} price ${city.name}, ${project.name.toLowerCase()} ${city.name} ${city.state}`,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function CostPage({ params }: Props) {
  const { project: projectSlug, city: citySlug } = await params;
  const project = getProjectBySlug(projectSlug);
  const city = getCityBySlug(citySlug);

  if (!project || !city) notFound();

  const cost = getCostData(project, city);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: project.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const relatedProjects = project.relatedProjects
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6 flex flex-wrap gap-1 items-center">
          <Link href="/costs" className="hover:text-[#1E40AF]">Cost Guides</Link>
          <span>/</span>
          <Link href={`/costs/${project.slug}`} className="hover:text-[#1E40AF]">{project.name}</Link>
          <span>/</span>
          <span className="text-slate-700">{city.name}</span>
        </nav>

        {/* Hero */}
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
          Average Cost of {project.name} in {city.name} (2026)
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          {project.name} in {city.name}, {city.state} typically costs{" "}
          <strong>{formatCurrency(cost.low)}–{formatCurrency(cost.high)}</strong>, with most homeowners
          paying around <strong>{formatCurrency(cost.avg)}</strong>. {project.description}
        </p>

        {/* Cost Range Table */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            {project.name} Cost in {city.name}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Low End</p>
              <p className="text-2xl font-bold text-slate-800">{formatCurrency(cost.low)}</p>
              <p className="text-xs text-slate-500 mt-1">Basic scope, budget materials</p>
            </div>
            <div className="bg-[#EFF6FF] border-2 border-[#1E40AF] rounded-xl p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1E40AF] mb-1">Average</p>
              <p className="text-2xl font-bold text-[#1E40AF]">{formatCurrency(cost.avg)}</p>
              <p className="text-xs text-slate-500 mt-1">Most {city.name} homeowners pay</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">High End</p>
              <p className="text-2xl font-bold text-slate-800">{formatCurrency(cost.high)}</p>
              <p className="text-xs text-slate-500 mt-1">Premium materials, complex scope</p>
            </div>
          </div>
        </section>

        {/* Cost Breakdown */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Cost Breakdown</h2>
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-600 font-semibold">Component</th>
                  <th className="text-right px-4 py-3 text-slate-600 font-semibold">Est. Range</th>
                </tr>
              </thead>
              <tbody>
                {project.components.map((component, i) => (
                  <tr key={component.name} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-4 py-3 text-slate-700">{component.name}</td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {formatCurrency(Math.round((cost.avg * component.lowPct) / 100 / 100) * 100)}–
                      {formatCurrency(Math.round((cost.avg * component.highPct) / 100 / 100) * 100)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            * Ranges are estimates based on average {city.name} market pricing. Your actual costs may vary.
          </p>
        </section>

        {/* Cost Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            What Affects the Cost of {project.name} in {city.name}?
          </h2>
          <ul className="space-y-2">
            {project.costFactors.map((factor) => (
              <li key={factor} className="flex gap-3 items-start">
                <span className="text-[#10B981] mt-0.5 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="text-slate-600">{factor}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Bid Tips */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            What to Look for in Your {project.name} Bid
          </h2>
          <p className="text-slate-600 mb-4">
            Before signing anything, make sure your contractor&apos;s bid clearly addresses these points:
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
            {project.bidTips.map((tip) => (
              <div key={tip} className="flex gap-3 items-start">
                <span className="text-amber-500 flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
                <span className="text-slate-700 text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Got bids for your {project.name}?</h2>
            <p className="text-blue-200 mb-6">
              Upload your contractor bids and BidCompare will instantly highlight price differences,
              missing items, and red flags — so you know exactly which bid is the real deal.
            </p>
            <Link
              href="/compare"
              className="inline-block bg-[#10B981] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#059669] transition-colors"
            >
              Compare Your Bids Free →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {project.faqs.map((faq) => (
              <details key={faq.question} className="group border border-slate-200 rounded-xl overflow-hidden">
                <summary className="flex justify-between items-center px-5 py-4 cursor-pointer text-slate-800 font-medium hover:bg-slate-50">
                  {faq.question}
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-4 text-slate-600 text-sm">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Related Cost Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProjects.map((related) => {
                if (!related) return null;
                const relatedCost = getCostData(related, city);
                return (
                  <Link
                    key={related.slug}
                    href={`/costs/${related.slug}/${city.slug}`}
                    className="bg-white border border-slate-200 rounded-xl p-4 hover:border-[#1E40AF] hover:shadow-sm transition-all"
                  >
                    <p className="font-medium text-slate-800 text-sm mb-1">{related.name}</p>
                    <p className="text-[#1E40AF] font-semibold text-sm">
                      {formatCurrency(relatedCost.low)}–{formatCurrency(relatedCost.high)}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{city.name}, {city.state}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Cities for this project */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            {project.name} Costs in Other Cities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {cities
              .filter((c) => c.slug !== city.slug)
              .map((otherCity) => {
                const otherCost = getCostData(project, otherCity);
                return (
                  <Link
                    key={otherCity.slug}
                    href={`/costs/${project.slug}/${otherCity.slug}`}
                    className="text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg hover:border-[#1E40AF] hover:bg-[#EFF6FF] transition-colors"
                  >
                    <span className="font-medium text-slate-700">{otherCity.name}</span>
                    <span className="text-slate-500 ml-1">({formatCurrency(otherCost.avg)})</span>
                  </Link>
                );
              })}
          </div>
        </section>
      </div>
    </>
  );
}
