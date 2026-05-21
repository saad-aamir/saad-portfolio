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
    tagline: "MCP-based AI assistant for studio operations",
    description:
      "An AI co-pilot built on Model Context Protocol (MCP) that integrates with Dark Matter Studio's internal tools (project management, client communication, and asset pipelines) to surface context and draft responses without leaving the workflow.",
    status: "in-progress",
    year: "2024",
    role: "Lead Engineer",
    stack: ["TypeScript", "MCP", "Claude API", "Next.js", "PostgreSQL"],
    featured: true,
    caseStudy: "dark-matter-copilot",
    links: {},
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
    tagline: "Agency site with custom CMS and client portal",
    description:
      "The public-facing site and internal CMS for Dark Matter Studio. Built for speed, maintainability, and a design system the team can update without touching code.",
    status: "shipped",
    year: "2023",
    role: "Lead Engineer",
    stack: ["Next.js", "TypeScript", "Tailwind", "Sanity", "Vercel"],
    featured: false,
    caseStudy: null,
    links: {
      live: "https://darkmatterstudio.io",
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
