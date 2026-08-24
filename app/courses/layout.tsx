import type { Metadata } from "next";
import { COURSES_FAQ_ITEMS } from "@/app/courses/courses-faq-data";

export const metadata: Metadata = {
  title: "Courses — Making Modern Managers & AI Courses with Grant Tate",
  description:
    "Eight courses built from Grant Tate's consulting frameworks: the Making Modern Managers management-development program in three tiers, plus five focused AI courses for leaders, consultants, and coaches.",
  openGraph: {
    title: "Courses | BBTx",
    description:
      "Grant's methods, built for you to work through directly — Making Modern Managers and five AI courses, from self-paced to direct coaching.",
    url: "https://www.bbtx.ai/courses",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/courses",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bbtx.ai" },
    { "@type": "ListItem", position: 2, name: "Courses", item: "https://www.bbtx.ai/courses" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: COURSES_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
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
