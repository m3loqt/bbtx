import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BBTx Insights Newsletter",
  description:
    "Subscribe to BBTx Insights, a weekly newsletter for leaders working through AI. Clear thinking and practical perspectives on AI strategy, leadership, and implementation.",
  openGraph: {
    title: "BBTx Insights Newsletter | Weekly AI Leadership Briefing",
    description:
      "One thoughtful email each week on AI strategy, leadership decisions, and implementation. Written for leaders navigating AI in their organizations.",
    url: "https://bbtx.ai/newsletter",
  },
  alternates: {
    canonical: "https://bbtx.ai/newsletter",
  },
};

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
