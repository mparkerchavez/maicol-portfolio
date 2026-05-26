# Handoff 0003: Phase 1 punch list (review findings)

**From:** Claude
**To:** Codex
**Date:** 2026-05-25
**Status:** Open
**Related:** Handoff 0002 (Phase 1 brief), Spec 01 (Typography), Spec 03 (IA)

---

## What this is

A review of Phase 1 against Specs 01 and 03 surfaced a small set of follow-up items. None are blockers. None warrant a revert. They are small drifts and polish items that should be cleaned up before or during Phase 2 work, so the foundation matches the spec exactly.

For each item: the finding, the fix, and the impact if left alone.

---

## Items to fix

### 1. Negative letter-spacing on display and h1/h2 tokens was zeroed out

**Finding.** `src/app/globals.css` defines `--text-display-1--letter-spacing: 0`, `--text-display-2--letter-spacing: 0`, `--text-h1--letter-spacing: 0`, `--text-h2--letter-spacing: 0`. Spec 01 Section 3.1 and 3.2 specify negative values for editorial density.

**Fix.** Set the following values in `@theme`:
- `--text-display-1--letter-spacing: -0.03em`
- `--text-display-2--letter-spacing: -0.02em`
- `--text-h1--letter-spacing: -0.01em`
- `--text-h2--letter-spacing: -0.005em`

Verify the values render correctly on the home page hero and case study openers.

**Impact if left alone.** The big display text reads slightly loose, less editorial-dense than the Refined Editorial direction calls for. This is the single most visible visual drift from Spec 01.

### 2. Case study content lives in `src/data/case-studies.ts` instead of `content/case-studies/[slug].md`

**Finding.** Handoff 0002 step 9 directed mirroring the v2 case study markdown files into `content/case-studies/`. The folder still contains only `.gitkeep`. The content was embedded directly into the TypeScript data file.

**Fix.** Two-part:

