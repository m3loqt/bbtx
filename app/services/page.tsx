"use client";

// Services hub, built on the section structure of Mel's reference (averint service-two), with BBTx's own copy in every slot.
// SEQUENCE: dim full-bleed photo hero, one giant line -> ruled logo strip -> photograph with a floating pill beside the
//   "distinction" copy -> soft grey section (heading, boxes, tall photograph) -> band of big drifting words ->
//   ruled services list (photo per row, round arrow) -> founder card with a notched corner -> dark close.
// MEASURE: nearly edge to edge. 15px side gutters at every width, as in the reference (the site's own pages use 32px).
// COPY: nothing removed. The reference's stat blocks, pricing and cycling "expertise" list have no verified BBTx content
//   to fill them, so they are not here rather than invented. The team slot shows Dr. Grant Tate alone: BBTx sells his
//   direct, senior-led guidance (DEC-001), so the slot does not list the wider team.

import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { JsonLd } from "@/app/components/JsonLd";
import { breadcrumbList } from "@/lib/seo/schema";
import { ArrowUpRight } from "@/app/components/ArrowIcon";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { altFor, companyLogoAlt } from "@/lib/seo/image-alt";
import { TEAM } from "@/app/team/team-data";

const LOGOS = [
  "cha.png", "alz.png", "cvi.png", "shri.png", "rob.png", "inb.png",
  "flo.png", "ber.png", "con.png", "chg.png", "wes.png", "bra.png",
  "cho.png", "lum.png", "csp.png", "dou.png", "RIV.png", "bri.png", "bar.png",
].map((f) => `/companies-nobg/${f}`);

// The six services, in the order the work builds. `stage` is the phrase that used to be the big heading;
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
  },
] as const;

const FIT_SITUATIONS = [
  "Organizations making significant AI investments without clear answers to the governance and organizational questions those investments require",
  "A leadership team where individual capability is high but collective performance has plateaued",
  "Mid-size organizations growing fast enough that the management layer is breaking under the weight of scale",
  "Leadership transitions where the incoming executive needs an honest read of the organization before making structural decisions",
  "Boards and owners who know something is wrong and whose internal teams have a stake in the current answer being the correct one",
];

const GRANT = TEAM.grant;

const breadcrumbJsonLd = breadcrumbList([{ name: "Services", path: "/services" }]);

// A general page: nothing here is about one service, so the form opens on "General Inquiry".
function openGeneralInquiry() {
  window.dispatchEvent(new CustomEvent("openContact", { detail: { inquiry: "General Inquiry" } }));
}

// Grounds taken from the reference's warm neutrals; ink and muted text; the band grey; the brand red stays on hover.
const BASE = "bg-[#f7f7f2]";
const SOFT = "bg-[#eeece6]";
const INK = "text-[#2d2c2c]";
const MUTED = "text-[#5a5955]";
const GUTTER = "px-[15px]";
const SECTION_Y = "py-[88px] sm:py-[110px] lg:py-[140px]";
const H2 = `text-balance text-[clamp(2.1rem,3.3vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.03em] ${INK}`;

// Pill buttons with a round arrow, as in the reference.
const PILL = "group/pill inline-flex w-fit items-center gap-4 rounded-full py-2 pl-6 pr-2 text-[15px] font-medium transition-colors";
const PILL_LIGHT = `${PILL} bg-white text-[#1b1b1b] hover:bg-[#efeee8]`;
const PILL_DARK = `${PILL} bg-[#1b1b1b] text-white hover:bg-[#333333]`;
const PILL_OUTLINE =
  "inline-flex w-fit items-center rounded-full border border-white/55 px-6 py-[15px] text-[15px] font-medium text-white transition-colors hover:bg-white/10";

