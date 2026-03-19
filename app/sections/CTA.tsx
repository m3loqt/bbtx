import { ArrowUpRight } from "@/app/components/ArrowIcon";

export function CTA() {
  return (
    <section className="relative z-[1] bg-[#f7f7f7]">
      <div className="relative z-[1] w-full px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Full-width card with gradient + visual elements */}
        <div
          className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-[#ca3726] shadow-[0_4px_24px_rgba(202,55,38,0.25)] sm:rounded-2xl"
          style={{
            backgroundImage: "url(/cta.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for text readability */}
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[#ca3726]/40"
            aria-hidden
          />
          <div className="relative z-[1] w-full px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            <h2 className="text-4xl font-medium leading-tight tracking-tighter text-white sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
              Ready to{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                integrate AI
              </span>{" "}
              with impact?
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed tracking-tight text-white/95 sm:text-2xl lg:mt-10">
              Talk to us about your goals. We&apos;ll help you assess readiness, choose the right path, and deliver measurable results.
            </p>
            <a
              href="#"
              className="mt-12 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-95 lg:mt-14"
            >
              Talk to us
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
