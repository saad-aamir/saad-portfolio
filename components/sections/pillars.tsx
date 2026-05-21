import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { Code2, Brain, Microscope } from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    body: "Production systems across Python, TypeScript, and Node: analytics dashboards, internal portals, REST APIs, and cloud infrastructure on AWS. 3+ years shipping at MobileLIVE and independently.",
  },
  {
    icon: Brain,
    title: "AI & LLM Tooling",
    body: "Practical integrations of language models into existing systems: MCP servers, RAG pipelines with LangChain and FAISS, structured outputs with Pydantic, and grounded workflows that don't hallucinate.",
  },
  {
    icon: Microscope,
    title: "Research Direction",
    body: "Moving toward empirical AI safety research: mechanistic interpretability, behavioral evaluations, scalable oversight. Currently self-studying transformer internals and applying to research-focused programs.",
  },
];

export default function Pillars() {
  return (
    <section id="what-i-do" className="py-[110px]" aria-labelledby="pillars-heading">
      <Container>
        <Reveal>
          <Eyebrow>What I do</Eyebrow>
          <h2
            id="pillars-heading"
            className="mb-5 font-semibold tracking-[-0.02em]"
            style={{ fontSize: "44px" }}
          >
            I build software and{" "}
            <span className="text-accent">the AI tooling</span>
            <br className="hidden sm:block" />
            {" "}that operates it.
          </h2>
          <p className="mb-16 max-w-2xl text-text-dim leading-relaxed" style={{ fontSize: "22px" }}>
            Three areas where I spend most of my time: engineering production
            systems, integrating language models into real workflows, and moving
            toward empirical research on how those models behave.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={(i + 1) as 1 | 2 | 3}>
                <div className="group rounded-[14px] border border-border bg-bg-card p-7 h-full transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-accent-dim">
                  <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-1">
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 font-semibold text-text" style={{ fontSize: "20px" }}>
                    {pillar.title}
                  </h3>
                  <p className="text-text-dim leading-relaxed" style={{ fontSize: "14.5px" }}>
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
