import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";
const TAVILY_KEY = process.env.TAVILY_API_KEY;

// ── Rate limiting ──────────────────────────────────────────
// In-memory store — resets on cold start. For multi-instance
// deployments, replace with Upstash Redis.
const ipStore = new Map<string, { count: number; resetAt: number }>();
const PER_IP_MAX    = 5;
const PER_IP_WINDOW = 15 * 60 * 1000; // 15 min
let globalCount   = 0;
let globalResetAt = Date.now() + 60_000;
const GLOBAL_MAX  = 40; // per minute across all IPs

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();

  if (now > globalResetAt) { globalCount = 0; globalResetAt = now + 60_000; }
  if (globalCount >= GLOBAL_MAX) {
    return { ok: false, retryAfter: Math.ceil((globalResetAt - now) / 1000) };
  }

  let entry = ipStore.get(ip);
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + PER_IP_WINDOW };
    ipStore.set(ip, entry);
  }
  if (entry.count >= PER_IP_MAX) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  globalCount++;

  if (ipStore.size > 5000) {
    for (const [k, v] of ipStore) if (now > v.resetAt) ipStore.delete(k);
  }

  return { ok: true };
}

// ── Jina AI reader (free, no auth) ────────────────────────
async function readPage(url: string, maxChars = 5000): Promise<string | null> {
  try {
    const res = await fetch(`https://r.jina.ai/${url}`, {
      headers: { Accept: "text/plain", "X-Return-Format": "text" },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text.trim().slice(0, maxChars) || null;
  } catch {
    return null;
  }
}

// ── Tavily web search ──────────────────────────────────────
async function webSearch(query: string): Promise<string | null> {
  if (!TAVILY_KEY) return null;
  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: TAVILY_KEY,
        query,
        max_results: 5,
        search_depth: "basic",
        include_answer: true,
        include_raw_content: false,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const d = await res.json() as {
      answer?: string;
      results?: Array<{ url: string; title: string; content: string }>;
    };
    const parts: string[] = [];
    if (d.answer) parts.push(`Summary: ${d.answer}`);
    for (const r of (d.results ?? []).slice(0, 4)) {
      parts.push(`[${r.title}](${r.url})\n${(r.content ?? "").slice(0, 500)}`);
    }
    return parts.join("\n\n") || null;
  } catch {
    return null;
  }
}

// ── Discover key subpages via sitemap ─────────────────────
async function discoverSubpages(baseUrl: string): Promise<string[]> {
  const priorityTerms = [
    "about", "service", "team", "leader", "mission",
    "approach", "what-we-do", "work", "solution",
  ];
  try {
    const res = await fetch(`${baseUrl}/sitemap.xml`, {
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const xml = await res.text();
      const urls = [...xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)]
        .map((m) => m[1])
        .filter((u) => {
          const path = new URL(u).pathname.toLowerCase();
          return path !== "/" && priorityTerms.some((t) => path.includes(t));
        })
        .slice(0, 5);
      if (urls.length > 0) return urls;
    }
  } catch { /* fall through */ }
  return ["/about", "/about-us", "/services", "/team", "/our-approach"].map(
    (p) => baseUrl + p
  );
}

// ── JSON parser (robust) ───────────────────────────────────
function parseJson(text: string): Record<string, unknown> {
  const s = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
  try { return JSON.parse(s) as Record<string, unknown>; } catch { /* */ }
  const m = s.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]) as Record<string, unknown>; } catch { /* */ } }
  throw new Error("Could not parse JSON from Claude response");
}

