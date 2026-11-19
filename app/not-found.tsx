import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

// Next returns this with a real 404 status. Keeping it out of search results is
// explicit here, and links stay followable so a crawler that lands on a dead
// URL can still reach the live pages below.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

// Every destination is a page that exists today (checked by tests/seo/images.test.mjs).
// Names and wording follow the pages' own titles and descriptions.
const DESTINATIONS: { title: string; description: string; href: string; external?: boolean }[] = [
  {
    title: "Leadership Development",
    description: "Build leadership capability across leaders, teams, and the conditions around them.",
    href: "/services/leadership-development",
  },
  {
    title: "AI Integration",
    description: "AI strategy, readiness, and governance connected to practical business outcomes.",
    href: "/services/ai-integration",
  },
  {
    title: "Organizational Assessment",
    description: "Examine organizational health and AI readiness, including leadership, governance, and culture.",
    href: "/services/organizational-assessment",
  },
  {
    title: "Strategy Advisory",
    description: "The clarity, alignment, and discipline to turn priorities into action.",
    href: "/services/strategy-advisory",
  },
  {
    title: "Implementation Support",
    description: "Move from planning to implementation through accountability, communication, and reinforcement.",
    href: "/services/implementation-support",
  },
  {
    title: "AI Readiness Assessment Guide",
    description: "Twelve questions for leadership teams to answer before investing in AI.",
    href: "/resources/ai-readiness-assessment",
  },
  {
    title: "Chaotic Confluence",
    description: "Notes on AI strategy, leadership, and organizations, from the field.",
    href: "/chaotic-confluence",
  },
  {
    title: "About",
    description: "Four decades of watching technology change how leaders lead.",
    href: "/about",
  },
  {
    title: "Talk with Grant",
    description: "Schedule a consultation if you were looking for something specific.",
    href: "https://www.calendly.com/granttate",
    external: true,
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <section className="w-full bg-white px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">404</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-[#222222] sm:text-4xl">
            That page isn&apos;t here
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#555555]">
            The link may be old, or the page may have moved. Try one of these instead.
          </p>
        </div>
      </section>

      <section className="w-full border-t border-black/[0.06] bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((item) => {
            const className =
              "group flex min-h-[170px] flex-col justify-between rounded-lg border border-black/[0.06] bg-white p-6 transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]";
            const body = (
              <>
                <div>
                  <p className="text-lg font-semibold tracking-normal text-[#222222]">{item.title}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#555555]">{item.description}</p>
                </div>
                <div className="mt-6 flex justify-end">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#ca3726] text-white transition-colors group-hover:bg-[#b02f21]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </>
            );
            return item.external ? (
              <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                {body}
              </a>
            ) : (
              <Link key={item.title} href={item.href} className={className}>
                {body}
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
