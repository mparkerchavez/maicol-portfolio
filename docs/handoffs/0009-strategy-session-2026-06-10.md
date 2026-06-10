# Handoff 0009: Strategy session decisions, 2026-06-10

**From:** Claude + Maicol
**To:** Codex, Claude, Gemini
**Date:** 2026-06-10
**Status:** Decisions recorded, two items still open
**Purpose:** Record the decisions from the 2026-06-10 strategy review of Handoff 0008, so the next build push starts from one shared direction.

---

## 1. Decisions made

### ADR 0009 is Accepted
Maicol approved the persona nav. The ADR status is updated. Codex may build the persona nav per Spec 03 Section 4 and remove the through-line toggle (`ThroughLine`, `setThroughLine`, `maicol-through-line` storage key, `through-line-toggle.tsx`).

### ADR 0010 is Accepted (new)
V1 calibration uses declared persona plus page context plus chat messages. No behavioral scoring in v1. Spec 08 moves post-launch, gated on watch-session evidence. See `docs/decisions/0010-declared-persona-first-inference-deferred.md`.

### Milestones replace the 12-step sequencing in Handoff 0008
The steps survive but regroup into three milestones. The goal of Milestone A is a URL Maicol can put in applications within days.

- **Milestone A, application-ready:** commit strategy docs, fix resume PDF link, fix `audit:uui`, build persona nav (replacing the toggle), replace placeholder Curate Mind traces with three real traces, restyle the status strip into a live session readout, update all compensation copy (see Section 2). Covers Handoff 0008 steps 1 through 5 plus step 10.
- **Milestone B, grounded chat:** knowledge base population, Spec 07, real chat with receipts-style sourced answers, page-context awareness only. No animated sprites required; the placeholder mark is acceptable through this milestone (Maicol decision). Watch sessions with 3 to 5 real visitors happen at the end of this milestone. Covers steps 7 through 9.
- **Milestone C, conditional:** Spec 08 inference (only if watch sessions show need), final Llamita character art, behavior tuning. Covers steps 11 and 12.

### Chat ships before character art
Maicol wants to test the chat experience without animated sprites. Character art is a Milestone C concern and is promoted only if the art quality is excellent. Treat the character as separable from the chat architecture.

### Earnestly stays in v1
Maicol's call: it stays as a coming-soon surface because it shows continuous building. Single-visit traffic makes staleness low-risk. The signup form scope (PRD 4.1 vs current deferred state) is still an open item; current lean is to defer the form past Milestone A.

### Mobile direction changed
ADR 0006 (desktop-only v1) will be revisited. New direction: responsive core, desktop-enhanced. The recruiter path (hero, role status, resume, contact) must be usable on a phone because recruiter traffic arrives from LinkedIn on mobile. Hover-driven enhancements stay desktop-only. A superseding ADR should be written before Milestone A layout work hardens. Building responsive in Milestone A is much cheaper than retrofitting.

## 2. Compensation target changed (copy-critical)

Maicol's target is now **$250K+ total compensation**. The $170-190K band applied to one unique role and is retired. Capital Group baseline was $255K base, roughly $320K total with bonus.

Stale copy that must not ship:

- Spec 03, Section 4c, Recruiters hero: "Target band $170 to 190K."
- `src/components/home/interactive-home.tsx`, `recruiterProof`: "RANGE: $170K TO $190K".
- Any knowledge base files written from the old anchor.

The root collaboration guide (parent folder `CLAUDE.md`) is already updated.

**Open:** whether the site publishes a number at all, and in what form. Decision pending from Maicol. Until then, do not write new comp copy.

## 3. Interaction model direction (under discussion, not yet specced)

The chat is the delivery mechanism, not the demonstration. Three commitments make the AI surface read as product vision rather than a table-stakes chatbot:

1. **Receipts, visibly rendered.** Every Llamita answer shows its sources inline: case study section, knowledge file, Curate Mind data point. This mirrors the Curate Mind trust architecture and is the site's signature move.
2. **AI as editor, not conversationalist.** Calibrated reading paths and progressive disclosure over Maicol's text-heavy corpus. The system reduces the visitor's reading cost.
3. **Legible context-awareness.** The status strip shows live session state (declared persona, current section). Transparency over black-box magic.

