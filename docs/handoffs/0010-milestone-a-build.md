# Handoff 0010: Milestone A build

**From:** Claude (implementation session, role override per handoff 0009 Section 7)
**To:** Maicol, Claude, Codex
**Date:** 2026-06-10
**Status:** Build complete, open items listed below
**Related:** Handoff 0009 (work order), ADR 0009, ADR 0010, Spec 03, Spec 01

---

## What this is

The Milestone A implementation pass. Tasks 0 through 6 from handoff 0009 Section 7 are done and committed in stages. The home page now runs on the persona nav, the retired toggle and compensation copy are gone, the recruiter path works at 390px, and all four verification commands pass.

## What shipped, by commit

| Commit | Task | What it does |
|---|---|---|
| `54c741d` | 0 | Docs state protected: ADR 0009 (Accepted), ADR 0010, PRD and Spec 03 updates, handoffs 0008 and 0009, resume PDF in `public/`. |
| `7444b84` | 1 | Demolition. `through-line-toggle.tsx` deleted. `ThroughLine` type, `throughLine`, `setThroughLine`, `lastThroughLineChangedAtMs`, the `maicol-through-line` storage key, the `framings` model, and the `RANGE: $170K TO $190K` row all removed. Sweep of `src/` and `content/` confirms no compensation copy survives. |
| `017add1` | 2 | Persona nav. Four labels per ADR 0009, hero copy verbatim from Spec 03 Section 4c, hover previews, click commits with sessionStorage persistence (`maicol-selected-persona`) and a declared `persona-nav:<key>` signal. `selectedPersona` joined the signal store and the page-context contract. `inferredTrack` stays at confidence 0. Label-to-track mapping in `src/data/personas.ts`. |
| `ed45abb` | 3 | Home recomposition to Spec 03 Section 2: status strip, header, hero with persona nav, case study triptych, Curate Mind mini-app, Earnestly card, footer. Status strip restyled into a live session readout. Commentary rail, proof board, trace lab, cockpit, and pixel prototype image retired with `interactive-home.tsx`. |
| `6952bf1` | 4 | Responsive core. Recruiter path usable at 390px. Triptych and trace cards collapse at 1100px and 800px per Spec 03 Section 11. Chat affordances hidden below `md`. |
| `9dbd34e` | 5 | Chat input routed through `AppInput`. `npm run audit:uui` passes. |
| `ce4e20d` | 6 | Verification find: declared persona now hydrates on every page via `PageSignal`, not just home. |

## Verification results

All commands run clean on the final tree: `npm run typecheck`, `npm run build`, `npm run lint`, `npm run audit:uui`.

Resume links: exactly two remain (header, footer), both resolve to `/Maicol-Parker-Chavez-Resume.pdf`, served HTTP 200. The third cockpit resume link died with the cockpit; header and footer are the canonical surfaces per Spec 03.

Reviewed in a running browser at 1440x900 and 390x844: home with all four persona variants, `work/capital-group` at both sizes. `tech-trends` and `innovation-sprints` smoke-checked (same template). Persona click, hover preview, sessionStorage restore, declared signal event, status strip readout, and chat input submit all verified interactively. No horizontal overflow at either size. Display-1 renders at its 180px clamp at 1440 without overflowing.

Two bugs found and fixed during verification:

1. Icons passed as children to `OpenChatButton` dropped onto their own line. Tailwind preflight sets `svg` to `display: block` and the UUI Button wraps children in a plain span. `OpenChatButton` now wraps children in an inline-flex span.
2. The declared persona reset to `for-anyone` on hard navigation to a case study page, because the sessionStorage restore lived only in `HomeHero`. Moved to `PageSignal`.

## Deviations from spec, recorded here instead of spec edits

