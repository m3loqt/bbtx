import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementation & Change Support | BBTx Consulting",
  description:
    "Change doesn't fail in the boardroom. It fails in the realities of daily work. BBTx helps leaders move from planning to implementation through accountability, communication, reinforcement, and practical execution support.",
  openGraph: {
    title: "Implementation & Change Support | BBTx Consulting",
    description:
      "Turn strategic intentions into action, accountability, and lasting results.",
    url: "https://www.bbtx.ai/services/implementation-support",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/services/implementation-support",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Implementation & Change Support",
  description:
    "Turn strategic intentions into action, accountability, and lasting results.",
  provider: {
    "@type": "Organization",
    "@id": "https://www.bbtx.ai/#organization",
  },
  url: "https://www.bbtx.ai/services/implementation-support",
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
      name: "Implementation & Change Support",
      item: "https://www.bbtx.ai/services/implementation-support",
    },
  ],
};

export default function ImplementationSupportLayout({
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
