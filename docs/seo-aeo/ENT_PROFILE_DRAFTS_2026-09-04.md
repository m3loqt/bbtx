# Off-Site Profile Corrections — Draft Copy — 2026-09-04

Paste-ready corrections for **ENT-002 (Chamber)**, **ENT-003 (LinkedIn)**, and **GBP-002 (Google Business Profile)**, all derived from one canonical entity block. Prompted by the AEO baseline (`AEO_BASELINE_2026-09-04.md`), which showed the practice appearing under six different names with the Chamber pointing at a Circle.so URL and a live "AI Explorers" checkout.

**Nothing here goes live until Grant confirms the items in "The gate" (bottom).** Claude cannot access these accounts.

---

## 0. Canonical entity block (seed for ENT-001)

Use these exact strings everywhere. Do not paraphrase per-platform.

| Field | Value | Status |
|---|---|---|
| Public name | **BBTx Consulting** | `CONFIRM` — is this the exact name to use everywhere? Legal entity vs. DBA vs. "BBTx.AI"? Is "The Bridge LTD" still the registered entity? |
| Website | **https://www.bbtx.ai** | confirmed (canonical, `www`) |
| Founder / leader | **Grant Tate** (no honorific — the site uses none, and the doctorate is unverified per AUT-001 pt. 5) | `CONFIRM` — founder or co-founder? Cvillepedia says "co-founder and CEO of The Bridge, Ltd" |
| Phone | (434) 466-4655 | `CONFIRM` — current, and correct for a public listing? |
| Location | Charlottesville, Virginia | address `CONFIRM` — see GBP section |
| Service area | Central Virginia; works nationally | confirmed direction (report p. 20) |

**One-line descriptor:**
> Charlottesville-based strategy, leadership, and organizational development consulting, led directly by Grant Tate.

**Standard short description (~60 words) — for GBP, Chamber, directories:**
> BBTx Consulting is a Charlottesville-based practice led by Grant Tate. We help leadership teams set strategy, understand what's really happening inside their organization, strengthen how they lead, and carry change through to implementation. Every engagement is led directly by Grant, drawing on four decades of executive and organizational experience. We serve organizations across Central Virginia and work nationally.

