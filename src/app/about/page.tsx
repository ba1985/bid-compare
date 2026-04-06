import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#1E40AF] font-bold text-2xl">Bid</span>
            <span className="text-[#10B981] font-bold text-2xl">Compare</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            About BidCompare
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            We built BidCompare because hiring a contractor is one of the biggest financial decisions a homeowner makes — and it shouldn&apos;t require a construction degree to do it confidently.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* What is BidCompare */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is BidCompare?</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              BidCompare is a free tool that helps homeowners make sense of contractor bids. You upload 2–3 quotes you&apos;ve received, and our AI extracts every line item — materials, labor, permits, fees — and lays them out in a clean side-by-side table.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              We highlight the cheapest and most expensive entries, flag missing line items (often a sign of hidden costs or unlicensed work), and give you plain-language explanations of potential red flags.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The goal isn&apos;t to tell you who to hire. It&apos;s to give you the information you need to have an informed conversation with each contractor — and make a decision you feel confident about.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h2>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "You upload your bids",
                desc: "PDFs work best — just forward the email attachment. Photos of printed bids work too, as long as the text is legible. We accept up to 3 bids per comparison.",
                color: "#1E40AF",
              },
              {
                step: "02",
                title: "AI reads and extracts line items",
                desc: "Our AI uses document understanding to parse each bid — recognizing categories, descriptions, quantities, unit prices, and totals regardless of formatting.",
                color: "#10B981",
              },
              {
                step: "03",
                title: "We align and normalize",
                desc: "We match similar items across bids (e.g. \"demolition\" vs. \"demo & haul\"), create a unified structure, and flag anything that appears in one bid but not others.",
                color: "#F59E0B",
              },
              {
                step: "04",
                title: "You get a clear comparison",
                desc: "A color-coded table, a summary of savings, and a list of red flags — all explained in plain English. No spreadsheets, no construction jargon.",
                color: "#7C3AED",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1"
                  style={{ backgroundColor: item.color }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Who is it for?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Homeowners getting multiple bids for renovations",
              "First-time home buyers navigating repair quotes",
              "Rental property owners comparing maintenance quotes",
              "Anyone who feels overwhelmed by contractor pricing",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Privacy &amp; Your Files</h2>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#1E40AF] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-slate-900 mb-1">Files processed locally</div>
                <div className="text-slate-700 text-sm leading-relaxed">
                  In the current MVP, all file handling happens in your browser. Your bid documents are never transmitted to or stored on our servers.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#1E40AF] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a.75.75 0 01.75.75v.258a33.186 33.186 0 016.668.83.75.75 0 01-.336 1.461 31.28 31.28 0 00-1.103-.232l1.702 7.545a.75.75 0 01-.387.832A4.981 4.981 0 0115 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 01-.387-.832l1.77-7.849a31.743 31.743 0 00-3.339-.254V15h2.25a.75.75 0 010 1.5h-6a.75.75 0 010-1.5H9V5.51a31.743 31.743 0 00-3.339.254l1.77 7.849a.75.75 0 01-.387.832A4.98 4.98 0 015 14a4.98 4.98 0 01-2.294-.556.75.75 0 01-.387-.832l1.702-7.545c-.372.056-.74.12-1.103.232a.75.75 0 01-.336-1.461 33.186 33.186 0 016.668-.83V2.75A.75.75 0 0110 2z" />
              </svg>
              <div>
                <div className="font-semibold text-slate-900 mb-1">No account, no tracking</div>
                <div className="text-slate-700 text-sm leading-relaxed">
                  We don&apos;t require an email address or account. We don&apos;t run ad tracking or sell data. We may collect anonymous, aggregate usage statistics to improve the product.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#1E40AF] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-slate-900 mb-1">Future cloud processing</div>
                <div className="text-slate-700 text-sm leading-relaxed">
                  When we add AI-powered extraction (coming soon), files will be temporarily sent to an AI API for processing and immediately deleted. We will update this policy before that feature ships.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Important Disclaimer</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-900 leading-relaxed space-y-3">
            <p>
              <strong>BidCompare is an informational tool, not professional advice.</strong> Our AI-generated comparisons are meant to help you ask better questions — not to replace the judgment of a licensed contractor, building inspector, or construction professional.
            </p>
            <p>
              Price comparisons depend entirely on the accuracy and completeness of the bids you upload. We cannot verify contractor credentials, license status, insurance, or the quality of their work. Always do your own due diligence before hiring.
            </p>
            <p>
              The lowest bid is not always the best choice. Consider factors like timeline, warranty, reputation, and communication alongside price.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to try it?</h2>
          <p className="text-slate-600 mb-6">Free, no account required. Upload your bids and see a comparison in seconds.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/compare"
              className="bg-[#1E40AF] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#1e3a8a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Compare My Bids — Free →
            </Link>
            <Link
              href="/results?demo=true"
              className="px-8 py-3.5 rounded-xl font-semibold border-2 border-slate-200 text-slate-700 hover:border-[#1E40AF] hover:text-[#1E40AF] transition-colors"
            >
              See Demo First
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
