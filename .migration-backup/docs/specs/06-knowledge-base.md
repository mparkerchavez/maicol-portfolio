# Spec 06: Knowledge Base Structure

**Purpose:** Define the body of text that Llamita "knows" and the rules for how the chat uses it.
**Owner:** Claude
**Status:** Active
**Last updated:** 2026-05-25
**Related ADRs:** 0007 (About via Llamita)

---

## Why this spec exists

Llamita is a chat that talks about Maicol. It needs a body of source material to draw from, or it will invent things. This spec defines what that body of material is, where each piece lives, how the chat retrieves it, and how citations work.

For a citizen developer, the short version: Llamita's brain is a folder of markdown files. When a visitor opens the chat, all of those files get loaded into the AI's context at the start of the conversation. The AI can then answer questions accurately because everything Maicol wants it to know is already in its working memory.

That is the entire architecture. No vector database, no retrieval system, no embeddings. Just markdown files, concatenated into a prompt.

---

## What the knowledge base is, in plain terms

Imagine giving an assistant a printed binder before they start a shift. The binder has Maicol's resume, his evidence bank, his identity guide, his case studies, his bio, and a sheet of rules for how to talk. The assistant reads the binder once, then can answer questions for the rest of the day.

The knowledge base is that binder, in markdown form.

Each file in the binder has a clear purpose. The chat backend reads all of them and puts them into the AI's "system prompt" (the instructions the AI sees before any visitor message arrives). Then the visitor's questions come in, and the AI answers them grounded in the binder's contents.

When the AI is asked a question that needs research-grade evidence (for example "what is Maicol's point of view on AI adoption stalls?"), the AI can call out to Curate Mind as a separate tool. Curate Mind returns a cited answer from its own database, and Llamita relays that answer with citations visible.

**What this means in practice:**
- To update what Llamita knows, you edit the markdown files in `content/knowledge-base/`.
- No retraining, no embedding regeneration, no special build step.
- Changes go live as soon as they are committed and deployed.

---

## Scope

### In scope

- Folder layout for `content/knowledge-base/`
- File-by-file purpose, owner, and update cadence
- How the chat loads and uses these files
- How citations work
- How Curate Mind invocation fits in
- How the about-via-Llamita pattern works
- Maintenance workflow

### Out of scope

- The chat technical implementation. That lives in `docs/specs/07-chat-architecture.md`.
- Llamita's voice and personality. That lives in `docs/specs/04-llamita-voice.md`.
- Intent inference and the NBA panel. That lives in `docs/specs/08-intent-inference.md`.

---

## The architecture, in one diagram

```
content/knowledge-base/
        |
        v
[backend reads all files at chat-session start]
        |
        v
[files concatenated into a system prompt]
        |
        v
[system prompt sent to Claude API along with the visitor's message]
        |
        v
[Claude answers, optionally calling Curate Mind as a tool]
        |
        v
[answer streams back to the visitor in Llamita's voice]
```

That is the whole loop. The complexity lives in the *content* of the markdown files, not in the technical plumbing.

---

## Why we are not using RAG (retrieval-augmented generation)

A common pattern for AI chat apps is RAG: chunk the documents, embed them as vectors, store them in a vector database, retrieve the most relevant chunks for each query, and pass those into the prompt. This is the right pattern when the corpus is large (thousands of documents, millions of words).

Our corpus is small. The total size of Maicol's evidence bank, identity guide, case studies, bio, voice spec, and refusal patterns is around 17,000 tokens. Claude's context window is 200,000 tokens. We can fit the entire knowledge base into every chat session with room left over.

The trade-offs:
- **Full-context is simpler.** No vector database, no chunking, no retrieval ranking. Just read files and concatenate.
- **Full-context is more accurate at this scale.** The AI sees everything, so it does not miss relevant context.
- **Full-context is more expensive per chat session** (more tokens in the prompt). At our expected traffic, this is a small cost.

If the corpus grows past 50,000 tokens, we will reconsider. Below that, full-context wins.

**What this means in practice:** Maicol can write naturally in the markdown files without worrying about retrieval boundaries. There is no "this section is too long for retrieval" concern.

---

## The folder layout

All knowledge base files live in `content/knowledge-base/`:

