import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "1:1 Executive Coaching with Grant Tate",
  description:
    "Work directly with Grant Tate — individual coaching or a live group cohort, built around your hardest decisions, not a generic curriculum.",
  openGraph: {
    title: "1:1 Executive Coaching with Grant Tate | BBTx",
    description:
      "You don't have to make your hardest calls alone. Individual coaching or a small live cohort, direct access to Grant, built around your real situation.",
    url: "https://bbtx.ai/coaching",
  },
  alternates: {
    canonical: "https://bbtx.ai/coaching",
  },
};

export default function CoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
