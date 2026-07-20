"use client";

import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { CTA } from "@/app/sections/CTA";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import Image from "next/image";
import Link from "next/link";

const fractalTexture = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.28'/%3E%3C/svg%3E\")",
};

const LOGOS = [
  "cha.png", "alz.png", "cvi.png", "shri.png", "rob.png", "inb.png",
  "flo.png", "ber.png", "con.png", "chg.png", "wes.png", "bra.png",
  "cho.png", "lum.png", "csp.png", "dou.png", "RIV.png", "bri.png", "bar.png",
].map((f) => `/companies-nobg/${f}`);

const STAGES = [
  {
    number: "01",
    name: "See Clearly",
    service: "Organizational Assessment & Analysis",
    copy: "Most organizations are operating on assumptions about themselves that haven’t been tested in years. We look beneath performance metrics to understand how leadership, culture, communication, and decision-making are actually experienced across the organization. The gaps between those perspectives often reveal the risks leaders cannot yet see.",
  },
  {
    number: "02",
    name: "Decide Well",
    service: "Strategy & Advisory",
    copy: "Most organizations don’t have a strategy problem. They have a decision-making problem that shows up as a strategy problem. We help leaders create the clarity, alignment, and discipline required to turn priorities into action and make strategic decisions that hold under pressure.",
  },
  {
    number: "03",
    name: "Lead at the Level the Work Requires",
    service: "Leadership & Team Development",
    copy: "Leadership development fails when it improves individuals without changing the system they operate inside. We help leaders, managers, and teams build the capabilities needed to navigate complexity, strengthen trust, and improve collective performance.",
  },
  {
    number: "04",
    name: "Use AI Well",
    service: "AI Integration & Innovation",
    copy: "The most successful AI initiatives begin with a different question: not what AI can do, but what the organization needs to do better. We help leaders identify meaningful opportunities, establish governance, and integrate AI in ways that improve decisions, performance, and adaptability.",
  },
  {
    number: "05",
    name: "Make It Last",
    service: "Implementation & Change Support",
    copy: "Most change initiatives fail long after the planning session ends. We help organizations translate intentions into action through accountability, reinforcement, communication, and practical implementation support that keeps momentum from fading.",
  },
];

