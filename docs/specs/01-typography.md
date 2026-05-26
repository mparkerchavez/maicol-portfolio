# Spec 01: Typography and Design Tokens

**Purpose:** Define the typographic system, font choices, and base design tokens (color and spacing) for the site.
**Owner:** Claude
**Status:** Active
**Last updated:** 2026-05-25
**Related ADRs:** 0002 (Untitled UI Pro), 0003 (B&W first)

---

## Why this spec exists

A site this text-heavy lives or dies on typography. Without a single source of truth, every component starts inventing sizes, weights, and spacings. The result is a portfolio that looks like every other AI portfolio. This spec is the source of truth. Codex reads it once, implements it once, and every component on the site inherits from it forever.

For a citizen developer: this is the file that decides what every word on the site looks like. It is also the file that, if we get it right, does most of the design work without us needing to make decisions on a per-page basis.

---

## The design philosophy: Refined Editorial

The site bridges two registers.

**The Human / Strategic register.** High-contrast serif type. Old-fashioned in the best way. Carries the long-form thinking, the headlines, the pull quotes. Says "a real person made decisions here."

**The Machine / Analytical register.** Sterile geometric sans and a monospace utility. Used for body, navigation, metadata, intent labels, and Llamita's chat surface. Says "this is precise."

The contrast between these two registers is the design. We do not lean on color. We do not lean on heavy weights. We do not lean on illustration to do the heavy lifting. The shape of the type itself argues for what Maicol does: strategic thinking meeting analytical structure.

**What this means in practice:** look at any page and you should be able to tell at a glance whether you are reading "the human voice" (serif, large, italic-capable) or "the machine voice" (sans or mono, smaller, gridded). Confusing the two is a bug.

---

## Scope

### In scope
- Three font families and their roles
- Weight rules (the "Weight Skip" rule)
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

Three fonts. Each one has one job. Mixing roles is a bug.

### Display Serif: Playfair Display

**Role:** Display sizes only (the macro register). Hero text. Massive headlines. Pull quotes. Section-opener accent moments. The "voice of the human."

**Why this font:** High stroke contrast (thick where it should be thick, thin where it should be thin). Carries weight at very large sizes. Distinguished italic. Free via Google Fonts. Already in the current site's stack, so the visual lineage is preserved.

**Weights used:** 300 (Light), 400 Italic only. No regular roman at standard sizes. Italic is the accent register.

**License:** SIL Open Font License. Free for commercial use.

**Future upgrade path:** PP Editorial New (Pangram Pangram, paid) or GT Sectra (Grilli Type, paid) can swap in later as a one-line `@theme` change if Maicol wants the higher-fashion register.

### Body and UI Sans: Inter

**Role:** Standard headings (h2, h3, h4), body copy, navigation, buttons, form labels, anywhere reading happens at standard sizes. The "voice of the machine, but readable."

**Why this font:** Inter is the most-tested editorial-readable sans on the web. Weight 300 (Light) sits beautifully against Playfair Display Italic. Weight 400 (Regular) is the body workhorse. Italic 400 is the in-body emphasis register. Free via Google Fonts.

**Weights used:** 300 (Light), 400 (Regular), 400 Italic. No medium, no semibold, no bold.

**License:** SIL Open Font License. Free for commercial use.

### Utility Mono: JetBrains Mono

**Role:** Metadata. Intent labels (the `01 ///` numbered section marks). Tech stack chips. Caption text. **Llamita's chat bubble.** The "data index" register.

**Why this font:** Sterile, precise, refined. Better weight stability at small sizes than Space Mono. Free. The fact that Llamita's chat lives in Mono is a deliberate design choice: it visually marks her voice as the machine voice, distinct from the editorial site copy.

**Weights used:** 400 (Regular) only.

**License:** SIL Open Font License. Free for commercial use.

### What this means in practice

If you are wondering which font to use for a given piece of text:

- Is it large display headline text? → Playfair Display
- Is it a pull quote or italic accent? → Playfair Display Italic
- Is it normal reading text or a standard heading? → Inter
- Is it metadata, a chip, a label, or Llamita talking? → JetBrains Mono

If none of those fit, you are probably trying to invent a new role. Don't.

---

## 2. The "Weight Skip" rule

The system uses two weights and one italic per font. That is it.

