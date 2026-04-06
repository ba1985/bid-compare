"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    fetch("https://inspectoreats.com/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site: "bidcompare", path: pathname }),
      keepalive: true,
    }).catch(() => {
      // Silently ignore tracking failures
    });
  }, [pathname]);

  return null;
}
