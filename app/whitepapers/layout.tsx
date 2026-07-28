import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whitepapers",
  description:
    "Whitepapers from BBTx — what we're learning across 100+ engagements on AI strategy and leadership, written down as it's ready.",
  openGraph: {
    title: "Whitepapers | BBTx",
    description:
      "What we're learning across 100+ engagements on AI strategy and leadership, written down as it's ready.",
    url: "https://bbtx.ai/whitepapers",
  },
  alternates: {
    canonical: "https://bbtx.ai/whitepapers",
  },
};

export default function WhitepapersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
