import type { Metadata } from "next";
import { TEAM } from "@/app/team/team-data";

export const metadata: Metadata = {
  title: "Kaye Monroe | BBTx Consulting",
  description:
    "Kaye Monroe leads KDM Coaching and Associates, supporting leaders and individuals as they define goals and follow through.",
  openGraph: {
    title: "Kaye Monroe | BBTx Consulting",
    description:
      "Executive Coach & Community Builder. Founder of the Minority Business Council, known for her vision, diplomacy, and steady leadership.",
    url: "https://bbtx.ai/team/kaye",
  },
  alternates: {
    canonical: "https://bbtx.ai/team/kaye",
  },
};

const person = TEAM.kaye;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  url: "https://bbtx.ai/team/kaye",
  image: `https://bbtx.ai${person.photo}`,
  sameAs: [person.linkedin],
  description: person.bio.join(" "),
  worksFor: {
    "@type": "Organization",
    "@id": "https://bbtx.ai/#organization",
  },
  ...(person.location
    ? { homeLocation: { "@type": "Place", name: person.location } }
    : {}),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://bbtx.ai" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://bbtx.ai/about" },
    { "@type": "ListItem", position: 3, name: person.name, item: "https://bbtx.ai/team/kaye" },
  ],
};

export default function KayeLayout({ children }: { children: React.ReactNode }) {
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
