import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about BBTx, the team behind our AI consulting practice, and our story of helping leaders navigate transformational technology since 1981.",
  openGraph: {
    title: "About BBTx | Our Story, Team, and Values",
    description:
      "Meet the team behind BBTx. Led by Dr. Grant Tate, we have spent decades helping leaders navigate transformational change across IBM, Bridgewater Innovation Group, and beyond.",
    url: "https://www.bbtx.ai/about",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
