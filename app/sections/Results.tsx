import Image from "next/image";

const COMPANY_LOGOS = [
  "cha.png",
  "alz.png",
  "cvi.png",
  "shri.png",
  "rob.png",
  "inb.png",
  "flo.png",
  "ber.png",
  "con.png",
  "chg.png",
  "wes.png",
  "bra.png",
  "cho.png",
  "lum.png",
  "csp.png",
  "dou.png",
  "RIV.png",
  "bri.png",
  "bar.png",
].map((file) => `/companies/${file}`);

const METRICS = [
  { value: "100+", label: "Organizations trusted us" },
  { value: "50+", label: "Industries served" },
  { value: "200%", label: "Average measurable impact" },
  { value: "12 weeks", label: "Avg. time to value" },
];

export function Results() {
  return (
    <section className="relative z-[1] bg-white">
      <div className="relative z-[1] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Logo carousel first */}
        <div className="relative -mt-20 -mb-40 w-full min-h-[320px] overflow-hidden sm:-mt-24 sm:-mb-44 sm:min-h-[400px] lg:-mt-28 lg:-mb-52 lg:min-h-[460px]">
          <div
            className="pointer-events-none absolute left-0 top-1/2 z-10 h-[45%] w-24 -translate-y-1/2 shrink-0 sm:w-32 lg:w-40"
            style={{
              background: "linear-gradient(to right, #ffffff 0%, transparent 100%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 top-1/2 z-10 h-[45%] w-24 -translate-y-1/2 shrink-0 sm:w-32 lg:w-40"
            style={{
              background: "linear-gradient(to left, #ffffff 0%, transparent 100%)",
            }}
            aria-hidden
          />
          <div
            className="flex items-center gap-6 sm:gap-8 lg:gap-10"
            style={{ animation: "logo-scroll 40s linear infinite" }}
          >
            {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative flex h-56 shrink-0 items-center justify-center px-3 sm:h-72 sm:px-4 lg:h-88 lg:px-5"
              >
                <Image
                  src={src}
                  alt=""
                  width={960}
                  height={384}
                  className="h-40 w-auto max-w-[700px] object-contain opacity-80 sm:h-48 sm:max-w-[800px] lg:h-56 lg:max-w-[880px]"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Header and description below carousel */}
        <div className="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-[3fr_2fr] lg:items-end lg:gap-12">
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
        <div className="mt-14 grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-1.5">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex min-h-0 flex-col rounded-lg border border-black/[0.06] bg-[#fafafa] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] lg:p-8"
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
