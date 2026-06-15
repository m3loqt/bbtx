import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategy & Advisory Services | BBTx Consulting",
  description:
    "Most organizations don't have a strategy problem. They have a decision-making problem. BBTx helps leadership teams create the clarity, alignment, and discipline required to turn priorities into action.",
  openGraph: {
    title: "Strategy & Advisory Services | BBTx Consulting",
    description:
      "Create strategic clarity, strengthen alignment, and improve decision-making discipline.",
    url: "https://bbtx.ai/services/strategy-advisory",
  },
  alternates: {
    canonical: "https://bbtx.ai/services/strategy-advisory",
  },
};

export default function StrategyAdvisoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
