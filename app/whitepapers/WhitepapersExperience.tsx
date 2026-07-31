"use client";

import { useMemo, useState } from "react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { SubscribeModal } from "@/app/components/SubscribeModal";
import { WhitepaperDownloadModal } from "@/app/components/WhitepaperDownloadModal";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { Search } from "lucide-react";

export type PublicWhitepaper = {
  id: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  cover_image_url: string | null;
  pdf_size_bytes: number | null;
  read_time_minutes: number | null;
  published_date: string | null;
  is_featured: boolean;
};

function formatFileSize(bytes: number | null): string | null {
  if (!bytes) return null;
  const mb = bytes / (1024 * 1024);
  return mb >= 0.1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function formatDate(value: string | null): string | null {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Meta line shared by the featured lead and each index row — category, read
// time, date, file size — only the parts that exist, joined with middots.
function metaParts(paper: PublicWhitepaper): string[] {
  return [
    paper.category,
    paper.read_time_minutes ? `${paper.read_time_minutes} min read` : null,
    formatDate(paper.published_date),
    formatFileSize(paper.pdf_size_bytes),
  ].filter((v): v is string => Boolean(v));
}

function MetaLine({ paper }: { paper: PublicWhitepaper }) {
  const parts = metaParts(paper);
  if (!paper.is_featured && parts.length === 0) return null;

  return (
    <p className="flex flex-wrap items-center gap-x-3 text-xs text-[#9ca3af]">
      {paper.is_featured && (
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#ca3726]">
          Featured
        </span>
      )}
      {parts.map((part, idx) => (
        <span key={idx} className="flex items-center gap-3">
          {idx > 0 && <span className="text-[#d1d5db]">·</span>}
          {part}
        </span>
      ))}
    </p>
  );
}

export function WhitepapersExperience({ whitepapers }: { whitepapers: PublicWhitepaper[] }) {
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [downloadTarget, setDownloadTarget] = useState<{ id: string; title: string } | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    whitepapers.forEach((w) => {
      if (w.category) set.add(w.category);
    });
    return ["All", ...Array.from(set)];
  }, [whitepapers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return whitepapers.filter((w) => {
      const matchesCategory = activeCategory === "All" || w.category === activeCategory;
      const matchesQuery =
        !q ||
        w.title.toLowerCase().includes(q) ||
        (w.excerpt ?? "").toLowerCase().includes(q) ||
        (w.category ?? "").toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [whitepapers, query, activeCategory]);

  const hasPapers = whitepapers.length > 0;
  // Only pull a lead item out of the flat list while browsing unfiltered —
  // once someone searches or picks a category, everything (including the
  // featured paper) belongs in one flat, predictable result list.
  const isBrowsingAll = !query.trim() && activeCategory === "All";
  const featured = isBrowsingAll ? filtered.find((w) => w.is_featured) ?? null : null;
  const rest = featured ? filtered.filter((w) => w.id !== featured.id) : filtered;

  return (
    <div className="min-h-screen bg-white">
      <Nav heroTheme="light" />

      {/* Header */}
      <section id="hero" className="w-full bg-white px-4 pb-8 pt-28 sm:px-6 sm:pb-10 sm:pt-32 lg:px-8 lg:pb-12 lg:pt-36">
        <div className="mx-auto max-w-5xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Resources
          </p>
          <h1 className="mt-3 text-4xl font-medium leading-tight tracking-tight text-[#222222] sm:text-5xl lg:text-6xl">
            Whitepapers
          </h1>

          {!hasPapers && (
            <div className="mt-6 max-w-xl">
              <p className="text-base leading-relaxed text-[#555555]">
                We&apos;re turning what we&apos;ve learned across 100+ engagements into something
                worth your time. Leave your email and we&apos;ll send the first one the day
                it&apos;s ready.
              </p>
              <button
                type="button"
                onClick={() => setSubscribeOpen(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-6 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-95"
              >
                Notify Me When It&apos;s Ready
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </button>
            </div>
          )}
        </div>
      </section>

      {hasPapers && (
        <>
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl border-t border-black/[0.08]" />
          </div>

          {/* Quiet toolbar — text tabs and an underline search, not boxed pills */}
          <section className="w-full bg-white px-4 pb-8 pt-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-5xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              {categories.length > 2 ? (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setActiveCategory(c)}
                      className={[
                        "text-sm transition-colors",
                        activeCategory === c
                          ? "font-semibold text-[#ca3726]"
                          : "text-[#555555] hover:text-[#222222]",
                      ].join(" ")}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              ) : (
                <div />
              )}

              <div className="relative w-full sm:w-64 sm:shrink-0">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999999]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search whitepapers..."
                  className="h-10 w-full rounded-lg border border-black/10 bg-white pl-9 pr-3 text-sm text-[#222222] placeholder-[#999999] outline-none transition-colors focus:border-[#ca3726]"
                />
              </div>
            </div>
          </section>

          {/* Editorial index */}
          <section className="w-full bg-white px-4 pb-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl border-t border-black/[0.08]">
              {filtered.length === 0 ? (
                <p className="py-16 text-center text-[#555555]">
                  {query.trim() ? (
                    <>No whitepapers match &ldquo;{query}&rdquo;.</>
                  ) : (
                    <>No whitepapers in {activeCategory}.</>
                  )}
                </p>
              ) : (
                <>
                  {featured && (
                    <div className="border-b border-black/[0.08] py-10">
                      <button
                        type="button"
                        onClick={() => setDownloadTarget({ id: featured.id, title: featured.title })}
                        aria-label={`Download ${featured.title}`}
                        className="group grid w-full gap-6 text-left sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10"
                      >
                        <div className="min-w-0">
                          <MetaLine paper={featured} />
                          <h2 className="mt-2 text-2xl font-medium leading-snug tracking-tight text-[#222222] transition-colors group-hover:text-[#ca3726] sm:text-3xl">
                            {featured.title}
                          </h2>
                          {featured.excerpt && (
                            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#555555]">
                              {featured.excerpt}
                            </p>
                          )}
                        </div>
                        <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-sm font-semibold text-white transition-opacity group-hover:opacity-90">
                          Download PDF
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </button>
                    </div>
                  )}

                  {rest.length > 0 && (
                    <div className="divide-y divide-black/[0.08]">
                      {rest.map((paper) => (
                        <button
                          key={paper.id}
                          type="button"
                          onClick={() => setDownloadTarget({ id: paper.id, title: paper.title })}
                          aria-label={`Download ${paper.title}`}
                          className="group flex w-full flex-col gap-3 py-7 text-left sm:grid sm:grid-cols-[1fr_auto] sm:items-center sm:gap-x-8 sm:gap-y-0 sm:py-8"
                        >
                          <div className="min-w-0">
                            <MetaLine paper={paper} />
                            <h3 className="mt-1.5 text-lg font-medium leading-snug tracking-tight text-[#222222] transition-colors group-hover:text-[#ca3726] sm:text-xl">
                              {paper.title}
                            </h3>
                            {paper.excerpt && (
                              <p className="mt-1.5 line-clamp-1 text-sm leading-relaxed text-[#555555]">
                                {paper.excerpt}
                              </p>
                            )}
                          </div>

                          <span className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[#111111] transition-colors group-hover:text-[#ca3726]">
                            Download
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </>
      )}

      <CTA />

      <Footer />

      <SubscribeModal
        key={subscribeOpen ? "subscribe-open" : "subscribe-closed"}
        open={subscribeOpen}
        onClose={() => setSubscribeOpen(false)}
      />
      <WhitepaperDownloadModal
        key={downloadTarget ? `download-${downloadTarget.id}` : "download-closed"}
        paper={downloadTarget}
        onClose={() => setDownloadTarget(null)}
      />
    </div>
  );
}
