import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Assessment",
  description:
    "Take the BBTx AI Readiness Assessment. Understand where your organization stands with AI and get a clear picture of what to do next.",
  openGraph: {
    title: "AI Readiness Assessment | BBTx",
    description:
      "A five-step assessment that helps leaders understand their current AI situation, biggest challenges, and the right next move for their organization.",
    url: "https://bbtx.ai/assessment",
  },
  alternates: {
    canonical: "https://bbtx.ai/assessment",
  },
};

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
