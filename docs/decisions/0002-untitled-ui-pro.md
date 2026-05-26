# ADR 0002: Untitled UI v8 Pro as the component foundation

**Status:** Accepted
**Date:** 2026-05-25
**Decision-maker:** Maicol
**Author:** Claude

---

## Context

The v2 site needs a consistent UI component layer (forms, modals, navigation, cards, buttons, inputs). Building these from scratch is slow and risks the "AI-generated portfolio" look that the project is explicitly trying to escape. Using a third-party library is faster, more durable, and lets us push our design effort into the things that actually differentiate the site (typography, Llamita, the chat, the Curate Mind visualization).

Maicol has an Untitled UI v8 Pro license. The library ships an MCP server that lets Codex query components by name.

## Options considered

### Option A: Untitled UI v8 Pro
- Pros: Maicol already has the license. React + Tailwind v4 + TypeScript native, matches our stack. MCP integration lets Codex pull components without copy-paste. Well-designed components that do not look templated. Customizable through Tailwind overrides.
- Cons: Paid library, ties us to one vendor's design conventions until we override them. Slight learning curve for the MCP integration.

### Option B: shadcn/ui
- Pros: Free, popular, copy-into-repo philosophy gives us full control.
- Cons: More work to assemble a coherent design system. Less polished out of the box.

### Option C: Build everything custom
- Pros: Maximum design control.
- Cons: Slow. Risk of the project bogging down in component plumbing before the differentiated work begins.

### Option D: Untitled UI free version
- Pros: Free.
- Cons: Fewer components. No MCP. Maicol already has Pro.

## Decision

**Untitled UI v8 Pro, accessed via its MCP server.**

We use Untitled UI for foundational UI components (buttons, inputs, dialogs, navigation, forms, cards). We override its default typography and color tokens with our own design system (`docs/specs/01-typography.md`, `docs/specs/02-design-tokens.md`). We build differentiated components custom (Llamita, the chat surface, the through-line toggle, the trust architecture visualization, the chips).

## Consequences

### Positive
- Faster execution on standard UI patterns.
- Codex can query the component library directly via MCP rather than copy-pasting from docs.
- Less time spent on component plumbing.
- Coherent design system out of the box, which we then layer our identity onto.

### Negative
- Some components will need overrides to match our typography and B&W palette.
- Codex needs the Untitled UI MCP API key configured before pulling components. Maicol will provide this when Codex's environment is ready.

### Neutral
- The library is paid, but the cost is already sunk (Maicol has the license).

## Notes

- Untitled UI default font is Inter. We override with our type stack (Inter Tight, Playfair Display, Space Mono). Spec details in `docs/specs/01-typography.md` once written.
- Untitled UI default colors are a neutral system. We override with our B&W-first tokens. See ADR 0003.
- Components that should be built custom rather than pulled from Untitled UI:
  - Llamita character (no parallel in any library)
  - Chat surface (Llamita-specific behavior)
  - Through-line toggle (custom interaction)
  - Trust architecture visualization (custom)
  - Llamita chips (custom interaction)
- Components that should come from Untitled UI:
  - Buttons, inputs, form controls
  - Navigation patterns
  - Card layouts
  - Modal / dialog primitives
  - Tooltip primitives
  - Layout grid utilities
