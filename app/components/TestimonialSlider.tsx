"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
};

const SPEED_NORMAL = 0.5;
const SPEED_HOVER = 0.2;

export function TestimonialSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const hoverRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  hoverRef.current = isHovered;

  const tick = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    const totalWidth = track.scrollWidth;
    const halfWidth = totalWidth / 2;
    const speed = hoverRef.current ? SPEED_HOVER : SPEED_NORMAL;
    positionRef.current -= speed;
    if (positionRef.current < -halfWidth) {
      positionRef.current += halfWidth;
    }
    track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  return (
    <div
      className="relative -mx-4 mt-12 w-[calc(100%+2rem)] overflow-hidden sm:-mx-6 lg:mt-16 lg:-mx-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={trackRef}
        className="flex gap-1 lg:gap-1.5"
        style={{ width: "max-content" }}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <article
            key={`${t.name}-${i}`}
            className="flex min-h-[360px] w-[460px] min-w-[460px] flex-shrink-0 flex-col rounded-lg border border-black/[0.06] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] sm:min-h-[400px] sm:w-[560px] sm:min-w-[560px] lg:p-8"
          >
            <div className="flex min-h-0 flex-1 flex-col">
              <blockquote className="text-2xl font-normal leading-snug tracking-tight text-[#222222] sm:text-3xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-auto flex items-end justify-between pt-6">
                <div className="flex items-center gap-4">
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
                {t.company && (
                  <p className="text-sm font-medium text-[#555555]">
                    {t.company}
                  </p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
