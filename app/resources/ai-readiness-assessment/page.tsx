import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { JsonLd } from "@/app/components/JsonLd";
import { TrackedLink } from "@/app/components/TrackedLink";
import { ArrowLeft, ArrowUpRight } from "@/app/components/ArrowIcon";
import { articleSchema, breadcrumbList, absoluteUrl } from "@/lib/seo/schema";
import {
  BYLINE_APPROVED,
  BYLINE_NEUTRAL,
  BYLINE_STATS,
  CTA as CTA_COPY,
  DECISION_INTRO,
  DECISION_RECORD,
  DIMENSIONS,
  EVIDENCE_LEVELS,
  GUIDE_AUTHOR_APPROVED_BY_GRANT,
  GUIDE_DATE_PUBLISHED,
  GUIDE_DESCRIPTION,
  GUIDE_PATH,
  GUIDE_SEO_TITLE,
  GUIDE_TITLE,
  HOW_TO_USE_AFTER,
  HOW_TO_USE_BEFORE,
  NEXT_STEPS,
  OPENING,
  OPENING_LEAD,
  OPENING_LEAD_REST,
  PATTERNS,
  PATTERNS_AFTER,
  PATTERNS_INTRO,
  WHAT_IT_EXAMINES_AFTER,
  WHAT_IT_EXAMINES_INTRO,
} from "./content";

const GUIDE_URL = absoluteUrl(GUIDE_PATH);

export const metadata: Metadata = {
  // `absolute` so the root "%s | BBTx" template can't append a second suffix.
  title: { absolute: GUIDE_SEO_TITLE },
  description: GUIDE_DESCRIPTION,
  openGraph: {
    type: "article",
    title: GUIDE_SEO_TITLE,
    description: GUIDE_DESCRIPTION,
    url: GUIDE_URL,
    publishedTime: GUIDE_DATE_PUBLISHED,
  },
  alternates: {
    canonical: GUIDE_URL,
  },
};

const articleJsonLd = articleSchema({
  url: GUIDE_URL,
  headline: GUIDE_TITLE,
  description: GUIDE_DESCRIPTION,
  datePublished: GUIDE_DATE_PUBLISHED,
  // Credit Grant as the author only once he has approved the guide.
  author: GUIDE_AUTHOR_APPROVED_BY_GRANT ? "grant" : "organization",
});

const breadcrumbJsonLd = breadcrumbList([
  { name: "Resources", path: "/resources" },
  { name: "AI Readiness Assessment", path: GUIDE_PATH },
]);

const SECTIONS = [
  { id: "what-it-examines", label: "What an assessment examines" },
  { id: "how-to-use", label: "How to use the questions" },
  { id: "questions", label: "The 12 questions" },
  { id: "what-answers-reveal", label: "What the answers reveal" },
  { id: "first-decision", label: "A practical first decision" },
  { id: "next-steps", label: "What to do next" },
];

const h2 = "text-2xl font-medium leading-tight tracking-tight text-[#222222] sm:text-3xl";
const body = "text-base leading-relaxed text-[#555555] sm:text-lg";
const inlineLink =
  "font-medium text-[#222222] underline decoration-[#ca3726]/50 underline-offset-4 transition-colors hover:decoration-[#ca3726]";

function Dot() {
  return (
    <span className="mx-2 text-[#c4c4c4]" aria-hidden>
      ·
    </span>
  );
}

