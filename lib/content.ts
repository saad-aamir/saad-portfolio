// TODO: copy from Saad — all biographical text below is placeholder until reviewed

export const about = {
  paragraphs: [
    "I'm a software engineer based in Rawalpindi, currently working at Dark Matter Studio where I build client-facing products and internal tools. My work sits at the intersection of full-stack engineering and applied AI; lately, that mostly means designing systems that put language models in useful, reliable contact with existing workflows.",
    "I'm moving toward AI safety research. The thing that pulls me there isn't anxiety about AI going wrong in science-fiction ways; it's the more immediate question of how you build systems that behave predictably when the inputs are messy and the stakes matter. That's an engineering problem before it's a philosophical one, and it's the kind I find worth spending serious time on.",
    "Outside of work, I think about alignment literature, run, and occasionally pretend I'll finish the books on my shelf. I grew up in Rawalpindi and spent four years at NUST studying software engineering; the research lab there is where I first got serious about ML.",
  ],
  quickLinks: [
    { label: "GitHub", href: "https://github.com/saadaamir" },
    { label: "LinkedIn", href: "https://linkedin.com/in/saadaamir" },
    { label: "CV", href: "/saad-aamir-cv.pdf" },
    { label: "Email", href: "mailto:saadaamir473@gmail.com" },
  ],
};

export const stats = [
  { value: "4+", label: "years shipping production systems" },
  { value: "12+", label: "client products launched" },
  { value: "∞", label: "tabs open at any given time" },
];

interface SectionContent {
  text: string;
  bullets?: string[];
}

export const caseStudies: Record<
  string,
  {
    problem: SectionContent;
    approach: SectionContent;
    tradeoffs?: SectionContent;
    status?: SectionContent;
    result?: SectionContent;
  }
> = {
  "dark-matter-copilot": {
    problem: {
      text: "Running Dark Matter Studio solo means I'm the salesperson, designer, developer, and project manager all at once. The context-switching tax is real: I lose track of which leads I've followed up with, rewrite similar proposals from scratch each time, and forget which past case study is the strongest reference for a given pitch. The data I need to do my job exists; it's just scattered across notes, email threads, and my head.",
    },
    approach: {
      text: "I'm building an MCP (Model Context Protocol) server that exposes my studio's operations data to Claude as a set of typed tools. Instead of building yet another dashboard with another login, the interface is Claude; I ask in plain English and it queries my database, drafts outreach, and assembles proposals grounded in my real case studies and pricing.\n\nThe architecture is deliberate:",
      bullets: [
        "Python + FastMCP for the server. Pydantic models double as the source of truth for database rows, tool schemas, and validation.",
        "Tools return structured context, not generated text. Claude does the writing; the server provides authoritative grounding (real pricing, real case studies, real lead data). This keeps generation accurate and prevents hallucinated numbers.",
        "SQLite for storage: small, fast, zero-config, and right-sized for a solo operator.",
        "A Next.js + Tailwind dashboard sits alongside the MCP server, both reading from the same database, giving me a visual interface when I want one.",
      ],
    },
    result: {
      text: "When complete, asking Claude \"draft a proposal for the new wedding photographer lead, portfolio site, mid-complexity\" will produce a grounded, on-brand proposal in seconds, referencing the right case studies, using my actual pricing, in my voice. Goal: turn 30-minute proposal drafts into 3-minute reviews, and stop letting follow-ups slip.",
    },
  },
  "ai-resume-matcher": {
    problem: {
      text: "Early hiring pipelines involve a lot of manual comparison: reading a job description, reading a resume, deciding if the match is worth a call. The process is slow, inconsistent across reviewers, and often misses non-obvious alignment (a candidate with adjacent skills who hasn't used the exact keyword).",
    },
    approach: {
      text: "Used structured LLM extraction to pull typed representations of both the JD and resume (skills, experience level, responsibility scope, tone), then scored alignment across those dimensions rather than keyword overlap. The structured extraction step is where most of the quality comes from: once you have clean structured data, the comparison is straightforward.",
    },
    tradeoffs: {
      text: "Structured extraction via LLM is not free: it adds latency and cost per comparison. For high-volume pipelines you'd want a cached or embedded representation. We also deliberately did not train a classifier, because a fine-tuned model would memorize the biases of whoever labeled the training data. Using a general-purpose model with explicit criteria is more auditable, which matters here.",
    },
    status: {
      text: "Shipped and in use. The core matching logic is stable; the UI is minimal by intent.",
    },
  },
};
