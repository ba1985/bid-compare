import { ContractorBid, formatCurrency } from "@/lib/demoData";

interface BidCardProps {
  bid: ContractorBid;
  index: number;
  isLowest: boolean;
  isHighest: boolean;
  savings?: number;
}

const COLORS = ["#1E40AF", "#10B981", "#7C3AED"];
const BG_COLORS = ["bg-blue-50", "bg-emerald-50", "bg-purple-50"];
const BORDER_COLORS = ["border-blue-200", "border-emerald-200", "border-purple-200"];

export default function BidCard({ bid, index, isLowest, isHighest, savings }: BidCardProps) {
  const color = COLORS[index] ?? "#1E40AF";
  const bg = BG_COLORS[index] ?? "bg-blue-50";
  const border = BORDER_COLORS[index] ?? "border-blue-200";

  return (
    <div
      className={`rounded-2xl p-5 border-2 ${border} ${bg} flex flex-col gap-3 relative overflow-hidden`}
    >
      {isLowest && (
        <div className="absolute top-0 right-0 bg-[#10B981] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
          Best Price
        </div>
      )}
      {isHighest && (
        <div className="absolute top-0 right-0 bg-[#EF4444] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
          Most Expensive
        </div>
      )}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: color }}
        >
          {index + 1}
        </div>
        <div>
          <div className="font-bold text-slate-900 text-sm">{bid.company}</div>
          <div className="text-slate-500 text-xs">{bid.name}</div>
        </div>
      </div>
      <div className="text-3xl font-extrabold" style={{ color }}>
        {formatCurrency(bid.total)}
      </div>
      {isLowest && savings && savings > 0 && (
        <div className="text-xs text-[#10B981] font-semibold">
          Save {formatCurrency(savings)} vs. most expensive
        </div>
      )}
      {isHighest && savings && savings > 0 && (
        <div className="text-xs text-[#EF4444] font-semibold">
          {formatCurrency(savings)} more than cheapest
        </div>
      )}
    </div>
  );
}
