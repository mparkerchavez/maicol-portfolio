export const contact = {
    email: "mparkerchavez@gmail.com",
    mailto: "mailto:mparkerchavez@gmail.com?subject=Product%20Manager%20role",
    linkedin: "https://linkedin.com/in/mparkerchavez",
    resume: "/Maicol_Parker-Chavez_Resume.pdf",
};

export const hero = {
    badge: "Product Manager, AI Products · Open to full-time roles",
    headline: "I turn AI ambiguity into products people adopt and leaders believe in.",
    supporting:
        "I'm a product manager for AI products. My work has always come down to confidence: giving teams, stakeholders, and leaders enough evidence to commit to a direction. I find what users actually want, prove it before engineering commits, and keep the roadmap tied to the outcome.",
    stats: [
        { value: "300+", label: "sales associates adopted an AI meeting-prep tool I validated" },
        { value: "2–3 hrs → 10–15 min", label: "weekly prep time, per client meeting" },
        { value: "3–4 weeks", label: "from idea to validated evidence that unlocked funding" },
    ],
};

export type CaseSummary = {
    slug: string;
    eyebrow: string;
    title: string;
    lead: string;
    image: { src: string; alt: string };
    rows: { label: string; text: string }[];
};

export const featuredCase: CaseSummary = {
    slug: "ai-enablement",
    eyebrow: "AI Enablement · Capital Group",
    title: "AI meeting prep that sales teams trust",
    lead: "Scaled from a 12-person pilot to 300+ active sales associates within a year.",
    image: { src: "/images/uc1-image-1.png", alt: "AI meeting prep project visual" },
    rows: [
        {
            label: "Problem",
            text: "Sales associates spent 2–3 hours a week preparing for 6–8 client meetings, and had almost no time when a meeting landed mid-week. The context they needed was scattered across client databases, notes, and research.",
        },
        {
            label: "My role",
            text: "Product lead for discovery and validation, partnering with the product manager, engineering lead, and data science manager.",
        },
        {
            label: "What I decided",
            text: "Associates did not want to chat with AI. I shifted the product to an agenda-first output they could edit and send, cut a social-profile enrichment feature over privacy risk, and designed for the 5-minute prep scenario.",
        },
        {
            label: "Outcome",
            text: "In 3–4 weeks, leaders had enough validated evidence to commit funding and engineering capacity. Adoption grew from 12 to ~90 to 300+ associates within a year.",
        },
    ],
};

export const moreCases: CaseSummary[] = [
    {
        slug: "strategy-horizon",
        eyebrow: "Tech Trends · Capital Group",
        title: "An enterprise point of view on generative AI",
        lead: "Main contributor to the 2024 and 2025 Tech Trends reports, read by 1,300+ unique visitors.",
        image: { src: "/images/uc2-image-1.png", alt: "Tech Trends research framework" },
        rows: [
            {
                label: "Problem",
                text: "AI was moving faster than leaders could separate hype from what would matter in 3–5 years.",
            },
            { label: "My role", text: "Authored 1–2 trends a year and was editorial lead for 4–6." },
            {
                label: "What I decided",
                text: "Recommended LangChain for rapid prototyping, then helped surface the tradeoff that led engineering to a custom orchestration layer for production. Set Copilot Studio environment segmentation by risk level with platform owners and InfoSec.",
            },
            {
                label: "Outcome",
                text: "Senior leaders gained a shared view of where generative AI fit the company, and business units used the reports to shape their roadmaps and strategic plans.",
            },
        ],
    },
    {
        slug: "innovation-sprints",
        eyebrow: "AI Discovery · Capital Group",
        title: "From AI curiosity to prioritized opportunities",
        lead: "20+ innovation sprints across client, investment, and technology teams.",
        image: { src: "/images/uc3-image-1.png", alt: "AI discovery workshop" },
        rows: [
            {
                label: "Problem",
                text: "Teams had plenty of AI ideas and no shared way to decide what to pursue, defer, or drop.",
            },
            {
                label: "My role",
                text: "Designed the prioritization framework and ran cross-pillar discovery for Sales, Marketing, and Client Experience.",
            },
            {
                label: "What I decided",
                text: "Scored every opportunity on customer need, AI fit, and implementation constraints. Data readiness came out as the primary constraint, which changed what teams sequenced first.",
            },
            {
                label: "Outcome",
                text: "A 40+ person cross-pillar workshop gave each pillar a prioritized list it could act on. Teams used it to re-sequence existing roadmaps where data readiness made ideas less viable. Also led the company's first remote design sprints during COVID-19.",
            },
        ],
    },
];

export const building = {
    intro: "I've always loved building products. In 2026, AI tools made it possible for me to build them myself, end to end. I used the year to sharpen my product skills and to learn firsthand how AI is changing the way PMs, engineers, and designers work together. Two of those products are live, and both are still in development.",
    projects: [
        {
            name: "Curate Mind",
            status: "In development",
            why: "At Capital Group I wrote and edited trends for our annual Tech Trends report. AI was now moving faster than any annual report could track, and I wanted my own version of that work to keep up.",
            what: "An open-source MCP server for research you can trust. Every claim traces back to a verbatim quote and its original source. The live demo runs on an AI strategy and adoption corpus updated through May 2026, organized into 11 research themes.",
            next: "A curator cockpit and a living report that stays current as new sources arrive. Next phase planned for early 2027.",
            links: [
                { label: "curatemind.io", href: "https://curatemind.io" },
                { label: "GitHub", href: "https://github.com/mparkerchavez/curate-mind" },
            ],
        },
        {
            name: "Earnestly",
            status: "In development",
            why: "More and more people are vibe-coding their ideas into real products, me included. Most of them don't have a design background, and good UX feedback is still hard to come by. I wanted to make it available to anyone who ships.",
            what: "A UX coach for founders who build with AI tools. It reviews a live site against the one goal the founder needs a visitor to reach, then explains what to change and why.",
            next: "An invite-only version is live today so I can test it with founders and gather feedback. If it proves its value, the next step is a real product anyone can use.",
            links: [{ label: "earnestly.io", href: "https://earnestly.io" }],
        },
    ],
};

export const about = {
    photo: { src: "/images/maicol-workshop.jpg", alt: "Maicol leading a workshop in a room full of people from different teams" },
    paragraphs: [
        "Most of my work starts with conversations. I talk with the people who use the product, the people who build it, and the people who fund it, and I give each of them the same weight, whatever their title or discipline. In large organizations those perspectives tend to live in separate silos. Connecting the dots between them is where the useful product decisions come from.",
        "I've been riding BMX bikes since I was a kid, and I still do. In my early 20s I started AbsoluteBMX, an online magazine, because PDFs were cheap to distribute. Three issues and 2,000+ downloads later, I'd had my first lesson in building something people actually want.",
        "Guitar and photography keep me creative. Hockey keeps me humble: I learned to skate and started playing in my early 40s, and it's a regular reminder of what being a beginner feels like.",
    ],
    dubplate: {
        before: "Music is almost always on while I work, usually a DJ set or anything energetic enough to keep me moving. I wanted something visual running on the side while I worked, so I built ",
        name: "Dubplate",
        after: ", a visualizer that moves with whatever's playing. There's no business case. I just wanted it to exist.",
        href: "https://dubplate-viz.vercel.app/",
    },
};
