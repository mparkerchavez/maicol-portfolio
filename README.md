# Maicol Portfolio 2026

The next iteration of maicolparkerchavez.com.

A portfolio that demonstrates Maicol's AI product work by being one. Visitor intent is inferred from on-site behavior. A content-aware character named Llamita narrates, comments, and routes visitors to the proof they need.

## Where to start reading

1. `AGENTS.md` - Who works on this and how.
2. `CLAUDE.md` - Instructions for Claude sessions.
3. `docs/specs/00-prd.md` - The strategic north star.
4. `docs/decisions/` - Locked architectural decisions.
5. `docs/specs/` - Living specifications.

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind v4
- Untitled UI v8 Pro (via MCP)
- Anthropic API for the Llamita chat
- Curate Mind integration (tool invocation from chat)
- Replit for deployment

## UI primitive rules

App-facing code imports standard UI primitives from `src/components/ui`.

Those adapters wrap Untitled UI v8 primitives and apply the Maicol visual system. Do not import from `src/components/base` in app components.

Run this guard before shipping UI work:

```bash
npm run audit:uui
```

## Untitled UI MCP

The Untitled UI MCP is available in Codex as a tool. Pro access requires the UUI API key at request time or in local MCP configuration. Keep the key outside Git.

## Status

Phase 1.5 shipped. Next work should continue from the specs and current handoffs.
