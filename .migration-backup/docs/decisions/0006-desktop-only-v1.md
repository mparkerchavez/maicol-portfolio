# ADR 0006: Desktop-only for v1, mobile experience deferred

**Status:** Accepted
**Date:** 2026-05-25
**Decision-maker:** Maicol
**Author:** Claude

---

## Context

The v2 site's differentiating interactions (Llamita character behavior, hover-driven phrase signals, the right-edge chat panel, the through-line toggle, the case study chips) are designed around desktop reading patterns and pointer-based input. Hover dwell is a primary intent signal. None of these translate cleanly to mobile.

Building two experiences in parallel would double the design surface and slow every phase. Building one experience that compromises on desktop to accommodate mobile would weaken the thesis. The PRD's success criteria are written for desktop.

The site is targeted at a small, qualified audience reached through LinkedIn, direct links Maicol shares, and the occasional referral. It is not optimized for casual mobile discovery.

## Options considered

### Option A: Responsive design from day one
- Pros: One codebase, accommodates any device.
- Cons: Hover-driven signals do not translate. The right-edge chat panel does not fit a mobile viewport. The through-line toggle, the chips, and the NBA panel all need redesign for touch. Trying to make all of these work mobile-first would compromise the desktop experience without producing a great mobile one.

### Option B: Desktop and mobile in parallel
- Pros: Both experiences land at the same time.
- Cons: Double the design and build cost per phase. Mobile would need a substantially different interaction model (no hover, no right-edge panel as currently designed). Slows v1 delivery significantly.

### Option C: Desktop only for v1, mobile deferred
- Pros: Single design surface. Interactions can be designed for the patterns they actually work in. v1 ships faster. The right audience (LinkedIn referrals, professional desktop users) is well served.
- Cons: Mobile visitors get a degraded experience. The site does not error on mobile but the differentiating interactions are missing or compromised.

## Decision

**Desktop only for v1. Mobile is a separate later project.**

The site renders on mobile (text reads, layout does not break, no JavaScript errors), but the differentiating interactions are not optimized for it. Llamita may not appear on mobile in v1, or may appear in a heavily simplified form (decision deferred to implementation).

A separate mobile project will be scoped after the desktop site is complete. That project will likely involve a substantially redesigned interaction model rather than a port.

## Consequences

### Positive
- Single design surface to optimize.
- Faster v1 delivery.
- Hover, dwell, and right-edge panel work the way they were designed to.
- The intent inference system is designed against a coherent set of signal surfaces, not a divergent mobile set.

### Negative
- Mobile visitors get a degraded experience in v1.
- A portion of recruiter-driven referrals (LinkedIn on mobile) may bounce.
- Mobile work is technical debt that must be addressed later.

### Neutral
- The site uses responsive primitives (Tailwind breakpoints, Next.js viewport handling) so the foundation does not preclude a future mobile experience. The choice is to defer the interaction design, not the technical capability.

## Notes

- Minimum viable mobile behavior in v1: the site renders, the typography is readable, the case studies can be read, the resume can be downloaded, the email link works. Llamita and the intent system are desktop-only.
- The decision to defer mobile applies to v1 only. A subsequent ADR will be written when the mobile project starts.
- This decision should be communicated to Codex during implementation so they do not spend time on mobile-specific CSS beyond the bare minimum.
