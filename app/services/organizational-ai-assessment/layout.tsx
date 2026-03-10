import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizational AI Assessment",
  description:
    "BBTx conducts an honest, structured AI readiness assessment of your organization. Know exactly where you stand, what is working, and what needs to change before you invest further in AI.",
  openGraph: {
    title: "Organizational AI Assessment | BBTx",
    description:
      "An honest, structured assessment of your organization's AI readiness. Understand where you stand and get a clear, actionable picture before committing more budget to AI.",
    url: "https://bbtx.ai/services/organizational-ai-assessment",
  },
  alternates: {
    canonical: "https://bbtx.ai/services/organizational-ai-assessment",
  },
};

export default function OrgAIAssessmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
