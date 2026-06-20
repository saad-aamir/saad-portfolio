export interface ExperienceEntry {
  id: string;
  role: string;
  tags: string[];
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  stack: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "dark-matter",
    role: "Founder & Full Stack Developer",
    tags: ["Dark Matter Studio", "Independent"],
    startDate: "JAN 2026",
    endDate: "PRESENT",
    current: true,
    description:
      "Running an independent web design and development studio. Shipping Next.js sites for clients across fitness, finance, and creative industries. I also build my own LLM tooling: Dark Matter Co-Pilot, a Python MCP server that exposes studio operations to Claude, and a sycophancy evaluation harness measuring how language models hold up under user pushback.",
    stack: ["Next.js", "TypeScript", "Python", "Claude API", "MCP", "PostgreSQL", "Vercel"],
  },
  {
    id: "mobilelive",
    role: "Software Engineer (Full Stack)",
    tags: ["MobileLIVE", "Canadian Consultancy", "Remote"],
    startDate: "JUL 2023",
    endDate: "DEC 2025",
    current: false,
    description:
      "Owned full-stack feature development on Geotab Fleet Analytics: React dashboards backed by Node.js and TypeScript REST services, reducing query latency around 40%. Refactored the RAB and RDA Lighting portals from .NET 6 to .NET 8, introducing repository pattern and dependency injection to a legacy codebase. Integrated LLM-backed features into the PRF Portal, cutting manual workflow steps by half. Deployed and maintained AWS infrastructure with CI/CD via GitHub Actions.",
    stack: ["React", "Node.js", "TypeScript", ".NET", "PostgreSQL", "AWS"],
  },
  {
    id: "zsystems",
    role: "Web Development Intern",
    tags: ["ZSystems", "Lahore"],
    startDate: "JUL 2020",
    endDate: "SEP 2020",
    current: false,
    description:
      "Built responsive frontends and Node.js/Express services in agile sprints with senior engineers. Shipped internal tooling for logistics clients and gained hands-on exposure to production deployment pipelines.",
    stack: ["Node.js", "Express", "JavaScript", "PostgreSQL"],
  },
  {
    id: "nust",
    role: "BS Computer Science",
    tags: ["NUST", "Islamabad"],
    startDate: "SEP 2019",
    endDate: "JUN 2023",
    current: false,
    description:
      "Final year project: NLP-based automated code review system using transformer models. Research assistant in the AI lab, working on sequence modeling for structured prediction tasks.",
    stack: ["Python", "PyTorch", "NLP", "C++"],
  },
];
