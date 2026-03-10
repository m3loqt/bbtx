import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Organizational Model",
  description:
    "BBTx builds a living digital model of your organization so every leadership decision is grounded in reality. Map structure, workflows, and decision flows across your organization.",
  openGraph: {
    title: "AI Organizational Model | BBTx",
    description:
      "A dynamic digital representation of your organization built in days and maintained over time. See how your structure, workflows, and decisions connect before making your next move.",
    url: "https://bbtx.ai/services/ai-organizational-model",
  },
  alternates: {
    canonical: "https://bbtx.ai/services/ai-organizational-model",
  },
};

export default function AIOrganizationalModelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
