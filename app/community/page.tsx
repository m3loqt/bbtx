"use client";

import { useRef, type ReactElement } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
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
    cover: "/introtogenai.png",
    url: "https://chaoticconfluence.gumroad.com/l/hcvcs",
  },
  {
    title: "Mastering Prompt Patterns",
    description:
      "A practical toolkit of reusable prompt patterns you can apply across tools, workflows, and roles — not just one-off tricks.",
    features: ["Prompt libraries", "Live practice", "Templates you can reuse"],
    tone: "cool",
    cover: "/masterpp.png",
    url: "https://chaoticconfluence.gumroad.com/l/mastering-prompt-patterns",
  },
  {
    title: "AI Implementation for Business Value",
    description:
      "From pilot to production. Learn how to move real initiatives forward, measure impact, and avoid the traps that stall most AI projects.",
    features: ["Use case mapping", "ROI models", "Change management"],
    tone: "bold",
    cover: "/bizval.png",
    url: "https://chaoticconfluence.gumroad.com/l/vggusf",
  },
  {
    title: "AI for Leadership and Organizational Transformation",
    description:
      "Frameworks for leaders who need to steer culture, governance, and strategy through the realities of an AI-shaped organization.",
    features: ["Executive frameworks", "Governance models", "Org design"],
    tone: "neutral",
    cover: "/ai4leadership.png",
    url: "https://chaoticconfluence.gumroad.com/l/vpeyt",
  },
  {
    title: "Building AI-Enhanced Organizational Models for Consultants",
    description:
      "For consultants and advisors building AI into their client work — from operating models to offers, pricing, and delivery.",
    features: ["Client playbooks", "Operating models", "Case studies"],
    tone: "accent",
    cover: "/buildaienhanced.png",
    url: "https://chaoticconfluence.gumroad.com/l/baeeas",
  },
  {
    title: "AI-Empowered Coaching & Consulting",
    description:
      "Practical ways to integrate AI into coaching, facilitation, and advisory work without losing the human depth that makes it valuable.",
    features: ["Session workflows", "Coaching tools", "Conversation guides"],
    tone: "soft",
    cover: "/aiempcoach.png",
    url: "https://chaoticconfluence.gumroad.com/l/uykxq",
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
    title: "AI Isn't Failing. Leadership Is.",
    summary: "Why execution stalls when leadership assumptions go unchallenged.",
    category: "Governance",
    minutes: "5 min read",
    published: "Chaotic Confluence",
    author: "Grant Tate",
    href: "https://chaoticconfluence.substack.com/p/ai-isnt-failing-leadership-is",
  },
  {
    title:
      "The Great Cognitive Deflation: 2026, The DeepSeek Shock, and the Geopolitics of AI Dumping",
    summary: "How economics, power, and AI acceleration are colliding in real time.",
    category: "Implementation",
    minutes: "6 min read",
    published: "Chaotic Confluence",
    href: "https://chaoticconfluence.substack.com/p/the-great-cognitive-deflation-2026",
  },
  {
    title: "Why Most AI Efforts Fall Flat (And How to Actually Get Results)",
    summary: "A practical breakdown of why adoption stalls and what to do differently.",
    category: "Strategy",
    minutes: "5 min read",
    published: "Chaotic Confluence",
    href: "https://chaoticconfluence.substack.com/p/why-most-ai-efforts-fall-flat-and",
  },
  {
    title: "The Unwritten Rules of AI at Work: 4 Surprising Truths You Need to Know",
    summary: "Unspoken patterns shaping how AI really gets adopted in teams.",
    category: "Leadership",
    minutes: "8 min read",
    published: "Chaotic Confluence",
    href: "https://chaoticconfluence.substack.com/p/the-unwritten-rules-of-ai-at-work",
  },
  {
    title: "AI Standards & Guidelines",
    summary: "A practical framework for corporate compliance and responsible AI usage.",
    category: "Governance",
    minutes: "7 min read",
    published: "Chaotic Confluence",
    href: "https://chaoticconfluence.substack.com/p/ai-standards-and-guidelines",
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

export default function CommunityPage() {
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);

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
        <div className="absolute inset-0 z-0" aria-hidden>
          <Image
            src="/communityhero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover blur-[2px] scale-[1.03]"
          />
        </div>
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

      {/* 2. Community Metrics — retain stats */}
      <section className="relative z-[1] w-full border-t border-black/[0.06] bg-white">
        <div className="px-4 py-12 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid grid-cols-2 gap-6 text-[#111827] sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
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
                  className="flex flex-col overflow-hidden border border-black/[0.06] bg-[#f7f7f7] shadow-[0_12px_40px_rgba(15,23,42,0.04)]"
                >
                  {/* Cover image area */}
                  <div
                    className="relative h-56 w-full overflow-hidden bg-cover bg-center sm:h-72"
                    style={{
                      backgroundImage: `url('${
                        course.cover ?? "/service.png"
                      }')`,
                    }}
                  />

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

                    <div className="mt-6 flex justify-end">
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3"
                      >
                        <span className="text-sm font-semibold text-[#111827]">Learn more</span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#ca3726] text-white">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
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
          <div className="w-full text-center">
            <p className="mx-auto text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#555555]/60">
              Upcoming Live Sessions
            </p>
            <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-medium leading-[1.05] tracking-tighter text-[#222222] sm:mt-4 sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[4.25rem]">
              Join the conversation while it&apos;s happening.
            </h2>
            <p className="mx-auto mt-4 max-w-5xl text-base leading-relaxed tracking-tight text-[#555555] sm:mt-6 sm:text-2xl">
              Webinars, cohorts, and live sessions you can join from anywhere. Real time thinking on AI and leadership
              with people navigating the same questions you are.
            </p>
          </div>

          <div className="mx-auto mt-10 w-full max-w-[90rem]">
            <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)_minmax(0,1fr)]">
              {[
                {
                  kind: "Webinar",
                  date: "March 24, 2026 · 2:00 PM EST",
                  title: "AI and Your Career: What to Protect, What to Delegate, and What to Master",
                  description:
                    "A practical session on how professionals can position themselves in an AI-transformed workplace. Walk away with a clear framework for where to invest your energy right now.",
                },
                {
                  kind: "Cohort",
                  date: "April 7, 2026 · 11:00 AM EST",
                  title: "Leading AI Transformation: A Four-Week Cohort for Senior Leaders",
                  description:
                    "A structured four-week program for leaders building an AI strategy their organization can actually execute. Limited seats.",
                },
                {
                  kind: "Live Session",
                  date: "April 21, 2026 · 3:00 PM EST",
                  title: "Ask Us Anything: AI, Leadership, and What Keeps You Up at Night",
                  description:
                    "An open format session where you bring the questions and we bring the honest answers. No slides, no scripts, just a real conversation.",
                },
              ].map((event, idx) => (
                <article
                  key={event.title}
                  className="flex flex-col overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
                >
                  <div className="relative h-[340px] sm:h-[400px] lg:h-[440px]">
                    <Image
                      src="/communityher.png"
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/55"
                      aria-hidden
                    />

                    <div className="relative z-[1] h-full">
                      <div className="absolute left-5 right-16 bottom-5 sm:left-6 sm:right-20 sm:bottom-6">
                        <p className="text-xs font-semibold tracking-normal text-white/75">{event.date}</p>
                        <h3 className="mt-2 line-clamp-2 text-base font-semibold tracking-tight text-white sm:text-lg">
                          {event.title}
                        </h3>
                      </div>

                      <div className="absolute right-5 bottom-5 sm:right-6 sm:bottom-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                          <ArrowUpRight className="h-5 w-5 text-[#111827]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
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
            <div className="mt-6 flex justify-center">
              <a
                href="/blog"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#ca3726] px-6 text-sm font-medium text-[#ca3726] transition-colors duration-200 ease-out hover:bg-[#ca3726]/10 sm:h-[50px] sm:px-7 sm:text-[15px]"
              >
                View all articles
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Cards layout:
              Row 1 — big feature (2/3) + small feature (1/3)
              Row 2 — three equal cards */}
          <div className="mt-14 space-y-6">
            {/* Row 1: 1 big + 1 small */}
            <div className="grid w-full gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-stretch">
              {RESEARCH_FEATURED[0] && (
                <a
                  href={RESEARCH_FEATURED[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-1 flex-col border border-black/[0.06] bg-[#f7f7f7] text-left transition-colors hover:bg-[#f2f2f2] sm:min-h-[560px]"
                >
                  <div className="flex flex-1 flex-col p-4 sm:p-8">
                    <div>
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
                            <Image
                              src="/grant.png"
                              alt={RESEARCH_FEATURED[0].author ?? "Article author"}
                              fill
                              sizes="40px"
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
                  href={RESEARCH_FEATURED[1].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-1 flex-col overflow-hidden border border-black/[0.06] bg-[#f7f7f7] text-left transition-colors hover:bg-[#f2f2f2] sm:min-h-[560px]"
                >
                  {/* Cover image area */}
                  <div className="relative h-56 w-full sm:h-72">
                    <Image
                      src="/pop2.png"
                      alt={RESEARCH_FEATURED[1].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    <div>
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
                      <span className="inline-flex items-center gap-3">
                        <span className="text-sm font-semibold text-[#111827]">Read more</span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#ca3726] text-white">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </span>
                    </div>
                  </div>
                </a>
              )}
            </div>

            {/* Row 2: three equal cards */}
            <div className="grid w-full gap-4 md:grid-cols-3 md:items-stretch">
              {RESEARCH_FEATURED.slice(2).map((r, idx) => (
                <a
                  key={`grid-${r.title}`}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-1 flex-col overflow-hidden border border-black/[0.06] bg-[#f7f7f7] text-left transition-colors hover:bg-[#f2f2f2] sm:min-h-[560px]"
                >
                  {/* Cover image area */}
                  <div
                    className="relative h-56 w-full bg-cover bg-center sm:h-72"
                    style={{
                      backgroundImage:
                        idx === 0
                          ? "url('/pop3.png')"
                          : idx === 1
                            ? "url('/pop4.png')"
                            : "url('/latest1.png')",
                    }}
                  />

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    <div>
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
                      <span className="inline-flex items-center gap-3">
                        <span className="text-sm font-semibold text-[#111827]">Read more</span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#ca3726] text-white">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
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
              <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
                <Star className="h-4 w-4 text-[#ca3726]" />
                WHAT OUR COMMUNITY SAYS
              </p>
              <div className="hidden items-center gap-2 sm:flex">
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
            <div className="overflow-hidden">
              <div
                ref={testimonialsScrollRef}
                className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-4 pt-1 scroll-smooth md:gap-4 sm:px-2 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {TESTIMONIALS.map((t, i) => (
                <article
                  key={i}
                  className="flex min-w-[100%] max-w-[520px] flex-shrink-0 snap-start flex-col justify-between rounded-2xl border border-black/[0.06] bg-white p-4 sm:min-w-[84%] sm:p-6 md:min-w-[64%] lg:min-w-[48%] lg:p-8"
                >
                  <div className="mb-4 mt-0 flex self-start gap-1 text-[#f59e0b]">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx}
                        className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className="mt-0 mb-4 text-[15px] font-semibold leading-snug text-[#111827] sm:text-lg lg:text-xl">
                    {t.quote}
                  </p>
                  <footer className="mt-6 flex items-center gap-4">
                    <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f3f4f6] sm:h-12 sm:w-12">
                      <Image src={t.image} alt="" fill sizes="48px" className="h-full w-full object-cover" />
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

      {/* 9. Closing CTA — full width with communityher background */}
      <section id="subscribe" className="relative z-[1] w-full overflow-hidden">
        <Image
          src="/communityher.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
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
