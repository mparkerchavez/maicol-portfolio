# Handoff 0008: Portfolio Rebuild Status Audit and Shared Plan

**From:** Claude + Codex  
**To:** Maicol, Claude, Codex  
**Date:** 2026-06-09  
**Status:** Shared audit and working plan  
**Purpose:** Single-source snapshot of where the `maicol-portfolio-2026` rebuild stands, what we ran into, what we decided, what changed, what is still undocumented or unresolved, and what to do next.

---

## 1. Executive status

The portfolio rebuild is no longer pre-build. It is a working Next.js prototype with the foundation, typography, case studies, interactive home, signal plumbing, and first-pass Llamita behavior layer in place.

The current site demonstrates the thesis better than the original static layout did: the home page now behaves like an interactive evidence cockpit instead of a conventional portfolio page.

The next major fork is **ADR 0009**: whether to replace the current self-framing through-line toggle with a visible visitor-persona nav. That decision is documented as proposed, but it is not accepted, committed, or implemented yet.

Until ADR 0009 is approved or rejected, the team should avoid building more on the home-page routing model. Otherwise we risk adding code to a pattern we may be about to replace.

---

## 2. What is shipped or built locally

### Phase 1: Foundation and static site

Built:

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind v4
- Replit deployment configuration
- Home page
- Three case study routes
- Signal tracking foundation
- Case study content moved into `content/case-studies/*.md`

Status: complete.

### Phase 1.5: UUI adapter layer and typography pivot

Built:

- App-facing UI adapters in `src/components/ui`
- Guard script: `npm run audit:uui`
- Typography pivot to Uncut Sans and JetBrains Mono per ADR 0008
- UUI base components live under `src/components/base`, while app code should route through local adapters

Status: mostly complete, with one current audit failure. See Section 7.

### Interactive home prototype

Built:

- Home page reworked into an interactive evidence cockpit
- Control surface for the current through-line framing
- Recruiter-critical proof above the fold
- Case study proof board
- Curate Mind trace lab shell
- Earnestly preview
- Monochrome pixel-style prototype image
- Llamita right rail and global perch

Status: implemented first pass.

### Phase 2: Llamita behavior

Built:

- Six Llamita states: `idle`, `observing`, `talking`, `thinking`, `wrong`, `sleeping`
- Dwell-driven idle observations
- Observation hint near Llamita
- Click-to-open chat from observation
- Hover-look behavior toward the about affordance
- Through-line copy crossfade
- 380px right-edge chat panel shell
- 90s sleep timer
- Reduced-motion handling
- Tunable behavior constants in `src/lib/llamita-behavior.ts`
- Observation copy sourced from `content/llamita-scripts/idle-observations.md`

Status: implemented first pass. Real chat and final sprite assets are not built yet.

---

## 3. Verification results from Codex audit

Commands run on 2026-06-09:

| Command | Result | Notes |
|---|---|---|
| `npm run typecheck` | Pass | TypeScript is clean. |
| `npm run build` | Pass | Production build succeeds. |
| `npm run lint` | Pass | No warnings or errors, but `next lint` is deprecated and should be migrated before Next 16. |
| `npm run audit:uui` | Fail | One raw `<input>` remains in `src/components/site/llamita-chat-panel.tsx`; should use `AppInput`. |

Important distinction: Claude's audit correctly identified the adapter guard as part of the architecture. Codex found that the guard currently fails on one concrete issue.

---

## 4. Current git state

Current branch: `main`

Uncommitted or untracked files at audit time:

- Modified: `docs/specs/03-information-architecture.md`
- Untracked: `docs/decisions/0009-persona-nav-replaces-self-framing-toggle.md`
- Untracked: `docs/handoffs/0008-portfolio-status-audit.md`

The latest strategic direction is therefore partly in the working tree and not yet protected by git history.

---

## 5. Where we actually left off

The freshest thinking is **not yet committed and not yet built**.

### Proposed direction

ADR 0009 proposes replacing the current self-framing through-line toggle with a four-label visitor-persona nav:

```txt
For anyone / Recruiters / AI Product Leaders / Product Managers
```

The Product Designers track would remain part of the invisible inference system, but it would not get a visible button. The reason is strategic: a visible Product Designer label can reinforce the exact discount problem the site is trying to solve.

