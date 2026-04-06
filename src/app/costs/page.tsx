import { Metadata } from "next";
import Link from "next/link";
import { projects, cities, getCostData, formatCurrency } from "@/lib/costData";

export const metadata: Metadata = {
  title: "Home Improvement Cost Guides (2026) — BidCompare",
  description:
    "Free cost guides for 15 home improvement projects across 15 major US cities. Get realistic price ranges, cost breakdowns, and tips for comparing contractor bids.",
  keywords:
    "home improvement costs, contractor cost guide, remodeling cost estimator, how much does renovation cost",
  openGraph: {
    title: "Home Improvement Cost Guides (2026) — BidCompare",
    description:
      "Free cost guides for 15 home improvement projects across 15 major US cities.",
    type: "website",
  },
};

export default function CostsIndexPage() {
  const featuredCity = cities.find((c) => c.slug === "los-angeles")!;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          Home Improvement Cost Guides
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-2">
          Real price ranges for 15 projects across 15 major US cities — updated for 2026.
        </p>
        <p className="text-slate-500">
          Know what to pay before you hire. Then{" "}
          <Link href="/compare" className="text-[#1E40AF] hover:underline font-medium">
            compare your bids on BidCompare →
          </Link>
        </p>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {projects.map((project) => {
          const cost = getCostData(project, featuredCity);
          return (
            <Link
              key={project.slug}
              href={`/costs/${project.slug}`}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#1E40AF] hover:shadow-md transition-all group"
            >
              <h2 className="font-semibold text-slate-800 group-hover:text-[#1E40AF] transition-colors text-lg mb-1">
                {project.name}
              </h2>
              <p className="text-sm text-slate-500 mb-3 line-clamp-2">{project.description}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Avg. in Los Angeles</p>
                  <p className="text-[#1E40AF] font-bold">
                    {formatCurrency(cost.low)}–{formatCurrency(cost.high)}
                  </p>
                </div>
                <span className="text-[#1E40AF] text-sm font-medium group-hover:underline">
                  15 cities →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* City index */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Browse by City</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {cities.map((city) => (
            <div key={city.slug} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="font-semibold text-slate-800 text-sm">{city.name}</p>
              <p className="text-xs text-slate-400 mb-3">{city.state}</p>
              <div className="space-y-1">
                {projects.slice(0, 3).map((project) => (
                  <Link
                    key={project.slug}
                    href={`/costs/${project.slug}/${city.slug}`}
                    className="block text-xs text-[#1E40AF] hover:underline truncate"
                  >
                    {project.name}
                  </Link>
                ))}
                <Link
                  href={`/costs/${projects[0].slug}/${city.slug}`}
                  className="block text-xs text-slate-400 hover:text-[#1E40AF]"
                >
                  +{projects.length - 3} more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a] rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Ready to compare your bids?</h2>
        <p className="text-blue-200 mb-6 max-w-xl mx-auto">
          Once you know the fair price range, upload your contractor bids to BidCompare.
          We&apos;ll flag overpriced items, vague scope, and missing line items instantly.
        </p>
        <Link
          href="/compare"
          className="inline-block bg-[#10B981] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#059669] transition-colors"
        >
          Compare My Bids Free →
        </Link>
      </div>
    </div>
  );
}
