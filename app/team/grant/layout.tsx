import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import {
  GRANT_PERSON_ID,
  GRANT_PROFILE_URL,
  ORGANIZATION_ID,
  SITE_URL,
  breadcrumbList,
} from "@/lib/seo/schema";
import { TEAM } from "@/app/team/team-data";

export const metadata: Metadata = {
  // `absolute` stops the root "%s | BBTx" template from adding a second suffix.
  title: { absolute: "Grant Tate | BBTx Consulting" },
  description:
    "Dr. Grant Tate is the CEO and founder of BBTx Consulting, a coach, consultant, and author who helps leaders thrive in complex environments.",
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
  "@id": GRANT_PERSON_ID,
  name: person.name,
  honorificPrefix: "Dr.",
  jobTitle: person.role,
  url: GRANT_PROFILE_URL,
  image: `${SITE_URL}${person.photo}`,
  sameAs: [person.linkedin],
  description: person.bio.join(" "),
  worksFor: {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
  },
  ...(person.location
    ? { homeLocation: { "@type": "Place", name: person.location } }
    : {}),
};

const breadcrumbJsonLd = breadcrumbList([
  { name: "About", path: "/about" },
  { name: person.name, path: "/team/grant" },
]);

export default function GrantLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {children}
    </>
  );
}
