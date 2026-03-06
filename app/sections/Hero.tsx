import { ArrowDown } from "@/app/components/ArrowIcon";
import { METRICS } from "@/app/sections/Results";

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
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col justify-start pb-10 pt-2 sm:pt-3 lg:pt-4">
        {/* Header + description start higher; Discover more stays at bottom via flex-1 spacer */}
        <div className="mt-2 flex w-full flex-1 flex-col sm:mt-3 lg:mt-4">
          <div>
            <p className="mb-10 text-base font-normal text-[#555555] sm:mb-12 sm:text-lg md:text-xl">
              AI-Powered Business Consulting
            </p>
            <h1 className="text-[3.6rem] font-semibold leading-[1.02] tracking-tighter text-[#222222] sm:text-[4.5rem] md:text-[5.4rem] lg:text-[7.2rem] xl:text-[6.6rem] 2xl:text-[7.2rem] xl:leading-[0.98]">
              Helping leaders and professionals
              <br />
              transform their work and organizations{" "}
              <span
                className="font-normal italic tracking-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                with AI
              </span>
            </h1>
          </div>
          <p className="mt-16 max-w-lg text-xl leading-relaxed tracking-tight text-[#222222] sm:mt-20 sm:text-2xl lg:mt-24">
          We work with leaders to plan and implement AI initiatives that improve operations, decision-making, and long-term business value.
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

      {/* Metrics card, part of hero, bottom-right */}
      <article className="absolute bottom-10 right-6 z-10 flex min-h-[140px] w-max max-w-[min(100%-3rem,880px)] overflow-hidden rounded-lg border border-black/[0.06] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.01)] sm:right-8 sm:min-h-[160px] lg:right-10 lg:min-h-[180px]">
        <div className="flex flex-wrap items-stretch gap-x-6 gap-y-4 sm:flex-nowrap sm:gap-x-8">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-none flex-col justify-center border-l border-black/[0.08] px-5 py-6 first:border-l-0 sm:py-8"
            >
              <p className="text-3xl font-semibold tracking-tight text-[#222222] sm:text-4xl lg:text-5xl">
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-[#555555] sm:text-base lg:text-lg">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
