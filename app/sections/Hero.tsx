import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "@/app/components/ArrowIcon";

function StoryteqLogo() {
  return (
    <span className="flex items-center gap-1.5 font-medium tracking-tight text-[#222222]">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-current">
        <span className="h-2.5 w-2.5 rounded-sm bg-current opacity-80" />
      </span>
      storyteq
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative z-[1] flex h-[calc(100vh-5rem)] max-h-[calc(100vh-5rem)] flex-col overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Subtle grid overlay */}
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
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col justify-start pb-10 pt-4 sm:pt-6 lg:pt-8">
        {/* Header + description start higher; Discover more stays at bottom via flex-1 spacer */}
        <div className="mt-4 flex w-[90%] flex-1 flex-col sm:mt-6 lg:mt-8">
          <div>
            <p className="mb-10 flex items-center gap-2 text-base font-normal text-[#555555] sm:mb-12 sm:text-lg md:text-xl">
              <Image
                src="/node.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
              AI-Powered Business Consulting
            </p>
            <h1 className="text-[3.6rem] font-semibold leading-[1.02] tracking-tighter text-[#222222] sm:text-[4.5rem] md:text-[5.4rem] lg:text-[7.2rem] xl:text-[6.6rem] 2xl:text-[7.2rem] xl:leading-[0.98]">
              We help organizations
              <br />
              <span
                className="font-normal italic tracking-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                integrate AI
              </span>{" "}
              for measurable
              <br />
              business value
            </h1>
          </div>
          <p className="mt-16 max-w-lg text-xl leading-relaxed tracking-tight text-[#222222] sm:mt-20 sm:text-2xl lg:mt-24">
          We work with leaders to design and implement AI initiatives that improve operations, decision-making, and long-term business value.
          </p>
          <div className="min-h-0 flex-1" />
          <a
            href="#"
            className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#222222] transition-colors hover:text-[#555] sm:text-base"
          >
            Discover more
            <span className="flex h-8 w-8 items-center justify-center rounded bg-[#ca3726] text-white sm:h-9 sm:w-9">
              <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </a>
        </div>
      </div>

      {/* Case study card, part of hero, bottom-right */}
      <article className="absolute bottom-10 right-6 z-10 flex h-[200px] w-[min(480px,calc(100vw-5rem))] overflow-hidden rounded-lg border border-black/[0.06] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.01)] sm:right-8 lg:right-10">
        <div className="flex w-[48%] min-w-0 flex-col justify-between p-5 pr-3">
          <p className="text-base font-bold leading-tight text-[#222222] sm:text-lg">
            54% increase in pipeline with Demand Generation strategy
          </p>
          <div className="mt-4 flex items-center justify-between">
            <StoryteqLogo />
            <a
              href="#"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#ca3726] text-white transition-opacity hover:opacity-90 sm:h-12 sm:w-12"
              aria-label="View case study"
            >
              <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
          </div>
        </div>
        <div className="relative flex w-[52%] min-w-0 shrink-0 items-center justify-center overflow-hidden rounded-r-lg bg-white py-3 pr-3">
          <div className="relative h-full w-full overflow-hidden rounded-md">
            <img
              src="/casestudy.webp"
              alt="Case study"
              className="absolute inset-0 h-full w-full object-cover"
              width={500}
              height={200}
            />
          </div>
        </div>
      </article>
    </section>
  );
}
