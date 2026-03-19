import { Compass } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "We Learn Your Organization",
    description:
      "Your competitive position, operations, financials, leadership, and strategic challenges",
    image: "/img1.png",
  },
  {
    num: "02",
    title: "We Build Your Digital Twin",
    description:
      "Five dimensions. One living model. A complete picture of how your organization actually works.",
    image: "/img2.png",
  },
  {
    num: "03",
    title: "We Align Your Leadership",
    description:
      "We close the gaps, make decisions tangible, and turn the model into a strategy",
    image: "/img3.png",
  },
  {
    num: "04",
    title: "We Keep It Alive",
    description:
      "We maintain and update the twin as your organization evolves. It never goes stale.",
    image: "/img4.png",
  },
]

export function Process() {
  return (
    <section className="relative z-[1] w-full overflow-hidden bg-white">
      {/* Subtle dot texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.10]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="relative z-[1] px-4 py-16 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        {/* Eyebrow */}
        <p className="mb-6 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
          <Compass className="h-4 w-4 text-[#ca3726]" />
          Our Approach
        </p>

        <div className="mt-2 grid gap-10 lg:grid-cols-[6fr_4fr] lg:items-start">
          {/* Headline */}
        <h2 className="max-w-6xl text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
          <span className="block">
            Strategy that{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              lives and grows
            </span>
          </span>
          <span className="block">inside your organization</span>
        </h2>

          {/* Supporting line */}
          <p className="max-w-2xl text-xl leading-relaxed tracking-tight text-[#222222] sm:text-2xl mt-10 lg:mt-6">
            Every BBTX engagement follows the same process. We build a digital twin of your organization and use it to
            drive every strategic decision that follows.
          </p>
        </div>

        {/* Centered 4-column cards */}
        <div className="mt-12 lg:mt-16">
          <div className="mx-auto w-full max-w-[110rem]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {STEPS.map((step) => (
                <div
                  key={step.num}
                  className="rounded-2xl border border-black/[0.06] bg-white overflow-hidden"
                >
                  {/* Image placeholder (will be replaced with real images) */}
                  <div
                    className="h-48 w-full overflow-hidden bg-[#f9fafb] sm:h-60"
                    aria-hidden
                  >
                    <img
                      src={step.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-[#111827] sm:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
