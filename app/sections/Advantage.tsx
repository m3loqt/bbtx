import Image from "next/image";
import { Compass, Sparkles, Users } from "lucide-react";

const ADVANTAGE_ROWS = [
  {
    icon: Compass,
    title: "Clearer decisions",
    description:
      "Leaders leave conversations seeing the choice in front of them, not just the noise around it.",
  },
  {
    icon: Users,
    title: "Stronger leadership teams",
    description:
      "Coaching and team development that builds trust and better judgment, not just better meetings.",
  },
  {
    icon: Sparkles,
    title: "AI that actually sticks",
    description:
      "Adoption grounded in real organizational judgment, not a rollout that fades after the pilot.",
  },
];

export function Advantage() {
  return (
    <section className="relative z-[1] flex min-h-screen w-full flex-col justify-center overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[90rem]">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
          The Real Advantage
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* Left: photo card, glass layer only behind the text block at the bottom */}
          <div className="relative flex h-[420px] flex-col justify-end overflow-hidden rounded-2xl shadow-2xl sm:h-[460px]">
            <Image
              src="/grantt.jpg"
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-3 mb-3 flex flex-col rounded-lg border border-white/10 bg-black/25 p-6 backdrop-blur-sm sm:mx-4 sm:mb-4 sm:p-7">
              <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Start with People
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/85 sm:text-lg">
              This is the first thing Grant tells every organization he works with, long before strategy ever enter the room
              </p>
            </div>
          </div>

          {/* Right: intro line + 3 rows */}
          <div className="flex flex-col justify-center">
            <p className="text-3xl font-medium leading-snug tracking-normal text-[#222222] sm:text-4xl lg:text-[2.5rem]">
              That's where 40+ years of coaching becomes judgment your organization can actually use
            </p>

            <div className="mt-8 divide-y divide-black/[0.08] border-t border-black/[0.08] sm:mt-10">
              {ADVANTAGE_ROWS.map((row) => (
                <div
                  key={row.title}
                  className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-6 sm:py-6"
                >
                  <p className="flex items-center gap-2.5 text-lg font-semibold tracking-normal text-[#222222] sm:text-xl">
                    <row.icon className="h-[18px] w-[18px] shrink-0 text-[#ca3726]" strokeWidth={2} />
                    {row.title}
                  </p>
                  <p className="ml-0 text-sm leading-relaxed text-[#555555] sm:ml-6 sm:text-base">
                    {row.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-[#555555] sm:mt-12 sm:text-base">
          Trusted by leaders navigating real change, not just theoretical strategy.
        </p>
      </div>
    </section>
  );
}