export default function AiReadinessAssessmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <Nav heroTheme="light" instantFloat />

      <article>
        {/* id="hero" scopes the transparent-nav window to the intro block. */}
        <header id="hero" className="px-5 pb-10 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pt-44">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#555555] transition-colors hover:text-[#111111]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Resources
            </Link>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#555555]/60 sm:text-sm">
              Guide for leadership teams
            </p>
            <h1 className="mt-3 text-3xl font-medium leading-[1.12] tracking-tight text-[#222222] sm:text-4xl lg:text-[2.75rem]">
              {GUIDE_TITLE}
            </h1>

            <p className="mt-5 text-sm text-[#6b7280]">
              {GUIDE_AUTHOR_APPROVED_BY_GRANT ? (
                <>
                  By{" "}
                  <Link href="/team/grant" className={inlineLink}>
                    {BYLINE_APPROVED.name}
                  </Link>
                  <Dot />
                  {BYLINE_APPROVED.role}
                </>
              ) : (
                <>{BYLINE_NEUTRAL}</>
              )}
              <Dot />
              {BYLINE_STATS}
            </p>

            <div className="mt-8 space-y-5">
              {OPENING.map((paragraph) => (
                <p key={paragraph} className={body}>
                  {paragraph}
                </p>
              ))}
              <p className={body}>
                <strong className="font-semibold text-[#222222]">{OPENING_LEAD}</strong>{" "}
                {OPENING_LEAD_REST}
              </p>
            </div>
          </div>
        </header>

        <div className="px-5 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-3xl">
            <nav
              aria-label="On this page"
              className="rounded-lg border border-black/[0.06] bg-[#f7f7f7] p-5"
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
                On this page
              </p>
              <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                {SECTIONS.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-[#555555] underline-offset-4 transition-colors hover:text-[#222222] hover:underline"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* What an assessment examines */}
            <section id="what-it-examines" className="mt-14 scroll-mt-28">
              <h2 className={h2}>What an AI readiness assessment actually examines</h2>
              <p className={`${body} mt-5`}>{WHAT_IT_EXAMINES_INTRO}</p>
              <ul className="mt-6 divide-y divide-black/[0.08] border-y border-black/[0.08]">
                {DIMENSIONS.map((dimension) => (
                  <li key={dimension.id} className="py-4">
                    <p className="text-base font-semibold text-[#222222] sm:text-lg">
                      {dimension.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#555555] sm:text-[15px]">
                      {dimension.summary}
                    </p>
                  </li>
                ))}
              </ul>
              {WHAT_IT_EXAMINES_AFTER.map((paragraph) => (
                <p key={paragraph} className={`${body} mt-6`}>
                  {paragraph}
                </p>
              ))}
            </section>

            {/* How to use the questions */}
            <section id="how-to-use" className="mt-14 scroll-mt-28">
              <h2 className={h2}>How to use the questions</h2>
              {HOW_TO_USE_BEFORE.map((paragraph) => (
                <p key={paragraph} className={`${body} mt-5`}>
                  {paragraph}
                </p>
              ))}
              <dl className="mt-5 grid gap-px overflow-hidden rounded-lg border border-black/[0.08] bg-black/[0.08] sm:grid-cols-3">
                {EVIDENCE_LEVELS.map((level) => (
                  <div key={level.label} className="bg-white p-5">
                    <dt className="text-base font-semibold text-[#222222]">{level.label}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-[#555555]">
                      {level.description}
                    </dd>
                  </div>
                ))}
              </dl>
              {HOW_TO_USE_AFTER.map((paragraph) => (
                <p key={paragraph} className={`${body} mt-6`}>
                  {paragraph}
                </p>
              ))}
            </section>

            {/* The 12 questions */}
            <section id="questions" className="mt-14 scroll-mt-28">
              <h2 className={h2}>The 12 questions</h2>

              <div className="mt-8 space-y-12">
                {DIMENSIONS.map((dimension) => (
                  <section key={dimension.id} aria-labelledby={`dimension-${dimension.id}`}>
                    <h3
                      id={`dimension-${dimension.id}`}
                      className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#ca3726]"
                    >
                      {dimension.name}
                    </h3>
                    <ol className="mt-4 divide-y divide-black/[0.08] border-y border-black/[0.08]">
                      {dimension.questions.map((q) => (
                        <li
                          key={q.number}
                          className="grid gap-3 py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-5"
                        >
                          <span
                            className="text-[2.25rem] font-bold leading-none tracking-tight text-[#222222]/15 sm:text-[2.75rem]"
                            aria-hidden
                          >
                            {String(q.number).padStart(2, "0")}
                          </span>
                          <div>
                            <h4 className="text-lg font-semibold leading-snug tracking-normal text-[#222222] sm:text-xl">
                              <span className="sr-only">Question {q.number}: </span>
                              {q.question}
                            </h4>
                            <p className="mt-3 text-[15px] leading-relaxed text-[#555555] sm:text-base">
                              {q.body}
                            </p>
                            <p className="mt-2 text-[15px] leading-relaxed text-[#555555] sm:text-base">
                              <em className="font-semibold text-[#222222]">Evidence looks like:</em>{" "}
                              {q.evidence}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                ))}
              </div>
            </section>

            {/* What the answers reveal */}
            <section id="what-answers-reveal" className="mt-14 scroll-mt-28">
              <h2 className={h2}>What the answers reveal</h2>
              <p className={`${body} mt-5`}>{PATTERNS_INTRO}</p>
              <ul className="mt-6 divide-y divide-black/[0.08] border-y border-black/[0.08]">
                {PATTERNS.map((pattern) => (
                  <li key={pattern.name} className="py-5">
                    <p className="text-base font-semibold text-[#222222] sm:text-lg">
                      {pattern.name}
                    </p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[#555555] sm:text-base">
                      {pattern.meaning}
                    </p>
                  </li>
                ))}
              </ul>
              <p className={`${body} mt-6`}>{PATTERNS_AFTER}</p>
            </section>

            {/* A practical first decision */}
            <section id="first-decision" className="mt-14 scroll-mt-28">
              <h2 className={h2}>A practical first decision</h2>
              {DECISION_INTRO.map((paragraph) => (
                <p key={paragraph} className={`${body} mt-5`}>
                  {paragraph}
                </p>
              ))}
              <dl className="mt-6 divide-y divide-black/[0.08] border-y border-black/[0.08]">
                {DECISION_RECORD.map((row) => (
                  <div key={row.field} className="grid gap-1.5 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                    <dt className="text-base font-semibold text-[#222222]">{row.field}</dt>
                    <dd className="text-[15px] leading-relaxed text-[#555555] sm:text-base">
                      {row.prompt}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* What should leaders do next */}
            <section id="next-steps" className="mt-14 scroll-mt-28">
              <h2 className={h2}>What should leaders do next?</h2>
              <p className={`${body} mt-5`}>{NEXT_STEPS.first}</p>
              <p className={`${body} mt-5`}>
                {NEXT_STEPS.secondBeforeAssessment}{" "}
                <TrackedLink
                  href="/services/organizational-assessment"
                  eventName="readiness_guide_assessment_click"
                  eventParams={{
                    source_page: GUIDE_PATH,
                    destination: "/services/organizational-assessment",
                    placement: "body_text",
                  }}
                  className={inlineLink}
                >
                  {NEXT_STEPS.assessmentLinkText}
                </TrackedLink>
                {NEXT_STEPS.secondBetweenLinks}{" "}
                <Link href="/services/ai-integration" className={inlineLink}>
                  {NEXT_STEPS.integrationLinkText}
                </Link>{" "}
                {NEXT_STEPS.secondAfterIntegration}
              </p>
              <p className={`${body} mt-5`}>{NEXT_STEPS.third}</p>

              <div className="mt-8 rounded-xl border border-black/[0.08] bg-[#f7f7f7] p-6 sm:p-8">
                <p className="text-lg font-semibold tracking-normal text-[#222222] sm:text-xl">
                  {CTA_COPY.heading}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
                  <TrackedLink
                    href="/services/organizational-assessment"
                    eventName="readiness_guide_assessment_click"
                    eventParams={{
                      source_page: GUIDE_PATH,
                      destination: "/services/organizational-assessment",
                      placement: "cta_button",
                    }}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
                  >
                    {CTA_COPY.assessmentLinkText}
                    <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  </TrackedLink>
                  <span className="text-[15px] text-[#555555]">{CTA_COPY.connector}</span>
                  <span className="text-[15px] text-[#555555]">
                    <a
                      href={CTA_COPY.conversationHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={inlineLink}
                    >
                      {CTA_COPY.conversationLinkText}
                    </a>
                    .
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
