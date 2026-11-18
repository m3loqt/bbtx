import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";

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

const breadcrumbJsonLd = breadcrumbList([
  { name: "Services", path: "/services" },
  { name: "Executive Recruitment Assessment Services", path: "/services/executive-recruitment" },
]);

export default function ExecutiveRecruitmentLayout({
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
