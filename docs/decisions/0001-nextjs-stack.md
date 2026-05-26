# ADR 0001: Next.js as the application framework

**Status:** Accepted
**Date:** 2026-05-25
**Decision-maker:** Maicol
**Author:** Claude

---

## Context

The current portfolio is built with vanilla HTML, CSS, and Tailwind via CDN. The v2 needs interactive surfaces (Llamita character, content-aware chat, intent inference, Curate Mind visualization, signup capture), a backend for the chat API, and stability for a build that will iterate over months.

The Untitled UI v8 Pro component library is the chosen UI foundation. It is React-first.

Replit is the deployment target.

We needed to choose a React framework or skip a framework entirely.

## Options considered

### Option A: Next.js 15 (App Router)
- Pros: SSR/SSG for SEO and fast initial loads. Native API routes for the chat backend without a separate server. First-class streaming for LLM responses. Strong Vercel and Replit support. App Router patterns map cleanly to our content/chat/page-aware architecture. Excellent TypeScript and Tailwind v4 integration.
- Cons: Server Components add a small mental tax (the "use client" boundary). More opinionated than alternatives.

### Option B: Vite + React + React Router
- Pros: Faster local dev startup. Simpler conceptual model. Lower framework lock-in.
- Cons: Client-side only by default. We would need to stand up a separate backend (Express, Hono, or similar on Replit) for the chat API. SEO and initial-load characteristics are worse. Streaming AI responses require custom plumbing.

### Option C: Plain React + custom toolchain
- Pros: Maximum control.
- Cons: Reinventing things Next.js already solves. Not worth the time on a project this size.

## Decision

**Next.js 15 with the App Router.**

The chat backend, SEO posture, and streaming response handling make Next.js the right tool. The added Server Component complexity is a small cost compared to the alternatives.

## Consequences

### Positive
- Chat API lives in `src/app/api/chat/` as a standard Next.js route, no separate backend to deploy.
- Server Components for static page shells reduce JS shipped to the client.
- Streaming LLM responses are first-class.
- SEO is reasonable by default.

### Negative
- All interactive components (Llamita, chips, chat, through-line toggle) need explicit `"use client"` directives. We will document this convention in `docs/specs/03-information-architecture.md`.
- Tailwind v4 is required (Untitled UI v8 dependency), which has a newer CSS-first config model.

### Neutral
- Replit supports Next.js deployment. No environmental friction.
- TypeScript is the default, which aligns with Untitled UI's TS-first posture.

## Notes

Stack summary:
- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind v4
- Untitled UI v8 Pro (via MCP)
- Zustand for client-side signal scoring state
- Framer Motion for Llamita behavior states
- Anthropic SDK for the chat
- Replit for deployment
