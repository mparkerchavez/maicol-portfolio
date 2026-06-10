# ADR 0010: V1 calibration runs on declared persona and page context; behavioral inference is deferred

**Status:** Accepted (approved by Maicol, 2026-06-10)
**Date:** 2026-06-10
**Decision-maker:** Maicol
**Author:** Claude
**Relates to:** ADR 0005 (five intent tracks), ADR 0009 (persona nav)

---

## Context

ADR 0005 defined five inferred intent tracks. PRD Section 4.1 scoped a multi-layered behavioral scoring system (hover dwell, scroll velocity, composite patterns, Spec 08) to infer the visitor's track. Spec 08 has not been written. The implemented `inferredTrack` is permanently `for-anyone` at confidence 0 (Handoff 0008, gap 10).

Three pressures argue against building the scoring engine before launch:

1. **Signal poverty.** Session-only signals on a four-page site are thin. A few minutes of scroll and hover rarely supports a confident persona guess.
2. **Failure-mode asymmetry.** A wrong inferred observation lands as creepy or gimmicky in front of the most evaluative audience. The PRD's "disarmingly accurate" bar is the hardest success criterion on the list, and the inference engine is the only component that can fail it publicly.
3. **The declared signal is now free.** ADR 0009's persona nav gives the system a high-confidence, visitor-declared persona at zero inference cost. The visitor's own chat messages are the second-highest signal on the site and also require no scoring.

The site's own thesis (validate before you build) applies to the site itself. The scoring engine should be built when evidence shows the declared signal is insufficient, not before.

## Options considered

### Option A: Build Spec 08 scoring for launch
- Pros: Full expression of the inference thesis.
- Cons: Most expensive remaining workstream, least reliable output, worst failure mode, delays launch during an active job search.

### Option B: Declared persona plus page context for v1; scoring deferred behind evidence
- Pros: Roughly 90 percent of the calibration value at a fraction of the cost. No wrong-guess moments. Removes the "click everything" adversarial problem the PRD specced defenses against. Launchable weeks sooner.
- Cons: The Product Designers track has no declared path and is reachable only through conversation. The PRD's inference language needs a follow-up edit.

### Option C: No calibration at all
- Cons: Abandons the thesis. Not considered seriously.

## Decision

**Option B.** V1 calibration inputs are exactly three:

1. `selectedPersona`, declared via the persona nav (ADR 0009), default `for-anyone`.
2. Page context: current page and section in view.
3. The visitor's own chat messages, interpreted in conversation rather than scored.

Raw signal events (clicks, section dwell) may continue to be recorded for later analysis, but nothing scores them and no visitor-facing behavior changes based on them in v1. Llamita's observations are driven by section-in-view and declared persona only.

Spec 08 (intent inference) moves post-launch and is gated on watch-session evidence: it gets built only if observed visitors demonstrate calibration needs the declared persona does not cover.

## Consequences

### Positive
- Launch sooner with no wrong-guess risk. Persona nav, chips, page context, and chat still carry full calibration.
- Architecture simplifies: no scoring thresholds, no composite patterns, no anti-gaming design in v1.
- The de-scope is itself a tellable product story: the declared signal made the inference engine unnecessary for launch, so it was cut.

### Negative
- Product Designers (inference-only per ADR 0009) has no v1 entry path except conversation with Llamita and the Curate Mind content.
- PRD Section 4.1 (intent inference paragraph) and success criterion 4 overstate v1. Criterion 4 should be reworded from "disarmingly accurate" to a page-aware standard (an observation that demonstrates the system knows what the visitor is reading).

### Neutral
- `inferredTrack` stays in the page-context contract (Spec 03, Section 7) with confidence 0 until Spec 08 lands. No contract change needed.

## Notes

- Follow-up edits required: PRD Section 4.1 and success criterion 4; Spec 05 observation triggers (section-in-view and declared persona only); Spec 03 signal inventory gets a note that medium and low signal surfaces are record-only in v1.
- The signal-collection plumbing already built (Zustand store, tracked sections, signal anchors) stays. It is the data foundation for the post-launch Spec 08 decision.