// ── SSE handler ────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();
  const ip = getIp(req);

  const stream = new ReadableStream({
    async start(controller) {
      const emit = (type: string, payload: Record<string, unknown>) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type, ...payload })}\n\n`)
        );
      };

      try {
        // Rate limit check
        const { ok, retryAfter } = checkRateLimit(ip);
        if (!ok) {
          const minutes = Math.ceil((retryAfter ?? 60) / 60);
          emit("error", { message: `Analysis limit reached. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.` });
          controller.close();
          return;
        }

        const body = await req.json() as Record<string, string | undefined>;
        const { websiteUrl, organizationName, industry, competitors, strategicQuestion } = body;

        // Input validation
        if (!websiteUrl || typeof websiteUrl !== "string" || websiteUrl.length > 2048) {
          emit("error", { message: "Please enter a valid website URL." });
          controller.close();
          return;
        }

        const FIELD_LIMITS = { org: 200, industry: 200, competitors: 500, question: 1000 };
        if (
          (organizationName?.length ?? 0) > FIELD_LIMITS.org ||
          (industry?.length ?? 0)         > FIELD_LIMITS.industry ||
          (competitors?.length ?? 0)       > FIELD_LIMITS.competitors ||
          (strategicQuestion?.length ?? 0) > FIELD_LIMITS.question
        ) {
          emit("error", { message: "One or more fields exceed the maximum allowed length." });
          controller.close();
          return;
        }

        let baseUrl = websiteUrl.trim();
        if (!baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
          baseUrl = "https://" + baseUrl;
        }

        // SSRF protection — block private/loopback addresses
        try {
          const { hostname, protocol } = new URL(baseUrl);
          if (!["http:", "https:"].includes(protocol)) throw new Error("protocol");
          if (
            hostname === "localhost" ||
            /^127\./.test(hostname) ||
            /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/.test(hostname) ||
            hostname === "0.0.0.0" ||
            hostname.endsWith(".internal") ||
            hostname.endsWith(".local")
          ) {
            emit("error", { message: "Please enter a valid public website URL." });
            controller.close();
            return;
          }
        } catch {
          emit("error", { message: "Please enter a valid website URL." });
          controller.close();
          return;
        }

        const domain = (() => {
          try { return new URL(baseUrl).hostname.replace(/^www\./, ""); } catch { return baseUrl; }
        })();
        const orgName = organizationName || domain;

        const gathered: { label: string; content: string }[] = [];
        let fetchSucceeded = false;

        // ── Phase 1: Homepage ──────────────────────────
        emit("progress", { step: `Reading ${domain}`, phase: "research" });
        const homepage = await readPage(baseUrl);
        if (homepage) {
          gathered.push({ label: `Homepage (${baseUrl})`, content: homepage });
          fetchSucceeded = true;
        }

        // ── Phase 2: Subpages ──────────────────────────
        emit("progress", { step: "Locating key pages", phase: "research" });
        const subpageUrls = await discoverSubpages(baseUrl);
        const subpageResults = await Promise.allSettled(
          subpageUrls.slice(0, 4).map((u) => readPage(u, 4000))
        );
        let pagesRead = 0;
        for (let i = 0; i < subpageResults.length; i++) {
          const r = subpageResults[i];
          if (r.status === "fulfilled" && r.value) {
            const path = (() => {
              try { return new URL(subpageUrls[i]).pathname; } catch { return subpageUrls[i]; }
            })();
            gathered.push({ label: `${path} (${subpageUrls[i]})`, content: r.value });
            pagesRead++;
          }
        }
        if (pagesRead > 0) {
          emit("progress", {
            step: `Explored ${pagesRead} additional page${pagesRead > 1 ? "s" : ""}`,
            phase: "research",
          });
        }

        // ── Phase 3: Competitive triangulation ────────
        emit("progress", { step: "Searching for recent news", phase: "search" });
        const news = await webSearch(`${orgName} news strategy announcements 2024 2025`);
        if (news) gathered.push({ label: "Recent news and announcements", content: news });

        emit("progress", { step: "Researching leadership and positioning", phase: "search" });
        const leadership = await webSearch(`${orgName} CEO leadership executive team founders`);
        if (leadership) gathered.push({ label: "Leadership and team research", content: leadership });

        emit("progress", { step: "Mapping competitive landscape", phase: "search" });
        const competitorQuery = competitors
          ? `${competitors} strategy messaging positioning 2024 2025`
          : `${domain} competitors alternatives comparison ${industry || ""}`.trim();
        const competitive = await webSearch(competitorQuery);
        if (competitive) gathered.push({ label: "Competitive landscape research", content: competitive });

        if (industry) {
          emit("progress", { step: `Researching ${industry} market signals`, phase: "search" });
          const industrySignals = await webSearch(`${industry} strategic trends challenges AI 2025`);
          if (industrySignals) gathered.push({ label: "Industry and market signals", content: industrySignals });
        }

        // ── Phase 4: Analysis ──────────────────────────
        emit("progress", { step: "Reviewing collected intelligence", phase: "analysis" });

        const researchBlock = gathered
          .map((g) => `### ${g.label}\n\n${g.content}`)
          .join("\n\n---\n\n");

        const contextLines: string[] = [];
        if (organizationName) contextLines.push(`Organization Name: ${organizationName}`);
        if (industry)         contextLines.push(`Industry or Sector: ${industry}`);
        if (competitors)      contextLines.push(`Known Competitors: ${competitors}`);
        if (strategicQuestion) contextLines.push(`Strategic Question: ${strategicQuestion}`);
        const contextBlock = contextLines.length > 0
          ? `\n\nCONTEXT PROVIDED BY SUBMITTER:\n${contextLines.join("\n")}`
          : "";

        const prompt = `You are a senior strategic analyst at BBTx Consulting. You have spent decades advising leadership teams at mid-market and large organizations. Your analysis is known for being observational, precise, and occasionally uncomfortable. You surface what is visible but not obvious. You do not summarize. You investigate.

You have gathered ${gathered.length} sources on ${orgName}. Your task is to produce a Strategic Snapshot that makes an experienced executive think: "Interesting. I hadn't thought about it that way."

Two tests apply to every sentence you write:
1. Could the client have written this themselves after reading their own website? If yes, cut it or reframe it.
2. Is this an inference or an observation? If it is an inference, hedge it explicitly. If you cannot point to specific evidence, do not include it.

You should be 15-20% more skeptical than feels natural. Phrases like "the geographic distribution suggests a loosely affiliated network" are inferences, not observations. Say "the geographic listing on the site may reflect an affiliated model, though the depth of capacity at each location cannot be determined from public information." That is more honest and more useful.

RESEARCH (${gathered.length} sources):
${researchBlock}${contextBlock}

Return ONLY valid JSON with this exact shape. No explanation, no markdown fences, no text before or after the JSON.

{
  "snapshotTitle": "Strategic Snapshot: ${orgName}",

  "publicPositioning": {
    "summary": "Do NOT describe what this organization does. Answer: why would a buyer choose this organization over alternatives? What specific claim is being made beyond category membership? What is absent from the messaging that a sophisticated buyer might expect? Write 2-3 sentences. At least one sentence should name something absent or understated, not just present. Third person, present tense. Hedge where you are inferring.",
    "visibleSignals": [
      { "label": "A specific observable signal — what the public presence reveals about how the organization thinks about itself, not what it does", "score": 4 }
    ]
  },

  "marketAndCompetitiveSignals": {
    "summary": "Do NOT list who the competitors are. Answer two questions: (1) What are competitors in this space emphasizing that this organization is not emphasizing in its public positioning? (2) What signals are competitors sending that buyers may find easier to evaluate — proof, credentials, outcomes, case studies, pricing transparency? 1-2 sentences. Be specific about what is present elsewhere and absent here.",
    "signals": [
      { "label": "A specific gap: something competitors appear to be emphasizing or demonstrating publicly that this organization is not — or vice versa", "score": 3 }
    ]
  },

  "strategicTensions": [
    {
      "label": "Short title — a genuine conflict between two legitimate strategic commitments, not a generic management tradeoff",
      "observation": "What you actually see in the evidence. Be specific. Cite something observable — a claim on the website, a pattern in how services are described, a gap between what is said and what is demonstrated. Do not infer beyond the evidence.",
      "implication": "Why this tension matters strategically. What it may mean for execution, scale, or buyer perception. One to two sentences. This should be the kind of observation that reframes how the executive sees a problem they already know about — not a new problem, but a new frame for an existing one.",
      "score": 4
    }
  ],

  "leveragePoints": [
    {
      "label": "Name of the leverage point — specific to this organization, not a generic category",
      "description": "What makes this a leverage point for this specific organization. What structural advantage, underexploited asset, or positioning opportunity is visible in the evidence. Where would one change create the most downstream impact. If AI is relevant, frame it as leverage, not as a tool category.",
      "score": 4
    }
  ],

  "leadershipQuestions": [
    {
      "question": "A question a thoughtful board member or incoming CEO would ask. Uncomfortable but not hostile. It must reveal whether the executive team has clarity on something outsiders cannot see. It must NOT be answerable from the website. The best questions reframe something the leader thinks is one kind of problem as possibly being a different kind of problem.",
      "category": "Strategy"
    }
  ],

  "investigateFurther": [
    {
      "area": "The specific thing that needs to be understood before any serious recommendation can be made",
      "reason": "Why this gap matters. What it could reveal or change about the strategic picture."
    }
  ],
${strategicQuestion ? `
  "throughTheLensOfYourQuestion": {
    "question": "${strategicQuestion}",
    "relevantEvidence": [
      "A specific observation from the research that directly bears on this question — cite what you see, not what you infer"
    ],
    "embeddedAssumptions": [
      "An assumption embedded in the framing of the question that is worth surfacing before answering it — something the questioner may be treating as settled that is worth examining"
    ],
    "whatPublicDataSuggests": "What the available evidence actually indicates about this question. Be honest about confidence level. Hedge inferences explicitly. 2-3 sentences. Do not restate general findings — answer the specific question asked.",
    "whatRequiresInternalAccess": "What cannot be determined from public information that would materially change the answer to this question. Name the specific data, interviews, or internal documents needed. 1-2 sentences."
  },
