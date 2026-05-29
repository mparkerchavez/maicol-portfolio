# Handoff 0007: Phase 2 — Llamita Behavior Build

**From:** Claude
**To:** Codex
**Date:** 2026-05-28
**Status:** Open
**Related:**
- `docs/specs/05-llamita-behavior.md` (the spec this build implements)
- `docs/specs/04-llamita-voice.md` (observation and recovery content)
- `docs/specs/03-information-architecture.md` (toggle behavior, chat panel constraints)
- `docs/handoffs/0006-interactive-home-prototype.md` (current home structure)
- `src/stores/signal-store.ts`, `src/components/home/interactive-home.tsx`, `src/components/site/llamita-placeholder.tsx`, `src/components/site/pixel-llamita-mark.tsx`

---

## What this is

Phase 2 brings Llamita to life: her behavior states, the dwell-driven idle observations, the hover-look, and the two animations the IA spec deferred. Spec 05 is now written and is the source of truth for this build. This handoff turns it into a task list.

Decision from Maicol: build now against the `PixelLlamitaMark` placeholder. Do not wait for Gemini's sprite frames. The state machine, timers, hover-look, and animations should all run against the placeholder, with the final sprite frames swapping in later as a clean drop-in. Structure the work so that swap is a localized change, not a rewrite.

The Phase 1 punch list (Handoff 0003, items 1 through 6) is already resolved in the current code, so there is no cleanup prerequisite. Begin directly on the build.

## What the recipient needs to do

Implement Spec 05. The spec is the detail; this is the ordered task list.

1. **State machine (Spec 05 §1, §2).** Implement the six states (`idle`, `observing`, `talking`, `thinking`, `wrong`, `sleeping`) as a single source of truth, with exactly one state active at a time. Drive transitions off the existing `signal-store` events (`recordEvent`, `setInView`, `setThroughLine`, hover dwell). Implement the transition table in §2 top-to-bottom (first match wins) and the three guardrails: dwell suppressed while the chat panel is open, sleep never interrupts and wakes silently, only one `observing` cue in flight at a time.

2. **State-driven on-screen label (Spec 05 §1).** Replace the hard-coded `LLAMITA /// OBSERVING` string in `src/components/home/interactive-home.tsx` with a label driven by the current state. Use the labels in the §1 table (these are provisional; see Open Questions).

3. **Idle-observation timers (Spec 05 §4).** Per-surface dwell windows (home hero 12s, post-toggle 10s, case-study section 15s, expanded trace card 12s). An observation fires silently into the `observing` state and surfaces the observation text as a quiet, dismissable hint near the perch. It does not auto-open the panel. A click on Llamita while the hint shows opens the chat with that observation as the first message. Enforce the 30s global debounce floor, once-per-surface-per-session, reset on engagement, and full suppression while the chat is open. Pull the observation copy from Spec 04 §6 (content lives in `content/llamita-scripts/idle-observations.md`).

4. **Hover-look behavior (Spec 05 §3).** On pointer-enter of the about-affordance, Llamita's gaze shifts toward the affordance's live screen position; on pointer-leave she returns to her resting idle orientation. Gaze shift only: no state change, no panel, no voice. Read the affordance's bounding box rather than assuming a fixed direction, and degrade to a small bob when affordance and perch are near-vertically aligned.

5. **Through-line toggle crossfade (Spec 05 §6.1).** When the active framing changes (hover-preview or committed click), crossfade the `display-1` statement and the `body-lg` italic subhead over 200ms, `ease-out`, with a ~4px upward translate on the incoming text. Hover-preview and committed-click share the motion; preview must not write to the store. Rapid toggling cancels the in-flight crossfade and restarts from current opacity.

6. **Chat panel slide-in (Spec 05 §6.2).** Slide in from the right to a 380px resting width, overlay not push (no page reflow), 260ms ease-out. Close reverses at 200ms. Note: the panel currently only fires `console.info("open chat")` in `OpenChatButton`; this handoff covers the panel's entrance motion and its open/close state, not the chat backend (Spec 07).

7. **Sleep timer (Spec 05 §5).** After 90s with no pointer move, scroll, key, or focus anywhere on the document, enter `sleeping`. Any input wakes to `idle` within a frame, silently.

8. **Reduced motion (Spec 05 §6).** Honor `prefers-reduced-motion` throughout: crossfades become instant swaps, loops hold a single frame, the slide-in becomes an opacity fade, and the hover-look and observation cues are suppressed (the hint text still appears; the animation does not).

## Context the recipient needs