| Font | Allowed weights |
|---|---|
| Playfair Display | 300 (Light) for macro display, 400 Italic for accent |
| Inter | 300 (Light) for select display, 400 (Regular) for body, 400 Italic for in-body emphasis |
| JetBrains Mono | 400 (Regular) |

**Never used:** 500 (Medium), 600 (SemiBold), 700 (Bold), 800, 900.

The reason: medium and semibold weights read as "tech company." Bold reads as "I am yelling." Editorial type achieves contrast through *scale* and *classification* (serif vs sans vs mono), not through weight. This is the move that separates the site from the AI-generated portfolio aesthetic.

### What this means in practice

When you need to emphasize a word inside a paragraph, use Inter Italic. Not bold. Not a different color. Not underline.

When you need a heading to feel important, use *bigger size* and *Playfair Display*. Not heavier weight.

When you need a CTA button to feel actionable, use the button structure (background, border, hover state) to do that work. The text inside stays at 400.

---

## 3. The type scale

Three registers. Macro (display), standard (body and headings), micro (metadata).

Sizes use CSS `clamp()` so they scale smoothly between desktop sizes. The `clamp()` function takes three arguments: the smallest size, a preferred fluid size, and the largest size. Browsers pick the right value based on the current viewport.

### 3.1 Macro register (display)

The visual hook. Used sparingly. One or two display moments per page.

| Token | Size (clamp) | Line height | Letter spacing | Weight | Font |
|---|---|---|---|---|---|
| `display-1` | `clamp(80px, 14vw, 180px)` | 0.9 | -0.03em | 300 | Playfair Display |
| `display-2` | `clamp(56px, 9vw, 120px)` | 0.95 | -0.02em | 300 | Playfair Display |

Display tokens are dense blocks. The very tight line-height (0.9) makes multi-line display text feel like a single solid shape. Negative letter-spacing tightens the word shapes so the block reads as one composition.

**What this means in practice:** display-1 is the home page hero. display-2 is a section opener or a case study title. Anything bigger or smaller is not display.

### 3.2 Standard register (headings and body)

The everyday workhorses.

| Token | Size (clamp) | Line height | Letter spacing | Weight | Font |
|---|---|---|---|---|---|
| `h1` | `clamp(40px, 4vw, 56px)` | 1.05 | -0.01em | 400 | Playfair Display |
| `h2` | `clamp(28px, 2.8vw, 40px)` | 1.15 | -0.005em | 400 | Inter |
| `h3` | `clamp(20px, 1.8vw, 24px)` | 1.25 | 0 | 400 | Inter |
| `h4` | `18px` (fixed) | 1.3 | 0 | 400 | Inter |
| `body-lg` | `clamp(18px, 1.4vw, 20px)` | 1.7 | 0 | 400 | Inter |
| `body` | `16px` (fixed) | 1.6 | 0 | 400 | Inter |
| `body-sm` | `14px` (fixed) | 1.5 | 0 | 400 | Inter |

Note that `h1` uses Playfair Display, while `h2` and below use Inter. The reason: `h1` is the largest standard heading and still wants the editorial serif voice. `h2` and below are functional section dividers and want the analytical sans.

`display-1` and `display-2` are not in the standard heading hierarchy. They are independent display moments, used when a page wants a dramatic typographic gesture.

**What this means in practice:** body copy is 16px Inter at 1.6 line-height. body-lg is for hero subheads and lead paragraphs. Headings step down through the scale. Do not pick "kind of between an h2 and an h3" sizes. Use the tokens.

### 3.3 Micro register (data index)

Metadata, labels, intent markers, captions.

| Token | Size | Line height | Letter spacing | Case | Weight | Font |
|---|---|---|---|---|---|---|
| `mono-lg` | `14px` | 1.4 | 0.05em | UPPERCASE | 400 | JetBrains Mono |
| `mono` | `12px` | 1.4 | 0.1em | UPPERCASE | 400 | JetBrains Mono |
| `mono-sm` | `10px` | 1.4 | 0.15em | UPPERCASE | 400 | JetBrains Mono |

Micro tokens are always uppercase, always tracked open, always Mono. The aggressive letter-spacing is part of the register. Without it, mono small caps read as code, not metadata.

**What this means in practice:** the `01 /// Positioning` marks on the current site are `mono` (12px, uppercase, tracked). Intent labels are `mono`. Tech stack chips are `mono-sm`. Captions under images are `mono-sm`.

### 3.4 Llamita's chat register

A special register, separate from the standard scale.

