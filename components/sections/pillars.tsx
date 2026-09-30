import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { Code2, Brain, Microscope } from "lucide-react";

const pillars = [
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    body: "Backends I designed and own, and codebases other people wrote that I modernized: REST APIs and data models, .NET 6 to .NET 8 migrations, React dashboards over Node and TypeScript services, AWS infrastructure with CI/CD through GitHub Actions.",
  },
  {
    icon: Brain,
    title: "AI & LLM Systems",
    body: "Language models wired into real workflows: Model Context Protocol (MCP) servers, function calling against schemas I define, structured outputs validated with Pydantic before anything reaches a database. Three LLM-backed features shipped into a production hiring portal.",
  },
  {
    icon: Microscope,
    title: "Empirical ML",
    body: "Treating a model score as a measurement rather than a result: pre-registered protocols, seed variance, shuffled-label nulls, positive controls. A co-authored preprint, a multi-centre segmentation audit, and a null I published instead of burying.",
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
            I build software,{" "}
            <span className="text-accent">the AI inside it</span>,
            <br className="hidden sm:block" />
            {" "}and the evidence it works.
          </h2>
          <p className="mb-16 max-w-2xl text-text-dim leading-relaxed" style={{ fontSize: "22px" }}>
            Three areas where I spend most of my time: engineering production
            systems, wiring language models into them, and measuring carefully
            enough to know whether any of it holds up.
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
