export function Problem() {
  return (
    <section className="relative z-[1] w-full bg-[#222222]">
      <div className="relative z-[1] flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:min-h-screen lg:py-32">
        <div className="w-full">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/40">
            The Challenge We Solve
          </p>
          <h2 className="mt-6 text-[2.2rem] font-medium leading-[1.1] tracking-tighter text-white sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.4rem]">
            AI is moving fast.
            <br />
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Most organizations are still catching up.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-5xl text-xl leading-relaxed tracking-tight text-white/80 sm:max-w-6xl sm:text-2xl">
            The result is scattered initiatives, misaligned investments, and a workforce that&apos;s either overwhelmed or left behind. It&apos;s not a technology problem. It&apos;s a leadership and strategy problem.
          </p>
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 text-left sm:grid-cols-3 sm:mt-16 lg:mt-20">
            {[
              {
                title: "No Clear AI Strategy",
                body: "Tools get adopted without a plan. Teams move in different directions. ROI stays invisible.",
              },
              {
                title: "Organizational Misalignment",
                body: "Leadership, operations, and people aren't on the same page about what AI means for their roles and their future.",
              },
              {
                title: "Implementation Without Direction",
                body: "AI projects stall not because of the technology but because no one owns the human side of the transformation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col rounded-2xl border border-white/15 bg-white/[0.03] p-5 text-left sm:min-h-[200px] sm:p-6 lg:p-8"
              >
                <h3 className="text-base font-semibold tracking-tight text-white/90 sm:text-lg">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
