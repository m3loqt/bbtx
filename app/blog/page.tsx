"use client";

import Image from "next/image";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";

const POPULAR_ARTICLES = [
  {
    date: "Chaotic Confluence",
    title: "AI Isn't Failing. Leadership Is.",
    excerpt: "Why execution stalls when leadership assumptions go unchallenged.",
    url: "https://chaoticconfluence.substack.com/p/ai-isnt-failing-leadership-is",
    image: "/pop1.png",
  },
  {
    date: "Chaotic Confluence",
    title:
      "The Great Cognitive Deflation: 2026, The DeepSeek Shock, and the Geopolitics of AI Dumping",
    url: "https://chaoticconfluence.substack.com/p/the-great-cognitive-deflation-2026",
    image: "/pop2.png",
  },
  {
    date: "Chaotic Confluence",
    title: "Why Most AI Efforts Fall Flat (And How to Actually Get Results)",
    url: "https://chaoticconfluence.substack.com/p/why-most-ai-efforts-fall-flat-and",
    image: "/pop3.png",
  },
  {
    date: "Chaotic Confluence",
    title: "The Unwritten Rules of AI at Work: 4 Surprising Truths You Need to Know",
    url: "https://chaoticconfluence.substack.com/p/the-unwritten-rules-of-ai-at-work",
    image: "/pop4.png",
  },
];

const LATEST_ARTICLES = [
  {
    date: "Chaotic Confluence",
    title: "AI Standards & Guidelines",
    excerpt: "A practical framework for corporate compliance and responsible AI usage.",
    url: "https://chaoticconfluence.substack.com/p/ai-standards-and-guidelines",
    image: "/latest1.png",
  },
  {
    date: "Chaotic Confluence",
    title: "AI User Populations",
    excerpt: "Understanding how different teams adopt AI inside real workplace environments.",
    url: "https://chaoticconfluence.substack.com/p/ai-user-populations",
    image: "/latest2.png",
  },
  {
    date: "Chaotic Confluence",
    title: "AI User Profiles",
    excerpt: "Mapping user personas and behavioral patterns across digital AI workflows.",
    url: "https://chaoticconfluence.substack.com/p/ai-user-profiles",
    image: "/latest3.png",
  },
  {
    date: "Chaotic Confluence",
    title: "A Reflection and a New Capability",
    excerpt: "A personal reflection on growth, capability, and what AI reveals about us.",
    url: "https://chaoticconfluence.substack.com/p/a-reflection-and-a-new-capability",
    image: "/latest4.png",
  },
  {
    date: "Chaotic Confluence",
    title: "A Tear for Terry",
    excerpt: "A tribute to gratitude, memory, and meaningful human connection.",
    url: "https://chaoticconfluence.substack.com/p/a-tear-for-terry",
    image: "/latest5.png",
  },
  {
    date: "Chaotic Confluence",
    title: "28 Gigabytes of Chaos: How Claude Cowork Fixed My Messy Database",
    excerpt: "A real-world breakdown of cleaning up a messy system with AI collaboration.",
    url: "https://chaoticconfluence.substack.com/p/28-gigabytes-of-chaos-how-claude",
    image: "/latest6.png",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Blog header — full-width, dark, journal-style */}
      <section className="relative z-[1] w-full overflow-hidden bg-[#222222] pt-14 sm:pt-20">
        <Image src="/articleshero.png" alt="" fill priority sizes="100vw" className="object-cover" aria-hidden />
        <div className="absolute inset-0 z-0 bg-black/60" aria-hidden />
        <div className="relative z-[1] flex w-full flex-col justify-end px-4 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-24 lg:min-h-[72vh] lg:px-8 lg:pb-32 lg:pt-28">
          <div className="w-full">
            <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">Articles</p>
            <div className="flex flex-col gap-6">
              <h1 className="w-full text-[1.75rem] font-medium leading-tight tracking-tighter text-white sm:text-5xl lg:max-w-[70%] lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                The Journal:{" "}
                <span
                  className="font-normal italic"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  AI, leadership,
                </span>
                {" "}and the human questions that matter most right now
              </h1>
              <form
                className="flex w-full max-w-[34rem] flex-col gap-3 sm:flex-row sm:items-center"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3.5 text-base text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-0"
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
          </div>
        </div>
      </section>

      {/* Articles index — popular + latest (reference-inspired layout) */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="w-full px-8 py-12 sm:px-14 sm:py-16 lg:px-20 lg:py-20 xl:px-24">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-[#1f2937] sm:text-3xl">
              Popular Articles
            </h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-stretch">
              <a
                href={POPULAR_ARTICLES[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image src={POPULAR_ARTICLES[0].image} alt={POPULAR_ARTICLES[0].title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
                </div>
                <p className="mt-4 text-[13px] font-medium text-[#8b919b] sm:text-sm">{POPULAR_ARTICLES[0].date}</p>
                <h3 className="mt-2.5 text-[1.35rem] font-medium leading-[1.22] tracking-tight text-[#121826] sm:text-[1.5rem]">
                  {POPULAR_ARTICLES[0].title}
                </h3>
                <p className="mt-2.5 text-base leading-relaxed text-[#6b7280] sm:text-[1.05rem] sm:leading-[1.38]">
                  {POPULAR_ARTICLES[0].excerpt}
                </p>
              </a>

              <div className="flex h-full flex-col justify-between gap-3 sm:gap-4">
                {POPULAR_ARTICLES.slice(1).map((post) => (
                  <a
                    key={post.title}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid grid-cols-[230px_minmax(0,1fr)] gap-3 sm:grid-cols-[270px_minmax(0,1fr)] sm:gap-4"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 640px) 230px, 270px" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-[#8b919b] sm:text-sm">{post.date}</p>
                      <h3 className="mt-2.5 text-[1.35rem] font-medium leading-[1.22] tracking-tight text-[#121826] sm:text-[1.5rem]">
                        {post.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-2xl font-medium tracking-tight text-[#1f2937] sm:text-3xl">
              Latest Articles
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {LATEST_ARTICLES.map((post) => (
                <a
                  key={post.title}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>
                  <p className="mt-4 text-[13px] font-medium text-[#8b919b] sm:text-sm">{post.date}</p>
                  <h3 className="mt-2.5 text-[1.35rem] font-medium leading-[1.22] tracking-tight text-[#121826] sm:text-[1.5rem]">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 text-base leading-relaxed text-[#6b7280] sm:text-[1.05rem] sm:leading-[1.38]">
                    {post.excerpt}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 border border-black/[0.08] bg-white px-6 py-3 text-sm font-medium text-[#374151]"
              >
                <span aria-hidden>&larr;</span>
                Previous
              </button>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                      page === 1 ? "bg-[#f6d9d4] text-[#1f2937]" : "text-[#4b5563]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="ml-1 text-[#9ca3af]">...</span>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 border border-black/[0.08] bg-white px-6 py-3 text-sm font-medium text-[#374151]"
              >
                Next
                <span aria-hidden>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </div>
  );
}
