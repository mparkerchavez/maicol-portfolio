/**
 * Home page copy approved in the copy pass (Portfolio Interim - Copy Pass.md, 25 November 2026).
 * Used by round four only, so directions 1 to 15 keep the copy they were reviewed with.
 */
export const r4 = {
    hero: {
        headline: "I turn AI ambiguity into products people adopt and leaders believe in.",
        supporting: "I'm a product manager for AI products. I find what users actually want, prove it before engineering commits, and keep the roadmap tied to the outcome.",
    },
    work: {
        heading: "Product decisions, with the evidence behind them.",
        body: "Three AI initiatives at Capital Group. Two products I'm building myself.",
    },
    lead: {
        slug: "ai-enablement",
        title: "AI meeting prep that sales teams trust",
        stat: { value: "300+", label: "Capital Group sales associates using AI meeting prep within a year" },
        lines: [
            "Associates did not want to chat with AI. I shifted the product to an agenda-first output they could edit and send.",
            "In 3 to 4 weeks, leaders had enough evidence to commit funding and engineering capacity.",
        ],
        image: { src: "/images/uc1-image-1.png", alt: "AI meeting prep project visual" },
    },
    builds: [
        {
            name: "Earnestly",
            line: "A UX coach for founders who build with AI tools, now in invite-only testing. It reviews a live site against one goal and explains what to change, and why.",
            links: [{ label: "earnestly.io", href: "https://earnestly.io" }],
        },
        {
            name: "Curate Mind",
            line: "An open-source MCP server for research you can trust, still in development. Every claim traces back to a verbatim quote and its original source.",
            links: [
                { label: "curatemind.io", href: "https://curatemind.io" },
                { label: "GitHub", href: "https://github.com/mparkerchavez/curate-mind" },
            ],
        },
    ],
    cases: [
        {
            slug: "strategy-horizon",
            title: "An enterprise point of view on generative AI",
            stat: { value: "1,300+", label: "unique visitors to Capital Group's Tech Trends reports in their first 6 months" },
            lines: ["I recommended LangChain for rapid prototyping, then helped surface the tradeoff that led engineering to a custom orchestration layer for production."],
            image: { src: "/images/uc2-image-1.png", alt: "Tech Trends research framework" },
        },
        {
            slug: "innovation-sprints",
            title: "From AI curiosity to prioritized opportunities",
            stat: { value: "20+", label: "innovation sprints across Capital Group's client, investment, and technology teams" },
            lines: ["I scored every AI idea on customer need, AI fit, and constraints. Data readiness came out as the primary constraint, which changed what teams sequenced first."],
            image: { src: "/images/uc3-image-1.png", alt: "AI discovery workshop" },
        },
    ],
    about: {
        photo: { src: "/images/maicol-workshop.jpg", alt: "Maicol leading a workshop in a room full of people from different teams" },
        heading: "Connecting the dots.",
        paragraphs: [
            "Most of my work starts with conversations: with the people who use the product, build it, and fund it. I give each of them the same weight, whatever their title. Connecting the dots between them is where the useful product decisions come from.",
            "I've always loved building products. In 2026, AI tools let me build them myself, end to end, and learn firsthand how AI is changing the way PMs, engineers, and designers work together.",
            "I've been riding BMX bikes since I was a kid, and I still do. In my early 20s I started AbsoluteBMX, an online magazine, because PDFs were cheap to distribute. Three issues and 2,000+ downloads later, I'd had my first lesson in building something people actually want.",
            "Guitar and photography keep me creative. Hockey keeps me humble: I learned to skate and started playing in my early 40s, and it's a regular reminder of what being a beginner feels like.",
            "Music is almost always on while I work, so I built Dubplate, a visualizer that moves with whatever's playing. There's no business case. I just wanted it to exist.",
        ],
        dubplate: { label: "Try Dubplate", href: "https://dubplate-viz.vercel.app/" },
    },
    footer: { heading: "Get in touch", legal: "© 2026 Maicol Parker-Chavez" },
};

export type R4Case = (typeof r4.cases)[number];
export type R4Build = (typeof r4.builds)[number];
