"use client";

import { ArrowDown } from "@/app/components/ArrowIcon";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { METRICS } from "@/app/sections/Results";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative z-[1] flex min-h-screen flex-col overflow-hidden px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <InteractiveGridPattern
          width={56}
          height={56}
          squares={[40, 28]}
          className="h-full w-full min-h-full min-w-full"
          squaresClassName="stroke-black/[0.014]"
        />
      </div>
      {/* On mobile: justify-end pushes everything to the bottom of the viewport.
          On sm+: justify-start with internal flex-1 spacer keeps Discover more pinned to bottom. */}
      <div className="pointer-events-none relative z-10 flex min-h-0 flex-1 flex-col justify-end pb-20 sm:justify-start sm:pb-10 sm:pt-1 lg:pt-2">
        <div className="pointer-events-none flex w-full flex-col sm:mt-3 sm:flex-1 lg:mt-4">
          <div className="pointer-events-none relative translate-y-3 sm:translate-y-4">
            <p className="mb-5 flex items-center gap-2 text-sm font-normal text-[#555555] sm:mb-10 sm:text-base md:text-lg">
              <Sparkles className="h-4 w-4 text-[#ca3726]" aria-hidden />
              AI-Powered Business Consulting
            </p>
            <h1 className="text-[2.15rem] font-semibold leading-[1.06] tracking-tighter text-[#222222] sm:leading-[1.02] sm:text-[3.6rem] md:text-[4.5rem] lg:text-[5.8rem] xl:text-[6.6rem] xl:leading-[0.98] 2xl:text-[7.2rem]">
              Helping leaders and professionals
              <span className="hidden sm:inline">
                <br />
              </span>
              <span className="sm:hidden"> </span>
              transform their work and organizations{" "}
              <span
                className="font-normal italic tracking-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                with AI
              </span>
            </h1>
          </div>

          <p className="pointer-events-none mt-5 max-w-lg text-base leading-relaxed tracking-tight text-[#222222] sm:mt-20 sm:text-xl lg:mt-24 lg:text-2xl">
            We work with leaders to plan and implement AI initiatives that improve operations, decision-making, and
            long-term business value.
          </p>

          {/* Mobile metrics strip */}
          <div className="pointer-events-auto mt-5 flex items-stretch divide-x divide-black/[0.08] rounded-xl border border-black/[0.06] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:hidden">
            {METRICS.map((metric) => (
              <div key={metric.label} className="flex flex-1 flex-col justify-center px-3 py-4 text-center">
                <p className="text-base font-semibold tracking-tight text-[#222222]">{metric.value}</p>
                <p className="mt-0.5 text-[10px] leading-tight text-[#555555]">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Desktop-only spacer — let hover pass through to the grid */}
          <div className="hidden sm:pointer-events-none sm:block sm:min-h-0 sm:flex-1" />
          <a
            href="#"
            className="pointer-events-auto mt-6 hidden w-fit items-center gap-2 text-sm font-bold text-[#222222] transition-colors hover:text-[#555] sm:mt-0 sm:inline-flex sm:text-base"
          >
            Discover more
            <span className="flex h-8 w-8 items-center justify-center rounded bg-[#ca3726] text-white sm:h-9 sm:w-9">
              <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </a>
        </div>
      </div>

      {/* Discover more — mobile only, pinned to bottom */}
      <a
        href="#"
        className="pointer-events-auto absolute bottom-8 left-4 z-10 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#222222] transition-colors hover:text-[#555] sm:hidden"
      >
        Discover more
        <span className="flex h-8 w-8 items-center justify-center rounded bg-[#ca3726] text-white">
          <ArrowDown className="h-4 w-4" />
        </span>
      </a>

      {/* Metrics card — desktop/tablet only, bottom-right absolute */}
      <article className="pointer-events-auto absolute bottom-10 right-6 z-10 hidden min-h-[140px] w-max max-w-[min(100%-3rem,880px)] overflow-hidden rounded-lg border border-black/[0.06] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.01)] sm:flex sm:right-8 sm:min-h-[160px] lg:right-10 lg:min-h-[180px]">
        <div className="flex flex-wrap items-stretch gap-x-6 gap-y-4 sm:flex-nowrap sm:gap-x-8">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-none flex-col justify-center border-l border-black/[0.08] px-5 py-6 first:border-l-0 sm:py-8"
            >
              <p className="text-3xl font-semibold tracking-tight text-[#222222] sm:text-4xl lg:text-5xl">
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-[#555555] sm:text-base lg:text-lg">{metric.label}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