```
content/knowledge-base/
├── 00-system-prompt-header.md      # The instructions wrapper
├── 01-positioning.md                # Single message, through-line, target roles
├── 02-evidence-bank.md              # Proof inventory (the refreshed Evidence Bank)
├── 03-bio-short.md                  # A short bio paragraph
├── 04-bio-full-career.md            # Full LinkedIn-equivalent career history
├── 05-bio-reflections.md            # Reflective context for older roles
├── 06-case-study-capital-group.md   # Case study (mirrored from content/case-studies/)
├── 07-case-study-tech-trends.md     # Case study (mirrored from content/case-studies/)
├── 08-case-study-innovation-sprints.md  # Case study (mirrored from content/case-studies/)
├── 09-curate-mind-summary.md        # What Curate Mind is, how to use it as a tool
├── 10-earnestly-summary.md          # What Earnestly is, status
├── 11-about-framings.md             # Five calibrated about responses, per track
├── 12-refusal-patterns.md           # How Llamita declines off-topic in voice
└── 13-voice-spec.md                 # Llamita's voice rules (mirrored from spec 04)
```

The numbering reflects load order. Files load in numeric order so the system prompt builds up coherently.

---

## File-by-file structure

### `00-system-prompt-header.md`

**Purpose:** The opening of the system prompt. Sets the role, the rules, and the meta-instructions.

**Owner:** Claude (Maicol approves).

**Update cadence:** Rarely. Major voice shifts only.

**Contents:**
- Who Llamita is.
- The voice rules (no em dashes, no enthusiasm language, no weak openers).
- The grounding rule: "Every factual claim must be sourceable from the documents that follow. If you do not know an answer, say so. Do not invent."
- The tool rule: "When the visitor asks a question that needs research-grade evidence, you may invoke the Curate Mind tool. See 09-curate-mind-summary.md."
- The format rule: how Llamita formats responses (length, when to offer follow-ups, etc.).

### `01-positioning.md`

**Purpose:** Strategic positioning. The single message, the through-line, target roles.

**Owner:** Maicol (Claude assists).

**Update cadence:** When Maicol's positioning changes. Currently mirrored from `Maicol_Job_Search_Identity_Guide_5.16.26.md`.

**Contents:**
- The single message ("I work in the gap between AI capability and human adoption.")
- The through-line argument.
- Target roles and seniority band.
- Salary anchor.
- Location and work preferences.
- The three core proof points (Capital Group, Curate Mind, Innovation Sprints).
- The positioning guardrails (what not to do).

### `02-evidence-bank.md`

**Purpose:** The full proof inventory. Every claim Llamita can make traces to an entry here.

**Owner:** Maicol (Claude assists).

**Update cadence:** Whenever a new piece of work lands or a metric changes.

