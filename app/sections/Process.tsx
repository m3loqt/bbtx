const STEPS = [
  {
    num: "1",
    title: "Assess",
    description:
      "We evaluate your current capabilities, workflows, risks, and opportunities to identify where AI can create real business value.",
  },
  {
    num: "2",
    title: "Align",
    description:
      "We prioritize use cases, define success metrics, and align leadership so every initiative supports clear business objectives.",
  },
  {
    num: "3",
    title: "Implement",
    description:
      "We deploy and integrate AI solutions into existing workflows with governance, change support, and performance tracking built in.",
  },
  {
    num: "4",
    title: "Measure & Scale",
    description:
      "We monitor outcomes, refine performance, and scale successful initiatives across the organization with confidence.",
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
        <p className="mb-6 flex items-center gap-2 text-base font-normal text-white/70 sm:text-lg">
          <img
            src="/node.png"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 object-contain brightness-0 invert"
          />
          Process
        </p>

        {/* Headline */}
        <h2 className="w-full text-4xl font-medium leading-tight tracking-tighter text-white sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
          Our AI Implementation{" "}
          <span
            className="font-normal italic"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Framework
          </span>
        </h2>

        {/* Step cards with connecting arrow line behind */}
        <div className="relative mt-14 lg:mt-20">
          {/* Arrow line sits behind the cards */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden -translate-y-1/2 items-center lg:flex">
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
          <div className="relative z-[1] grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm sm:p-8"
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
