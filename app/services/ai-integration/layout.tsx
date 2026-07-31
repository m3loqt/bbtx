import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Integration & Innovation | BBTx Consulting",
  description:
    "Most AI initiatives fail for organizational reasons, not technical ones. BBTx helps organizations integrate AI in ways that improve performance, strengthen capability, and create lasting value.",
  openGraph: {
    title: "AI Integration & Innovation | BBTx Consulting",
    description:
      "Apply AI responsibly, improve performance, and build organizational capability.",
    url: "https://www.bbtx.ai/services/ai-integration",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/services/ai-integration",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Integration & Innovation",
  description:
    "Apply AI responsibly, improve performance, and build organizational capability.",
  provider: {
    "@type": "Organization",
    "@id": "https://www.bbtx.ai/#organization",
  },
  url: "https://www.bbtx.ai/services/ai-integration",
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
      name: "AI Integration & Innovation",
      item: "https://www.bbtx.ai/services/ai-integration",
    },
  ],
};

export default function AiIntegrationLayout({
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
