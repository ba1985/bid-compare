"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { demoComparison, computeRedFlags, formatCurrency, DemoComparison } from "@/lib/demoData";
import type { ExtractionResult, ExtractedBid } from "@/app/api/extract/route";
import BidCard from "@/components/BidCard";
import ComparisonTable from "@/components/ComparisonTable";
import RedFlags from "@/components/RedFlags";
import Link from "next/link";

function buildComparisonFromExtracted(result: ExtractionResult): DemoComparison {
  const contractors = result.contractors.map((c) => ({
    name: c.contractor_name,
    company: c.contractor_name,
    total: c.grand_total,
  }));

  // Collect all unique item descriptions across all contractors
  const allDescriptions: string[] = [];
  for (const c of result.contractors) {
    for (const item of c.items) {
      if (!allDescriptions.includes(item.description)) {
        allDescriptions.push(item.description);
      }
    }
  }

  const lineItems = allDescriptions.map((desc) => ({
    category: desc.split(" ").slice(0, 3).join(" "),
    description: desc,
    prices: result.contractors.map((c) => {
      const match = c.items.find(
        (i) => i.description.toLowerCase() === desc.toLowerCase()
      );
      return match ? match.total : null;
    }),
  }));

  const projectType = result.contractors[0]?.project_type || "Contractor Bid";

  return { project: projectType, contractors, lineItems };
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const rawData = searchParams.get("data");
  const isDemo = searchParams.get("demo") === "true" || !rawData;

  let data: DemoComparison = demoComparison;
  let parseError = false;

  if (rawData) {
    try {
      const decoded = JSON.parse(atob(decodeURIComponent(rawData))) as ExtractionResult;
      data = buildComparisonFromExtracted(decoded);
    } catch {
      parseError = true;
    }
  }

  const flags = computeRedFlags(data);

  const totals = data.contractors.map((_, i) =>
    data.lineItems.reduce((sum, item) => sum + (item.prices[i] ?? 0), 0)
  );
  const minTotal = Math.min(...totals);
  const maxTotal = Math.max(...totals);
  const savings = maxTotal - minTotal;

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: "BidCompare — My Contractor Bid Comparison",
        text: `I compared ${data.contractors.length} contractor bids for my ${data.project} and saved ${formatCurrency(savings)}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <Link href="/compare" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#1E40AF] transition-colors mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Upload new bids
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${isDemo ? "bg-blue-100 text-[#1E40AF]" : "bg-emerald-100 text-emerald-700"}`}>
                  {isDemo ? "Demo Comparison" : "AI Extraction"}
                </span>
                <span className="text-slate-400 text-xs">·</span>
                <span className="text-slate-500 text-xs">{data.lineItems.length} line items extracted</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {data.project} — Bid Comparison
              </h1>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-[#1E40AF] hover:text-[#1E40AF] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-500 font-semibold text-sm cursor-not-allowed"
                title="PDF download coming soon"
                disabled
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PDF Report
                <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-bold">SOON</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {parseError && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
            Could not read extracted data — showing demo instead.
          </div>
        )}

        {/* Savings banner */}
        {savings > 0 && (
          <div className="bg-gradient-to-r from-[#10B981] to-emerald-600 rounded-2xl p-5 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-extrabold">{formatCurrency(savings)} potential savings</div>
                <div className="text-emerald-100 text-sm">
                  Between the lowest and highest bids. Choosing wisely matters.
                </div>
              </div>
            </div>
            {isDemo && (
              <Link
                href="/compare"
                className="bg-white text-[#10B981] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors flex-shrink-0 text-center"
              >
                Compare Your Own Bids
              </Link>
            )}
          </div>
        )}

        {/* Bid summary cards */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Summary by Contractor</h2>
          <div className={`grid gap-4 ${data.contractors.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
            {data.contractors.map((bid, i) => (
              <BidCard
                key={bid.company + i}
                bid={bid}
                index={i}
                isLowest={totals[i] === minTotal}
                isHighest={totals[i] === maxTotal && minTotal !== maxTotal}
                savings={savings}
              />
            ))}
          </div>
        </div>

        {/* Red flags */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <RedFlags flags={flags} />
        </div>

        {/* Full comparison table */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Full Line-Item Comparison</h2>
          <ComparisonTable data={data} />
        </div>

        {/* What to do next */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">What to do next</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "💬",
                title: "Ask about missing items",
                desc: "Contact contractors who are missing line items and ask if those costs are included elsewhere or if they'll be added later.",
              },
              {
                icon: "🔍",
                title: "Get clarification on high items",
                desc: "For line items that are significantly more expensive, ask the contractor to explain why their price is higher.",
              },
              {
                icon: "📋",
                title: "Check licenses & reviews",
                desc: "Verify each contractor's license at your state licensing board and check Google/Yelp reviews before deciding.",
              },
              {
                icon: "📝",
                title: "Request itemized revisions",
                desc: "Ask all contractors to resubmit with the same line items so you can do a true apples-to-apples comparison.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 bg-slate-50 rounded-xl">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-semibold text-slate-900 text-sm mb-1">{item.title}</div>
                  <div className="text-slate-600 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Ready to compare your real bids?</h3>
          <p className="text-blue-200 mb-6">Upload your contractor PDFs or photos and get your own comparison in seconds.</p>
          <Link
            href="/compare"
            className="inline-block bg-[#10B981] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Upload My Bids — Free →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500">Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
