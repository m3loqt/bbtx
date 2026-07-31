import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const RESOURCES = [
  {
    title: "Digital Twin Snapshot",
    description: "See your organization the way the market already does — a strategic analysis from your public footprint.",
    href: "/digital-twin-snapshot",
  },
  {
    title: "Whitepapers",
    description: "What we're learning across 100+ engagements, written down as it's ready.",
    href: "/whitepapers",
  },
  {
    title: "Chaotic Confluence",
    description: "Notes on AI strategy, leadership, and organizations, from the field.",
    href: "/chaotic-confluence",
  },
];

export const metadata: Metadata = {
  title: "Resources",
  description: "Everything BBTx publishes for leaders navigating AI — strategic snapshots, whitepapers, and Chaotic Confluence.",
  openGraph: {
    title: "Resources | BBTx",
    description: "Everything BBTx publishes for leaders navigating AI — strategic snapshots, whitepapers, and Chaotic Confluence.",
    url: "https://www.bbtx.ai/resources",
  },
  alternates: {
    canonical: "https://www.bbtx.ai/resources",
  },
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <section className="w-full bg-white px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-medium tracking-tight text-[#222222] sm:text-4xl">
            Resources
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#555555]">
            Everything we publish for leaders navigating AI — strategic analysis, whitepapers, and field notes.
          </p>
        </div>
      </section>

      <section className="w-full border-t border-black/[0.06] bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex min-h-[200px] flex-col justify-between rounded-lg border border-black/[0.06] bg-white p-6 transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
            >
              <div>
                <p className="text-lg font-semibold tracking-normal text-[#222222]">
                  {item.title}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-[#555555]">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#ca3726] text-white transition-colors group-hover:bg-[#b02f21]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
