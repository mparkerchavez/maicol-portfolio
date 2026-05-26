# Agents and Collaboration Model

This project is built by a small team. Each agent has a defined role, a defined territory in the repo, and a defined hand-off protocol.

## The team

| Agent | Role | Writes to |
|---|---|---|
| Maicol (human) | Owns the product. Approves all major decisions. Drives visual identity. | Anywhere, but typically `content/` and `assets/` |
| Claude | Architecture, specs, copy, voice, intent logic, knowledge base, site content writing. | `docs/`, `content/` |
| Codex | Implementation, builds, deploys. | `src/`, `public/`, root config files |
| Gemini | Visual asset generation (works with Maicol). | `assets/` |
| Untitled UI MCP | Component library lookup. Read-only tool used by Codex. | Nothing |

## How we sync

- **Git is the only sync layer.** No agent reads another agent's chat log.
- **Information that must be shared between agents lives in the repo.** If it isn't in the repo, it didn't happen.
- **Each agent session loads context** from `AGENTS.md` and the relevant files in `docs/`. Nothing else carries forward between sessions.

## Hand-off protocol

1. **Spec to implementation.** Claude writes a spec in `docs/specs/`. Codex reads it, implements, commits. If the spec is ambiguous, Codex writes a question to `docs/handoffs/` and pings Maicol.
2. **Implementation back to spec.** When Codex's implementation reveals a spec drift, Claude updates the spec to match reality (or proposes an ADR change).
3. **Visual to code.** Gemini exports to `assets/[category]/source/`. Maicol moves approved variants to the right `assets/[category]/[state]/` subfolder. Codex imports them.
4. **Decisions.** Any decision worth remembering becomes an ADR in `docs/decisions/`.

## Branch and commit conventions

- **Branch per feature:** `feature/01-typography`, `feature/llamita-idle`, `chore/repo-init`.
- **Commit message format:** `[scope] short description`. Reference the spec or ADR in the body when relevant.
- **PR to main.** Maicol reviews and merges.
- **No force pushes to main.** Ever.

## Anti-patterns

- Do not duplicate content between `content/` and `src/`. Codex imports from `content/`.
- Do not write production code outside `src/`.
- Do not change a locked ADR without writing a superseding one.
- Do not skip the spec step for non-trivial work.
- Do not invent facts about Maicol. Source from `content/knowledge-base/evidence-bank.md`.
- Do not use em dashes. See `CLAUDE.md` for the full writing rules.

## When a new session opens

- Read `AGENTS.md` (this file).
- Read `docs/specs/00-prd.md`.
- Read the relevant ADR(s) for whatever you're about to touch.
- Read the relevant spec(s).
- If anything is unclear, check `docs/handoffs/` for open notes.

## Environment

- **Local dev:** Maicol's machine, repo cloned from Git.
- **Deployment:** Replit (configured via `.replit` and `replit.nix`).
- **MCP servers:** Untitled UI MCP for component lookup. Curate Mind MCP for in-chat tool calls (production).
- **Required env vars:** documented in `docs/specs/07-chat-architecture.md` (once written).

## Status

Pre-build. Foundation in place. See `docs/handoffs/0001-next-init-handoff.md` for the Codex bootstrap brief.
