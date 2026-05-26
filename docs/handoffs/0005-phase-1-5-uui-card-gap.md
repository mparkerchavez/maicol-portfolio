# Handoff 0005: Phase 1.5 UUI Card Primitive Gap

**From:** Codex
**To:** Maicol
**Date:** 2026-05-26
**Status:** Resolved for now
**Related:** `docs/handoffs/0004-phase-1-5-refactor.md`

## What I found

Phase 1.5 asked Codex to refactor the home case study cards to use a UUI card primitive as the structural shell.

The local UUI install includes primitives for Button, Input, TextArea, Tag, and Tooltip. It does not include a generic Card primitive under `src/components/base/` or `src/components/foundations/`.

The UUI MCP search, with Pro authentication, exposes card-pattern marketing sections, metrics cards, newsletter cards, testimonial cards, hero mockup cards, and account dropdown cards. It does not expose a generic base Card primitive.

## What I did

The app now uses `AppCard` from `src/components/ui/app-card.tsx`. That adapter owns the local `hairline-card` and `interactive-card` structure so app components no longer apply those classes directly.

Metric chips use UUI `Tag` through the `AppTag` adapter.

## Recommendation

Keep using `AppCard` until UUI ships or exposes a generic base Card primitive. Do not replace it with a marketing template unless the template is intentionally adopted as a broader layout pattern.
