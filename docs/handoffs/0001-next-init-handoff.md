# Handoff 0001: Next.js project initialization

**From:** Claude
**To:** Codex
**Date:** 2026-05-25
**Status:** Open
**Related:** ADR 0001 (Next.js stack), ADR 0002 (Untitled UI Pro)

---

## What this is

The repo foundation is in place. Folder structure, PRD, ADRs, CLAUDE.md, and AGENTS.md are all committed. The Next.js application itself is not yet initialized. This hand-off briefs Codex on how to bootstrap the Next.js app inside the existing structure without disrupting anything.

## What the recipient needs to do

1. **Read first.**
   - `AGENTS.md`
   - `docs/specs/00-prd.md`
   - `docs/decisions/0001-nextjs-stack.md`
   - `docs/decisions/0002-untitled-ui-pro.md`
   - `docs/decisions/0003-bw-first.md`

2. **Initialize Next.js inside the existing repo without overwriting anything.**
   - From the repo root, run `npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir --no-import-alias --use-pnpm` (or npm if pnpm is unavailable).
   - When the installer asks about overwriting existing files (it will detect README.md and others), preserve our existing files. Never overwrite anything in `CLAUDE.md`, `AGENTS.md`, `README.md`, `.gitignore`, `docs/`, `content/`, or `assets/`.
   - If the installer wants to put pages in `app/`, redirect them into `src/app/` to match our spec.

3. **Verify the resulting structure.**
   - The Next.js install should populate `src/`, `public/`, `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts` (or Tailwind v4 CSS-first config), `postcss.config.js`, and `eslint.config.mjs`.
   - `src/app/page.tsx`, `src/app/layout.tsx`, and `src/app/globals.css` should exist.
   - Confirm `next.config.ts` is present (not `next.config.js`).
   - Confirm Tailwind v4 is installed (`package.json` shows `tailwindcss@^4`).

4. **Configure Tailwind v4 for our design tokens.**
   - The spec for typography and design tokens (`docs/specs/01-typography.md`) does not exist yet. Claude will write it next.
   - For now, leave `src/app/globals.css` as Next.js's default. Do not invent tokens.

5. **Install supporting libraries.**
   - `framer-motion` (for Llamita behavior states)
   - `zustand` (for client-side signal scoring state)
   - `@anthropic-ai/sdk` (for the chat backend)
   - Untitled UI v8 Pro dependencies (per their installation docs)
   - Note: the Untitled UI MCP API key needs to be configured in `.claude/settings.json` before the Untitled UI MCP can be used. Maicol will provide the key.

6. **Add `.replit` and `replit.nix` for deployment.**
   - `.replit` should specify the run command (`pnpm run dev` for development, the build/start sequence for production).
   - `replit.nix` should pin Node.js (LTS) and pnpm (or npm).

7. **Commit in logical chunks.**
   - First commit: Next.js scaffold.
   - Second commit: supporting library installs.
   - Third commit: Replit config.
   - Branch: `chore/repo-init`. Open a PR for Maicol to review.

8. **Do not start building UI yet.** Claude will write the typography spec, the IA spec, and ADR 0006 (color introduction policy) before any component work begins.

## Context the recipient needs

- The full strategic context lives in `docs/specs/00-prd.md`.
- Locked architectural decisions live in `docs/decisions/`.
- Our writing rules (no em dashes, no enthusiasm language, lead with proof) apply to every commit message, every code comment, every string literal.
- The repo follows the folder ownership table in `AGENTS.md`. Codex owns `src/`, `public/`, and root config files. Codex does not touch `docs/`, `content/`, or `assets/`.

## Open questions

- Should we use pnpm or npm? Maicol's existing dev environment may dictate. Default to pnpm; Codex flags if Replit's environment has friction.
- Untitled UI MCP installation steps for Codex's environment. Maicol will paste the API key when Codex's MCP is ready to accept it.

## Resolution

[To be filled in when Codex completes the bootstrap.]
