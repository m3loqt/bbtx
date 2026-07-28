"use client";

import { useMemo, useState } from "react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { SubscribeModal } from "@/app/components/SubscribeModal";
import { WhitepaperDownloadModal } from "@/app/components/WhitepaperDownloadModal";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { FileText, Search, Clock } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Simple header */}
      <section className="relative z-[1] w-full bg-white px-4 pb-10 pt-28 text-center sm:px-6 sm:pb-12 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-medium tracking-tight text-[#222222] sm:text-4xl">
            Whitepapers
          </h1>

          {hasPapers ? (
            <div className="mx-auto mt-8 max-w-xl">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#999999]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search whitepapers by title or topic..."
                  className="h-12 w-full rounded-lg border border-black/10 bg-[#f7f7f7] pl-11 pr-4 text-[15px] text-[#222222] placeholder-[#999999] outline-none transition-colors focus:border-[#ca3726] focus:bg-white"
                />
              </div>

              {categories.length > 2 && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setActiveCategory(c)}
                      className={[
                        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                        activeCategory === c
                          ? "border-[#ca3726] bg-[#ca3726] text-white"
                          : "border-black/10 bg-white text-[#555555] hover:border-black/20",
                      ].join(" ")}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="mx-auto mt-6 max-w-xl">
              <p className="text-base leading-relaxed text-[#555555]">
                We&apos;re turning what we&apos;ve learned across 100+ engagements into something
                worth your time. Leave your email and we&apos;ll send the first one the day
                it&apos;s ready.
              </p>
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setSubscribeOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-6 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-95"
                >
                  Notify Me When It&apos;s Ready
                  <ArrowUpRight className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Paper list */}
      {hasPapers && (
        <section className="relative z-[1] w-full border-t border-black/[0.06] bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl">
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-[#555555]">
                No whitepapers match &ldquo;{query}&rdquo;.
              </p>
            ) : (
              <div className="divide-y divide-black/[0.08] border-t border-black/[0.08]">
                {filtered.map((paper) => {
                  const size = formatFileSize(paper.pdf_size_bytes);
                  const date = formatDate(paper.published_date);

                  return (
                    <div
                      key={paper.id}
                      className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:gap-7"
                    >
                      {/* Icon box — fixed, proportionate size, not stretched to row height */}
                      <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#f5f5f5]">
                        {paper.cover_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={paper.cover_image_url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FileText className="h-9 w-9 text-[#9ca3af]" />
                        )}
                      </div>

                      {/* Title + excerpt */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold leading-snug tracking-normal text-[#222222] md:text-xl">
                          {paper.title}
                        </h3>
                        {paper.excerpt && (
                          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#555555]">
                            {paper.excerpt}
                          </p>
                        )}
                      </div>

                      {/* Tag + meta stacked above the download button, kept as one tight unit */}
                      <div className="flex shrink-0 flex-col items-start gap-3 md:w-48 md:items-end md:text-right">
                        {(paper.category || paper.is_featured) && (
                          <div className="flex flex-wrap items-center gap-2 md:justify-end">
                            {paper.category && (
                              <span className="inline-flex items-center rounded-full bg-[#fef0ec] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#ca3726]">
                                {paper.category}
                              </span>
                            )}
                            {paper.is_featured && (
                              <span className="inline-flex items-center rounded-full bg-[#111111]/[0.06] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#555555]">
                                Featured
                              </span>
                            )}
                          </div>
                        )}
                        {(paper.read_time_minutes || size || date) && (
                          <p className="flex flex-wrap items-center gap-x-2 text-xs text-[#999999] md:justify-end">
                            {paper.read_time_minutes && (
                              <span className="inline-flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {paper.read_time_minutes} min read
                              </span>
                            )}
                            {paper.read_time_minutes && (size || date) && <span>·</span>}
                            {date && <span>{date}</span>}
                            {date && size && <span>·</span>}
                            {size && <span>{size}</span>}
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() => setDownloadTarget({ id: paper.id, title: paper.title })}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#111827]/15 px-4 py-2.5 text-sm font-semibold text-[#111827] transition-colors hover:bg-[#f3f4f6]"
                        >
                          Download PDF
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
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
