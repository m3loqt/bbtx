import Image from "next/image";

const STEPS = [
  {
    step: 1,
    title: "Assess",
    description:
      "We evaluate your current capabilities, workflows, risks, and opportunities to identify where AI can create real business value.",
  },
  {
    step: 2,
    title: "Align",
    description:
      "We prioritize use cases, define success metrics, and align leadership so every initiative supports clear business objectives.",
  },
  {
    step: 3,
    title: "Implement",
    description:
      "We deploy and integrate AI solutions into existing workflows with governance, change support, and performance tracking built in.",
  },
  {
    step: 4,
    title: "Measure & Scale",
    description:
      "We monitor outcomes, refine performance, and scale successful initiatives across the organization with confidence.",
  },
];

export function Process() {
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
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-16">
          {/* Left: header + description */}
          <div>
            <p className="mb-4 flex items-center gap-2 text-base font-normal text-[#555555] sm:text-lg">
              <Image
                src="/node.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
              Process
            </p>
            <h2 className="text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
              Our AI Implementation{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Framework
              </span>
            </h2>
            <p className="mt-6 text-xl leading-relaxed tracking-tight text-[#222222] sm:text-2xl">
              A structured approach that moves your organization from exploration
              to measurable business impact with clarity and accountability.
            </p>
          </div>

          {/* Right: step cards — align first card with header (not eyebrow) */}
          <div className="flex flex-col gap-1.5 pt-10">
            {STEPS.map((step) => (
              <article
                key={step.step}
                className="rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.01)] sm:p-6 lg:p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#ca3726] sm:text-[11px]">
                  Step {step.step}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#555555] sm:text-lg">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
