# ADR 0005: Five intent tracks

**Status:** Accepted
**Date:** 2026-05-25
**Decision-maker:** Maicol
**Author:** Claude

---

## Context

The site infers visitor intent from on-site behavior and routes the experience accordingly. The number and definition of intent tracks is load-bearing: too few and the experience feels generic, too many and each track gets shallow because we cannot fill it with distinctive content.

The reference for explicit persona routing is billysweeney.com, which uses six tracks (For Anyone, Recruiters, Design Directors, Product Designers, Product Managers, Engineers). We evaluated whether to mirror that count or land somewhere different.

## Options considered

### Option A: Six tracks (Billy Sweeney parity)
- For Anyone, Recruiters, AI Strategist, PMs, Product Designers, Engineers.
- Pros: More precise targeting per audience.
- Cons: The Engineers track is the hardest to fill convincingly without overclaiming on technical depth. Maicol's identity guide explicitly warns against listing LangChain or Streamlit as personal tools. Engineers who visit are almost always either CTOs (who collapse into AI Strategist) or peers (who are served by For Anyone).

### Option B: Five tracks (Engineers dropped)
- For Anyone, Recruiters, AI Strategist, Product Managers, Product Designers.
- Pros: Each track has distinctive content. No shallow tracks.
- Cons: A CTO at a small AI-native startup might fit awkwardly between AI Strategist and Product Manager. We accept this trade.

### Option C: Four tracks (Product Designers dropped)
- For Anyone, Recruiters, AI Strategist, Product Managers.
- Pros: Even tighter. Avoids the design-evaluation risk.
- Cons: Maicol's identity guide explicitly warns against targeting designer roles, but the Product Designer track in v2 is reframed as thought-leadership about the future of design in AI. That content is genuinely valuable and worth a track.

## Decision

**Five tracks: For Anyone, Recruiters, AI Strategist, Product Managers, Product Designers.**

Each track has a distinct content profile, a calibrated next best action, and a Llamita framing.

| Track | Content profile | Calibrated NBA |
|---|---|---|
| For Anyone | Single message, proof points, path into any track | Open exploration, no prescription |
| Recruiters | Role status, target titles, resume, scheduling link, location, compensation | Download resume, book a call |
| AI Strategist | LangChain decision, trust architecture, Capital Group sprint, Curate Mind build, scoping discipline | Open a substantive conversation with Llamita |
| Product Managers | Through-line argument, methodology, prioritization, what gets shipped vs de-scoped | Read the case study most relevant to the role, or book a call |
| Product Designers | Maicol's POV on designers in the age of AI, Curate Mind research, his own positions | Engage with the POV content, read the research |

## Consequences

### Positive
- Each track has enough material to feel substantive.
- Llamita's voice library can be calibrated per track without exploding in size.
- The intent inference logic has a manageable target space.

### Negative
- A CTO might receive a slightly off-center calibration (AI Strategist when they are also acting as a hiring manager). We accept this; the chat allows the visitor to redirect.
- No dedicated track for AI-native founders. They fold into AI Strategist.

### Neutral
- "For Anyone" is the default state for every session until signal accumulates.

## Notes

- The Product Designer track is the most strategically delicate. It is thought-leadership, not folio evaluation. The track's content draws on Maicol's Curate Mind research about the role of designers in the AI era.
- The Product Manager track is the second most delicate. Maicol has not held a PM title. The track must frame the function forward, not the title backward. See PRD section 8 (The Through-Line Argument).
- The track inference is invisible to the visitor unless Llamita surfaces it. Visitors do not see "you are being routed as a Recruiter" anywhere. The character may surface it gently in the NBA panel.
