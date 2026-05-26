export type CaseStudySlug = "capital-group" | "tech-trends" | "innovation-sprints";

export type CaseStudy = {
  slug: CaseStudySlug;
  marker: string;
  focus: string;
  kicker: string;
  title: string;
  cardTitle: string;
  problem: string;
  approach: string;
  lead: string;
  role: string;
  collaborators: string[];
  methods: string[];
  metrics: string[];
  chips: string[];
  sections: Array<{
    eyebrow: string;
    title: string;
    body: string[];
    chips?: string[];
  }>;
  related: CaseStudySlug[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "capital-group",
    marker: "02 /// AI ENABLEMENT",
    focus: "FOCUS: AI SALES WORKFLOW",
    kicker: "AI ENABLEMENT /// MEETING PREP AGENT",
    title: "From Prototype to Platform: AI Meeting Prep That Sales Teams Trust",
    cardTitle: "AI meeting prep that sales teams trust.",
    problem: "Sales associates had rich internal context, but not a fast way to turn it into meeting-specific preparation.",
    approach: "The sprint validated the workflow, output structure, and trust cues before full build.",
    lead:
      "I moved a GenAI use case from idea to validated evidence in 3 to 4 weeks, securing funding and engineering capacity for an agenda-first meeting prep workflow.",
    role: "Venture Architect Lead, AI and Emerging Technology",
    collaborators: ["Data Science Partners", "Initiative Product Manager", "Engineering Partners", "Sales Stakeholders"],
    methods: ["Workflow Mapping", "User Interviews", "Validation Sprint", "Rapid Prototyping", "Cross-Functional Alignment"],
    metrics: [
      "300+ active sales associates within 1 year",
      "3 to 4 weeks from idea to validated evidence",
      "Weekly prep reduced from 2 to 3 hours to 10 to 15 minutes per client",
    ],
    chips: ["300+ USERS", "GENAI ADOPTION", "AGENDA-FIRST"],
    sections: [
      {
        eyebrow: "01 /// THE CHALLENGE",
        title: "The weekly prep bottleneck.",
        body: [
          "Sales associates typically prepared at the start of the week, spending 2 to 3 hours to get ready for 6 to 8 client meetings.",
          "A data science team had access to client databases, prior meeting notes, sales activity, and internal research commentary. The context lived in different places and did not reliably support fast, meeting-specific preparation.",
        ],
        chips: ["Why didn't they just ask sales associates what they wanted?"],
      },
      {
        eyebrow: "02 /// THE STRATEGY",
        title: "Validating the workflow, not just the tech.",
        body: [
          "Instead of starting with features, we ran an innovation sprint to validate where AI could remove the most friction in meeting prep.",
          "Sales associates did not want to chat. They wanted an agenda-first output they could send to clients, backed by specifics when they needed to go deeper.",
          "We did not build social profile enrichment because of privacy and PII concerns. Instead, we surfaced personal context already captured in prior meeting notes.",
        ],
        chips: ["What was the decision not to build?", "How did this scale from 12 to 300+ users?"],
      },
      {
        eyebrow: "03 /// THE OUTCOME",
        title: "From validated evidence to funded integration.",
        body: [
          "In 3 to 4 weeks, we produced validated learnings that stakeholders used to commit additional funding and engineering capacity.",
          "Downstream teams integrated the capability into the existing platform and expanded adoption from a 12-person pilot to roughly 90 users, later scaling to 300+ active sales associates within a year.",
        ],
        chips: ["How does this translate to a Senior PM role?"],
      },
    ],
    related: ["tech-trends", "innovation-sprints"],
  },
  {
    slug: "tech-trends",
    marker: "03 /// AI STRATEGY",
    focus: "FOCUS: EMERGING CAPABILITIES",
    kicker: "TECH TRENDS /// EMERGING AI CAPABILITIES",
    title: "Enterprise Tech Trends, AI Narrative and Adoption Enablement",
    cardTitle: "Enterprise AI narrative and adoption enablement.",
    problem: "Leaders needed a practical point of view on emerging AI capabilities, hype, readiness, and responsible adoption.",
    approach: "The work turned research signals into an enterprise narrative and downstream decision tools.",
    lead:
      "I contributed AI-focused trend research and editorial synthesis for an annual Tech Trends publication distributed through internal platforms and an intranet campaign.",
    role: "Venture Architect, AI and Emerging Technology",
    collaborators: ["Executive Sponsors", "Enterprise Architecture", "Volunteer Analysts", "Platform Owners", "Engineering Partners"],
    methods: ["Signal Synthesis", "Enterprise Framing", "Executive Storytelling", "Editorial Review", "AI-Assisted Knowledge Workflow"],
    metrics: [
      "1,300+ unique visitors in the first 6 months",
      "1 to 2 trends authored per year",
      "4 to 6 trends served as editorial lead per year",
    ],
    chips: ["1,300+ VISITORS", "AI NARRATIVE", "LANGCHAIN"],
    sections: [
      {
        eyebrow: "01 /// THE CHALLENGE",
        title: "Staying ahead of AI acceleration.",
        body: [
          "As AI capabilities advanced rapidly, it became harder for organizations to maintain a shared understanding of what was emerging, what was hype, and what would matter over the next 3 to 5 years.",
          "Without a clear narrative grounded in evidence, teams risked becoming reactive instead of building readiness over time.",
        ],
        chips: ["What made this different from trend reporting?"],
      },
      {
        eyebrow: "02 /// THE STRATEGY",
        title: "Turning signals into an enterprise point of view.",
        body: [
          "We treated Tech Trends as an annual synthesis of signals, not a retrospective summary.",
          "I authored AI-focused sections by combining external research and industry reporting with perspectives from ecosystem partners, then translating what we observed into an enterprise lens.",
          "I also designed lightweight Copilot workflows to tag documents, surface cross-document signals, and provide writing feedback. Human editorial judgment remained the final gate.",
        ],
        chips: ["Where did AI help the research process?", "Why was LangChain useful for prototyping?"],
      },
      {
        eyebrow: "03 /// THE OUTCOME",
        title: "Shared context for smarter decisions.",
        body: [
          "The AI narrative work helped leaders interpret rapid shifts in generative AI and emerging capabilities through an enterprise lens.",
          "The research later informed downstream work, including an AI vendor evaluation framework and Copilot Studio scale readiness alignment.",
        ],
        chips: ["What was the production tradeoff with LangChain?"],
      },
    ],
    related: ["capital-group", "innovation-sprints"],
  },
  {
    slug: "innovation-sprints",
    marker: "04 /// METHODOLOGY",
    focus: "FOCUS: AI DISCOVERY",
    kicker: "INNOVATION SPRINTS /// AI DISCOVERY",
    title: "Scaling AI Discovery Through Innovation Sprints",
    cardTitle: "Scaling AI discovery through innovation sprints.",
    problem: "Teams had broad AI curiosity, but needed a way to turn ideas into user-grounded and business-ready opportunities.",
    approach: "A repeatable sprint framework helped teams prioritize under enterprise constraints.",
    lead:
      "I led 20+ innovation sprints and designed AI-focused workshops for client experience leaders and teams.",
    role: "Venture Architect Lead, AI and Emerging Technology",
    collaborators: ["Investment Professionals", "Client Group Teams", "Product Managers", "Engineers", "Architects", "Data Science Partners"],
    methods: ["Workshop Design", "Empathy Mapping", "Value Mapping", "AI Use Case Framing", "Capability Mapping", "Prioritization"],
    metrics: [
      "20+ innovation sprints led",
      "30+ participants across Sales, Marketing, and Client Experience",
      "Workshop design reused by another business unit",
    ],
    chips: ["20+ SPRINTS", "30+ PARTICIPANTS", "AI DISCOVERY"],
    sections: [
      {
        eyebrow: "01 /// THE CHALLENGE",
        title: "From AI curiosity to business-ready use cases.",
        body: [
          "Teams surfaced many ideas, but the hard part was turning interest in AI into opportunities rooted in user needs, measurable outcomes, and clear constraints.",
          "Without a shared structure, leaders struggled to decide what to pursue, what to defer, and how to connect initiatives to business outcomes.",
        ],
        chips: ["How did the sprint avoid generic AI ideation?"],
      },
      {
        eyebrow: "02 /// THE STRATEGY",
        title: "A repeatable framework for AI discovery.",
        body: [
          "The workshop system paired human-centered problem framing with an enterprise lens.",
          "Each pillar evaluated opportunities across customer needs, fit with AI capabilities, and implementation considerations. Data readiness was consistently the primary constraint.",
          "Outputs included empathy maps, value maps, prioritized opportunity lists, and an executive capability lineage view.",
        ],
        chips: ["What did the prioritization framework measure?", "Where did data readiness change the decision?"],
      },
      {
        eyebrow: "03 /// THE OUTCOME",
        title: "Clearer priorities and better decision quality.",
        body: [
          "The sprint approach helped teams move from open questions to clearer decisions.",
          "At the leadership level, capability lineage and value chain mapping made alignment gaps visible before deeper investment.",
        ],
        chips: ["How does this connect to AI Product Lead work?"],
      },
    ],
    related: ["capital-group", "tech-trends"],
  },
];

export const caseStudyOrder = caseStudies.map((caseStudy) => caseStudy.slug);

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getNextCaseStudy(slug: CaseStudySlug) {
  const currentIndex = caseStudyOrder.indexOf(slug);
  const nextSlug = caseStudyOrder[currentIndex + 1];

  return nextSlug ? getCaseStudy(nextSlug) : null;
}
