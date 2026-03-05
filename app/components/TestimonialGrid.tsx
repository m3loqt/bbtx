export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
};

const CARDS_PER_PAGE = 3;

export function TestimonialGrid({
  testimonials,
  page,
}: {
  testimonials: Testimonial[];
  page: number;
}) {
  const start = page * CARDS_PER_PAGE;
  const visible = testimonials.slice(start, start + CARDS_PER_PAGE);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {visible.map((t) => (
        <article
          key={t.name + t.company}
          className="flex min-h-[320px] flex-col rounded-lg border border-black/[0.06] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] sm:min-h-[340px] lg:p-8"
        >
          <blockquote className="text-xl font-normal leading-snug tracking-tight text-[#222222] sm:text-2xl">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <div className="mt-auto flex items-end gap-4 pt-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#222222] text-sm font-semibold text-white sm:h-14 sm:w-14">
              {t.initials}
            </div>
            <div>
              <p className="font-semibold text-[#222222]">{t.name}</p>
              <p className="text-sm text-[#555555]">
                {t.title}
                {t.company ? ` · ${t.company}` : ""}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
