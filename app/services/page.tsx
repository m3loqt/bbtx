"use client";

// Services hub. Direction (pinned by Mel's references, not rolled):
// THESIS: the services ARE the page. One ruled, photographed row per service, each a single link, instead of
//   cards, glass, numbered steps or a red kicker above every heading. Refuses the "AI template" scaffolding.
// OWN-WORLD: #f7f7f7 and white grounds, one flat charcoal band, one flat brand-red close; Familjen Grotesk only,
//   tight tracking, no serif accents except the original slogan; hairlines instead of boxes; real photographs.
// STORY: a leader sees the six ways BBTx works, picks the one that matches the problem, and clicks it.
// FIRST VIEWPORT: the H1 (the service name for the index), the original slogan beneath it, the lead, two buttons.
// FORM: editorial index. FINISH: unreviewed and undocumented is unfinished.

import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import Image from "next/image";
import Link from "next/link";
import { altFor, companyLogoAlt } from "@/lib/seo/image-alt";

const LOGOS = [
  "cha.png", "alz.png", "cvi.png", "shri.png", "rob.png", "inb.png",
  "flo.png", "ber.png", "con.png", "chg.png", "wes.png", "bra.png",
  "cho.png", "lum.png", "csp.png", "dou.png", "RIV.png", "bri.png", "bar.png",
].map((f) => `/companies-nobg/${f}`);

// The six services, in the order the work builds. `stage` is the line that used to be the big heading;
// `copy` is Grant's own wording, unchanged.
const SERVICES = [
  {
    name: "Organizational Assessment & Analysis",
    href: "/services/organizational-assessment",
    stage: "See Clearly",
    image: "/serv1.png",
    copy: "Most organizations are operating on assumptions about themselves that haven’t been tested in years. We look beneath performance metrics to understand how leadership, culture, communication, and decision-making are actually experienced across the organization. The gaps between those perspectives often reveal the risks leaders cannot yet see.",
  },
  {
    name: "Strategy & Advisory Services",
    href: "/services/strategy-advisory",
    stage: "Decide Well",
    image: "/serv2.png",
    copy: "Most organizations don’t have a strategy problem. They have a decision-making problem that shows up as a strategy problem. We help leaders create the clarity, alignment, and discipline required to turn priorities into action and make strategic decisions that hold under pressure.",
  },
  {
    name: "Leadership & Team Development",
    href: "/services/leadership-development",
    stage: "Lead at the Level the Work Requires",
    image: "/serv3.png",
    copy: "Leadership development fails when it improves individuals without changing the system they operate inside. We help leaders, managers, and teams build the capabilities needed to navigate complexity, strengthen trust, and improve collective performance.",
  },
  {
    name: "AI Integration & Innovation",
    href: "/services/ai-integration",
    stage: "Use AI Well",
    image: "/serv4.png",
    copy: "The most successful AI initiatives begin with a different question: not what AI can do, but what the organization needs to do better. We help leaders identify meaningful opportunities, establish governance, and integrate AI in ways that improve decisions, performance, and adaptability.",
  },
  {
    name: "Implementation & Change Support",
    href: "/services/implementation-support",
    stage: "Make It Last",
    image: "/serv5.png",
    copy: "Most change initiatives fail long after the planning session ends. We help organizations translate intentions into action through accountability, reinforcement, communication, and practical implementation support that keeps momentum from fading.",
  },
  {
    name: "Executive Recruitment Assessment Services",
    href: "/services/executive-recruitment",
    stage: "For search committees",
    image: "/serv6.png",
    copy: "Résumés, references, and conventional interviews rarely reveal how a candidate will lead, decide, communicate, and perform under pressure. We help search committees see that before they hire.",
  },] as const;

const FIT_SITUATIONS = [
  "Organizations making significant AI investments without clear answers to the governance and organizational questions those investments require",
  "A leadership team where individual capability is high but collective performance has plateaued",
  "Mid-size organizations growing fast enough that the management layer is breaking under the weight of scale",
  "Leadership transitions where the incoming executive needs an honest read of the organization before making structural decisions",
  "Boards and owners who know something is wrong and whose internal teams have a stake in the current answer being the correct one",
];

const breadcrumbJsonLd = breadcrumbList([{ name: "Services", path: "/services" }]);

// A general page: nothing here is about one service, so the form opens on "General Inquiry".
function openGeneralInquiry() {
  window.dispatchEvent(new CustomEvent("openContact", { detail: { inquiry: "General Inquiry" } }));
}

