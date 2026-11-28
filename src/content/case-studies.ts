import { featuredCase, moreCases, type CaseSummary } from "./site";

export type Block =
    | { type: "p"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "callout"; title: string; items: string[] }
    | { type: "image"; src: string; alt: string }
    | { type: "item"; title: string; text: string[] };

export type CaseStudy = {
    slug: string;
    eyebrow: string;
    title: string;
    intro: string;
    summary: CaseSummary;
    role: { official: string; func: string; bullets: string[] };
    collaborators: string[];
    methods: string[];
    metrics: { value: string; label: string }[];
    sections: { label: string; title: string; blocks: Block[] }[];
    next: { slug: string; title: string };
};

const summaryFor = (slug: string) => [featuredCase, ...moreCases].find((c) => c.slug === slug)!;

export const caseStudies: CaseStudy[] = [
    {
        slug: "ai-enablement",
        eyebrow: "AI Enablement · Capital Group",
        title: "AI meeting prep that sales teams trust",
        intro: "At Capital Group, sales associates needed client-ready agendas fast, not another chat window. Out of four active AI initiatives, this was the first to earn funding past experimentation. Our team validated the workflow, privacy boundaries, and trust cues before engineering committed to a full build.",
        summary: summaryFor("ai-enablement"),
        role: {
            official: "Lead Venture Architect, AI and Emerging Technology",
            func: "Discovery and validation lead",
            bullets: [
                "Aligned Data Science, the initiative product manager, engineering, and sales partners around core prep bottlenecks through 1:1 user interviews.",
                "Shifted product direction from chat to an editable, agenda-first workflow across two hands-on prototype iterations.",
                "Defined scope, privacy boundaries, fast-view hierarchy, and trust cues in a Figma prototype alongside Data Science's real-data Streamlit prototype.",
                "Delivered the decision readout and Figma handoff backing the funding and engineering capacity request.",
            ],
        },
        collaborators: [
            "Data Science Lead and Data Scientists",
            "Initiative Product Manager",
            "Engineering Lead and Engineer",
            "Regional Sales Managers",
            "Sales Associates",
        ],
        methods: [
            "Workflow Mapping",
            "1:1 User Interviews",
            "Dual-Prototype Validation",
            "Figma Prototyping",
            "Scope Prioritization",
        ],
        metrics: [
            { value: "300+ users", label: "Active sales associates using it within a year" },
            { value: "3 to 4 weeks", label: "From idea to validated evidence that unlocked funding" },
            { value: "2 to 3 hrs → 1 hr", label: "Weekly prep cut to roughly 1 hour across 6 to 8 client meetings" },
        ],
        sections: [
            {
                label: "01 · The challenge",
                title: "Rich internal data that still slowed down prep",
                blocks: [
                    {
                        type: "p",
                        text: "Data Science already had access to four internal sources: client databases, prior meeting notes, sales activity, and internal research commentary. Because those inputs lived in separate systems, associates could not assemble meeting-specific context quickly.",
                    },
                    {
                        type: "p",
                        text: "Most associates batched preparation at the start of the week. When a client meeting appeared mid-week or plans shifted late, that routine broke down. Preparation quality varied across the team, and open follow-ups from prior conversations were easy to miss.",
                    },
                    { type: "image", src: "/images/uc1-image-1.png", alt: "AI meeting prep project visual" },
                ],
            },
            {
                label: "02 · The strategy",
                title: "Validating workflow, privacy, and trust cues before build",
                blocks: [
                    {
                        type: "p",
                        text: "The Data Science lead brought me in to align the cross-functional team around user problems before committing engineering capacity. I ran a structured innovation sprint, starting with 1:1 expert interviews with 2 regional managers and 8 sales associates alongside workflow mapping and sketching.",
                    },
                    {
                        type: "callout",
                        title: "What user research proved",
                        items: [
                            "Associates did not want to chat with AI. They wanted a client-ready agenda backed by specifics they could verify fast.",
                            "Trust breaks easily. One wrong detail or low-quality suggestion was enough to stall adoption.",
                            "Overload kills speed. In a 5-minute prep window, too much output was as unusable as too little.",
                        ],
                    },
                    { type: "h3", text: "Product decisions and scope cuts" },
                    {
                        type: "ul",
                        items: [
                            "Agenda-first over chat: I shifted the product to a client-ready agenda outline backed by verifiable details inside the platform.",
                            "Required human review: Every agenda stayed editable so associates remained in control and handled last-minute changes before send.",
                            "Cut social-profile enrichment: I dropped external social enrichment over privacy and PII risk. Instead, the tool surfaced personal context already captured in prior meeting notes.",
                            "Progressive disclosure: Output led with essential meeting details first, letting associates pull deeper specifics only when needed.",
                        ],
                    },
                    { type: "h3", text: "Fast view hierarchy for 5-minute prep" },
                    {
                        type: "ul",
                        items: [
                            "Agenda draft: a short meeting description plus 3 to 5 discussion topics.",
                            "Open follow-ups: unresolved items pulled directly from prior meeting notes.",
                            "Suggested talking points: recommendations informed by internal research and current market dynamics.",
                        ],
                    },
                    {
                        type: "p",
                        text: "Later in the sprint and across two prototype iterations, those same 8 sales associates shifted into hands-on testers. I built the Figma prototype to test core workflow functionality and new ideas. Data Science built the functional Streamlit prototype on real client data.",
                    },
                    {
                        type: "p",
                        text: "Over those 3 to 4 weeks, 4 sales testers used the Streamlit prototype consistently on live weekly meetings. Their feedback went directly to Data Science and through the app to fine-tune system prompts, model calls, and existing platform models.",
                    },
                    {
                        type: "p",
                        text: "Testing validated three trust cues. The interface separated prior-note follow-ups from AI-suggested talking points, displayed a visible generated-on timestamp, and required human review before send.",
                    },
                    {
                        type: "image",
                        src: "/images/uc1-image-2.png",
                        alt: "Data pipeline highlighting relevant internal client data surfaced for sales meeting prep",
                    },
                ],
            },
            {
                label: "03 · The outcome",
                title: "First of four AI initiatives funded past experimentation",
                blocks: [
                    {
                        type: "p",
                        text: "Three other AI initiatives ran in parallel under separate PMs and data science partners, operating in traditional build-first cycles without a structured feedback loop. Testing assumptions directly with sales users let us hand over a mapped workflow, ranked friction points, clear scope cuts, and a validated Figma prototype. The Data Science lead used that readout to secure funding and engineering capacity, letting delivery teams build without restarting discovery.",
                    },
                    {
                        type: "p",
                        text: "Downstream teams integrated the capability into the existing sales platform in stages. Adoption expanded from a 12-person pilot to roughly 90 users, then scaled to 300+ active sales associates within a year.",
                    },
                    {
                        type: "p",
                        text: "Post-integration associate feedback confirmed weekly prep dropped to roughly 1 hour or less, averaging 10 to 15 minutes per meeting. When schedules changed on short notice, the 3-part fast view supported 5-minute prep with human review before send.",
                    },
                ],
            },
        ],
        next: { slug: "strategy-horizon", title: "An enterprise point of view on generative AI" },
    },
    {
        slug: "strategy-horizon",
        eyebrow: "Tech Trends · Capital Group",
        title: "An enterprise point of view on generative AI",
        intro: "Enterprise AI research only matters when it guides real business and technology decisions. At Capital Group, I was the main AI contributor for the 2024 and 2025 Tech Trends reports across every business unit. We wrote for business leaders first, alongside their partner technology teams. That research also led to follow-up advisory work on AI orchestration and Copilot Studio platform investments.",
        summary: summaryFor("strategy-horizon"),
        role: {
            official: "Lead Venture Architect, AI and Emerging Technology",
            func: "AI strategy and architecture advisor",
            bullets: [
                "Authored 1 to 2 AI-focused trends per year and served as editorial lead across 4 to 6 trends written by volunteer analysts.",
                "Built a two-agent Copilot Studio prototype across 250+ documents with a 5-person team for the 2026 Tech Trends research cycle.",
                "Evaluated 40 AI orchestration candidates for Investment Technology Group, narrowing to 4 vendor reviews and co-authoring the recommendation with the senior product manager.",
                "Partnered with Architecture, Technology Services Operations (within Information Technology Group), the Copilot Studio team, and Information Security to define guardrails across three existing environments.",
                "Delivered a \"State of AI\" briefing and extended Q&A for roughly 30 associates, PMs, and business partners in a technology business unit.",
            ],
        },
        collaborators: [
            "Executive Sponsors",
            "Enterprise Architecture",
            "Investment Technology Group Product and Engineering",
            "Technology Services Operations",
            "Copilot Studio Platform Team",
            "Information Security",
            "Volunteer Analysts",
        ],
        methods: [
            "Emerging Tech Signal Synthesis",
            "Vendor Evaluation and Scorecarding",
            "AI Architecture Tradeoff Analysis",
            "Risk-Tiered Environment Governance",
            "AI-Assisted Research Workflows",
            "Editorial Quality Gates",
        ],
        metrics: [
            {
                value: "1,300+ visitors",
                label: "Unique readers within 3 months of each release, including C-suite",
            },
            {
                value: "250+ documents",
                label: "Synthesized for 2026 Tech Trends via a two-agent Copilot Studio workflow",
            },
            {
                value: "2 platform calls",
                label: "Shaped Investment Technology Group orchestration and a dedicated Copilot Studio engineering team",
            },
        ],
        sections: [
            {
                label: "01 · The challenge",
                title: "Preventing fragmented AI bets",
                blocks: [
                    {
                        type: "p",
                        text: "Generative AI stopped being a standalone topic. It began touching workflows across every business unit at once, from Investment Group and Client Group to internal technology teams.",
                    },
                    {
                        type: "p",
                        text: "Without an evidence-backed point of view, teams risked chasing new developments after they surfaced. Business leaders and their partner technology teams needed a practical filter on which capabilities were durable and what responsible adoption required.",
                    },
                    {
                        type: "p",
                        text: "The annual Tech Trends report existed to set that long-range view. The challenge was making its AI coverage concrete enough to inform business roadmaps and technology choices across every business unit.",
                    },
                    { type: "image", src: "/images/uc2-image-1.png", alt: "Tech Trends research framework" },
                ],
            },
            {
                label: "02 · The strategy",
                title: "Turning signals into an enterprise point of view",
                blocks: [
                    {
                        type: "p",
                        text: "We treated Tech Trends as a forward-looking synthesis of signals, not a yearly recap. I combined external research, industry reporting, and conversations with startups and operators to separate practical capabilities from noise.",
                    },
                    {
                        type: "p",
                        text: "The report spanned seven enterprise themes. I focused my writing on internal technology operations and applied AI in financial services. I framed how AI changes daily work and how leaders evaluate value.",
                    },
                    {
                        type: "p",
                        text: "To keep volunteer analysts consistent across the company, every trend followed a standard decision template. Each entry mapped relevant business units, maturity stage (Early, Emerging, or Mainstream), and recommended action (Act Now, Inform Strategy, or Watch Closely).",
                    },
                    { type: "h3", text: "Building a two-agent Copilot Studio workflow for 250+ documents" },
                    {
                        type: "p",
                        text: "In 2025, preparing for the 2026 Tech Trends cycle, I built a two-agent Copilot Studio prototype for two reasons. First, I wanted firsthand knowledge of Copilot Studio before advising Information Technology Group teams on scaling it across Capital Group. Second, our 5-person team needed a faster way to synthesize 250+ research documents for the upcoming report.",
                    },
                    {
                        type: "callout",
                        title: "How the two-agent workflow operated",
                        items: [
                            "Agent one extracted structured data points from each document and tagged sources across the seven enterprise themes.",
                            "Agent two analyzed patterns across the tagged library to surface cross-document signals and candidate trends.",
                            "System prompts also gave writing feedback on trend drafts, including my own, to keep tone and structure consistent.",
                            "Our team treated every output as directional and kept human editorial review as the final gate.",
                        ],
                    },
                    {
                        type: "p",
                        text: "Our team used the workflow during 2026 Tech Trends research. Although I departed before publication, the 2026 report went on to be published.",
                    },
                    { type: "image", src: "/images/uc2-image-2.png", alt: "Navigating internal operations with technology" },
                ],
            },
            {
                label: "03 · The outcome",
                title: "Executive reach that informed business roadmaps",
                blocks: [
                    {
                        type: "p",
                        text: "Capital Group's 2024 and 2025 Tech Trends reports each reached 1,300+ unique visitors within the first 3 months of release, tracked via Confluence analytics. Readership included the CEO, C-suite, business leaders, and partner technology teams across every business unit, including Investment Group, Client Group, and Information Technology Group.",
                    },
                    {
                        type: "p",
                        text: "The reports gave leaders across business units a shared, grounded view of generative AI. Business units used the reports to inform roadmaps while owning their own downstream execution.",
                    },
                    {
                        type: "p",
                        text: "Producing that research and testing Copilot Studio firsthand also led to follow-up advisory engagements across technology groups. Those engagements shaped concrete platform investments in AI orchestration and Copilot Studio, alongside an earlier business-unit briefing.",
                    },
                ],
            },
            {
                label: "04 · Related work",
                title: "Platform decisions and technology briefings",
                blocks: [
                    {
                        type: "item",
                        title: "Information Technology Group (2025): Copilot Studio environments and engineering investment",
                        text: [
                            "To prepare Copilot Studio for enterprise scale, I partnered with a solutions engineer to represent technical architecture requirements. We worked alongside Architecture leaders, Technology Services Operations (within Information Technology Group), the Copilot Studio team, and Information Security.",
                            "We mapped behaviors and risk guardrails across three existing environment stages. Stage one was an isolated exploration sandbox. Stage two remained isolated with read access to copied team-specific data. Stage three was pre-production with read access to real data. The model accounted for non-deterministic workflows and strict boundaries across non-production, masked, and production datasets.",
                            "Speaking across those teams surfaced a decisive insight. Navigating data access and environment stages was still too technical for business users to build safely on their own. Defining exact environment behaviors and required skill levels changed the rollout strategy. Technology Services Operations funded a dedicated Copilot Studio engineering team to deliver business use cases rather than opening direct self-service.",
                        ],
                    },
                    {
                        type: "item",
                        title: "Investment Technology Group (2024): LangChain to prototype, custom orchestration for production",
                        text: [
                            "As generative AI use cases grew in Investment Technology Group, I evaluated 40 vendor and platform candidates for orchestration and adjacent capabilities. We narrowed the field to 4 direct vendor conversations for deep evaluation. From there, I built a pros-and-cons comparison scorecard and co-authored the recommendation readout with the senior product manager.",
                            "We scored options across five criteria: developer experience, integration fit including RAG patterns, observability, agentic capabilities, and solution maturity.",
                            "This was a deliberate two-stage tradeoff. First, I recommended LangChain for fast prototyping because its ecosystem was mature and avoided new-vendor procurement delays inside enterprise guardrails. The team used it to test internal prototypes, including a secure chatbot and an investment research Q&A concept.",
                            "Next, I worked with lead engineers to surface production limits. LangChain's abstractions fit rapid prototyping, but they created constraints for complex production workflows. That analysis led the team to build a custom orchestration layer for production.",
                        ],
                    },
                    {
                        type: "item",
                        title: "Technology business unit (2023): \"State of AI\" briefing",
                        text: [
                            "In November 2023, I led a \"State of AI\" briefing for roughly 30 associates, PMs, and business partners inside a technology business unit. I presented for 15 to 20 minutes and spent the remaining 40+ minutes answering questions on near-term implications.",
                        ],
                    },
                ],
            },
        ],
        next: { slug: "innovation-sprints", title: "From AI curiosity to prioritized opportunities" },
    },
    {
        slug: "innovation-sprints",
        eyebrow: "AI Discovery · Capital Group",
        title: "From AI curiosity to prioritized opportunities",
        intro: "Enterprise AI efforts rarely stall from a lack of ideas. They stall from weak prioritization. At Capital Group in 2025, I helped Client Group and Client Experience Technology cut through competing AI proposals. The goal was to align teams and leadership around where the business was actually ready to invest.",
        summary: summaryFor("innovation-sprints"),
        role: {
            official: "Lead Venture Architect, AI and Emerging Technology",
            func: "AI discovery and prioritization lead",
            bullets: [
                "Defined discovery goals with enterprise change partners and built the end-to-end prioritization system for Client Group and Client Experience Technology.",
                "Designed the empathy mapping, value mapping, and three-part scoring structures used to evaluate competing AI proposals across business and technology teams.",
                "Drove cross-team prioritization, pushing teams to anchor in customer pain points and filter out low-readiness bets.",
                "Led the follow-up executive capability alignment with senior leaders, including the Director for Insights & Analytics, and delivered the decision handoff to delivery leaders.",
            ],
        },
        collaborators: [
            "Client Group Business Teams",
            "Client Experience Technology",
            "Insights & Analytics",
            "Product Managers",
            "Data Science Partners",
            "Architecture and Engineering",
            "Enterprise Change Partners",
        ],
        methods: [
            "AI Use Case Framing",
            "Constraint-Based Prioritization",
            "Empathy and Value Mapping",
            "Strategic Capability Mapping",
            "Cross-Functional Alignment",
        ],
        metrics: [
            { value: "40+ people", label: "Across Marketing, Sales, and Client Experience in AI discovery" },
            { value: "3 teams", label: "Narrowed roughly 5 ideas each to one prioritized use case" },
            { value: "7 leaders", label: "Aligned team long-term plans to Capital Group's corporate strategy" },
        ],
        sections: [
            {
                label: "01 · The challenge",
                title: "Too many AI ideas, no shared bar for readiness",
                blocks: [
                    {
                        type: "p",
                        text: "Interest in AI was growing fast across Marketing, Sales, and Client Experience, generating a backlog of competing proposals. Most discussions started with \"can we use AI here?\" rather than a clear customer pain point or measurable outcome.",
                    },
                    {
                        type: "p",
                        text: "Technical and organizational readiness also varied sharply across teams. Without a shared scoring bar, business and technology partners struggled to separate viable near-term bets from ideas lacking the data foundation to work.",
                    },
                    { type: "image", src: "/images/uc3-image-1.png", alt: "AI discovery workshop" },
                ],
            },
            {
                label: "02 · The strategy",
                title: "Anchoring AI prioritization in customer pain and data readiness",
                blocks: [
                    {
                        type: "p",
                        text: "Partnering with Client Group and Client Experience Technology, I ran a structured discovery effort across all three functions. Rather than debating AI tools in the abstract, each team used empathy mapping to ground its proposals in real customer pain points.",
                    },
                    {
                        type: "p",
                        text: "Teams mapped shared capabilities across the client lifecycle. Examples included prospecting and lead triage, content creation and review, meeting prep, client feedback triage, compliance risk detection, and contact center support. Each group then used structured value mapping to score candidate ideas against three criteria and cut low-lift concepts.",
                    },
                    {
                        type: "callout",
                        title: "Prioritization framework",
                        items: [
                            "Customer needs: grounding every proposal in a real pain point before debating AI tools.",
                            "Fit with AI capabilities: matching the problem to agentic or analytical patterns where relevant.",
                            "Implementation considerations: weighing data readiness, integration complexity, and change management, with data readiness consistently the primary constraint.",
                        ],
                    },
                    { type: "h3", text: "Prioritized use cases and next steps by team" },
                    {
                        type: "ul",
                        items: [
                            "Marketing: strengthen compliant content workflows with agentic support, constrained by dispersed disclosure guidance and data readiness. Next step: evaluate a specialized compliance AI vendor.",
                            "Sales: improve territory pulse and decision support using agentic and analytical patterns, constrained by data readiness and feedback loops. Next step: establish trust and reliability in the underlying data.",
                            "Client Experience: automate triage for incomplete or exception-flagged cases (\"not in good order\"), constrained by sensitive data handling and quality feedback loops. Next step: submit the use case to the AI Risk Oversight Board for approval.",
                        ],
                    },
                    {
                        type: "image",
                        src: "/images/uc3-image-2.png",
                        alt: "Framework mapping customer pain points to the right AI capability fit for each use case",
                    },
                ],
            },
            {
                label: "03 · The outcome",
                title: "One vetted bet per team and a vendor moved to implementation",
                blocks: [
                    {
                        type: "p",
                        text: "Marketing's prioritized path moved into delivery, with the specialized compliance AI vendor evaluated and implemented. Sales and Client Experience left with concrete ownership for their next steps in data trust and risk oversight. My mandate was to clear early ambiguity, so downstream build and governance remained with delivery leaders.",
                    },
                    {
                        type: "p",
                        text: "Applying one scoring bar across all three functions proved that data readiness, not model capability, was the deciding constraint. That evidence kept teams from funding AI features built on dispersed or unready data.",
                    },
                    {
                        type: "p",
                        text: "Resolving use-case selection also exposed a broader strategic question: how separate team roadmaps rolled up to company goals. That sparked the follow-up leadership alignment session below.",
                    },
                ],
            },
            {
                label: "04 · Related work",
                title: "Leadership strategy alignment and enterprise discovery",
                blocks: [
                    {
                        type: "item",
                        title: "Client Group and Client Experience Technology (2025): Senior leader strategic alignment",
                        text: [
                            "Following the team discovery effort, I led a separate alignment session for 7 senior leaders across Client Group and Client Experience Technology. Attendees included Marketing, Sales, and Client Experience leaders, Data Science leadership, and the Director for Insights & Analytics.",
                            "This session used a different method, shifting the discussion from individual use cases to shared cross-team capabilities. We took the separate long-term plans created by each team and mapped how each connected back to Capital Group's corporate strategic priorities.",
                            "Mapping those connections ensured Client Group initiatives supported company-wide goals rather than operating in isolation. It also exposed strategy-to-capability gaps for leaders to resolve before committing deeper investment.",
                        ],
                    },
                    {
                        type: "item",
                        title: "Enterprise-wide (2020 to 2025): 20+ innovation sprints",
                        text: [
                            "At Capital Group, I led 20+ innovation sprints across business and technology teams, including Client Group, Investment Group, and Information Technology Group. Each sprint engaged cross-functional teams early under high ambiguity to test assumptions before committing build capacity.",
                            "Work ranged from multi-team discovery efforts to smaller team sessions focused on defining opportunity areas, validating user needs, and prioritizing next-step experiments.",
                        ],
                    },
                ],
            },
        ],
        next: { slug: "ai-enablement", title: "AI meeting prep that sales teams trust" },
    },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
