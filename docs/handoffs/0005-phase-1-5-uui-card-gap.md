# Handoff 0005: Phase 1.5 UUI Card Primitive Gap

**From:** Codex
**To:** Maicol
**Date:** 2026-05-26
**Status:** Open
**Related:** `docs/handoffs/0004-phase-1-5-refactor.md`

## What I found

Phase 1.5 asked Codex to refactor the home case study cards to use a UUI card primitive as the structural shell.

The local UUI install includes primitives for Button, Input, TextArea, Tag, and Tooltip. It does not include a generic Card primitive under `src/components/base/` or `src/components/foundations/`.

The UUI MCP search, without Pro authentication, exposed dropdown account cards and larger marketing card templates. Those do not match the home case study card use case.

## What I did

I left the case study card shell on the existing local `hairline-card` and `interactive-card` structure so the IA and hover behavior stay intact.

I did wire the metric chips inside the card to UUI `Tag`, which is the available primitive that fits that part of the component.

## Recommendation

If Maicol wants the case study card shell to come directly from UUI Pro, authenticate the UUI MCP with the Pro license and have Codex pull the specific Card component or template in a follow-up pass.
