# Spec 01: Typography and Design Tokens

**Purpose:** Define the typographic system, font choices, and base design tokens (color and spacing) for the site.
**Owner:** Claude
**Status:** Active
**Last updated:** 2026-05-26
**Related ADRs:** 0002 (Untitled UI Pro), 0003 (B&W first), 0008 (Typography pivot to Uncut Sans)

---

## Why this spec exists

A site this text-heavy lives or dies on typography. Without a single source of truth, every component invents its own sizes, weights, and spacings. The result is a portfolio that looks like every other AI portfolio. This spec is the source of truth. Codex reads it once, implements it once, and every component on the site inherits from it forever.

For a citizen developer: this is the file that decides what every word on the site looks like. It is also the file that, if we get it right, does most of the design work without us needing to make decisions on a per-page basis.

---

## The design philosophy: Bold Editorial

The site speaks in **one distinctive voice** and complements it with a **machine voice** for utility moments. Two faces, three roles.

**The Primary voice.** A bold, contemporary sans-serif (Uncut Sans). It carries the entire reading load: display headlines, standard headings, body copy, navigation, buttons, form labels. Distinctive enough at large sizes to be the visual identity. Readable enough at body sizes to disappear into the reading experience.

**The Machine voice.** A monospaced face (JetBrains Mono). Used only for metadata, intent labels, the `01 ///` numbered section marks, tech-stack chips, and Llamita's chat. Marks anything that should read as "data" or "system" rather than as content.

The contrast between these two voices is the design. Not color. Not heavy decoration. The visual identity comes from **scale and weight**, applied within Uncut Sans's range, with the mono face as a deliberate third voice.

**What this means in practice:** look at any moment on the site and you should be able to tell at a glance whether you are reading "Maicol's voice" (Uncut Sans, varied scale and weight) or "the system's voice" (Mono, smaller, tracked, often uppercase). Confusing the two is a bug.

This direction is "Bold Editorial." Per ADR 0008, this supersedes the previous "Refined Editorial" direction. The classification-contrast philosophy (serif vs sans vs mono) is retired. Scale and weight do the work now.

---

## Scope

### In scope
- Two font families and their roles
- Weight rules (the revised "Weight Skip" rule)
- Type scale (macro, standard, micro)
- Italic rules
- Llamita's voice register
- Line length and reading width
- Design tokens for typography
- Color tokens (B&W per ADR 0003)
- Spacing scale
- Pairing examples
- How UUI v8 inherits from these tokens

### Out of scope
- Color beyond the B&W neutrals (deferred per ADR 0003)
- Specific component styles (those live in component specs)
- Animation and motion (separate spec)
- Mobile typography (per ADR 0006)

---

## 1. Font families

Two fonts. Each one has its own register. Mixing roles is a bug.

### Primary: Uncut Sans

**Role:** The voice of the site. Display sizes, standard headings, body copy, buttons, form labels, navigation, everything that reads as content.

**Why this font:** Contemporary geometric sans with significant weight variation. Distinctive enough at large sizes to carry the visual identity. Clean enough at body sizes to disappear into reading. Rarely seen in the wild, so it does not collapse into the generic SaaS aesthetic.

