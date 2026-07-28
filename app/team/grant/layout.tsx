import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grant Tate | BBTx Consulting",
  description:
    "Grant Tate is the CEO of Bridge Business Transformations, a coach, consultant, and author who helps leaders thrive in complex environments.",
  openGraph: {
    title: "Grant Tate | BBTx Consulting",
    description:
      "CEO & Founder, BBTx Consulting. Coach, consultant, and author helping leaders thrive in complex environments.",
    url: "https://bbtx.ai/team/grant",
  },
  alternates: {
    canonical: "https://bbtx.ai/team/grant",
  },
};

export default function GrantLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
