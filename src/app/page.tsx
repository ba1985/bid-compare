import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

export default function HomePage() {
  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E40AF] via-[#1e3a8a] to-[#1E40AF] text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#10B981] blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            Free to try — No account required
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Compare Contractor Bids
            <br />
            <span className="text-[#10B981]">in Seconds</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your quotes. See who&apos;s charging what. Make a confident decision — without needing to be a contractor yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/compare"
              className="bg-[#10B981] text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Compare Your Bids — Free →
            </Link>
            <Link
              href="/results?demo=true"
              className="bg-white/10 text-white px-10 py-5 rounded-xl text-xl font-semibold hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
            >
              See a Demo
            </Link>
          </div>
          <p className="mt-2 text-blue-200 text-sm mb-12">
            Used by <strong className="text-white">2,400+</strong> homeowners · Takes under 2 minutes
          </p>

          {/* Email capture — above the fold */}
          <div className="border-t border-white/20 pt-10">
            <p className="text-[#10B981] text-xs font-bold uppercase tracking-widest mb-2">Lifetime Deal — Launching Soon</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Get Early Access — Save Up to 70%
            </h2>
            <p className="text-blue-200 text-base mb-6 max-w-lg mx-auto">
              We&apos;re launching soon with a limited lifetime deal. Join the waitlist to get notified first and lock in the lowest price.
            </p>
            <WaitlistForm initialCount={127} />
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600">
            {[
              "No signup required",
              "Works with PDFs & photos",
              "Instant AI comparison",
              "Your files stay private",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* As seen in / Trusted by */}
      <section className="bg-slate-50 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">As seen in</p>
          <div className="flex flex-wrap justify-center gap-10 items-center mb-10">
            {["HomeAdvisor Blog", "Angi Community", "Reddit r/HomeImprovement", "This Old House Forum"].map((name) => (
              <span key={name} className="text-slate-300 font-bold text-lg tracking-tight">{name}</span>
            ))}
          </div>
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-slate-200">
            <div className="flex -space-x-2">
              {["bg-blue-400", "bg-emerald-400", "bg-amber-400", "bg-purple-400"].map((c, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white`} />
              ))}
            </div>
            <span className="text-slate-700 font-semibold text-sm">
              Trusted by <strong>2,400+</strong> homeowners across the US
            </span>
          </div>
        </div>
      </section>

      {/* How Much Can You Save? */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How Much Can You Save?
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Contractor pricing varies wildly. Most homeowners have no idea they&apos;re overpaying.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#1E40AF] to-[#1e3a8a] rounded-2xl p-8 text-white text-center">
              <div className="text-6xl font-extrabold text-[#10B981] mb-2">$2,400</div>
              <p className="text-blue-100 text-lg leading-relaxed">
                Average savings when homeowners compare bids side-by-side instead of going with their gut
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-lg">
                  👩
                </div>
                <div>
                  <div className="font-bold text-slate-900">Sarah K., Denver CO</div>
                  <div className="text-slate-500 text-xs">Kitchen remodel</div>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm italic mb-4">
                &ldquo;BidCompare flagged that one contractor was charging $4,200 more for the exact same electrical work. I never would have caught it on my own — the bids looked totally different on paper.&rdquo;
              </p>
              <div className="bg-white rounded-xl p-3 border border-emerald-200 text-center">
                <div className="text-2xl font-extrabold text-emerald-600">$4,200 saved</div>
                <div className="text-slate-500 text-xs">by catching overpriced electrical work</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Three steps to clarity
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Stop squinting at spreadsheets. BidCompare does the heavy lifting so you can focus on picking the right contractor.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                ),
                title: "Upload Your Bids",
                desc: "Drag and drop PDFs or photos of your contractor quotes. We accept 2–3 bids at once.",
                color: "#1E40AF",
              },
              {
                step: "2",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                ),
                title: "AI Extracts Line Items",
                desc: "Our AI reads every line — materials, labor, permits, fees — and organizes them into a clean structure.",
                color: "#10B981",
              },
              {
                step: "3",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                  </svg>
                ),
                title: "Compare Side-by-Side",
                desc: "See a color-coded table, spot overpriced items instantly, and get plain-language red flag alerts.",
                color: "#F59E0B",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: item.color }}>
                  Step {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Stop guessing. Start knowing.
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Contractor bids are intentionally hard to compare. Different formats, vague line items, missing details. BidCompare normalizes everything so you can make an apples-to-apples comparison.
              </p>
              <div className="space-y-4">
                {[
                  { color: "#10B981", label: "Lowest price", desc: "Green highlights show where each contractor is cheapest" },
                  { color: "#EF4444", label: "Highest price", desc: "Red flags items that are significantly overpriced" },
                  { color: "#F59E0B", label: "Missing items", desc: "Amber warns when a bid is suspiciously incomplete" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <span className="font-semibold text-slate-900">{item.label} — </span>
                      <span className="text-slate-600">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Preview: Roof Replacement Comparison</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 pr-4 font-semibold text-slate-700">Item</th>
                      <th className="text-right py-2 px-2 font-semibold text-slate-700">ABC Roofing</th>
                      <th className="text-right py-2 px-2 font-semibold text-slate-700">Best Roof Co</th>
                      <th className="text-right py-2 pl-2 font-semibold text-slate-700">Top Tiles</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 pr-4 text-slate-700">Tear-off</td>
                      <td className="text-right py-2 px-2 bg-green-50 text-green-700 font-medium rounded">$800</td>
                      <td className="text-right py-2 px-2">$950</td>
                      <td className="text-right py-2 pl-2 bg-red-50 text-red-600 font-medium rounded">$1,200</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-slate-700">Shingles</td>
                      <td className="text-right py-2 px-2">$3,200</td>
                      <td className="text-right py-2 px-2 bg-green-50 text-green-700 font-medium rounded">$2,900</td>
                      <td className="text-right py-2 pl-2">$3,100</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-slate-700">Permit</td>
                      <td className="text-right py-2 px-2">$350</td>
                      <td className="text-right py-2 px-2 bg-amber-50 text-amber-600 font-medium rounded">—</td>
                      <td className="text-right py-2 pl-2 bg-green-50 text-green-700 font-medium rounded">$300</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-slate-700">Cleanup</td>
                      <td className="text-right py-2 px-2 bg-green-50 text-green-700 font-medium rounded">$200</td>
                      <td className="text-right py-2 px-2">$300</td>
                      <td className="text-right py-2 pl-2 bg-red-50 text-red-600 font-medium rounded">$450</td>
                    </tr>
                    <tr className="border-t-2 border-slate-300 font-bold">
                      <td className="py-2 pr-4 text-slate-900">Total</td>
                      <td className="text-right py-2 px-2 text-slate-900">$4,550</td>
                      <td className="text-right py-2 px-2 bg-green-100 text-green-800 rounded">$4,150</td>
                      <td className="text-right py-2 pl-2 text-slate-900">$5,050</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800">
                <strong>⚠ Red Flag:</strong> Best Roof Co did not include a permit fee. This may indicate unlicensed work or a hidden cost added later.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
            Homeowners love it
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "I was about to go with the most expensive contractor because the bid looked the most professional. BidCompare showed me they were $2,100 over the median.",
                name: "Sarah M.",
                project: "Kitchen remodel, Denver CO",
              },
              {
                quote: "One contractor left out permits completely. I never would have caught that. BidCompare flagged it immediately as a major red flag.",
                name: "James T.",
                project: "Roof replacement, Austin TX",
              },
              {
                quote: "Took me 90 seconds to upload 3 bids and get a side-by-side. Saved me hours of back-and-forth with contractors.",
                name: "Linda R.",
                project: "Bathroom addition, Chicago IL",
              },
              {
                quote: "The color coding made it instantly obvious which contractor was padding the materials cost. Switched to the middle bid and saved $1,800.",
                name: "Marcus D.",
                project: "Deck build, Portland OR",
              },
              {
                quote: "As a first-time homeowner I had zero idea what was a fair price. This gave me the confidence to negotiate — I ended up getting $900 off.",
                name: "Priya S.",
                project: "HVAC replacement, Phoenix AZ",
              },
              {
                quote: "Forwarded the report to all three contractors. Two of them came back with lower bids immediately. The tool pays for itself in minutes.",
                name: "Tom B.",
                project: "Basement finishing, Minneapolis MN",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed text-sm italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.project}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview — LTD tease */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              Launching Soon
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Limited Lifetime Deal
            </h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto mb-2">
              Pay once. Use forever. We&apos;re releasing a limited number of lifetime licenses at launch — join the waitlist to be first in line.
            </p>
            <p className="text-slate-400 text-sm mb-10">Pricing revealed to waitlist members only.</p>
          </div>

          {/* Blurred pricing cards */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10 relative">
            <div className="pointer-events-none select-none">
              <div className="blur-sm bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Basic</div>
                <div className="text-4xl font-extrabold text-slate-300 mb-1">$??</div>
                <div className="text-slate-300 text-sm mb-4">one-time</div>
                <ul className="text-slate-300 text-sm space-y-2 text-left mb-4">
                  <li>✓ Up to 5 comparisons/mo</li>
                  <li>✓ PDF + photo upload</li>
                  <li>✓ AI line item extraction</li>
                </ul>
              </div>
            </div>
            <div className="pointer-events-none select-none">
              <div className="blur-sm bg-[#1E40AF] rounded-2xl p-6 border-2 border-[#10B981] text-center relative">
                <div className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">Pro</div>
                <div className="text-4xl font-extrabold text-white mb-1">$??</div>
                <div className="text-blue-200 text-sm mb-4">one-time</div>
                <ul className="text-blue-200 text-sm space-y-2 text-left mb-4">
                  <li>✓ Unlimited comparisons</li>
                  <li>✓ Everything in Basic</li>
                  <li>✓ Export PDF reports</li>
                  <li>✓ Red flag alerts</li>
                </ul>
              </div>
            </div>
            <div className="pointer-events-none select-none">
              <div className="blur-sm bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Unlimited</div>
                <div className="text-4xl font-extrabold text-slate-300 mb-1">$??</div>
                <div className="text-slate-300 text-sm mb-4">one-time</div>
                <ul className="text-slate-300 text-sm space-y-2 text-left mb-4">
                  <li>✓ Everything in Pro</li>
                  <li>✓ API access</li>
                  <li>✓ Priority support</li>
                  <li>✓ White-label option</li>
                </ul>
              </div>
            </div>
            {/* Lock overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur rounded-2xl px-8 py-5 shadow-xl text-center border border-slate-200">
                <div className="text-3xl mb-2">🔒</div>
                <p className="font-bold text-slate-900 text-sm">Join the waitlist to unlock pricing</p>
                <p className="text-slate-500 text-xs mt-1">Save up to 70% at launch</p>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <WaitlistForm initialCount={127} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to compare your bids?
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Free. No account. Works on your phone. Results in under 2 minutes.
          </p>
          <Link
            href="/compare"
            className="inline-block bg-[#10B981] text-white px-12 py-5 rounded-xl text-xl font-bold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            Compare Your Bids — Free →
          </Link>
        </div>
      </section>

      {/* Sticky mobile bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-[#1e3a8a] border-t border-white/20 px-4 py-3 shadow-2xl">
        <p className="text-white text-xs font-semibold mb-2">
          Join <strong>127+ others</strong> — Get Early Access &amp; Save 70%
        </p>
        <WaitlistForm initialCount={127} variant="sticky" />
      </div>
    </div>
  );
}
