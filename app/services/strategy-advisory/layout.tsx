import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Strategic Planning & Advisory Consulting | BBTx Consulting",
  description:
    "Strategic planning and advisory for leadership teams. We help leaders turn priorities into action through better decisions, alignment, and discipline.",
  openGraph: {
    title: "Strategic Planning & Advisory Consulting | BBTx Consulting",
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

const breadcrumbJsonLd = breadcrumbList([
  { name: "Services", path: "/services" },
  { name: "Strategy & Advisory", path: "/services/strategy-advisory" },
]);

export default function StrategyAdvisoryLayout({
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
