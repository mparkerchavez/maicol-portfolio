# ADR 0009: Persona nav replaces the self-framing through-line toggle

**Status:** Accepted (approved by Maicol, 2026-06-10)
**Date:** 2026-05-29
**Decision-maker:** Maicol
**Author:** Claude

---

## Context

The home page hero (Spec 03, Section 4) originally used a self-framing toggle: three switchable labels describing Maicol's own career (Product Designer / AI Product Lead / End-to-end Product). Clicking one reframed the hero copy. This was the visible expression of the through-line argument (PRD Section 8): one function, done under three different titles.

Separately and invisibly, ADR 0005 defined five inferred intent tracks (For Anyone, Recruiters, AI Strategist, Product Managers, Product Designers) that the system calibrates Llamita against based on behavior. The visitor never sees these.

Reviewing billysweeney.com (the original reference for ADR 0005) surfaced a cleaner pattern and a latent problem. Billy's site puts a visible, clickable persona nav at the top ("For anyone / Recruiters / Design Directors / Product Designers / Product Managers / Engineers") whose labels answer "who are *you*, the visitor?" Each click reframes his pitch for that audience. Two issues with our prior approach became clear:

1. We had two devices on different axes. The visible toggle asked "what is Maicol?" while the invisible tracks asked "who is the visitor?" These got conflated in conversation more than once.
2. The self-framing toggle put "Product Designer" up front as a co-equal identity, which works against Maicol's core repositioning challenge (hiring managers see "Product Designer" and discount the PM/AI positioning).

Billy can lead with "I'm a designer who cares about making beautiful things" because he is a designer pitching designers. Maicol's identity guide forbids exactly that move (never lead with designer, lead with proof not claim).

## Options considered

### Option A: Adopt a visible visitor-persona nav (Billy's structure), invert the content
- Make the hero nav answer "who are you, the visitor?" with a small, curated set of labels. Every framing leads with AI-adoption proof, never a soft role claim. Drop the self-framing toggle.
- Pros: One axis, not two. Proven, legible pattern. Each audience self-routes and reads copy written for them. The declared click is a high-confidence inference signal. The default ("For anyone") still carries the single message, so non-clickers lose nothing.
- Cons: Up to five hero variants to write and maintain if the visible set mirrors all tracks. A visible "Product Designers" label would partially re-create the discount problem.

### Option B: Keep the self-framing toggle
- Designer / AI Product Lead / End-to-end, as originally specced.
- Pros: Distinctive to Maicol's specific through-line argument. Dramatizes "one function survives relabeling."
- Cons: Labels are about him, not the visitor, so it is less obvious why a visitor would click. Keeps two conflated axes. Leads with "Product Designer" as a co-equal identity.

### Option C: Hybrid
- Visible visitor-persona nav as the spine, with the through-line argument preserved inside the copy rather than as its own toggle.
- Pros: Billy's legibility plus Maicol's narrative.
- Cons: Functionally converges with Option A once the persona set and copy discipline are fixed.

## Decision

**Option A, with a deliberately curated four-label persona nav: For anyone / Recruiters / AI Product Leaders / Product Managers.**

The visible nav is a four-label *subset* of the five inferred tracks (ADR 0005), not a replacement for them. The inference engine still runs all five. The one track with no visible label is Product Designers, which remains inference-only: the system calibrates for it when behavior reveals it, but it gets no visible button. The Product Designer point of view surfaces through Curate Mind and Llamita.

Product Designers was explicitly dropped from the *visible* nav. Maicol's resume reads "Product Designer / UX," and a visible designer label sitting beside his target identities would reinforce the exact discount the site exists to dispel. The thought-leadership content survives; only the visible label is cut.

Recruiters was added to the visible nav after an initial omission. Maicol's two answers conflicted: he selected a "tighter four" option that included Recruiters but typed a three-label list that left it out. The first draft of this ADR followed the typed list and made Recruiters inference-only. On review, Recruiters earns a front door: it is the highest-frequency hiring audience, and PRD success criterion #1 requires a recruiter to find role status, target titles, resume, and contact within 15 seconds. A dedicated Recruiters hero serves that directly.

The through-line argument is no longer carried by the act of toggling. It now lives in the copy: the Product Managers persona states it directly ("the product management function for twenty-four years, under three different titles"), the case studies lead with the function, and Llamita reinforces it.

Label-to-track mapping: `For anyone` → `for-anyone`, `Recruiters` → `recruiters`, `AI Product Leaders` → `ai-strategist`, `Product Managers` → `product-managers`. The visible "AI Product Leaders" label and the internal `ai-strategist` key name the same audience. Keeping the visible label as "AI Product Leaders" (rather than "AI Strategist") was Maicol's call.

## Consequences

### Positive
- One coherent axis for the visible device. The two-list confusion is resolved and documented (Spec 03, Section 4e).
- The hero leads with proof for every persona. No soft role claim anywhere.
- Removing the visible Product Designers label protects the AI/PM repositioning.
- Fewer hero variants to maintain (four, not the full five).
- A persona click is a strong declared signal that cleanly weights inference.
- The Recruiters hero serves PRD success criterion #1 (role status, titles, resume, contact in under 15 seconds) directly.

### Negative
- The visible nav and the inferred-track list now differ in both count (4 vs 5) and one label name ("AI Product Leaders" vs `ai-strategist`). This is documented but is a standing source of potential confusion.
- The designer thought-leadership audience gets no front-door label and must be reached indirectly (Curate Mind, Llamita).

### Neutral
- "For anyone" remains both the default visible persona and the default inferred track until signal accumulates.
- This supersedes the *device* described in PRD Section 8.1 and Scope 4.1, but not the *argument*. The through-line argument is unchanged; only its on-page expression moved from a toggle into copy.

## Notes

- **Downstream ripple (follow-up, pending Maicol approval to proceed):**
  - PRD Section 8.1 and Scope item 4.1 still describe the "through-line toggle (Designer / AI Product Lead / End-to-end)." Update to describe the persona nav and the copy-borne argument.
  - Spec 04 (Llamita voice) references the toggle in at least one line ("The toggle up top reframes the same career three ways..."). Reword to match.
  - Spec 06 and Spec 08 reference track inference; confirm the declared-persona signal is wired in as a high weight.
  - `src/components/home/through-line-toggle.tsx` (Codex) needs renaming and rebuilding to the persona nav. Leave a handoff note.
- **Open question:** whether to rename the internal `ai-strategist` track key to align with the visible "AI Product Leaders" label. Renaming touches ADR 0005, Spec 04, Spec 06, and Spec 08. Deferred; not blocking.
- The visible persona set is intentionally small. If a future audience earns a front door (for example, AI-native founders), it can be added without reshaping the inference taxonomy.
