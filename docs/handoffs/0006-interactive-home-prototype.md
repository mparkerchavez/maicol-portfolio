# Handoff 0006: Interactive Home Prototype

**From:** Codex
**To:** Maicol
**Date:** 2026-05-28
**Status:** Implemented first pass
**Related:**
- `docs/specs/00-prd.md`
- `docs/specs/01-typography.md`
- `docs/specs/03-information-architecture.md`
- `docs/decisions/0002-untitled-ui-pro.md`
- `docs/decisions/0003-bw-first.md`
- `docs/decisions/0008-typography-pivot-uncut-sans.md`

## What changed

The home page was reworked from a vertical editorial portfolio into an interactive evidence cockpit.

The new first viewport keeps the same positioning strategy, typography, B&W system, and intent-signal model, but changes the layout language:

- Through-line choices now read as a control surface.
- The main statement sits inside a product cockpit rather than a standalone hero.
- Llamita appears as an observing right rail, not only a floating `L` button.
- Recruiter-critical proof stays above the fold.
- Case studies are previewed as a proof index.
- A monochrome pixel-style product visual shows the intended visual register before final assets arrive.

## Why

The previous structure followed the IA but still resembled a static portfolio. The PRD says the site should demonstrate Maicol's work by behaving like a product. This pass shifts the home page toward that thesis before the case-study pages inherit the direction.

## Prototype decisions

- Home page first. Case-study pages are untouched for now.
- Product visuals are temporary and can be replaced by Gemini or final pixel assets later.
- UUI remains behind the project adapters in `src/components/ui`.
- Copy was lightly rewritten where the new interface needed clearer labels.
- Curate Mind traces are still placeholders. The shell is ready for real traces once selected.

## Follow-up

If Maicol approves the direction, carry this visual and interaction system into the case-study pages as case files:

- Sticky evidence sidebar.
- Act navigation.
- Decision and outcome panels.
- Llamita chips as contextual prompts.
- Related work as a compact proof map.
