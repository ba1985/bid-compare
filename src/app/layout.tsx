import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import Tracker from "@/components/Tracker";
import VisitorCount from "@/components/VisitorCount";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BidCompare — Compare Contractor Bids Instantly",
  description:
    "Stop overpaying contractors. Upload your bids, get an instant AI-powered side-by-side comparison, and save thousands on your home improvement project.",
  keywords: "contractor bid comparison, compare contractor quotes, home improvement savings, contractor estimate tool",
  openGraph: {
    title: "BidCompare — Compare Contractor Bids Instantly",
    description: "Stop overpaying contractors. Upload your bids, get an instant AI-powered side-by-side comparison, and save thousands on your home improvement project.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Analytics />
        <Tracker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[#1E40AF] font-bold text-lg">Bid</span>
              <span className="text-[#10B981] font-bold text-lg">Compare</span>
            </div>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} BidCompare. Free for homeowners.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <VisitorCount />
              <a href="/about" className="hover:text-[#1E40AF] transition-colors">About</a>
              <a href="/about#privacy" className="hover:text-[#1E40AF] transition-colors">Privacy</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
