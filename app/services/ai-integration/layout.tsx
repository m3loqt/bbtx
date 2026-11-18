import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "AI Strategy Consulting & Integration | BBTx Consulting",
  description:
    "BBTx helps leadership teams build AI strategy, assess readiness, establish governance, and connect AI adoption to practical business outcomes.",
  openGraph: {
    title: "AI Strategy Consulting & Integration | BBTx Consulting",
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

const breadcrumbJsonLd = breadcrumbList([
  { name: "Services", path: "/services" },
  { name: "AI Integration & Innovation", path: "/services/ai-integration" },
]);

export default function AiIntegrationLayout({
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
