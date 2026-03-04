"use client";

import Image from "next/image";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const BENEFITS = [
  "One value-packed email every week, concise and actionable.",
  "AI strategy and implementation insights for leaders.",
  "No spam. Unsubscribe anytime. We respect your inbox.",
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

      <section className="relative z-[1] min-h-[calc(100vh-5rem)] w-full pt-20">
        <div className="grid min-h-[calc(100vh-5rem)] w-full grid-cols-1 lg:grid-cols-2">
          {/* Left: benefits — light grey, content with standard padding */}
          <div className="flex flex-col justify-center bg-[#f7f7f7] px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24 xl:px-12 xl:py-28">
            <p className="mb-6 flex items-center gap-2 text-lg font-normal text-[#555555] sm:text-xl">
              <Image src="/node.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
              Newsletter
            </p>
            <h1 className="text-[2.75rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:text-[3.75rem] md:text-[4.25rem] lg:text-[5rem] xl:text-[5.75rem]">
              Sign up for our{" "}
              <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                weekly
              </span>{" "}
              briefing
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-[#555555] sm:text-2xl">
              What you can expect from BBTx Insights.
            </p>
            <ul className="mt-10 space-y-4">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-lg leading-relaxed text-[#222222] sm:text-xl">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: dark sign-up block — charcoal card with margin and corner radius */}
          <div className="flex flex-col justify-center rounded-2xl bg-[#1a1a1a] py-16 pl-8 pr-6 sm:py-20 sm:pl-10 sm:pr-8 lg:my-6 lg:mr-6 lg:rounded-3xl lg:py-24 lg:pl-12 lg:pr-10 xl:pl-14 xl:pr-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Sign up for:
            </p>
            <h2
              className="mt-2 text-[1.5rem] font-medium leading-tight tracking-tight text-white sm:text-[1.75rem] lg:text-[2rem] xl:text-[2.15rem]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              BBTx Insights
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-white/55">
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
