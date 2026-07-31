import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | BBTx Consulting",
  description:
    "BBTx works at the intersection of organizational development, leadership, strategy, and AI — helping leadership teams understand why performance problems persist and change the conditions that cause them.",
  openGraph: {
    title: "Services | BBTx Consulting",
    description:
      "Twenty years of organizational work. The same core approach: see clearly, decide well, lead at the level the work requires, use AI well, and make it last.",
    url: "https://www.bbtx.ai/services",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/services",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bbtx.ai" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.bbtx.ai/services" },
  ],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
