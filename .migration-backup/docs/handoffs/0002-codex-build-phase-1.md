# Handoff 0002: Codex Build Phase 1 (Foundation + Static Site)

**From:** Claude
**To:** Codex
**Date:** 2026-05-25
**Status:** Open
**Related:**
- `AGENTS.md` (collaboration model)
- `CLAUDE.md` (writing rules and ownership)
- `docs/specs/00-prd.md` (north star)
- `docs/specs/01-typography.md` (type system)
- `docs/specs/03-information-architecture.md` (page structure and signal surfaces)
- `docs/specs/06-knowledge-base.md` (referenced in Phase 3, not needed yet)
- All seven ADRs in `docs/decisions/`

---

## What this is

The first concrete build phase. The goal is a working, deployable Next.js application with the full static site rendered: typography system, home page, three case study pages, signal tracking infrastructure, and placeholders for the Llamita character and chat. The dynamic AI layer (Llamita's behavior, the chat, intent inference, Curate Mind data, Earnestly backend) is intentionally out of scope for Phase 1.

Phase 1 produces a shippable draft. Subsequent phases layer in the AI character, the chat, and the intent inference.

---

## Read first (in this order)

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/specs/00-prd.md`
4. `docs/decisions/0001-nextjs-stack.md` through `0007-about-via-llamita.md`
5. `docs/specs/01-typography.md`
6. `docs/specs/03-information-architecture.md`
7. `docs/handoffs/0001-next-init-handoff.md` (the bootstrap brief)

If anything in those documents conflicts with this handoff, the spec or ADR wins.

---

## Phase 1 scope

### In scope

1. Bootstrap Next.js 15 (App Router) with TypeScript, Tailwind v4, ESLint, and the `src/` directory structure per handoff 0001.
2. Install supporting libraries:
   - `framer-motion`
   - `zustand`
   - `@anthropic-ai/sdk` (installed but not used in Phase 1)
   - Untitled UI v8 Pro (per their installation docs)
3. Implement the typography and design tokens system per Spec 01.
   - Self-host fonts in `assets/fonts/` (Playfair Display Light + Italic, Inter Light + Regular + Italic, JetBrains Mono Regular)
   - Configure Tailwind v4 `@theme` block in `src/styles/globals.css`
   - Apply base element styles (h1-h4, body, etc.) per Spec 01 Section 8
   - Add the custom utility classes for `text-display-1`, `text-display-2`, `text-mono`, `text-mono-lg`, `text-mono-sm`, `text-llamita-body`, `text-llamita-meta`
4. Build the global elements per Spec 03 Section 4:
   - Status strip (sticky top)
   - Header (name, contact email link, resume download link)
   - Footer (Let's Talk CTA, contact email, resume download, LinkedIn, copyright, "ask Llamita" affordance)
   - Llamita placeholder element (a styled square in the top-right corner with "L" inside; click handler logs "open chat" until the chat surface exists)
5. Build the home page (`src/app/page.tsx`) per Spec 03 Section 2:
   - Status strip
   - Header
   - Hero with the through-line toggle, all three framings, sessionStorage persistence, and the about affordance
   - Three case study cards (Capital Group, Tech Trends, Innovation Sprints)
   - Curate Mind mini-app shell with three placeholder trace cards (real data lands in Phase 3 via Spec 09)
   - Earnestly card with the email signup form UI (form validates input, but the submission handler is stubbed until Phase 3 / Spec 10)
   - Footer
6. Build three case study pages (`src/app/work/[slug]/page.tsx` for each of capital-group, tech-trends, innovation-sprints) per Spec 03 Section 3:
   - Header with breadcrumb (back to home)
   - Case study hero
   - Two-column layout (sticky sidebar 4-of-12, main 8-of-12)
   - Sticky sidebar with role, collaborators, methods, impact metrics
   - Three-act narrative loaded from `content/case-studies/[slug].md`
   - Llamita chip components inline at the points specified in Spec 03 (chips are styled and clickable; their click handlers stub the chat-open behavior)
   - Other Projects / Related Work section
   - Footer nav cycling between case studies
7. Implement the signal tracking infrastructure (per Spec 03 Section 5 and Section 7):
   - Zustand store for global signal state
   - Tagged-phrase listeners using `data-signal` attribute spans
   - Scroll-section tracking via Intersection Observer
   - Through-line toggle state writes to the store
   - Llamita chip clicks write to the store
   - Case study card clicks write to the store
   - Resume download, email, LinkedIn, Curate Mind link click events write to the store
   - The page-context contract assembly logic per Spec 03 Section 7 (the function that will package the snapshot for the chat backend in Phase 3)
   - Tagged phrase data file at `src/data/signal-phrases.ts` populated with the eight example phrases from Spec 03 Section 5 (more added as copy lands)
8. Build a small data structure for the three case studies (`src/data/case-studies.ts`) that maps each slug to its title, kicker, lead paragraph, sidebar contents, narrative sections, and chip prompts.
9. Mirror the three v2 case study files into `content/case-studies/`:
   - `content/case-studies/capital-group.md` (from `Use Case 1 - AI Enablement Meeting Prep Agent_v2.md`)
   - `content/case-studies/tech-trends.md` (from `Use Case 2 - Tech Trends Emerging AI Capabilities_v2.md`)
   - `content/case-studies/innovation-sprints.md` (from `Use Case 3 - Innovation Sprints AI Discovery_v2.md`)
   - Source files live in the parent directory `../` relative to this repo. Maicol will provide them if not accessible.
10. Configure Replit for deployment:
    - `.replit` with the run command
    - `replit.nix` pinning Node.js LTS and pnpm
    - Verify the site builds and serves on Replit
11. Verify everything at 1440x900 viewport (the 13-inch MacBook Air reference resolution) before any other viewport size, per Spec 03 Section 11.

### Out of scope (explicitly deferred)

- Llamita's character visual (waiting on Maicol + Gemini for asset production)
- Llamita's animation states and behavior tree (Spec 05, not yet written)
- The chat surface and chat panel (Spec 04 voice + Spec 07 architecture, not yet written)
- Intent inference scoring logic (Spec 08, not yet written). The *signal tracking plumbing* is in scope; the *inference logic that turns tracked signals into a track value* is not.
- Curate Mind data fetching (Spec 09, not yet written). The mini-app shell uses placeholder traces.
- Earnestly signup backend storage (Spec 10, not yet written). The form UI is built but the submission handler is stubbed.
- Color decisions beyond the B&W neutrals (per ADR 0003)
- Mobile optimization (per ADR 0006). The site renders on mobile but interactions are not optimized.

---

## What "done" looks like for Phase 1

A reviewer (Maicol) should be able to:

1. Open the deployed Replit URL on a 13-inch MacBook Air at default scaled resolution.
2. See the home page render with the full typography system applied.
3. Toggle the three through-line framings and watch the hero copy crossfade.
4. Click into each case study and read it end-to-end.
5. See the Llamita placeholder in the top-right of every page.
6. Click any signal-producing element (case study card, resume download, chip, through-line label, etc.) and have it log a signal event to the store. (Browser devtools should show the store state updating in real time.)
7. Submit the Earnestly form and see a UI confirmation message (real backend wiring waits for Phase 3).
8. See the Curate Mind mini-app with three placeholder traces and a working "explore the full experience" external link to curatemind.io.
9. Tab and arrow-key through the site with keyboard focus visible.
10. Pass automated checks: no TypeScript errors, no ESLint errors, no console errors at runtime, Lighthouse accessibility score above 90.

---

## Branch and commit conventions

- Work on branch `chore/phase-1-foundation`.
- Commit in logical chunks:
  1. Next.js bootstrap and dependencies
  2. Typography system and design tokens
  3. Global elements (header, footer, status strip, Llamita placeholder)
  4. Home page layout
  5. Through-line toggle
  6. Case study page template
  7. Each case study content
  8. Curate Mind mini-app shell
  9. Earnestly card UI
  10. Signal tracking infrastructure
  11. Replit configuration
- Each commit message references the relevant spec section (e.g., `[home] hero with through-line toggle, per spec 03 section 4`).
- Open a PR for Maicol to review. Do not merge to main without approval.

---

## Blockers to flag when you encounter them

If any of the following come up, write a note to `docs/handoffs/` and tag Maicol:

1. **Untitled UI v8 Pro API key.** You will need this configured before pulling components via MCP. Maicol has the license; he will provide the key when prompted.
2. **Replit project access.** If a Replit project does not already exist, ask Maicol whether to create one or whether he wants to set it up. Either path is fine; just confirm.
3. **Source case study files location.** The v2 case study files live in the parent directory of this repo. If they are not accessible from the Codex environment, ask Maicol to provide them.
4. **Spec ambiguity.** If a spec says something that conflicts with another spec, or if you genuinely cannot figure out what to do, do NOT improvise. Write a question to `docs/handoffs/` and tag Maicol.

---

## Anti-patterns to avoid

- Do not invent design decisions. The PRD and the specs cover what the site is. If you find yourself making a strategic call, you are out of bounds.
- Do not touch `docs/`, `content/`, or `assets/` (write or edit). Those are Claude's and Maicol's territories.
- Do not use em dashes anywhere. Not in commits, not in code comments, not in string literals. See CLAUDE.md for the full writing rules.
- Do not use enthusiasm language in any string the visitor will see.
- Do not implement mobile-specific interactions in Phase 1.
- Do not skip the 1440x900 viewport verification.

---

## Resolution

[To be filled in when Codex completes Phase 1. Include: the PR URL, the deployed Replit URL, any open issues for follow-up, any spec drift discovered during implementation that needs to be reflected back into the spec docs.]