The through-line argument would not disappear. It would move into copy, especially the Product Managers framing and the case study language.

### Current implementation

The code still uses the old three-label through-line model:

```txt
Product Designer / AI Product Lead / End-to-end Product
```

Code still has:

- `ThroughLine`
- `setThroughLine`
- `throughLine`
- `lastThroughLineChangedAtMs`
- `maicol-through-line` session storage key

There is no implemented:

- `selectedPersona`
- persona nav component
- declared-persona signal
- persona-to-track mapping in code

### Meaning

Spec 03 describes the proposed persona-nav future. The app still ships the old through-line toggle. That is the largest spec-to-code drift in the project.

---

## 6. Decisions made

| ADR | Decision | Status |
|---|---|---|
| 0001 | Next.js 15 App Router stack | Accepted |
| 0002 | Untitled UI v8 Pro via MCP | Accepted |
| 0003 | Black-and-white-first visual system | Accepted |
| 0004 | Pixel illustration direction | Accepted |
| 0005 | Five inferred intent tracks | Accepted |
| 0006 | Desktop-only v1 | Accepted |
| 0007 | About surfaced via Llamita, no static About page | Accepted |
| 0008 | Typography pivot to Uncut Sans | Accepted |
| 0009 | Persona nav replaces self-framing toggle | Proposed, uncommitted |

Do not move ADR 0009 from Proposed to Accepted until Maicol explicitly approves it.

---

## 7. Open gaps and risks

### 1. ADR 0009 is not finalized

Risk: Claude, Codex, and Maicol could each assume a different home-page routing model.

Decision needed: approve the persona nav, reject it, or revise it.

### 2. Spec 03 and code disagree

Risk: Future implementation work may follow a spec that does not describe the running app.

Fix: once ADR 0009 is decided, either implement the persona nav or revert the Spec 03 change.

### 3. Resume PDF is missing

The UI links to:

```txt
/Maicol-Parker-Chavez-Resume.pdf
```

But that PDF is not present in `public/`.

Risk: recruiter-critical resume links likely 404. This directly affects PRD success criterion #1.

### 4. UUI audit currently fails

`src/components/site/llamita-chat-panel.tsx` uses a raw `<input>`.

Risk: the adapter rule is no longer fully enforced. This is small but should be fixed before more UI work.

### 5. Real chat is not built

Current chat panel behavior is a stub. It can open, show messages, and simulate state changes, but it does not call Anthropic or Curate Mind.

Missing:

- Spec 07 Chat Architecture
- API route
- prompt assembly
- knowledge base loading
- Anthropic streaming
- Curate Mind tool invocation
- environment variable documentation
- refusal behavior in the live backend

### 6. Knowledge base is mostly empty

Spec 06 expects files `00` through `13` in `content/knowledge-base/`. Currently only `00-system-prompt-header.md` exists.

Risk: Llamita cannot safely answer real questions without inventing or overgeneralizing.

### 7. Curate Mind traces are placeholders

`src/data/curate-traces.ts` contains placeholder evidence and source text.

Risk: the trust-architecture demo cannot yet prove what it claims.

### 8. Earnestly signup is not present in the current home

The PRD includes an Earnestly signup card with email capture. The current interactive home only shows an Earnestly preview and says interest capture comes later.

Risk: PRD scope and implementation have drifted.

Decision needed: restore signup in v1, or formally defer it.

### 9. Final Llamita visual assets are missing

The behavior system is built against `PixelLlamitaMark`.

Risk: the character works functionally but not yet visually.

This was an intentional choice. The sprite swap should be localized to the Llamita rendering components.

### 10. Intent inference is deferred

`inferredTrack` is always:

```txt
for-anyone, confidence 0
```

Risk: the site tracks signals, but it does not yet score them into a confident visitor intent.

Note: this is not blocking the next step if the declared persona nav is approved, because declared persona can be wired first as a simpler signal.

### 11. Spec numbering gap

There is no `docs/specs/02-*.md`.

Risk: small documentation confusion.

Decision needed: either create a Spec 02 placeholder or document that the number was intentionally skipped.

### 12. Open Llamita tuning questions remain

