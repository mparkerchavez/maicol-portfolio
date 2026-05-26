# ADR 0008: Typography pivot from Refined Editorial to Bold Editorial

**Status:** Accepted
**Date:** 2026-05-26
**Decision-maker:** Maicol
**Author:** Claude
**Supersedes (in part):** ADR 0002 typography sections of Spec 01

---

## Context

Spec 01 (Typography and Design Tokens) was built around a "Refined Editorial" direction with classification contrast as the central philosophy: Playfair Display serif as the Human/Strategic register, Inter sans as the Machine/Analytical register, JetBrains Mono as the Data Index register. The contrast between three classifications carried the visual identity.

After reviewing the Phase 1 output, Maicol determined the direction was not landing the way it needed to. The serif read as a continuation of the previous portfolio's editorial style rather than a fresh contemporary voice. The classification contrast, while sound in theory, made the site feel "magazine retro" instead of "AI Product Lead 2026."

Maicol selected **Uncut Sans** (uncut.wtf/sans-serif/uncut-sans/) as the replacement primary face. Uncut Sans is a contemporary sans-serif with significant weight variation, designed for both display and body use, with a distinctive character that does not collapse into the "generic SaaS sans" register.

## Options considered

### Option A: Keep Refined Editorial (serif + sans + mono)
- Pros: Already specified in Spec 01. No font swap work.
- Cons: Maicol's read is that the serif weakens the contemporary voice and reads as a continuation of the old portfolio.

### Option B: Two-sans system (Uncut Sans for display, Inter for body)
- Pros: Inter is hyper-readable for body. Conservative path.
- Cons: Dilutes Uncut Sans's distinctiveness. Two-face system without classification contrast feels muddled.

### Option C: Single-family system (Uncut Sans for display AND body, JetBrains Mono for utility)
- Pros: One distinctive voice throughout. Modern brand identity pattern. The contrast moves from classification to scale and weight, which is the cleaner version of the same design instinct.
- Cons: Body reading load lives on a less-tested face. Risk if Uncut Sans does not perform well at body sizes.

## Decision

**Option C. Single-family Uncut Sans for display and body, with JetBrains Mono for the utility/data-index register and Llamita's chat surface.**

Contrast no longer comes from classification (serif vs sans vs mono). It comes from **scale and weight**: massive Bold display against fine Light body, with Mono as a deliberate third voice for metadata and Llamita.

The design philosophy renames from "Refined Editorial" to **"Bold Editorial"**.

## Consequences

### Positive
- A more contemporary, distinctive voice. Uncut Sans is rarely seen in the wild and reads as designed-on-purpose.
- One-family system is easier to maintain and harder to misuse.
- Larger weight swings (Light ↔ Bold) create more dramatic contrast than the previous serif/sans/mono split achieved.
- Aligns with Maicol's stated direction during the Phase 1 review: the site should not feel like the previous portfolio.

### Negative
- We lose the classification-contrast metaphor (Human/Strategic vs Machine/Analytical). That metaphor was thematically resonant but apparently didn't carry visually.
- The "Weight Skip" rule from Spec 01 (no 500/600/700) is revised. Bold Uncut Sans is now allowed and is a primary tool. Middle weights (Medium, Semibold) remain prohibited.
- Phase 1 components that hard-coded Playfair Display via `font-display` references need refactoring. This is part of the Phase 1.5 handoff scope.
- Font asset directory needs the Playfair files removed and Uncut Sans files added.

### Neutral
- JetBrains Mono stays as-is. Its role (metadata, intent labels, Llamita's chat) is unchanged.
- Italic now lives on Uncut Sans Italic instead of Playfair Display Italic. Same role, different face.
- Inter files are removed from `public/assets/fonts/` along with Playfair.

## Notes

### Allowed weights under the new system

The "Weight Skip" rule is revised, not abandoned. The new rule:

| Weight | Allowed? | Use |
|---|---|---|
| Light (300) | Yes | Body, captions, secondary text |
| Regular (400) | Yes | Body (default), heading h3/h4 |
| Medium (500) | **No** | Reserved against the "tech company" register |
| Semibold (600) | **No** | Same |
| Bold (700) | Yes | Display, h1, h2, emphasis |
| Black (800-900) | Yes (if available) | Macro display only, sparingly |
| Italic | Yes (300 + 400 only) | Pull quotes, in-body emphasis |

Light + Bold remains the primary contrast pair. The macro/micro extreme philosophy from Spec 01 still applies, just with a different face carrying both ends.

### What Spec 01 needs

A revision pass that:
- Replaces all Playfair Display and Inter references with Uncut Sans
- Updates the Weight Skip rule per the table above
- Revises the type scale to use Uncut Sans across display, standard, and body
- Updates the @font-face block in the implementation section
- Refreshes pairing examples to show the new system

Spec 01 is being updated as part of this same PR.

### Future option: pull serif back if Uncut Sans body underperforms

If during real use Uncut Sans body becomes hard to read at small sizes, the fallback is to bring in a serif as a secondary face for long-form reading sections. We would write a new ADR if that becomes necessary. Not the default plan.
