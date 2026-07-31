import type { Metadata } from "next";
import { Inter, Inter_Tight, Fraunces } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

// Upright (non-italic) serif for the editorial intro blurb — the shared
// site-wide Fraunces instance in app/layout.tsx only loads the italic style.
const fraunces = Fraunces({
  variable: "--font-fraunces-editorial",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chaotic Confluence",
  description:
    "Chaotic Confluence — notes on AI strategy, leadership, and organizations from BBTx, written as it's learned across engagements.",
  openGraph: {
    title: "Chaotic Confluence | BBTx",
    description:
      "Notes on AI strategy, leadership, and organizations from BBTx, written as it's learned across engagements.",
    url: "https://www.bbtx.ai/chaotic-confluence",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/chaotic-confluence",
  },
};

export default function ChaoticConfluenceLayout({ children }: { children: React.ReactNode }) {
  // Only exposes the font CSS variables — deliberately doesn't set a page-wide
  // font-family, so the shared Nav/CTA/Footer keep the site's usual Familjen
  // Grotesk. ChaoticConfluenceExperience applies Inter to just its own content.
  // Breadcrumb JSON-LD lives in page.tsx (hub) and [slug]/page.tsx (posts)
  // individually, not here, so post pages don't emit a duplicate hub-level one.
  return (
    <div className={`${inter.variable} ${interTight.variable} ${fraunces.variable}`}>
      {children}
    </div>
  );
}
