import { Footer } from "@/app/components/Footer";
import { Nav } from "@/app/components/Nav";
import { Benefits } from "@/app/sections/Benefits";
import { CTA } from "@/app/sections/CTA";
import { FAQ } from "@/app/sections/FAQ";
import { Hero } from "@/app/sections/Hero";
// import { Pricing } from "@/app/sections/Pricing";
import { Differentiation } from "@/app/sections/Differentiation";
import { Process } from "@/app/sections/Process";
import { Results } from "@/app/sections/Results";
import { Services } from "@/app/sections/Services";
import { Testimonials } from "@/app/sections/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      {/* Spacer so content starts below fixed nav */}
      <div className="h-20 shrink-0" aria-hidden />
      <Hero />
      <Results />
      <Services />
      <Benefits />
      <Process />
      <Differentiation />
      {/* <Pricing /> */}
      <Testimonials />
      <CTA />
      <FAQ />
      <Footer />
    </div>
  );
}
