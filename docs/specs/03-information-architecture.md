# Spec 03: Information Architecture

**Purpose:** Define the sitemap, page structures, global elements, signal surfaces, and page-context contract for the site.
**Owner:** Claude
**Status:** Active
**Last updated:** 2026-05-25
**Related ADRs:** 0005 (Five intent tracks), 0006 (Desktop-only v1), 0007 (About via Llamita)
**Related specs:** 00 (PRD), 01 (Typography), 06 (Knowledge Base)

---

## Why this spec exists

A visitor lands somewhere. They read, scroll, hover, click, and form a sense of who Maicol is. Every interaction they have is both content and signal. This spec defines:

1. The pages that exist and how they connect.
2. What lives on each page, in what order.
3. The global elements (Llamita, header, footer) that follow the visitor everywhere.
4. Every interactive surface that produces intent signal, mapped to its location on the page.
5. The data contract between the frontend and the chat backend (what the chat is told about the visitor's current context).

For a citizen developer, this spec answers the questions: *What pages am I building? What goes on each one? What gets tracked? How does the chat know what the visitor is reading?*

---

## Scope

### In scope
- Full sitemap
- Page-by-page section structure
- Global elements (header, Llamita, footer)
- Signal surface inventory mapped to specific DOM elements
- Affordance copy (the small text bits that invite engagement)
- The page-context contract sent to the chat backend
- Navigation patterns between pages
- The through-line toggle behavior

### Out of scope
- Visual layout details (grid columns, exact pixel positions). Those live in component specs.
- Llamita's voice copy. Lives in Spec 04.
- Llamita's behavior states (when she comments, how she expands). Lives in Spec 05.
- The chat technical implementation. Lives in Spec 07.
- Intent inference scoring logic. Lives in Spec 08.

---

## 1. Sitemap

The site is intentionally small. Four internal pages, one external link, one global chat surface.

```
maicolparkerchavez.com (v2)
│
├── /                                       Home
│   │
│   ├── Llamita (persistent, top-right)
│   │   └── Chat panel (right-edge slide-out)
│   │
│   ├── /work/capital-group                 Case study
│   ├── /work/tech-trends                   Case study
│   └── /work/innovation-sprints            Case study
│
└── ↗ curatemind.io                         External (live product)
```

That is the whole map.

No `/about` (per ADR 0007, about is answered by Llamita).
No `/contact` (email and resume download are surfaced inline).
No `/blog` (per PRD non-goals).
No `/curate-mind` internal page (mini-app teaser lives on home; full experience is external).
No `/earnestly` internal page (coming-soon card lives on home).

The case study URL pattern uses `/work/[slug]` to leave room for additional case studies later without a sitemap reshuffle.

---

## 2. Home page structure

Vertical sections, top to bottom, in reading order.

| # | Section | Purpose |
|---|---|---|
| 1 | Status strip | A thin, persistent context bar at the very top. Replaces the ticker on the current site. |
| 2 | Header | Name, minimal nav, contact email. |
| 3 | Llamita (global, top-right) | Character. Always visible. |
| 4 | Hero with through-line toggle | The single message, switchable across three framings. Includes the about-affordance. |
| 5 | Case study triptych | Three cards, one per case study. The entry points. |
| 6 | Curate Mind mini-app | Three example traces from theme to source. Link out to curatemind.io. |
| 7 | Earnestly card | Coming-soon framing with email signup capture. |
| 8 | Footer | Let's Talk CTA, resume download, LinkedIn, copyright. |

### Section 1: Status strip

Thin horizontal bar at the very top of the page. Style: `text-mono-sm` (10px uppercase tracked) in JetBrains Mono. Content:

```
[mono-sm: "MAICOL PARKER-CHAVEZ"]   ///   [mono-sm: "AI PRODUCT STRATEGIST"]   ///   [mono-sm: "OPEN TO SENIOR PM AND AI PRODUCT LEAD ROLES"]
```

No animation, no ticker scrolling. The current site's ticker is removed. The strip is informational, sticky to the top.

### Section 2: Header

Below the status strip, below the fold of the strip. Style: `text-body` Inter for nav links, `text-h3` Inter for the name.

Left side: name as homepage link.
Right side: two elements only:
- `[CONTACT]` mono-style link, mailto to `mparkerchavez@gmail.com`
- `[RESUME]` mono-style link, downloads the resume PDF

Three things explicitly omitted: a nav menu with multiple links, a hamburger, a social icon row. The header stays minimal. Llamita is the navigation layer for everything else.

### Section 3: Llamita

Llamita appears top-right of the viewport, fixed-positioned, persistent across all pages. Size: roughly 80x80px in idle state.

The chat panel slides in from the right edge and **overlays the page content rather than pushing it**. Width: 380px. The underlying page receives a subtle backdrop dim (around 8% black overlay) when the chat is open. When the chat closes, the panel slides out and the page returns to full width with no reflow.

This overlay behavior is a deliberate choice for narrow desktop screens (see Section 12, Viewport constraints). Pushing the content would squeeze case study columns to uncomfortable widths on a 13-inch MacBook Air.

Llamita's behavior states, animation, and chat surface are specified in Spec 05 (Llamita Behavior) and Spec 07 (Chat Architecture). For IA purposes, what matters is: Llamita is global, always present, accessible from every page, and her chat overlays rather than reshapes the page.

### Section 4: Hero with through-line toggle

The strategic centerpiece of the home page. Three subsections vertically stacked.

#### 4a. Section marker

`[mono: "01 /// POSITIONING"]`

Aligned left.

#### 4b. The through-line toggle

A row of three switchable labels. Style: `text-h3` Inter, with the active option in `text-h3` Playfair italic.

```
[ Product Designer ]   [ AI Product Lead ]   [ End-to-end Product ]
```

Behavior:
- Default state: "AI Product Lead" is active (this is the strongest fit per the identity guide).
- Clicking any label switches the active framing.
- Hovering a non-active label previews the framing in the hero copy below (preview disappears on mouse-out).
- The active framing's hero copy renders below.
- The active framing is remembered in `sessionStorage` for the duration of the visit and passed as signal to the chat.

#### 4c. The hero copy

Three versions, one per framing. Each is one display-1 sentence plus one body-lg subhead.

**Product Designer framing:**
```
[display-1: "I have been a Product Designer for 24 years. I am working on what that becomes in the age of AI."]

[body-lg italic Playfair: "Curate Mind is one piece of the answer. Read the work, or ask Llamita."]
```

**AI Product Lead framing (default):**
```
[display-1: "I work in the gap between AI capability and human adoption."]

[body-lg italic Playfair: "Discovery, validation, prototyping, alignment. All in one person."]
```

**End-to-end Product framing:**
```
[display-1: "Twenty-four years of product work, converged on one function."]

[body-lg italic Playfair: "Find where AI creates value. Prove it before the build. Scale what works."]
```

The display-1 line is the strategic hook. The body-lg italic line is the subhead. Together they take roughly half the viewport on a standard desktop.

#### 4d. The about affordance

Below the hero copy, small and quiet. Style: `text-mono` JetBrains Mono uppercase tracked.

```
[mono: "TO LEARN ABOUT MAICOL  →  ASK LLAMITA"]
```

The arrow points up and to the right, toward Llamita's perch. Hovering this element makes Llamita "look back" (a small behavior cue defined in Spec 05). Clicking opens the chat with a primed first prompt: `tell me about Maicol`.

This element is the explicit bridge between the static home page and the dynamic chat layer.

### Section 5: Case study triptych

Three cards side-by-side on desktop. One column on mobile (not optimized in v1 per ADR 0006).

Each card contains:
- Section marker: `[mono: "02 /// AI ENABLEMENT"]` (or 03, 04 for the other two)
- Focus line: `[mono-sm: "FOCUS: AI SALES WORKFLOW"]`
- Case study title: `[h2 Inter]`
- One-sentence problem: `[body-lg]`
- One-sentence approach: `[body italic Inter]` (the small italic teaser)
- Metric chips: 2-3 chips using `[mono-sm]` like `[300+ USERS]`, `[GENAI ADOPTION]`
- An arrow icon pointing up-right (the click affordance)

Whole card is a link to `/work/[slug]`. Hover state: card fills with `--color-surface` (the white surface token), the arrow shifts up and right.

### Section 6: Curate Mind mini-app

Section marker: `[mono: "05 /// LIVE PRODUCT"]`

Heading: `[h2 Inter: "Curate Mind."]`

Lede: `[body-lg]` short paragraph naming what Curate Mind is and the headline numbers (178 sources, 1,561 data points, 28 positions, 11 themes).

Then the mini-app itself. Three example trace cards arranged horizontally on desktop. Each card shows one real trace from a theme through a position to a source. The card structure:

```
┌─────────────────────────────────────────┐
│ [mono-sm: "THEME"]                      │
│ [body]: "The future of design in AI"    │
│                                         │
│ ↓                                       │
│                                         │
│ [mono-sm: "POSITION"]                   │
│ [body]: "Designers who can prompt..."   │
│                                         │
│ ↓                                       │
│                                         │
│ [mono-sm: "EVIDENCE"]                   │
│ [body-sm]: "From a Sept 2025 paper..."  │
│                                         │
│ ↓                                       │
│                                         │
│ [mono-sm: "SOURCE"]                     │
│ [body-sm]: "Author name, publication"   │
└─────────────────────────────────────────┘
```

At the bottom of the section, a single link: `[mono: "EXPLORE THE FULL EXPERIENCE  →  CURATEMIND.IO"]`. Opens curatemind.io in a new tab.

Clicking a trace card expands it inline (no page navigation). Expanded state shows the full claim plus a "ask Llamita to explain this trace" affordance.

### Section 7: Earnestly card

Section marker: `[mono: "06 /// COMING NEXT"]`

A single card, full-width or two-thirds-width on desktop. Style: visibly different from the case study cards (lighter border, smaller scale) to communicate "this is a heads-up, not a featured project."

Contents:
- `[h2 Inter: "Earnestly."]`
- `[body-lg]`: one-paragraph description (UX coaching for builders shipping web apps with AI tools)
- `[body italic]`: a single italic line as a tagline
- Email signup form:
  - Email field
  - Optional textarea: "What would you most want from this?" (`[body-sm]`)
  - Submit button: `[BE THE FIRST TO TRY IT]` (`text-mono` style)
  - On submit: confirmation message in Llamita's voice (see Spec 04)

The submission writes to a simple data store (defined in Spec 09 when written). The email and optional answer are stored alongside a timestamp and the inferred track at the moment of signup (high-signal data point).

### Section 8: Footer

Bottom of every page. Dark surface (`--color-inverse-paper`), light text (`--color-inverse-ink`).

Two-column desktop layout:

**Left column:**
- `[mono: "07 /// LET'S TALK"]`
- `[display-2: "Let's talk."]` as a clickable mailto
- Below, three small text links in `text-mono-lg`:
  - `↘ EMAIL  MPARKERCHAVEZ@GMAIL.COM`
  - `↘ RESUME  DOWNLOAD PDF`
  - `↘ LINKEDIN  LINKEDIN.COM/IN/MPARKERCHAVEZ`

**Right column:**
- A small "ask Llamita" affordance: `[mono: "OR  →  ASK LLAMITA WHAT TO ASK NEXT"]`
- Below, copyright: `[mono-sm: "© 2026 MAICOL PARKER-CHAVEZ"]`

---

## 3. Case study page structure

All three case studies share the same page structure. The content differs.

| # | Section | Notes |
|---|---|---|
| 1 | Status strip | Same as home |
| 2 | Header with breadcrumb | Adds a back-to-home link on the left |
| 3 | Llamita (global) | Page-context shifts to this case study |
| 4 | Case study hero | Title, kicker, lead paragraph |
| 5 | Two-column layout: sidebar + narrative | |
| 5a | Left sidebar (sticky) | Role, collaborators, methods, impact metrics |
| 5b | Right main column (scrolling) | Three-act narrative with chips interspersed |
| 6 | Other Projects / Related Work | Quiet links to peer work |
| 7 | Footer nav | Previous case study / Next case study |
| 8 | Footer (site) | Same as home |

### Section 4: Case study hero

```
[mono: "AI ENABLEMENT  ///  MEETING PREP AGENT"]

[h1 Playfair: "Scaling sales enablement with AI agents."]

[body-lg]: lead paragraph
```

### Section 5a: Left sidebar

Width: 4 columns out of 12. Sticky to viewport on scroll.

Contents (in order):
- `[mono-sm: "MY ROLE"]` followed by `[body]` role description
- `[mono-sm: "COLLABORATORS"]` followed by `[body-sm]` list
- `[mono-sm: "METHODS"]` followed by chip row of `[mono-sm]` method tags
- A boxed `[mono-sm: "IMPACT METRICS"]` panel with the headline numbers

### Section 5b: Right main column

Width: 8 columns out of 12. Three-act narrative:

```
[mono-sm: "01 /// THE CHALLENGE"]
[h2 Inter: "The 'blank page' problem."]
[body]: paragraphs...

  [Llamita chip: "Why didn't they just ask sales associates what they wanted?"]

[mono-sm: "02 /// THE STRATEGY"]
[h2 Inter: "Validating the workflow, not just the tech."]
[body]: paragraphs...

  [Llamita chip: "What was the decision NOT to build?"]
  [Llamita chip: "How did this scale from 12 to 300+ users?"]

[mono-sm: "03 /// THE OUTCOME"]
[h2 Inter: "From 3 months to 3 weeks."]
[body]: paragraphs...

  [Llamita chip: "How does this translate to a Senior PM role?"]
```

**Llamita chips.** Two to three pre-written prompts per case study, placed inline at natural expansion moments. Each chip is a button styled in `text-mono` JetBrains Mono. Clicking a chip:
1. Opens Llamita's chat panel.
2. Submits the chip text as the visitor's first message.
3. Llamita responds in voice, expanding on the topic with the relevant evidence.
4. The chip click is recorded as high-quality intent signal.

The actual chip prompts per case study live in `content/chips/[slug].md` (created in Spec 04 work).

### Section 7: Footer nav

Two elements:
- Left: `[mono: "←  BACK TO INDEX"]` (link to home)
- Right: `[mono-sm: "NEXT CASE STUDY"]` followed by `[h3 Inter: "Tech Trends & Horizon Planning →"]`

The "next" case study cycles through in order: Capital Group → Tech Trends → Innovation Sprints → (back to home).

---

## 4. Global elements

These appear on every page.

### 4.1 The header

Persistent. Sits below the status strip. Contains:
- Site name (links to home)
- Contact email link
- Resume download link

Hides on scroll down, reappears on scroll up (simple pattern, gives content more room).

### 4.2 Llamita

Persistent. Top-right of viewport. Always accessible. Behavior states defined in Spec 05.

### 4.3 The footer

Same structure on every page.

### 4.4 The status strip

Persistent. Top of viewport.

---

## 5. Signal surface inventory

Every interactive element on the site, mapped to its location and the signal it produces.

The inference scoring logic itself (weighting, thresholds, composites) lives in Spec 08. This section is the inventory: *what* gets tracked and *where*.

### High-signal surfaces (declared or unambiguous)

| Surface | Location | Action | Signal |
|---|---|---|---|
| Through-line toggle | Home, Section 4b | Click to switch framing | Strongly suggests track: Designer / Strategist / PM |
| Llamita chips | Case study main column | Click | Track + specific topic interest |
| Llamita first chat question | Chat panel | Type and submit | Highest single-message signal on the site |
| Resume download | Header, Footer | Click | Recruiter or hiring evaluation |
| Email mailto | Header, Footer | Click | Engaged visitor, decision-ready |
| LinkedIn link | Footer | Click | Cross-reference posture (often Recruiter) |
| Curate Mind external link | Home Curate Mind section | Click | Strategist / Builder |
| Earnestly signup submit | Home Earnestly card | Submit form | Builder / AI-native |
| About affordance | Home, Section 4d | Click | Open exploration, primes chat with `tell me about Maicol` |
| Footer "ask Llamita" link | Footer | Click | Opens chat with neutral primer |

### Medium-signal surfaces (intent-suggestive)

| Surface | Location | Action | Signal |
|---|---|---|---|
| Case study card | Home Section 5 | Click | Which kind of work matters; entry order matters too |
| Hover dwell on case study card | Home Section 5 | Hover >2s | Interest without commitment |
| Curate Mind trace card | Home Section 6 | Click to expand | Research/build curiosity |
| Specific phrase hover dwell | Anywhere in copy | Hover >2s on tagged phrase | Per-phrase calibrated signal (see below) |
| Section dwell within case study | Case study right column | Scroll to and dwell | Strategy section = methodology curious, Outcome section = hiring evaluation, etc. |
| Through-line toggle hover (no click) | Home Section 4b | Hover a non-active label | Curiosity about that framing |
| Next case study click | Case study footer nav | Click | Deep exploration |

### Tagged phrase hover surfaces

A small set of phrases throughout the site copy are tagged for hover-dwell tracking. Each is a `<span>` with a `data-signal` attribute that the frontend listens to.

| Phrase example | Tag | Signal |
|---|---|---|
| "300+ active sales associates" | `outcome` | Hiring evaluation, results-focused |
| "12-person pilot" | `adoption` | PM, strategist |
| "LangChain" | `technical` | AI Strategist |
| "Curate Mind" | `builder` | Builder, AI-native |
| "Innovation Sprint" | `methodology` | PM, methodology-curious |
| "trust architecture" | `trust` | Strategist, design-thoughtful |
| "agenda-first" | `judgment` | Strategist, design judgment |
| "regulated industry" | `vertical-financial` | Vertical match |

The full tag list lives in a maintained data file (`src/data/signal-phrases.ts`), updated as copy lands. Each tag contributes to a track's score per the weighting rules in Spec 08.

### Low-signal surfaces (ambient context)

| Surface | Action | Signal |
|---|---|---|
| Scroll depth on a page | Continuous | Engagement |
| Reading velocity | Calculated from scroll rate + time | Scanner vs reader posture |
| Idle time | No interaction for >30s | Thinking, distracted, or done |
| Llamita open/close | Click | Engagement |
| Return visits within a session | Page revisit | Active evaluation |

### Surfaces explicitly NOT tracked

- Mouse coordinates (not needed; we have hover events).
- Keystrokes (not needed; chat messages are submitted whole).
- Referrer URL (per Maicol's direction; do not over-engineer).
- IP-based geolocation (not needed and privacy-poor).
- Cookies for cross-session tracking (single-session only).

---

## 6. Affordance copy

The small text bits that tell visitors what they can do without being told. All affordances are written in mono, uppercase, with the calibrated voice of the site (not Llamita's voice; that voice is reserved for the chat).

### Affordance inventory

| Where | Copy | What it does |
|---|---|---|
| Home, below hero | `TO LEARN ABOUT MAICOL  →  ASK LLAMITA` | Opens chat with primed prompt |
| Home, Curate Mind section | `EXPLORE THE FULL EXPERIENCE  →  CURATEMIND.IO` | External link |
| Home, on each trace card | `EXPAND  ↓` (before expand), `ASK LLAMITA TO EXPLAIN  →` (after expand) | Inline expand + chat handoff |
| Home, Earnestly card | `BE THE FIRST TO TRY IT` | Submit signup |
| Case study chips | The chip text itself is the affordance | Opens chat with prompt |
| Footer | `OR  →  ASK LLAMITA WHAT TO ASK NEXT` | Opens chat with neutral primer |

All affordance copy is final and ready for Codex to use as written. Future tuning happens via Spec 04 revisions.

---

## 7. The page-context contract

Every chat message includes a small JSON block describing what the visitor is currently looking at. This is the dynamic layer described in Spec 06.

### Contract shape

```typescript
type PageContext = {
  // What page the visitor is on
  page: {
    slug: string;           // e.g., "home", "work/capital-group"
    title: string;          // e.g., "Capital Group — AI Enablement"
  };
  
  // What section of the page is currently in view
  inView: {
    sectionId: string;      // e.g., "the-strategy", "hero", "curate-mind-mini-app"
    sectionTitle: string;   // human-readable
  } | null;
  
  // The last tagged phrase the visitor hovered, if any
  lastHover: {
    phrase: string;         // e.g., "LangChain"
    tag: string;            // e.g., "technical"
    dwellMs: number;        // how long they hovered
    timestampMs: number;    // when it happened
  } | null;
  
  // The current through-line framing (default or visitor-selected)
  throughLine: "designer" | "ai-product-lead" | "end-to-end-product";
  
  // The current inferred track (set by Spec 08 logic)
  inferredTrack: {
    track: "for-anyone" | "recruiters" | "ai-strategist" | "product-managers" | "product-designers";
    confidence: number;     // 0 to 1
  };
  
  // Brief behavior trail (last 30 seconds, max 5 events)
  recentBehavior: Array<{
    type: "hover" | "click" | "scroll-section" | "chip-click";
    target: string;
    timestampMs: number;
  }>;
};
```

### How the contract gets assembled

1. The frontend maintains a global signal state via Zustand.
2. Every relevant interaction (hover, click, scroll into section, chip click) writes to the store.
3. The inference logic (Spec 08) reads the store and updates the inferred track.
4. When the visitor submits a chat message, the frontend assembles a `PageContext` snapshot from the store and sends it alongside the message.
5. The chat backend prepends the snapshot to the system prompt as a `[CURRENT VISITOR CONTEXT]` block per Spec 06.

### Storage rules

- Session-only. No persistence across visits in v1.
- No personally identifying information.
- Email collected via the Earnestly signup is stored separately, not in this context object.

---

## 8. Navigation patterns

How visitors move between pages.

### Home → Case study
- Click a case study card.
- Click a "next case study" link in a footer nav.
- Click a "related work" link inside another case study.
- Type "show me Capital Group" or similar in the chat. Llamita can navigate.

### Case study → Home
- Click the back-arrow in the header.
- Click "Back to index" in the footer nav.
- Click the site name in the header.

### Anywhere → Chat
- Click Llamita (always visible).
- Click any affordance that opens the chat.
- Click a Llamita chip inside a case study.

### Chat → Anywhere
- Click a link Llamita surfaces (e.g., "open the Capital Group case study").
- Close the chat panel (Llamita returns to idle).

### Home → External (Curate Mind, LinkedIn, Earnestly waitlist confirmation)
- Click the link. Opens in a new tab (`target="_blank"`).

---

## 9. The through-line toggle: behavior detail

This is the most complex interactive on the home page. Documenting it carefully here.

### States

| State | What's shown | What's stored |
|---|---|---|
| Default (no interaction) | "AI Product Lead" framing active | `throughLine = "ai-product-lead"` |
| Hover on a non-active label | Preview the framing in the hero copy (no commit) | No store change |
| Mouse-out from hover | Revert to active framing's copy | No store change |
| Click a non-active label | Lock in the new framing | `throughLine` updates, persists in sessionStorage |
| Re-visit within same session | Resume the last-locked framing | Read from sessionStorage |
| Llamita reads the value | (Receives it as signal) | Feeds Spec 08 inference |

### Animation rules

Switching the framing should not feel like a hard cut. The display-1 text and the body-lg italic subhead both crossfade over ~200ms when the framing changes. Specific easing and motion are defined in Spec 05.

### Why the toggle exists

Two jobs:
1. The visitor self-selects a framing that fits them, demonstrating the through-line argument (function travels across role titles).
2. The choice is high-quality intent signal that feeds the inference system.

### What it does NOT do in v1

It does not propagate to the case study pages. Case studies have one fixed version in v1. Reframing case studies per toggle is a future enhancement, backlogged.

---

## 10. Open questions

- **Status strip behavior on scroll.** Does it stay sticky, or does it scroll away with the page? Recommendation: sticky. Confirms with Codex during implementation.
- **Hover-look behavior.** The about-affordance has Llamita "look back" toward the affordance on hover. Is this distracting or charming? Decision deferred to Spec 05 prototyping.
- **Curate Mind trace cards: which three traces?** Three specific traces need to be chosen for the home page mini-app. Should be the three most impressive or representative claims in Curate Mind. Maicol to pick.
- **Earnestly card placement.** Currently positioned after Curate Mind mini-app. Worth A/B-testing whether it earns its place above or below the Curate Mind section. Deferred until live.
- **Footer "next case study" cycling.** Final case study (Innovation Sprints) links back to home. Is there a better terminal action (e.g., "back to top" or "ask Llamita what's next")? Deferred.

---

## 11. Viewport constraints (the 13-inch MacBook Air rule)

The site is designed for desktop reading (per ADR 0006). The reference desktop for layout decisions is the **13-inch MacBook Air at its default scaled resolution**, which provides roughly 1440px of effective horizontal space. This is intentionally narrower than common 16-inch or external-monitor widths, so designing to it keeps the site legible across the range of desktop setups Maicol's audience actually uses.

### Hard rules

| Rule | Why |
|---|---|
| Main content max-width: 1280px | Centers cleanly on a 1440px viewport with breathing room on both sides. |
| Body paragraph max-width: 60ch (~600px) | Per Spec 01 line length rule. Holds on every viewport. |
| Chat panel width: 380px | Comfortable reading, polite to narrow viewports. Smaller than the previous 400-450px target. |
| Chat panel behavior: overlay, not push | Prevents content reflow on 13" MBA. Page stays at full width when chat opens. |
| Case study triptych: collapses gracefully | Below 1100px viewport, cards stack from three-across to two-across. Below 800px, to single column. |
| Sticky sidebar on case studies: 4 of 12 columns (~33%) | At 1100px main content width, sidebar is ~365px. Readable for the role/methods/metrics content. |

### What gets verified at 1440px

When Codex builds, every page should be tested at 1440x900 (the 13" MBA native effective resolution) before any other size. The pages must:

- Be readable end-to-end without horizontal scrolling.
- Render display-1 hero text at its clamped maximum (180px) without overflowing.
- Show the case study triptych as three cards across, comfortably.
- Open the chat panel without breaking the layout underneath.

### What gets verified beyond 1440px

The site should scale gracefully on wider monitors but never feel "stretched empty." Wide editorial whitespace is the design, not a bug. The 1280px max-width container holds the content; the surrounding space is intentional.

### Mobile

Per ADR 0006, mobile is out of scope for v1. The site renders on mobile (no errors, basic readability), but interactions like hover dwell, the chat panel, and the through-line toggle are not optimized for it.

---

## 12. What this spec hands off to others

Codex needs the following downstream specs before it can build everything described here:

- Spec 04 (Llamita voice): the chip prompts, the affordance copy refinements, the chat first-message responses.
- Spec 05 (Llamita behavior): the animation rules, the hover-look behavior, the chat panel slide-in.
- Spec 07 (Chat architecture): the backend implementation, the page context contract sending.
- Spec 08 (Intent inference): the scoring rules that turn signals into the `inferredTrack` value.
- Spec 09 (Curate Mind viz): the trace card structure detail, the expand interaction.
- Spec 10 (Earnestly signup): the form behavior, the storage backend, the confirmation flow.

Codex can begin home page layout and case study page layout from this spec and Spec 01. Llamita's actual character and chat behavior require specs 04, 05, 07.

---

## Change log

- 2026-05-25: Initial draft.
- 2026-05-25: Added viewport constraints (Section 11) anchored to 13-inch MacBook Air. Updated Llamita chat panel to overlay behavior at 380px width. Confirmed contact lives in footer (no standalone page) since About is via Llamita per ADR 0007.
