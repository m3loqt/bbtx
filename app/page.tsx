import type { Metadata } from "next";
import { AnimateSection } from "@/app/components/AnimateSection";
import { Footer } from "@/app/components/Footer";
import { Nav } from "@/app/components/Nav";
import { Advantage } from "@/app/sections/Advantage";
import { CTA } from "@/app/sections/CTA";
import { FAQ } from "@/app/sections/FAQ";
import { Hero } from "@/app/sections/Hero";
import { Results } from "@/app/sections/Results";
import { Services } from "@/app/sections/Services";
import { Testimonials } from "@/app/sections/Testimonials";
import { FAQ_ITEMS } from "@/app/sections/faq-data";

export const metadata: Metadata = {
  title: "BBTx | AI Business Consulting for Leaders and Organizations",
  description:
    "BBTx helps leaders and organizations integrate AI with strategy, clarity, and confidence. 100+ organizations served across 40+ years of consulting experience.",
  alternates: {
    canonical: "https://www.bbtx.ai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.bbtx.ai/#website",
      url: "https://www.bbtx.ai",
      name: "BBTx",
      description:
        "AI business consulting for leaders and organizations. Strategy, assessment, and implementation.",
      publisher: {
        "@id": "https://www.bbtx.ai/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.bbtx.ai/#organization",
      name: "BBTx",
      url: "https://www.bbtx.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://www.bbtx.ai/oglogo.webp",
      },
      description:
        "BBTx helps leaders and organizations integrate AI with strategy, clarity, and confidence.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Charlottesville",
        addressRegion: "VA",
        addressCountry: "US",
      },
      founder: {
        "@id": "https://www.bbtx.ai/team/grant#person",
      },
      sameAs: [
        "https://linkedin.com/in/granttate",
        "https://chaoticconfluence.substack.com",
        "https://rgranttate.medium.com/",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <AnimateSection noAnimation>
        <Hero />
      </AnimateSection>
      <AnimateSection>
        <Results />
      </AnimateSection>
      <AnimateSection>
        <Services />
      </AnimateSection>
      <AnimateSection>
        <Advantage />
      </AnimateSection>
      <AnimateSection>
        <Testimonials />
      </AnimateSection>
      <AnimateSection>
        <FAQ />
      </AnimateSection>
      <AnimateSection>
        <CTA />
      </AnimateSection>
      <AnimateSection>
        <Footer />
      </AnimateSection>
    </div>
  );
}
