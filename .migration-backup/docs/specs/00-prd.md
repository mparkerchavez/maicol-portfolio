# Maicol Portfolio 2026: Product Requirements Document

**Version:** 1.0
**Date:** May 2026
**Owner:** Maicol Parker-Chavez
**Status:** Active, governs v1 build

---

## 1. What This Project Is

The next iteration of maicolparkerchavez.com.

The site is a portfolio for an AI product strategist looking for senior product roles. The strategic move is that the site does not describe Maicol's work, it performs it. Visitor intent is inferred from on-site behavior. A character named Llamita, drawn in pixel illustration and animated, narrates the visit, comments on what the visitor is exploring, and at the right moment proposes a next best action calibrated to who it thinks the visitor is.

The chat is content-aware, grounded in a curated knowledge base of Maicol's evidence and positioning, and capable of invoking Curate Mind as a tool when a visitor asks something that Maicol's own research can answer with citations.

The site demonstrates four capabilities at once: discovery (inferring what the visitor wants), validation (asking a clarifying question before assuming), product building (a real interactive product), and adoption design (calibrating the next step to the visitor). Those are the same four capabilities Maicol sells professionally.

---

## 2. Who This Is For

Five primary intent tracks, listed by frequency-weighted importance. The site does not ask visitors to declare which one they are. The character infers it from behavior.

### 2.1 For Anyone

**Who they are.** First-time visitors with no declared intent. The default state for every session until signal accumulates.

**What they need.** Enough orientation to choose where to go next. The single message, the proof points at a glance, a path into any of the four other tracks if they recognize themselves there.

### 2.2 Recruiters

**Who they are.** Agency recruiters, in-house sourcers, ATS-driven hiring teams. They are scanning, not reading.

**What they need.** Role status (open to senior PM / AI Product Lead roles), target titles, location (Los Angeles), compensation anchor ($170-190K), a downloadable resume, a scheduling link, LinkedIn. Short session, low patience for narrative.

### 2.3 AI Strategist

**Who they are.** CTOs, Heads of AI, Chief Strategy officers, AI Product Lead peers, and engineering leaders evaluating whether Maicol can move their AI work from ambiguous to executable.

**What they need.** Proof that Maicol thinks clearly about AI: the LangChain prototyping-vs-production decision, the trust architecture behind Curate Mind, the Capital Group sprint that took a tool from 12 to 300+ users, the way he scopes things out (the social profile enrichment de-scope). The most substance-hungry audience.

### 2.4 Product Managers

**Who they are.** Senior PMs, Principal PMs, Directors of Product, and PM hiring managers screening for AI product roles.

**What they need.** Proof that Maicol's work translates to PM functions even though he has not held a PM title. The through-line: discovery, validation, prototyping, alignment, all in one person. They want to see methodology, prioritization frameworks, what gets shipped, what gets de-scoped, and how decisions get made.

### 2.5 Product Designers

**Who they are.** Designers exploring how the function evolves in the age of AI. Includes designers wondering how to move into AI product work and design hiring managers wondering whether Maicol still designs.

**What they need.** A senior designer's working point of view on where the design function is going. Maicol has tracked this in Curate Mind and has original positions worth reading. This track is thought-leadership oriented, not portfolio-evaluation oriented. The visitor leaves having learned something they cannot get elsewhere.

---

## 3. The Single Thesis

**The portfolio is itself one of Maicol's products.**

Every component of the experience demonstrates a capability he sells:

- **Discovery.** The site reads the visitor instead of asking them to declare themselves.
- **Validation.** Before proposing a next best action, the character asks a clarifying question to confirm its hypothesis.
- **Prototyping.** The Llamita interaction is a working AI product. The Curate Mind on-site visualization is a working trust architecture demo.
- **Adoption.** Each visitor leaves with a next step calibrated to who they are.

This thesis solves Maicol's central positioning challenge. He has been told to "lead with proof, not claim." The portfolio is the proof. There is no claim left to make once the site does what it does.

---

## 4. V1 Scope

### 4.1 In Scope

