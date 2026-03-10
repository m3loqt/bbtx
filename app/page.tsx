import type { Metadata } from "next";
import { AnimateSection } from "@/app/components/AnimateSection";
import { Footer } from "@/app/components/Footer";
import { Nav } from "@/app/components/Nav";
import { CTA } from "@/app/sections/CTA";
import { FAQ } from "@/app/sections/FAQ";
import { Hero } from "@/app/sections/Hero";
// import { Pricing } from "@/app/sections/Pricing";
import { Differentiation } from "@/app/sections/Differentiation";
import { Process } from "@/app/sections/Process";
import { Results } from "@/app/sections/Results";
import { Services } from "@/app/sections/Services";
import { Testimonials } from "@/app/sections/Testimonials";
import { Problem } from "@/app/sections/Problem";

export const metadata: Metadata = {
  title: "BBTx | AI Business Consulting for Leaders and Organizations",
  description:
    "BBTx helps leaders and organizations integrate AI with strategy, clarity, and confidence. 100+ organizations served across 20+ years of consulting experience.",
  alternates: {
    canonical: "https://bbtx.ai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://bbtx.ai/#website",
      url: "https://bbtx.ai",
      name: "BBTx",
      description:
        "AI business consulting for leaders and organizations. Strategy, assessment, and implementation.",
      publisher: {
        "@id": "https://bbtx.ai/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://bbtx.ai/?s={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://bbtx.ai/#organization",
      name: "BBTx",
      url: "https://bbtx.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://bbtx.ai/bbtxlog.png",
      },
      description:
        "BBTx helps leaders and organizations integrate AI with strategy, clarity, and confidence.",
      sameAs: [],
    },
    {
      "@type": "SiteLinksSearchBox",
      url: "https://bbtx.ai",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://bbtx.ai/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
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
      {/* Spacer so content starts below fixed nav */}
      <div className="h-20 shrink-0" aria-hidden />
      <AnimateSection noAnimation>
        <Hero />
      </AnimateSection>
      <AnimateSection>
        <Results />
      </AnimateSection>
      <AnimateSection>
        <Problem />
      </AnimateSection>
      <AnimateSection>
        <Services />
      </AnimateSection>
      <AnimateSection>
        <Process />
      </AnimateSection>
      <AnimateSection>
        <Differentiation />
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
