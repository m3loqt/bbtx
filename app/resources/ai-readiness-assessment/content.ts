// Content and publishing state for /resources/ai-readiness-assessment.
//
// COPY SOURCE: the final editorial draft supplied as ai-readiness-page-copy-clean.md.
// The wording below is that draft, verbatim. Do not paraphrase or "optimise" it
// here; send edits through the editorial process instead.
//
// EDITORIAL STATUS: APPROVED. Dr. Grant Tate approved this guide for publication
// under his name (relayed by Mel, 2026-11-18), including the first-person passages
// (the opening paragraph, Question 9). The twelve questions and the "what the
// answers reveal" guidance are an editorial starting point, not a validated or
// proprietary BBTx instrument; keep any future copy changes going through the
// editorial process rather than editing the wording below.

export const GUIDE_PATH = "/resources/ai-readiness-assessment";

export const GUIDE_TITLE =
  "AI Readiness Assessment: 12 Questions Leaders Should Answer Before Investing in AI";

export const GUIDE_SEO_TITLE = "AI Readiness Assessment: 12 Questions for Leaders | BBTx";

export const GUIDE_DESCRIPTION =
  "Use these 12 AI readiness questions to uncover gaps in leadership, governance, workflows, capability, and performance before making major AI investments.";

/**
 * Attribution gate. true: the byline reads BYLINE_APPROVED (linking to
 * /team/grant) and the Article schema author is Grant's Person entity. Setting
 * it back to false falls back to a neutral "By BBTx Consulting" byline and the
 * Organization as author, e.g. if the approval is ever withdrawn.
 */
export const GUIDE_AUTHOR_APPROVED_BY_GRANT = true;

/**
 * First publication date (YYYY-MM-DD). The guide has never been published
 * before, so there is deliberately no dateModified and no "Updated" label. If
 * the release date ever changes before deploy, change this one constant.
 */
export const GUIDE_DATE_PUBLISHED = "2026-11-19";

export const BYLINE_NEUTRAL = "By BBTx Consulting";
export const BYLINE_APPROVED = { name: "Dr. Grant Tate", role: "Founder, BBTx Consulting" };
export const BYLINE_STATS = "12 questions, 5 dimensions";

export const OPENING = [
  `I have watched capable leadership teams leave a meeting with a decision everyone supported, then return a month later to find that little had moved. Usually the decision itself was sound. What was missing was an organization prepared to act on it.`,
  `Decisions about AI face the same test.`,
  `Buying AI tools is the comparatively easy part. A contract can be signed and licenses switched on within weeks. The harder part is whether the organization can decide who owns the result, use its information responsibly, change how work actually gets done, and tell whether any of it helped.`,
];

export const OPENING_LEAD = `An AI readiness assessment examines whether your organization, not only your technology, is prepared to use AI well.`;
export const OPENING_LEAD_REST = `The twelve questions below are a practical way for a leadership team to begin that examination. They are not a test with a score. They are meant to show where your plans rest on evidence and where they rest on assumptions, while changing course is still inexpensive.`;

export const WHAT_IT_EXAMINES_INTRO = `A readiness assessment looks less at the software than at the conditions around it. The questions in this guide examine five areas, in this order:`;

export const WHAT_IT_EXAMINES_AFTER = [
  `A formal assessment goes further. It compares what leaders believe is happening with what people actually experience. Both groups are usually describing what they honestly see. They simply see the organization from different vantage points. The distance between those two views is often the most useful thing an assessment finds.`,
  `This guide offers a structured place to start, before that step or instead of it.`,
];

export const HOW_TO_USE_BEFORE = [
  `Don't answer these alone.`,
  `Bring together three perspectives: leadership, the people who do the day-to-day work, and whoever is responsible for risk, data or IT. Ask each person to answer separately first, then compare.`,
  `When the answers don't match, don't smooth it over. The disagreement is the finding.`,
  `For each question, sort the answer into one of three categories:`,
];

export const EVIDENCE_LEVELS = [
  {
    label: "Evidence",
    description: `You can point to something: a document, a measurement, a recorded decision, or something you observed directly.`,
  },
  {
    label: "Assumption",
    description: `You believe it is true, and you may be right, but no one has checked.`,
  },
  {
    label: "Unknown",
    description: `No one in the room can say, or people give different answers.`,
  },
];

export const HOW_TO_USE_AFTER = [
  `It is tempting to add the results into a single score. Resist that. A missing owner matters more than three well-documented workflows, and a total would hide the difference. The purpose is to see where the organization is relying on assumptions.`,
  `These questions will not tell you whether to adopt AI. That decision belongs to you. They are intended to help you make it on evidence rather than on momentum.`,
];

export type Question = {
  number: number;
  question: string;
  body: string;
  /** Text after the "Evidence looks like:" label. */
  evidence: string;
};

export type Dimension = {
  id: string;
  name: string;
  /** One-line description shown in "What an AI readiness assessment actually examines". */
  summary: string;
  questions: Question[];
};

