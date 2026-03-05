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

export default function Home() {
  return (
    <div className="min-h-screen">
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
