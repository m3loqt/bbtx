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

**Current state** (fetched 2026-09-04, `cvillechamber.chambermaster.com/list/member/bbtx-consulting-12801`):

| Field | Current (wrong) |
|---|---|
| Website | `https://chaotic-confluence.circle.so/chaotic-confluence` |
| Description | "We are experienced business coaches with deep experience in developing successful organizations with focus on transforming organizations through visionary leadership and AI applications." |
| Header link | "Learn How to Get Real Results from AI" → `ai_explorers.circle.so/checkout/ai-explorer-full-membership` |
| Categories (8) | Consultants · Coaching - Business · Coaching - Personal & Professional Success · Consultancy & Development · Consultant: Strategic Planning · Consultants: Business & Information Technology · Consultants: Business Performance Improvement · Consultants: Educational |

**Corrections:**

- **Website →** `https://www.bbtx.ai`
- **Remove entirely:** the "AI Explorers" checkout link and the "Learn How to Get Real Results from AI" header CTA. Also the "Join our webinars & classes" membership link.
- **Description →**
  > BBTx Consulting is a Charlottesville-based practice led by Grant Tate. We help leadership teams set strategy, assess what's really happening inside the organization, develop leaders and teams, and carry change through to implementation — with more than 40 years of executive and organizational experience behind every engagement. Serving Central Virginia and beyond.
- **Categories — keep only:** Consultant: Strategic Planning · Consultants · Consultancy & Development · Coaching - Business
- **Categories — drop:** Consultants: Business & Information Technology · Consultants: Educational · Consultants: Business Performance Improvement · Coaching - Personal & Professional Success *(each narrows or misdescribes the practice)*
- **Categories — add if the Chamber offers them** (`CONFIRM` available list in the member dashboard): Consultants: Management · Consultants: Organizational Development · Consultants: Leadership Development
- **CTA buttons →** "Schedule a consultation" (→ bbtx.ai or the Calendly link) and "Explore our services" (→ `https://www.bbtx.ai/services`)

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

### 2a. Grant's personal LinkedIn profile — full draft

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

---

## 3. Google Business Profile (GBP-002)

Mel has manager access (GBP-001 resolved). Worked 2026-09-04.

**Applied 2026-09-04:**
- **Description** — replaced the keyword-stuffed original with the version below.
- **Primary category** — `Business management consultant`; **secondary** `Business development service` added.
- **Social profiles** — added the LinkedIn company URL (`linkedin.com/company/bridgebusinesstransformations/`); pending Google review.

**Still open (recommended, confirm whether applied):**
- **Website** — change `http://www.bbtx.ai/` → `https://www.bbtx.ai`
- **Social profiles** — remove `facebook.com/thebridgeltd` and `x.com/@thebridgeltd` (old entity name)
- **Service area** — change from "United States" to: Charlottesville · Albemarle · Fluvanna · Greene · Louisa · Nelson · Orange counties. **Hide the `184 Brookwood Dr` address** (service-area business — "Onsite services not available", appointment-only, residential-looking address).
- **Hours** — change "Open 24 hours" (Mon–Fri) → Mon–Fri 9:00 AM–5:00 PM.
- **Veteran-owned / women-owned attributes** — both set; `CONFIRM with Grant` and remove either that isn't literally true.
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

## 4. paradigmassociates.us — a decision, not a draft

`https://www.paradigmassociates.us/about-us/our-team/grant-tate` hosts a full Grant Tate profile on **a competitor's domain**. It names "Bridge Business Transformations (BBx)" and "Bridgewater Research Group (BRG)", **does not mention BBTx, and does not link to bbtx.ai** — and it ranks for "Grant Tate consultant." It's splitting Grant's entity onto someone else's site.

- **Recommended:** if Grant has an ongoing affiliate/associate relationship with Paradigm Associates, ask them to (a) update the profile to name **BBTx Consulting** as his current practice and (b) link `https://www.bbtx.ai`. Converts a liability into a backlink + entity signal.
- **Alternative:** if the relationship is dormant, request removal.
- **Do nothing** = accept the entity split. Not recommended.
- **Owner:** Grant.

---

## 5. Follow-on (Claude, after profiles are corrected)

Once Chamber / LinkedIn company / GBP / Cvillepedia are consistent and live, update `app/page.tsx` `Organization.sameAs` to list the corrected Chamber URL, the LinkedIn **company** page, the GBP (Google Maps) URL, and the Cvillepedia page — extending ENT-005, which currently only lists Grant's personal LinkedIn/Substack/Medium. That closes the entity loop between the site and its off-site corroboration.

---

## The gate — Grant must confirm

1. **Exact business name** — "BBTx Consulting" everywhere? Legal entity / DBA situation? Is "The Bridge LTD" still registered?
2. **Phone** — is (434) 466-4655 current and right for public listings?
3. **Address** — is 184 Brookwood Dr an office or a home? (drives the GBP hide-address call — see §3)
4. **Veteran-owned / women-owned** — are the GBP attributes literally true? Remove any that aren't.
5. **paradigmassociates.us** — update, request removal, or leave?
6. **Founder vs. co-founder** (AUT-001 conflict; Cvillepedia says co-founder).
7. **IBM PC / Europe line** in Grant's LinkedIn About (§2a) — confirm the specifics.

## Status (2026-09-04)

| Profile | State |
|---|---|
| **GBP** | Description + categories + LinkedIn link **applied**. 4 quick fixes still open (website https, remove old-entity socials, service area, hours) + veteran/women-owned to verify — see §3. |
| **LinkedIn company** | Page found (`.../company/bridgebusinesstransformations/`). Admin-access request filed; not yet editable. Rewrite queued — see §2. |
| **Grant's personal LinkedIn** | Draft ready (§2a); needs Grant to apply + confirm the `CONFIRM` items. Adding "BBTx Consulting" as current experience also speeds the company-page admin claim. |
| **Chamber** | Not started — needs the member-dashboard login. Highest-impact remaining fix (wrong URL, dead AI-Explorers checkout). |
| **paradigmassociates.us** | Grant decision pending. |
| **Reviews (REV-001)** | Not started — Grant names clients, asks. The real GBP visibility lever. |
