import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Change Management & Implementation Support | BBTx",
  description:
    "Change management and implementation support from BBTx: helping leaders move from planning to sustained execution, with accountability and reinforcement.",
  openGraph: {
    title: "Change Management & Implementation Support | BBTx",
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

const breadcrumbJsonLd = breadcrumbList([
  { name: "Services", path: "/services" },
  { name: "Implementation & Change Support", path: "/services/implementation-support" },
]);

export default function ImplementationSupportLayout({
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
