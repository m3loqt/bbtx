import Image from "next/image";

const SERVICE_CARDS = [
  {
    title: "Transformational Strategy & Implementation Plan",
    description:
      "We develop a focused AI transformation strategy with prioritized initiatives, defined ownership, and a sequenced rollout plan. We include a concrete 90-day action plan and clear success metrics so your leadership team has practical direction it can execute with confidence.",
  },
  {
    title: "Organizational AI Assessment",
    description:
      "We analyze workflows, leadership alignment, and existing initiatives to pinpoint where AI can create impact. You get clear visibility into readiness, constraints, and highest-value opportunities.",
  },
  {
    title: "AI Organizational Model",
    description:
      "We define where AI fits across your organization, how responsibilities are assigned, and how initiatives align with priorities. You get a coherent framework instead of scattered experimentation.",
  },
];

export function Services() {
  return (
    <section className="relative z-[1] border-b border-black/[0.06] bg-[#f7f7f7]">
      {/* Same grid overlay as Hero / Results */}
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
        {/* 30/70 grid: eyebrow + headline row, then cards in right column only */}
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="flex items-center gap-2 text-base font-normal text-[#555555] sm:text-lg">
            <Image
              src="/node.png"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            Our services
          </p>
          {/* Right column: headline + cards, with 10% margin on the right */}
          <div className="pr-[10%]">
            <div className="max-w-4xl">
              <h2 className="text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                Level up your organization with{" "}
                <span
                  className="font-normal italic"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  AI-driven
                </span>{" "}
                impact
              </h2>
              <p className="mt-6 text-xl leading-relaxed tracking-tight text-[#222222] sm:text-2xl">
                From strategy to implementation and measurement, we help you build
                and scale AI initiatives that improve operations and long-term value.
              </p>
            </div>
            {/* Cards: 1 full-width on top, 2 side by side below */}
            <div className="mt-10 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:mt-14 lg:gap-1.5">
          {SERVICE_CARDS.map((card, i) => (
            <div
              key={card.title}
              className={`flex min-h-[240px] flex-col rounded-lg border border-black/[0.06] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] sm:min-h-[260px] lg:p-8 ${i === 0 ? "sm:col-span-2" : ""}`}
            >
              <p className="text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">
                {card.title}
              </p>
              <p className="mt-auto pt-4 text-base leading-relaxed text-[#555555] sm:text-lg">
                {card.description}
              </p>
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
