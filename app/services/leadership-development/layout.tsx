import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership & Team Development | BBTx Consulting",
  description:
    "Leadership development fails when individuals improve but the system around them does not. BBTx helps leaders and leadership teams build the capability required to navigate complexity, strengthen trust, and improve organizational performance.",
  openGraph: {
    title: "Leadership & Team Development | BBTx Consulting",
    description:
      "Develop stronger leaders, healthier teams, and more effective organizations.",
    url: "https://www.bbtx.ai/services/leadership-development",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/services/leadership-development",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Leadership & Team Development",
  description:
    "Develop stronger leaders, healthier teams, and more effective organizations.",
  provider: {
    "@type": "Organization",
    "@id": "https://www.bbtx.ai/#organization",
  },
  url: "https://www.bbtx.ai/services/leadership-development",
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
      name: "Leadership & Team Development",
      item: "https://www.bbtx.ai/services/leadership-development",
    },
  ],
};

export default function LeadershipDevelopmentLayout({
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
