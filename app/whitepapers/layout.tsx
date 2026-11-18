import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";

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

const breadcrumbJsonLd = breadcrumbList([
  { name: "Whitepapers", path: "/whitepapers" },
]);

export default function WhitepapersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
