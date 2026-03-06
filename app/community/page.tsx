"use client";

import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ArrowUpRight } from "@/app/components/ArrowIcon";

const gridBg = {
  backgroundImage: `
    linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
  `,
  backgroundSize: "48px 48px",
};

const ACTIVITIES = [
  { title: "Newsletter", description: "Structured updates, insights, and frameworks delivered regularly. No hype, no fluff." },
  { title: "Live Sessions", description: "Webinars and interactive sessions on AI strategy, implementation, and leadership." },
  { title: "Cohorts", description: "Structured programs for leaders moving from theory to practice together." },
  { title: "Coaching", description: "One-on-one and small-group advisory for executives driving AI initiatives." },
  { title: "Presentations", description: "Keynotes and workshops for organizations ready to align leadership on AI." },
];

const COURSES = [
  { title: "AI Implementation for Business Value", description: "From pilot to production. Build internal capability and measure real impact." },
  { title: "Executive AI Strategy", description: "Framework-driven sessions for C-suite and senior leaders defining AI direction." },
];

const UPCOMING_SESSIONS = [
  { date: "TBD", topic: "AI Governance Workshop", type: "Webinar" },
  { date: "TBD", topic: "Leadership Cohort — Spring", type: "Cohort" },
  { date: "TBD", topic: "From Experimentation to Strategy", type: "Presentation" },
];

const ASSOCIATES = [
  { name: "Grant", role: "Co-founder & Lead" },
  { name: "Mel", role: "Co-founder & Lead" },
  // Add certified graduates and other associates
];

const RESEARCH_FEATURED = [
  { title: "AI Governance for Mid-Size Organizations", summary: "A structured approach to policies, oversight, and accountability." },
  { title: "From Pilots to Production", summary: "What it takes to move from experimentation to measurable business impact." },
];

const CHANNELS = [
  { name: "Substack", href: "#", description: "Newsletter and long-form content" },
  { name: "Gumroad", href: "#", description: "Courses and resources" },
];

