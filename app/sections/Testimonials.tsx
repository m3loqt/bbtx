"use client";

import Image from "next/image";

export type Testimonial = {
  /** Short pull-quote pulled verbatim/near-verbatim from `quote`, shown above it as a mini headline */
  headline: string;
  quote: string;
  author: string;
  role: string;
  /** Omit when no portrait asset; initials shown instead */
  image?: string;
};

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

export const TESTIMONIALS: Testimonial[] = [
  {
    headline: "An exceptional coach and thought partner",
    quote:
      "Grant has a rare ability to help leaders see the underlying dynamics shaping their organizations and decisions. Our conversations consistently helped me think more clearly about strategy, leadership, and how emerging technologies like AI will reshape the way we work. He is an exceptional coach and thought partner.",
    author: "Jamie Conklin",
    role: "Senior Director, General Atomics Intelligence",
    image: "/testimonials/Jamie.jpeg",
  },
  {
    headline: "Shaped the most important decisions of my life",
    quote:
      "I have worked with Grant since 2017, and his guidance has shaped many of the most important decisions of my life. His gift is helping people step back, see the bigger picture, and lead themselves through change.",
    author: "Golara Haghtalab",
    role: "Accenture",
    image: "/testimonials/golara.jpeg",
  },
  {
    headline: "Incredible knowledge and the ability to share it",
    quote:
      "I have been working with Grant for over a year learning his approach to artificial intelligence education. He is a quiet, gentle professional with incredible knowledge and the ability to share it.",
    author: "Terry Barnhart",
    role: "Executive Coach, San Antonio Executive Coaching",
    image: "/terry.jpeg",
  },
  {
    headline: "I am better at what I do because of Grant",
    quote:
      "He brings his tremendous management, leadership, and coaching expertise to bear in ways that are very empowering and invigorating. Grant consistently impresses me with his focus on delivering value to his clients. I am better at what I do because of Grant.",
    author: "Heather Higgins",
    role: "2x Founding Chief of Staff",
    image: "/testimonials/heather.jpeg",
  },
  {
    headline: "A pivotal role in developing executive leadership",
    quote:
      "Grant Tate has played a pivotal role in developing executive leadership skills at Indoor Biotechnologies. His work with senior scientists has been analytical, goal oriented, and has substantially developed these individuals as leaders.",
    author: "Martin Chapman",
    role: "President and CEO, InBio",
    image: "/testimonials/martin.jpeg",
  },
  {
    headline: "One of the best investments I have made",
    quote:
      "In 2007 I hired Grant Tate to help me gain a competitive edge. What I received went beyond my expectations. Grant's program for building leadership skills and strategic planning positioned my firm to weather the economic storm that hit us in 2009. Hiring Grant is one of the best investments I have made.",
    author: "Chris Kean",
    role: "President, Lincoln Surveying",
    image: "/testimonials/chris.jpeg",
  },
];

const MASONRY_COLUMN_COUNT = 3;

// Extra stagger (px) added on top of WALL_FADE_PX for each real column — the
// middle column sits lowest and the outer columns rise toward it, mirroring
// the reference wall. Combined with each column's natural height (driven by
// its cards' varying quote lengths), this is what makes the wall read as an
// irregular, hand-built stack rather than a uniform grid.
const MASONRY_COLUMN_STAGGER_PX = [0, 96, 40];

