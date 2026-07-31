import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whitepapers",
  description:
    "Whitepapers from BBTx — what we're learning across 100+ engagements on AI strategy and leadership, written down as it's ready.",
  openGraph: {
    title: "Whitepapers | BBTx",
    description:
      "What we're learning across 100+ engagements on AI strategy and leadership, written down as it's ready.",
    url: "https://www.bbtx.ai/whitepapers",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/whitepapers",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bbtx.ai" },
    { "@type": "ListItem", position: 2, name: "Whitepapers", item: "https://www.bbtx.ai/whitepapers" },
  ],
};

export default function WhitepapersLayout({ children }: { children: React.ReactNode }) {
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