` : ""}
  "ifWeHadToBet": {
    "hypothesis": "One bold, specific hypothesis about the single most important strategic constraint or inflection point this organization faces — based solely on the evidence gathered. This should be a perspective shift: not just 'they have a growth problem' but 'the growth constraint may not be what they think it is.' It should be the kind of sentence that makes an executive pause. One to two sentences. Hedge appropriately — this is a hypothesis, not a verdict.",
    "evidence": [
      "A specific piece of evidence from the research that supports this hypothesis — something observable, not inferred"
    ],
    "whatWouldProveUsWrong": "One sentence. What would you need to see or learn to change this hypothesis? Be honest about the limits of what public information can reveal."
  },

  "whatWeCannotKnow": [
    "A specific limitation — something that cannot be determined from public information and would materially affect any strategic assessment of this organization"
  ],

  "recommendedNextStep": "One sentence. Honest advice from a senior advisor who has seen this situation before. Not a sales pitch. Specific to what the research actually revealed. The kind of thing a trusted advisor would say over coffee, not in a slide deck.",

  "disclaimer": "This snapshot is based on ${gathered.length} publicly available sources${fetchSucceeded ? " including the organization website" : ""}. It is a surface-level analysis designed to generate strategic hypotheses worth exploring, not to provide definitive conclusions.",

  "sourcesUsed": ${JSON.stringify(gathered.map((g) => g.label))}
}

REQUIREMENTS:
- visibleSignals: 4-6 items. Scores must genuinely vary — not all 4s.
- signals (competitive): 3-5 items. Each must name a specific gap, not a general observation. "Competitors in this space tend to lead with outcome-based case studies; this organization does not appear to do so publicly" is a useful signal. "The competitive market is active" is not.
- strategicTensions: 3-5 items. MOST IMPORTANT SECTION. Must be grounded in specific evidence. Must create a perspective shift — the reader should think "I knew about this situation but I hadn't named it as a tension." Generic tensions like "balancing growth with quality" are forbidden. Each tension should be the kind of thing a partner at a consulting firm might say quietly after reviewing the company.
- leveragePoints: 4-6 items. Not AI feature lists. Structural advantages, underexploited assets, positioning opportunities visible in the evidence.
- leadershipQuestions: 5-7 items. Categories: Strategy, Operations, AI, Culture, Market. Must be specific to this organization's situation. The best questions reframe — they suggest the problem the leader thinks they have might actually be a symptom of a different problem.
- investigateFurther: 4-6 items.
${strategicQuestion ? `- throughTheLensOfYourQuestion: Required since a strategic question was provided. relevantEvidence: 2-4 items, each citing a specific observable fact from the research. embeddedAssumptions: 1-3 items that name something the questioner may be taking for granted. whatPublicDataSuggests must be specific to the question asked, not a restatement of general findings. whatRequiresInternalAccess must name the specific gap — not "more information" but what kind.
` : ""}- ifWeHadToBet: Exactly 1 hypothesis, 2-4 evidence items, 1 refutation condition. This is the section that turns a good report into a memorable one. It should make the executive think "huh... maybe we should talk about this." Do not make it generic. Do not soften it into meaninglessness.
- whatWeCannotKnow: 4-6 items.

VOICE:
- Calm, precise, observational. No hype, no em dashes, no semicolons, no exclamation points.
- Hedge inferences explicitly: "appears to," "may suggest," "the public record indicates," "worth examining whether," "cannot be confirmed from available sources."
- Be more skeptical than feels comfortable. If a sentence sounds like something you could say about any company in the industry, it should not be in this report.
- Every observation must be traceable to something specific in the research.
- The goal: at least one moment where the executive thinks "interesting — I hadn't named it that way." Everything else in the report exists to build toward that moment.`;

        emit("progress", { step: "Generating strategic analysis", phase: "analysis" });

        const message = await anthropic.messages.create({
          model: MODEL,
          max_tokens: 8000,
          messages: [{ role: "user", content: prompt }],
        });

        const textBlock = message.content.find((b) => b.type === "text");
        if (!textBlock || textBlock.type !== "text") throw new Error("No text response");

        emit("progress", { step: "Preparing your snapshot", phase: "analysis" });

        const snapshot = parseJson(textBlock.text);
        emit("result", { snapshot, fetchSucceeded, sourcesCount: gathered.length });

      } catch (err) {
        console.error("[digital-twin-snapshot]", err);
        emit("error", {
          message: err instanceof Error ? err.message : "Failed to generate snapshot. Please try again.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