| Token | Size | Line height | Letter spacing | Case | Weight | Font |
|---|---|---|---|---|---|---|
| `llamita-body` | `15px` | 1.6 | 0 | Normal (mixed case) | 400 | JetBrains Mono |
| `llamita-meta` | `11px` | 1.4 | 0.1em | UPPERCASE | 400 | JetBrains Mono |

Llamita speaks in JetBrains Mono at standard mixed case. The mono register marks her voice as the "machine voice." The normal case (not uppercase like the micro register) makes the chat readable rather than indexical.

`llamita-meta` is for timestamps, tool-call indicators ("Querying Curate Mind..."), and citation chips inside the chat.

**What this means in practice:** if Llamita is talking, the text is mono. If site copy is talking, the text is Inter (or Playfair for display). The reader can tell at a glance who is speaking.

---

## 4. Italic rules

Two italics exist in the system. They have different jobs.

### Playfair Display Italic

Used for: pull quotes, display accents, voice-shift callouts (a sentence pulled out of a paragraph to highlight a key insight in a case study). Always at h1 size or larger. Always Playfair.

Example: a case study might have a one-sentence pull quote in `h1` Playfair Italic between two body paragraphs.

### Inter Italic

Used for: in-body emphasis on a word or short phrase. Sparingly. Replaces the role bold would play in a tech-company aesthetic.

Example: "He decided *not* to build the social profile enrichment feature."

### Never

- No italic on JetBrains Mono.
- No italic on Inter for entire paragraphs or headings.
- No bold (the Weight Skip rule still applies).

---

## 5. Line length and reading width

The eye reads paragraphs better when lines are not too wide. Wide lines force the eye to track back to the start of the next line, which fatigues the reader. The editorial standard is 50-65 characters per line.

| Container | Max width |
|---|---|
| Body paragraph (single column) | `60ch` (~600px at 16px body) |
| Body paragraph (case study sidebar context) | `48ch` |
| Heading | No max-width (heading fills its container) |
| Display | No max-width (display fills its container) |

`ch` is a CSS unit that measures characters of the current font. Sixty `ch` means sixty characters wide. The browser handles the math.

**What this means in practice:** body paragraphs always live inside a `max-width: 60ch` container. Even on a wide desktop screen, body text does not stretch to the full window. The negative space around the paragraph is part of the design.

---

## 6. Color tokens (B&W per ADR 0003)

V1 uses a neutral B&W system. Color enters as a deliberate later decision via a superseding ADR.

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#F9F8F4` | The page background. A warm off-white. |
| `--color-ink` | `#111111` | The primary text color and the primary fill. |
| `--color-hairline` | `rgba(17, 17, 17, 0.1)` | Borders, dividers, separators between grid cells. |
| `--color-surface` | `#FFFFFF` | Cards, panels, the chat surface background. |
| `--color-muted` | `#666666` | Secondary text, captions, less important metadata. |
| `--color-inverse-paper` | `#111111` | Dark sections (e.g., the footer on the current site). |
| `--color-inverse-ink` | `#F9F8F4` | Text on dark surfaces. |

No accent color in v1. Selection states use the inverse pair (paper text on ink background, or vice versa). Hover states use opacity or weight changes, not color.

---

## 7. Spacing scale

Tailwind v4 ships a default spacing scale (every multiple of 4px). We use the default plus three editorial-scale additions for hero whitespace.

| Token | Value | Common use |
|---|---|---|
| `space-1` | 4px | Tight gaps between related elements |
| `space-2` | 8px | Default small gap |
| `space-3` | 12px | Gap between a label and its value |
| `space-4` | 16px | Default paragraph spacing |
| `space-6` | 24px | Section internal padding |
| `space-8` | 32px | Between sections inside a card |
| `space-12` | 48px | Between cards |
| `space-16` | 64px | Between case study sections |
| `space-24` | 96px | Hero internal padding |
| `space-32` | 128px | Between page sections |
| `space-40` | 160px | Hero vertical breathing room (added) |
| `space-60` | 240px | Editorial-scale top-of-page whitespace (added) |

**What this means in practice:** when picking a gap or padding value, pick from this list. Do not invent values like 18px or 22px. The scale gives the site rhythm.

---

## 8. Implementation: Tailwind v4 with CSS-first theming

Tailwind v4 lets us define tokens directly in CSS using the `@theme` directive. This is the file Codex creates first. UUI v8 components inherit from these tokens automatically.