function PillArrow({ tone }: { tone: "light" | "dark" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors group-hover/pill:bg-[#ca3726] group-hover/pill:text-white ${
        tone === "light" ? "bg-[#1b1b1b] text-white" : "bg-white text-[#1b1b1b]"
      }`}
    >
      <ArrowUpRight className="h-4 w-4" />
    </span>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />
      <Nav />

      {/* 1. Hero: dim full-bleed photograph, one giant line, the statement and the way in */}
      <section id="hero" className={`relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#111111] ${GUTTER}`}>
        <Image
          src="/grant.jpg"
          alt={altFor("/grant.jpg")}
          fill
          priority
          sizes="(min-width: 1920px) 1920px, 100vw"
          className="-z-20 origin-[78%_42%] object-cover object-[74%_50%] lg:scale-[1.3] lg:object-[78%_42%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.38)_38%,rgba(0,0,0,0.84)_100%)]"
        />

        <div className="flex flex-1 flex-col justify-between gap-16 pb-12 pt-32 lg:gap-20 lg:pb-[84px] lg:pt-[150px] xl:pb-[140px]">
          <h1 className="text-balance text-[clamp(2.6rem,10vw,9.5rem)] font-medium leading-[0.93] tracking-[-0.04em] text-white">
            Organizational Consulting Services
          </h1>

          <div className="grid gap-8 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-x-[30px] lg:gap-y-9">
            <p className="text-[clamp(1.5rem,2.5vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white lg:col-span-6 lg:col-start-7 lg:row-start-1">
              The problems on most leadership team agendas this year were{" "}
              <span
                className="font-normal italic text-white/70"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                on their agendas three years ago
              </span>
            </p>
            <p className="max-w-[34rem] text-[17px] leading-relaxed text-white/85 lg:col-span-4 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-end">
              BBTx works with leadership teams to understand why that happens, and to change the
              organizational conditions that make it keep happening. This is often where organizational
              development begins.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-6 lg:col-start-7 lg:row-start-2">
              <button type="button" onClick={openGeneralInquiry} className={PILL_LIGHT}>
                Start a Conversation
                <PillArrow tone="light" />
              </button>
              <a href="#work" className={PILL_OUTLINE}>
                See How We Work
              </a>
            </div>
          </div>
        </div>

        <a
          href="#clients"
          aria-label="Scroll to the next section"
          className="absolute bottom-6 left-1/2 hidden h-[88px] w-[88px] -translate-x-1/2 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white transition-colors hover:bg-white/25 xl:flex"
        >
          <ArrowDown className="h-5 w-5" aria-hidden />
        </a>
      </section>

      {/* 2. Logo strip: ruled cells that drift */}
      <section id="clients" className={`relative z-[1] overflow-hidden border-b border-black/[0.14] ${BASE}`}>
        <div
          className="flex w-max motion-reduce:[animation:none]"
          style={{ animation: "logo-scroll 90s linear infinite", willChange: "transform" }}
        >
          {[...LOGOS, ...LOGOS].map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="flex h-[140px] w-[220px] shrink-0 items-center justify-center border-r border-black/[0.14] sm:h-[180px] sm:w-[320px]"
            >
              <Image
                src={src}
                alt={companyLogoAlt(src)}
                aria-hidden={i >= LOGOS.length || undefined}
                width={128}
                height={128}
                className="h-14 w-auto object-contain opacity-60 sm:h-20"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 3. The distinction: photograph with a floating pill, copy to the right */}
      <section className={`relative z-[1] ${BASE} ${GUTTER} ${SECTION_Y}`}>
        <div className="grid gap-20 lg:grid-cols-[36fr_22fr_42fr] lg:gap-0">
          <div className="relative">
            <div className="relative aspect-[520/600] overflow-hidden rounded-[14px] bg-black/[0.05]">
              <Image
                src="/about/one.jpg"
                alt={altFor("/about/one.jpg")}
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover object-[42%_50%]"
              />
            </div>
            <p className="absolute -bottom-7 left-[6%] max-w-[80%] rounded-full bg-white px-7 py-5 text-[15px] font-medium leading-snug text-[#1b1b1b] shadow-[0_18px_34px_rgba(0,0,0,0.1)]">
              More than 100+ organizations with the same core approach
            </p>
          </div>

          <div className="lg:col-start-3 lg:pt-2">
            <h2 className={`max-w-[18ch] ${H2}`}>Two disciplines that rarely sit in the same room</h2>
            <div className={`mt-9 max-w-[34rem] space-y-5 text-[17px] leading-[1.65] ${MUTED}`}>
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
              <p className={INK}>
                We&apos;ve built this practice around both, because the organizations we work with are being asked to
                solve an organizational problem and a technology problem simultaneously, and the answer to each one
                affects the other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Right fit: soft grey, heading and link, ruled boxes, one tall photograph */}
      <section className={`relative z-[1] ${SOFT} ${GUTTER} ${SECTION_Y}`}>
        <div className="grid items-stretch gap-[30px] lg:grid-cols-2">
          <div>
            <div className="mx-auto max-w-[36rem] text-center">
              <h2 className={H2}>This work is not for every organization</h2>
              <p className={`mt-6 text-[17px] leading-[1.65] ${MUTED}`}>
                It requires leadership teams willing to be honest about what isn&apos;t working, including the leadership
                team itself. The organizations where this work has the most impact are typically dealing with one or
                more of these:
              </p>
              <button
                type="button"
                onClick={openGeneralInquiry}
                className="mt-7 inline-flex items-center gap-2 text-[17px] font-medium text-[#1b1b1b] underline decoration-black/30 underline-offset-[6px] transition-colors hover:decoration-[#ca3726]"
              >
                Talk to Us About Your Situation
                <ArrowUpRight className="h-[18px] w-[18px]" />
              </button>
            </div>

            <ul className="mt-14 grid gap-[30px] sm:grid-cols-2 lg:mt-16">
              {FIT_SITUATIONS.map((text) => (
                <li
                  key={text}
                  className={`flex min-h-[210px] items-start rounded-xl border border-black/[0.16] p-6 text-[17px] leading-[1.5] sm:p-7 ${INK}`}
                >
                  {text}
                </li>
              ))}
              <li className="flex min-h-[210px] items-end rounded-xl bg-[#1b1b1b] p-6 text-xl font-medium leading-snug tracking-[-0.01em] text-white sm:p-7">
                We work directly with C-suite leaders, boards, and owners. Not around them.
              </li>
            </ul>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-[14px] bg-black/[0.05] lg:min-h-0">
            <Image
              src="/about/four.jpg"
              alt={altFor("/about/four.jpg")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[60%_30%]"
            />
          </div>
        </div>
      </section>

      {/* 5. Band of big words: the stages of the work, drifting. Decorative, the same words are in the list below. */}
      <section aria-hidden="true" className="relative z-[1] overflow-hidden bg-[#9d9d97] py-[110px] sm:py-[160px] lg:py-[200px]">
        <div
          className="flex w-max items-center motion-reduce:[animation:none]"
          style={{
            animation: "logo-scroll 80s linear infinite",
            willChange: "transform",
            maskImage: "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
          }}
        >
          {[0, 1].map((copy) =>
            SERVICES.slice(0, 5).map((s) => (
              <span
                key={`${copy}-${s.stage}`}
                className="shrink-0 whitespace-nowrap px-[5vw] text-[clamp(3.25rem,8.2vw,7.75rem)] font-normal leading-none tracking-[-0.035em] text-white"
              >
                {s.stage}
              </span>
            ))
          )}
        </div>
      </section>

      {/* 6. The services: ruled rows, one link each */}
      <section id="work" className={`relative z-[1] ${BASE}`}>
        <div className={`${GUTTER} pb-10 pt-[88px] sm:pt-[110px] lg:pb-14 lg:pt-[140px]`}>
          <h2 className={`max-w-[22ch] ${H2}`}>The work builds in one direction</h2>
          <p className={`mt-4 max-w-3xl text-[17px] leading-relaxed ${MUTED}`}>
            Each engagement is different. The progression is consistent.
          </p>
        </div>

        <ul className="border-t border-black/[0.14]">
          {SERVICES.map((s) => (
            <li
              key={s.href}
              className={`group relative grid gap-6 border-b border-black/[0.14] py-9 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-[#ca3726] sm:py-11 md:grid-cols-2 md:gap-x-10 xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)_minmax(0,455px)] xl:gap-x-[60px] xl:py-[42px] ${GUTTER}`}
            >
              <div className="flex flex-col justify-between gap-8 md:col-start-1 xl:col-start-1">
                <div>
                  <h3 className={`text-[clamp(1.6rem,2.1vw,1.85rem)] font-medium leading-[1.12] tracking-[-0.03em] ${INK}`}>
                    <Link href={s.href} className="outline-none after:absolute after:inset-0 after:z-[1]">
                      {s.name}
                    </Link>
                  </h3>
                  <p className={`mt-3 text-base ${MUTED}`}>{s.stage}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden h-[60px] w-[60px] items-center justify-center rounded-full bg-[#e9e7e1] text-[#1b1b1b] transition-colors duration-300 group-hover:bg-[#ca3726] group-hover:text-white group-has-[:focus-visible]:bg-[#ca3726] group-has-[:focus-visible]:text-white md:flex"
                >
                  <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
                </span>
              </div>

              <p className={`text-[17px] leading-[1.6] md:col-start-1 xl:col-start-2 xl:max-w-[27rem] ${MUTED}`}>{s.copy}</p>

              {/* The photograph repeats the link, so it is hidden from screen readers; it still carries alt text. */}
              <div
                aria-hidden="true"
                className="relative aspect-[455/255] overflow-hidden rounded-[14px] bg-black/[0.05] md:col-start-2 md:row-span-2 md:row-start-1 xl:col-start-3 xl:row-span-1"
              >
                <Image
                  src={s.image}
                  alt={altFor(s.image)}
                  fill
                  sizes="(min-width: 1280px) 455px, (min-width: 768px) 46vw, 100vw"
                  className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                />
              </div>

              <span aria-hidden="true" className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#e9e7e1] text-[#1b1b1b] md:hidden">
                <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
              </span>
            </li>
          ))}
        </ul>

        <div className={`flex flex-col gap-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:py-14 ${GUTTER}`}>
          <p className={`max-w-2xl flex-1 text-[17px] leading-relaxed ${MUTED}`}>
            Not sure where to start? The Digital Twin Snapshot is designed for that: a clear picture of where to act first.
          </p>
          <Link href="/digital-twin-snapshot" className={`${PILL_DARK} shrink-0`}>
            Get Your Digital Twin Snapshot
            <PillArrow tone="dark" />
          </Link>
        </div>
      </section>

      {/* 7. The founder: portrait card with a notched corner, name and role beneath, his own words beside it */}
      <section className={`relative z-[1] border-t border-black/[0.14] ${BASE} ${GUTTER} ${SECTION_Y}`}>
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-[30px]">
          <Link href={`/team/${GRANT.slug}`} className="group block max-w-[620px] outline-none">
            <div className="relative">
              <div
                className="relative aspect-[411/460] overflow-hidden rounded-[14px] bg-black/[0.05]"
                style={{
                  maskImage: "radial-gradient(circle 76px at 100% 100%, transparent 75px, #000 76px)",
                  WebkitMaskImage: "radial-gradient(circle 76px at 100% 100%, transparent 75px, #000 76px)",
                }}
              >
                <Image
                  src={GRANT.photo}
                  alt={altFor("/grantt.jpg")}
                  fill
                  sizes="(min-width: 1024px) 620px, 100vw"
                  className="object-cover object-[64%_30%] transition-transform duration-[700ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#1b1b1b] text-white transition-colors duration-300 group-hover:bg-[#ca3726] group-focus-visible:bg-[#ca3726]"
              >
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
            <h2 className={`mt-5 text-[1.85rem] font-medium leading-tight tracking-[-0.025em] ${INK}`}>{GRANT.name}</h2>
            <p className={`mt-1 text-base ${MUTED}`}>{GRANT.role}</p>
          </Link>

          <div className="flex max-w-[36rem] flex-col justify-between gap-12 lg:gap-16 lg:pb-20 lg:pt-2">
            <p className={`text-[clamp(1.5rem,2.3vw,2.1rem)] font-medium leading-[1.2] tracking-[-0.02em] ${INK}`}>{GRANT.bio[0]}</p>
            <div className={`space-y-5 text-[17px] leading-[1.65] ${MUTED}`}>
              {GRANT.bio.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Close: dark band, one sentence, the way in */}
      <section className={`relative z-[1] bg-[#1b1b1b] ${GUTTER} ${SECTION_Y}`}>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-[16ch] text-balance text-[clamp(2.6rem,6.6vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.04em] text-white">
              Ready to thrive in a complex world?
            </h2>
            <p className="mt-8 max-w-[34rem] text-xl leading-relaxed text-white/85">
              Talk to us about your goals. We&apos;ll help you assess readiness, choose the right path, and deliver
              measurable results.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <a
              href="https://www.calendly.com/granttate"
              target="_blank"
              rel="noopener noreferrer"
              className={PILL_LIGHT}
            >
              Schedule a Consultation
              <PillArrow tone="light" />
            </a>
            <button type="button" onClick={openGeneralInquiry} className={PILL_OUTLINE}>
              Send us a Message
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
