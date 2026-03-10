"use client";

import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const BENEFITS = [
  "One thoughtful email each week. Short and to the point.",
  "Reflections on AI strategy, leadership decisions, and implementation.",
  "Things we’re seeing inside organizations as they work through AI.",
  "No spam. Unsubscribe anytime.",
];

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ca3726]/12 text-[#ca3726]" aria-hidden>
      <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6l3 3 5-6" />
      </svg>
    </span>
  );
}

export default function NewsletterPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      <section className="relative z-[1] min-h-[calc(100vh-3.5rem)] w-full pt-14 sm:min-h-[calc(100vh-5rem)] sm:pt-20">
        <div className="grid min-h-[calc(100vh-3.5rem)] w-full grid-cols-1 sm:min-h-[calc(100vh-5rem)] lg:grid-cols-[11fr_9fr]">
          {/* Left: benefits — light grey, content with standard padding */}
          <div className="flex flex-col justify-center bg-[#f7f7f7] px-5 py-10 sm:px-8 sm:py-20 lg:px-10 lg:py-24 xl:px-12 xl:py-28">
            <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              BBTx Insights Newsletter
            </p>
            <h1 className="max-w-[calc(100%-10px)] text-[2rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:text-[2.75rem] md:text-[3.6rem] lg:text-[4.2rem] xl:text-[4.6rem]">
              Our weekly briefing for leaders{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                working through AI
              </span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#555555] sm:mt-6 sm:max-w-xl sm:text-xl">
              Clear thinking and practical insights for leaders navigating AI in their organizations.
            </p>
            <ul className="mt-10 space-y-4">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm leading-relaxed text-[#222222] sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: dark sign-up block — charcoal card with margin and corner radius */}
          <div className="flex flex-col justify-center rounded-2xl bg-[#1a1a1a] py-10 pl-5 pr-5 sm:py-20 sm:pl-10 sm:pr-8 lg:my-6 lg:mr-6 lg:rounded-3xl lg:py-24 lg:pl-12 lg:pr-10 xl:pl-14 xl:pr-12">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">Sign up for:</p>
            <h2
              className="mt-3 text-[2.1rem] font-medium leading-tight tracking-tight text-white sm:text-[2.4rem] lg:text-[2.7rem] xl:text-[3rem]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              BBTx Insights
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-[1.05rem]">
              Structured updates and resources for leaders integrating AI.
            </p>

            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label htmlFor="newsletter-name" className="block text-xs font-medium text-white/80">
                  Name <span className="text-white/50">*</span>
                </label>
                <input
                  id="newsletter-name"
                  type="text"
                  placeholder="Your name"
                  className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-white/[0.08] px-4 py-3 text-[15px] text-white placeholder:text-white/45 focus:border-[#ca3726]/50 focus:outline-none focus:ring-1 focus:ring-[#ca3726]/50"
                />
              </div>
              <div>
                <label htmlFor="newsletter-email" className="block text-xs font-medium text-white/80">
                  Email <span className="text-white/50">*</span>
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="you@company.com"
                  className="mt-1.5 w-full rounded-lg border border-white/[0.12] bg-white/[0.08] px-4 py-3 text-[15px] text-white placeholder:text-white/45 focus:border-[#ca3726]/50 focus:outline-none focus:ring-1 focus:ring-[#ca3726]/50"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
              >
                Subscribe
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-5 text-[11px] leading-relaxed text-white/40">
              Your information is never shared with third parties. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