export const DIMENSIONS: Dimension[] = [
  {
    id: "leadership",
    name: "Leadership",
    summary: `Is there a real problem worth solving, a person who owns the result, and a willingness to give something up to make room for the work?`,
    questions: [
      {
        number: 1,
        question: `What specific business decision, service problem, or operating constraint should AI help improve?`,
        body: `"Use AI" is an intention, not an objective. Without a defined problem, attention tends to drift toward whichever tool is most visible, and months later no one can say whether the effort worked. Naming the problem also tells you who should be involved and what should be measured.`,
        evidence: `a problem statement a manager could repeat without notes, with a recent example of what it cost the organization in time, money or quality.`,
      },
      {
        number: 2,
        question: `Who is accountable for the result, not merely for choosing the tool?`,
        body: `Selecting a vendor and owning an outcome are different jobs. In many organizations the first has a name attached and the second does not. That is rarely anyone's intention. Responsibility for results is easy to assume and hard to assign, especially when the work crosses departments.`,
        evidence: `one named person with the authority to change the workflow, who is expected to report on results.`,
      },
      {
        number: 3,
        question: `What will the organization stop doing to make room for this work?`,
        body: `New initiatives arrive on top of full calendars. If nothing is removed, AI competes with the day job, and the day job usually wins. When an effort does succeed under those conditions, it is often because a few people carried it on their own time. That kind of success is hard to repeat, and it tends to cost the organization some of its best people.`,
        evidence: `a specific task, report, approval step or priority being retired, and a manager who has agreed to the trade-off.`,
      },
    ],
  },
  {
    id: "governance",
    name: "Governance",
    summary: `Does the organization know what information AI may use, who approved that use, and who catches mistakes?`,
    questions: [
      {
        number: 4,
        question: `What information will AI use, and who has approved that use?`,
        body: `In many organizations, staff are already using AI tools with client, employee or financial information, often with good intentions and without clear guidance. That is less a question of discipline than of governance arriving late. Agreeing on the rules after the habits have formed is much harder than agreeing on them first.`,
        evidence: `a list of the information involved, the decision that permits its use, the person who made that decision, and any contractual or regulatory limits.`,
      },
      {
        number: 5,
        question: `Who notices and corrects an AI output that is wrong, incomplete, or inappropriate?`,
        body: `Obvious errors are often caught. The harder problem is an answer that appears reasonable enough that no one thinks to check it. Over time, people may quietly stop checking the outputs that usually look fine. A useful question for any leadership team is simple: what have we stopped verifying?`,
        evidence: `a defined review step, a person responsible for it, and a way for staff to raise a problem without blame.`,
      },
    ],
  },
  {
    id: "workflows",
    name: "Workflows",
    summary: `Do leaders understand how the work actually happens, and is the information behind it reliable?`,
    questions: [
      {
        number: 6,
        question: `How does the work actually happen today, including handoffs and exceptions?`,
        body: `Most organizations have two versions of their processes: the one on the chart and the one people actually use, with its workarounds and judgment calls. The workarounds usually exist for good reasons. AI designed around the documented version will meet the real one on its first day.`,
        evidence: `a description from the people who do the work, not only their managers, including the cases that fall outside the standard path.`,
      },
      {
        number: 7,
        question: `Is the information used in that work accurate, current, and available to the people who need it?`,
        body: `AI works with whatever it is given. Outdated records, inconsistent definitions and untested assumptions do not disappear when they pass through a model. They can come back well written and wrong, which is harder to spot than an obvious mistake.`,
        evidence: `a recent spot check of the key records, clarity on where the authoritative version lives, and an honest view of who cannot reach what they need.`,
      },
      {
        number: 8,
        question: `What changes when someone acts on an AI recommendation?`,
        body: `A recommendation matters only if it changes a decision, a handoff or a conversation with a customer. If no one has worked out what happens next, the output becomes one more thing to read, and most people already have enough of those.`,
        evidence: `a walk-through of the step after the AI output: who receives it, what they do with it, and what changes downstream.`,
      },
    ],
  },
  {
    id: "capability",
    name: "Capability",
    summary: `Do people, and the managers who guide them, have the judgment to use AI well, and to recognize when not to rely on it?`,
    questions: [
      {
        number: 9,
        question: `Do the people involved know when an AI answer should not be trusted?`,
        body: `I use AI in my own writing. The suggestions arrive quickly. Deciding which of them belong takes longer, and that part of the work has to remain mine. The same is true in any organization. People need practical judgment about where a tool is reliable in their own field and where it is not. It also helps to use the tool to test thinking rather than only to confirm it, for example by asking it to make the strongest case against a proposal.`,
        evidence: `examples staff can describe of AI output they questioned or rejected, and a shared sense of which tasks deserve a second look.`,
      },
      {
        number: 10,
        question: `Are managers prepared to reinforce the new way of working?`,
        body: `What managers do after an announcement usually matters more than the announcement itself. People pay close attention to what their managers ask about, notice and reward. If supervisors are uncertain or skeptical, the new workflow tends to slide back into the old one. This is not necessarily resistance. People are adapting to the system they actually work in.`,
        evidence: `managers who can explain the change in their own words, know what good use looks like, and have time set aside to coach it.`,
      },
    ],
  },
  {
    id: "performance",
    name: "Performance",
    summary: `Will the organization be able to tell whether any of this helped, and will it act on what it learns?`,
    questions: [
      {
        number: 11,
        question: `What can we measure before any AI intervention begins?`,
        body: `Without a starting point, any improvement is a story rather than evidence. Baselines are easiest to collect before the work changes. Afterward, everyone's memory improves.`,
        evidence: `one or two measures tied to the problem in Question 1, such as cycle time, error rate, rework or workload, with today's figures written down.`,
      },
      {
        number: 12,
        question: `What evidence would make us continue, change course, or stop?`,
        body: `Agree on this before the pilot begins and before it becomes attached to anyone's reputation. Otherwise, a pilot may continue simply because stopping feels like failure. Ending a pilot that is not working is a legitimate decision, and often a wise one.`,
        evidence: `written signals or thresholds agreed in advance by the accountable owner and those funding the work, with a date to review them.`,
      },
    ],
  },
];

