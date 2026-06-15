import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Integration & Innovation | BBTx Consulting",
  description:
    "Most AI initiatives fail for organizational reasons, not technical ones. BBTx helps organizations integrate AI in ways that improve performance, strengthen capability, and create lasting value.",
  openGraph: {
    title: "AI Integration & Innovation | BBTx Consulting",
    description:
      "Apply AI responsibly, improve performance, and build organizational capability.",
    url: "https://bbtx.ai/services/ai-integration",
  },
  alternates: {
    canonical: "https://bbtx.ai/services/ai-integration",
  },
};

export default function AiIntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
