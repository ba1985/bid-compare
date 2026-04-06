"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadZone from "@/components/UploadZone";
import Link from "next/link";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

export default function ComparePage() {
  const router = useRouter();
  const [files, setFiles] = useState<(UploadedFile | null)[]>([null, null, null]);
  const [isComparing, setIsComparing] = useState(false);

  function handleFileChange(index: number, file: UploadedFile | null) {
    setFiles((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  }

  const uploadedCount = files.filter(Boolean).length;
  const canCompare = uploadedCount >= 2;

  function handleCompare() {
    setIsComparing(true);
    // Simulate processing delay for UX
    setTimeout(() => {
      router.push("/results?demo=true");
    }, 1800);
  }

  function handleTryDemo() {
    router.push("/results?demo=true");
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#1E40AF] transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Upload Your Contractor Bids
          </h1>
          <p className="text-slate-600 text-lg">
            Upload 2–3 bids as PDFs or photos. Our AI will extract the line items and build you a comparison in seconds.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Upload zones */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Your Bids</h2>
            <span className="text-sm text-slate-500">
              {uploadedCount} of 3 uploaded
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <UploadZone
              label="Contractor 1 *"
              slotIndex={0}
              file={files[0]}
              onFileChange={handleFileChange}
            />
            <UploadZone
              label="Contractor 2 *"
              slotIndex={1}
              file={files[1]}
              onFileChange={handleFileChange}
            />
            <UploadZone
              label="Contractor 3 (optional)"
              slotIndex={2}
              file={files[2]}
              onFileChange={handleFileChange}
            />
          </div>

          <p className="text-xs text-slate-400 mt-4">
            * Required. Files are processed locally and never stored on our servers.
          </p>
        </div>

        {/* Compare button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCompare}
            disabled={!canCompare || isComparing}
            className={`flex-1 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-3 ${
              canCompare && !isComparing
                ? "bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isComparing ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing your bids…
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Compare Bids {canCompare ? `(${uploadedCount} uploaded)` : "— Upload 2 bids first"}
              </>
            )}
          </button>

          <button
            onClick={handleTryDemo}
            className="sm:w-auto px-6 py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-[#1E40AF] hover:text-[#1E40AF] transition-colors text-sm"
          >
            Try Demo Instead
          </button>
        </div>

        {!canCompare && (
          <p className="text-center text-sm text-slate-400 mt-3">
            Upload at least 2 contractor bids to compare
          </p>
        )}

        {/* Tips */}
        <div className="mt-10 bg-blue-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="font-bold text-[#1E40AF] mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            Tips for best results
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] font-bold mt-0.5">✓</span>
              Use the original PDF if your contractor emailed it — it gives the most accurate text extraction
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] font-bold mt-0.5">✓</span>
              Photos work too — just make sure the bid is flat, well-lit, and all text is readable
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] font-bold mt-0.5">✓</span>
              The more detailed each bid, the better the comparison — ask contractors for itemized quotes
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] font-bold mt-0.5">✓</span>
              Your files are never uploaded to a server — all processing happens in your browser
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
