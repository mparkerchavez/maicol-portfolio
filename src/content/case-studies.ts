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
        eyebrow: "AI Enablement · Meeting Prep Agent",
        title: "From prototype to platform: AI meeting prep that sales teams trust",
        intro: "I moved a GenAI use case from idea to validated evidence in 3–4 weeks, securing additional funding and engineering capacity to integrate an agenda-first meeting prep workflow into an existing sales platform. The capability later expanded from a 12-person pilot to ~90 users, and ultimately scaled to 300+ active sales associates within a year.",
        summary: summaryFor("ai-enablement"),
        role: {
            official: "Venture Architect Lead, AI and Emerging Technology",
            func: "Product discovery and validation lead",
            bullets: [
                "Led experience and workflow design for an AI-enabled meeting prep capability, from ambiguity to validated workflow requirements.",
                "Ran an innovation sprint to map the end-to-end prep journey, identify top friction points, and translate insights into build priorities.",
                "Validated early concepts through 1:1 interviews with sales associates and managers, clarifying must-haves vs nice-to-haves to prevent scope creep.",
                "Produced a stakeholder readout deck that aligned user needs, feasibility constraints, and recommendations (including what not to build).",
                "Delivered a Figma prototype designers could continue iterating on to validate alternative ways of presenting data.",
            ],
        },
        collaborators: ["Data Science Partners", "Initiative Product Manager", "Engineering Partners", "Sales Stakeholders"],
        methods: ["Workflow Mapping", "User Interviews", "Validation Sprint", "Rapid Prototyping", "Cross-Functional Alignment"],
        metrics: [
            { value: "300+", label: "active sales associates within ~1 year" },
            { value: "3–4 weeks", label: "from idea to validated evidence that unlocked funding and engineering capacity" },
            { value: "2–3 hrs → 10–15 min", label: "weekly prep for ~6–8 client meetings, down to ~10–15 minutes per client" },
        ],
        sections: [
            {
                label: "01 · The challenge",
                title: "The weekly prep bottleneck and the last-minute pivot",
                blocks: [
                    {
                        type: "p",
                        text: "Sales associates typically prepared at the start of the week, spending ~2–3 hours to get ready for ~6–8 client meetings. They also faced a second constraint: meetings could appear mid-week, or plans could change last minute, leaving minimal time to prepare.",
                    },
                    {
                        type: "p",
                        text: "A data science team supporting the client group had access to rich internal context across client databases, prior meeting notes, sales activity, and internal research commentary. But that context lived in different places and did not reliably support fast, meeting-specific preparation. The result was inconsistent preparation, uneven meeting quality, and missed opportunities to follow up on the right topics.",
                    },
                    { type: "image", src: "/images/uc1-image-1.png", alt: "AI meeting prep project visual" },
                ],
            },
            {
                label: "02 · The strategy",
                title: "Validating the workflow, not just the tech",
                blocks: [
                    {
                        type: "p",
                        text: "Instead of starting with features, we ran an innovation sprint to validate where AI could remove the most friction in meeting prep. I led sessions with sales associates, partners, and stakeholders to map their prep workflow, identify the highest-impact breakdowns, and generate multiple solution directions.",
                    },
                    {
                        type: "p",
                        text: "To ground decisions in real behavior, we had associates sketch what their ideal prep experience would look like. Those sketches, combined with workflow mapping and targeted 1:1 conversations with associates and managers, helped define must-haves, nice-to-haves, and what not to build.",
                    },
                    {
                        type: "callout",
                        title: "Key learnings that shaped the experience",
                        items: [
                            "Sales associates did not want to “chat.” They wanted an agenda-first output they could send to clients, backed by specifics when they needed to go deeper.",
                            "Trust is fragile. One incorrect or low-quality output can stall adoption.",
                            "The experience needed to avoid information overload, especially for the 5-minute prep scenario.",
                        ],
                    },
                    { type: "h3", text: "Key product decisions" },
                    {
                        type: "ul",
                        items: [
                            "Shifted from a prescriptive meeting plan to an agenda-first workflow: a high-level agenda outline that was usually ready to send, supported by relevant details inside the platform so associates could quickly verify what to discuss.",
                            "Required editability to keep a human in the loop and to handle last-minute changes.",
                            "Did not build a social profile enrichment feature due to privacy and PII concerns. Instead, surfaced personal context already captured in prior meeting notes.",
                            "Used progressive disclosure to avoid throwing too much information at associates at once.",
                        ],
                    },
                    { type: "h3", text: "Fast view hierarchy, designed for minimal prep time" },
                    {
                        type: "ul",
                        items: [
                            "Agenda draft (short description plus 3–5 meeting topics)",
                            "Open follow-ups from prior notes",
                            "Suggested talking points informed by internal research and current market dynamics",
                        ],
                    },
                    {
                        type: "p",
                        text: "To validate direction and trust cues, we tested both a high-fidelity Figma prototype and a functional Streamlit prototype with real users. We structured the output into separate sections (follow-ups vs suggested talking points), added a visible generated-on timestamp, and ensured associates always reviewed and edited the agenda before sending.",
                    },
                    { type: "image", src: "/images/uc1-image-2.png", alt: "Meeting prep workflow design" },
                ],
            },
            {
                label: "03 · The outcome",
                title: "From validated evidence to funded integration",
                blocks: [
                    {
                        type: "p",
                        text: "By validating the workflow, output structure, and trust cues before full build, we accelerated the path from idea to evidence. In 3–4 weeks, we produced validated learnings that stakeholders used to commit additional funding and engineering capacity, and we translated those learnings into clear build priorities.",
                    },
                    {
                        type: "p",
                        text: "The sprint concluded with a stakeholder readout and handoff package (workflow map and friction points, plus a Figma prototype) so product and engineering teams could continue validation and implementation without restarting discovery.",
                    },
                    {
                        type: "p",
                        text: "That foundation enabled downstream teams to integrate the capability into the existing platform and expand adoption from ~12 pilot users to ~90 users, later scaling to 300+ active sales associates within a year. The result was reduced assumption-heavy development, faster decision-making, and a repeatable pattern for validating GenAI use cases inside an existing workflow.",
                    },
                ],
            },
        ],
        next: { slug: "strategy-horizon", title: "An enterprise point of view on generative AI" },
    },
    {
        slug: "strategy-horizon",
        eyebrow: "Tech Trends · Emerging AI Capabilities",
        title: "Enterprise tech trends, AI narrative, and adoption enablement",
        intro: "I contributed AI-focused trend research and editorial synthesis for an annual Tech Trends publication distributed via internal platforms and amplified through a monthly internal intranet campaign. The work supported senior business and technology leaders and enterprise architects with a practical point of view on emerging capabilities, what was hype vs durable, and how to think about readiness and responsible adoption.",
        summary: summaryFor("strategy-horizon"),
        role: {
            official: "Venture Architect Lead, AI and Emerging Technology",
            func: "AI research and editorial lead",
            bullets: [
                "Authored 1–2 trends per year with Workplace Technology and Amplified Intelligence, applying an enterprise AI lens.",
                "Served as editorial lead across 4–6 trends per year (review, synthesis, quality) written by volunteer analysts across the company.",
                "Designed AI-assisted research workflows (Copilot agents) to tag documents, surface cross-document signals, and provide writing feedback, with human validation.",
                "Activated the narrative through downstream work, including an AI vendor evaluation framework and Copilot Studio scale readiness alignment.",
            ],
        },
        collaborators: ["Executive Sponsors", "Enterprise Architecture", "Volunteer Analysts", "Platform Owners"],
        methods: ["Signal Synthesis", "Enterprise Framing", "Executive Storytelling", "Editorial Review", "AI-assisted Knowledge Workflow"],
        metrics: [
            { value: "2024 & 2025", label: "contributed to Tech Trends reports with 1,300+ unique visitors" },
            { value: "1–2 trends", label: "authored per year" },
            { value: "4–6 trends", label: "editorial lead per year (review, synthesis, quality)" },
        ],
        sections: [
            {
                label: "01 · The challenge",
                title: "Staying ahead of AI's acceleration",
                blocks: [
                    {
                        type: "p",
                        text: "As AI capabilities advanced rapidly, it became harder for organizations to maintain a shared, realistic understanding of what was emerging, what was hype, and what would matter over the next 3–5 years. Without a clear narrative grounded in signals and evidence, teams risked becoming reactive, chasing new developments after they surfaced instead of building informed readiness over time.",
                    },
                    {
                        type: "p",
                        text: "The Tech Trends report was designed to help senior business and technology leaders and enterprise architects track where AI and other emerging technologies were heading, so the organization could make better long-range decisions about readiness, responsible adoption, and where to focus attention. Over time, AI touched almost every trend area, making it important to frame AI's evolution in a way that was actionable across business units, not just as a standalone topic.",
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
                        text: "We treated Tech Trends as an annual synthesis of signals, not a retrospective summary. I authored AI-focused sections by combining external research and industry reporting with perspectives from external ecosystem partners (including startups and industry operators), then translating what we observed into an enterprise lens: what was emerging, what was becoming practical, and what teams should pay attention to next.",
                    },
                    {
                        type: "p",
                        text: "The annual report was organized around seven enterprise themes, including Amplified Intelligence, Client Experience, FinTech, and Workplace Technology. To make the publication actionable and consistent across contributors, each trend followed a standardized decision template with sections such as a Trend Brief, Why it Matters, and Key Signals. An Action Meter and Strategy Alignment were team-defined, and I contributed input during drafting and applied them within my trends and reviews.",
                    },
                    {
                        type: "callout",
                        title: "AI-assisted research and editorial workflow (human validated)",
                        items: [
                            "Auto-tagged research documents to the seven themes.",
                            "Surfaced cross-document signals and candidate trends across the tagged library.",
                            "Provided writing feedback on trend drafts (including my own) to improve clarity and consistency.",
                        ],
                    },
                    {
                        type: "p",
                        text: "We treated automation as a directional accelerator, not a source of truth. Our team validated outputs for accuracy and used them to sift through 250+ research documents more efficiently while keeping human editorial judgment as the final gate.",
                    },
                ],
            },
            {
                label: "03 · Product decisions",
                title: "Where the research turned into decisions",
                blocks: [
                    {
                        type: "item",
                        title: "AI vendor evaluation: LangChain for prototyping, custom orchestration for production",
                        text: [
                            "As AI use cases accelerated in the investment group, I evaluated vendor and platform options for orchestration and adjacent capabilities. I created an evaluation scorecard and comparison matrix, co-authored the recommendation readout with the senior product manager, and presented findings to stakeholders. Criteria included developer experience, integration fit (including retrieval-augmented generation patterns), observability, agentic capabilities, and solution maturity.",
                            "I recommended LangChain as an initial foundation for rapid prototyping because it was mature for the moment, had broad ecosystem support, and reduced new-vendor procurement friction within enterprise guardrails. The team used it for internal prototypes, including a secure internal chatbot-style experience and an investment research Q&A concept.",
                            "In discussions with lead engineers, we surfaced a key tradeoff: LangChain abstractions were acceptable for rapid prototyping but raised concerns for complex, production-grade workflows. The team later chose to build a custom orchestration layer for production.",
                        ],
                    },
                    {
                        type: "item",
                        title: "Copilot Studio environment segmentation by risk level",
                        text: [
                            "Partnered with a solutions engineer to represent architecture considerations and aligned platform owners and information security on Copilot Studio environment segmentation by risk level. The approach covered development through production stages, accounting for the iterative, non-deterministic nature of generative AI workflows and the need to move back and forth during development. Data access constraints were a key factor, including production vs non-production and masked data considerations.",
                        ],
                    },
                    {
                        type: "item",
                        title: "Copilot Studio prototype for Tech Trends research",
                        text: [
                            "Built a Copilot Studio prototype to extract structured data points from research documents, enabling a second agent to analyze abstractions across sources and surface candidate trends. Our internal Tech Trends team used it to support the research process, and it helped us evaluate Copilot Studio capabilities and limitations firsthand.",
                        ],
                    },
                    { type: "image", src: "/images/uc2-image-2.png", alt: "Strategic roadmap" },
                ],
            },
            {
                label: "04 · The outcome",
                title: "Building shared context for smarter decisions",
                blocks: [
                    {
                        type: "p",
                        text: "The AI narrative work helped leaders and teams interpret rapid shifts in generative AI and emerging capabilities through an enterprise lens, so the organization could be less reactive and more deliberate about readiness and responsible use. Business units used the reports to inform their roadmaps and strategic plans.",
                    },
                    {
                        type: "p",
                        text: "I delivered a “State of AI” briefing within a business unit, translating Tech Trends research into implications, sharing follow-up resources, and leading stakeholder Q&A tailored to their near-term needs.",
                    },
                    {
                        type: "p",
                        text: "Beyond formal communications, I used the research and narrative assets in project work, translating external signals into practical implications that informed what to explore next and how to frame tradeoffs under enterprise constraints.",
                    },
                ],
            },
        ],
        next: { slug: "innovation-sprints", title: "From AI curiosity to prioritized opportunities" },
    },
    {
        slug: "innovation-sprints",
        eyebrow: "Innovation Sprints · AI Discovery",
        title: "Scaling AI discovery through innovation sprints",
        intro: "I led 20+ innovation sprints (including the company's first remote design sprints during the COVID-19 pandemic) and designed AI-focused workshops for client experience leaders and teams. The work helped cross-functional partners move from broad AI curiosity to prioritized opportunities rooted in user needs, aligned to business outcomes, and shaped by enterprise implementation constraints, especially data readiness, integration complexity, and change management.",
        summary: summaryFor("innovation-sprints"),
        role: {
            official: "Venture Architect Lead, AI and Emerging Technology",
            func: "AI discovery and prioritization lead",
            bullets: [
                "Partnered with enterprise change partners to define the workshop outcomes, then designed the end-to-end workshop system from scratch.",
                "Built the working assets, including the Empathy Map and Value Map structures, the prioritization framework (Customer Needs, AI Capabilities, Implementation Considerations), and the readout format.",
                "Ran cross-pillar prioritization across Sales, Marketing, and Client Experience, helping teams filter out low-lift AI ideas and prioritize viable opportunities based on constraints.",
                "Co-created an executive-facing capability lineage and value chain view connecting business priorities to pillar priorities and cross-pillar capabilities AI could enable.",
                "Produced decision and alignment artifacts, while execution ownership remained with product, engineering, architecture, and data science leaders.",
            ],
        },
        collaborators: ["Client Group Teams (Sales, Marketing, Client Experience)", "Enterprise Change Partners", "Product Managers", "Data Science Partners", "Business Stakeholders"],
        methods: ["Workshop Design", "Value Mapping", "AI Use Case Framing", "Capability and Value Chain Mapping", "Cross-functional Alignment"],
        metrics: [
            { value: "20+ sprints", label: "led across client groups, investment groups, and technology teams" },
            { value: "40+ participants", label: "in a cross-pillar AI discovery workshop across Sales, Marketing, and Client Experience" },
            { value: "First remote sprints", label: "at the company, during COVID-19, establishing virtual practices that became repeatable" },
        ],
        sections: [
            {
                label: "01 · The challenge",
                title: "From AI curiosity to business-ready use cases",
                blocks: [
                    {
                        type: "p",
                        text: "As interest in AI accelerated, teams across the client experience space surfaced many ideas, but the hardest part was turning that enthusiasm into business-ready opportunities. Work was often framed as “can we use AI here?” rather than grounded in user needs, measurable outcomes, and clear constraints. Without a shared structure for prioritization and alignment, it was difficult for leaders and teams to decide what to pursue, what to defer, and how to connect initiatives to business outcomes.",
                    },
                    { type: "image", src: "/images/uc3-image-1.png", alt: "AI discovery workshop" },
                ],
            },
            {
                label: "02 · The strategy",
                title: "A repeatable sprint framework for AI discovery and alignment",
                blocks: [
                    {
                        type: "p",
                        text: "I used innovation sprints as a repeatable way to move teams from AI ideas to decisions. Across 20+ sprints, my approach paired human-centered problem framing with an enterprise lens, helping teams define where AI could add value and what would matter for adoption.",
                    },
                    { type: "h3", text: "Two AI-focused workshops" },
                    {
                        type: "ul",
                        items: [
                            "Cross-functional AI discovery workshop (Sales, Marketing, Client Experience): brought together 40+ participants to build empathy for priority users, identify high-priority opportunities, and filter out ideas that would not get meaningful lift from AI.",
                            "Senior leader alignment workshop: shifted the conversation from use cases to capabilities, enabling leaders to align on cross-pillar business capabilities AI could enable and to clarify how priorities connected back to business priorities.",
                        ],
                    },
                    {
                        type: "callout",
                        title: "Prioritization framework",
                        items: [
                            "Customer Needs.",
                            "Fit with AI Capabilities (including agentic and analytical patterns where relevant).",
                            "Implementation Considerations, with data readiness consistently the primary constraint, alongside integration complexity and change management.",
                        ],
                    },
                    { type: "h3", text: "Outputs" },
                    {
                        type: "ul",
                        items: [
                            "Empathy Maps per pillar capturing priority users, needs, and context.",
                            "Pillar-specific Value Maps organized around Customer Needs, AI Capabilities, and Implementation Considerations.",
                            "Prioritized lists of opportunities per pillar, grounded in the empathy and value mapping outputs.",
                            "A cross-pillar readout synthesizing patterns, major learnings, and shared constraints.",
                            "An executive capability lineage and value chain view, mapping business priorities to pillar priorities and cross-pillar capabilities AI could enable.",
                        ],
                    },
                    { type: "h3", text: "Examples of prioritized opportunities" },
                    {
                        type: "ul",
                        items: [
                            "Marketing: strengthen compliant content workflows using agentic support, constrained by dispersed and context-dependent disclosure guidance and data readiness.",
                            "Sales: improve territory pulse and decision support using agentic and analytical capabilities, constrained by data readiness and the need for reliable feedback loops to support trust.",
                            "Client Experience: automate triage for cases “not in good order” by identifying gaps and exceptions, constrained by sensitive data handling and feedback loops to improve quality over time.",
                        ],
                    },
                    { type: "image", src: "/images/uc3-image-2.png", alt: "Sprint methodology" },
                ],
            },
            {
                label: "03 · The outcome",
                title: "Faster alignment, faster decisions",
                blocks: [
                    {
                        type: "p",
                        text: "The sprint approach helped teams and leaders move faster from open questions to clearer decisions. Instead of debating AI in the abstract, the workshops created shared context around user needs, priority opportunities, and feasibility constraints, reducing siloed prioritization and improving decision quality.",
                    },
                    {
                        type: "p",
                        text: "Across pillars, teams used the empathy and value mapping outputs to validate and refine existing initiatives, compare workshop priorities to current roadmaps, and reconsider sequencing where constraints (especially data) made certain ideas less viable in the near term.",
                    },
                    {
                        type: "p",
                        text: "At the leadership level, the capability lineage and value chain mapping made alignment and gaps visible, including where strategies or capability linkages to business priorities needed refinement before deeper investment. Follow-up execution was owned by delivery leaders, supported by the alignment artifacts produced through the workshops.",
                    },
                ],
            },
            {
                label: "04 · Related work",
                title: "A broader sprint practice",
                blocks: [
                    {
                        type: "item",
                        title: "Enterprise-wide innovation sprint program",
                        text: [
                            "Led roughly two dozen innovation sprints across investment operations, client groups, and technology teams. Each sprint moved cross-functional groups from ambiguous challenges to validated learnings and prioritized next steps.",
                        ],
                    },
                    {
                        type: "item",
                        title: "Design thinking workshops for business outcomes",
                        text: [
                            "Created custom design thinking workshops tailored to specific business challenges, from 40+ person sessions translating customer needs into AI-shaped opportunities to smaller team sessions defining opportunity areas and prioritized experiments.",
                        ],
                    },
                    {
                        type: "item",
                        title: "Remote sprints during COVID-19",
                        text: [
                            "Adapted and led the company's first remote design sprints using virtual collaboration tools, keeping engagement and outcome quality high while establishing virtual practices that became standard.",
                        ],
                    },
                ],
            },
        ],
        next: { slug: "ai-enablement", title: "AI meeting prep that sales teams trust" },
    },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
