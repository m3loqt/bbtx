import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";
import { TEAM } from "@/app/team/team-data";

export const metadata: Metadata = {
  // `absolute` stops the root "%s | BBTx" template from adding a second suffix.
  title: { absolute: "Kaye Monroe | BBTx Consulting" },
  description:
    "Kaye Monroe leads KDM Coaching and Associates, supporting leaders and individuals as they define goals and follow through.",
  openGraph: {
    title: "Kaye Monroe | BBTx Consulting",
    description:
      "Executive Coach & Community Builder. Founder of the Minority Business Council, known for her vision, diplomacy, and steady leadership.",
    url: "https://www.bbtx.ai/team/kaye",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/team/kaye",
  },
};

const person = TEAM.kaye;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  url: "https://www.bbtx.ai/team/kaye",
  image: `https://www.bbtx.ai${person.photo}`,
  sameAs: [person.linkedin],
  description: person.bio.join(" "),
  worksFor: {
    "@type": "Organization",
    "@id": "https://www.bbtx.ai/#organization",
  },
  ...(person.location
    ? { homeLocation: { "@type": "Place", name: person.location } }
    : {}),
};

const breadcrumbJsonLd = breadcrumbList([
  { name: "About", path: "/about" },
  { name: person.name, path: "/team/kaye" },
]);

export default function KayeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
