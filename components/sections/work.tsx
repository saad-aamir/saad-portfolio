import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { projects, type Project } from "@/lib/projects";
import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";
import ProjectCopilot from "@/components/visuals/project-copilot";
import ProjectMatcher from "@/components/visuals/project-matcher";
import ProjectStudio from "@/components/visuals/project-studio";
import ProjectSentiment from "@/components/visuals/project-sentiment";
import ProjectSycophancy from "@/components/visuals/project-sycophancy";

const visualMap: Record<string, React.ComponentType> = {
  "dark-matter-copilot": ProjectCopilot,
  "ai-resume-matcher": ProjectMatcher,
  "studio-platform": ProjectStudio,
  "sentiment-pipeline": ProjectSentiment,
  "sycophancy-eval": ProjectSycophancy,
};

const statusLabel: Record<string, string> = {
  shipped: "shipped",
  "in-progress": "in progress",
  archived: "archived",
};

const statusColor: Record<string, string> = {
  shipped: "text-green border-green/30",
  "in-progress": "text-warm border-warm/30",
  archived: "text-text-mute border-border",
};

function ProjectCard({ project }: { project: Project }) {
  const Visual = visualMap[project.slug];

  return (
    <div className="h-full rounded-[16px] border border-border bg-bg-card overflow-hidden transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-accent-dim flex flex-col">
      {/* Visual — fixed height on all cards */}
      <div className="w-full h-52 bg-bg-2 overflow-hidden shrink-0">
        {Visual && <Visual />}
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-text" style={{ fontSize: "20px" }}>
              {project.title}
            </h3>
            <span
              className={clsx("font-mono border rounded-full px-2 py-0.5", statusColor[project.status])}
              style={{ fontSize: "11px" }}
            >
              {statusLabel[project.status]}
            </span>
          </div>
          <span className="font-mono text-text-mute shrink-0" style={{ fontSize: "12px" }}>
            {project.year}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-accent mb-4" style={{ fontSize: "15px" }}>
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-text-dim leading-relaxed line-clamp-3 mb-5 flex-1" style={{ fontSize: "14.5px" }}>
          {project.description}
        </p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map((tool) => (
            <span
              key={tool}
              className="font-mono text-text-mute border border-border rounded-full px-2.5 py-0.5"
              style={{ fontSize: "11px" }}
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.caseStudy && (
            <a
              href={`/work/${project.caseStudy}`}
              className="text-accent hover:text-accent-2 transition-colors inline-flex items-center gap-1"
              style={{ fontSize: "13px" }}
            >
              Case study <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-mute hover:text-text transition-colors inline-flex items-center gap-1"
              style={{ fontSize: "13px" }}
            >
              GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-mute hover:text-text transition-colors inline-flex items-center gap-1"
              style={{ fontSize: "13px" }}
            >
              Live <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {project.links.substack && (
            <a
              href={project.links.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-mute hover:text-text transition-colors inline-flex items-center gap-1"
              style={{ fontSize: "13px" }}
            >
              Substack <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-[110px]" aria-labelledby="work-heading">
      <Container>
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h2
            id="work-heading"
            className="mb-16 font-semibold tracking-[-0.02em]"
            style={{ fontSize: "44px" }}
          >
            Projects shipped{" "}
            <span className="text-text-mute">and currently building.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 4) as 0 | 1 | 2 | 3} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
