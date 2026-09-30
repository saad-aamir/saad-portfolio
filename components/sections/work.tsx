import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import WorkCard from "@/components/work-card";
import { projects } from "@/lib/projects";
import ProjectCopilot from "@/components/visuals/project-copilot";
import ProjectStudio from "@/components/visuals/project-studio";
import ProjectSentiment from "@/components/visuals/project-sentiment";
import ProjectSycophancy from "@/components/visuals/project-sycophancy";
import ProjectFlydysseus from "@/components/visuals/project-flydysseus";
import ProjectPolyp from "@/components/visuals/project-polyp";
import ProjectCapitulation from "@/components/visuals/project-capitulation";

const visualMap: Record<string, React.ComponentType> = {
  "dark-matter-copilot": ProjectCopilot,
  "studio-platform": ProjectStudio,
  "sentiment-pipeline": ProjectSentiment,
  "sycophancy-eval": ProjectSycophancy,
  "fly-dysseus": ProjectFlydysseus,
  "polyp-segmentation": ProjectPolyp,
  "capitulation-direction": ProjectCapitulation,
};

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
          {projects
            .filter((p) => !p.hidden)
            .map((project, i) => {
              const Visual = visualMap[project.slug];
              return (
                <Reveal key={project.slug} delay={(i % 4) as 0 | 1 | 2 | 3} className="h-full">
                  {/* Visual passed as an element so its SVG stays server-rendered */}
                  <WorkCard project={project} visual={Visual ? <Visual /> : null} />
                </Reveal>
              );
            })}
        </div>
      </Container>
    </section>
  );
}
