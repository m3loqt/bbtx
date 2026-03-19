"use client";

import { useRef } from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Before the AI Integration Program, I had no idea what AI was. The training broke down what AI can do and how to use it in my workflow. Now, tasks that used to take 30 minutes take just 5, and my productivity has increased by about 50%. This program was powerful and extremely beneficial.",
    author: "Jamie Wilson",
    role: "Marketing Manager",
    image: "/jamie.png",
  },
  {
    quote:
      "The hands-on learning, expert insights, and practical tools gave me the confidence to start integrating AI into my coaching practice. What impressed me most was the emphasis on ethical, responsible implementation. Whether you're a professional or consultant, this program equips you to lead in the AI era.",
    author: "Terry Barnhart",
    role: "Executive Coach",
    image: "/terry.jpeg",
  },
  {
    quote:
      "I had the privilege of attending Grant Tate's AI Integration Workshop. The material was organized and easy to follow, and learning alongside professionals from diverse backgrounds showed me countless ways to use AI in the workplace. I use AI daily now, both professionally and personally. I strongly recommend these classes.",
    author: "Nancy Soans",
    role: "Executive Administrator",
    image: "/nancy.jpeg",
  },
  {
    quote:
      "Since the class, I've redone all my staff's job requirements and accountabilities, developed marketing plans, and streamlined team reviews. I'm excited to keep learning and using AI to benefit my organization and community.",
    author: "Todd Johnson",
    role: "President & CEO",
    image: "/todd.jpg",
  },
  {
    quote:
      "I've used AI before, but the sessions opened my eyes to using it for business planning and analysis. There are so many ways I can incorporate AI that I hadn't considered before.",
    author: "Laura Beltran",
    role: "Education Director",
    image: "/laura.png",
  },
  {
    quote:
      "Before Chaotic Confluence, I only knew AI from a technical side. This community helped me understand how leadership and business work, and showed me how AI can make a real difference for people, not just in code. It's helped me grow a lot.",
    author: "Mel Angelo Cortes",
    role: "IT Specialist",
    image: "/mel.png",
  },
];

export function Testimonials() {
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);

  const scrollTestimonials = (dir: "left" | "right") => {
    const el = testimonialsScrollRef.current;
    if (!el) return;

    const amount = Math.min(el.clientWidth * 0.9, el.scrollWidth - el.scrollLeft);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="relative z-[1] w-full bg-[#f7f7f7]">
      <div className="px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        {/* Header row */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-end md:gap-16">
          <h2 className="max-w-3xl text-3xl font-medium leading-[1.05] tracking-tighter text-[#222222] sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[4.25rem]">
            Straight from our graduates and members.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed tracking-tight text-[#555555] sm:text-2xl md:pb-1">
            From certified graduates to active members, here is what the Chaotic Confluence community has to say about what it is like to learn, think, and grow inside it.
          </p>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20">
          <div className="mb-3 flex flex-row flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
              <Star className="h-4 w-4 text-[#ca3726]" />
              WHAT OUR COMMUNITY SAYS
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTestimonials("left")}
                className="flex h-10 w-10 items-center justify-center rounded border border-[#e5e7eb] bg-white text-[#374151] transition-colors hover:bg-[#f9fafb]"
                aria-label="Previous testimonial"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollTestimonials("right")}
                className="flex h-10 w-10 items-center justify-center rounded border border-[#e5e7eb] bg-white text-[#374151] transition-colors hover:bg-[#f9fafb]"
                aria-label="Next testimonial"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="-mx-4 sm:-mx-6 lg:-mx-8">
            <div
              ref={testimonialsScrollRef}
              className="flex gap-3 overflow-x-auto pb-4 pl-4 pr-8 scroll-smooth md:gap-4 sm:pl-6 sm:pr-10 lg:pl-8 lg:pr-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TESTIMONIALS.map((t, i) => (
                <article
                  key={i}
                  className="flex min-w-[85%] max-w-[520px] flex-shrink-0 flex-col justify-between rounded-2xl border border-black/[0.06] bg-white p-6 sm:min-w-[75%] sm:p-8 md:min-w-[55%] lg:min-w-[48%]"
                >
                  <div className="mb-4 mt-0 flex self-start gap-1 text-[#f59e0b]">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx}
                        className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className="mt-0 mb-4 text-lg font-semibold leading-snug text-[#111827] sm:text-xl">
                    {t.quote}
                  </p>
                  <footer className="mt-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f3f4f6]">
                      <img
                        src={t.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#111827]">{t.author}</p>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#6b7280]">
                        {t.role}
                      </p>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
