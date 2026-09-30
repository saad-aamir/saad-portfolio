export interface ExperienceEntry {
  id: string;
  role: string;
  tags: string[];
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  bullets?: string[];
  stack?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "tu-dresden",
    role: "M.Sc. Computer Science",
    tags: ["Technische Universität Dresden", "Germany"],
    startDate: "OCT 2026",
    endDate: "PRESENT",
    current: true,
  },
  {
    id: "dark-matter",
    role: "Independent Engineer",
    tags: ["Dark Matter Studio", "Freelance"],
    startDate: "JAN 2026",
    endDate: "PRESENT",
    current: true,
    description:
      "Independent web and LLM work under Dark Matter Studio: Next.js sites for clients, plus my own tooling.",
    bullets: [
      "Built Dark Matter Co-Pilot to automate the studio's own CRM and outreach: a Model Context Protocol (MCP) server that gives an AI assistant structured access to real operations data (leads, projects, case studies, pricing) through ten typed tools over SQLite.",
      "Pydantic v2 is the single source of truth for database rows, tool schemas and responses, so the same model definition validates what goes in and what comes back. I use it daily.",
      "Shipped Next.js and Tailwind client sites end to end, from design through deploy on Vercel.",
    ],
    stack: ["Next.js", "TypeScript", "Python", "MCP", "Pydantic v2", "SQLite", "Vercel"],
  },
  {
    id: "zsystems",
    role: "Software Engineer (Full Stack)",
    tags: ["ZSystems (MobileLIVE, now ML Arteka)", "Canadian Consultancy", "Remote"],
    startDate: "JUL 2023",
    endDate: "JUN 2026",
    current: false,
    description:
      "Three years designing and owning backends, modernizing codebases other people wrote, and shipping features end to end, including LLM-backed ones running in production.",
    bullets: [
      "Led the backend of the company's own hiring portal: designed the API and data model, built the workflow end to end, and added three LLM-backed features on the OpenAI API. Benchmarked GPT-4 against GPT-4o and chose GPT-4o for latency.",
      "Requisition summarization: the model reads a free-text job description and returns title, skills and requirements through function calling against a JSON schema I defined, so a requisition reads as a bulleted summary instead of a page of prose.",
      "Candidate search: the criteria the model extracts drive a query to the CATS One applicant tracking API, returning the top ten matching candidates inside the portal and replacing a manual search.",
      "Resume parsing and normalization: the model maps an uploaded PDF or DOCX CV into a validated JSON schema, which is persisted and rendered in the company's standard format so any reformatted CV can be re-downloaded.",
      "Iterated prompts and schemas until model output was reliable enough to store, validated every response before it reached the database, and cut query latency by roughly 40%.",
      "Led the modernization of two internal .NET portals for a lighting manufacturer over about a year: upgraded .NET 6 to .NET 8, introduced the repository pattern, inversion of control and dependency injection, and migrated raw SQL to LINQ.",
      "Built a further .NET 8 portal consolidating operations that were spread across third-party tools, including inventory, into a single internal system.",
      "Built React dashboards over Node.js and TypeScript REST services on the Geotab Fleet Analytics project, and worked directly with client stakeholders, turning loosely specified requests into scoped deliverables demoed in sprint reviews.",
      "Ran AWS infrastructure (EC2, Lambda, S3, CloudWatch) with CI/CD through GitHub Actions, implemented JWT authentication and secure endpoints, and traced production incidents across the React frontend, the Node.js and .NET services, and the underlying SQL.",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "React",
      "C#/.NET 8",
      "OpenAI API",
      "SQL",
      "AWS",
      "GitHub Actions",
    ],
  },
  {
    id: "zsystems-intern",
    role: "Web Development Intern",
    tags: ["ZSystems", "Lahore"],
    startDate: "JUL 2020",
    endDate: "SEP 2020",
    current: false,
    description:
      "Built frontends and Node.js/Express services alongside senior engineers. The company brought me back full time after I graduated in 2023.",
    stack: ["Node.js", "Express", "JavaScript", "SQL"],
  },
  {
    id: "nust",
    role: "B.Sc. Computer Science",
    tags: ["NUST", "Islamabad"],
    startDate: "2019",
    endDate: "2023",
    current: false,
    description:
      "Final year project: indoor navigation for our campus using AR.",
  },
];