const TESTIMONIALS = [
  { quote: "The community gave us clarity we couldn't find anywhere else. No noise, no theatre, just structured progress.", author: "COO, Professional Services" },
  { quote: "Grant and Mel cut through the hype. Their frameworks are now the backbone of our AI strategy.", author: "VP Strategy, Healthcare" },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero — What Chaotic Confluence is and who it's for. One headline, one CTA */}
      <section className="relative min-h-screen w-full overflow-hidden pt-20">
        <img src="/grant.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
          }}
          aria-hidden
        />
        <div className="relative z-[1] flex min-h-[calc(100vh-5rem)] flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <h1 className="max-w-3xl text-[2.5rem] font-medium leading-tight tracking-tighter text-white sm:text-[3.2rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem]">
            Chaotic Confluence —{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Where Leaders
            </span>{" "}
            Integrate AI with Intent
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            A community for executives and operators moving from AI curiosity to confident implementation.
            Structured dialogue. Real decisions. No noise.
          </p>
          <a
            href="#subscribe"
            className="mt-10 inline-flex w-fit items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
          >
            Join the Community
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 2. What We Do — Newsletter, live sessions, cohorts, coaching, presentations */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            What We Do
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tighter text-[#222222] sm:text-4xl lg:text-5xl">
            One community.{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Five ways
            </span>{" "}
            to engage.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#555555]">
            From weekly reads to live cohorts and one-on-one coaching — everything designed to move you from curiosity to confident implementation.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {ACTIVITIES.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-black/[0.06] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] sm:p-8"
              >
                <h3 className="text-lg font-semibold tracking-tight text-[#222222] sm:text-xl">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#555555]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Courses & Certifications */}
      <section className="relative z-[1] w-full border-t border-black/[0.06] bg-white">
        <div className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Courses & Certifications
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tighter text-[#222222] sm:text-4xl lg:text-5xl">
            Structured pathways to{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              certified capability
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#555555]">
            Complete our courses, demonstrate competence, and join the certification pathway — positioning yourself as a credible practitioner in AI implementation and strategy.
          </p>
          <div className="mt-12 space-y-6">
            {COURSES.map((course) => (
              <div
                key={course.title}
                className="rounded-xl border border-black/[0.08] bg-[#f7f7f7] p-6 sm:p-8"
              >
                <h3 className="text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">{course.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#555555]">{course.description}</p>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-[#ca3726] px-5 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-95"
          >
            Enroll or Learn More
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 4. Upcoming Live Sessions */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Upcoming Live Sessions
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tighter text-[#222222] sm:text-4xl lg:text-5xl">
            Webinars. Cohorts.{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Presentations.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#555555]">
            Join upcoming sessions. Dates, topics, and how to register.
          </p>
          <div className="mt-12 space-y-4">
            {UPCOMING_SESSIONS.map((s, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 rounded-xl border border-black/[0.06] bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#ca3726]">{s.type}</span>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-[#222222]">{s.topic}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#555555]">{s.date}</span>
                  <a href="#" className="text-sm font-medium text-[#ca3726] hover:underline">
                    How to join →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Associates — Grant, Mel, certified graduates */}
      <section className="relative z-[1] w-full border-t border-black/[0.06] bg-white">
        <div className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Our Associates
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tighter text-[#222222] sm:text-4xl lg:text-5xl">
            Human. Specific.{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Credible.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#555555]">
            Grant, Mel, and our certified graduates — the practitioners behind Chaotic Confluence.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {ASSOCIATES.map((a) => (
              <div key={a.name} className="rounded-xl border border-black/[0.06] bg-[#f7f7f7] p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#222222] text-lg font-semibold text-white">
                  {a.name[0]}
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-[#222222]">{a.name}</h3>
                <p className="mt-1 text-sm text-[#555555]">{a.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Research & Reference Library */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Research & Reference Library
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tighter text-[#222222] sm:text-4xl lg:text-5xl">
            Serious intellectual{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              resource
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#555555]">
            Featured articles and research. Not a newsletter fluff — frameworks, case studies, and reference material.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {RESEARCH_FEATURED.map((r) => (
              <a
                key={r.title}
                href="#"
                className="group rounded-xl border border-black/[0.06] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:p-8"
              >
                <h3 className="text-lg font-semibold tracking-tight text-[#222222] group-hover:text-[#ca3726] sm:text-xl">
                  {r.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#555555]">{r.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#ca3726]">
                  Read more <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Where to Find Us */}
      <section className="relative z-[1] w-full border-t border-black/[0.06] bg-white">
        <div className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
            Where to Find Us
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tighter text-[#222222] sm:text-4xl lg:text-5xl">
            Substack. Gumroad.{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              More.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#555555]">
            Newsletter, courses, and resources — all in one place.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            {CHANNELS.map((c) => (
              <a
                key={c.name}
                href={c.href}
                className="flex items-center gap-3 rounded-xl border border-black/[0.08] bg-[#f7f7f7] px-6 py-4 transition-colors hover:bg-[#efefef]"
              >
                <span className="font-semibold text-[#222222]">{c.name}</span>
                <span className="text-sm text-[#555555]">— {c.description}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#555555]" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="relative z-[1] w-full bg-[#ca3726]">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]"
          style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`, backgroundSize: "24px 24px" }}
          aria-hidden
        />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/60">
            Testimonials
          </p>
          <h2 className="mt-4 text-center text-3xl font-medium tracking-tighter text-white sm:text-4xl lg:text-5xl">
            What the community{" "}
            <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              says
            </span>
          </h2>
          <div className="mx-auto mt-16 grid max-w-4xl gap-10 sm:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={i} className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
                <p className="text-lg leading-relaxed text-white/95 sm:text-xl">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm font-medium text-white/70">— {t.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Closing CTA */}
      <section id="subscribe" className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-60" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-[#ca3726] shadow-[0_4px_24px_rgba(202,55,38,0.2)]">
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-90"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(ellipse 60% 80% at 80% 60%, rgba(255,255,255,0.06) 0%, transparent 45%)
                `,
              }}
              aria-hidden
            />
            <div className="relative z-[1] px-6 py-20 text-center sm:px-10 sm:py-24 lg:px-16 lg:py-28">
              <h2 className="text-3xl font-medium tracking-tighter text-white sm:text-4xl lg:text-5xl">
                Subscribe. Enroll.{" "}
                <span className="font-normal italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  Book a session.
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
                Join the community. Take a course. Or book time with Grant and Mel directly.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-95"
                >
                  Subscribe
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
                >
                  Enroll in a Course
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
                >
                  Book a Session
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
