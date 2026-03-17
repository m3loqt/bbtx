"use client";

import { useEffect, useRef, type ReactElement } from "react";
import Script from "next/script";
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

const WHO_FOR = [
  {
    title: "Executive leaders",
    description:
      "C‑suite and senior leaders responsible for AI direction, governance, and outcomes inside their organizations.",
  },
  {
    title: "Operators and owners",
    description:
      "People accountable for workflows, teams, and initiatives who need AI to work in the real constraints of the business.",
  },
  {
    title: "Advisors and practitioners",
    description:
      "Consultants, product leaders, and internal champions who translate AI strategy into implementation.",
  },
];

const ACTIVITIES = [
  {
    title: "Articles & Resources",
    description:
      "Weekly writing on AI, leadership, and the human questions that matter most right now. Honest, considered, and written for people who want perspective not just information.",
  },
  {
    title: "Podcast",
    description:
      "A regular conversation at the intersection of leadership wisdom and technical fluency. Real thinking, candid takes, and honest perspective on where AI is taking the world of work.",
  },
  {
    title: "Courses & Certifications",
    description:
      "Structured learning designed for leaders and professionals who want more than surface-level AI fluency. Complete a course, earn a certification, and walk away with something you can actually use.",
  },
  {
    title: "Live Sessions & Webinars",
    description:
      "Real-time conversations and workshops you can join from anywhere. Show up, ask questions, push back, and think out loud with people navigating the same terrain you are.",
  },
  {
    title: "AI Resources",
    description:
      "Practical guides, workbooks, and curated tools built for leaders who want to move from thinking about AI to doing something meaningful with it.",
  },
];

const COURSES = [
  {
    title: "Introduction to Generative AI",
    description:
      "A clear, hype-free foundation in how modern generative AI works — so you can make better decisions about when and where to use it.",
    features: ["Core concepts", "Live walkthroughs", "Practical use cases"],
    tone: "warm",
  },
  {
    title: "Mastering Prompt Patterns",
    description:
      "A practical toolkit of reusable prompt patterns you can apply across tools, workflows, and roles — not just one-off tricks.",
    features: ["Prompt libraries", "Live practice", "Templates you can reuse"],
    tone: "cool",
  },
  {
    title: "AI Implementation for Business Value",
    description:
      "From pilot to production. Learn how to move real initiatives forward, measure impact, and avoid the traps that stall most AI projects.",
    features: ["Use case mapping", "ROI models", "Change management"],
    tone: "bold",
  },
  {
    title: "AI for Leadership and Organizational Transformation",
    description:
      "Frameworks for leaders who need to steer culture, governance, and strategy through the realities of an AI-shaped organization.",
    features: ["Executive frameworks", "Governance models", "Org design"],
    tone: "neutral",
  },
  {
    title: "Building AI-Enhanced Organizational Models for Consultants",
    description:
      "For consultants and advisors building AI into their client work — from operating models to offers, pricing, and delivery.",
    features: ["Client playbooks", "Operating models", "Case studies"],
    tone: "accent",
  },
  {
    title: "AI-Empowered Coaching & Consulting",
    description:
      "Practical ways to integrate AI into coaching, facilitation, and advisory work without losing the human depth that makes it valuable.",
    features: ["Session workflows", "Coaching tools", "Conversation guides"],
    tone: "soft",
  },
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
  {
    title: "AI Governance for Mid Size Organizations",
    summary: "How real organizations are establishing policies, oversight and accountability for AI.",
    category: "Governance",
    minutes: "7 min read",
    published: "March 5, 2026 · 9:30 AM EST",
    author: "Grant Tate",
  },
  {
    title: "From Pilots to Production",
    summary: "Lessons from teams moving beyond experimentation into measurable business impact.",
    category: "Implementation",
    minutes: "6 min read",
    published: "February 18, 2026 · 1:15 PM EST",
  },
  {
    title: "Leading Through the AI Shift",
    summary: "What leaders need to know when steering their organizations through AI adoption — without the hype.",
    category: "Leadership",
    minutes: "8 min read",
    published: "January 30, 2026 · 10:00 AM EST",
  },
];