Real-estate rule for any Llamita surface: it must cut reading time, add trust, or move the visitor toward contact. Personality alone never justifies pixels. The cockpit right rail should become the calibrated-action panel (next step, receipts, contact, resume), not a commentary column.

Spec work for this lands after Maicol confirms the model.

## 4. Known spec drift to fix during Milestone A

- Spec 03 still references Inter and Playfair throughout. ADR 0008 (2026-05-26) moved the system to Uncut Sans plus JetBrains Mono. Spec 03 was updated 2026-05-29 without catching this. Claude to reconcile.
- PRD Section 4.1 and success criterion 4 need the ADR 0010 follow-up edits (criterion 4 rewords from "disarmingly accurate" to a page-aware standard).
- PRD Section 8.1 and Spec 04 still reference the through-line toggle (ADR 0009 ripple list).

## 5. Immediate next actions

| # | Action | Owner |
|---|---|---|
| 1 | Commit ADR 0009 (Accepted), ADR 0010, Spec 03, this handoff | Codex |
| 2 | Provide current resume PDF for `public/` | Maicol |
| 3 | Fix `audit:uui` (raw input in `llamita-chat-panel.tsx`) | Codex |
| 4 | Build persona nav, remove through-line toggle | Codex |
| 5 | Pick three real Curate Mind traces | Maicol + Claude |
| 6 | Decide comp publication form | Maicol |
| 7 | Confirm interaction model (Section 3) so spec work can start | Maicol |
| 8 | Write superseding mobile ADR | Claude, after Maicol confirms direction |
| 9 | Reconcile Spec 03 typography and PRD ripples | Claude |

---

## 6. Update, later 2026-06-10

Maicol resolved several open items in the same session.

### Compensation: do not publish (resolves Section 2's open question)
No compensation number appears anywhere on the site. The $250K+ figure is internal context for the caliber the portfolio must signal, nothing more. Done already: PRD 2.2 updated, Spec 03 Recruiters hero rewritten without the band. **Still required from Codex:** delete the `RANGE: $170K TO $190K` row from `recruiterProof` in `src/components/home/interactive-home.tsx` (and do not carry it into the persona nav build).

### Resume PDF is staged (resolves next-action 2)
`public/Maicol-Parker-Chavez-Resume.pdf` now exists, copied from the parent folder's `Maicol Parker-Chavez - Resume_2026.pdf` (the 2026-05-06 export of the base resume). Maicol to verify this is the version he wants public before deploy. Codex to commit.

### Agent Experience layer added to v1 scope (PRD 4.1 updated)
Maicol wants the site legible to a visitor's own AI tools, demonstrating Agent Experience thinking alongside UX. Pattern reference confirmed by Maicol on 2026-06-10: Every's Agent Mode (a Human/Agent toggle on the page; the agent version is a terminal-styled markdown surface with an explainer, a copyable setup prompt pointing the agent at source material, and a set of starter prompts). Explicitly NOT an MCP server in v1; a primed prompt pointing at sources is the right weight.

V1 pieces, all cheap because content already lives in markdown:

1. Markdown mirrors of every page at stable URLs (e.g. `/work/capital-group.md` or equivalent).
2. An `llms.txt` index at the site root: one-paragraph site description plus links to the markdown mirrors.
3. A Human/Agent mode toggle on content pages.
4. A single `/agent` page: short explainer, one copyable setup prompt (points the agent at the markdown mirrors as source of truth), and three or four starter prompts. The hiring-specific starter prompt is the priority: paste a job description and ask the agent to evaluate Maicol's fit against the evidence.

Claude writes the setup prompt, starter prompts, and `llms.txt` content. Codex wires the routes and the toggle. Lands in Milestone A or early B.

