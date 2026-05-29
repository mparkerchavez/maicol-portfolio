# Spec 05: Llamita Behavior

**Purpose:** Defines Llamita's behavior states, when each one fires, the motion that carries them, the hover-look behavior, and the dwell-timer rules for idle observations.
**Owner:** Claude
**Status:** Draft
**Last updated:** 2026-05-28
**Related ADRs:** 0005 (Five intent tracks), 0006 (Desktop-only v1), 0007 (About via Llamita).
**Related specs:** 00 (PRD), 01 (Typography), 03 (Information Architecture), 04 (Llamita Voice), 06 (Knowledge Base). Voice content lives in 04. Chat backend lives in Spec 07 (not yet written). Intent inference scoring lives in Spec 08 (not yet written).

---

## Why this spec exists

Llamita is the site's animating idea: a character who pays attention to the page and offers a way in. Spec 04 defines what she says. This spec defines how she behaves before and around the words: the states she moves through, what makes her move between them, and the motion that makes those moves feel intentional rather than twitchy.

Without this spec, Codex has voice content and a static placeholder but no rule for when Llamita stirs, when she goes quiet, or how the through-line toggle and chat panel animate. Those rules are load-bearing for the thesis. A character who never moves reads as a logo. A character who moves too much reads as a nuisance. This spec sets the cadence.

## Scope

### In scope

- The six behavior states: `idle`, `observing`, `talking`, `thinking`, `wrong`, `sleeping`.
- The state machine: what each state means, what triggers entry, what triggers exit.
- Idle observation timing: dwell windows per surface, the silent-fire rule, debounce.
- The hover-look behavior on the about-affordance.
- Motion rules: the through-line toggle crossfade, the chat panel slide-in, state-transition motion, reduced-motion fallbacks.
- What Codex can build now versus what waits on Spec 08.

### Out of scope

- Voice content: greetings, observations, chip responses, refusals. Lives in Spec 04.
- The chat technical implementation: streaming, message format, tool-call plumbing, page-context contract. Lives in Spec 07.
- Intent inference scoring: how signals become an `inferredTrack` value. Lives in Spec 08.
- The visual character design: the pixel sprite and its frames. Owned by Maicol and Gemini. This spec names the states the art must cover; it does not draw them.
- The chat surface visual design: panel chrome, message bubbles, in-panel chips. Lives in a component spec when written.
- Surfacing the inferred track in the NBA panel. Deferred to v2 (see Section 7 and Open Questions).

---

## The spec

### 1. The six states

Llamita is always in exactly one state. The art must supply a frame (or short loop) for each. The label that renders next to her on screen follows the state.

| State | What it means | Visual register | On-screen label |
|---|---|---|---|
| `idle` | Default. She is present, watching, not speaking. | Slow breathing loop. Eyes track gently toward the active content region. | `LLAMITA /// IDLE` |
| `observing` | She has something tied to the current content and is signalling it without speaking. | A small attention cue: a blink, a lean, a single bob. Non-looping, fires once per trigger. | `LLAMITA /// OBSERVING` |
| `talking` | The chat panel is open and she is delivering a response. | Active loop synced to streaming text. | `LLAMITA /// TALKING` |
| `thinking` | A response is being generated, tool call in flight. | A working loop: a held pose with a subtle indicator. | `LLAMITA /// THINKING` |
| `wrong` | She offered a framing that missed and is recovering. | A brief sheepish beat, then back to `talking`. | `LLAMITA /// RECALIBRATING` |
| `sleeping` | Long inactivity. She has powered down to stay polite. | Settled, eyes closed, very slow loop or static. | `LLAMITA /// RESTING` |

Notes:

- `observing` is the state the home rail currently hard-codes as a static label (`LLAMITA /// OBSERVING` in `src/components/home/interactive-home.tsx`). That label is correct as a *default* for the home hero, but once the state machine ships it must be driven by state, not hard-coded. Flagged as a Codex follow-up in Section 8.
- `wrong` is the behavior pairing for Spec 04 Section 7 (wrong-but-charming recovery). The *content* of the recovery lives in Spec 04. This spec only owns the visual beat and the transition back to `talking`.
- The on-screen labels follow Spec 01's `mono` / `llamita-meta` token. Wording is provisional and can be tuned with Maicol.

### 2. The state machine

Entry and exit conditions. Read top to bottom; the first matching trigger wins.

