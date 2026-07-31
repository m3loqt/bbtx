import type { Metadata } from "next";
import { TEAM } from "@/app/team/team-data";

export const metadata: Metadata = {
  title: "Mel Angelo Cortes | BBTx Consulting",
  description:
    "Mel Angelo Cortes supports BBTx AI across operations, systems, and execution, helping turn ideas into clear deliverables.",
  openGraph: {
    title: "Mel Angelo Cortes | BBTx Consulting",
    description:
      "Operations & Execution. Builds the workflows, content, and digital assets that support BBTx AI's programs and community.",
    url: "https://www.bbtx.ai/team/mel",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/team/mel",
  },
};

const person = TEAM.mel;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  url: "https://www.bbtx.ai/team/mel",
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
    { "@type": "ListItem", position: 3, name: person.name, item: "https://www.bbtx.ai/team/mel" },
  ],
};

export default function MelLayout({ children }: { children: React.ReactNode }) {
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