// Round-robin item -> column assignment (0, 1, 2, 0, 1, 2, ...) keeps cards
// in roughly left-to-right, top-to-bottom reading order while leaving each
// column's total content length up to chance.
function buildMasonryColumns(items: Testimonial[], columnCount: number): Testimonial[][] {
  const columns: Testimonial[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((t, i) => columns[i % columnCount]!.push(t));
  return columns;
}

// Ghost filler cards run the full height of their column, unstaggered, so the
// wall appears to continue past the left/right edges (clipped by the
// overflow-hidden bleed wrapper below). Heights are varied so the filler
// column doesn't read as a mechanically repeated block. Sized to reach at
// least as far down as a real column (stagger + two cards + two fade caps),
// so the side and bottom fades end at roughly the same point instead of the
// sides running out early.
const GHOST_CARD_HEIGHTS_PX = [240, 280, 220, 260];

// Fades a column to transparent over its own first/last 180px — applied
// per-column (not to the shared container) so the fade always sits at that
// column's own top/bottom regardless of its stagger offset.
const WALL_FADE_PX = 180;
const COLUMN_FADE_STYLE: React.CSSProperties = {
  maskImage: `linear-gradient(to bottom, transparent, black ${WALL_FADE_PX}px, black calc(100% - ${WALL_FADE_PX}px), transparent)`,
  WebkitMaskImage: `linear-gradient(to bottom, transparent, black ${WALL_FADE_PX}px, black calc(100% - ${WALL_FADE_PX}px), transparent)`,
};

function GhostColumn() {
  return (
    <div className="flex flex-col gap-4 xl:gap-5" style={COLUMN_FADE_STYLE} aria-hidden>
      {GHOST_CARD_HEIGHTS_PX.map((height, i) => (
        <div key={i} className="rounded-2xl border border-black/[0.05] bg-white/50" style={{ height }} />
      ))}
    </div>
  );
}

// Caps a real column's top/bottom with a ghost card exactly WALL_FADE_PX
// tall, so the column's own fade mask has real card pixels to dissolve —
// same treatment as the side ghost columns — instead of fading blank space.
function GhostCapCard() {
  return (
    <div
      className="flex-shrink-0 rounded-2xl border border-black/[0.05] bg-white/50"
      style={{ height: WALL_FADE_PX }}
      aria-hidden
    />
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="rounded-2xl border border-black/[0.06] bg-white p-6 lg:p-8">
      <h3 className="text-lg font-semibold leading-snug text-[#111827] sm:text-xl">{t.headline}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-[#4b5563]">{t.quote}</p>
      <footer className="mt-6 flex items-center gap-3">
        <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f3f4f6]">
          {t.image ? (
            <Image src={t.image} alt="" fill sizes="44px" className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm font-semibold tracking-normal text-[#6b7280]" aria-hidden>
              {initialsFromName(t.author)}
            </span>
          )}
        </div>
        <div>
          <p className="font-semibold text-[#111827]">{t.author}</p>
          {t.role ? <p className="text-xs font-medium uppercase tracking-wider text-[#6b7280]">{t.role}</p> : null}
        </div>
      </footer>
    </article>
  );
}

export function Testimonials() {
  const masonryColumns = buildMasonryColumns(TESTIMONIALS, MASONRY_COLUMN_COUNT);

  return (
    <section className="relative z-[1] w-full border-t border-black/[0.06] bg-[#f7f7f7]">
      <div className="relative px-4 pt-12 pb-12 sm:px-6 sm:pt-24 sm:pb-24 lg:px-8 lg:pt-40 lg:pb-20">
        {/* Header row. At lg+ this lifts out of flow and lays over the top of
            the wall below (its fade-capped top, specifically) — matching the
            reference where the intro sits directly on the faded card wall
            instead of in its own separate block above it. lg:top-24 (rather
            than sitting flush against the container edge) gives it real
            breathing room, since an absolutely positioned element ignores
            its containing block's own padding-top. */}
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:gap-6 lg:absolute lg:inset-x-0 lg:top-24 lg:z-10">
          <h2 className="text-3xl font-medium leading-[1.05] tracking-tight text-[#222222] sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[4.25rem]">
            What <span className="italic">leaders say</span> after working with us
          </h2>
          <p className="max-w-3xl text-base leading-relaxed tracking-normal text-[#555555] sm:text-2xl">
            Results from real engagements with leaders who trusted BBTx to help them think clearly, decide well, and lead their organizations through change
          </p>
        </div>

        {/* lg:mt-8 (rather than 0) leaves a bit of clear space between the
            description above and the wall's top fade, instead of the wall
            starting flush at the container's very top. */}
        <div className="mt-12 md:mt-16 lg:mt-8">
          {/* Hidden at lg+: once the header overlays the wall's top there's no
              clean spot left for a separate eyebrow label. */}
          <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#6b7280] lg:hidden">
            CLIENT RESULTS
          </p>

          {/* Below lg: plain responsive stack, no masonry — the staggered
              columns only make sense with room to breathe. 2-up starts at
              md (not sm) so phones in landscape don't get squeezed into
              narrow ~280px columns — full-width cards read better there. */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:hidden">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.author} t={t} />
            ))}
          </div>

          {/* lg+: staggered masonry columns framed by ghost filler columns.
              The -mx-4/-mx-6/-mx-8 exactly cancels this section's own side
              padding, so overflow-hidden's boundary is the section's true
              edge instead of the (narrower) padded content column — ghost
              columns now bleed all the way out instead of being clipped
              early. The inner div re-adds that same padding so the grid
              below sizes against an identical basis to before. Column
              tracks aren't equal width: the ghost tracks (0.85fr) are
              narrower than the real ones (1.15fr) so real testimonial
              cards run wider. Each column fades its own top/bottom (via a
              ghost cap card + COLUMN_FADE_STYLE), so the wall fades on all
              four sides at once. Real columns carry no fixed row heights,
              so their own content length is what breaks the grid
              symmetry. */}
          <div className="relative -mx-4 hidden overflow-hidden sm:-mx-6 lg:-mx-8 lg:block">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="relative left-1/2 grid w-[125%] -translate-x-1/2 grid-cols-[0.85fr_1.15fr_1.15fr_1.15fr_0.85fr] items-start gap-4 xl:gap-5">
                <GhostColumn />
                {masonryColumns.map((column, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-4 xl:gap-5"
                    style={{ marginTop: MASONRY_COLUMN_STAGGER_PX[i] ?? 0, ...COLUMN_FADE_STYLE }}
                  >
                    <GhostCapCard />
                    {column.map((t) => (
                      <TestimonialCard key={t.author} t={t} />
                    ))}
                    <GhostCapCard />
                  </div>
                ))}
                <GhostColumn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
