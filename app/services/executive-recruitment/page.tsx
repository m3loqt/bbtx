"use client";

import Image from "next/image";
import { Radar, Compass, Brain, Award } from "lucide-react";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const DIMENSIONS = [
  {
    icon: Radar,
    name: "DISC",
    description:
      "Identifies behavioral and communication tendencies, including how a candidate approaches problems, influences others, and adapts to different situations.",
  },
  {
    icon: Compass,
    name: "Driving Forces",
    description:
      "Identifies the motivations and values that influence a candidate's decisions, priorities, engagement, and sense of purpose.",
  },
  {
    icon: Brain,
    name: "ACI",
    description:
      "Examines how a candidate thinks, evaluates information, solves problems, and approaches decisions in different situations.",
  },
  {
    icon: Award,
    name: "Competencies",
    description:
      "Examines the professional and leadership capabilities that contribute to executive performance, including strategic thinking, decision-making, and accountability.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    name: "Search Committee Briefing and Position Alignment",
    description:
      "We begin with an online meeting involving members of the search committee and, when appropriate, the organization assisting with the recruitment. We review the job description and principal responsibilities, discuss the organization's culture and strategic direction, identify the leadership capabilities required for success, and establish clear criteria for evaluating the finalists. This discussion produces an executive success profile that becomes the foundation for everything that follows.",
  },
  {
    number: "02",
    name: "Candidate Assessment Package",
    description:
      "Each finalist receives a confidential link to complete the integrated assessment package online. BBTx Consulting administers the process, monitors completion, and reviews the results before interviewing the candidate, using them to identify questions and areas that should be explored more deeply.",
  },
  {
    number: "03",
    name: "Structured Candidate Interviews",
    description:
      "A BBTx Consulting advisor conducts a structured online interview with each finalist, exploring the relationship between assessment results, professional experience, leadership approach, and the requirements of the position. Each candidate is evaluated using a common interview framework, creating consistency across interviews while still allowing the advisor to explore findings specific to each finalist.",
  },
  {
    number: "04",
    name: "Comparative Analysis",
    description:
      "We compare each finalist against the job description, the executive success profile developed with the search committee, the organization's culture and challenges, the assessment results, and the interview evidence. This analysis focuses on the requirements of the position, not on producing a generic ranking of candidates.",
  },
  {
    number: "05",
    name: "Written Candidate Comparison",
    description:
      "The search team receives a written report presenting the significant findings for each finalist: leadership and interpersonal strengths, alignment with the position's requirements, potential concerns, questions for final interviews or reference checks, and a comparative summary of the finalists. The report presents evidence and professional interpretation, not clinical diagnoses or guarantees of future performance.",
  },
  {
    number: "06",
    name: "Search Committee Debriefing",
    description:
      "BBTx Consulting conducts an online debriefing with the search committee, explaining the principal findings, comparing finalists against the agreed-upon success criteria, and recommending questions for reference checks or final interviews. The debriefing helps committee members interpret the findings accurately and incorporate them into the broader selection process.",
  },
];

// What the client leaves with, distinct from the process section above it
// (which already covers what BBTx does). Sourced directly from the former
// RECEIVES/BENEFITS lists, condensed to avoid repeating the process steps.
const OUTCOMES = [
  {
    number: "01",
    title: "Clearer finalist comparison",
    description:
      "See how each finalist measures against the executive success profile, the position's requirements, assessment findings, and evidence from the structured interview. This gives the search committee a clearer basis for comparing candidates on what actually matters for the role.",
  },
  {
    number: "02",
    title: "Better final interviews",
    description:
      "Go into the final interview with focused questions and specific areas worth exploring. The assessment and interview findings help the committee spend its time where it can learn the most about each finalist.",
  },
  {
    number: "03",
    title: "Fewer surprises",
    description:
      "Surface potential concerns, gaps, and areas of misalignment before the hiring decision. Looking across multiple sources of evidence can reveal issues that may not be obvious from a résumé, conventional interview, or single assessment.",
  },
  {
    number: "04",
    title: "A stronger start",
    description:
      "Use the findings to identify onboarding and development priorities for the executive you select. The goal is not only to make a better hiring decision, but to give the new leader a clearer starting point for the work ahead.",
  },
];

