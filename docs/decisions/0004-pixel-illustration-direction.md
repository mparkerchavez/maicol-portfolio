# ADR 0004: Pixel illustration as the visual register

**Status:** Accepted
**Date:** 2026-05-25
**Decision-maker:** Maicol
**Author:** Claude

---

## Context

The site has very few real-world visual assets we can use as proof. Enterprise software work is confidential. Workshop photography is from Super by Design, but the strategic direction is to under-emphasize facilitation rather than lead with it. The portfolio will be text-led no matter what.

Given that, the supporting illustrations have to do real work. They need to give the site life without standing in as evidence. They need to carry Llamita as a character without making the site feel like a chatbot product. They need to be distinctive enough to escape the generic "AI-generated portfolio" look.

We considered three illustration directions: pixel-leaning, editorial line drawing, and geometric abstract. See `docs/research/pixel-art-references/` for the reference imagery we evaluated.

## Options considered

### Option A: Pixel-leaning illustration (high-resolution pixel art)
- Pros: Distinctive. Carries realistic scenes (workshops, people, rooms) without needing photography. Renders Llamita with personality and weight, not as a generic mascot. Can visualize abstract concepts (the trust architecture) as small environments rather than flat diagrams. Reads as designed and intentional.
- Cons: Higher production cost per illustration. Pixel art at the higher fidelity (Octopath Traveler, Sea of Stars register) takes meaningful time to produce.

### Option B: Editorial line drawing
- Pros: Lower production cost. Sits inside the existing typography register without competing. Reads as confident and editorial.
- Cons: Less distinctive. Harder to render realistic scenes (workshops) without looking sparse.

### Option C: Geometric abstract
- Pros: Lowest production cost. Strong at small sizes.
- Cons: Generic. The geometric-mascot register has been used by every B2B SaaS company. Llamita would risk reading as a brand mascot rather than a character.

## Decision

**Pixel illustration in the high-resolution register.**

Specifically the lineage of Sea of Stars, Octopath Traveler, eboy at the abstract end, and Toyoi Yuuta at the architectural end. The reference imagery Maicol shared (a high-resolution pixel rendering of NYC Central Park, painterly, naturalistic) anchors the target. Pixels read as a deliberate design medium, not as 8-bit nostalgia.

For v1 (per ADR 0003), all pixel illustration is rendered in monochrome (ink on paper, with ordered dithering or pixel gray ramps for tone). Color treatment is deferred.

## Consequences

### Positive
- Distinctive visual identity that does not collapse into the AI-generated portfolio aesthetic.
- Llamita has weight, light, expression, and personality without being a corporate mascot.
- Workshop scenes, abstract concepts, and character work all live in the same medium, which produces visual coherence.
- The pixel medium itself signals design intent.

### Negative
- Production is slower than vector illustration. Each piece takes longer.
- Asset pipeline needs to handle pixel-perfect rendering across screen densities (no blurry upscaling).
- Re-rendering for the eventual color treatment will be needed.

### Neutral
- Maicol leads the visual production with Gemini (and possibly other tools). The illustration work happens in parallel with the functional build.

## Notes

- All Llamita character states are produced in this register.
- Section illustrations for case studies are produced in this register when needed.
- The Curate Mind trust architecture visualization may live in this register as a small environment (rooms, doors, lights) rather than a flat diagram.
- File format: PNG for static frames, with the source files (Aseprite, Photoshop) kept in `assets/[category]/source/`. Animated states use sprite sheets or short looping animations.
- Rendering at multiple resolutions: produce 1x, 2x, 3x exports where size matters.
- Reference imagery lives at `docs/research/pixel-art-references/`.
