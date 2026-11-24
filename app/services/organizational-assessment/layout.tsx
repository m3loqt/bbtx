import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Organizational Assessment & Analysis | BBTx Consulting",
  description:
    "BBTx helps leaders see what is actually happening: organizational assessment covering health, leadership alignment, culture, trust, and AI readiness.",
  openGraph: {
    title: "Organizational Assessment & Analysis | BBTx Consulting",
    description:
      "Reveal organizational realities, identify risks, and uncover opportunities for improvement.",
    url: "https://www.bbtx.ai/services/organizational-assessment",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/services/organizational-assessment",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Organizational Assessment & Analysis",
  description:
    "Reveal organizational realities, identify risks, and uncover opportunities for improvement.",
  provider: {
    "@type": "Organization",
    "@id": "https://www.bbtx.ai/#organization",
  },
  url: "https://www.bbtx.ai/services/organizational-assessment",
};

const breadcrumbJsonLd = breadcrumbList([
  { name: "Services", path: "/services" },
  { name: "Organizational Assessment", path: "/services/organizational-assessment" },
]);

export default function OrganizationalAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
