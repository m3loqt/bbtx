import type { Metadata } from "next";
import { TEAM } from "@/app/team/team-data";

export const metadata: Metadata = {
  title: "Grant Tate | BBTx Consulting",
  description:
    "Grant Tate is the CEO of Bridge Business Transformations, a coach, consultant, and author who helps leaders thrive in complex environments.",
  openGraph: {
    title: "Grant Tate | BBTx Consulting",
    description:
      "CEO & Founder, BBTx Consulting. Coach, consultant, and author helping leaders thrive in complex environments.",
    url: "https://www.bbtx.ai/team/grant",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/team/grant",
  },
};

const person = TEAM.grant;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.bbtx.ai/team/grant#person",
  name: person.name,
  jobTitle: person.role,
  url: "https://www.bbtx.ai/team/grant",
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bbtx.ai" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://www.bbtx.ai/about" },
    { "@type": "ListItem", position: 3, name: person.name, item: "https://www.bbtx.ai/team/grant" },
  ],
};

export default function GrantLayout({ children }: { children: React.ReactNode }) {
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
