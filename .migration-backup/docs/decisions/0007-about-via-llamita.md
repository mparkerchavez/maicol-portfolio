# ADR 0007: About content delivered via Llamita, not a static page

**Status:** Accepted
**Date:** 2026-05-25
**Decision-maker:** Maicol
**Author:** Claude

---

## Context

The current portfolio has no About section. The v2 PRD asked whether one should exist. Three options surfaced.

The single right About paragraph for the site does not exist, because the right answer to "who is Maicol" is different for each of the five intent tracks. A Recruiter wants role status and target titles. An AI Strategist wants the operating philosophy. A Designer wants the working point of view on the future of the function. A static About has to flatten these into one paragraph and inevitably picks the wrong frame for any specific visitor.

## Options considered

### Option A: Static About page
- Pros: Familiar pattern, easy to write, easy for visitors to find.
- Cons: Flattens five distinct answers into one. The least interesting page on most portfolios.

### Option B: About section embedded on home (two to three sentences)
- Pros: Smaller commitment than a full page. Forces brevity.
- Cons: Same flattening problem. Wastes prime home page real estate on copy that has to be generic.

### Option C: About content surfaced by Llamita on demand
- Pros: Calibrated to inferred track. Earns the chat its existence on every visit. Consistent with the site's thesis (the site reads the visitor and surfaces what they need). Skips the worst page on most portfolios.
- Cons: Visitors expecting an About page need an affordance pointing them at Llamita. A portion of visitors will not engage with the chat at all.

## Decision

**Option C.** About content is answered by Llamita on demand, with calibration based on inferred track. A small affordance on the home page tells visitors how to access it.

The affordance copy will be calibrated through Spec 04 (Llamita voice). A working version: "To learn about Maicol, ask Llamita →" placed near the home page hero. The arrow points toward Llamita's perch.

## Consequences

### Positive
- Reinforces the thesis. The site does not flatten itself for the lowest common denominator.
- The chat has a reason to exist on every visit. "Tell me about Maicol" is a low-commitment first question.
- About content stays calibrated as the track inference improves over time.
- Removes the worst page from the site before it gets built.

### Negative
- Visitors who never open the chat get no About content. Mitigated by the affordance.
- The affordance copy needs to be good enough to invite engagement without feeling like a chatbot bait.
- The five calibrated "about" answers need to be written and maintained. Captured in `content/llamita-scripts/about-responses.md` once Spec 04 is written.

### Neutral
- The affordance is a small text element, not a feature. Its placement and styling are part of the homepage layout spec, not a separate component.

## Notes

- The five calibrated about responses live in the Llamita voice library, not in the knowledge base. The knowledge base provides facts. The voice library provides framings.
- If the inference has not yet fired when a visitor asks "tell me about Maicol", Llamita uses the "For Anyone" framing as the default.
- A visitor can ask "tell me about Maicol" multiple times in different ways. The chat handles redundancy with grace, varying the framing as additional signal arrives.
- This decision does not preclude a future static About page if real signal shows visitors are bouncing because of its absence. Such a change would supersede this ADR.
