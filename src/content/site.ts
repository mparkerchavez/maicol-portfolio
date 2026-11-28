export const contact = {
    email: "mparkerchavez@gmail.com",
    mailto: "mailto:mparkerchavez@gmail.com?subject=Product%20Manager%20role",
    linkedin: "https://linkedin.com/in/mparkerchavez",
    resume: "/Maicol_Parker-Chavez_Resume.pdf",
};

export const hero = {
    badge: "Product Manager, AI Products · Open to full-time roles",
    headline: "AI products people actually adopt.",
    supporting:
        "I am a product builder focused on enterprise AI. Over six years with Capital Group, including nearly four as Lead Venture Architect, I proved what users needed before engineering committed. Now I pair that enterprise track record with building my own AI products end to end.",
    stats: [
        { value: "300+ users", label: "Active sales associates adopted an AI meeting prep tool I validated" },
        { value: "2 to 3 hrs → 1 hr", label: "Weekly prep cut to roughly 1 hour across 6 to 8 client meetings" },
        { value: "3 to 4 weeks", label: "From idea to validated evidence that unlocked funding" },
    ],
};

export type CaseSummary = {
    slug: string;
    eyebrow: string;
    title: string;
    lead: string;
    stat: { value: string; label: string };
    /** A full sentence that contains stat.value, for layouts that set the stat inline. */
    statSentence?: string;
    image: { src: string; alt: string };
    rows: { label: string; text: string }[];
};

export const featuredCase: CaseSummary = {
    slug: "ai-enablement",
    eyebrow: "AI Enablement · Capital Group",
    title: "AI meeting prep that sales teams trust",
    lead: "An AI meeting prep tool scaled from a 12-person pilot to 300+ active sales associates within a year.",
    stat: { value: "300+", label: "sales associates using it within a year" },
    image: { src: "/images/uc1-image-1.png", alt: "AI meeting prep project visual" },
    rows: [
        {
            label: "Problem",
            text: "Sales associates spent 2 to 3 hours a week preparing for 6 to 8 client meetings. When a meeting landed mid-week, they had almost no time. The context they needed was scattered across client databases, notes, and research.",
        },
        {
            label: "My role",
            text: "Discovery and validation lead on a cross-functional team with Data Science, the product manager, engineering, and sales.",
        },
        {
            label: "What I decided",
            text: "Associates did not want to chat with AI. I shifted the product to an editable, agenda-first output built for 5-minute prep when needed. I also cut social-profile enrichment over privacy risk, surfacing personal context from prior meeting notes instead.",
        },
        {
            label: "Outcome",
            text: "In 3 to 4 weeks, our team delivered validated evidence and a Figma handoff. That readout unlocked funding and engineering capacity, making this the first of four active AI initiatives funded past experimentation. Downstream teams integrated it into the sales platform, cutting weekly prep to roughly 1 hour or less.",
        },
    ],
};