- **Spec 05 is the contract.** Where this list and the spec differ, the spec wins. Section 8 of the spec already lists what is buildable now versus blocked, and matches this handoff.
- **Build against the placeholder.** `PixelLlamitaMark` and `LlamitaPlaceholder` are the current stand-ins. The six states each need a visual treatment; until Gemini's frames land, the placeholder plus the state label carries the state. Isolate the sprite rendering so swapping in real frames later touches one component, not the state machine.
- **The signal-store already exists.** It tracks `inView`, `lastHover`, `recentBehavior`, `throughLine`, and holds `inferredTrack` (currently always `for-anyone`, confidence 0; Spec 08 will populate it). Drive behavior off the events that exist; do not block on inference.
- **Voice content is owned by Claude.** Do not author observation or recovery copy. Wire what Spec 04 provides. If a needed string is missing, flag it back rather than inventing it.
- **Viewport target (IA §11).** Verify at 1440x900 (13" MacBook Air) first. The panel must open without breaking the layout beneath it.

## Out of scope (do not build in Phase 2)

- The chat backend, streaming, message format, and the `thinking → talking` handoff on real tokens. That is Spec 07 (Phase 3). Build the `thinking` state so it is ready, but it can be exercised with a stub until Spec 07.
- Intent-inference scoring and any track-aware NBA display. The NBA panel stays silent on the inferred track in v1 (Spec 05 §7). Spec 08, deferred to v2.
- The final pixel sprite frames. Maicol + Gemini.
- Curate Mind data integration and the Earnestly backend (Phase 3/4).

## Open questions

- **Dwell thresholds.** The windows (12/10/15/12s), the 30s floor, and the 90s sleep threshold are first-pass values. Build them as named, easily-tuned constants so we can adjust from prototype observation without hunting through logic.
- **State label wording.** `RECALIBRATING` (for `wrong`) and `RESTING` (for `sleeping`) are provisional and may change after a voice pass with Maicol. Keep them in one place.
- **Sleep on backgrounded tabs.** Should `sleeping` fire faster (or immediately) when the tab loses visibility, separate from the 90s idle threshold? Likely yes. Flag your recommendation when you reach the sleep timer.
- **Hover-look near-aligned fallback.** The degrade-to-bob behavior needs a look in the running prototype to confirm it reads as intentional. Surface it for review once it runs.

## Resolution

Implemented 2026-05-29 by Codex.

What landed:

- Added the six-state Llamita behavior layer: `idle`, `observing`, `talking`, `thinking`, `wrong`, and `sleeping`, with one active state at a time.
- Added named, tunable constants for state labels, dwell windows, the 30s observation floor, the 90s sleep threshold, observation cue timing, and the chat stub timing in `src/lib/llamita-behavior.ts`.
- Added `content/llamita-scripts/idle-observations.md` from Spec 04 Section 6, then wired observations from that content file instead of hard-coding voice copy in components.
- Added the global behavior controller, observation hint, chat panel shell, and placeholder sprite renderer. The final sprite swap should be localized to `src/components/site/llamita-sprite.tsx` and `src/components/site/pixel-llamita-mark.tsx`.
- Replaced the hard-coded home rail label with the current behavior state label.
- Added dwell-triggered observation hints with dismissal, global debounce, once-per-surface tracking, chat-open suppression, and click-to-open with the observation as the first chat message.
- Added the about-affordance hover-look target, including the near-aligned bob fallback.
- Added the through-line copy crossfade with the Spec 05 timing and reduced-motion instant fallback.
- Added the right-edge 380px chat panel overlay. It does not push or reflow the page. Close reverses at 200ms.
- Added the 90s sleep timer and silent wake on pointer, scroll, key, or focus input.
- Added reduced-motion handling for crossfade, panel entrance, sprite loops, hover-look, and observation cue animation.

Verification:

- `npm run typecheck` passes.
- `npm run build` passes.
- Browser verification at 1440x900 passes for the requested first-pass checks:
  - Chat panel opens at 380px from the right with no page reflow and no horizontal scroll.
  - Chat panel closes cleanly.
  - Through-line crossfade works, including the longer Product Designer copy without text/image overlap.
  - Home hero dwell observation fires from Spec 04 copy.
  - Clicking Llamita while the observation hint is visible opens the panel with that observation as the first message.

Open questions to settle:

- **Dwell thresholds:** implemented as first-pass constants. Recommendation: keep the current 12s / 10s / 15s / 12s values for prototype review, then tune after Maicol watches a few sessions.
- **State label wording:** implemented in one place. `RECALIBRATING` and `RESTING` still need the voice pass called out in the spec.
- **Sleep on backgrounded tabs:** not added beyond the 90s inactivity threshold. Recommendation: add a faster `visibilitychange` path if Maicol wants sleeping to mean "not currently attended."
- **Hover-look near-aligned fallback:** implemented as a small bob when the affordance and perch are nearly vertically aligned. Needs Maicol review in the running prototype to confirm it reads as intentional.
