import type { ReactNode } from "react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";

type Section = { heading: string; body: ReactNode };

export function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  sections: Section[];
}) {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <section className="relative z-[1] w-full bg-white px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8 lg:pt-48">
        <div className="mx-auto max-w-2xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-[#222222] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-[#8a8a8a]">Last updated {lastUpdated}</p>

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-[#555555]">
            {intro}
          </div>

          <div className="mt-12 flex flex-col gap-10 border-t border-black/[0.06] pt-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-lg font-semibold tracking-normal text-[#222222]">
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#555555]">
                  {s.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
