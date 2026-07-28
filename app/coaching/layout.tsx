import type { Metadata } from "next";
import { COACHING_FAQ_ITEMS } from "@/app/coaching/coaching-faq-data";

export const metadata: Metadata = {
  title: "1:1 Executive Coaching with Grant Tate",
  description:
    "Work directly with Grant Tate — individual coaching or a live group cohort, built around your hardest decisions, not a generic curriculum.",
  openGraph: {
    title: "1:1 Executive Coaching with Grant Tate | BBTx",
    description:
      "You don't have to make your hardest calls alone. Individual coaching or a small live cohort, direct access to Grant, built around your real situation.",
    url: "https://bbtx.ai/coaching",
  },
  alternates: {
    canonical: "https://bbtx.ai/coaching",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://bbtx.ai" },
    { "@type": "ListItem", position: 2, name: "Coaching", item: "https://bbtx.ai/coaching" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: COACHING_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function CoachingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
