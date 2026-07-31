import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Get occasional updates from BBTx on AI strategy, leadership, and what we're learning. No spam, unsubscribe anytime.",
  openGraph: {
    title: "Newsletter | BBTx",
    description:
      "Get occasional updates on AI strategy, leadership, and what we're learning.",
    url: "https://www.bbtx.ai/newsletter",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/newsletter",
  },
};

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
