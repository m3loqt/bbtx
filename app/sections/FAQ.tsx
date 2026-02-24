import Image from "next/image";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const FAQ_ITEMS = [
  {
    question: "What does the Discovery workshop include?",
    answer:
      "AI readiness assessment, strategy overview, and prioritized recommendations. One-day workshop for up to 5 participants.",
  },
  {
    question: "How is the Starter plan different from Enterprise?",
    answer:
      "Starter: one initiative per quarter, 5 seats, playbooks and office hours. Enterprise: custom scope, unlimited seats, dedicated support.",
  },
  {
    question: "How long does implementation typically take?",
    answer:
      "Pilots often run 8–12 weeks; full strategy and multi-team rollout can be 3–6 months. We propose a timeline during Discovery.",
  },
  {
    question: "Do you work with our existing tools and data?",
    answer:
      "Yes. We design around your systems and workflows and help you integrate AI into your current tooling and data practices.",
  },
  {
    question: "Is there a free trial or discovery option?",
    answer:
      "Yes. Discovery is free, one workshop for up to 5 people, with an assessment and recommendations. A good way to explore fit.",
  },
  {
    question: "How does support work?",
    answer:
      "Starter includes office hours. Enterprise includes a dedicated success partner and priority support. We focus on impact.",
  },
];

function FaqItemIcon() {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/[0.12] bg-[#f0f0f0] text-[#222222]"
      aria-hidden
    >
      <HiOutlineQuestionMarkCircle className="h-5 w-5" />
    </span>
  );
}

export function FAQ() {
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
      <div className="relative z-[1] w-full px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="w-full">
          <p className="mb-6 flex items-center gap-2 text-base font-normal text-[#555555] sm:text-lg">
            <Image
              src="/node.png"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            FAQ
          </p>
          <h2 className="text-4xl font-medium leading-tight tracking-tighter text-[#222222] sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
            Frequently asked{" "}
            <span
              className="font-normal italic"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              questions
            </span>
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-[#555555] sm:text-xl">
            Quick answers to questions you may have. Can&apos;t find what you&apos;re looking for?{" "}
            <a href="#" className="font-medium text-[#222222] underline decoration-[#222222]/30 underline-offset-2 hover:decoration-[#222222]">
              Chat to our friendly team
            </a>
            .
          </p>

          {/* Two-column grid of FAQ cards (Services-style card design) */}
          <ul className="mt-12 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:mt-14 lg:gap-1.5">
            {FAQ_ITEMS.map((item, i) => (
              <li key={i}>
                <article className="flex min-h-0 flex-col rounded-lg border border-black/[0.06] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] lg:p-8">
                  <div className="flex gap-4">
                    <FaqItemIcon />
                    <h3 className="min-w-0 flex-1 text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">
                      {item.question}
                    </h3>
                  </div>
                  <div className="mt-auto flex gap-4 pt-4">
                    <span className="h-10 w-10 shrink-0 sm:h-10 sm:w-10" aria-hidden />
                    <p className="min-w-0 flex-1 text-sm leading-relaxed text-[#555555] sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {/* Still have questions? section box — spacing aligned with FAQ card grid */}
          <div className="mt-1.5 flex w-full flex-col items-start gap-4 rounded-xl border border-black/[0.08] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:mt-1.5 lg:p-5">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#222222] text-xs font-semibold text-white sm:h-11 sm:w-11"
                aria-hidden
              >
                BB
              </span>
              <div>
                <p className="font-semibold text-[#222222] text-[15px] sm:text-base">Still have questions?</p>
                <p className="mt-0.5 text-sm leading-snug text-[#555555]">
                  Can&apos;t find the answer you&apos;re looking for?{" "}
                  <a href="#" className="font-medium text-[#222222] underline decoration-[#222222]/30 underline-offset-2 hover:decoration-[#222222]">
                    Please chat to our friendly team
                  </a>
                  .
                </p>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#222222] px-3.5 py-2 text-[14px] font-medium text-white transition-opacity hover:opacity-95"
            >
              Get in touch
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
