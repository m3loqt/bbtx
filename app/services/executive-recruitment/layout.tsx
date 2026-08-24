import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Recruitment Assessment Services | BBTx Consulting",
  description:
    "A disciplined, independent way for search committees to evaluate executive finalists — validated assessments, structured interviews, and an expert debriefing.",
  openGraph: {
    title: "Executive Recruitment Assessment Services | BBTx Consulting",
    description:
      "Give your search committee a disciplined, independent way to evaluate finalists against the actual requirements of the position.",
    url: "https://www.bbtx.ai/services/executive-recruitment",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/services/executive-recruitment",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Executive Recruitment Assessment Services",
  description:
    "A disciplined, independent way for search committees to evaluate executive finalists against the actual requirements of the position.",
  provider: {
    "@type": "Organization",
    "@id": "https://www.bbtx.ai/#organization",
  },
  url: "https://www.bbtx.ai/services/executive-recruitment",
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
      name: "Executive Recruitment Assessment Services",
      item: "https://www.bbtx.ai/services/executive-recruitment",
    },
  ],
};

export default function ExecutiveRecruitmentLayout({
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
