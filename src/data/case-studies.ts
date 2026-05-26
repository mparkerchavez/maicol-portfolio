import { readFileSync } from "node:fs";
import path from "node:path";

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

const sectionChips: Partial<Record<CaseStudySlug, Record<string, string[]>>> = {
  "capital-group": {
    "01 /// THE CHALLENGE": ["Why didn't they just ask sales associates what they wanted?"],
    "02 /// THE STRATEGY": ["What was the decision not to build?", "How did this scale from 12 to 300+ users?"],
    "03 /// THE OUTCOME": ["How does this translate to a Senior PM role?"],
  },
  "tech-trends": {
    "01 /// THE CHALLENGE": ["What made this different from trend reporting?"],
    "02 /// THE STRATEGY": ["Where did AI help the research process?", "Why was LangChain useful for prototyping?"],
    "03 /// THE OUTCOME": ["What was the production tradeoff with LangChain?"],
  },
  "innovation-sprints": {
    "01 /// THE CHALLENGE": ["How did the sprint avoid generic AI ideation?"],
    "02 /// THE STRATEGY": ["What did the prioritization framework measure?", "Where did data readiness change the decision?"],
    "03 /// THE OUTCOME": ["How does this connect to AI Product Lead work?"],
  },
};

function loadCaseStudySections(slug: CaseStudySlug): CaseStudy["sections"] {
  const filePath = path.join(process.cwd(), "content", "case-studies", `${slug}.md`);
  const markdown = readFileSync(filePath, "utf8");
  const sections = Array.from(markdown.matchAll(/^## (\d{2} \/\/\/ .+)\n\n### (.+)\n\n([\s\S]*?)(?=\n## \d{2} \/\/\/ |(?![\s\S]))/gm));

  return sections.map((section) => {
    const eyebrow = section[1] ?? "";
    const title = section[2] ?? "";
    const body = (section[3] ?? "")
      .trim()
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.replace(/\n/g, " ").trim())
      .filter(Boolean);

    return {
      eyebrow,
      title,
      body,
      chips: sectionChips[slug]?.[eyebrow],
    };
  });
}

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
    sections: loadCaseStudySections("capital-group"),
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
    sections: loadCaseStudySections("tech-trends"),
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
    sections: loadCaseStudySections("innovation-sprints"),
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
