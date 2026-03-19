import { AlertTriangle } from "lucide-react";

export function Problem() {
  return (
    <section className="relative z-[1] w-full bg-white">
      <div className="relative z-[1] flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:min-h-screen lg:py-32">
        <div className="w-full">
          <p className="flex items-center justify-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            <AlertTriangle className="h-4 w-4 text-[#ca3726]" />
            The Challenge We Solve
          </p>
          <h2 className="mt-6 text-[2.2rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
            AI is moving fast.
            <br />
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Most organizations are still catching up.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-5xl text-xl leading-relaxed tracking-tight text-[#222222]/80 sm:max-w-6xl sm:text-2xl">
            The result is scattered initiatives, misaligned investments, and a workforce that&apos;s either
            overwhelmed or left behind. It&apos;s not a technology problem. It&apos;s a leadership and strategy
            problem.
          </p>
          <div className="mx-auto mt-12 grid max-w-8xl gap-6 text-left sm:grid-cols-3 sm:mt-16 lg:mt-20">
            {[
              {
                title: "No Clear AI Strategy",
                body: "Tools get adopted without a coherent plan. Different teams move in different directions and leadership cannot point to a single result that justifies the investment.",
                image: "/prob1.png",
              },
              {
                title: "Organizational Misalignment",
                body: "Leadership, operations, and people all carry a different understanding of what AI means for the organization. Without alignment at the top, nothing below it moves in the right direction.",
                image: "/prob2.png",
              },
              {
                title: "Implementation Without Direction",
                body: "AI projects stall not because of the technology but because nobody owns the decisions that determine success. The initiative exists on paper but the accountability does not.",
                image: "/prob3.png",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white text-left min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]"
              >
                <div
                  className="relative h-56 w-full bg-[#f9fafb] sm:h-72 lg:h-80"
                  aria-hidden
                >
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 p-6 sm:p-7 lg:p-8">
                  <h3 className="text-base font-semibold tracking-tight text-[#222222] sm:text-lg lg:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#4b5563] sm:text-[16px] lg:text-[16px]">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
