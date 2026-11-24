import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Leadership Development Consulting | BBTx Consulting",
  description:
    "Leadership development consulting that combines executive coaching and team development to build capability, including leadership for the AI era.",
  openGraph: {
    title: "Leadership Development Consulting | BBTx Consulting",
    description:
      "Develop stronger leaders, healthier teams, and more effective organizations, including leadership through AI adoption.",
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

const breadcrumbJsonLd = breadcrumbList([
  { name: "Services", path: "/services" },
  { name: "Leadership & Team Development", path: "/services/leadership-development" },
]);

export default function LeadershipDevelopmentLayout({
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