1. Create `content/case-studies/capital-group.md`, `tech-trends.md`, and `innovation-sprints.md` with the full case study narrative content (mirrored from `Maicol_Job_Search_Identity_Guide_5.16.26.md`'s source v2 files and from the current `src/data/case-studies.ts` entries).
2. Refactor `src/data/case-studies.ts` to import the markdown content (via Next.js `gray-matter` or similar), keeping the structured metadata (slug, role, collaborators, methods, metrics, chips) in TypeScript but pulling the narrative body from the markdown files.

**Impact if left alone.** Editing case study text requires touching code. This conflicts with AGENTS.md ownership (Claude owns content, Codex owns code) and makes future revisions slower. Important to fix before Spec 04 voice work, which will iterate on case study copy.

### 3. ASCII arrows used throughout instead of Unicode arrows

**Finding.** Eight uses of `-&gt;` or `<-` across six files where the spec specified Unicode arrows (`→`, `←`, `↓`, `↑`). Locations:

| File | Line | Current | Should be |
|---|---|---|---|
| `src/app/page.tsx` | 23 | `MAICOL -&gt; ASK LLAMITA` | `MAICOL → ASK LLAMITA` |
| `src/app/work/[slug]/page.tsx` | 112 | `{"<-"} BACK TO INDEX` | `← BACK TO INDEX` |
| `src/app/work/[slug]/page.tsx` | 117 | `{next.cardTitle} -&gt;` | `{next.cardTitle} →` |
| `src/components/home/case-study-card.tsx` | 36 | `OPEN -&gt;` | `OPEN →` |
| `src/components/home/curate-mini-app.tsx` | 37 | `ASK LLAMITA TO EXPLAIN -&gt;` | `ASK LLAMITA TO EXPLAIN →` |
| `src/components/home/curate-mini-app.tsx` | 66 | `EXPLORE THE FULL EXPERIENCE -&gt; CURATEMIND.IO` | `EXPLORE THE FULL EXPERIENCE → CURATEMIND.IO` |
| `src/components/site/site-footer.tsx` | 34 | `OR -&gt; ASK LLAMITA WHAT TO ASK NEXT` | `OR → ASK LLAMITA WHAT TO ASK NEXT` |
| `src/components/site/site-header.tsx` | 15 | `{"<-"} BACK` | `← BACK` |

**Fix.** Replace each ASCII arrow with its Unicode equivalent. The arrows can be written directly in TSX (e.g., `OPEN →` not `{"->"}`).

**Impact if left alone.** Visually weaker affordances. ASCII arrows in monospace type read as code, which clashes with the editorial register.

### 4. Curate mini-app uses the words "DOWN", "UP", "EXPAND DOWN", "COLLAPSE UP" instead of arrow glyphs

**Finding.** `src/components/home/curate-mini-app.tsx` uses literal words ("DOWN" as a separator between THEME/POSITION/EVIDENCE, "EXPAND DOWN"/"COLLAPSE UP" as button labels). Spec 03 Section 6 showed `↓` between the trace stages.

**Fix.**
- Replace `<p className="my-6 text-mono-sm text-muted">DOWN</p>` with `<p className="my-6 text-mono-sm text-muted">↓</p>` (twice, between THEME→POSITION and POSITION→EVIDENCE).
- Button copy: `EXPAND DOWN` becomes `EXPAND ↓`. `COLLAPSE UP` becomes `COLLAPSE ↑`.

**Impact if left alone.** The mini-app reads as didactic and clunky. The visual rhythm intended by the spec is broken.

### 5. Development-helper text exposed at the bottom of the home page

**Finding.** `src/app/page.tsx` lines 59-64 render this paragraph to all visitors:

> "Signal examples are live: hover on Curate Mind or trust architecture for two seconds, then inspect the signal store behavior in devtools."

This is useful for development testing but should not be visible to real visitors.

**Fix.** Two options:
- **Option A (recommended):** wrap the block in a check that only renders during development (`process.env.NODE_ENV !== "production"`).
- **Option B:** remove the block entirely. The signal tracking still works without it; visitors do not need to be told about devtools.

**Impact if left alone.** Production visitors see a developer note that breaks the editorial voice and exposes the tracking system.

### 6. Site name in header is set to 22px directly instead of using a token

**Finding.** `src/components/site/site-header.tsx` line 18 uses `text-[22px]` (a Tailwind arbitrary value). Spec 01 reserves `h3` for this size range (clamps to 24px max).

**Fix.** Replace `text-[22px] leading-none` with `text-h3 leading-none`. The token already exists.

**Impact if left alone.** Small consistency issue. The site name should inherit from the token system like everything else.

### 7. Reverted commits in git history

**Finding.** Two commits were reverted: "Update portfolio website with new components and styling" and "Task start baseline checkpoint for code review". The reverts appear in the `chore/phase-1-foundation` branch's history.

**Fix.** Confirm with Maicol whether the reverts are intentional and whether the branch is at the desired state. If desired, the reverts can be squashed before merge to keep main's history clean. If the reverts represent a "we tried something else and rolled back", that is fine and the history can be left as-is.

**Impact if left alone.** Slightly noisier git history at merge time. Not functionally significant.

---

## Items to confirm with Maicol (not Codex action)

### A. Earnestly card content was Codex-authored

The "Make the thing usable before the demo becomes the product." tagline and the submitted-state copy ("Noted. Tiny clipboard, serious intent...") were authored by Codex rather than pulled from a spec or content file. The voice is in the right register but the final copy should be confirmed when Spec 04 (Llamita voice) lands.

This is not a Codex action item. Maicol and Claude will revisit during Spec 04 work.

### B. Untitled UI MCP integration status

Phase 1 used Untitled UI component primitives copied into `src/components/base/` and `src/components/foundations/`. The MCP-driven workflow described in ADR 0002 was not exercised. Worth confirming whether Codex got the UUI Pro API key working or whether it pulled components manually from the Pro library.

---

## How to handle these

When Codex picks up Phase 2 work (visual integration + behavior, depending on Spec 05 + assets), the first half-day of work should be cleaning up items 1 through 6. Items 7 and A and B are administrative.

After fixes are committed, Maicol or Claude verifies on the deployed Replit URL. Sign-off then unblocks the Phase 2 build.

---

## Resolution

[To be filled in when Codex addresses items 1-6 and confirms items 7, A, B.]