Still unsettled from Handoff 0007:

- Dwell thresholds
- State labels like `RECALIBRATING` and `RESTING`
- Faster sleep when browser tab is backgrounded
- Whether the hover-look bob fallback reads as intentional

These require Maicol reviewing a running session.

---

## 8. Challenges and tensions we hit

### Two axes got conflated

The old visible toggle answered:

```txt
What is Maicol?
```

The invisible inference system answers:

```txt
Who is the visitor?
```

ADR 0009 proposes making the visible device answer the visitor question too.

### The Product Designer label creates strategic risk

Maicol's history includes Product Designer / UX. But the site is trying to prove senior AI product and PM fit. A visible Product Designer label can accidentally reinforce the old read instead of the target read.

### Static portfolio gravity

The early site structure followed the IA but still felt like a normal portfolio. The evidence cockpit was created to make the portfolio act more like a product.

### Asset dependency

Final Llamita assets were not ready. The team chose to build behavior first against a placeholder instead of blocking progress.

### Replit deployment friction

The project needed several config fixes:

- Node 22 for Tailwind v4
- Cloud Run `PORT` binding
- Replit dev preview origins
- production-mode preview command

---

## 9. Shared prioritized plan

### Step 1: Decide ADR 0009

**Owner:** Maicol, with Claude clarifying strategy if needed.  
**Work:** Decide whether the persona nav is the path forward.  
**Why:** This determines the home page's main control model.  
**Builds toward:** One clear routing strategy before more implementation.

Done when:

- ADR 0009 is either accepted, revised, or rejected.
- The decision is recorded in git.

### Step 2: Protect the current direction in git

**Owner:** Codex, after Maicol decision.  
**Work:** Commit the chosen docs state. If ADR 0009 is accepted, commit it with the Spec 03 update. If rejected, remove or revise those uncommitted changes.  
**Why:** Git is the project sync layer. If the decision is not committed, Claude and Codex can drift again.  
**Builds toward:** A stable shared source of truth.

Done when:

- `git status` no longer shows uncommitted strategy docs unless intentionally left for review.

### Step 3: Fix recruiter-critical basics

**Owner:** Codex, with Maicol providing the current resume PDF if needed.  
**Work:** Add `Maicol-Parker-Chavez-Resume.pdf` to `public/` or update the links to the correct file.  
**Why:** Recruiters need resume and contact access fast. A broken resume link breaks one of the PRD success criteria.  
**Builds toward:** A usable hiring path even before AI features are finished.

Done when:

- Header resume link works.
- Footer resume link works.
- Home cockpit resume link works.

### Step 4: Fix the UI primitive audit

**Owner:** Codex.  
**Work:** Replace the raw chat-panel `<input>` with `AppInput`.  
**Why:** The app has a rule that standard UI should flow through adapters. The guard currently catches one violation.  
**Builds toward:** Keeping the UI system consistent as the app grows.

Done when:

- `npm run audit:uui` passes.
- `npm run typecheck` passes.
- `npm run build` passes.

### Step 5: Reconcile Spec 03 and implementation

**Owner:** Codex, after ADR 0009 decision.  
**Work if ADR 0009 is accepted:** replace the through-line model with persona nav:

- `selectedPersona`
- four visible labels
- persona session storage
- persona-to-track mapping
- page context update
- old through-line cleanup

**Work if ADR 0009 is rejected:** restore Spec 03 to describe the current through-line implementation.

**Why:** The spec and app currently disagree.  
**Builds toward:** A coherent home page that future work can safely build on.

Done when:

- Spec 03 matches the running app.
- The home page works at 1440x900.
- Typecheck and build pass.

### Step 6: Decide Earnestly signup scope

**Owner:** Maicol + Claude for product call, Codex for implementation.  
**Work:** Decide whether the Earnestly email capture belongs in v1 or should be deferred.  
**Why:** The PRD says signup is in scope, but current implementation defers it.  
**Builds toward:** Clear v1 scope and no hidden product assumptions.

Done when:

- PRD and implementation agree.
- If in scope, a simple signup UI exists.
- If deferred, the PRD or handoff says so clearly.

### Step 7: Populate the knowledge base

