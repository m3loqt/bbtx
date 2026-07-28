"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { SubscribeModal } from "@/app/components/SubscribeModal";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { PenLine } from "lucide-react";

export type PublicBlogPost = {
  id: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  cover_image_url: string | null;
  slug: string;
  published_date: string | null;
};

const PAGE_SIZE = 4;

// Rotates through a few muted tones so mock/uncovered posts don't all look identical.
const PLACEHOLDER_TONES = [
  "bg-[#f2e7e4]",
  "bg-[#e6eaf2]",
  "bg-[#eaeee5]",
  "bg-[#f0ebe0]",
];

function formatDate(value: string | null): string | null {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ChaoticConfluenceExperience({ posts }: { posts: PublicBlogPost[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  const visible = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <div className="min-h-screen bg-white">
      <Nav heroTheme="light" />

      <div style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      {/* Header — just the title, no eyebrow, no description. id="hero" lets Nav
          render flush/transparent here, same as every other page's hero section. */}
      <section id="hero" className="w-full bg-white px-4 pb-16 pt-36 sm:px-6 sm:pb-20 sm:pt-44 lg:px-8 lg:pb-24 lg:pt-52">
        <h1
          className="text-[2.75rem] font-bold uppercase leading-[0.98] tracking-tight text-[#111111] sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-inter-tight), var(--font-inter), sans-serif" }}
        >
          Thinking With Leaders
          <br />
          Navigating <span className="text-[#ca3726]">Chaotic Confluence</span>
        </h1>
      </section>

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="border-t border-black/[0.08]" />
      </div>

      {/* Editorial list */}
      <section className="w-full bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.3fr] lg:gap-16">
          <div>
            <p
              className="text-xl leading-snug text-[#1a1a1a] sm:text-2xl"
              style={{ fontFamily: "var(--font-fraunces-editorial), Georgia, serif" }}
            >
              Notes on AI strategy, leadership,
              <br />
              and organizations, from the field.
            </p>
            <button
              type="button"
              onClick={() => setSubscribeOpen(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-95"
            >
              Subscribe to our newsletter
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-10 sm:gap-12">
            {visible.map((post, i) => {
              const tone = PLACEHOLDER_TONES[i % PLACEHOLDER_TONES.length];
              const date = formatDate(post.published_date);

              return (
                <Link
                  key={post.id}
                  href={`/chaotic-confluence/${post.slug}`}
                  className="group flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8"
                >
                  <div
                    className={`aspect-[4/3] w-full shrink-0 overflow-hidden rounded-md sm:w-2/5 lg:w-3/5 lg:max-w-[588px] ${tone}`}
                  >
                    {post.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.cover_image_url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <PenLine className="h-7 w-7 text-black/20" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 pt-1">
                    <div className="flex flex-wrap items-center gap-x-3 text-[13px] text-[#374151]">
                      {post.category && <span>{post.category}</span>}
                      {date && <span className="text-[#9ca3af]">{date}</span>}
                    </div>
                    <h3 className="mt-2.5 text-xl font-semibold leading-tight tracking-tight text-[#111111] transition-colors sm:text-2xl group-hover:text-[#ca3726]">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-1.5 truncate text-[15px] text-[#6b7280]">{post.excerpt}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ca3726] transition-colors group-hover:text-[#a82e20]">
                      Read more
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
            {posts.length === 0 && (
              <p className="text-[#6b7280]">No posts yet — check back soon.</p>
            )}
          </div>
        </div>

        {hasMore && (
          <div className="mt-14 lg:grid lg:grid-cols-[1fr_2.3fr] lg:gap-16">
            <div className="hidden lg:block" />
            <div>
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111111] transition-colors hover:text-[#555555]"
              >
                <span aria-hidden>↳</span> Load more
              </button>
            </div>
          </div>
        )}
      </section>
      </div>

      <CTA />

      <Footer />

      <SubscribeModal
        key={subscribeOpen ? "open" : "closed"}
        open={subscribeOpen}
        onClose={() => setSubscribeOpen(false)}
      />
    </div>
  );
}
