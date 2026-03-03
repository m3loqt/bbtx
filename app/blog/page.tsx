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

const POSTS = [
  {
    category: "Transformational Strategy",
    date: "Feb 4, 2026",
    title: "From experimentation to strategy: how leaders are integrating AI",
    excerpt:
      "How organizations are moving beyond pilots and into sustainable AI strategy that leaders can actually execute.",
    readTime: "6 min read",
  },
  {
    category: "Organizational AI Assessment",
    date: "Jan 28, 2026",
    title: "Building AI readiness: what boards and executives need to know",
    excerpt:
      "What to evaluate before you commit real budget to AI initiatives, and how to align leadership around the same picture.",
    readTime: "4 min read",
  },
  {
    category: "AI Organizational Model",
    date: "Jan 15, 2026",
    title: "Where AI actually lives inside your organization",
    excerpt:
      "Moving from scattered experiments to a coherent model of teams, ownership, and responsibilities.",
    readTime: "5 min read",
  },
  {
    category: "Implementation",
    date: "Dec 12, 2025",
    title: "From pilot to production without losing momentum",
    excerpt:
      "How to move from a successful proof of concept to a system that teams rely on every day, with clear owners and support.",
    readTime: "7 min read",
  },
  {
    category: "Measurement",
    date: "Nov 30, 2025",
    title: "What to measure when you ship an AI initiative",
    excerpt:
      "A practical view on adoption, outcomes, and risk metrics so you can tell if an AI project is actually working.",
    readTime: "3 min read",
  },
];

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

      {/* Blog list — sidebar filters + vertical list (reference layout) */}
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
        <div className="relative z-[1] w-full px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <div className="mx-auto flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            {/* Left sidebar: filters + social */}
            <aside className="min-w-0 w-full max-w-[19rem] rounded-xl border border-black/[0.06] bg-white px-6 py-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:max-w-xs sm:px-7 sm:py-7 lg:sticky lg:top-28 lg:h-[380px]">
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-tight text-[#222222]">Quick filters</p>
                <div className="mt-4 min-w-0 space-y-2">
                  {["Transformational Strategy", "Organizational AI Assessment", "AI Organizational Model", "Implementation", "Measurement"].map(
                    (label, idx) => (
                      <label key={label} className="flex min-w-0 items-start gap-3 text-sm text-[#222222] sm:text-[15px]">
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#d0d0d0] bg-white ${
                            idx === 0 ? "bg-[#222222]" : ""
                          }`}
                        >
                          {idx === 0 && <span className="block h-2 w-2 rounded-sm bg-white" />}
                        </span>
                        <span className="min-w-0 flex-1 break-words" style={{ wordBreak: "break-word" }}>{label}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
              <div className="mt-8 border-t border-black/[0.06] pt-6">
                <p className="text-sm font-semibold tracking-tight text-[#222222]">Follow us</p>
                <div className="mt-4 flex gap-3">
                  {["X", "In", "↗"].map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white text-xs font-medium text-[#222222] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right: list of posts */}
            <div className="flex-1 space-y-2.5 sm:space-y-3">
              {POSTS.map((post, index) => (
                <article
                  key={post.title}
                  className={`group flex min-h-[180px] flex-col gap-4 rounded-xl border border-black/[0.06] bg-white px-5 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:px-7 sm:py-6 ${
                    index === 0 ? "lg:min-h-[200px] lg:px-8 lg:py-7" : ""
                  }`}
                >
                  {/* Row 1: image + category/date + title */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f5f5f5] sm:h-24 sm:w-24">
                      <Image
                        src="/grant.jpg"
                        alt=""
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#555555] sm:text-xs">
                        <span>{post.category}</span>
                        <span className="text-[#999999]">
                          {post.readTime.toUpperCase()} · {post.date}
                        </span>
                      </div>
                      <h2 className="mt-2 text-[1.65rem] font-semibold leading-snug tracking-tight text-[#222222] sm:text-[1.8rem] lg:text-[2rem] xl:text-[2.25rem]">
                        {post.title}
                      </h2>
                    </div>
                  </div>

                  {/* Row 2: description + read link */}
                  <div className="flex flex-col gap-2.5 pt-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    <p className="min-w-0 max-w-4xl flex-1 text-base leading-relaxed text-[#555555] sm:max-w-5xl sm:text-lg">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-end gap-4 sm:flex-col sm:items-end sm:justify-center sm:gap-2.5">
                      <a
                        href="#"
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#222222] transition-colors group-hover:text-[#ca3726]"
                      >
                        Read full blog
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </div>
  );
}
