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
].map((file) => `/companies-nobg/${file}`);

export const METRICS = [
  { value: "100+", label: "Organizations Served" },
  { value: "20+", label: "Years in Consulting" },
  { value: "12 Weeks", label: "Average Time to Results" },
];

export function Results() {
  return (
    <section className="relative z-[1] bg-[#f7f7f7]">
      <div className="relative z-[1] px-4 pt-16 pb-0 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Header and description first */}
        <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:items-end lg:gap-12">
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

        {/* Logo carousel — full viewport width so left/right aren’t clipped by section padding */}
        <div className="relative left-1/2 z-0 mb-2 mt-4 w-screen max-w-[100vw] min-h-[150px] -translate-x-1/2 sm:-mb-44 sm:min-h-[400px] sm:mt-2 lg:-mb-52 lg:min-h-[460px] lg:mt-4">
          <div
            className="flex w-max items-center gap-4 px-4 sm:gap-4 sm:px-6 lg:gap-5 lg:px-8"
            style={{
              animation: "logo-scroll 80s linear infinite",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative flex h-36 shrink-0 items-center justify-center px-2 sm:h-72 sm:px-3 lg:h-88 lg:px-4"
              >
                <Image
                  src={src}
                  alt=""
                  width={960}
                  height={384}
                  className="h-24 w-auto max-w-[260px] object-contain opacity-80 sm:h-48 sm:max-w-[800px] lg:h-56 lg:max-w-[880px]"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
