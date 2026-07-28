import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaye Monroe | BBTx Consulting",
  description:
    "Kaye Monroe leads KDM Coaching and Associates, supporting leaders and individuals as they define goals and follow through.",
  openGraph: {
    title: "Kaye Monroe | BBTx Consulting",
    description:
      "Executive Coach & Community Builder. Founder of the Minority Business Council, known for her vision, diplomacy, and steady leadership.",
    url: "https://bbtx.ai/team/kaye",
  },
  alternates: {
    canonical: "https://bbtx.ai/team/kaye",
  },
};

export default function KayeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
