import Image from "next/image";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { TestimonialSlider } from "@/app/components/TestimonialSlider";

const TESTIMONIALS = [
  {
    quote:
      "We saw a 200% increase in Sales Qualified Leads after integrating their AI strategy.",
    name: "Reza Schott",
    title: "Head of Marketing",
    company: "OPP",
    initials: "RS",
  },
  {
    quote:
      "This is the first consulting partner we've worked with where I see measurable results.",
    name: "Machiel Kunst",
    title: "Director",
    company: "Bluebird",
    initials: "MK",
  },
  {
    quote:
      "BBTx helped us scale our AI initiatives with clear roadmaps and hands-on support.",
    name: "Sarah Chen",
    title: "VP of Operations",
    company: "Nexora",
    initials: "SC",
  },
  {
    quote:
      "From strategy to implementation, the team delivered measurable impact in under six months.",
    name: "James Walsh",
    title: "CTO",
    company: "Ventura",
    initials: "JW",
  },
  {
    quote:
      "Their approach to AI integration is pragmatic and results-driven. Highly recommend.",
    name: "Elena Rodriguez",
    title: "Head of Product",
    company: "Axiom",
    initials: "ER",
  },
];

export function Testimonials() {
  return (
    <section className="relative z-[1] border-b border-black/[0.06] bg-[#f7f7f7]">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div className="relative z-[1] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Eyebrow */}
        <p className="mb-6 flex items-center gap-2 text-base font-normal text-[#555555] sm:text-lg">
          <Image
            src="/node.png"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          Testimonials
        </p>
        {/* Headline left | description + button (stacked) right */}
        <div className="grid gap-6 lg:grid-cols-[3fr_5fr] lg:items-start lg:gap-12">
          <h2 className="lg:pr-16 text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
            Driven by a{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              performance mindset
            </span>
          </h2>
          <div className="flex min-w-0 flex-col lg:ml-40">
            <p className="max-w-3xl text-xl leading-relaxed tracking-tight text-[#222222] sm:text-2xl">
              You don&apos;t just hire experts you hire people with a drive to
              deliver results. The BBTx team thrives on impact. When you work with
              us, you&apos;ll work with a team as ambitious about growth as you
              are.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-[#ca3726] px-4 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
            >
              Explore our cases
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Testimonial cards: auto-scroll slider (slows on hover) */}
        <TestimonialSlider testimonials={TESTIMONIALS} />
      </div>
    </section>
  );
}
