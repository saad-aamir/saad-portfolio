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
      { name: "C#" },
      { name: "SQL" },
      { name: "C++" },
    ],
  },
  {
    label: "machine learning",
    tools: [
      { name: "PyTorch", primary: true },
      { name: "segmentation models", primary: true },
      { name: "TransformerLens" },
      { name: "experiment design" },
      { name: "pre-registration" },
      { name: "significance testing" },
      { name: "ONNX" },
      { name: "quantization" },
    ],
  },
  {
    label: "llm systems",
    tools: [
      { name: "MCP", primary: true },
      { name: "OpenAI API", primary: true },
      { name: "Claude API" },
      { name: "function calling" },
      { name: "structured outputs" },
      { name: "RAG" },
      { name: "LLM-as-judge" },
      { name: "Pydantic" },
    ],
  },
  {
    label: "python / data",
    tools: [
      { name: "pandas", primary: true },
      { name: "NumPy", primary: true },
      { name: "SciPy" },
      { name: "scikit-learn" },
    ],
  },
  {
    label: "backend",
    tools: [
      { name: "Node.js", primary: true },
      { name: "Express", primary: true },
      { name: ".NET 6/8" },
      { name: "FastAPI" },
      { name: "REST" },
      { name: "JWT" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "SQLite" },
      { name: "MongoDB" },
    ],
  },
  {
    label: "frontend",
    tools: [
      { name: "React", primary: true },
      { name: "Next.js", primary: true },
      { name: "Tailwind" },
      { name: "Framer Motion" },
    ],
  },
  {
    label: "tooling",
    tools: [
      { name: "AWS", primary: true },
      { name: "Docker", primary: true },
      { name: "EC2" },
      { name: "Lambda" },
      { name: "S3" },
      { name: "CloudWatch" },
      { name: "GitHub Actions" },
      { name: "Git" },
      { name: "Vercel" },
    ],
  },
];