### File location

`src/styles/globals.css`

### Token definitions

```css
@import "tailwindcss";

/* Self-host Google Fonts for performance and offline */
@font-face {
  font-family: "Playfair Display";
  src: url("/assets/fonts/PlayfairDisplay-Light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Playfair Display";
  src: url("/assets/fonts/PlayfairDisplay-Italic.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/assets/fonts/Inter-Light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/assets/fonts/Inter-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/assets/fonts/Inter-Italic.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
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
  --font-display: "Playfair Display", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Macro register */
  --text-display-1: clamp(80px, 14vw, 180px);
  --text-display-1--line-height: 0.9;
  --text-display-1--letter-spacing: -0.03em;
  --text-display-1--font-weight: 300;

  --text-display-2: clamp(56px, 9vw, 120px);
  --text-display-2--line-height: 0.95;
  --text-display-2--letter-spacing: -0.02em;
  --text-display-2--font-weight: 300;

  /* Standard register */
  --text-h1: clamp(40px, 4vw, 56px);
  --text-h1--line-height: 1.05;
  --text-h1--letter-spacing: -0.01em;
  --text-h1--font-weight: 400;

  --text-h2: clamp(28px, 2.8vw, 40px);
  --text-h2--line-height: 1.15;
  --text-h2--letter-spacing: -0.005em;
  --text-h2--font-weight: 400;

  --text-h3: clamp(20px, 1.8vw, 24px);
  --text-h3--line-height: 1.25;
  --text-h3--font-weight: 400;

  --text-h4: 18px;
  --text-h4--line-height: 1.3;
  --text-h4--font-weight: 400;

  --text-body-lg: clamp(18px, 1.4vw, 20px);
  --text-body-lg--line-height: 1.7;
  --text-body-lg--font-weight: 400;

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
    font-family: var(--font-display);
    font-size: var(--text-h1);
    line-height: var(--text-h1--line-height);
    letter-spacing: var(--text-h1--letter-spacing);
    font-weight: 400;
  }

  h2, h3, h4 {
    font-family: var(--font-sans);
    font-weight: 400;
  }

  h2 {
    font-size: var(--text-h2);
    line-height: var(--text-h2--line-height);
    letter-spacing: var(--text-h2--letter-spacing);
  }

  h3 {
    font-size: var(--text-h3);
    line-height: var(--text-h3--line-height);
  }

  h4 {
    font-size: var(--text-h4);
    line-height: var(--text-h4--line-height);
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

For the macro display and the micro register, Codex adds two custom Tailwind utilities:

```css
@utility text-display-1 {
  font-family: var(--font-display);
  font-size: var(--text-display-1);
  line-height: var(--text-display-1--line-height);
  letter-spacing: var(--text-display-1--letter-spacing);
  font-weight: 300;
}

