import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { Calendar, FileText, GraduationCap, Linkedin, Rss } from "lucide-react";

export const metadata: Metadata = {
  title: "BBTx | Links",
  description: "Every BBTx and Grant Tate platform in one place.",
  openGraph: {
    title: "Links | BBTx",
    description: "Every BBTx and Grant Tate platform in one place.",
    url: "https://bbtx.ai/links",
  },
  alternates: {
    canonical: "https://bbtx.ai/links",
  },
};

const PLATFORMS = [
  {
    icon: Rss,
    title: "Substack",
    description: "Long-form writing on AI, leadership, and strategy.",
    href: "https://chaoticconfluence.substack.com",
  },
  {
    icon: FileText,
    title: "Medium",
    description: "Grant's personal essays and reflections.",
    href: "https://rgranttate.medium.com/",
  },
  {
    icon: GraduationCap,
    title: "Courses",
    description: "Self-paced courses on AI strategy and leadership.",
    href: "https://chaoticconfluence.gumroad.com/",
  },
  {
    icon: Calendar,
    title: "Schedule a Consultation",
    description: "Book time directly with Grant.",
    href: "https://www.calendly.com/granttate",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    description: "Connect with Grant.",
    href: "https://linkedin.com/in/granttate",
  },
];

export default function LinksPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#f7f7f7] px-4 py-16 sm:py-20">
      <div className="w-full max-w-xl">
        <div className="relative h-56 w-full overflow-hidden rounded-2xl shadow-xl shadow-black/10 sm:h-64">
          <Image
            src="/service.png"
            alt=""
            fill
            sizes="(min-width: 640px) 576px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/50" aria-hidden />

          <div className="absolute inset-x-3 bottom-3 rounded-lg border border-white/10 bg-black/25 p-5 backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:p-6">
            <h1 className="text-2xl font-semibold tracking-normal text-white">
              BBTx Consulting
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-white/85">
              Every platform, in one place.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.title}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-black/[0.06] bg-white px-5 py-4 transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ca3726]/10 text-[#ca3726]">
                <platform.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold tracking-normal text-[#222222]">
                  {platform.title}
                </span>
                <span className="mt-0.5 block text-sm leading-snug text-[#555555]">
                  {platform.description}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[#555555] transition-colors group-hover:text-[#ca3726]" />
            </a>
          ))}
        </div>

        <a
          href="/"
          className="mt-10 flex items-center justify-center gap-1.5 text-sm font-medium text-[#555555] transition-colors hover:text-[#222222]"
        >
          <Image
            src="/oglogo.webp"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 object-contain"
          />
          bbtx.ai
        </a>
      </div>
    </div>
  );
}
