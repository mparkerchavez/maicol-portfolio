# Handoff 0004: Phase 1.5 — UUI Integration and Typography Pivot

**From:** Claude
**To:** Codex
**Date:** 2026-05-26
**Status:** Open
**Related:**
- `docs/specs/01-typography.md` (revised, this handoff implements the revision)
- `docs/decisions/0002-untitled-ui-pro.md` (UUI usage intent, currently under-implemented)
- `docs/decisions/0008-typography-pivot-uncut-sans.md` (the typography decision driving this work)
- `docs/handoffs/0002-codex-build-phase-1.md` (the original Phase 1 brief)
- `docs/handoffs/0003-phase-1-punch-list.md` (the earlier punch list, fully resolved)

---

## What this is

Two refactors that go together. Both address spec drift caught during Phase 1 review.

1. **UUI Integration.** Phase 1 installed Untitled UI v8 Pro components into `src/components/base/` and `src/components/foundations/` (80+ files), but the application code never imported any of them. Inputs, buttons, form controls, and other primitives are currently hand-rolled with raw HTML elements and inline Tailwind. ADR 0002 specifies that UUI should provide these primitives. This refactor wires the application to actually use UUI components.

2. **Typography pivot to Uncut Sans.** Per ADR 0008, the "Refined Editorial" direction with Playfair Display serif is retired. The new direction is "Bold Editorial": a single distinctive sans-serif (Uncut Sans) for display and body, paired with JetBrains Mono for the data-index register and Llamita's chat. The revised Spec 01 defines the full system.

Both pieces of work land in the same PR because they touch overlapping files (the components getting UUI primitives are the same components that need to reference the new typography tokens).

---