@utility text-display-2 {
  font-family: var(--font-display);
  font-size: var(--text-display-2);
  line-height: var(--text-display-2--line-height);
  letter-spacing: var(--text-display-2--letter-spacing);
  font-weight: 300;
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

UUI v8 Pro components use Tailwind classes internally. When we override the underlying tokens in `@theme`, every UUI component automatically picks up our values. We do not need to fork UUI or patch components. The override happens at the source.

Example: UUI's `<Button>` uses `font-family: var(--font-sans)` internally. Because we have set `--font-sans` to Inter, every UUI button renders in Inter without us doing anything component-by-component.

The only time we override a UUI component directly is if its internal typography needs to break the default rules (rare; document the exception in a learning note if it comes up).

---

## 9. Pairing examples

Real combinations showing how the three faces and the registers combine.

### Example 1: Home page hero

```
[mono: "01 /// POSITIONING"]                                              [mono: "ENTERPRISE AI PRODUCT STRATEGIST"]

[display-1: "I help enterprise leaders turn AI ambiguity into executable
roadmaps and adopted products."]

[body-lg italic Playfair Display: "I work at the intersection of people,
systems, and emerging AI capabilities."]
```

Three voices stacked. Micro mono frames the section. Display Playfair carries the strategic claim. Italic Playfair at body-lg size carries the subhead with editorial flair.

### Example 2: Case study opener

```
[mono: "AI ENABLEMENT  ///  MEETING PREP AGENT"]

[h1: "Scaling sales enablement with AI agents."]

[body-lg: "I moved a GenAI use case from idea to validated evidence in
3-4 weeks, accelerating investment decisions and scaling an AI meeting-
prep agent to 300+ sales associates in under a year."]
```

Mono frames the category. Playfair h1 carries the title. Inter body-lg carries the lead paragraph.

### Example 3: Inside a case study paragraph with emphasis

```
[h3: "Validating the workflow, not just the tech."]

[body: "Instead of guessing features, I led a rapid validation sprint.
We did *not* write code initially. I sat with sales associates and
manually mapped their meeting prep mental model."]
```

Inter h3 for the section subhead. Inter body for the paragraph. Inter Italic for the in-body emphasis on "not."

### Example 4: A pull quote inside a case study

```
[body: "...the team chose to build a custom orchestration layer rather
than continue with LangChain in production."]

[h1 Playfair italic: "The abstraction was right for prototyping. It
became the wrong choice for production."]

[body: "That decision shaped the next two quarters of architecture work."]
```

Playfair Italic at h1 size as a voice-shift pull quote between two body paragraphs.

### Example 5: Llamita's chat surface

```
[llamita-meta: "LLAMITA  ///  10:47 AM"]

[llamita-body: "Ah, reading the LangChain decision. The headline is
that Maicol recommended LangChain for prototyping. The better story is
why he recommended *against* it in production. Want me to expand?"]

[llamita-meta: "QUERYING CURATE MIND..."]
```

JetBrains Mono throughout. Mono-meta in uppercase for timestamps and tool indicators. Mono-body in mixed case for Llamita's actual speech. The whole bubble reads as a different voice from the site copy.

### Example 6: A small metadata chip

```
[mono-sm: "RAG ARCHITECTURE"] [mono-sm: "AZURE OPENAI"] [mono-sm: "REACT"]
```

Three tech-stack chips, all `mono-sm` (10px JetBrains Mono uppercase tracked).

---

## 10. How to use this when building

A short practical guide for adding new content.

1. **What kind of content is it?**
   - Display moment (hero, big section opener) → use `text-display-1` or `text-display-2` utility class
   - Standard heading → use `<h1>`, `<h2>`, `<h3>`, `<h4>` HTML elements (auto-styled per Section 8)
   - Body paragraph → use `<p>` (auto-styled, max-width 60ch)
   - Lead paragraph or hero subhead → wrap in a class that applies `text-body-lg`
   - Metadata, label, intent marker → use `text-mono`, `text-mono-lg`, or `text-mono-sm` utility class
   - Llamita's speech → use `text-llamita-body` utility class

2. **Need emphasis?** Use `<em>` (renders as Inter Italic).

3. **Need a pull quote?** Use `<blockquote>` with `text-h1` and `italic` and `font-display` classes. (Codex can define a `<PullQuote>` component for this.)

4. **Need a different color?** You can't. V1 is B&W. If a component genuinely needs contrast, use the inverse pair (paper-on-ink). Color decisions land in a later ADR.

5. **Need a different spacing?** Pick from the scale in Section 7. Do not invent.

6. **In doubt?** Re-read Section 1 ("Font families") and Section 3 ("Type scale"). The system is small enough to fit in your head.

---

## 11. Open questions

- **Font self-hosting vs CDN.** I have specified self-hosting via `/assets/fonts/`. The alternative is Google Fonts CDN. Self-hosting is faster after first load, more reliable, and works offline (relevant for Replit local dev). Cost: a one-time download and conversion to woff2. Recommend self-hosting; final call lives with Codex.
- **Should body italic ever appear in headings?** Current spec says no. Worth confirming as we write copy.
- **Pull quote component design.** This spec defines the typography of a pull quote but not its container styling (borders, indentation, etc.). Belongs in a component spec when written.

---

## 12. Open notes for the future color ADR

When color enters, the following decisions need to be made together:

- One accent color, or multiple? (Current site has blue accent + yellow highlight.)
- Does color carry semantic meaning? (Intent = blue? Success = green?)
- Does Llamita's chat get a color identity? (Recommend keeping Llamita B&W to preserve the "machine voice" distinction.)
- Do citation chips get a color signal? (Recommend yes; would help them stand out.)

Capturing these here so the future color ADR has a starting checklist.

---

## Change log

- 2026-05-25: Initial draft. Incorporates the Refined Editorial direction from Maicol. Fonts locked to Playfair Display, Inter, JetBrains Mono. Weight Skip rule established. Token system defined.