- **Llamita character.** Pixel-illustration character living top-right. Six expression states (idle, observing, talking, thinking, wrong, sleeping). Expands into a chat panel on the right edge when invoked.
- **Content-aware chat.** Llamita as conversational interface. Page-aware (knows what section the visitor is reading). Grounded in a curated knowledge base of Maicol's evidence, positioning, and bio. Can invoke Curate Mind as a tool when relevant. Refuses off-topic questions in voice.
- **Through-line toggle.** Top of the home page. Three framings of Maicol's career the visitor can switch between (Product Designer / AI Product Lead / End-to-end Product). Same evidence reframed for each. The choice is a high-quality intent signal.
- **Three case studies.** Capital Group (AI Enablement), Tech Trends (Strategy and Research), Innovation Sprints (Methodology). Each refactored to be punchier than the current versions, with two to three pre-written Llamita chips per case study to invite expansion.
- **Curate Mind on-site mini-app.** Modeled on the mini-app on curatemind.io. Three example traces from Themes → Positions → Evidence → Sources, interactive enough to demonstrate the trust architecture in action. The full experience lives at curatemind.io and the mini-app links there for visitors who want to go deeper.
- **Earnestly card with email signup.** Coming-soon framing. One email field, optional context field ("what would you most want from this?"). Confirmation in Llamita's voice. Captures interest and produces a builder-track signal.
- **Intent inference.** Multi-layered signal scoring designed to resist the "click everything" failure mode. Passive behavior (hover dwell, section reading patterns, scroll velocity, return visits) is weighted higher than explicit clicks. The chat itself is the highest signal surface (questions reveal intent more than any toggle). Composite patterns are scored across active and passive surfaces. The full taxonomy and weighting rules live in `docs/specs/08-intent-inference.md` once written. Persona inference fires when a composite pattern crosses a threshold.
- **Next best action panel.** Four-beat flow inside the chat surface: observation, hypothesis, clarifying question, calibrated next step. The character earns the right to suggest by being useful first.
- **Resume download.** Visible in the Recruiter-calibrated path and accessible from the chat.
- **Email contact link.** Standard mailto, visible in nav and accessible from the chat.
- **About content via Llamita.** No static About page or section. "Who is Maicol" is answered by Llamita on demand, calibrated to the inferred track. A small visible affordance on the home page points visitors at this ("To learn about Maicol, ask Llamita →"). See ADR 0007.

### 4.2 Out of Scope (V1)

- **Mobile experience.** V1 is desktop-only. Hover-driven interactions, the right-edge chat panel, and the through-line toggle are designed for desktop reading. A mobile experience is a separate later project with its own scope. See ADR 0006. The site renders on mobile (does not error), but the interactions are not optimized for it.
- Blog or article publishing system.
- Newsletter sign-up beyond the Earnestly capture.
- Multi-language support.
- A/B testing infrastructure.
- Analytics dashboard for Maicol. (Light analytics for behavior signals, yes. A reporting UI, no.)
- A public API.
- User accounts or persistent sessions across devices.
- Scheduling link integration. (Backlog. Maicol needs to choose a scheduling tool before this can land.)

### 4.3 Backlog

- **Scheduling link.** Calendly, Cal.com, or alternative. Decision pending Maicol's choice of tool.
- **About content.** Currently no About page or section. Possibility under consideration: about content surfaced through Llamita as a Q&A pattern rather than as a static page. See Open Questions.
- **Full mobile experience.** Separate project. Hover-driven affordances do not translate, so the mobile experience needs its own design pass.
- Sanitized template artifacts (Empathy Map, Value Map, capability lineage view, sprint readout deck skeleton). Park until a specific placement earns its weight.
- Earnestly case study, once the product ships.
- Additional case studies as new work lands.
- Visit-history-based personalization for return visitors.

---

## 5. Success Criteria

The site is done when the following are true.

1. **A recruiter can find role status, target titles, resume download, and contact email within 15 seconds.** Llamita does not get in the way of this path.
2. **A hiring manager can identify within 60 seconds whether Maicol fits the role they are hiring for.** The through-line toggle and the calibrated NBA panel are the primary surfaces for this.
3. **A peer can ask Llamita a substantive question about AI adoption and receive a sourced answer that traces to Curate Mind.** The tool invocation is visible in the chat.
4. **A first-time visitor experiences at least one observation from Llamita that feels disarmingly accurate.** This is the moment the site earns its thesis.
5. **A visitor who triggers the NBA panel receives a clarifying question before any prescription.** Validation-first instinct is visible.
6. **Every factual claim on the site traces to a source in the Evidence Bank.** No invented facts. No drift.

These are user-experience criteria, not metrics. We are not optimizing for visit count, time on page, or conversion. We are optimizing for the right visitors having the right experience.

---

## 6. Non-Goals

What this project is explicitly not.

- **Not a chatbot product.** Llamita is a portfolio character, not the start of a chatbot SaaS. Resist all pulls in that direction.
- **Not a designer-evaluation tool.** The Product Designers track is thought-leadership, not folio review.
- **Not a generic AI Product Lead landing page.** It is Maicol's portfolio. Specificity is the asset.
- **Not optimized for SEO traffic.** It is optimized for the right visitors, who arrive via LinkedIn, direct links Maicol shares, and the occasional referral.
- **Not a place to dump every piece of writing Maicol has done.** Curated, not exhaustive.

---

## 7. Voice and Tone

### 7.1 The site's own voice

Editorial register. Confident. Short sentences. Proof-led. Same rules as Maicol's cover letters and resumes. The site never apologizes for itself, never pleads, never enthuses.

### 7.2 Llamita's voice

Llamita has its own voice, distinct from the site's editorial voice. Four qualities:

