"use client";

import { useEffect, useState } from "react";

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://inspectoreats.com/api/stats?public=1")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.todayTotal === "number") setCount(data.todayTotal);
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
      {count.toLocaleString()} visitor{count !== 1 ? "s" : ""} today
    </span>
  );
}
