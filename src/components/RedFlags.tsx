import { RedFlag } from "@/lib/demoData";

interface RedFlagsProps {
  flags: RedFlag[];
}

const SEVERITY_CONFIG = {
  high: {
    bg: "bg-red-50",
    border: "border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    badgeBg: "bg-red-100",
    badgeText: "text-red-700",
    label: "High Priority",
  },
  medium: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    label: "Review Carefully",
  },
  low: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
    label: "Worth Asking",
  },
};

function FlagIcon({ severity }: { severity: RedFlag["severity"] }) {
  if (severity === "high") {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    );
  }
  if (severity === "medium") {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  );
}

export default function RedFlags({ flags }: RedFlagsProps) {
  if (flags.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center gap-4">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <div className="font-semibold text-green-900">No red flags detected</div>
          <div className="text-green-700 text-sm">All bids appear to be complete and reasonably priced.</div>
        </div>
      </div>
    );
  }

  const highFlags = flags.filter((f) => f.severity === "high");
  const mediumFlags = flags.filter((f) => f.severity === "medium");
  const lowFlags = flags.filter((f) => f.severity === "low");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-bold text-slate-900">Red Flags & Alerts</h3>
        <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">
          {flags.length} {flags.length === 1 ? "issue" : "issues"} found
        </span>
      </div>

      {[...highFlags, ...mediumFlags, ...lowFlags].map((flag, i) => {
        const cfg = SEVERITY_CONFIG[flag.severity];
        return (
          <div
            key={i}
            className={`${cfg.bg} ${cfg.border} border rounded-xl p-4 flex gap-4 items-start`}
          >
            <div className={`${cfg.iconBg} ${cfg.iconColor} w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <FlagIcon severity={flag.severity} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold text-slate-900 text-sm">{flag.title}</span>
                <span className={`${cfg.badgeBg} ${cfg.badgeText} text-xs font-semibold px-2 py-0.5 rounded-full`}>
                  {cfg.label}
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{flag.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
