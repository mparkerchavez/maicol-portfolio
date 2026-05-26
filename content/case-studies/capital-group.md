# From Prototype to Platform: AI Meeting Prep That Sales Teams Trust

I moved a GenAI use case from idea to validated evidence in 3 to 4 weeks, securing additional funding and engineering capacity to integrate an agenda-first meeting prep workflow into an existing sales platform. The capability later expanded from a 12-person pilot to roughly 90 users, and ultimately scaled to 300+ active sales associates within a year.

## 01 /// THE CHALLENGE

### The weekly prep bottleneck and the last-minute pivot problem.

Sales associates typically prepared at the start of the week, spending 2 to 3 hours to get ready for 6 to 8 client meetings.

They also faced a second constraint: meetings could appear mid-week, or plans could change last minute, leaving minimal time to prepare.

A data science team supporting the client group had access to rich internal context across client databases, prior meeting notes, sales activity, and internal research commentary.

That context lived in different places and did not reliably support fast, meeting-specific preparation. The result was inconsistent preparation, uneven meeting quality, and missed opportunities to follow up on the right topics.

## 02 /// THE STRATEGY

### Validating the workflow, not just the tech.

Instead of starting with features, we ran an innovation sprint to validate where AI could remove the most friction in meeting prep.

I led sessions with sales associates, partners, and stakeholders to map their prep workflow, identify the highest-impact breakdowns, and generate multiple solution directions.

To ground decisions in real behavior, we had associates sketch what their ideal prep experience would look like.

Those sketches, combined with workflow mapping and targeted interviews with associates and managers, helped define must-haves, nice-to-haves, and what not to build.

Sales associates did not want to chat. They wanted an agenda-first output they could send to clients, backed by specifics when they needed to go deeper.

Trust is fragile. One incorrect or low-quality output can stall adoption.

The experience needed to avoid information overload, especially for the 5-minute prep scenario.

We shifted from a prescriptive meeting plan to an agenda-first workflow. The system provided a high-level agenda outline, supported it with relevant details inside the platform, and required editability to keep a human in the loop.

We did not build social profile enrichment because of privacy and PII concerns. Instead, we surfaced personal context already captured in prior meeting notes.

We also avoided throwing too much information at associates at once, using progressive disclosure for deeper context.

To validate direction and trust cues, we tested both a high-fidelity Figma prototype and a functional Streamlit prototype with real users.

We structured the output into separate sections, added a visible generated-on timestamp, and ensured associates always reviewed and edited the agenda before sending.

## 03 /// THE OUTCOME

### From validated evidence to funded integration.

By validating the workflow, output structure, and trust cues before full build, we accelerated the path from idea to evidence.

In 3 to 4 weeks, we produced validated learnings that stakeholders used to commit additional funding and engineering capacity.

The sprint concluded with a stakeholder readout and handoff package, including a workflow map, friction points, and a Figma prototype.

That foundation enabled downstream teams to integrate the capability into the existing platform and expand adoption from a 12-person pilot to roughly 90 users, later scaling to 300+ active sales associates within a year.

The result was reduced assumption-heavy development, faster decision-making, and a repeatable pattern for validating GenAI use cases inside an existing workflow.