**Contents:** The refreshed Evidence Bank, structured for citation. Each entry has:
- A short claim (e.g., "Capital Group meeting prep tool scaled from 12-person pilot to 300+ users in under a year").
- The context.
- The method.
- The outcome and metric.
- The evidence level (1-4, per the Evidence Bank's own ladder).
- A unique ID Llamita can cite (e.g., `EB-A1` for "Evidence Bank, Category A, Item 1").

**Note:** A refresh task is open (Task #20) to align this with the May 2026 Identity Guide and latest resumes / cover letters.

### `03-bio-short.md`

**Purpose:** The two-to-three-sentence bio.

**Owner:** Maicol (Claude assists).

**Update cadence:** Rare. Update when title or message changes.

**Contents:** A single paragraph that could appear on the back of a book. The most compressed possible statement of who Maicol is and what he does.

### `04-bio-full-career.md`

**Purpose:** The LinkedIn-equivalent career history. Every role, every company, every approximate date.

**Owner:** Maicol.

**Update cadence:** Yearly or as roles change.

**Contents:** Each role gets:
- Title and company.
- Dates (year granularity is fine).
- One paragraph of what the role involved.
- One or two highlights worth knowing.

This file lets Llamita answer "what did Maicol do at [old company]?" with real substance instead of "I do not know."

### `05-bio-reflections.md`

**Purpose:** The "why" layer for older roles.

**Owner:** Maicol.

**Update cadence:** Rare. Written once, edited occasionally.

**Contents:** For each role in the career history that is worth reflecting on, three short prompts answered:
- What the opportunity meant.
- What was enjoyed most.
- The biggest learnings.

These are not for the resume. They are for the conversations where a visitor asks something like "why did Maicol leave [company]?" or "what did Maicol learn at [company]?" Llamita can respond with something real.

### `06-case-study-capital-group.md` (and 07, 08)

**Purpose:** The full text of each case study, the version with all the detail.

**Owner:** Claude (Maicol approves), mirrored from `content/case-studies/`.

**Update cadence:** When a case study is revised. The site shows the punchier published version. The knowledge base holds the longer detailed version Llamita uses to answer expansion questions.

**Contents:** Full v2 case study text plus any additional detail that did not make the punchier published version. Llamita uses these to expand on what the visitor sees on the page.

### `09-curate-mind-summary.md`

**Purpose:** Tell Llamita what Curate Mind is and when to invoke it as a tool.

**Owner:** Claude.

**Update cadence:** When Curate Mind's capabilities change.

**Contents:**
- One paragraph on what Curate Mind is.
- The current numbers (sources, data points, positions, themes).
- When to invoke Curate Mind: "When the visitor asks for Maicol's point of view on AI adoption, AI strategy, the future of design in AI, or any research-domain question, you may invoke the `cm_ask` tool to get a cited answer."
- When NOT to invoke Curate Mind: "Do not invoke for questions about Maicol's career, his hiring availability, or anything personal. Use the bio files for those."
- How to present the tool call to the visitor: "Mention that you are checking Maicol's research, then return the cited answer with the citation chips visible."

### `10-earnestly-summary.md`

**Purpose:** Brief Llamita on Earnestly so the chat can answer questions about it.

**Owner:** Maicol (Claude assists).

**Update cadence:** When Earnestly ships or progresses.

**Contents:**
- One paragraph on what Earnestly is.
- Current status (in development, coming soon, etc.).
- Who it is for.
- How to direct interested visitors (the signup capture on the Earnestly card).

### `11-about-framings.md`

**Purpose:** Five pre-written "about" responses, one per inferred track, for when a visitor asks "tell me about Maicol."

**Owner:** Claude (Maicol approves), aligned to ADR 0007.

**Update cadence:** When the track definitions or positioning shifts.

**Contents:** Five responses, one for each track (For Anyone, Recruiters, AI Strategist, Product Managers, Product Designers). Each response is two to four sentences. Llamita selects based on inferred track. If no track has fired yet, uses "For Anyone."

### `12-refusal-patterns.md`

**Purpose:** Tell Llamita how to gracefully decline off-topic questions.

**Owner:** Claude.

**Update cadence:** As we learn what visitors actually try to ask.

**Contents:**
- The rule: Llamita stays on topic about Maicol and his work.
- The voice: refusals are in character, not robotic. "That is well outside my paddock, but here is what Maicol would probably say if you asked him directly: [redirect]."
- A small set of common off-topic categories (general knowledge, recipes, code help, gossip about other people) with example responses.
- The escape hatch: any question about Maicol is in scope, even unflattering ones (Llamita is honest, not a publicist).

### `13-voice-spec.md`

**Purpose:** Mirror the voice rules from `docs/specs/04-llamita-voice.md` so the chat backend has them in one place.

**Owner:** Claude.

**Update cadence:** When Spec 04 changes.

**Contents:** The full voice spec, mirrored.

---

## How the chat uses these files

When a visitor opens the chat, the backend does this:

1. Reads all files in `content/knowledge-base/` in numeric order.
2. Concatenates them with separator markers between sections.
3. Prepends a small wrapper that names the role ("You are Llamita.") and references the documents.
4. Appends the page context (what page the visitor is on, what section they are reading).
5. Sends the whole thing to the Claude API as the system prompt.
6. Streams responses back to the visitor.

Each new visitor message goes into the same conversation. The system prompt stays loaded for the duration of the session.

**What this means in practice:**
- Editing any markdown file changes what Llamita knows on the next chat session.
- There is no caching of "knowledge" that needs to be invalidated. The system prompt is rebuilt every chat.
- A typo, a fact change, or a new piece of evidence is live as soon as the file is committed.

---

## How citations work

Llamita has two layers of citation behavior.

### Layer 1: Evidence Bank citations

When Llamita makes a claim about Maicol's work, it should be sourceable from the Evidence Bank. Llamita does not need to surface citation IDs to the visitor (this would feel academic). But internally, every claim must trace to an Evidence Bank entry. If the claim cannot be traced, Llamita says "I do not have specifics on that, but Maicol could tell you directly" and offers the email link.

The system prompt header (`00-system-prompt-header.md`) enforces this rule: "Do not invent claims. If a claim cannot be sourced from the evidence bank or the case studies, say so."

### Layer 2: Curate Mind citations

When Llamita invokes Curate Mind for a research question, the tool returns an answer with explicit citation labels (e.g., `[P12]`, `[O7]`, `[E45]`). Llamita relays the answer with the citation labels rendered as small visual chips next to the relevant claims. Clicking a chip can open the source in a panel (implementation TBD in Spec 07).

This is the visible, designed citation experience. It demonstrates the Curate Mind trust philosophy and reinforces that Maicol's work is grounded in real research.

---

## How Curate Mind invocation works (from a content perspective)

The chat decides when to invoke Curate Mind based on the rules in `09-curate-mind-summary.md`. From the visitor's perspective:

1. Visitor asks a research-grade question. ("What is Maicol's point of view on AI adoption?")
2. Llamita acknowledges in voice: "Let me check what Maicol's research says."
3. A small inline indicator appears in the chat ("Querying Curate Mind...").
4. Curate Mind returns a structured answer with citations.
5. Llamita reformats the answer in its own voice, preserving the citation chips.
6. The visitor sees a sourced, cited answer with the tool call visible.

This is a deliberate UX moment. The visitor watches the AI use a tool, which demonstrates agentic product design directly.

Technical details (the API calls, the chip rendering, the error handling) live in Spec 07.

---

## How the about-via-Llamita pattern works

Per ADR 0007, "tell me about Maicol" is answered by Llamita on demand, calibrated to the inferred track.

Behavior:

1. Visitor asks any of: "Tell me about Maicol", "Who is Maicol?", "What does Maicol do?", or similar phrasings.
2. Llamita checks the current inferred track.
3. If a track has fired, Llamita uses the matching response from `11-about-framings.md`.
4. If no track has fired, Llamita uses the "For Anyone" framing.
5. The response is two to four sentences, in voice, with an optional follow-up offer ("Want me to expand on any of this?").
6. If the visitor asks again later, after more signal has accumulated, Llamita can use a different framing without acknowledging the repeat. ("Now that we have talked a bit, here is the angle most people in your shoes care about.")

The home page also surfaces an explicit affordance pointing visitors at this. Working version of the affordance copy: "To learn about Maicol, ask Llamita →". Final copy lives in Spec 03 (Information Architecture) when written.

---

## Maintenance workflow

To keep the knowledge base fresh:

1. **When a new piece of work lands:** add an Evidence Bank entry to `02-evidence-bank.md` with the four levels (responsibility, method, outcome, validation) per the Evidence Bank's existing ladder.
2. **When a role changes:** update `04-bio-full-career.md` and `01-positioning.md`.
3. **When positioning shifts:** update `01-positioning.md` and `11-about-framings.md` together. They should never drift.
4. **When Curate Mind capabilities change:** update `09-curate-mind-summary.md`.
5. **When a case study is revised:** the source of truth is `content/case-studies/[slug].md`. The mirror in `content/knowledge-base/` should be synced. (Spec 07 will define whether this is a manual copy or a build-step sync.)
6. **When a refusal pattern emerges:** add to `12-refusal-patterns.md`. (For example, if visitors keep asking about Maicol's hourly rate, write a graceful in-voice deflection.)

---

## Versioning and drift

The knowledge base is a snapshot of Maicol's positioning at a point in time. Drift is the main risk: the Evidence Bank gets out of sync with the resume, the bio gets out of sync with the LinkedIn, etc.

Two practices to keep drift in check:

1. **Whenever Maicol updates his resume or cover letter, the relevant knowledge base files are updated in the same session.** This is a habit, not a system.
2. **A quarterly review:** every three months, read every file end-to-end and flag what has aged. Captured as a recurring task once the site is live.

---

## Open questions

- **Whether to symlink or copy** the source documents (`Maicol_Job_Search_Identity_Guide_5.16.26.md`, the case study v2 files) into `content/knowledge-base/`. Recommendation: copy, with a manual sync discipline. Symlinks complicate Git and Replit deployment.
- **The Curate Mind tool authentication and configuration.** How does the chat backend authenticate to Curate Mind? Pending; lives in Spec 07.
- **How "page context" gets passed to the system prompt.** A static appended block? A separate role message? Pending; lives in Spec 07.

---

## Change log

- 2026-05-25: Initial draft.