function categoryIcon(category: string) {
  const key = category.toLowerCase();

  if (key.includes("governance")) {
    // Shield icon for Governance
    return (
      <svg
        className="h-3 w-3 text-[#6b7280]"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 3.25 5.5 5v4.5c0 3.03 1.93 4.98 4.5 6 2.57-1.02 4.5-2.97 4.5-6V5L10 3.25Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (key.includes("implementation")) {
    // Gear icon for Implementation
    return (
      <svg
        className="h-3 w-3 text-[#6b7280]"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M11.75 3.5 11 2.5 9 2.5 8.25 3.5 6.9 3.8 5.9 2.9 4.4 3.9 4.7 5.25 3.75 6 3.5 7.5 4.5 8.25 4.8 9.6 3.9 10.6 4.9 12.1 6.25 11.8 7 12.5 7.5 14h2l.5-1.5.75-.7 1.35.3 1-1.5-.9-1 .3-1.35 1-.75-.25-1.5-.95-.75-.3-1.35L11.75 3.5Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }

  if (key.includes("lead")) {
    // Flag icon for Leadership
    return (
      <svg
        className="h-3 w-3 text-[#6b7280]"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M5 3.75v12.5M6 4h7l-1 3 2 3H6"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Default document icon
  return (
    <svg
      className="h-3 w-3 text-[#6b7280]"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 4.25h4.75L15.5 8v7.75H7V4.25Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CHANNELS = [
  { name: "Substack", href: "#", description: "Newsletter, essays, and the full archive" },
  { name: "Gumroad", href: "#", description: "Courses, cohorts, and products" },
  { name: "Medium", href: "#", description: "Selected articles and references" },
  { name: "Podcast", href: "#", description: "Conversations with leaders working through AI" },
];

const TESTIMONIALS = [
  {
    quote:
      "Before the AI Integration Program, I had no idea what AI was. The training broke down what AI can do and how to use it in my workflow. Now, tasks that used to take 30 minutes take just 5, and my productivity has increased by about 50%. This program was powerful and extremely beneficial.",
    author: "Jamie Wilson",
    role: "Marketing Manager",
  },
  {
    quote:
      "The hands-on learning, expert insights, and practical tools gave me the confidence to start integrating AI into my coaching practice. What impressed me most was the emphasis on ethical, responsible implementation. Whether you're a professional or consultant, this program equips you to lead in the AI era.",
    author: "Terry Barnhart",
    role: "Executive Coach",
  },
  {
    quote:
      "I had the privilege of attending Grant Tate's AI Integration Workshop. The material was organized and easy to follow, and learning alongside professionals from diverse backgrounds showed me countless ways to use AI in the workplace. I use AI daily now, both professionally and personally. I strongly recommend these classes.",
    author: "Nancy Soans",
    role: "Executive Administrator",
  },
  {
    quote:
      "Since the class, I've redone all my staff's job requirements and accountabilities, developed marketing plans, and streamlined team reviews. I'm excited to keep learning and using AI to benefit my organization and community.",
    author: "Todd Johnson",
    role: "President & CEO",
  },
  {
    quote:
      "I've used AI before, but the sessions opened my eyes to using it for business planning and analysis. There are so many ways I can incorporate AI that I hadn't considered before.",
    author: "Laura Beltran",
    role: "Education Director",
  },
  {
    quote:
      "Before Chaotic Confluence, I only knew AI from a technical side. This community helped me understand how leadership and business work, and showed me how AI can make a real difference for people, not just in code. It's helped me grow a lot.",
    author: "Mel Angelo Cortes",
    role: "IT Specialist",
  },
];

export default function CommunityPage() {
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);

  // Set Substack widget config before the widget script loads
  useEffect(() => {
    (window as unknown as Record<string, unknown>).CustomSubstackWidget = {
      substackUrl: "chaoticconfluence.substack.com",
      placeholder: "Enter your email",
      buttonText: "Subscribe",
      theme: "custom",
      colors: {
        primary: "#ffffff",
        input: "rgba(255,255,255,0.15)",
        email: "white",
        text: "#ca3726",
      },
    };
  }, []);

  const scrollTestimonials = (dir: "left" | "right") => {
    const el = testimonialsScrollRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.9, el.scrollWidth - el.scrollLeft);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Nav />

      {/* 1. Hero — full-width hero, background image + left column */}
      <section className="relative overflow-hidden bg-[#000000] pt-14 sm:pt-20">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/communityher.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
            transform: "scale(1.03)",
          }}
          aria-hidden
        />
        {/* Subtle dark overlay on top of blurred image */}
        <div className="absolute inset-0 z-0 bg-black/35" aria-hidden />
        {/* Grid + grain for subtle texture over image */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-60"
          style={gridBg}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />
        <div className="relative z-[1]">
          <div className="flex min-h-[calc(100vh-3.5rem)] w-full flex-col items-stretch justify-end gap-6 px-4 pb-12 sm:justify-start sm:min-h-[calc(100vh-5rem)] sm:gap-10 sm:px-6 sm:pt-48 sm:pb-28 lg:px-8 lg:pt-56 lg:pb-32">
            <div className="cc-hero-left max-w-7xl sm:mt-14 lg:mt-20">
              <p className="mb-4 text-[11px] font-medium tracking-[0.38em] text-white sm:mb-6">
                CHAOTIC CONFLUENCE
              </p>
              <h1 className="text-[2rem] font-normal leading-[1.05] tracking-tighter text-white sm:text-[4.4rem] md:text-[5.2rem] lg:text-[6.4rem] xl:text-[6rem] 2xl:text-[6.4rem]">
                Where leaders come to think about AI, not just use it.
              </h1>
            </div>
            <div className="mt-0 max-w-5xl text-base leading-relaxed text-white/90 sm:mt-1 sm:text-xl md:text-2xl">
              Chaotic Confluence is a weekly newsletter, a library of courses, and a live learning space for leaders and
              professionals navigating the human side of the AI era.
            </div>
            <div className="mt-1 flex flex-col gap-3 sm:mt-2 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#newsletter"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-[#111111] transition-opacity duration-200 ease-out hover:opacity-95 sm:h-[50px] sm:w-auto sm:px-7 sm:text-[15px]"
              >
                Subscribe to the Newsletter
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-white/70 bg-transparent px-6 text-sm font-medium text-white transition-colors duration-200 ease-out hover:bg-white/10 sm:h-[50px] sm:w-auto sm:px-7 sm:text-[15px]"
              >
                Join the Next Session
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who It's For — headline + description */}
      <section className="relative z-[1] w-full border-t border-black/[0.06] bg-white">
        <div className="px-4 py-12 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-20">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
                What Chaotic Confluence is
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-medium leading-[1.05] tracking-tighter text-[#222222] sm:mt-4 sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[4.25rem]">
                What Chaotic Confluence is.
              </h2>
            </div>
            <div className="mt-4 max-w-2xl text-base leading-relaxed tracking-tight text-[#555555] sm:mt-10 sm:text-2xl lg:mt-12">
              Chaotic Confluence is a weekly newsletter, a podcast, and a live learning space created by R. Grant Tate and Mel Angelo Cortes - two people who believe that the most important question about AI is not how to use it, but how to lead with it wisely, humanly, and with a clear sense of what actually matters.
            </div>
          </div>

          {/* Metrics row */}
          <div className="mt-10 grid grid-cols-2 gap-6 text-[#111827] sm:mt-16 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
            <div>
              <p className="text-4xl font-semibold tracking-tight sm:text-6xl">50+</p>
              <p className="mt-2 text-xs leading-relaxed text-[#4b5563] sm:mt-4 sm:text-base">
                Passionate members driving change.
              </p>
            </div>
            <div>
              <p className="text-4xl font-semibold tracking-tight sm:text-6xl">300+</p>
              <p className="mt-2 text-xs leading-relaxed text-[#4b5563] sm:mt-4 sm:text-base">
                Hours of shared learning and growth.
              </p>
            </div>
            <div>
              <p className="text-4xl font-semibold tracking-tight sm:text-6xl">20+</p>
              <p className="mt-2 text-xs leading-relaxed text-[#4b5563] sm:mt-4 sm:text-base">
                Cohorts, workshops, and live sessions run.
              </p>
            </div>
            <div>
              <p className="text-4xl font-semibold tracking-tight sm:text-6xl">Countless</p>
              <p className="mt-2 text-xs leading-relaxed text-[#4b5563] sm:mt-4 sm:text-base">
                Ideas sparked, challenged, and brought to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What's Inside — newsletter, podcast, live sessions, Gumroad products */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              WHAT&apos;S INSIDE
            </p>
            <h2 className="mt-3 mx-auto max-w-5xl text-3xl font-medium leading-[1.05] tracking-tighter text-[#222222] sm:mt-4 sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[4.25rem]">
              Everything inside is built to meet you where you actually are.
            </h2>
            <p className="mx-auto mt-3 max-w-5xl text-base leading-relaxed tracking-tight text-[#555555] sm:mt-4 sm:text-2xl">
              Articles, podcast, live sessions, courses, and resources. The same depth of thinking expressed in different
              formats so you can engage however learning works best for you.
            </p>
          </div>
          <div className="mt-12 space-y-5">
            {/* Top row: two wide feature cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {ACTIVITIES.slice(0, 2).map((item, idx) => (
                <div
                  key={item.title}
                  className="flex min-h-[220px] flex-col justify-between rounded-2xl border border-black/[0.06] bg-white p-5 sm:min-h-[340px] sm:p-7 lg:p-8"
                >
                  <div className="flex flex-1 flex-col gap-6">
                    {/* Icon area */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#111111]/5">
                      {idx === 0 ? (
                        // Document icon for Articles & Resources
                        <svg
                          className="h-8 w-8 text-[#ca3726]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 7h5M8 11h8M8 15h6M6 3h8.586L18 6.414V21H6V3Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        // Microphone icon for Podcast
                        <svg
                          className="h-8 w-8 text-[#ca3726]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0M12 18v3M8 21h8"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Text block, placed toward bottom by parent flex */}
                    <div className="mt-auto">
                      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-[#ca3726]">FORMAT</p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#222222] sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#555555] sm:text-base">
                        {item.description}
                      </p>
                      <a
                        href={idx === 0 ? "/blog" : "#"}
                        className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[#ca3726] transition-opacity hover:opacity-80"
                      >
                        {idx === 0 ? "Read the latest" : "Listen now"} &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom row: three tighter cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.9fr)]">
              {ACTIVITIES.slice(2).map((item, idx) => (
                <div
                  key={item.title}
                  className={`flex min-h-[200px] flex-col justify-between rounded-2xl border border-black/[0.08] p-5 sm:min-h-[300px] sm:p-7 ${
                    idx === 2 ? "bg-[#ca3726] text-white" : "bg-white text-[#222222]"
                  }`}
                >
                  <div className="flex flex-1 flex-col gap-6">
                    {/* Icon area */}
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full ${
                        idx === 2 ? "bg-white/10" : "bg-[#111111]/5"
                      }`}
                    >
                      {idx === 0 && (
                        // Certificate icon for Courses & Certifications
                        <svg
                          className="h-7 w-7 text-[#ca3726]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 4h10a2 2 0 0 1 2 2v6.5A5.5 5.5 0 0 0 12 21a5.5 5.5 0 0 0-7-5.5V6a2 2 0 0 1 2-2Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {idx === 1 && (
                        // Play icon for Live Sessions & Webinars
                        <svg
                          className="h-7 w-7 text-[#ca3726]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10l-3-2-3 2-3-2-3 2V7Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11 10.5 14 12l-3 1.5v-3Z"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {idx === 2 && (
                        // Toolbox / resources icon for AI Resources
                        <svg
                          className="h-7 w-7 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 7V6a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1M5 7h14l1 3.5V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8.5L5 7Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 13h6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Text block */}
                    <div className="mt-auto">
                      <p className={`text-[0.625rem] font-semibold uppercase tracking-[0.22em] ${idx === 2 ? "text-white" : "text-[#ca3726]"}`}>FORMAT</p>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">{item.title}</h3>
                      <p
                        className={`mt-3 text-sm leading-relaxed sm:text-base ${
                          idx === 2 ? "text-white/90" : "text-[#555555]"
                        }`}
                      >
                        {item.description}
                      </p>
                      <a
                        href="#"
                        className={`mt-4 inline-flex items-center gap-1 text-[13px] font-medium transition-opacity hover:opacity-80 ${idx === 2 ? "text-white" : "text-[#ca3726]"}`}
                      >
                        {idx === 0 ? "Browse courses" : idx === 1 ? "View upcoming sessions" : "Explore resources"} &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Courses & Certifications */}
      <section className="relative z-[1] w-full border-t border-black/[0.06] bg-white">
        <div className="px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-20">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
                Courses & Certifications
              </p>
              <h2 className="mt-3 max-w-4xl text-3xl font-medium leading-[1.05] tracking-tighter text-[#222222] sm:mt-4 sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[4.25rem]">
                Real learning for leaders navigating a real shift
              </h2>
            </div>
            <div className="mt-4 max-w-3xl text-base leading-relaxed tracking-tight text-[#555555] sm:mt-10 sm:text-2xl lg:mt-12">
              <p>
                Structured courses built for leaders and professionals who want to go deeper on AI. Complete a course,
                earn a certification, and walk away with knowledge you can put to work immediately.
              </p>
              <a
                href="#"
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#ca3726]/80 px-4 py-2 text-sm font-semibold text-[#ca3726] sm:px-5 sm:py-2.5 sm:text-base"
              >
                Explore all courses
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:mt-16 sm:grid-cols-2 xl:grid-cols-3">
            {COURSES.map((course) => {
              return (
                <article
                  key={course.title}
                  className="flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.04)]"
                >
                  {/* Cover image area */}
                  <div
                    className="relative h-36 w-full bg-cover bg-center sm:h-52"
                    style={{ backgroundImage: "url('/service.png')" }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.45),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(0,0,0,0.25),transparent_55%)]" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-lg font-semibold tracking-tight text-[#111827] sm:text-xl">
                      {course.title}
                    </h3>

                    {/* Feature pills */}
                    {course.features && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {course.features.map((feature) => {
                          const lower = feature.toLowerCase();

                          let icon: ReactElement;
                          if (lower.includes("concept") || lower.includes("framework") || lower.includes("model")) {
                            // Book / content icon
                            icon = (
                              <svg
                                className="h-3.5 w-3.5 text-[#ca3726]"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 4.75A2.25 2.25 0 0 1 6.25 2.5H15v11.75h-8.5A2.5 2.5 0 0 0 4 16.75V4.75Z"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M7 5.75h5M7 8.25h3.5"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            );
                          } else if (lower.includes("live") || lower.includes("session") || lower.includes("workshop")) {
                            // Play icon
                            icon = (
                              <svg
                                className="h-3.5 w-3.5 text-[#ca3726]"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.75 4.75h8.5a1 1 0 0 1 1 1v8l-3-2-3 2-3-2-1.5 1V5.75a1 1 0 0 1 1-1Z"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 8.75 11.5 10l-2.5 1.25v-2.5Z"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            );
                          } else if (lower.includes("template") || lower.includes("tool") || lower.includes("playbook")) {
                            // Tool / settings icon
                            icon = (
                              <svg
                                className="h-3.5 w-3.5 text-[#ca3726]"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 3.25 8.9 5.4l-2.1.3 1.52 1.6-.36 2.2L10 8.5l2.04 1-0.36-2.2 1.52-1.6-2.1-.3L10 3.25Z"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M5 12.25h10M5 15.25h6"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            );
                          } else {
                            // Default check icon
                            icon = (
                              <svg
                                className="h-3.5 w-3.5 text-[#ca3726]"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.25 5.75 8.5 13.5 5 10"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            );
                          }

                          return (
                            <span
                              key={feature}
                              className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-[#f9fafb] px-3 py-1 text-xs font-medium text-[#4b5563]"
                            >
                              {icon}
                              <span>{feature}</span>
                            </span>
                          );
                        })}
                      </div>
                    )}

                    <p className="mt-4 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                      {course.description}
                    </p>

                    <div className="mt-6">
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 rounded-full border border-[#111827]/15 px-4 py-2 text-xs font-semibold text-[#111827] hover:bg-[#f3f4f6] sm:px-5 sm:py-2.5 sm:text-sm"
                      >
                        Learn more
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Upcoming Live Sessions */}
      <section className="relative z-[1] w-full bg-[#f7f7f7]">
        <div className="px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)] md:items-start md:gap-12">
            {/* Left: header + description */}
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
                Upcoming Live Sessions
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-medium leading-[1.05] tracking-tighter text-[#222222] sm:mt-4 sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[4.25rem]">
                Join the conversation while it's happening.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed tracking-tight text-[#555555] sm:mt-6 sm:text-2xl">
                Webinars, cohorts, and live sessions you can join from anywhere. Real time thinking on AI and leadership
                with people navigating the same questions you are.
              </p>
            </div>

            {/* Right: stacked cards */}
            <div className="space-y-4">
              {/* Card 1 — large */}
              <article className="relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-black/[0.08] bg-[#111111] text-white sm:min-h-[360px]">
                <div
                  className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('/service.png')" }}
                  aria-hidden
                />
                <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45),rgba(0,0,0,0.85))]" aria-hidden />
                <div className="relative z-[1] flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f97373]">
                      Webinar
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/70">
                      March 24, 2026 · 2:00 PM EST
                    </span>
                  </div>
                  <div className="mt-auto pt-5">
                    <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                      AI and Your Career: What to Protect, What to Delegate, and What to Master
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
                      A practical session on how professionals can position themselves in an AI-transformed workplace. Walk
                      away with a clear framework for where to invest your energy right now.
                    </p>
                    <div className="mt-4 flex items-center justify-end">
                      <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-[#fed7d7] hover:text-white sm:text-base">
                        Reserve your spot
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>

              {/* Card 2 — smaller */}
              <article className="flex flex-col rounded-2xl border border-black/[0.08] bg-white p-5 sm:min-h-[180px] sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ca3726]">
                    Cohort
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#6b7280]">
                    April 7, 2026 · 11:00 AM EST
                  </span>
                </div>
                <div className="mt-auto pt-4">
                  <h3 className="text-base font-semibold tracking-tight text-[#111827] sm:text-lg">
                    Leading AI Transformation: A Four-Week Cohort for Senior Leaders
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4b5563] sm:text-sm">
                    A structured four-week program for leaders building an AI strategy their organization can actually
                    execute. Limited seats.
                  </p>
                  <div className="mt-3 flex items-center justify-end">
                    <a href="#" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#ca3726] hover:underline sm:text-sm">
                      Reserve your spot
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>

              {/* Card 3 — smaller */}
              <article className="flex flex-col rounded-2xl border border-black/[0.08] bg-white p-5 sm:min-h-[180px] sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ca3726]">
                    Live Session
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#6b7280]">
                    April 21, 2026 · 3:00 PM EST
                  </span>
                </div>
                <div className="mt-auto pt-4">
                  <h3 className="text-base font-semibold tracking-tight text-[#111827] sm:text-lg">
                    Ask Us Anything: AI, Leadership, and What Keeps You Up at Night
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4b5563] sm:text-sm">
                    An open format session where you bring the questions and we bring the honest answers. No slides, no
                    scripts, just a real conversation.
                  </p>
                  <div className="mt-3 flex items-center justify-end">
                    <a href="#" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#ca3726] hover:underline sm:text-sm">
                      Reserve your spot
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 6. From the Library — featured Substack articles */}
      <section className="relative z-[1] w-full bg-white">
        <div className="px-4 py-12 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          {/* Centered header — full width container */}
          <div className="w-full text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              FROM THE LIBRARY
            </p>
            <h2 className="mt-3 text-3xl font-medium leading-[1.05] tracking-tighter text-[#111827] sm:mt-4 sm:text-5xl lg:text-6xl">
              Good thinking doesn&apos;t need a pitch.
            </h2>
            <p className="mx-auto mt-3 max-w-4xl text-base leading-relaxed tracking-tight text-[#4b5563] sm:mt-6 sm:text-2xl">
              Featured pieces from our library. Read them first. Subscribe when you&apos;re ready.
            </p>
          </div>

          {/* Cards layout:
              Row 1 — big feature (2/3) + small feature (1/3)
              Row 2 — three equal cards */}
          <div className="mt-14 space-y-6">
            {/* Row 1: 1 big + 1 small */}
            <div className="grid w-full gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-stretch">
              {RESEARCH_FEATURED[0] && (
                <a
                  href="#"
                  className="group flex h-full flex-1 flex-col rounded-2xl border border-black/[0.06] bg-white text-left transition-colors hover:bg-white sm:min-h-[440px]"
                >
                  <div className="flex flex-1 flex-col p-4 sm:p-8">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f4f6] px-3 py-1 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-[#4b5563] sm:text-xs">
                          {categoryIcon(RESEARCH_FEATURED[0].category)}
                          <span>{RESEARCH_FEATURED[0].category}</span>
                        </div>
                        <p className="text-[0.75rem] text-[#4b5563] sm:text-xs">
                          {RESEARCH_FEATURED[0].published}
                        </p>
                      </div>
                      <h3 className="mt-4 text-[1.35rem] font-semibold leading-tight tracking-tight text-[#111827] group-hover:text-[#ca3726] sm:mt-5 sm:text-[2.1rem] lg:text-[2.35rem]">
                        {RESEARCH_FEATURED[0].title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#4b5563] sm:mt-4 sm:text-xl">
                        {RESEARCH_FEATURED[0].summary}
                      </p>
                    </div>
                    <div className="mt-auto pt-8">
                      {/* Read article CTA row */}
                      <div>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#111827]"
                        >
                          Read article
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Divider + author / meta row */}
                      <div className="mt-6 border-t border-[#e5e7eb]" />
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 overflow-hidden rounded-full bg-[#fee2e2]">
                            <img
                              src="/grant.png"
                              alt={RESEARCH_FEATURED[0].author ?? "Article author"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">
                              By {RESEARCH_FEATURED[0].author ?? "Unknown"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4b5563] sm:text-xs">
                            {RESEARCH_FEATURED[0].minutes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              )}

              {RESEARCH_FEATURED[1] && (
                <a
                  href="#"
                  className="group flex h-full flex-1 flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white text-left transition-colors hover:bg-white sm:min-h-[460px]"
                >
                  {/* Cover image area */}
                  <div
                    className="relative h-36 w-full bg-cover bg-center sm:h-52"
                    style={{ backgroundImage: "url('/service.png')" }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.45),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(0,0,0,0.25),transparent_55%)]" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f4f6] px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#4b5563] sm:text-xs">
                          {categoryIcon(RESEARCH_FEATURED[1].category)}
                          <span>{RESEARCH_FEATURED[1].category}</span>
                        </div>
                        <p className="text-[0.7rem] text-[#4b5563] sm:text-xs">
                          {RESEARCH_FEATURED[1].published}
                        </p>
                      </div>
                      <h3 className="mt-4 text-base font-semibold tracking-tight text-[#111827] group-hover:text-[#ca3726] sm:text-lg">
                        {RESEARCH_FEATURED[1].title}
                      </h3>
                      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                        {RESEARCH_FEATURED[1].summary}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 flex items-center justify-end gap-3">
                      <span className="inline-flex items-center border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4b5563] sm:text-xs">
                        {RESEARCH_FEATURED[1].minutes}
                      </span>
                      <span className="h-4 w-px bg-[#e5e7eb]" />
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#ca3726] sm:text-sm">
                        Read more <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              )}
            </div>

            {/* Row 2: three equal cards */}
            <div className="grid w-full gap-4 md:grid-cols-3 md:items-stretch">
              {RESEARCH_FEATURED.map((r) => (
                <a
                  key={`grid-${r.title}`}
                  href="#"
                  className="group flex h-full flex-1 flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white text-left transition-colors hover:bg-white sm:min-h-[460px]"
                >
                  {/* Cover image area */}
                  <div
                    className="relative h-36 w-full bg-cover bg-center sm:h-52"
                    style={{ backgroundImage: "url('/service.png')" }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.45),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(0,0,0,0.25),transparent_55%)]" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f4f6] px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#4b5563] sm:text-xs">
                          {categoryIcon(r.category)}
                          <span>{r.category}</span>
                        </div>
                        <p className="text-[0.7rem] text-[#4b5563] sm:text-xs">
                          {r.published}
                        </p>
                      </div>
                      <h3 className="mt-4 text-base font-semibold tracking-tight text-[#111827] group-hover:text-[#ca3726] sm:text-lg">
                        {r.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-[#4b5563] sm:text-base">
                        {r.summary}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 flex items-center justify-end gap-3">
                      <span className="inline-flex items-center border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4b5563] sm:text-xs">
                        {r.minutes}
                      </span>
                      <span className="h-4 w-px bg-[#e5e7eb]" />
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#ca3726] sm:text-sm">
                        Read more <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          <div className="mt-8 flex justify-center">
            <a
              href="/blog"
              className="text-sm font-medium text-[#ca3726] transition-opacity hover:opacity-80"
            >
              View all articles &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 8. Testimonials — gray bg, white cards, carousel */}
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
              {/* TODO: Grant - replace all testimonial content below with real quotes from graduates/members */}
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
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
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#111827]">
                    {t.role}
                  </p>
                  <span className="mt-3 block text-5xl font-semibold leading-none text-[#111827] sm:text-6xl lg:text-7xl">
                    &ldquo;
                  </span>
                  <p className="mt-[-0.6rem] mb-4 text-lg font-semibold leading-snug text-[#111827] sm:text-xl">
                    {t.quote}
                  </p>
                  <footer className="mt-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-sm font-semibold text-[#111827]">
                      {t.author.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-[#111827]">{t.author}</p>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#6b7280]">{t.role}</p>
                    </div>
                  </footer>
                </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Newsletter signup */}
      <section id="newsletter" className="relative z-[1] w-full border-t border-black/[0.06]">
        <div className="grid w-full grid-cols-1 lg:grid-cols-[11fr_9fr]">
          {/* Left: benefits */}
          <div className="flex flex-col justify-center bg-[#f7f7f7] px-5 py-10 sm:px-8 sm:py-20 lg:px-10 lg:py-24 xl:px-12 xl:py-28">
            <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              Chaotic Confluence
            </p>
            <h2 className="max-w-[calc(100%-10px)] text-[2rem] font-medium leading-[1.1] tracking-tighter text-[#222222] sm:text-[2.75rem] md:text-[3.6rem] lg:text-[4.2rem] xl:text-[4.6rem]">
              Because knowing how to use AI is not the same as knowing how to{" "}
              <span
                className="font-normal italic"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                lead with it.
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#555555] sm:mt-6 sm:max-w-xl sm:text-xl">
              Subscribe to the weekly newsletter and start building the kind of judgment that tools alone will never give you.
            </p>
          </div>

          {/* Right: Substack sign-up block */}
          <div className="flex flex-col justify-center rounded-2xl bg-[#ca3726] py-10 pl-5 pr-5 sm:py-20 sm:pl-10 sm:pr-8 lg:my-6 lg:mr-6 lg:rounded-3xl lg:py-24 lg:pl-12 lg:pr-10 xl:pl-14 xl:pr-12">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/70">Sign up for:</p>
            <h3
              className="mt-3 text-[2.1rem] font-medium leading-tight tracking-tight text-white sm:text-[2.4rem] lg:text-[2.7rem] xl:text-[3rem]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Chaotic Confluence
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/90 sm:text-[1.05rem]">
              Subscribe to the weekly newsletter and start building the kind of judgment that tools alone will never give you.
            </p>

            {/* Substack embed */}
            <div
              id="custom-substack-embed"
              className="mt-8 substack-embed-container"
            />

            <Script
              src="https://substackapi.com/widget.js"
              strategy="lazyOnload"
            />

            <p className="mt-5 text-[11px] leading-relaxed text-white/60">
              Your information is never shared with third parties. Unsubscribe anytime.
            </p>
            <p className="mt-3 text-[12px] text-white/70">
              Prefer to subscribe directly?{" "}
              <a
                href="https://chaoticconfluence.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-white"
              >
                Visit us on Substack →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 10. Closing CTA — full width with communityher background */}
      <section
        id="subscribe"
        className="relative z-[1] w-full overflow-hidden"
        style={{
          backgroundImage: "url('/communityher.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 z-0 bg-black/45" aria-hidden />
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40" style={gridBg} aria-hidden />
        <div className="relative z-[1] px-4 py-14 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <h2 className="mx-auto max-w-6xl text-2xl font-medium leading-[1.1] tracking-tighter text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            Because knowing how to use AI is not the same as knowing how to lead with it.
          </h2>
          <p className="mx-auto mt-4 max-w-5xl text-base leading-relaxed text-white/95 sm:mt-6 sm:text-xl lg:text-2xl">
            Subscribe to the weekly newsletter and start building the kind of judgment that tools alone will never give you.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#newsletter"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-[15px] font-medium text-[#222222] transition-opacity hover:opacity-95"
            >
              Subscribe to the Newsletter
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/60 px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-white/15"
            >
              View Upcoming Live Sessions
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