1. **Status strip content.** Spec 03 Section 2 still describes three static segments. Built as the live session readout from handoff 0009 Task 3: name, role status, declared persona, current section in view. The persona segment shows from `md` up, the section segment from `lg` up. Spec 03 needs a reconciliation pass.
2. **Hero transition.** Spec 03 Section 9 says the copy crossfades over ~200ms. Built as a sequential fade out and fade in totaling ~200ms. A true overlapping crossfade needs absolute positioning, which breaks layout because the persona variants differ a lot in height (the Recruiters line is roughly three times taller than For anyone at display scale). Reduced-motion renders a static swap.
3. **Hero type scale on small screens.** Below 768px the display line renders at `clamp(40px, 12vw, 64px)` instead of display-1's 80px floor. At 390px the 80px floor pushed the subhead more than a full screen down, which fails the usable-recruiter-path requirement. Desktop is untouched. The superseding mobile ADR should formalize or revise this.
4. **"Roughly half the viewport."** Spec 03 Section 4c expects the hero copy to take about half the viewport. At display-1's 180px clamp the For anyone display line alone is ~810px tall at 1440x900. This matches the previously shipped toggle hero, so I kept display-1 per Spec 01 and left the spec sentence for the reconciliation pass rather than inventing a smaller scale.
5. **Active persona styling.** Spec 03 Section 4b says Playfair italic. Built as Uncut Sans bold italic per ADR 0008. This is the known Spec 03 typography drift from handoff 0009 Section 4.
6. **Earnestly card has no signup form.** Spec 03 Section 7 and PRD 4.1 include email capture. Deferred per handoff 0009 Section 1. The old form component was removed from the tree; git history has it if the scope decision restores it.
7. **Chat affordances are desktop-only.** Case study chips, the about affordance, the footer ask-Llamita link, the trace explain link, and the Earnestly ask link hide below `md`, because the chat panel itself is `md`-up. A visible button that opens an invisible panel is worse than no button. The mobile bottom-sheet direction from handoff 0009 Section 6 restores these in Milestone B.
8. **Pixel prototype image dropped, not relocated.** It was cockpit furniture. No spot on the Spec 03 home structure earns it under the real-estate rule. The asset stays in `public/assets/prototype/` if a future surface wants it.
9. **Proof board and trace lab retired.** The work order allowed reusing them where they fit. The spec's triptych is the existing `CaseStudyCard` (matches Spec 03 Section 5 exactly), and the spec's trace card structure is the existing `CurateMiniApp` (matches Section 6). The tab-and-detail-panel patterns from the cockpit fit neither and went with `interactive-home.tsx`. Git history retains them.
10. **Idle observation content.** The `home.hero` observation described the dead toggle, so I rewrote it for the persona nav and removed `home.post-toggle` (its surface no longer exists). Observation surfaces remapped to the new section ids; `home.curate-mind` and `home.earnestly` keys now fire on their sections. Spec 04 Section 6 mirrors the old copy and needs the already-planned Claude pass.
11. **System prompt header.** `content/knowledge-base/00-system-prompt-header.md` now describes the declared persona instead of the toggle state in its visitor-context section.

## Open questions and items not in this pass

- **Curate Mind traces are still placeholders.** Milestone A Section 1 lists three real traces; picking them is next-action 5 (Maicol + Claude) and was not in the Task 0 to 6 work order. The shell is ready for the data.
- **`docs/specs/07-chat-architecture.md` appeared on disk mid-session** (created 2026-06-10 16:55, untracked), apparently from a parallel spec session. I did not commit or read past its header. Its owner should commit it.
- **Spec 03 reconciliation pass** (typography, status strip, deviations 1 through 5 above) is still owed by Claude per handoff 0009 next-action 9.
- **Superseding mobile ADR** is still owed before Milestone B hardens the chat surface.
- **Earnestly signup scope** (PRD 4.1 vs deferred) is still an open Maicol decision.
- **Header hide-on-scroll** (Spec 03 Section 4.1) was never implemented; pre-existing gap, unchanged here.
- **Git author identity** on this machine is the auto-generated hostname identity. Worth setting `git config user.name` and `user.email` before pushing anywhere public.

## Resolution

Open until Maicol reviews the running site and the deviations above.