**Weights used (subject to availability in Maicol's font files):**
- Light (300) for body and secondary text
- Regular (400) for default body and small headings
- Bold (700) for display headlines and h1/h2
- Black (800 or 900) for macro display, used sparingly
- Italic (300 and 400 only) for pull quotes and in-body emphasis

**Weights explicitly NOT used:** Medium (500), Semibold (600). These middle weights collapse the macro/micro contrast and read as "tech company."

**Source:** [uncut.wtf/sans-serif/uncut-sans/](https://uncut.wtf/sans-serif/uncut-sans/). Files are provided by Maicol and live in `public/assets/fonts/`.

### Machine voice: JetBrains Mono

**Role:** Metadata. Intent labels (the `01 ///` numbered section marks). Tech stack chips. Captions. **Llamita's chat bubble.** The "data index" register.

**Why this font:** Sterile, precise, refined. The mono register marks anything that should read as "data" or "system" rather than as content. Llamita's chat lives in Mono so her voice visually marks as the machine voice, distinct from the site copy.

**Weights used:** Regular (400) only.

**License:** SIL Open Font License. Free for commercial use.

### What this means in practice

If you are wondering which font to use for a given piece of text:

- Is it content the visitor reads? → Uncut Sans (pick a weight)
- Is it metadata, a label, a chip, the `01 ///` section marker, or Llamita talking? → JetBrains Mono

If neither fits, you are probably trying to invent a new role. Don't.

---

## 2. The revised "Weight Skip" rule

The original rule (Spec 01 v1) prohibited weights 500, 600, 700, 800, 900 on the grounds that mid-weights read as "tech company." That rule was tied to the Inter + Playfair classification-contrast philosophy.

Under Bold Editorial (ADR 0008), the rule is **revised, not abandoned**:

| Weight | Status | Use |
|---|---|---|
| Light (300) | Allowed | Body, captions, secondary text |
| Regular (400) | Allowed | Default body, small headings |
| Medium (500) | **Prohibited** | Reads as tech company |
| Semibold (600) | **Prohibited** | Same |
| Bold (700) | Allowed | Display, h1, h2, emphasis |
| Black (800-900) | Allowed | Macro display only, used sparingly |
| Italic (300 / 400) | Allowed | Pull quotes, in-body emphasis |

The macro/micro extreme is still the philosophy. The contrast pair is now **Light (300) ↔ Bold (700)**, with Black (if available) reserved for the most dramatic display moments.

### What this means in practice

When you need to emphasize a word inside a paragraph, use Uncut Sans Italic at the same weight.

When you need a heading to feel important, use **bigger size + Bold**. Both scale and weight do work.

When you need a CTA button to feel actionable, the button structure (background, border, hover state) does the lifting. Button text is typically Regular or Bold.

---

## 3. The type scale

Three registers. Macro (display), standard (body and headings), micro (metadata).

Sizes use CSS `clamp()` so they scale smoothly between desktop sizes.

### 3.1 Macro register (display)

The visual hook. Used sparingly. One or two display moments per page.

| Token | Size (clamp) | Line height | Letter spacing | Weight | Font |
|---|---|---|---|---|---|
| `display-1` | `clamp(80px, 14vw, 180px)` | 0.9 | -0.04em | 700 (Bold) or 800/900 (Black) | Uncut Sans |
| `display-2` | `clamp(56px, 9vw, 120px)` | 0.92 | -0.03em | 700 (Bold) | Uncut Sans |

Display tokens are dense blocks. Tight line-height (0.9) makes multi-line display text feel like a single solid shape. Aggressive negative letter-spacing (-0.04em and -0.03em) tightens the word shapes. Bold-or-Black weight at huge size is the macro register's defining trait.

**What this means in practice:** display-1 is the home page hero. display-2 is a section opener or a case study title. Anything bigger or smaller is not display.

### 3.2 Standard register (headings and body)

The everyday workhorses.

| Token | Size (clamp) | Line height | Letter spacing | Weight | Font |
|---|---|---|---|---|---|
| `h1` | `clamp(40px, 4vw, 56px)` | 1.05 | -0.02em | 700 (Bold) | Uncut Sans |
| `h2` | `clamp(28px, 2.8vw, 40px)` | 1.15 | -0.01em | 700 (Bold) | Uncut Sans |
| `h3` | `clamp(20px, 1.8vw, 24px)` | 1.25 | 0 | 400 (Regular) | Uncut Sans |
| `h4` | `18px` (fixed) | 1.3 | 0 | 400 (Regular) | Uncut Sans |
| `body-lg` | `clamp(18px, 1.4vw, 20px)` | 1.7 | 0 | 300 (Light) | Uncut Sans |
| `body` | `16px` (fixed) | 1.6 | 0 | 400 (Regular) | Uncut Sans |
| `body-sm` | `14px` (fixed) | 1.5 | 0 | 400 (Regular) | Uncut Sans |

Note the weight progression: display is Bold/Black, h1/h2 are Bold, h3/h4 are Regular, body is Regular, body-lg is Light (lighter at larger size for editorial elegance), body-sm is Regular.

This creates a clear visual hierarchy through weight alone:
- **Dense and heavy** at the top (display, h1, h2)
- **Calm and balanced** in the middle (h3, h4, body)
- **Refined and airy** at body-lg (Light weight at large size, an editorial flourish)

**What this means in practice:** body copy is 16px Uncut Sans Regular at 1.6 line-height. body-lg is for hero subheads and lead paragraphs and uses Light weight for editorial elegance. Headings step down through the scale.

### 3.3 Micro register (data index)

Metadata, labels, intent markers, captions.

| Token | Size | Line height | Letter spacing | Case | Weight | Font |
|---|---|---|---|---|---|---|
| `mono-lg` | `14px` | 1.4 | 0.05em | UPPERCASE | 400 | JetBrains Mono |
| `mono` | `12px` | 1.4 | 0.1em | UPPERCASE | 400 | JetBrains Mono |
| `mono-sm` | `10px` | 1.4 | 0.15em | UPPERCASE | 400 | JetBrains Mono |

Micro tokens are always uppercase, always tracked open, always Mono. Aggressive letter-spacing is part of the register.

**What this means in practice:** the `01 /// POSITIONING` marks are `mono` (12px, uppercase, tracked). Intent labels are `mono`. Tech stack chips are `mono-sm`. Captions are `mono-sm`.

### 3.4 Llamita's chat register

A special register, separate from the standard scale.

| Token | Size | Line height | Letter spacing | Case | Weight | Font |
|---|---|---|---|---|---|---|
| `llamita-body` | `15px` | 1.6 | 0 | Normal (mixed case) | 400 | JetBrains Mono |
| `llamita-meta` | `11px` | 1.4 | 0.1em | UPPERCASE | 400 | JetBrains Mono |

Llamita speaks in JetBrains Mono at mixed case. The mono register marks her as the "machine voice." Mixed case (not uppercase like the micro register) makes the chat readable rather than indexical.

`llamita-meta` is for timestamps, tool-call indicators ("Querying Curate Mind..."), and citation chips inside the chat.

**What this means in practice:** if Llamita is talking, the text is mono. If site copy is talking, the text is Uncut Sans. The reader can tell at a glance who is speaking.

---

## 4. Italic rules

Italic is used sparingly. Two contexts.

### Pull quotes and display accents

Uncut Sans Italic at h1 size or larger. Used for one-sentence pull quotes inside case studies, or display callouts that break a paragraph rhythm.

### In-body emphasis

Uncut Sans Italic at body weight (300 or 400), used for emphasizing a single word or short phrase. Sparingly. Replaces what bold would do in a tech-company aesthetic.

Example: "He decided *not* to build the social profile enrichment feature."

### Never

- No italic on JetBrains Mono.
- No italic on Uncut Sans for entire paragraphs or headings.
- No bold for emphasis inside a body paragraph (use italic instead).

---

## 5. Line length and reading width

Body paragraphs constrain to 50-65 characters per line. Editorial standard for readability.

| Container | Max width |
|---|---|
| Body paragraph (single column) | `60ch` (~600px at 16px body) |
| Body paragraph (case study sidebar context) | `48ch` |
| Heading | No max-width (heading fills its container) |
| Display | No max-width (display fills its container) |

---

## 6. Color tokens (B&W per ADR 0003)

V1 uses a neutral B&W system. Color enters as a deliberate later decision via a superseding ADR.

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#F9F8F4` | Page background. Warm off-white. |
| `--color-ink` | `#111111` | Primary text and fill. |
| `--color-hairline` | `rgba(17, 17, 17, 0.1)` | Borders, dividers. |
| `--color-surface` | `#FFFFFF` | Cards, panels, chat surface. |
| `--color-muted` | `#666666` | Secondary text, captions. |
| `--color-inverse-paper` | `#111111` | Dark sections (footer). |
| `--color-inverse-ink` | `#F9F8F4` | Text on dark surfaces. |

---

## 7. Spacing scale

Tailwind v4's default scale plus two editorial-scale additions.

| Token | Value | Common use |
|---|---|---|
| `space-1` | 4px | Tight gaps |
| `space-2` | 8px | Default small gap |
| `space-3` | 12px | Label-value gap |
| `space-4` | 16px | Default paragraph spacing |
| `space-6` | 24px | Section internal padding |
| `space-8` | 32px | Between sections in a card |
| `space-12` | 48px | Between cards |
| `space-16` | 64px | Between case study sections |
| `space-24` | 96px | Hero internal padding |
| `space-32` | 128px | Between page sections |
| `space-40` | 160px | Hero vertical breathing room |
| `space-60` | 240px | Editorial-scale top-of-page whitespace |

---

## 8. Implementation: Tailwind v4 with CSS-first theming

Tailwind v4 lets us define tokens directly in CSS using the `@theme` directive. UUI v8 components inherit from these tokens automatically.

### File location

`src/app/globals.css`

### Font files

The font files for Uncut Sans should live in `public/assets/fonts/`. Maicol provides them. Expected files (subject to what weights Maicol downloaded):

- `UncutSans-Light.woff2`
- `UncutSans-LightItalic.woff2` (if available)
- `UncutSans-Regular.woff2`
- `UncutSans-RegularItalic.woff2`
- `UncutSans-Bold.woff2`
- `UncutSans-Black.woff2` (if available)
- `JetBrainsMono-Regular.woff2` (already present)

If Maicol's downloaded weights differ, Codex maps to what's available. Light + Regular + Bold is the minimum. Black is a bonus for the most extreme display moments.

The existing `Inter-*.woff2` and `PlayfairDisplay-*.woff2` files are removed from `public/assets/fonts/`.

### Token definitions

```css
@import "tailwindcss";

@font-face {
  font-family: "Uncut Sans";
  src: url("/assets/fonts/UncutSans-Light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Uncut Sans";
  src: url("/assets/fonts/UncutSans-LightItalic.woff2") format("woff2");
  font-weight: 300;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Uncut Sans";
  src: url("/assets/fonts/UncutSans-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Uncut Sans";
  src: url("/assets/fonts/UncutSans-RegularItalic.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Uncut Sans";
  src: url("/assets/fonts/UncutSans-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Uncut Sans";
  src: url("/assets/fonts/UncutSans-Black.woff2") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "JetBrains Mono";
  src: url("/assets/fonts/JetBrainsMono-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@theme {
  /* Font families */
  --font-sans: "Uncut Sans", system-ui, sans-serif;
  --font-display: "Uncut Sans", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Macro register */
  --text-display-1: clamp(80px, 14vw, 180px);
  --text-display-1--line-height: 0.9;
  --text-display-1--letter-spacing: -0.04em;
  --text-display-1--font-weight: 700;

  --text-display-2: clamp(56px, 9vw, 120px);
  --text-display-2--line-height: 0.92;
  --text-display-2--letter-spacing: -0.03em;
  --text-display-2--font-weight: 700;

  /* Standard register */
  --text-h1: clamp(40px, 4vw, 56px);
  --text-h1--line-height: 1.05;
  --text-h1--letter-spacing: -0.02em;
  --text-h1--font-weight: 700;

  --text-h2: clamp(28px, 2.8vw, 40px);
  --text-h2--line-height: 1.15;
  --text-h2--letter-spacing: -0.01em;
  --text-h2--font-weight: 700;

  --text-h3: clamp(20px, 1.8vw, 24px);
  --text-h3--line-height: 1.25;
  --text-h3--font-weight: 400;

  --text-h4: 18px;
  --text-h4--line-height: 1.3;
  --text-h4--font-weight: 400;

  --text-body-lg: clamp(18px, 1.4vw, 20px);
  --text-body-lg--line-height: 1.7;
  --text-body-lg--font-weight: 300;

  --text-body: 16px;
  --text-body--line-height: 1.6;
  --text-body--font-weight: 400;

  --text-body-sm: 14px;
  --text-body-sm--line-height: 1.5;
  --text-body-sm--font-weight: 400;

  /* Micro register */
  --text-mono-lg: 14px;
  --text-mono-lg--line-height: 1.4;
  --text-mono-lg--letter-spacing: 0.05em;
  --text-mono-lg--font-weight: 400;

  --text-mono: 12px;
  --text-mono--line-height: 1.4;
  --text-mono--letter-spacing: 0.1em;
  --text-mono--font-weight: 400;

  --text-mono-sm: 10px;
  --text-mono-sm--line-height: 1.4;
  --text-mono-sm--letter-spacing: 0.15em;
  --text-mono-sm--font-weight: 400;

  /* Llamita register */
  --text-llamita-body: 15px;
  --text-llamita-body--line-height: 1.6;
  --text-llamita-body--font-weight: 400;

  --text-llamita-meta: 11px;
  --text-llamita-meta--line-height: 1.4;
  --text-llamita-meta--letter-spacing: 0.1em;
  --text-llamita-meta--font-weight: 400;

  /* Color tokens (B&W per ADR 0003) */
  --color-paper: #F9F8F4;
  --color-ink: #111111;
  --color-hairline: rgb(17 17 17 / 0.1);
  --color-surface: #FFFFFF;
  --color-muted: #666666;
  --color-inverse-paper: #111111;
  --color-inverse-ink: #F9F8F4;

  /* Spacing additions */
  --spacing-40: 160px;
  --spacing-60: 240px;
}
```

### Heading element role assignment

Codex configures `globals.css` so HTML heading elements automatically use the right tokens:

```css
@layer base {
  body {
    background: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-size: var(--text-body);
    line-height: var(--text-body--line-height);
    font-weight: 400;
  }

  h1 {
    font-family: var(--font-sans);
    font-size: var(--text-h1);
    line-height: var(--text-h1--line-height);
    letter-spacing: var(--text-h1--letter-spacing);
    font-weight: 700;
  }

  h2 {
    font-family: var(--font-sans);
    font-size: var(--text-h2);
    line-height: var(--text-h2--line-height);
    letter-spacing: var(--text-h2--letter-spacing);
    font-weight: 700;
  }

  h3 {
    font-family: var(--font-sans);
    font-size: var(--text-h3);
    line-height: var(--text-h3--line-height);
    font-weight: 400;
  }

  h4 {
    font-family: var(--font-sans);
    font-size: var(--text-h4);
    line-height: var(--text-h4--line-height);
    font-weight: 400;
  }

  p {
    max-width: 60ch;
  }

  em {
    font-style: italic;
  }
}
```

### Utility class additions

For the macro display and the mono registers, custom Tailwind utilities:

```css
@utility text-display-1 {
  font-family: var(--font-sans);
  font-size: var(--text-display-1);
  line-height: var(--text-display-1--line-height);
  letter-spacing: var(--text-display-1--letter-spacing);
  font-weight: 700;
}

@utility text-display-2 {
  font-family: var(--font-sans);
  font-size: var(--text-display-2);
  line-height: var(--text-display-2--line-height);
  letter-spacing: var(--text-display-2--letter-spacing);
  font-weight: 700;
}

@utility text-mono {
  font-family: var(--font-mono);
  font-size: var(--text-mono);
  line-height: var(--text-mono--line-height);
  letter-spacing: var(--text-mono--letter-spacing);
  text-transform: uppercase;
  font-weight: 400;
}

/* And so on for mono-lg, mono-sm, llamita-body, llamita-meta */
```

### How UUI v8 inherits these tokens

UUI v8 Pro components use Tailwind classes internally. Overriding the underlying tokens in `@theme` propagates to every UUI component automatically. We do not need to fork UUI or patch individual components.

---

## 9. Pairing examples

Real combinations showing how the two faces and the registers combine.

### Example 1: Home page hero

```
[mono: "01 /// POSITIONING"]                              [mono: "ENTERPRISE AI PRODUCT STRATEGIST"]

[display-1 (Uncut Sans Bold at 180px): "I work in the gap between AI capability and human adoption."]

[body-lg (Uncut Sans Light at 20px): "Discovery, validation, prototyping, alignment. All in one person."]
```

Three voices stacked. Mono frames the section. Bold display carries the strategic claim. Light body-lg carries the subhead with editorial elegance from the lighter weight at the larger size.

### Example 2: Case study opener

```
[mono: "AI ENABLEMENT  ///  MEETING PREP AGENT"]

[h1 (Uncut Sans Bold): "Scaling sales enablement with AI agents."]

[body-lg (Uncut Sans Light): "I moved a GenAI use case from idea to validated evidence in 3-4 weeks..."]
```

### Example 3: Inside a case study paragraph with emphasis

```
[h3 (Uncut Sans Regular): "Validating the workflow, not just the tech."]

[body (Uncut Sans Regular): "Instead of guessing features, I led a rapid validation sprint. We did *not* write code initially..."]
```

The "not" is Uncut Sans Italic at 400 weight.

### Example 4: A pull quote inside a case study

```
[body]: paragraph ending...

[h1 italic (Uncut Sans Bold Italic): "The abstraction was right for prototyping. It became the wrong choice for production."]

[body]: paragraph continuing...
```

### Example 5: Llamita's chat surface

```
[llamita-meta: "LLAMITA  ///  10:47 AM"]

[llamita-body (JetBrains Mono): "Ah, reading the LangChain decision. The headline is that Maicol recommended LangChain for prototyping. The better story is why he recommended *against* it in production. Want me to expand?"]

[llamita-meta: "QUERYING CURATE MIND..."]
```

JetBrains Mono throughout. The chat reads as a different voice from the site copy.

### Example 6: A small metadata chip

```
[mono-sm: "RAG ARCHITECTURE"]  [mono-sm: "AZURE OPENAI"]  [mono-sm: "REACT"]
```

Three tech-stack chips, all `mono-sm`.

---

## 10. How to use this when building

A short practical guide for adding new content.

1. **What kind of content is it?**
   - Display moment (hero, big section opener) → use `text-display-1` or `text-display-2`
   - Standard heading → use `<h1>`, `<h2>`, `<h3>`, `<h4>` HTML elements (auto-styled per Section 8)
   - Body paragraph → use `<p>` (auto-styled, max-width 60ch)
   - Lead paragraph or hero subhead → apply `text-body-lg`
   - Metadata, label, intent marker → `text-mono`, `text-mono-lg`, or `text-mono-sm`
   - Llamita's speech → `text-llamita-body`

2. **Need emphasis?** Use `<em>` (renders as Uncut Sans Italic).

3. **Need a pull quote?** Use `<blockquote>` with `text-h1`, `italic`, and Uncut Sans Bold weight.

4. **Need a different color?** You can't. V1 is B&W. If a component genuinely needs contrast, use the inverse pair (paper-on-ink). Color enters via a later ADR.

5. **Need a different spacing?** Pick from the scale in Section 7. Do not invent.

6. **In doubt?** Re-read Section 1 ("Font families") and Section 3 ("Type scale"). The system is small enough to fit in your head.

---

## 11. Open questions

- **Exact Uncut Sans weights available.** Maicol's download might include Thin, Light, Regular, Medium, Semibold, Bold, Black. We use Light, Regular, Bold, and Black (if shipped). Medium and Semibold remain prohibited per Section 2.
- **Italic weights available.** Uncut Sans italics may not ship in all weights. Light Italic and Regular Italic are the minimum; if only Regular Italic ships, that becomes the in-body emphasis register and pull quotes use Bold (non-italic) for emphasis instead.

---

## 12. Open notes for the future color ADR

When color enters, the following decisions need to be made together:

- One accent color, or multiple?
- Does color carry semantic meaning?
- Does Llamita's chat get a color identity? (Recommend keeping Llamita B&W to preserve the "machine voice" distinction.)
- Do citation chips get a color signal?

---

## Change log

- 2026-05-25: Initial draft. Refined Editorial direction. Playfair Display + Inter + JetBrains Mono. Original Weight Skip rule (no 500-900).
- 2026-05-26: Revised for Bold Editorial direction per ADR 0008. Dropped Playfair Display and Inter. Adopted Uncut Sans as primary face. Revised Weight Skip rule to allow Light, Regular, Bold, Black (Medium and Semibold remain prohibited). Updated type scale, font-face declarations, tokens, and pairing examples.
