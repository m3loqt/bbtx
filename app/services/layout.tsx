import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | BBTx Consulting",
  description:
    "BBTx works at the intersection of organizational development, leadership, strategy, and AI — helping leadership teams understand why performance problems persist and change the conditions that cause them.",
  openGraph: {
    title: "Services | BBTx Consulting",
    description:
      "Twenty years of organizational work. The same core approach: see clearly, decide well, lead at the level the work requires, use AI well, and make it last.",
    url: "https://bbtx.ai/services",
  },
  alternates: {
    canonical: "https://bbtx.ai/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
