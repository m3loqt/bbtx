"use client";

import Image from "next/image";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const gridBg = {
  backgroundImage: `
    linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
  `,
  backgroundSize: "48px 48px",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Blog header — full-width, dark, journal-style */}
      <section className="relative z-[1] w-full overflow-hidden bg-[#222222] pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40" style={gridBg} aria-hidden />
        <div className="relative z-[1] w-full px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="w-full">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Blog
            </p>
            <h1 className="mb-3 w-full max-w-[60%] text-4xl font-medium leading-tight tracking-tighter text-white sm:text-5xl lg:mb-4 lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
              The Journal:{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                AI strategy
              </span>
              , implementation, and industry insights
            </h1>
            <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:items-end lg:gap-16">
              <div>
                <form
                  className="flex flex-col gap-3 sm:flex-row sm:items-center"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="min-w-0 max-w-[60%] flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3.5 text-base text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-0"
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-[#ca3726] px-6 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
              <p className="text-xl leading-relaxed text-[#555555] sm:text-2xl lg:text-right">
                Subscribe to learn about new insights, the latest in AI strategy, implementation practices, and updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog list — first row 2/1, then grid */}
      <section className="relative z-[1] w-full border-y border-black/[0.06] bg-[#f7f7f7]">
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
        <div className="relative z-[1] w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {/* First row: big left (2) / small right (1) */}
          <div className="grid gap-2 sm:gap-3 lg:grid-cols-[2fr_1fr]">
            {/* Featured card — left */}
            <a
              href="#"
              className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-xl border border-black/[0.06] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:min-h-[500px] sm:p-8"
            >
              <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#555555]">
                  Insights
                </span>
                <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-5xl">
                  From experimentation to strategy: how leaders are integrating AI
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-[#555555] sm:text-lg">
                  How organizations are moving beyond pilots and into sustainable AI strategy.
                </p>
              </div>
              <span className="mt-6 inline-flex w-fit items-center gap-2 text-base font-medium text-[#222222] transition-colors group-hover:text-[#ca3726]">
                Read article
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </a>
            {/* Small card — right (red) */}
            <a
              href="#"
              className="group flex min-h-[420px] flex-col justify-between rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:min-h-[500px] sm:p-6"
            >
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image src="/grant.jpg" alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#555555]">
                  Leadership · Feb 4, 2026
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-[#222222] sm:text-2xl">
                  A hard-to-reach problem is rarely a skill problem. It&apos;s almost always a system problem.
                </h3>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-sm text-[#555555]">2 min read</span>
                <span className="inline-flex items-center gap-1 text-base font-medium text-[#222222] transition-colors group-hover:text-[#ca3726]">
                  Read article
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </a>
          </div>
          {/* Second row: three cards (match small red card size/style) */}
          <div className="mt-3 grid gap-2 sm:gap-3 lg:grid-cols-3 lg:mt-4">
            <a
              href="#"
              className="group flex min-h-[420px] flex-col justify-between rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:min-h-[500px] sm:p-6"
            >
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image src="/grant.jpg" alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#555555]">
                  Strategy · Jan 28, 2026
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-[#222222] sm:text-2xl">
                  Building AI readiness: what boards and executives need to know.
                </h3>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-sm text-[#555555]">4 min read</span>
                <span className="inline-flex items-center gap-1 text-base font-medium text-[#222222] transition-colors group-hover:text-[#ca3726]">
                  Read article
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </a>
            <a
              href="#"
              className="group flex min-h-[420px] flex-col justify-between rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:min-h-[500px] sm:p-6"
            >
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image src="/grant.jpg" alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#555555]">
                  Implementation · Jan 15, 2026
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-[#222222] sm:text-2xl">
                  From pilot to production: scaling AI initiatives the right way.
                </h3>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-sm text-[#555555]">5 min read</span>
                <span className="inline-flex items-center gap-1 text-base font-medium text-[#222222] transition-colors group-hover:text-[#ca3726]">
                  Read article
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </a>
            <a
              href="#"
              className="group flex min-h-[420px] flex-col justify-between rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:min-h-[500px] sm:p-6"
            >
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image src="/grant.jpg" alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#555555]">
                  Insights · Jan 3, 2026
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-[#222222] sm:text-2xl">
                  The year ahead: AI trends that will shape 2026.
                </h3>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-sm text-[#555555]">3 min read</span>
                <span className="inline-flex items-center gap-1 text-base font-medium text-[#222222] transition-colors group-hover:text-[#ca3726]">
                  Read article
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </div>
  );
}
