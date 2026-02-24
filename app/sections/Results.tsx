const LOGOS = [
  { name: "Nexora", font: "var(--font-fraunces), serif" },
  { name: "Ventura", font: "var(--font-mono), monospace" },
  { name: "Axiom", font: "var(--font-playfair), Georgia, serif" },
  { name: "Stride", font: "var(--font-dm-sans), sans-serif" },
  { name: "Lumina", font: "var(--font-inter), sans-serif" },
  { name: "Meridian", font: "var(--font-fraunces), serif" },
  { name: "Catalyst", font: "var(--font-mono), monospace" },
  { name: "Forge", font: "var(--font-dm-sans), sans-serif" },
];

const METRICS = [
  { value: "100+", label: "Organizations trusted us" },
  { value: "50+", label: "Industries served" },
  { value: "200%", label: "Average measurable impact" },
  { value: "12 weeks", label: "Avg. time to value" },
];

export function Results() {
  return (
    <section className="relative z-[1] border-y border-black/[0.06] bg-[#f7f7f7]">
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
        {/* Logo carousel first */}
        <div className="relative w-full overflow-hidden">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 shrink-0 sm:w-32 lg:w-40"
            style={{
              background:
                "linear-gradient(to right, var(--background) 0%, transparent 100%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 shrink-0 sm:w-32 lg:w-40"
            style={{
              background:
                "linear-gradient(to left, var(--background) 0%, transparent 100%)",
            }}
            aria-hidden
          />
          <div
            className="flex"
            style={{ animation: "logo-scroll 40s linear infinite" }}
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span
                key={`${logo.name}-${i}`}
                className="flex shrink-0 items-center justify-center px-8 text-2xl font-medium text-[#222222] opacity-80 sm:px-10 sm:text-3xl lg:px-12 lg:text-4xl"
                style={{ fontFamily: logo.font }}
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>

        {/* Header and description below carousel */}
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[3fr_2fr] lg:items-end lg:gap-12">
          <h2 className="text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
            100+ organizations trusted us to{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              integrate AI
            </span>{" "}
            for measurable impact.
          </h2>
          <p className="mb-[5px] max-w-full text-xl leading-relaxed tracking-tight text-[#222222] sm:text-2xl">
            More than 100 organizations worldwide trusted us to improve their
            operations, decision-making, and long-term business value with AI.
          </p>
        </div>

        {/* 4 metric cards: same spacing as Services, full width */}
        <div className="mt-10 grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-1.5">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex min-h-0 flex-col rounded-lg border border-black/[0.06] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] lg:p-8"
            >
              <div className="mt-auto pt-4">
                <p className="text-3xl font-semibold tracking-tight text-[#222222] sm:text-4xl lg:text-5xl xl:text-6xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-base leading-relaxed text-[#555555] sm:text-lg">
                  {metric.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
