import type { Metadata } from "next";
import { AnimateSection } from "@/app/components/AnimateSection";
import { Footer } from "@/app/components/Footer";
import { JsonLd } from "@/app/components/JsonLd";
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

// WebSite + Organization are emitted once by the root layout (lib/seo/schema.ts);
// the homepage only adds the FAQ that is visibly rendered on the page.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
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
