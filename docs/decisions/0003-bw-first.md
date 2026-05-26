# ADR 0003: Black and white first, color introduced later

**Status:** Accepted
**Date:** 2026-05-25
**Decision-maker:** Maicol
**Author:** Claude

---

## Context

Color choices are emotionally loaded and easy to relitigate. Making color decisions early in a project tends to produce hours of debate over palette swatches that delays foundational work. Maicol's preference is to defer color until the structural and interaction work is solid enough that color choices can carry meaning.

The current portfolio uses a cream paper (`#F9F8F4`), ink black, blue accent (`#2563eb`), and yellow highlight. We are not starting from this site, but we are not ruling those colors out either.

## Options considered

### Option A: Lock the existing color palette now
- Pros: Continuity with current site, no debate needed.
- Cons: Forecloses the chance to design color for what v2 needs, not what v1 had.

### Option B: Open color exploration upfront
- Pros: Resolves the question early.
- Cons: Delays everything. Pulls the team into palette debates before the structure that will hold the color exists.

### Option C: Black and white first, color introduced deliberately
- Pros: Structure-first discipline. We see what the site needs before we decide what color means. Color decisions, when they come, are calibrated to specific jobs (intent, accent, error, success, branding). Pixel illustrations work beautifully in monochrome.
- Cons: A monochrome site for several phases. Some illustrations will need to be re-rendered when color enters.

## Decision

**Black and white first.**

For v1 phases 1 through 6, the site uses a neutral B&W token system:

- Paper (light surface)
- Ink (text and primary fill)
- Hairline (borders, dividers)
- Surface (cards, panels)
- Muted (secondary text)

Color enters as a deliberate later decision, no earlier than Phase 7 (Intent inference + NBA panel), and only when a specific component earns it. Color tokens are added by superseding ADR when that decision lands.

Pixel illustrations are produced in monochrome during the early phases. Color treatment for illustrations is decided alongside the site color system.

## Consequences

### Positive
- Faster execution. No palette debates blocking structural work.
- The B&W discipline forces hierarchy through typography, weight, spacing, and contrast rather than through color.
- Pixel illustration in monochrome reads as editorial, which fits the site's voice.
- When color enters, it carries weight because we know what job it is doing.

### Negative
- Some illustrations will need to be re-rendered when color enters. This is expected and acceptable.
- The site will read as a "design system in progress" for several phases. We are okay with this internally.

### Neutral
- The current portfolio's cream paper and blue accent may or may not return. Decision deferred to the later color ADR.

## Notes

- The "hairline" token corresponds to the `rgba(0,0,0,0.1)` borders on the current site.
- Selection states use ink-on-paper inverse (paper text on ink background), not a color highlight.
- Llamita's chat surface uses the same neutral tokens. No color identity for the character in v1.
- The yellow highlight effect from the current site is parked. May return as an interaction accent when color enters.
