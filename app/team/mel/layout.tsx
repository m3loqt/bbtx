import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mel Angelo Cortes | BBTx Consulting",
  description:
    "Mel Angelo Cortes supports BBTx AI across operations, systems, and execution, helping turn ideas into clear deliverables.",
  openGraph: {
    title: "Mel Angelo Cortes | BBTx Consulting",
    description:
      "Operations & Execution. Builds the workflows, content, and digital assets that support BBTx AI's programs and community.",
    url: "https://bbtx.ai/team/mel",
  },
  alternates: {
    canonical: "https://bbtx.ai/team/mel",
  },
};

export default function MelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