**Owner:** Claude + Maicol.  
**Work:** Create the missing knowledge files from Spec 06:

- positioning
- evidence bank
- short bio
- career bio
- reflections
- case study mirrors
- Curate Mind summary
- Earnestly summary
- about framings
- refusal patterns
- voice spec mirror

**Why:** Real chat needs trusted source material. Without this, Llamita can sound confident while being under-sourced.  
**Builds toward:** A grounded Llamita that can answer questions safely.

Done when:

- Required knowledge files exist.
- Claims trace to sources.
- Open TODOs are visible.

### Step 8: Write Spec 07 Chat Architecture

**Owner:** Claude, with Codex implementation constraints if needed.  
**Work:** Define how chat actually works:

- API route
- Anthropic model call
- streaming response
- prompt assembly
- page context
- knowledge base loading
- Curate Mind tool call
- error handling
- environment variables

**Why:** Codex should not improvise the chat backend.  
**Builds toward:** Phase 3 real chat implementation.

Done when:

- `docs/specs/07-chat-architecture.md` exists and is approved enough for Codex to build.

### Step 9: Build real Llamita chat

**Owner:** Codex.  
**Work:** Connect the chat panel to the backend from Spec 07.  
**Why:** This is the point where Llamita stops being a behavior prototype and starts becoming the site's conversational interface.  
**Builds toward:** PRD success criteria around sourced answers, Curate Mind invocation, and about-via-Llamita.

Done when:

- Visitor can ask a real question.
- Llamita answers from the knowledge base.
- Page context is included.
- Curate Mind tool behavior is wired or clearly stubbed.

### Step 10: Replace Curate Mind placeholder traces

**Owner:** Claude + Maicol select traces, Codex wires data.  
**Work:** Replace placeholder trace data with real examples.  
**Why:** The current trace lab claims inspectable trust, but the evidence is placeholder text.  
**Builds toward:** A credible live proof surface.

Done when:

- Three trace examples are real.
- Each has theme, position, evidence, and source.
- Links or citations are clear.

### Step 11: Swap in final Llamita assets

**Owner:** Gemini + Maicol for assets, Codex for integration.  
**Work:** Replace placeholder mark with final sprite frames.  
**Why:** The behavior system works, but the character is not visually finished.  
**Builds toward:** The memorable portfolio character promised in the PRD.

Done when:

- All six Llamita states have visual assets or approved fallbacks.
- Sprite swap stays localized to Llamita rendering components.

### Step 12: Tune behavior after watching the prototype

**Owner:** Maicol + Codex.  
**Work:** Watch the running site and tune:

- dwell timing
- state labels
- sleep behavior
- hover-look fallback

**Why:** These are feel questions. They need a human watch pass.  
**Builds toward:** Llamita feeling observant instead of noisy or awkward.

Done when:

- Tuned constants are updated.
- Any final voice-label changes are recorded.

---

## 10. Suggested sequencing

### Immediate alignment pass

Do these first:

1. Decide ADR 0009.
2. Commit or revise the strategy docs.
3. Fix the resume link.
4. Fix `audit:uui`.

### Home model pass

Do next:

5. Reconcile Spec 03 and implementation.
6. Decide Earnestly signup scope.

### Chat readiness pass

Do after the home model is stable:

7. Populate the knowledge base.
8. Write Spec 07.
9. Build real chat.

### Proof and polish pass

Can run partly in parallel:

10. Replace Curate Mind traces.
11. Swap in final Llamita assets.
12. Tune Llamita behavior.

---

## 11. Questions Maicol should answer before the next build push

1. Do you approve ADR 0009's persona nav direction?
2. Should the visible persona labels be exactly: For anyone, Recruiters, AI Product Leaders, Product Managers?
3. Do you want Product Designers to remain invisible as an inference-only track?
4. Do you have the current resume PDF ready to add to `public/`?
5. Is Earnestly signup still required for v1, or should it be formally deferred?
6. Are there any specific Curate Mind traces you already know you want shown?
7. Are there facts, constraints, or positioning notes in your head that are not yet in `content/` or `docs/`?

---

## 12. Current shared rule

Before new feature work starts, the team should align on ADR 0009 and commit the chosen documentation state.

This protects the project from building against two different versions of the home page.
