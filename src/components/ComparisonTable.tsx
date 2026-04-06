"use client";

import { useState } from "react";
import {
  DemoComparison,
  getCellClass,
  formatCurrency,
  getMinPrice,
  getMaxPrice,
} from "@/lib/demoData";

interface ComparisonTableProps {
  data: DemoComparison;
}

const CONTRACTOR_COLORS = ["text-[#1E40AF]", "text-[#10B981]", "text-[#7C3AED]"];
const HEADER_COLORS = ["bg-blue-600", "bg-emerald-600", "bg-purple-600"];

function CellValue({
  price,
  prices,
}: {
  price: number | null;
  prices: (number | null)[];
}) {
  const type = getCellClass(price, prices);

  if (price === null) {
    return (
      <td className="py-3 px-4 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 bg-amber-100 text-amber-700 rounded text-xs font-bold">
          —
        </span>
      </td>
    );
  }

  if (type === "lowest") {
    return (
      <td className="py-3 px-4 text-center bg-green-50">
        <span className="text-green-700 font-semibold text-sm">{formatCurrency(price)}</span>
        <span className="block text-[10px] text-green-600 font-medium leading-tight">lowest</span>
      </td>
    );
  }

  if (type === "highest") {
    const min = getMinPrice(prices);
    const diff = price - min;
    return (
      <td className="py-3 px-4 text-center bg-red-50">
        <span className="text-red-600 font-semibold text-sm">{formatCurrency(price)}</span>
        <span className="block text-[10px] text-red-500 font-medium leading-tight">+{formatCurrency(diff)}</span>
      </td>
    );
  }

  return (
    <td className="py-3 px-4 text-center">
      <span className="text-slate-700 font-medium text-sm">{formatCurrency(price)}</span>
    </td>
  );
}

export default function ComparisonTable({ data }: ComparisonTableProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const categories = [...new Set(data.lineItems.map((item) => item.category))];

  function toggleCategory(cat: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  const totals = data.contractors.map((_, i) =>
    data.lineItems.reduce((sum, item) => sum + (item.prices[i] ?? 0), 0)
  );
  const minTotal = Math.min(...totals);
  const maxTotal = Math.max(...totals);

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full min-w-[640px] border-collapse bg-white">
        {/* Header */}
        <thead>
          <tr>
            <th className="py-4 px-4 text-left bg-slate-50 border-b border-slate-200 w-[40%]">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Line Item</span>
            </th>
            {data.contractors.map((c, i) => (
              <th
                key={c.company}
                className={`py-4 px-4 text-center border-b border-slate-200 ${HEADER_COLORS[i] ?? "bg-slate-600"} text-white`}
              >
                <div className="text-sm font-bold leading-tight">{c.company}</div>
                <div className="text-xs opacity-80 mt-0.5">{c.name}</div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.lineItems.map((item, rowIdx) => {
            const hasVariance =
              item.prices.filter((p) => p !== null).length > 1 &&
              getMaxPrice(item.prices) !== getMinPrice(item.prices);
            const hasMissing = item.prices.some((p) => p === null);

            return (
              <tr
                key={rowIdx}
                className={`border-b border-slate-100 ${rowIdx % 2 === 0 ? "bg-white" : "bg-slate-50/40"} hover:bg-blue-50/30 transition-colors`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-start gap-2">
                    <div>
                      <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        {item.category}
                        {hasMissing && (
                          <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">
                            MISSING
                          </span>
                        )}
                        {hasVariance && !hasMissing && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                            VARIANCE
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.description}</div>
                    </div>
                  </div>
                </td>
                {item.prices.map((price, ci) => (
                  <CellValue key={ci} price={price} prices={item.prices} />
                ))}
              </tr>
            );
          })}

          {/* Totals row */}
          <tr className="bg-slate-800 text-white">
            <td className="py-4 px-4 font-bold text-sm">TOTAL</td>
            {totals.map((total, i) => {
              const isLowest = total === minTotal;
              const isHighest = total === maxTotal && minTotal !== maxTotal;
              return (
                <td key={i} className={`py-4 px-4 text-center font-bold text-base ${isLowest ? "text-[#10B981]" : isHighest ? "text-[#EF4444]" : "text-white"}`}>
                  {formatCurrency(total)}
                  {isLowest && <span className="block text-[10px] text-[#10B981] opacity-80">Best Deal</span>}
                  {isHighest && <span className="block text-[10px] text-[#EF4444] opacity-80">Most Expensive</span>}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>

      {/* Legend */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-3 flex flex-wrap gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-200" />
          <span>Lowest price</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-red-200" />
          <span>Highest price</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-200" />
          <span>Missing from bid</span>
        </div>
      </div>
    </div>
  );
}