**Standard specialties / service list** (matches the live site's pages):
Strategic planning & advisory · Organizational assessment & analysis · Leadership & team development · Implementation & change support · Executive coaching · Executive recruitment assessment · AI integration *(one service, listed last — never the primary identity)*

---

## 1. Charlottesville Regional Chamber (ENT-002)

**Current state** (fetched 2026-09-04, re-confirmed live 2026-09-05, `cvillechamber.chambermaster.com/list/member/bbtx-consulting-12801`):

| Field | Current (wrong) |
|---|---|
| Website | `https://chaotic-confluence.circle.so/chaotic-confluence` |
| Description | "We are experienced business coaches with deep experience in developing successful organizations with focus on transforming organizations through visionary leadership and AI applications." |
| Header link | "Learn How to Get Real Results from AI" → `ai_explorers.circle.so/checkout/ai-explorer-full-membership` |
| Categories (8) | Consultants · Coaching - Business · Coaching - Personal & Professional Success · Consultancy & Development · Consultant: Strategic Planning · Consultants: Business & Information Technology · Consultants: Business Performance Improvement · Consultants: Educational |
| **Primary Contact** | **"Dr. Grant Tate, CEO/Managing Director"** — new finding, 2026-09-05 |
| Social links | LinkedIn (`granttate`), Facebook (`author.grant.tate`) |
| Address | 184 Brookwood Dr., Charlottesville, VA 22902 (same address flagged in OPEN-011 item 3) |

**Corrections:**

- **Website →** `https://www.bbtx.ai`
- **Remove entirely:** the "AI Explorers" checkout link and the "Learn How to Get Real Results from AI" header CTA. Also the "Join our webinars & classes" membership link.
- **Primary Contact title →** "Dr. Grant Tate, Founder" — **"Dr." confirmed accurate 2026-09-05** (AUT-001 conflict #5 resolved, Grant confirmed he holds a doctorate; specific institution/degree/year still unconfirmed, but the honorific itself is fine to keep). Only drop "CEO/Managing Director" → "Founder," matching every other draft in this doc and sidestepping the still-open founder-vs-co-founder question with the one title everything else already uses.
- **Description →**
  > BBTx Consulting is a Charlottesville-based practice led by Grant Tate. We help leadership teams set strategy, assess what's really happening inside the organization, develop leaders and teams, and carry change through to implementation — with more than 40 years of executive and organizational experience behind every engagement. Serving Central Virginia and beyond.
- **Categories — keep only:** Consultant: Strategic Planning · Consultants · Consultancy & Development · Coaching - Business
- **Categories — drop:** Consultants: Business & Information Technology · Consultants: Educational · Consultants: Business Performance Improvement · Coaching - Personal & Professional Success *(each narrows or misdescribes the practice)*
- **Categories — add if the Chamber offers them** (`CONFIRM` available list in the member dashboard): Consultants: Management · Consultants: Organizational Development · Consultants: Leadership Development
- **CTA buttons →** "Schedule a consultation" (→ bbtx.ai or the Calendly link) and "Explore our services" (→ `https://www.bbtx.ai/services`)
- **Social links →** confirm `linkedin.com/in/granttate` is Grant's actual current personal profile (not a dormant duplicate) before leaving it linked — worth checking against the ENT-003 "dormant R. Grant account" question, since the handle matches. Facebook (`author.grant.tate`) looks intentional (memoir/author persona) — probably fine as-is, Grant's call.

There is also a second, un-editable auto-directory entry at `business.cvillechamber.com` — updating the member profile should propagate; verify after.

---

## 2. LinkedIn company page (ENT-003)

**Found 2026-09-04:** the page is `https://www.linkedin.com/company/bridgebusinesstransformations/` — 37 followers, industry "Business Consulting and Services", location Charlottesville VA, "R. Grant works here". Name is **already "BBTx Consulting"** but the URL slug, tagline ("Exploring AI for Professionals"), and cover image ("Explorations in AI") are the old AI-first branding.

**Access:** Grant is **not** an admin. The likely admin is a lost/dormant Grant account ("R. Grant"). Mel filed a LinkedIn admin-access request 2026-09-04. Fastest paths: (a) recover the old account, add current accounts as admins; (b) the pending request — succeeds far more easily if Grant's personal profile lists "BBTx Consulting" as a **current** position linked to this page (LinkedIn uses employment as claim proof); (c) LinkedIn support for an unmanaged page, same employment-proof requirement.

**Do not create a new company page** — this one has the followers and the existing Google cross-reference.

**Once admin:**
- Change the public URL → `linkedin.com/company/bbtx-consulting` (LinkedIn redirects the old one; 37 followers = negligible risk)
- Replace the cover image (drop "Explorations in AI")
- Apply the tagline / About below

- **Tagline (≤120 char) →**
  > Strategy, leadership, and organizational development consulting — led directly by Grant Tate. Charlottesville & beyond.
- **About (≤2,000 char) →**
  > BBTx Consulting is a Charlottesville-based practice led by founder Grant Tate.
  >
  > We work with leadership teams on the decisions that shape an organization: setting strategy, understanding what's really happening inside the organization, developing leaders and teams, and carrying change through to implementation. Every engagement is senior-led — you work directly with Grant, not a junior team — and the approach is built around your situation rather than a fixed framework.
  >
  > Grant has spent more than four decades leading and advising organizations through consequential change, from corporate leadership at IBM to strategic planning and organizational work with businesses, nonprofits, and public institutions across Virginia.
  >
  > AI is one capability we bring to the work, used where it genuinely helps with research, assessment, and workflow design. It is not the practice.
  >
  > Based in Charlottesville, Virginia. Serving Central Virginia and working nationally.
- **Specialties →** Strategic planning, Organizational assessment, Leadership development, Team development, Change implementation, Executive coaching, Executive recruitment assessment, AI integration
- **Website →** `https://www.bbtx.ai`
- **Location →** Charlottesville, Virginia (`CONFIRM` street vs. metro-only)

### 2a. Grant's personal LinkedIn profile — draft (OUT OF SCOPE, 2026-09-05)

**Dropped from this project 2026-09-05 (Mel's call).** Grant's personal profile is his own decision, not a business listing this project corrects. Kept below only as a reference in case Grant wants it later — untracked, no follow-up. The one piece that *did* ship (adding "BBTx Consulting" as current experience, on both Grant's and Mel's profiles) was about unblocking the company-page admin claim, not rewriting his profile, and stays in scope under §2/ENT-003.

<details>
<summary>Original draft (reference only)</summary>

Grant should review and adjust anything about his own history; `CONFIRM` marks the AUT-001 open questions.

- **Headline (≤220 char) →**
  > Founder, BBTx Consulting — strategy, leadership, and organizational development for leaders facing consequential change. 40+ years, Charlottesville & nationally.
- **About (≤2,600 char) →**
  > I help leaders and organizations make better strategic decisions, align their people, and carry change through to implementation.
  >
  > Most of my work is with leadership teams facing something consequential — a strategy that isn't translating into action, a leadership team that keeps reopening the same decisions, an organization heading into a restructuring or a leadership transition. Engagements are senior-led: clients work with me directly, and the approach is built around their situation, not a fixed framework.
  >
  > I've been doing this work for more than four decades. I started in corporate leadership at IBM — including managing the introduction of the IBM PC across Europe and Canada — then built my own consulting practice, now BBTx Consulting, based in Charlottesville, Virginia. Since then I've led strategic planning and organizational work with businesses, nonprofits, and public institutions, including the strategic planning process for CATEC in the Charlottesville region.
  >
  > I write about strategy, leadership, and the human side of organizations at Chaotic Confluence, and I'm the author of "Hand on the Shoulder," lessons from my career on leadership and personal growth.
  >
  > AI is one capability I bring to the work — useful for research, assessment, and scenario work — but it isn't the practice. The practice is judgment.
  >
  > BBTx Consulting → https://www.bbtx.ai
- **Experience — current role →**
  - Title: **Founder** (`CONFIRM` — add "& CEO" if that's the title he uses)
  - Company: **BBTx Consulting** (`CONFIRM` exact name; `CONFIRM` start date — is this a renamed continuation of the earlier practice or a distinct 2023-ish entry?)
  - Location: Charlottesville, Virginia · Hybrid
  - Description:
    > Charlottesville-based strategy, leadership, and organizational development consulting. I work directly with leadership teams on strategy, organizational assessment, leadership and team development, and carrying change through implementation. Four decades of executive and organizational experience behind every engagement.
  - Earlier practice (`CONFIRM` founder vs. co-founder — Cvillepedia says "co-founder and CEO of The Bridge, Ltd"): keep the prior company entries as-is but make sure the company name and the "founder/co-founder" wording are consistent with whatever Grant confirms.
- **Featured section →** pin, in order: `https://www.bbtx.ai` · `https://www.bbtx.ai/team/grant` · one or two Chaotic Confluence posts · "Hand on the Shoulder" (its Gumroad/retail link)
- **Services (LinkedIn "Services" / "Providing services" field) →** Management Consulting · Business Consulting · Strategic Planning · Leadership Development · Executive Coaching · Change Management
- **Location →** Charlottesville, Virginia, United States
- **Industry →** Business Consulting and Services
- **Contact info →** website `https://www.bbtx.ai`; email `CONFIRM` (`grant@bbtx.ai`)

</details>

---

## 3. Google Business Profile (GBP-002)

Mel has manager access (GBP-001 resolved). Worked 2026-09-04.

**Applied 2026-09-04:**
- **Description** — replaced the keyword-stuffed original with the version below.
- **Primary category** — `Business management consultant`; **secondary** `Business development service` added.
- **Social profiles** — added the LinkedIn company URL (`linkedin.com/company/bridgebusinesstransformations/`); pending Google review.

**Applied 2026-09-05:**
- **Website** — changed `http://www.bbtx.ai/` → `https://www.bbtx.ai`
- **Social profiles** — removed `facebook.com/thebridgeltd` and `x.com/@thebridgeltd` (old entity name)
- **Hours** — changed "Open 24 hours" → Mon–Fri 9:00 AM–5:00 PM

**Still open:**
- **Service area** — change from "United States" to: Charlottesville · Albemarle · Fluvanna · Greene · Louisa · Nelson · Orange counties. **Hide the `184 Brookwood Dr` address** (service-area business — "Onsite services not available", appointment-only, residential-looking address). Needs Grant to confirm office-vs-home first (OPEN-011 item 3).
- **Veteran-owned / women-owned attributes** — both set; `CONFIRM with Grant` and remove either that isn't literally true (OPEN-011 item 4).
- Ignore: accessibility / amenities / parking / languages — auto-generated noise for a business with no walk-in location.

**Reference spec:**

- **Name →** BBTx Consulting (must match real-world name; **do not** append keywords)
- **Primary category →** `Business management consultant`
- **Secondary categories (only accurate ones that exist) →** Business development service · Consultant · Executive coach *(never "AI consultant" as primary)*
- **Description →**
  > BBTx Consulting is a Charlottesville-based management consulting practice led by Grant Tate. We work with leadership teams on strategic planning, organizational assessment, leadership and team development, and change implementation — helping leaders make better decisions, align their people, and carry strategy through to results. Every engagement is led directly by Grant, drawing on four decades of executive and organizational experience. Serving Charlottesville, Central Virginia, and organizations nationally.

  *(No URLs, no phone, no promotional superlatives — per GBP content rules. AI deliberately omitted; it goes in Services only.)*
- **Website →** `https://www.bbtx.ai` + UTM (`?utm_source=google&utm_medium=organic&utm_campaign=gbp`) once CON-002 lands a UTM convention
- **Services (add each with the one-line description from the site):**
  | Service | Description |
  |---|---|
  | Strategy & Advisory | Ongoing strategic clarity, alignment, and decision-making discipline for leadership teams. |
  | Organizational Assessment & Analysis | A clear, honest picture of what's working inside the organization and where focused action pays off. |
  | Leadership & Team Development | Practical coaching and team development that builds trust and better judgment. |
  | Implementation & Change Support | Turning strategy into action through sequencing, accountability, and reinforcement. |
  | Executive Coaching | Confidential 1:1 coaching for senior leaders, built around real decisions. |
  | Executive Recruitment Assessment | An independent way for search committees to evaluate executive finalists. |
  | AI Integration | Bringing AI into the work where it improves decisions and builds capability. |
- **Photos:** real founder / workshop / speaking / local-context imagery — not stock (report guardrail)
- **Do not** post for frequency; post real workshops, talks, publications only.

---

## 4. paradigmassociates.us — RESOLVED to "update," 2026-09-05

**Status update, 2026-09-05:** Mel has editing access to this site (works there). This resolves OPEN-011 item 5's "update vs. remove vs. leave" question in favor of **update** — no longer a dormant/competitor situation, so removal isn't the right call.

**Current live copy** (fetched 2026-09-05, `https://www.paradigmassociates.us/about-us/our-team/grant-tate`):

> Grant Tate is described as "founder and CEO of Bridge Business Transformations (BBx)" and "Bridgewater Research Group (BRG)," characterized as "a leading provider of distance education in the European Union." He is identified as a "highly experienced business leader and coach" specializing in transforming complex organizations and developing growth-oriented executives in high-tech companies... Prior to founding his own firms, Tate held executive positions at IBM, including Director of Organization for the Systems Products Division and Director of Manufacturing Planning. He has also served as a university faculty member, Executive Director of the Connecticut Institute of Technology, and co-founder of two innovation centers for high-tech startups.
>
> Email: author.grant.tate@gmail.com · Phone: 434-466-4655 · Location: Charlottesville, VA 22902
> Memoir *Hand on the Shoulder* (2022), linked at handontheshoulder.com

**Applied and live-verified 2026-09-05.** Mel made the edit; fetched the live page to confirm — current text reads "He is the founder of [BBTx Consulting](https://www.bbtx.ai/), a company that helps businesses thrive in the 21st century, and Bridgewater Research Group (BRG)...". Link confirmed pointing to `https://www.bbtx.ai/`. One minor observation, not flagged as a problem: the phrase "a company that helps businesses thrive in the 21st century" reads as generic filler — unclear if it's new or was already there and lost in the first fetch's summarization; low stakes either way since it's third-party copy, not bbtx.ai's own, so the addendum's copy rules don't directly govern it. Mention to Mel only as a "worth a glance" item, not a fix.

Phone (434-466-4655) on that page matches BBTx's own listed number independently — corroborating, not a conflict. BRG line and everything else left untouched, as recommended.

**Do NOT touch without asking Grant first — two things here I can't verify or safely assume:**

1. **"Bridgewater Research Group (BRG)" / "distance education in the European Union"** — no idea if this is still active, related to BBTx, or a separate business entirely. Don't fold it into BBTx or remove it on a guess.
2. **"Executive Director of the Connecticut Institute of Technology"** — checked 2026-09-05 via web search. A "Connecticut Institute of Technology" does exist, but it's a University of New Haven cybersecurity/CS/data-science hub that **launched in 2020** — decades after the timeframe this bio places the role in ("prior to starting his own firms"). Can't be the same thing. A second search returning what looked like confirmation traced back to the same single source (paradigmassociates.us itself) — not independent corroboration, just an AI search summary echoing the one unverified page. Likely an error, possibly confused with CATEC (Charlottesville-Albemarle Technical Education Center, VA — the real institution AUT-001's research found, a 2013 strategic-planning client relationship, not an executive role). This doesn't match anything in `AUT-001_RESEARCH_BRIEF.md` either way. Flag for Grant, don't correct or repeat elsewhere until he confirms.
3. Founder vs. co-founder is still the open AUT-001 conflict (Cvillepedia says "co-founder and CEO of The Bridge, Ltd") — the recommended edit above uses "founder" only because that's what every other draft in this doc already uses, not because it's confirmed.

- **Owner:** Grant (facts above), Mel (has access to execute once Grant confirms #1 and #2).

---

## 4a. Cvillepedia (ENT-004) — checked 2026-09-05, not yet actioned

`https://www.cvillepedia.org/Grant_Tate` — a public, community-editable wiki (visible `[edit]` link, no special account ownership implied). Currently reads: "co-founder and CEO of **The Bridge, Ltd**," no link to bbtx.ai or any external site, flagged on the page itself as a stub needing expansion. Only other content: a note on Grant leading CATEC's 2013–14 strategic planning process, with linked PDFs — this corroborates AUT-001's own CATEC research independently.

**Recommended edit — same shape as paradigmassociates.us:**
- "The Bridge, Ltd" → "BBTx Consulting," linked to `https://www.bbtx.ai`
- **Do NOT touch "co-founder"** — this is literally the open AUT-001 conflict (Cvillepedia is one of the two sources claiming co-founder, the other being Grant's own memory/records per the research brief). Changing it without Grant's answer would be guessing on the exact fact in dispute, not correcting an error.
- Everything else (CATEC content, stub-expansion note) can stay — it's accurate and worth leaving.

**Owner:** whoever has (or creates) a Cvillepedia account — unclear if that's Mel, Grant, or needs a new signup. Not yet actioned.

## 5. Follow-on (Claude, after profiles are corrected)

Once Chamber / LinkedIn company / GBP / Cvillepedia are consistent and live, update `app/page.tsx` `Organization.sameAs` to list the corrected Chamber URL, the LinkedIn **company** page, the GBP (Google Maps) URL, and the Cvillepedia page — extending ENT-005, which currently only lists Grant's personal LinkedIn/Substack/Medium. That closes the entity loop between the site and its off-site corroboration.

---

## The gate — Grant must confirm

1. **Exact business name** — "BBTx Consulting" everywhere? Legal entity / DBA situation? Is "The Bridge LTD" still registered?
2. **Phone** — is (434) 466-4655 current and right for public listings?
3. **Address** — is 184 Brookwood Dr an office or a home? (drives the GBP hide-address call — see §3)
4. **Veteran-owned / women-owned** — are the GBP attributes literally true? Remove any that aren't.
5. **paradigmassociates.us** — update, request removal, or leave?
6. **Founder vs. co-founder** (AUT-001 conflict; Cvillepedia says co-founder). Still relevant to ENT-001/AUT-002 regardless of §2a being out of scope.

~~7. IBM PC / Europe line in Grant's LinkedIn About (§2a) — confirm the specifics.~~ Moot — §2a is out of scope (2026-09-05).

## Status (2026-09-04)

| Profile | State |
|---|---|
| **GBP** | Description + categories + LinkedIn link + website https + old-entity socials + hours **all applied**. Still open: service area/hide-address (needs Grant, office-vs-home) + veteran/women-owned to verify — see §3. |
| **LinkedIn company** | Page found (`.../company/bridgebusinesstransformations/`). Admin-access request still pending; not yet editable. Rewrite queued — see §2. |
| **Grant's personal LinkedIn** | Out of scope (2026-09-05) — his own call, not a project deliverable. One fact stays in scope under §2/ENT-003: "BBTx Consulting" was added as current experience on both Grant's and Mel's profiles 2026-09-04, to help the company-page admin claim resolve. |
| **Chamber** | Not started — needs the member-dashboard login. Highest-impact remaining fix (wrong URL, dead AI-Explorers checkout). |
| **paradigmassociates.us** | Grant decision pending. |
| **Reviews (REV-001)** | Not started — Grant names clients, asks. The real GBP visibility lever. |
