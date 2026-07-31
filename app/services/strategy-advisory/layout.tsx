import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategy & Advisory Services | BBTx Consulting",
  description:
    "Most organizations don't have a strategy problem. They have a decision-making problem. BBTx helps leadership teams create the clarity, alignment, and discipline required to turn priorities into action.",
  openGraph: {
    title: "Strategy & Advisory Services | BBTx Consulting",
    description:
      "Create strategic clarity, strengthen alignment, and improve decision-making discipline.",
    url: "https://www.bbtx.ai/services/strategy-advisory",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/services/strategy-advisory",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Strategy & Advisory Services",
  description:
    "Create strategic clarity, strengthen alignment, and improve decision-making discipline.",
  provider: {
    "@type": "Organization",
    "@id": "https://www.bbtx.ai/#organization",
  },
  url: "https://www.bbtx.ai/services/strategy-advisory",
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
      name: "Strategy & Advisory",
      item: "https://www.bbtx.ai/services/strategy-advisory",
    },
  ],
};

export default function StrategyAdvisoryLayout({
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