export const PATTERNS_INTRO = `Look for patterns in where your answers fall, rather than counting them.`;

export const PATTERNS = [
  {
    name: `Mostly evidence, few unknowns`,
    meaning: `You likely have enough grounding to scope a small, bounded pilot, and the remaining work is design and sequencing. One caution: a single unresolved governance or privacy issue can still be reason enough to wait, however strong the other answers are.`,
  },
  {
    name: `Many assumptions`,
    meaning: `This is the most common result, and it is manageable. Identify the two or three assumptions that would most change your decision if they proved wrong, and test those first.`,
  },
  {
    name: `Unknowns clustered in one area`,
    meaning: `The cluster shows where to look next. Unknowns in governance suggest pausing before sensitive information is involved. Unknowns in workflows suggest observing the real work before designing anything around it.`,
  },
  {
    name: `Unknowns in Questions 1 to 3`,
    meaning: `If the problem, the owner or the trade-off is unclear, choosing a tool is premature. More technology is unlikely to resolve what is essentially a leadership question.`,
  },
  {
    name: `Leaders and staff answer differently`,
    meaning: `Treat this as a finding rather than a disagreement to settle. It usually means the work happens differently from how leaders believe it does, which is far better learned now than after something has been built on top of it.`,
  },
];

export const PATTERNS_AFTER = `None of these patterns is a verdict. Each is a prompt for the next conversation, and the right response depends on the size of the decision and the cost of being wrong.`;

export const DECISION_INTRO = [
  `Before committing budget, write the decision down on a single page. If the accountable owner cannot complete a line, that is useful information.`,
  `Keep the page. Once a pilot is under way, people often remember its original purpose differently, and a written record helps.`,
];

export const DECISION_RECORD = [
  {
    field: "Business problem",
    prompt: `The specific decision, service problem or constraint AI is meant to improve (Question 1)`,
  },
  {
    field: "Current reality",
    prompt: `How the work happens today, including handoffs, exceptions and the condition of the information (Questions 6 and 7)`,
  },
  {
    field: "Accountable owner",
    prompt: `One named person responsible for the result, with authority to change the workflow (Question 2)`,
  },
  {
    field: "Information and risks",
    prompt: `What information is involved, who approved its use, and who catches errors (Questions 4 and 5)`,
  },
  {
    field: "Starting measure",
    prompt: `The baseline you will compare against, recorded before anything changes (Question 11)`,
  },
  {
    field: "Pilot boundaries",
    prompt: `Which team, which tasks, how long, and what is deliberately left unchanged`,
  },
  {
    field: "Continue, adjust or stop",
    prompt: `The evidence that would lead to each outcome, agreed in advance, and the review date (Question 12)`,
  },
];

export const NEXT_STEPS = {
  first: `If most of your answers are evidence, and no critical governance or privacy question remains open, you may not need outside help. A tightly scoped pilot, guided by the decision page above and reviewed honestly, is a reasonable next step.`,
  secondBeforeAssessment: `If many answers are assumptions or unknowns, particularly in leadership and governance, or if leaders and staff describe the work differently, a closer look may be worth taking before major spending. That is the purpose of our`,
  assessmentLinkText: `organizational and AI readiness assessment`,
  secondBetweenLinks: `. If your question is broader, such as how AI should fit your strategy, governance and day-to-day work, our`,
  integrationLinkText: `AI Integration & Innovation`,
  secondAfterIntegration: `service addresses it.`,
  third: `A useful last test: picture the week after your leadership team approves an AI initiative. Who does something differently on Monday? If that is hard to answer, the twelve questions above are a good place to start.`,
};

export const CTA = {
  heading: `Want a second perspective on your answers?`,
  assessmentLinkText: `Explore the organizational assessment`,
  connector: `or`,
  conversationLinkText: `schedule a conversation with Grant`,
  conversationHref: "https://www.calendly.com/granttate",
};
