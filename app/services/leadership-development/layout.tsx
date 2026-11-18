import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Leadership Development & AI Leadership Consulting | BBTx",
  description:
    "BBTx builds leadership capability across leaders, teams, and the conditions around them, including how managers guide teams through AI adoption and change.",
  openGraph: {
    title: "Leadership Development & AI Leadership Consulting | BBTx",
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
