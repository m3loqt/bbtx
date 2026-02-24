import Image from "next/image";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M5 8l2.5 2.5L11 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PLANS = [
  {
    tag: "",
    title: "AI Readiness & Strategy",
    description: "",
    price: "Starting at $499",
    pricePeriod: "/ month",
    features: [
      "Executive AI assessment workshop",
      "Opportunity mapping and prioritization",
      "Risk and governance review",
      "90 day AI roadmap",
      "Leadership briefing",
    ],
    cta: "Request Strategy Session",
    ctaHref: "#",
  },
  {
    tag: "",
    title: "AI Implementation Program",
    description: "",
    price: "Custom scope",
    pricePeriod: "/ month",
    features: [
      "Use case design and validation",
      "Pilot implementation",
      "Workflow integration",
      "Change enablement support",
      "Performance tracking setup",
    ],
    cta: "Discuss Implementation",
    ctaHref: "#",
  },
  {
    tag: "MOST POPULAR",
    title: "Strategic AI Partnership",
    description: "",
    price: "5.990€",
    pricePeriod: "/ month",
    featureColumns: [
      [
        "Ongoing advisory",
      "Executive alignment sessions",
      "Governance oversight",
      ],
      [
        "Portfolio optimization",
        "Quarterly impact review",

        "Dedicated strategic support",
      ],
    ],
    cta: "Start Partnership Conversation",
    ctaHref: "#",
    featured: true,
  },
];

export function Pricing() {
  return (
    <section className="relative z-[1] border-b border-black/[0.06] bg-[#f7f7f7]">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div className="relative z-[1] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Header: title left, description + CTA right (structure only, our style) */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-12">
          <div>
            <p className="mb-4 flex items-center gap-2 text-base font-normal text-[#555555] sm:text-lg">
              <Image
                src="/node.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
              Pricing & Packages
            </p>
            <h2 className="text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Engagement
              </span>{" "}
              options
            </h2>
          </div>
          <div className="flex flex-col gap-4 lg:pt-12">
            <p className="text-xl leading-relaxed tracking-tight text-[#222222] sm:text-2xl">
            From initial assessment to full scale implementation, we structure engagements around your goals, timeline, and level of readiness.
            </p>
            <a
              href="#"
              className="inline-flex w-fit items-center gap-2 text-base font-medium text-[#222222] transition-colors hover:text-[#E11D48] sm:text-lg"
            >
              Book a kickoff call
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
        </div>

        {/* Cards: 25% | 25% | 50% width */}
        <div className="mt-12 w-full lg:mt-16">
          <div className="grid grid-cols-1 gap-1.5 sm:gap-2 lg:grid-cols-[11fr_11fr_18fr] lg:min-h-[480px]">
            {PLANS.map((plan) => (
              <article
                key={plan.title}
                className={`rounded-xl border shadow-[0_2px_12px_rgba(0,0,0,0.01)] ${
                  plan.featured
                    ? "flex min-h-0 overflow-hidden border-black/[0.08] bg-[#222222] p-0"
                    : "flex flex-col border-black/[0.06] bg-white p-4 sm:p-5 lg:p-5"
                }`}
              >
                {plan.featured ? (
                  /* Unlimited (50%): two-column features, price + CTA at bottom */
                  <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-4 sm:px-5 sm:pt-5 lg:px-6 lg:pt-6 lg:pb-6">
                    {plan.tag ? (
                      <span className="mb-2 inline-block w-fit rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-white">
                        {plan.tag}
                      </span>
                    ) : null}
                    <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[1.75rem]">
                      {plan.title}
                    </h3>
                    {"featureColumns" in plan && plan.featureColumns ? (
                      <>
                        <div className="mt-3 shrink-0 border-t border-white/15 pt-3 sm:mt-4 sm:pt-4" />
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3">
                          {plan.featureColumns.map((col, i) => (
                            <ul key={i} className="space-y-2.5 sm:space-y-3">
                              {col.map((f) => (
                                <li
                                  key={f}
                                  className="flex items-start gap-2 text-base text-white sm:text-[15px]"
                                >
                                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                                  <span className="leading-relaxed">{f}</span>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </div>
                      </>
                    ) : null}
                    <div className="mt-auto flex flex-nowrap items-baseline justify-between gap-3 border-t border-white/15 pb-4 pt-6 sm:pt-8">
                      <p className="min-w-0 shrink text-base text-white sm:text-lg">
                        <span className="font-semibold">
                          {"price" in plan ? plan.price : ""}
                        </span>
                        <span className="text-white/80">
                          {"pricePeriod" in plan ? ` ${plan.pricePeriod}` : ""}
                        </span>
                      </p>
                      <a
                        href={plan.ctaHref}
                        className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-4 py-1.5 text-[15px] font-medium text-white transition-opacity hover:opacity-95 sm:py-2"
                      >
                        {plan.cta}
                        <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Professional & Starter (25%): title, features, price + CTA at bottom */
                  <div className="flex min-h-0 flex-1 flex-col">
                    {"tag" in plan && plan.tag ? (
                      <span className="mb-3 inline-block w-fit rounded-md bg-black/[0.06] px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-[#222222]">
                        {plan.tag}
                      </span>
                    ) : null}
                    <h3 className="text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">
                      {plan.title}
                    </h3>
                    {"description" in plan && plan.description ? (
                      <p className="mt-2 text-sm leading-relaxed tracking-tight text-[#555555] sm:text-base">
                        {plan.description}
                      </p>
                    ) : null}
                    <div className="mt-3 shrink-0 border-t border-black/[0.08] pt-3" />
                    <ul className="mt-2 space-y-2.5 sm:space-y-3">
                      {"features" in plan &&
                        plan.features?.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-sm text-[#222222] sm:text-base"
                          >
                            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#222222]" />
                            <span className="leading-relaxed">{f}</span>
                          </li>
                        ))}
                    </ul>
                    <div className="mt-auto flex flex-nowrap items-baseline justify-between gap-3 border-t border-black/[0.08] pt-4">
                      <p className="min-w-0 shrink text-sm text-[#222222] sm:text-base">
                        <span className="font-semibold">
                          {"price" in plan ? plan.price : ""}
                        </span>
                        <span className="text-[#555555]">
                          {"pricePeriod" in plan ? ` ${plan.pricePeriod}` : ""}
                        </span>
                      </p>
                      <a
                        href={plan.ctaHref}
                        className="shrink-0 inline-flex items-center gap-2 py-1 text-[13px] font-medium text-[#222222] underline underline-offset-2 transition-opacity hover:opacity-80 sm:text-sm"
                      >
                        {plan.cta}
                        <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
