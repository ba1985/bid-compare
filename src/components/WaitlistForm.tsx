"use client";

import { useState } from "react";

interface WaitlistFormProps {
  initialCount?: number;
  variant?: "hero" | "sticky";
}

export default function WaitlistForm({ initialCount = 127, variant = "hero" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [count, setCount] = useState(initialCount);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json() as { success?: boolean; error?: string; count?: number; message?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      if (data.count) setCount(data.count + initialCount);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (variant === "sticky") {
    return (
      <div className="flex items-center gap-3 w-full">
        {status === "success" ? (
          <p className="text-emerald-400 font-semibold text-sm">
            ✓ You&apos;re on the list! We&apos;ll notify you first.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-3 py-2 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#10B981] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-600 transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {status === "loading" ? "..." : "Get Early Access"}
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {status === "success" ? (
        <div className="text-center">
          <div className="text-5xl mb-3">🎉</div>
          <p className="text-white font-bold text-xl mb-1">You&apos;re on the list!</p>
          <p className="text-blue-200 text-sm">We&apos;ll email you the moment we launch. You&apos;ll be among the first {count} to get the deal.</p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3.5 rounded-xl text-slate-900 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#10B981] text-white px-6 py-3.5 rounded-xl text-base font-bold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 whitespace-nowrap"
            >
              {status === "loading" ? "Joining..." : "Join Waitlist →"}
            </button>
          </form>
          {status === "error" && (
            <p className="text-red-300 text-sm mt-2 text-center">{errorMsg}</p>
          )}
          <p className="text-blue-200 text-sm mt-3 text-center">
            <span className="text-white font-semibold">{count} people</span> already signed up
          </p>
        </>
      )}
    </div>
  );
}
