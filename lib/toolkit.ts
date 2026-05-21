export interface ToolkitCategory {
  label: string;
  tools: {
    name: string;
    primary?: boolean;
  }[];
}

export const toolkit: ToolkitCategory[] = [
  {
    label: "languages",
    tools: [
      { name: "Python", primary: true },
      { name: "TypeScript", primary: true },
      { name: "JavaScript" },
      { name: "C++" },
      { name: "C#" },
      { name: "SQL" },
    ],
  },
  {
    label: "ai / ml",
    tools: [
      { name: "MCP", primary: true },
      { name: "LangChain", primary: true },
      { name: "OpenAI API" },
      { name: "FastAPI" },
      { name: "FAISS" },
      { name: "Pydantic" },
      { name: "TensorFlow" },
    ],
  },
  {
    label: "backend",
    tools: [
      { name: "Node.js", primary: true },
      { name: "Express", primary: true },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "SQLite" },
      { name: "Docker" },
      { name: "REST" },
      { name: "JWT" },
    ],
  },
  {
    label: "frontend",
    tools: [
      { name: "React", primary: true },
      { name: "Next.js", primary: true },
      { name: "Redux" },
      { name: "Tailwind" },
      { name: "Framer Motion" },
    ],
  },
  {
    label: "cloud",
    tools: [
      { name: "AWS", primary: true },
      { name: "EC2", primary: true },
      { name: "Lambda" },
      { name: "S3" },
      { name: "CloudWatch" },
      { name: "CloudFormation" },
      { name: "GitHub Actions" },
      { name: "Vercel" },
    ],
  },
];