export const moreCases: CaseSummary[] = [
    {
        slug: "strategy-horizon",
        eyebrow: "Tech Trends · Capital Group",
        title: "An enterprise point of view on generative AI",
        lead: "At Capital Group, I served as main AI contributor for the Tech Trends reports, helping business leaders and partner technology teams evaluate generative AI.",
        stat: { value: "1,300+", label: "unique visitors within 3 months of each release, including the CEO and C-suite" },
        statSentence:
            "Capital Group's 2024 and 2025 Tech Trends reports reached 1,300+ unique visitors within 3 months of each release, including the CEO and C-suite.",
        image: { src: "/images/uc2-image-1.png", alt: "Tech Trends research framework" },
        rows: [
            {
                label: "Problem",
                text: "AI was moving faster than business leaders and their partner technology teams could separate hype from what would matter in 3 to 5 years.",
            },
            {
                label: "My role",
                text: "AI strategy and architecture advisor, serving as main AI contributor for Capital Group's 2024 and 2025 Tech Trends reports.",
            },
            {
                label: "What I decided",
                text: "Standardized AI coverage around maturity stage and action (Act Now, Inform Strategy, or Watch Closely) for business and technology leaders. Built a human-validated Copilot Studio prototype so a 5-person team could synthesize 250+ documents and evaluate the platform firsthand.",
            },
            {
                label: "Outcome",
                text: "C-suite and senior leaders gained a shared view of generative AI, and business units used the reports to inform roadmaps. Follow-up advisory work drove custom AI orchestration for Investment Technology Group and a dedicated Copilot Studio engineering team in Information Technology Group.",
            },
        ],
    },
    {
        slug: "innovation-sprints",
        eyebrow: "AI Discovery · Capital Group",
        title: "From AI curiosity to prioritized opportunities",
        lead: "At Capital Group, I led a 40+ person AI discovery effort with Client Group and Client Experience Technology, turning competing proposals into prioritized bets.",
        stat: {
            value: "40+",
            label: "people across Client Group and Client Experience Technology aligned on one prioritized AI bet per team",
        },
        statSentence:
            "Marketing, Sales, and Client Experience each left a 40+ person AI discovery effort with one prioritized use case and a concrete next step.",
        image: { src: "/images/uc3-image-1.png", alt: "AI discovery workshop" },
        rows: [
            {
                label: "Problem",
                text: "Marketing, Sales, and Client Experience had competing AI ideas and no shared bar for readiness.",
            },
            {
                label: "My role",
                text: "AI discovery and prioritization lead, partnering with Client Group and Client Experience Technology.",
            },
            {
                label: "What I decided",
                text: "Grounded every proposal in customer pain points before scoring AI fit and feasibility. Exposing data readiness as the primary blocker changed what teams sequenced first.",
            },
            {
                label: "Outcome",
                text: "Shared readiness scoring kept teams from funding AI features on unready data, while Sales and Client Experience left with concrete next steps. Marketing's specialized compliance AI vendor was later evaluated and implemented. In a follow-up session, 7 senior leaders aligned team long-term plans back to corporate strategy.",
            },
        ],
    },
];

export const building = {
    intro: "I've always loved building products. In 2026, AI tools made it possible for me to build them myself, end to end. I used the year to sharpen my product skills and to learn firsthand how AI is changing the way PMs, engineers, and designers work together. Two of those products are online, and both are still in development.",
    projects: [
        {
            name: "Curate Mind",
            status: "In development",
            why: "At Capital Group, I wrote and edited trends for our annual Tech Trends report and built an internal prototype to extract signals. AI started moving faster than an annual report could track, so I built my own system to keep up.",
            what: "An open-source MCP server I built end to end for research you can trust. Every claim traces back to a verbatim quote and its original source. The demo runs on a fixed AI strategy and adoption dataset covering research through May 2026. It includes nearly 300 sources, over 4,800 data points, and 41 positions across 11 themes.",
            next: "A curator cockpit and a living report that stays current as new sources arrive. Next phase planned for early 2027.",
            links: [
                { label: "curatemind.io", href: "https://curatemind.io" },
                { label: "GitHub", href: "https://github.com/mparkerchavez/curate-mind" },
            ],
        },
        {
            name: "Earnestly",
            status: "In development",
            why: "More founders are building products with AI tools without a design background, and clear UX feedback is still hard to get. I wanted to make structured UX critique available to anyone who ships.",
            what: "An early-stage UX coach I am building end to end for founders shipping with AI tools. It is designed to review a live site against one visitor goal, then explain what to change and why.",
            next: "Currently in early discovery and validation with a few invite-only founders. If founder feedback confirms its value, the next step is opening it to a broader group.",
            links: [{ label: "earnestly.io", href: "https://earnestly.io" }],
        },
    ],
};

export const about = {
    photo: { src: "/images/maicol-workshop.jpg", alt: "Maicol leading a workshop in a room full of people from different teams" },
    paragraphs: [
        "Most of my work starts with conversations. I talk with the people who use, build, and fund the product. I give each perspective equal weight, whatever their title or discipline. In large organizations those perspectives tend to live in separate silos. Connecting the dots between them is where the useful product decisions come from.",
        "I've been riding BMX bikes since I was a kid, and I still do. In my early 20s I started AbsoluteBMX, an online magazine, because PDFs were cheap to distribute. Three issues and 2,000+ downloads later, I'd had my first lesson in building something people actually want.",
        "Guitar and photography keep me creative. Hockey keeps me humble. I learned to skate and started playing in my early 40s. It is a regular reminder of what being a beginner feels like.",
    ],
    dubplate: {
        before: "Music is almost always on while I work, usually a DJ set or anything energetic enough to keep me moving. I wanted something visual running on the side while I worked, so I built ",
        name: "Dubplate",
        after: ", a visualizer that moves with whatever's playing. There's no business case. I just wanted it to exist.",
        href: "https://dubplate-viz.vercel.app/",
    },
};
