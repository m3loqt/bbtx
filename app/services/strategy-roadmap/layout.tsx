import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Strategy and Roadmap",
  description:
    "BBTx builds a clear AI strategy and implementation roadmap for your organization. Move from scattered AI experiments to a coherent plan tied to real business outcomes.",
  openGraph: {
    title: "AI Strategy and Roadmap | BBTx",
    description:
      "A clear AI strategy and roadmap built around your business goals. Move from experimentation to structured implementation with measurable outcomes.",
    url: "https://bbtx.ai/services/strategy-roadmap",
  },
  alternates: {
    canonical: "https://bbtx.ai/services/strategy-roadmap",
  },
};

export default function StrategyRoadmapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