### Mobile: the chat surface must translate (extends Section 1's mobile direction)
The desktop pattern (perch top-right, 380px right-edge overlay) does not translate to mobile. Direction for the superseding mobile ADR: on mobile the chat opens as a bottom sheet (half-height, expandable to full) and the perch becomes a small floating element. The cockpit's side rails reflow below the hero as stacked cards. No Llamita surface may permanently consume screen real estate on either form factor; the panel exists only while invoked.

---

## 7. Milestone A work order (approved by Maicol, 2026-06-10)

Maicol approved the keep/demolish split: the repo is not scrapped. The foundation (stack, typography, adapters, content-as-markdown, stores, case study routes, deploy config) stays. The surfaces built around retired decisions get demolished and rebuilt. Execute in this order.

**Task 0: protect the docs state in git.** Commit everything currently uncommitted in `docs/` (ADR 0009 accepted, ADR 0010, PRD updates, Spec 03 updates, handoffs 0008 and 0009) plus `public/Maicol-Parker-Chavez-Resume.pdf`, before any code changes.

**Task 1: demolition, one commit.**
- Delete `src/components/home/through-line-toggle.tsx`.
- Remove the `ThroughLine` type, `throughLine`, `setThroughLine`, `lastThroughLineChangedAtMs` from the signal store, the `maicol-through-line` sessionStorage key, and the `framings` model in `interactive-home.tsx`.
- Delete the `RANGE: $170K TO $190K` row from `recruiterProof`. Sweep `src/` and `content/` for "170" to confirm no compensation copy survives anywhere.

**Task 2: persona nav (Spec 03 Sections 4b, 4c, 4e, and 9).**
- Four labels: For anyone / Recruiters / AI Product Leaders / Product Managers. Default: For anyone.
- Hover previews the copy without committing. Click commits, persists in sessionStorage, and records a declared-persona signal per ADR 0010. Crossfade roughly 200ms with a reduced-motion fallback.
- `selectedPersona` enters the signal store and the page-context contract. Label-to-track mapping per Spec 03 Section 4e. `inferredTrack` stays at confidence 0.
- Hero copy verbatim from Spec 03 Section 4c as it reads today (the Recruiters subhead was rewritten 2026-06-10 without the comp band).

**Task 3: home recomposition.**
- The cockpit was composed around the retired toggle. Recompose the home page to the Spec 03 Section 2 structure (status strip, header, hero with persona nav, case study triptych, Curate Mind section, Earnestly card, footer), reusing the existing proof board, trace lab, and Earnestly components where they fit.
- The Llamita commentary rail does not survive. Real-estate rule: a persistent Llamita surface must cut reading time, add trust, or advance contact. The perch and the invoked panel stay; the commentary column goes.
- The status strip becomes a live session readout (name, role status, declared persona, current section in view). No ticker animation.
- The pixel prototype image is no longer hero furniture. Drop it or relocate it where it earns its place; record the choice in the build handoff.

**Task 4: responsive core.**
- The recruiter path must be usable at 390px wide: hero, persona nav (tap-friendly), resume download, contact.
- Side-by-side sections reflow to stacked cards on small screens. Hover-only behavior degrades gracefully.
- Reference desktop remains 1440x900 per Spec 03 Section 11.

**Task 5: audit fix.** Replace the raw `<input>` in `src/components/site/llamita-chat-panel.tsx` with `AppInput` so `npm run audit:uui` passes.

**Task 6: verification and handoff.** `npm run typecheck`, `npm run build`, `npm run lint`, `npm run audit:uui` all pass. Every resume link resolves to `/Maicol-Parker-Chavez-Resume.pdf`. Pages reviewed at 1440x900 and 390px. Write `docs/handoffs/0010-milestone-a-build.md`: what shipped, any deviations from spec, open questions.

**Out of scope for this pass:** chat backend (Spec 07 not yet written), knowledge base population, Spec 08 inference, agent-mode routes and `llms.txt` (content not yet written), character art, Earnestly signup form.

**Role note:** Maicol may execute this work order with a Claude Code implementation session rather than Codex. For that session, the `src/` ownership split in CLAUDE.md is suspended by operator decision. Spec authority and the handoff discipline still apply: if implementation must deviate from spec, the deviation goes in the build handoff, not into the spec.
