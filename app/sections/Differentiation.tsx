import Image from "next/image";

const TYPICAL_POINTS = [
  "Focuses on tools before strategy",
  "Runs disconnected pilots with no enterprise alignment",
  "Reports on activity instead of business impact",
  "Leaves implementation to internal teams",
  "Ignores governance until problems surface",
  "Delivers recommendations, not accountability",
];

const BBTX_POINTS = [
  "Aligns AI initiatives to business strategy first",
  "Prioritizes high impact use cases with executive sponsorship",
  "Measures outcomes tied to revenue, efficiency, and risk reduction",
  "Works alongside your team through deployment and adoption",
  "Builds governance and oversight into every phase",
  "Stays accountable for measurable results",
];

function MinusIcon({ className }: { className?: string }) {
  return (
    <span
      className={`flex h-10 w-10 items-center justify-center rounded-md bg-[#222222] text-white sm:h-11 sm:w-11 ${className ?? ""}`}
      aria-hidden
    >
      <span className="block h-[2px] w-3 rounded-full bg-white" />
    </span>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <span
      className={`flex h-10 w-10 items-center justify-center rounded-md bg-[#ca3726] text-white sm:h-11 sm:w-11 ${className ?? ""}`}
      aria-hidden
    >
      <span className="relative block h-[2px] w-3 rounded-full bg-white before:absolute before:left-1/2 before:top-1/2 before:h-3 before:w-[2px] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white" />
    </span>
  );
}

export function Differentiation() {
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

      <div className="relative z-[1] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="h-full w-full rounded-xl border border-black/[0.06] bg-white px-4 py-8 shadow-[0_2px_12px_rgba(0,0,0,0.01)] sm:px-6 lg:px-8 lg:py-10">
          {/* Header block, centered */}
          <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 flex items-center justify-center gap-2 text-base font-normal text-[#555555] sm:text-lg">
            <Image
              src="/node.png"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            Compare
          </p>
          <h2 className="text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
            The Difference in{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Approach
            </span>
          </h2>
          <p className="mt-6 text-xl leading-relaxed tracking-tight text-[#222222] sm:text-2xl">
            AI doesn’t fail because of technology. It fails because of misalignment, unclear ownership,
            and lack of measurable outcomes. Here’s how our approach differs.
          </p>
          </div>

          {/* Two-column comparison grid */}
          <div className="mx-auto mt-12 w-full max-w-7xl lg:mt-16 xl:max-w-[90rem]">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Left: Typical AI Consulting */}
            <div>
              <h3 className="text-center text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">
                Typical AI Consulting
              </h3>
              <div className="mt-5 space-y-3 sm:space-y-4">
                {TYPICAL_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-4 rounded-xl border border-black/[0.06] bg-[#f0f0f0] px-4 py-4 text-base text-[#222222] shadow-[0_2px_12px_rgba(0,0,0,0.01)] sm:px-5 sm:py-5 sm:text-lg"
                  >
                    <MinusIcon />
                    <p className="leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: The BBTx AI Approach */}
            <div>
              <h3 className="text-center text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">
                The BBTx AI Approach
              </h3>
              <div className="mt-5 space-y-3 sm:space-y-4">
                {BBTX_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-4 rounded-xl border border-black/[0.06] bg-[#f0f0f0] px-4 py-4 text-base text-[#222222] shadow-[0_2px_12px_rgba(0,0,0,0.01)] sm:px-5 sm:py-5 sm:text-lg"
                  >
                    <PlusIcon />
                    <p className="leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

