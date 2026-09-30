// Long-form copy. The rendered About section lives in components/sections/about.tsx;
// this export is the same copy in data form.

export const about = {
  paragraphs: [
    "I'm a software engineer based in Dresden, Germany. I graduated from NUST in 2023 and spent the next three years at ZSystems (MobileLIVE, now ML Arteka), a Canadian consultancy, designing and owning backends, modernizing .NET codebases other people wrote, and shipping features end to end, including three LLM-backed ones running in a production hiring portal.",
    "Alongside that I run Dark Matter Studio, independent web and LLM work. Automating its own CRM is where Dark Matter Co-Pilot came from: a Model Context Protocol (MCP) server giving an AI assistant structured access to real operations data through ten typed tools over SQLite, with Pydantic v2 as the single source of truth for rows, schemas and responses. I use it daily.",
    "The other half of my time goes to empirical ML: whether reported results survive being measured properly. A co-authored preprint on the capitulation direction that reported a null when the positive control passed and the direction didn't. A segmentation audit where seed alone moved the score more than most published improvements. Starting an M.Sc. at TU Dresden in October 2026.",
  ],
  quickLinks: [
    { label: "GitHub", href: "https://github.com/saad-aamir" },
    { label: "Substack", href: "https://beginnersmindbysaad.substack.com" },
    { label: "CV", href: "/saad-aamir-cv.pdf" },
    { label: "Email", href: "mailto:saadaamir473@gmail.com" },
  ],
};

export const stats = [
  { value: "3", label: "years shipping production systems" },
  { value: "138,639", label: "neurons in the connectome I simulated" },
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
};