| From | Trigger | To |
|---|---|---|
| `idle` | Dwell timer fires for the current surface (Section 4) | `observing` |
| `idle` | Visitor opens the chat (click Llamita, click an affordance, click a chip) | `talking` (after a `thinking` beat if a response must generate) |
| `idle` | No interaction anywhere for the sleep threshold (Section 5) | `sleeping` |
| `observing` | Observation animation completes, no click | `idle` |
| `observing` | Visitor clicks Llamita | `talking`, with the observation as the first chat message (per Spec 04 Section 6) |
| `talking` | Response delivery completes | `idle` (panel stays open; she returns to a watchful rest) |
| `talking` | A new message is submitted | `thinking` |
| `thinking` | First token of the response arrives | `talking` |
| `thinking` | The response is a recovery from a missed framing | `wrong`, then `talking` |
| `wrong` | Sheepish beat completes | `talking` |
| `sleeping` | Any pointer move, scroll, key, or focus on the document | `idle` |
| any | Visitor closes the chat panel | `idle` |

Guardrails:

- The dwell timer that drives `idle → observing` is suppressed while the chat panel is open. She does not nudge the page while she is mid-conversation.
- `sleeping` never interrupts. It is a quieting-down, not an alert. Waking from `sleeping` does not fire an observation; it returns to plain `idle`.
- Only one `observing` cue may be in flight at a time. A new dwell trigger while already `observing` is dropped, not queued.

### 3. The hover-look behavior (ships in v1)

The about-affordance ("To learn about Maicol, ask Llamita →", per ADR 0007 and IA Section 4d) sits in the home hero region. The arrow points up and to the right, toward Llamita's perch.

Behavior:

- On pointer-enter of the about-affordance, Llamita turns to "look back" toward it: a small directional head/eye shift toward the affordance's screen position, holding while the pointer remains.
- On pointer-leave, she returns her gaze to the active content region (her resting `idle` orientation).
- This is a gaze shift only. It does not change state. She remains `idle` (or `observing`, if a cue is mid-play) throughout. It does not open the panel, fire an observation, or emit voice content.
- The look is a directional bias applied on top of the current idle loop, so it composes with breathing rather than replacing it.

Rationale: this is the cheapest possible demonstration of the character's core promise. She reacts to the visitor's attention with her attention, and it costs no words and no panel. IA Section 10 deferred the ship/cut call to this spec; the decision is to ship it in v1.

Constraint: the gaze target is the affordance's live screen position, so the behavior must read the affordance's bounding box rather than assume a fixed direction. On viewports where the affordance and the perch are close to vertically aligned, the look degrades to a small bob rather than an awkward near-zero rotation.

### 4. Idle observations: timing

Spec 04 Section 6 owns *what* Llamita observes and explicitly defers *when* to this spec: "The dwell timer decides when she speaks; the content decides what she says." This section is the timer.

An idle observation fires when the visitor has dwelled on a surface past its window without engaging it. "Engaging" means a click, a chip, a toggle, or opening the chat. Plain scrolling within a surface does not count as engagement; leaving the surface does.

Dwell windows by surface:

| Surface | Dwell window | Fires |
|---|---|---|
| Home hero, no scroll and no toggle interaction | 12s | The home hero observation (Spec 04 Section 6.1) |
| Home hero, toggle clicked but no further movement | 10s after the toggle click | The toggle follow-up observation |
| Case study section in view, no chip clicked | 15s | The section-specific observation for that section |
| Curate Mind trace card expanded, no affordance click | 12s | The trace-card observation |

Firing behavior:

- An observation fires *silently into the `observing` state*. It plays the attention cue (Section 1) and surfaces the observation text as a quiet, dismissable hint near the perch. It does not auto-open the chat panel.
- A click on Llamita while the hint is showing opens the chat with that observation as the first message (per Spec 04 Section 6).
- If the visitor ignores it, the `observing` cue completes, the hint fades, and she returns to `idle`. The same surface does not re-fire its observation in the same session unless the visitor leaves and returns to it.

Debounce, so she is not chatty:

- A global floor of 30s between any two observation fires, regardless of surface. Crossing into a new surface before the floor elapses defers that surface's observation until the floor clears.
- Maximum of one unsolicited observation per surface per session.
- The dwell timer resets on any engagement and is fully suppressed while the chat panel is open (Section 2 guardrail).

These thresholds are first-pass values, tunable once real session data exists. The structure (per-surface window, silent fire, global floor, once-per-surface) is the spec; the exact seconds are parameters.

### 5. Sleep

After 90s of no pointer move, scroll, key, or focus event anywhere on the document, Llamita enters `sleeping`. This is a politeness state: a long-idle tab should not show a perpetually breathing character burning attention. Any input wakes her to `idle` within one frame. Waking is silent (Section 2 guardrail).

### 6. Motion rules

All motion obeys `prefers-reduced-motion`. When reduced motion is requested, crossfades become instant swaps, loops hold on a single frame, the slide-in becomes an opacity fade, and the hover-look and observation cues are suppressed (the hint text still appears; the animation does not).

#### 6.1 The through-line toggle crossfade

