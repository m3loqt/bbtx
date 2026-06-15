import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizational Assessment & Analysis | BBTx Consulting",
  description:
    "Most organizations are operating on assumptions that haven't been tested in years. BBTx helps leaders see the organization as it actually is — and understand what to do about it.",
  openGraph: {
    title: "Organizational Assessment & Analysis | BBTx Consulting",
    description:
      "Reveal organizational realities, identify risks, and uncover opportunities for improvement.",
    url: "https://bbtx.ai/services/organizational-assessment",
  },
  alternates: {
    canonical: "https://bbtx.ai/services/organizational-assessment",
  },
};

export default function OrganizationalAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
