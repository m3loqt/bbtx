const STEPS = [
  {
    num: "1",
    title: "Assess",
    description:
      "We start by understanding your organization from the inside. Leadership alignment, current capabilities, cultural readiness, and where AI fits into your broader business goals.",
  },
  {
    num: "2",
    title: "Plan",
    description:
      "With a full picture in hand, we build your roadmap. Priorities, sequencing, resource requirements, and success metrics. A plan specific to your organization, not a template borrowed from someone else's.",
  },
  {
    num: "3",
    title: "Implement",
    description:
      "We work alongside your team to bring the plan to life. Supporting decisions, navigating resistance, and keeping momentum when the complexity of real organizational change sets in.",
  },
  {
    num: "4",
    title: "Measure & Scale",
    description:
      "We don't disappear after launch. We help you track what matters, learn from what's working, and build the internal capability to keep growing your AI advantage over time.",
  },
];

export function Process() {
  return (
    <section className="relative z-[1] w-full overflow-hidden bg-[#ca3726]">
      {/* Subtle dot texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.10]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div className="relative z-[1] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Eyebrow */}
        <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">
          How We Work
        </p>

        {/* Headline */}
        <h2 className="w-full text-4xl font-medium leading-tight tracking-tighter text-white sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
          A clear path from where you are{" "}
          <span
            className="font-normal italic"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            to where you need to be.
          </span>
        </h2>

        {/* Step cards with connecting arrow line behind */}
        <div className="relative mt-14 lg:mt-20">
          {/* Arrow line sits behind the cards (z-0); cards on top (z-10) so line never overlays */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden -translate-y-1/2 items-center lg:flex" aria-hidden>
            <div className="mx-10 flex flex-1 items-center">
              <div className="h-px flex-1 bg-white/25" />
              <svg
                className="h-3 w-3 shrink-0 text-white/25"
                viewBox="0 0 12 12"
                fill="currentColor"
                aria-hidden
              >
                <path d="M1 6h9M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-6 sm:p-8 before:absolute before:left-0 before:right-0 before:top-1/2 before:z-[1] before:hidden before:h-px before:-translate-y-1/2 before:bg-[#ca3726] before:content-[''] lg:before:block"
              >
                <span
                  className="block text-[5rem] font-bold leading-none tracking-tighter sm:text-[6rem]"
                  style={{
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(255,255,255,0))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {step.num}
                </span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/70 sm:text-[17px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
