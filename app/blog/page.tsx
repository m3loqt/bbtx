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
    category: "AI Leadership",
    date: "Mar 12, 2026",
    title: "Why the Best Leaders Are Slowing Down on AI",
    excerpt:
      "Rushing AI adoption is costing organizations more than it saves. Here is what the most effective leaders are doing instead.",
    readTime: "6 min read",
  },
  {
    category: "Strategy",
    date: "Mar 5, 2026",
    title: "The One Question Every Leader Must Answer Before Adopting AI",
    excerpt:
      "Most organizations start with the wrong question. Here is the one that actually leads to a strategy worth building.",
    readTime: "5 min read",
  },
  {
    category: "Organization",
    date: "Feb 18, 2026",
    title: "AI Governance for Mid-Size Organizations",
    excerpt:
      "How real organizations are establishing policies, oversight, and accountability for AI without a dedicated team.",
    readTime: "8 min read",
  },
  {
    category: "Leadership",
    date: "Feb 4, 2026",
    title: "What It Actually Means to Lead with AI",
    excerpt:
      "There is a difference between an organization that uses AI and one that leads with it. Here is how to close that gap.",
    readTime: "7 min read",
  },
  {
    category: "Workforce",
    date: "Jan 28, 2026",
    title: "Bringing Your Team Through an AI Transition Without Losing Them",
    excerpt:
      "The human cost of AI adoption is real. Here is how leaders can bring their workforce through change with clarity and care.",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Blog header — full-width, dark, journal-style */}
      <section className="relative z-[1] w-full overflow-hidden bg-[#222222] pt-14 sm:pt-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40" style={gridBg} aria-hidden />
        <div className="relative z-[1] w-full px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="w-full">
            <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">Articles</p>
            <h1 className="mb-3 w-full text-[1.75rem] font-medium leading-tight tracking-tighter text-white sm:max-w-[60%] sm:text-4xl sm:text-5xl lg:mb-4 lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
              The Journal:{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                AI, leadership,
              </span>
              {" "}and the human questions that matter most right now
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
                    className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3.5 text-base text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-0 sm:max-w-[60%]"
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
              <p className="text-sm leading-relaxed text-white/50 sm:text-base lg:text-right">
                Writing on AI, leadership, and the human questions that matter most right now. From the Chaotic Confluence library.
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
            <aside className="min-w-0 w-full rounded-xl border border-black/[0.06] bg-white px-5 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:px-7 sm:py-7 lg:max-w-[19rem] lg:sticky lg:top-28 lg:h-[380px]">
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-tight text-[#222222]">Quick filters</p>
                <div className="mt-4 min-w-0 space-y-2">
                  {["AI Leadership", "Strategy", "Organization", "Leadership", "Workforce"].map(
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
            <div className="flex-1">
              <div className="space-y-2.5 sm:space-y-3">
              {POSTS.map((post, index) => (
                <article
                  key={post.title}
                  className={`group flex flex-col gap-3 rounded-xl border border-black/[0.06] bg-white px-4 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:gap-4 sm:px-7 sm:py-6 ${
                    index === 0 ? "lg:px-8 lg:py-7" : ""
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
                      <h2 className="mt-1.5 text-base font-semibold leading-snug tracking-tight text-[#222222] sm:mt-2 sm:text-[1.65rem] lg:text-[2rem] xl:text-[2.25rem]">
                        {post.title}
                      </h2>
                    </div>
                  </div>

                  {/* Row 2: description + read link */}
                  <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pt-3">
                    <p className="min-w-0 max-w-4xl flex-1 text-sm leading-relaxed text-[#555555] sm:max-w-5xl sm:text-lg">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-end gap-4 sm:flex-col sm:items-end sm:justify-center sm:gap-2.5">
                      <a
                        href="#"
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#222222] transition-colors group-hover:text-[#ca3726]"
                      >
                        Read full article
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
              </div>
              <div className="mt-8 flex justify-end">
                <a
                  href="/blog"
                  className="text-sm font-medium text-[#ca3726] transition-opacity hover:opacity-80"
                >
                  View all articles &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </div>
  );
}