const BUTTON_RED =
  "inline-flex w-fit items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-95";

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />
      <Nav />

      {/* ── Hero: the name of the page, the slogan, one plain paragraph ──────────────────────── */}
      <section className="relative z-[1] bg-[#f7f7f7] px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-40 lg:px-8 lg:pb-24 lg:pt-44">
        <h1 className="text-balance text-[clamp(2.75rem,7.4vw,6rem)] font-medium leading-[1] tracking-[-0.035em] text-[#222222]">
          Organizational Consulting Services
        </h1>
        <p className="mt-8 max-w-4xl text-[clamp(1.5rem,2.7vw,2.5rem)] font-medium leading-[1.14] tracking-[-0.02em] text-[#222222] sm:mt-10">
          The problems on most leadership team agendas this year were{" "}
          <span
            className="font-normal italic text-[#555555]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            on their agendas three years ago
          </span>
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#555555] sm:mt-7 sm:text-xl">
          BBTx works with leadership teams to understand why that happens, and to change the
          organizational conditions that make it keep happening. This is often where organizational
          development begins.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <button type="button" onClick={openGeneralInquiry} className={BUTTON_RED}>
            Start a Conversation
            <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </button>
          <a
            href="#work"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-black/[0.12] px-5 py-3 text-[15px] font-medium text-[#555555] transition-colors hover:border-black/25 hover:text-[#222222]"
          >
            See How We Work
            <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </a>
        </div>
      </section>

      {/* ── The services: one ruled row each, the whole row is the link ───────────────────────── */}
      <section id="work" className="relative z-[1] bg-[#f7f7f7]">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="border-t border-black/[0.1] pb-10 pt-14 sm:pt-20 lg:pb-14 lg:pt-24">
            <h2 className="text-balance text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#222222]">
              The work builds in one direction
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#555555] sm:text-xl">
              Each engagement is different. The progression is consistent.
            </p>
          </div>

          <ul className="border-t border-black/[0.1]">
            {SERVICES.map((s) => (
              <li
                key={s.href}
                className="group relative grid gap-6 border-b border-black/[0.1] py-9 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[10px] has-[:focus-visible]:outline-[#ca3726] sm:py-11 md:grid-cols-2 md:gap-x-10 lg:grid-cols-12 lg:py-12"
              >
                <div className="flex flex-col justify-between gap-8 md:col-start-1 lg:col-start-1 lg:col-span-4">
                  <div>
                    <h3 className="text-[clamp(1.625rem,2.3vw,2.125rem)] font-medium leading-[1.1] tracking-[-0.025em] text-[#222222]">
                      <Link href={s.href} className="outline-none after:absolute after:inset-0 after:z-[1]">
                        {s.name}
                      </Link>
                    </h3>
                    <p className="mt-3 text-base text-[#555555]">{s.stage}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden h-12 w-12 items-center justify-center rounded-full bg-black/[0.06] text-[#222222] transition-colors duration-300 group-hover:bg-[#ca3726] group-hover:text-white group-has-[:focus-visible]:bg-[#ca3726] group-has-[:focus-visible]:text-white md:flex"
                  >
                    <ArrowUpRight className="h-[18px] w-[18px]" />
                  </span>
                </div>

                <p className="text-lg leading-relaxed text-[#555555] md:col-start-1 lg:col-start-5 lg:col-span-4 lg:max-w-[46ch]">{s.copy}</p>

                {/* The photograph repeats the link, so it is hidden from screen readers; it still carries alt text. */}
                <div aria-hidden="true" className="relative aspect-[3/2] overflow-hidden rounded-xl bg-black/[0.05] md:col-start-2 md:row-span-2 md:row-start-1 lg:col-start-9 lg:row-span-1 lg:col-span-4">
                  <Image
                    src={s.image}
                    alt={altFor(s.image)}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
                    className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                  />
                </div>

                <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.06] text-[#222222] md:hidden">
                  <ArrowUpRight className="h-[18px] w-[18px]" />
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:py-14">
            <p className="max-w-2xl flex-1 text-base leading-relaxed text-[#555555] sm:text-lg">
              Not sure where to start? The Digital Twin Snapshot is designed for that: a clear picture of where to act first.
            </p>
            <Link href="/digital-twin-snapshot" className={`${BUTTON_RED} shrink-0`}>
              Get Your Digital Twin Snapshot
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── The distinction: a real photograph, plain text ────────────────────────────────────── */}
      <section className="relative z-[1] bg-white">
        <div className="grid gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:px-8 lg:py-32">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black/[0.05] lg:aspect-auto lg:min-h-[520px]">
            <Image
              src="/grantt.jpg"
              alt={altFor("/grantt.jpg")}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[64%_30%]"
            />
          </div>
          <div className="lg:py-4">
            <h2 className="max-w-3xl text-balance text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#222222]">
              Two disciplines that rarely sit in the same room
            </h2>
            <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-[#555555] sm:mt-10 sm:text-xl">
              <p>
                AI initiatives fail for the same reasons ERP implementations failed in the 2000s, not because the
                technology didn&apos;t work, but because the organizational conditions required to use it well
                didn&apos;t exist. The decision rights, the leadership alignment, the change management, the honest
                assessment of whether current processes were worth automating in the first place.
              </p>
              <p>
                Most AI consultants understand the technology. They are not equipped to address what&apos;s underneath
                it. Most organizational consultants understand what&apos;s underneath it. They are not equipped to
                address the technology.
              </p>
              <p className="text-[#222222]">
                We&apos;ve built this practice around both, because the organizations we work with are being asked to
                solve an organizational problem and a technology problem simultaneously, and the answer to each one
                affects the other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Right fit: one flat dark band, a ruled list ───────────────────────────────────────── */}
      <section className="relative z-[1] bg-[#222222]">
        <div className="grid gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:px-8 lg:py-32">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2 className="text-balance text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
              This work is not for every organization
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70 sm:text-xl">
              It requires leadership teams willing to be honest about what isn&apos;t working, including the leadership
              team itself. The organizations where this work has the most impact are typically dealing with one or more
              of these:
            </p>
          </div>

          <div>
            <ul className="border-t border-white/[0.18]">
              {FIT_SITUATIONS.map((text) => (
                <li key={text} className="border-b border-white/[0.18] py-7 text-xl leading-snug text-white/90 sm:py-8 sm:text-2xl">
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-col gap-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-2xl font-medium leading-snug tracking-[-0.015em] text-white sm:text-[1.75rem]">
                We work directly with C-suite leaders, boards, and owners. Not around them.
              </p>
              <button
                type="button"
                onClick={openGeneralInquiry}
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-90"
              >
                Talk to Us About Your Situation
                <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof ──────────────────────────────────────────────────────────────────────── */}
      <section className="relative z-[1] overflow-hidden bg-[#f7f7f7]">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="flex-shrink-0 px-4 py-16 sm:px-6 sm:py-20 lg:w-2/5 lg:px-8 lg:py-24">
            <h2 className="text-2xl font-medium leading-tight tracking-[-0.03em] text-[#222222] sm:text-3xl lg:text-4xl">
              More than 100+ organizations
              <br />
              with the same core approach
            </h2>
          </div>

          <div className="relative overflow-hidden lg:w-3/5">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 lg:w-48"
              style={{ background: "linear-gradient(to right, #f7f7f7, transparent)" }}
            />
            <div
              className="flex w-max items-center gap-4 py-10 lg:py-24"
              style={{ animation: "logo-scroll 80s linear infinite", willChange: "transform" }}
            >
              {[...LOGOS, ...LOGOS].map((src, i) => (
                <div key={`${src}-${i}`} className="relative flex h-20 shrink-0 items-center px-3 sm:h-24">
                  <Image
                    src={src}
                    alt={companyLogoAlt(src)}
                    aria-hidden={i >= LOGOS.length || undefined}
                    width={128}
                    height={128}
                    className="h-20 w-auto object-contain opacity-60 sm:h-32"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Close: flat brand red, the existing words ─────────────────────────────────────────── */}
      <section className="relative z-[1] bg-[#ca3726]">
        <div className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <h2 className="max-w-4xl text-balance text-[clamp(2.5rem,6.4vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white">
            Ready to thrive in a complex world?
          </h2>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-white sm:text-2xl">
            Talk to us about your goals. We&apos;ll help you assess readiness, choose the right path, and deliver
            measurable results.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3 lg:mt-12">
            <a
              href="https://www.calendly.com/granttate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-95"
            >
              Schedule a Consultation
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </a>
            <button
              type="button"
              onClick={openGeneralInquiry}
              className="inline-flex items-center gap-2 rounded-lg border border-white/60 px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
            >
              Send us a Message
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
