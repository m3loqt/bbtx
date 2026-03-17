import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles | Chaotic Confluence",
  description:
    "Writing on AI, leadership, and the human questions that matter most right now. From the Chaotic Confluence library.",
  openGraph: {
    title: "Articles | Chaotic Confluence",
    description:
      "Writing on AI, leadership, and the human questions that matter most right now. From the Chaotic Confluence library.",
    url: "https://bbtx.ai/blog",
  },
  alternates: {
    canonical: "https://bbtx.ai/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
