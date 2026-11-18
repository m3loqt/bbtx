import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";
import { TEAM } from "@/app/team/team-data";

export const metadata: Metadata = {
  // `absolute` stops the root "%s | BBTx" template from adding a second suffix.
  title: { absolute: "Mel Angelo Cortes | BBTx Consulting" },
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

const breadcrumbJsonLd = breadcrumbList([
  { name: "About", path: "/about" },
  { name: person.name, path: "/team/mel" },
]);

export default function MelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