const ENGAGEMENT_INCLUDES = [
  "Search committee briefing",
  "Executive success profile",
  "Assessment package",
  "Structured interviews",
  "Comparative analysis",
  "Written report",
  "Search committee debriefing",
];

const APPROPRIATE_USES = [
  "Chief executive officers",
  "Executive directors",
  "Presidents and general managers",
  "Department and agency directors",
  "Senior government administrators",
  "Nonprofit executives",
  "Association executives",
  "Senior functional leaders",
  "Executives leading organizational transformation",
];

function openContact(inquiry: string) {
  window.dispatchEvent(new CustomEvent("openContact", { detail: { inquiry } }));
}

export default function ExecutiveRecruitmentPage() {
  const INQUIRY = "Executive Recruitment Assessment Services";

  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="relative z-[1] px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-10">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#555555]/60 sm:text-sm">
            Executive Recruitment Assessment Services
          </p>

          <h1 className="text-[2.5rem] font-medium leading-[1.06] tracking-tight text-[#222222] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[5.6rem]">
            Make better <span className="italic">executive hiring decisions</span>
          </h1>

          <p className="mt-5 max-w-5xl text-base leading-relaxed tracking-normal text-[#555555] sm:mt-6 sm:text-xl">
            Résumés, references, and conventional interviews rarely reveal how a candidate will lead,
            decide, communicate, and perform under pressure. We help search committees see that
            before they hire.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => openContact(INQUIRY)}
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
            >
              Start a Conversation
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-black/[0.1] px-5 py-3 text-[15px] font-medium text-[#555555] transition-colors hover:border-black/[0.2] hover:text-[#222222]"
            >
              See How the Process Works
              <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </a>
          </div>
        </div>
        <div className="relative z-[1] px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pb-10">
          <div className="relative h-[50vh] w-full overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_2px_18px_rgba(0,0,0,0.04)] sm:h-[60vh]">
            <Image src="/serv6.png" alt="" fill sizes="100vw" className="object-cover object-top" />
          </div>
        </div>
      </section>

      {/* 2. More Than a Personality Assessment */}
      <section className="relative z-[1] w-full bg-white">
        <div className="relative z-[1] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="lg:max-w-4xl">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
                More Than a Personality Assessment
              </p>
              <h2 className="mt-6 text-[2rem] font-medium leading-[1.08] tracking-tight text-[#222222] sm:text-[3rem] lg:text-[3.5rem]">
                No single assessment can adequately evaluate an executive candidate
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-[#555555] sm:text-xl lg:max-w-[720px] lg:pt-10">
              BBTx uses an integrated bank of assessments to build a fuller picture of each executive
              candidate. We interpret the results alongside interviews, experience, role requirements,
              and organizational context rather than relying on a single score.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 lg:mt-14 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-black/[0.08]">
            {DIMENSIONS.map((dim) => (
              <div key={dim.name} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <dim.icon className="h-5 w-5 text-[#ca3726]" strokeWidth={1.75} aria-hidden />
                <p className="mt-4 text-xl font-medium leading-snug tracking-normal text-[#222222] sm:text-2xl">
                  {dim.name}
                </p>
                <p className="mt-3 text-base leading-relaxed text-[#555555] sm:text-lg">
                  {dim.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Appropriate Uses */}
      <section className="relative z-[1] w-full bg-[#f7f7f7] px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Appropriate Uses
          </p>

          <div>
            <h2 className="max-w-4xl text-3xl font-medium leading-tight tracking-tight text-[#222222] sm:text-4xl lg:text-[2.8rem]">
              Executive Recruitment Assessment Services can support searches for{" "}
              <span className="italic">leadership positions across sectors</span>
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#555555] sm:text-lg">
              Any position in which leadership judgment, communication, motivation, and organizational
              fit are critical. The service can be provided directly to an employer or in partnership
              with an executive search firm, recruiting firm, consulting organization, or human
              resources advisor.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {APPROPRIATE_USES.map((use) => (
                <span
                  key={use}
                  className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm text-[#333333]"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process */}
      <section id="how-it-works" className="relative z-[1] w-full bg-white">
        <div className="px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-[3fr_7fr] lg:items-start lg:gap-12">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              Our Assessment Process
            </p>

            <div className="pr-0 lg:pr-[10%]">
              <h2 className="max-w-4xl text-3xl font-medium leading-tight tracking-tight text-[#222222] sm:text-4xl lg:text-[2.8rem]">
                A disciplined, independent evaluation of every finalist,{" "}
                <span className="italic">from the first briefing to the final debrief</span>
              </h2>

              <div className="mt-10 flex flex-col gap-1 lg:mt-14 lg:gap-1.5">
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="rounded-2xl border border-black/[0.06] bg-[#f7f7f7] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:p-9 lg:p-10"
                  >
                    <span className="text-[3rem] font-bold leading-none tracking-tight text-[#222222]/10 sm:text-[4.5rem]">
                      {step.number}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold tracking-normal text-[#222222] sm:text-2xl">
                      {step.name}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#555555] sm:text-lg">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What You Leave With */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              What You Leave With
            </p>
            <h2 className="mt-5 text-[2rem] font-medium leading-[1.08] tracking-tight text-[#222222] sm:text-[3rem] lg:text-[3.5rem]">
              More clarity. Fewer blind spots.
              <br />
              A stronger hiring decision.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 lg:mt-14 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-black/[0.08]">
            {OUTCOMES.map((outcome) => (
              <div key={outcome.number} className="lg:px-8 lg:py-8 lg:first:pl-0 lg:last:pr-0">
                <p className="text-sm font-semibold text-[#ca3726]">{outcome.number}</p>
                <h3 className="mt-3 text-xl font-medium leading-snug tracking-normal text-[#222222] sm:text-2xl">
                  {outcome.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[#555555] sm:text-lg">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-black/[0.06] bg-white p-4 sm:mt-14 sm:p-5">
            <p className="text-lg leading-relaxed text-[#555555] sm:text-xl">
              <span className="font-medium text-[#555555]">The full engagement includes: </span>
              {ENGAGEMENT_INCLUDES.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* 6. An Advisory Tool */}
      <section className="relative z-[1] w-full border-t border-black/[0.06] bg-white px-4 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            An Advisory Tool — Not a Substitute for Judgment
          </p>

          <div className="mt-6 border-l-2 border-[#ca3726] pl-6 sm:pl-8">
            <h2 className="text-[2rem] font-medium leading-[1.08] tracking-tight text-[#222222] sm:text-[3rem] lg:text-[3.5rem]">
              The client retains responsibility for the final hiring decision
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#555555] sm:text-xl">
              The assessment process is intended to supplement the organization&apos;s interviews, reference
              checks, background checks, verification of qualifications, and professional judgment. BBTx
              Consulting does not use assessment results as the sole basis for an employment
              recommendation. Our role is to help the search committee ask better questions, recognize
              meaningful differences among candidates, and make a more fully informed decision.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="relative z-[1] bg-[#f7f7f7]">
        <div className="relative z-[1] w-full px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="relative w-full overflow-hidden rounded-xl border border-white/20 bg-[#ca3726] shadow-[0_4px_24px_rgba(202,55,38,0.25)] sm:rounded-2xl">
            <Image src="/cta.png" alt="" fill sizes="100vw" className="object-cover" aria-hidden />
            <div className="pointer-events-none absolute inset-0 z-0 bg-[#ca3726]/40" aria-hidden />

            <div className="relative z-[1] w-full px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24">
              <h2 className="text-4xl font-medium leading-tight tracking-tight text-white sm:text-[2.75rem] md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-[4rem]">
                Strengthen your{" "}
                <span className="italic">next executive search</span>
              </h2>

              <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed tracking-normal text-white/95 sm:text-2xl lg:mt-10">
                An executive&apos;s leadership approach can affect strategy, culture, employee engagement,
                stakeholder relationships, and organizational performance for years. For pricing,
                contact us.
              </p>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-3 lg:mt-14">
                <button
                  type="button"
                  onClick={() => openContact(INQUIRY)}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-95"
                >
                  Start a Conversation
                  <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
