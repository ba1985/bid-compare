import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, cities, getProjectBySlug, getCostData, formatCurrency } from "@/lib/costData";

interface Props {
  params: Promise<{ project: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ project: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);
  if (!project) return {};

  const title = `Average Cost of ${project.name} by City (2026) — BidCompare`;
  const description = `How much does ${project.name.toLowerCase()} cost in your city? Compare prices across 15 major US cities and get tips on what to look for in your contractor bids.`;

  return {
    title,
    description,
    keywords: `${project.name.toLowerCase()} cost by city, average ${project.name.toLowerCase()} price, ${project.name.toLowerCase()} contractor quotes`,
    openGraph: { title, description, type: "website" },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { project: projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);
  if (!project) notFound();

  const nationalAvgLow = Math.round(project.baseLow / 100) * 100;
  const nationalAvgHigh = Math.round(project.baseHigh / 100) * 100;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex gap-1 items-center">
        <Link href="/costs" className="hover:text-[#1E40AF]">Cost Guides</Link>
        <span>/</span>
        <span className="text-slate-700">{project.name}</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
        Average Cost of {project.name} by City (2026)
      </h1>
      <p className="text-lg text-slate-600 mb-2">
        {project.description}
      </p>
      <p className="text-slate-500 mb-8">
        National average: <strong className="text-slate-700">{formatCurrency(nationalAvgLow)}–{formatCurrency(nationalAvgHigh)}</strong>. Costs vary significantly by location — select your city below.
      </p>

      {/* City grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {cities.map((city) => {
          const cost = getCostData(project, city);
          return (
            <Link
              key={city.slug}
              href={`/costs/${project.slug}/${city.slug}`}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#1E40AF] hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-slate-800 group-hover:text-[#1E40AF] transition-colors">
                    {city.name}
                  </p>
                  <p className="text-xs text-slate-400">{city.state}</p>
                </div>
                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
                  {city.multiplier > 1.2 ? "High cost" : city.multiplier < 0.95 ? "Low cost" : "Mid cost"}
                </span>
              </div>
              <p className="text-[#1E40AF] font-bold text-lg">
                {formatCurrency(cost.avg)}
              </p>
              <p className="text-xs text-slate-500">
                Range: {formatCurrency(cost.low)}–{formatCurrency(cost.high)}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Cost factors summary */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          What Affects {project.name} Costs?
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.costFactors.map((factor) => (
            <li key={factor} className="flex gap-3 items-start">
              <span className="text-[#10B981] mt-0.5 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className="text-slate-600 text-sm">{factor}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a] rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Have bids for your {project.name}?</h2>
        <p className="text-blue-200 mb-6">
          Upload your contractor bids and instantly see a side-by-side comparison with red flags highlighted.
        </p>
        <Link
          href="/compare"
          className="inline-block bg-[#10B981] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#059669] transition-colors"
        >
          Compare Your Bids Free →
        </Link>
      </div>
    </div>
  );
}