const FIT_SITUATIONS = [
  "Organizations making significant AI investments without clear answers to the governance and organizational questions those investments require",
  "A leadership team where individual capability is high but collective performance has plateaued",
  "Mid-size organizations growing fast enough that the management layer is breaking under the weight of scale",
  "Leadership transitions where the incoming executive needs an honest read of the organization before making structural decisions",
  "Boards and owners who know something is wrong and whose internal teams have a stake in the current answer being the correct one",
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section id="hero" className="relative z-[1] flex min-h-screen flex-col overflow-hidden bg-[#222222] px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.22]" style={fractalTexture} aria-hidden />
        <div className="relative z-[1] flex flex-1 flex-col justify-end pb-16 sm:pb-20 lg:pb-24">
          <p className="mb-6 text-sm font-semibold text-[#ca3726] sm:text-base">
            Services
          </p>
          <h1 className="text-[2.5rem] font-medium leading-[1.06] tracking-tighter text-white sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[5.6rem]">
            The problems on most leadership team agendas this year were{" "}
            <span
              className="font-normal italic text-white/70"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              on their agendas three years ago
            </span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed tracking-tight text-white/55 sm:mt-6 sm:text-2xl">
            BBTx works with leadership teams to understand why that happens, and to change the
            organizational conditions that make it keep happening.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("openContact"))}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-90"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </button>
            <a
              href="#work"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-[15px] font-medium text-white transition-colors hover:border-white/40"
            >
              See How We Work
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </a>
          </div>
        </div>
      </section>

      {/* ── The Intersection ──────────────────────────────────────────── */}
      <section className="relative z-[1] bg-white">
        <div className="grid lg:grid-cols-[55fr_45fr] lg:items-stretch">
          <div className="relative h-72 sm:h-96 lg:h-auto">
            <Image
              src="/about/one.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 lg:bg-gradient-to-r lg:from-white/0 lg:from-45% lg:to-white"
              aria-hidden
            />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-20 lg:pr-[10%] xl:py-24">
            <div className="pointer-events-none absolute inset-0 opacity-40" style={fractalTexture} aria-hidden />
            <div className="relative rounded-2xl border border-black/10 bg-[#e4e4e4]/80 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
              <p className="text-sm font-semibold text-[#ca3726]">
                The Distinction
              </p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:mt-5 sm:text-4xl lg:text-[2.8rem]">
                Two disciplines that{" "}
                <span
                  className="font-normal italic"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  rarely sit in the same room
                </span>
              </h2>
              <div className="mt-8 max-w-3xl space-y-5 text-lg leading-relaxed tracking-tight sm:text-xl">
                <p className="text-[#555555]">
                  AI initiatives fail for the same reasons ERP implementations failed in the
                  2000s, not because the technology didn&apos;t work, but because the
                  organizational conditions required to use it well didn&apos;t exist. The
                  decision rights, the leadership alignment, the change management, the honest
                  assessment of whether current processes were worth automating in the first
                  place.
                </p>
                <p className="text-[#555555]">
                  Most AI consultants understand the technology. They are not equipped to
                  address what&apos;s underneath it. Most organizational consultants understand what&apos;s underneath it. They
                  are not equipped to address the technology.
                </p>
                <p className="text-[#222222]">
                  We&apos;ve built this practice around both, because the organizations we
                  work with are being asked to solve an organizational problem and a technology
                  problem simultaneously, and the answer to each one affects the other.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Work ──────────────────────────────────────────────────── */}
      <section id="work" className="relative z-[1] bg-[#f7f7f7]">
        <div className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid gap-4 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            <p className="text-sm font-semibold text-[#ca3726]">
              How We Work
            </p>
            <div>
              <h2 className="text-3xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-4xl lg:text-[2.8rem]">
                The work builds{" "}
                <span
                  className="font-normal italic"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  in one direction
                </span>
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed tracking-tight text-[#555555] sm:text-xl">
                Each engagement is different. The progression is consistent.
              </p>

              <div className="mt-12 divide-y divide-black/[0.07] border-t border-black/[0.07] lg:mt-14">
                {STAGES.map((stage) => (
                  <div
                    key={stage.number}
                    className="grid gap-5 py-9 sm:py-11 lg:grid-cols-[5fr_7fr] lg:gap-14 lg:py-12"
                  >
                    <div className="lg:pt-0.5">
                      <p className="text-base font-semibold text-[#ca3726] sm:text-lg">
                        {stage.number}
                      </p>
                      <p className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-[#222222] sm:text-3xl">
                        {stage.name}
                      </p>
                      <p className="mt-2 text-sm font-medium uppercase tracking-wider text-[#555555]/50">
                        {stage.service}
                      </p>
                    </div>
                    <p className="text-lg leading-relaxed text-[#555555] sm:text-xl">
                      {stage.copy}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex flex-col gap-5 border-t border-black/[0.07] pt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <p className="flex-1 text-base leading-relaxed text-[#555555] sm:text-lg">
                  Not sure where to start? The Digital Twin Snapshot is designed for that: a
                  clear picture of where to act first.
                </p>
                <Link
                  href="/digital-twin-snapshot"
                  className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
                >
                  Get Your Digital Twin Snapshot
                  <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who This Is For ───────────────────────────────────────────── */}
      <section className="relative z-[1] overflow-hidden bg-[#222222]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.22]" style={fractalTexture} aria-hidden />
        <div className="relative z-[1] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div>
              <p className="text-sm font-semibold text-[#ca3726]">
                Right Fit
              </p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tighter text-white sm:mt-5 sm:text-4xl lg:text-[2.8rem]">
                This work is not{" "}
                <span
                  className="font-normal italic text-white/70"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  for every organization
                </span>
              </h2>
            </div>
            <p className="text-lg leading-relaxed tracking-tight text-white/55 sm:text-xl lg:pt-2">
              It requires leadership teams willing to be honest about what isn&apos;t
              working, including the leadership team itself. The organizations where this work has the most impact are typically dealing
              with one or more of these:
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 lg:mt-14">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr_1fr]">
              {FIT_SITUATIONS.slice(0, 3).map((text) => (
                <div
                  key={text}
                  className="flex min-h-[200px] items-center rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:min-h-[240px] lg:min-h-[280px] lg:p-7"
                >
                  <p className="text-lg leading-relaxed text-white/70">{text}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_1.6fr]">
              {FIT_SITUATIONS.slice(3).map((text) => (
                <div
                  key={text}
                  className="flex min-h-[200px] items-center rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:min-h-[240px] lg:min-h-[280px] lg:p-7"
                >
                  <p className="text-lg leading-relaxed text-white/70">{text}</p>
                </div>
              ))}

              <div className="flex min-h-[200px] flex-col justify-between gap-6 rounded-2xl bg-[#ca3726] p-6 sm:min-h-[240px] lg:min-h-[280px] lg:p-7">
                <p className="text-lg font-semibold leading-snug text-white sm:text-xl">
                  We work directly with C-suite leaders, boards, and owners. Not around them.
                </p>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("openContact"))}
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-90"
                >
                  Talk to Us About Your Situation
                  <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ──────────────────────────────────────────────── */}
      <section className="relative z-[1] overflow-hidden bg-[#f7f7f7]">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Left: text */}
          <div className="flex-shrink-0 px-4 py-16 sm:px-6 sm:py-20 lg:w-2/5 lg:px-8 lg:py-24">
            <h2 className="text-2xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-3xl lg:text-4xl">
              More than 100+ organizations
              <br />
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                with the same core approach
              </span>
            </h2>
          </div>

          {/* Right: scrolling logos */}
          <div className="relative lg:w-3/5 overflow-hidden">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 lg:w-48"
              style={{ background: "linear-gradient(to right, #f7f7f7, transparent)" }}
            />
            <div
              className="flex w-max items-center gap-4 py-10 lg:py-24"
              style={{ animation: "logo-scroll 80s linear infinite", willChange: "transform" }}
            >
              {[...LOGOS, ...LOGOS].map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative flex h-20 shrink-0 items-center px-3 sm:h-24"
                >
                  <Image
                    src={src}
                    alt=""
                    width={320}
                    height={128}
                    className="h-20 w-auto max-w-[300px] object-contain opacity-60 sm:h-32 sm:max-w-[400px]"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
