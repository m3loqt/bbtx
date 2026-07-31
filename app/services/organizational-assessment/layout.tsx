import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizational Assessment & Analysis | BBTx Consulting",
  description:
    "Most organizations are operating on assumptions that haven't been tested in years. BBTx helps leaders see the organization as it actually is — and understand what to do about it.",
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bbtx.ai" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.bbtx.ai/services" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Organizational Assessment",
      item: "https://www.bbtx.ai/services/organizational-assessment",
    },
  ],
};

export default function OrganizationalAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