## Read first (in this order)

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/specs/00-prd.md`
4. `docs/decisions/0008-typography-pivot-uncut-sans.md` (new, the rationale for the pivot)
5. `docs/specs/01-typography.md` (revised, the new system in detail)
6. `docs/decisions/0002-untitled-ui-pro.md` (the UUI usage intent)
7. `docs/specs/03-information-architecture.md` (page structure, unchanged)
8. This handoff

If anything in those documents conflicts with this handoff, the spec or ADR wins.

---

## Phase 1.5 scope

### Part A: Font files (the only Maicol-side task)

**Maicol places the Uncut Sans font files in `public/assets/fonts/`** before Codex begins typography work. Expected filenames per Spec 01 Section 8:

- `UncutSans-Light.woff2`
- `UncutSans-LightItalic.woff2`
- `UncutSans-Regular.woff2`
- `UncutSans-RegularItalic.woff2`
- `UncutSans-Bold.woff2`
- `UncutSans-Black.woff2` (if Maicol has it)

If Maicol's downloaded set uses different filenames or different weights, Codex adapts:
- Map the actual filenames to the `@font-face` declarations in `globals.css`
- If Italic ships only at Regular weight (not Light), update Spec 01's Open Questions section accordingly
- Light + Regular + Bold is the minimum. Black is a bonus.

### Part B: Typography pivot

1. **Remove the old fonts.** Delete from `public/assets/fonts/`:
   - All `Inter-*.woff2` files
   - All `PlayfairDisplay-*.woff2` files
   - `JetBrainsMono-Regular.woff2` stays.

2. **Rewrite `src/app/globals.css`** per Spec 01 Section 8 (Implementation):
   - New `@font-face` block for Uncut Sans (all weights Maicol provides)
   - Updated `@theme` token block with the new family, weight, and tracking values
   - Updated `@layer base` element styles (h1/h2 are Bold 700, h3/h4 are Regular 400, body uses font-sans which is now Uncut Sans)
   - Updated `@utility` classes for `text-display-1`, `text-display-2` (now Uncut Sans Bold/Black, no more font-display variable referring to Playfair)
   - The `text-mono*` utilities are unchanged
   - The `text-llamita-*` utilities are unchanged
   - The color tokens and spacing scale are unchanged

3. **Sweep the source for hard-coded font references.** Search `src/` for:
   - `font-display` (was Playfair, now points at Uncut Sans, but the variable name may remain since Spec 01 sets `--font-display` and `--font-sans` to the same value)
   - `Playfair`, `serif`, `italic Playfair`
   - Any `font-family: "Inter"` or `font-family: "Playfair Display"`
   - Replace with the new tokens. Most code uses `var(--font-sans)` or the `font-sans` Tailwind class, which automatically picks up the new family.

4. **Check the through-line toggle (`src/components/home/through-line-toggle.tsx`).** It currently uses `font-display italic text-ink` for the active label. Under the new system, that should be Uncut Sans Italic (h3 Regular weight is fine, or bump to Bold Italic for stronger emphasis). Decide and document the choice.

### Part C: UUI integration

Per ADR 0002, UUI provides primitives for:
- Buttons
- Inputs and form controls
- Card layouts
- Navigation patterns
- Modal/dialog primitives
- Tooltip primitives

The following components currently bypass UUI and should be refactored to use UUI primitives:

#### 1. Earnestly card form (`src/components/home/earnestly-card.tsx`)

Currently uses raw `<input>` and `<textarea>` with inline Tailwind. Replace with UUI's `Input` and `TextArea` (or equivalent — Codex picks the right UUI component via MCP).

Specifically:
- Email field → UUI Input with type="email"
- "What would you most want from this?" → UUI TextArea
- Submit button → UUI Button (or the project's button primitive built on UUI)

Preserve:
- The form's submit behavior (signal recording, console.info stub)
- The submitted-state confirmation message (current Llamita-voice copy stays)
- The visual register (paper background, hairline border, ink text)

#### 2. Site header (`src/components/site/site-header.tsx`)

Currently uses raw `<a>` tags styled with Tailwind. The CONTACT and RESUME links should use UUI's link or button primitives for consistency and accessibility.

Specifically:
- Wrap the SignalAnchor pattern around UUI's link/button styled component
- Maintain the signal-recording behavior (don't break the signal-store integration)

#### 3. Case study card (`src/components/home/case-study-card.tsx`)

Currently a custom card wrapper. Refactor to use UUI's card primitive as the structural shell. Preserve:
- The hover state (interactive-card class)
- The arrow affordance (OPEN →)
- The metric chips
- The link behavior to `/work/[slug]`

#### 4. Llamita chip component (`src/components/case-study/llamita-chip.tsx`)

Currently a custom chip. Refactor to use UUI's button or chip primitive. Preserve the click handler that opens the chat (stubbed for now).

#### 5. Footer links (`src/components/site/site-footer.tsx`)

Same treatment as the header: use UUI's link styling primitives.

### What we do NOT change

- The Zustand signal store and tagged-phrase listener architecture. Working as designed.
- The page-context contract.
- The case study data structure or content.
- The Curate Mind mini-app structure (UUI may inform the card styling, but the three-trace layout is intentional).
- The IA, sitemap, or navigation structure.
- Any color decisions (B&W per ADR 0003).
- The signal helper paragraph at the bottom of `page.tsx` (already correctly gated by `NODE_ENV`).

### What's out of scope (deferred)

- Llamita's visual character (Phase 2, waiting on Maicol + Gemini assets)
- Chat surface and chat backend (Phase 3)
- Intent inference scoring (Phase 4)
- Curate Mind data integration (Phase 3/4)
- Earnestly signup backend storage (Phase 3/4)
- Color introduction (per ADR 0003)
- Mobile-specific work (per ADR 0006)

---

## What "done" looks like for Phase 1.5

A reviewer (Maicol) should be able to:

1. Open the deployed Replit URL on a 13-inch MacBook Air.
2. See the entire site rendered in Uncut Sans (display, headings, body) and JetBrains Mono (metadata, intent labels, Llamita placeholder).
3. See no trace of Playfair Display or Inter anywhere in rendered text or network requests.
4. See display headlines render with the dramatic Bold/Black weight and tight letter-spacing per Spec 01 Section 3.1.
5. See body-lg paragraphs render in Light weight (300) for editorial elegance.
6. Interact with the Earnestly form and see UUI Input and TextArea components rendering (recognizable by their consistent UUI styling).
7. See header CONTACT and RESUME links and footer links rendering with UUI primitive styling.
8. See case study cards with the UUI card primitive providing structure.
9. Click any signal-producing element and have it still record events in the signal store. (Behavior preserved.)
10. Confirm via devtools that no console errors or hydration warnings appear at runtime.
11. Pass TypeScript and ESLint checks.

---

## Implementation order

A suggested order so Codex doesn't trip over itself:

1. **Confirm font files are in place.** If `public/assets/fonts/UncutSans-*.woff2` is not there, ping Maicol before starting any code changes.
2. **Rewrite `globals.css`** per Spec 01 Section 8. Verify the site loads with the new fonts (text will visibly change in dev).
3. **Sweep for hard-coded font references** and update them.
4. **Test the through-line toggle** specifically (it has the active-label italic treatment that depends on the old font system).
5. **Integrate UUI** component-by-component, starting with the Earnestly form (simplest, most isolated).
6. **Site header and footer** UUI integration.
7. **Case study card** UUI integration.
8. **Llamita chip** UUI integration.
9. **Visual review at 1440x900.** Take screenshots before requesting Maicol's review.
10. **Verify Replit deploy** still passes (Node 22, Cloud Run port). Should be unaffected, but verify.

---

## Branch and commit conventions

- Work on branch `chore/phase-1-5-refactor`.
- Commit in logical chunks:
  1. globals.css typography rewrite
  2. font-reference sweep
  3. each UUI component integration as its own commit
  4. final cleanup pass
- Each commit message references the spec or ADR (e.g., `[typography] rewrite globals.css per ADR 0008 and Spec 01 v2`).
- Open a PR for Maicol to review when complete.

---

## Blockers to flag

If you encounter any of these, write a note to `docs/handoffs/` and tag Maicol:

1. **Font files not in `public/assets/fonts/`.** Maicol places these manually. Do not start typography work until they are there.
2. **Uncut Sans weights missing.** If only Regular ships (no Light, no Bold), Spec 01's scale is over-specified for the available files. Pause and flag.
3. **UUI primitives that don't fit a specific use case.** If you encounter a place where UUI's component doesn't match what Spec 03 calls for, flag it with the specific case rather than improvising.
4. **Hydration warnings or runtime errors** introduced by UUI components. UUI components are usually Client Components, so any new "use client" boundaries should be documented in commit messages.

---

## Anti-patterns to avoid

- Do not change the strategic content (case study copy, Llamita placeholder voice, affordance copy).
- Do not add color anywhere (per ADR 0003).
- Do not skip the typography font-face block in favor of `@fontsource/uncut-sans` or similar. Self-host from `public/assets/fonts/` per Spec 01.
- Do not use UUI components in places where a raw element is sufficient (e.g., a simple `<p>` for body text doesn't need a UUI wrapper).
- Do not use em dashes anywhere. No enthusiasm language anywhere. Standard CLAUDE.md rules apply.

---

## Resolution

[To be filled in when Codex completes Phase 1.5.]