- **Disarming.** Slightly self-deprecating. Makes light of itself often enough that the visitor relaxes.
- **Observant.** Comments on what the visitor is doing without being creepy about it. Reads context, not pixels.
- **Witty.** Smart comments, no dad jokes. The wit comes from observation, not from punchlines.
- **Gracefully wrong.** When Llamita's inference misses, it should land as a funny mistake, not an awkward moment. "Ah, I had you pegged as a hiring manager and you are clearly reading the LangChain decision for fun. Apologies. Adjusting."

Llamita is helpful but does not hover. It probes the visitor occasionally to see if there is more they want to learn or a link they need. It expands on the page they are on rather than launching into unrelated territory.

The full voice spec lives in `docs/specs/04-llamita-voice.md` once written.

### 7.3 Writing rules carried from Maicol's collaboration guide

Absolute, no exceptions:

- No em dashes.
- No enthusiasm language ("excited to apply", "passionate about", "I would love to").
- Lead with proof, not claim.
- Default to short sentences.
- Never open with "I am writing to..." or "I am applying for...".

These rules apply to all site copy, all Llamita lines, and all written content in this repo.

---

## 8. The Through-Line Argument

Maicol's central positioning challenge is that he has done the function of an AI Product Lead for twenty-four years under three different titles (Product Designer, Business Designer, Venture Architect). The market only recently named the function clearly. Hiring managers screening for PM roles see "Product Designer" on his history and quietly discount the PM positioning.

The site solves this argument three ways.

1. **The through-line toggle.** Three framings of the same career, switchable. Same evidence, reframed. The visitor sees the function survive the relabeling.
2. **Llamita's calibrated framing.** When the inferred track is Product Manager, Llamita opens with: "He has not held a PM title. He has done the function under three different titles. Here are the receipts."
3. **The case studies themselves.** Punchier rewrites that lead with the function (discovery, validation, prototyping, adoption) rather than the role title.

The through-line is the spine of the site. Every component reinforces it.

---

## 9. Agent Alignment Rules

Principles every agent (Claude, Codex, Gemini) must respect when working on this project.

1. **The PRD is the north star.** When something tempting comes up that is not in the PRD, the default answer is no. Adding scope requires a PRD update.
2. **Evidence Bank is the source of truth for facts.** No agent invents a fact about Maicol. Claims are sourced from `content/knowledge-base/evidence-bank.md` or flagged as `[TODO: needs source]`.
3. **The writing rules are absolute.** Em dashes, enthusiasm language, weak openers. None of these enter the codebase under any circumstance.
4. **Llamita is not a chatbot product.** Resist any pull toward building general-purpose chat features. Llamita exists to serve the portfolio thesis.
5. **Git is the only sync layer.** No agent assumes another agent has read a chat log. Important information lives in the repo.
6. **Specs before code.** Non-trivial work starts with a spec. Codex does not improvise on architecture.
7. **ADRs are immutable.** To change a locked decision, write a superseding ADR.

---

## 10. Open Questions

A living list. Updated as decisions land.

- **Color introduction timing.** The PRD locks black and white for v1 structural work. When does color enter? Probably with the first illustration set lands, but the rule should be written down before that point.
- **Untitled UI v8 Pro license access for Codex.** Maicol has the license. The API key needs to be configured for Codex's MCP integration before Codex can pull components by name.
- **Knowledge base mirror approach.** The Evidence Bank and Identity Guide live outside this repo. Do we mirror them into `content/knowledge-base/` and accept drift risk, or maintain them by hand in the repo as the canonical version? Recommendation: maintain in the repo as canonical, with a refresh discipline. Pending confirmation.
- **Evidence Bank refresh.** The current Evidence Bank is from January 2026. It needs to be updated to align with the May 2026 Identity Guide and the recent resume / cover letter variants. Captured as a tracked task.
- **Knowledge base depth.** The repo starts with the Evidence Bank, Identity Guide, and case studies. For deeper Llamita conversations, the knowledge base needs to include Maicol's full LinkedIn career history plus reflective context for older roles ("what the opportunity meant", "what was enjoyed most", "biggest learnings"). Population work captured as a tracked task.

### Recently resolved

- *Curate Mind visualization scope:* resolved 2026-05-25. Mini-app pattern with three example traces, links out to curatemind.io for the full experience. See Section 4.1.
- *Mobile experience scope:* resolved 2026-05-25 via ADR 0006. Desktop-only for v1, mobile is a separate later project.
- *About content surface:* resolved 2026-05-25 via ADR 0007. Llamita answers "who is Maicol" on demand, calibrated to the inferred track. A small affordance points visitors at the chat. No static About page.

---

## Change log

- 2026-05-25: Initial draft. Authored by Claude with Maicol. Status: Active.
- 2026-05-25: Revised V1 scope. Curate Mind reduced to mini-app pattern. Scheduling link moved to backlog. Desktop-only confirmed (ADR 0006). Signal surface section expanded. About content locked to Llamita Q&A pattern (ADR 0007).
