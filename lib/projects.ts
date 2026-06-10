export type ProjectStatus = "shipped" | "in-progress" | "archived";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  year: string;
  role: string;
  stack: string[];
  featured: boolean;
  caseStudy: string | null;
  links: {
    github?: string;
    live?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "dark-matter-copilot",
    title: "Dark Matter Co-Pilot",
    tagline: "MCP server that gives Claude access to real studio data",
    description:
      "An MCP server that connects Claude Desktop to my studio's operations data — past client work, live leads, voice docs, and outreach templates — so I can draft outreach, update leads, and query case studies through natural conversation.",
    status: "shipped",
    year: "2026",
    role: "Solo Engineer",
    stack: ["Python", "FastMCP", "SQLite", "Pydantic v2"],
    featured: true,
    caseStudy: "dark-matter-copilot",
    links: {
      github: "https://github.com/saad-aamir/darkmatter-copilot",
    },
  },
  {
    slug: "ai-resume-matcher",
    title: "AI Resume Matcher",
    tagline: "LLM-powered resume-to-JD alignment tool",
    description:
      "Parses job descriptions and resumes using structured LLM extraction, then scores alignment across skills, experience, and tone. Reduced manual screening time significantly for early hiring pipelines.",
    status: "shipped",
    year: "2023",
    role: "Solo Engineer",
    stack: ["Python", "FastAPI", "Claude API", "React", "Tailwind"],
    featured: false,
    caseStudy: "ai-resume-matcher",
    links: {
      github: "https://github.com/saadaamir/resume-matcher",
    },
  },
  {
    slug: "studio-platform",
    title: "Dark Matter Studio",
    tagline: "Landing page for my web studio",
    description:
      "The public site for Dark Matter Studio, my small web studio based in Pakistan. Headline: \"Websites That Turn Visitors Into Clients.\" Built for speed and conversion — no CMS, just clean Next.js and Tailwind.",
    status: "shipped",
    year: "2023",
    role: "Lead Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    featured: false,
    caseStudy: null,
    links: {
      live: "https://darkmatterstudio.org",
    },
  },
  {
    slug: "sentiment-pipeline",
    title: "Sentiment Pipeline",
    tagline: "Real-time social sentiment aggregation",
    description:
      "Streaming pipeline that aggregates social signals, runs sentiment classification, and surfaces brand mentions with context. Built for a client monitoring competitive landscape.",
    status: "shipped",
    year: "2022",
    role: "Backend Engineer",
    stack: ["Python", "Kafka", "Redis", "FastAPI", "React"],
    featured: false,
    caseStudy: null,
    links: {},
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCaseStudyProjects(): Project[] {
  return projects.filter((p) => p.caseStudy !== null);
}