IA Section 9 specifies a crossfade and defers easing and motion here. When the active framing changes (hover-preview or committed click), the `display-1` statement and the `body-lg` italic subhead crossfade.

- Duration: 200ms.
- Easing: `ease-out` (`cubic-bezier(0.0, 0.0, 0.2, 1)`). Content arrives quickly and settles, rather than easing in slowly.
- The outgoing copy fades out and the incoming copy fades in over the same window, with a small (~4px) upward translate on the incoming text to give the swap direction.
- Hover-preview and committed-click use the same motion. The difference is in state (preview does not write to the store), not in animation.
- Rapid toggling cancels the in-flight crossfade and starts the new one from the current opacity, so fast hovering across labels does not stack or stutter.

#### 6.2 The chat panel slide-in

IA Section 11 fixes the panel at 380px, overlay (not push), so the page does not reflow.

- The panel slides in from the right edge, translating from fully off-screen to its 380px-wide resting position.
- Duration: 260ms. Easing: `ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`) for a decisive settle.
- A backdrop scrim is out of scope here; if Spec 07 or the component spec adds one, it fades in over the same window.
- Close reverses the motion at 200ms.
- Because the panel overlays rather than pushes, no layout animation runs on the page beneath it.

#### 6.3 State-transition motion

- `idle → observing`: the attention cue plays once (~600ms), then holds the hint until dismissed or timed out.
- `thinking`: enters immediately on submit, no transition flourish, so the visitor sees instant acknowledgment.
- `thinking → talking`: the working loop hands off to the talking loop on first token, no gap.
- `wrong`: a brief beat (~500ms) before the recovery text begins streaming.
- `* → sleeping`: a slow settle (~800ms). `sleeping → idle`: a quick wake (~200ms).

### 7. The NBA panel and the inferred track (v1: silent)

Spec 04 Section 12 flagged that the inferred track stays silent unless asked, but that "Spec 05 may surface this differently in the NBA panel." Decision for v1: stay silent.

- The NBA panel may present a calibrated next best action (per ADR 0005's per-track NBA column), but it does not name or display the inferred track to the visitor in v1. Visitors never see "you are being routed as a Recruiter."
- Llamita stays silent on the track unless the visitor asks or declares one, consistent with the current Spec 04 default.
- Surfacing the track in the NBA panel is deferred to v2 and depends on Spec 08 producing a confidence-scored `inferredTrack` worth showing. Revisit when Spec 08 lands.

### 8. Dependencies and handoff to Codex

What Codex can build now, off the existing `signal-store`:

- All six states and their transitions (Section 2), driven by store events that already exist (`recordEvent`, `setInView`, `setThroughLine`, hover dwell).
- The dwell-timer logic and observation firing (Section 4), reading `inView`, `lastHover`, and `recentBehavior`.
- The hover-look behavior (Section 3), reading the about-affordance bounding box.
- The toggle crossfade (Section 6.1) and the chat panel slide-in (Section 6.2).
- The sleep timer (Section 5).

What waits on other specs:

- Voice content for observations, greetings, recovery, and chips: Spec 04 (content exists; wire it through).
- The chat response stream that drives `thinking → talking`: Spec 07.
- Any track-aware NBA display: Spec 08 (deferred to v2 regardless, per Section 7).
- The pixel sprite frames for each state: Maicol and Gemini. Until they land, the `PixelLlamitaMark` placeholder stands in and the state machine drives the on-screen label only.

Codex follow-up to retire on build:

- Replace the hard-coded `LLAMITA /// OBSERVING` label in `src/components/home/interactive-home.tsx` with a state-driven label once the state machine ships (Section 1).

---

## Open questions

- **Dwell thresholds.** The windows in Section 4 (12s / 10s / 15s / 12s), the 30s global floor, and the 90s sleep threshold are first-pass values. Confirm or tune once there is real session data, or during prototyping with Maicol.
- **On-screen state labels.** The label wording (`IDLE`, `OBSERVING`, `RECALIBRATING`, `RESTING`) is provisional. Worth a pass with Maicol for voice consistency with Spec 04.
- **Hover-look on near-aligned viewports.** The degrade-to-bob fallback (Section 3) needs a look in the prototype to confirm it reads as intentional rather than broken.
- **Sleep on background tabs.** Should `sleeping` fire faster (or immediately) when the tab loses visibility, separate from the 90s idle threshold? Likely yes; confirm during build.

## Change log

- 2026-05-28: Initial draft. Six states, state machine, idle-observation timing with per-surface dwell windows and a global debounce floor, hover-look behavior (shipped in v1 per Maicol), motion rules for the toggle crossfade and chat panel slide-in with reduced-motion fallbacks, sleep behavior, and the v1 decision to keep the inferred track silent in the NBA panel. Requirements consolidated from Spec 03 (IA), Spec 04 (Voice), and ADRs 0005 and 0007.
