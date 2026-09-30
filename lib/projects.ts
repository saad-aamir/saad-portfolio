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
  hidden?: boolean;
  caseStudy: string | null;
  links: {
    github?: string;
    live?: string;
    substack?: string;
    arxiv?: string;
    weights?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "dark-matter-copilot",
    title: "Dark Matter Co-Pilot",
    tagline: "MCP server that gives Claude access to real studio data",
    description:
      "A Model Context Protocol (MCP) server that gives an AI assistant structured access to my studio's operations data (leads, projects, case studies, pricing) through ten typed tools over SQLite. Pydantic v2 is the single source of truth for rows, tool schemas and responses. I use it daily.",
    status: "shipped",
    year: "2026",
    role: "Solo Engineer",
    stack: ["Python", "FastMCP", "SQLite", "Pydantic v2"],
    featured: true,
    caseStudy: "dark-matter-copilot",
    links: {
      github: "https://github.com/saad-aamir/darkmatter-copilot",
      substack: "https://beginnersmindbysaad.substack.com/p/tools-should-return-data-language",
    },
  },
  {
    slug: "fly-dysseus",
    title: "Fly-dysseus",
    tagline: "Odysseus and the Sirens, run on a 138,639-neuron connectome",
    description:
      "Odysseus and the Sirens retold on a simulated fruit fly, where the Sirens are sugar and the brain is the full 138,639-neuron FlyWire connectome. Reproduces the published whole-brain model (Shiu et al., Nature 2024) to within 0.3 Hz of the authors' figures, then runs three conditions: intact; sensory neurons silenced, where the feeding circuit shifts 51 Hz and the fly ignores food; and the motor neuron cut, where the circuit stays fully active and the body walks past anyway.",
    status: "shipped",
    year: "2026",
    role: "Solo Engineer",
    stack: ["Python", "FlyWire", "NeuroMechFly", "Embodied Fly Lab"],
    featured: true,
    caseStudy: null,
    links: {
      live: "https://saad-aamir.github.io/fly-dysseus/",
      github: "https://github.com/saad-aamir/fly-dysseus",
    },
  },
  {
    slug: "polyp-segmentation",
    title: "Multi-Centre Polyp Segmentation Audit",
    tagline: "What survives when you measure a benchmark properly",
    description:
      "U-Nets with a ResNet34 encoder trained for colonoscopy polyp segmentation on the standard 1,450-image benchmark, then evaluated across five clinical centres in three countries, including centres never seen during training. Seed alone moves Dice on the hardest unseen centre by ±0.036, more than most improvements reported for it, so single-run comparisons are uninterpretable. A pre-registered five-seed protocol over ten runs reports +0.055 Dice (p = 0.024) for augmentation.",
    status: "shipped",
    year: "2026",
    role: "Solo Researcher",
    stack: ["Python", "PyTorch", "ONNX Runtime Web", "NumPy"],
    featured: false,
    caseStudy: null,
    links: {
      live: "https://huggingface.co/spaces/saadaamir14/polyp-segmentation-demo",
      github: "https://github.com/saad-aamir/polyp-segmentation",
      weights: "https://huggingface.co/saadaamir14/polyp-unet-r34-baseline",
    },
  },
  {
    slug: "capitulation-direction",
    title: "Capitulation Direction in LMs",
    tagline: "Preprint: is caving under pushback a linear direction?",
    description:
      "A co-authored preprint asking whether a model's tendency to cave under user pushback corresponds to a manipulable linear direction in the residual stream. Reported a null under a pre-registered protocol (cross-validation, shuffled-label nulls, a positive control and an AUROC gate) in which the control passed and the direction did not. A follow-up in preparation extends it to eight models across two families with causal ablation through TransformerLens.",
    status: "shipped",
    year: "2026",
    role: "Co-author",
    stack: ["Python", "PyTorch", "TransformerLens"],
    featured: false,
    caseStudy: null,
    links: {
      arxiv: "https://arxiv.org/abs/2609.17550",
      github: "https://github.com/saad-aamir/sycophancy-direction",
    },
  },
  {
    slug: "sycophancy-eval",
    title: "Sycophancy Evals",
    tagline: "The behavioral harness underneath the preprint",
    description:
      "A controlled experiment measuring how often two same-scale open-weight language models (Llama 3.1 8B, Qwen 2.5 7B) reverse correct answers under user pushback. Hand-validated LLM-as-judge, question-level bootstrap CIs, 1,800 conversations per model. This harness is what the capitulation-direction work was built on top of.",
    status: "shipped",
    year: "2026",
    role: "Solo Researcher",
    stack: ["Python", "Inspect", "Anthropic API", "Ollama", "Pydantic"],
    featured: false,
    caseStudy: "sycophancy-eval",
    links: {
      github: "https://github.com/saad-aamir/sycophancy-evals",
      substack: "https://beginnersmindbysaad.substack.com/p/llama-folds-when-you-sound-vague",
    },
  },
  {
    slug: "studio-platform",
    title: "Dark Matter Studio",
    tagline: "Landing page for my web studio",
    description:
      "The public site for Dark Matter Studio, my independent web practice. Built for speed and conversion. No CMS, just Next.js and Tailwind on Vercel.",
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
    hidden: true,
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
