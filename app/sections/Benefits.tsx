import Image from "next/image";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const BENEFIT_CARDS = [
  {
    id: "01",
    title: "Clear roadmap",
    description:
      "A phased plan with clear priorities and success metrics so you always know what’s next.",
  },
  {
    id: "02",
    title: "Hands-on implementation",
    description:
      "We work alongside your team from pilot to scale so execution actually sticks.",
  },
  {
    id: "03",
    title: "Measurable impact",
    description:
      "We set up reporting that ties AI performance to business outcomes you can track.",
  },
  {
    id: "04",
    title: "Dedicated partnership",
    description:
      "We stay aligned with your goals from discovery through scale so you’re never left on your own.",
  },
];

export function Benefits() {
  return (
    <section className="relative z-[1] border-b border-black/[0.06] bg-[#f7f7f7]">
      {/* Same grid overlay as other sections */}
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
      <div className="relative z-[1] flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto w-full text-center">
          <h2 className="text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
          What you get with {" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              BBTx
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed tracking-tight text-[#222222] sm:text-2xl">
          We help leaders make confident AI decisions in complex environments.
          </p>

          {/* Cards grid: centered, full width within max-w */}
          <div className="mx-auto mt-10 grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-1.5">
            {BENEFIT_CARDS.map((card) => (
              <article
                key={card.id}
                className="flex min-h-[528px] flex-col overflow-hidden rounded-lg border border-black/[0.06] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.01)] sm:min-h-[600px]"
              >
                {/* Image: each card has its own image */}
                <div className="relative min-h-0 flex-1 w-full overflow-hidden bg-[#f0f0f0]">
                  {card.id === "01" && (
                    <Image
                      src="/clearr.png"
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  )}
                  {card.id === "02" && (
                    <Image
                      src="/card2.png"
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  )}
                  {card.id === "03" && (
                    <Image
                      src="/card3.png"
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  )}
                  {card.id === "04" && (
                    <Image
                      src="/card4.png"
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  )}
                </div>
                <div className="flex shrink-0 flex-col p-6 lg:p-8">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-[#555555]">
                      #{card.id}
                    </p>
                    <a
                      href="#"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-black/[0.08] text-[#222222] transition-colors hover:bg-black/[0.04]"
                      aria-label="View"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                  <h3 className="mt-2 text-left text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-left text-sm leading-relaxed text-[#555555] sm:text-base">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
