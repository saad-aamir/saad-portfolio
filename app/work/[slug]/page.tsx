import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/container";
import Nav from "@/components/ui/nav";
import Footer from "@/components/ui/footer";
import { projects, getProject, getCaseStudyProjects } from "@/lib/projects";
import { caseStudies } from "@/lib/content";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import ProjectCopilot from "@/components/visuals/project-copilot";
import ProjectMatcher from "@/components/visuals/project-matcher";
import CopilotBody from "@/components/case-studies/copilot-body";
import SycophancyBody from "@/components/case-studies/sycophancy-body";
import ProjectSycophancyWide from "@/components/visuals/project-sycophancy-wide";

const visualMap: Record<string, React.ComponentType> = {
  "dark-matter-copilot": ProjectCopilot,
  "ai-resume-matcher": ProjectMatcher,
  "sycophancy-eval": ProjectSycophancyWide,
};

const statusColor: Record<string, string> = {
  shipped: "text-green border-green/30",
  "in-progress": "text-warm border-warm/30",
  archived: "text-text-mute border-border",
};

const statusLabel: Record<string, string> = {
  shipped: "shipped",
  "in-progress": "in progress",
  archived: "archived",
};

export async function generateStaticParams() {
  return getCaseStudyProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Saad Aamir`,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();

  const study = caseStudies[slug];
  const Visual = visualMap[slug];

  const sections = [
    { eyebrow: "01 / Problem", content: study?.problem },
    { eyebrow: "02 / Approach", content: study?.approach },
    { eyebrow: "03 / Trade-offs", content: study?.tradeoffs },
    { eyebrow: "04 / Status", content: study?.status },
    { eyebrow: "03 / Result", content: study?.result },
  ].filter((s) => s.content);

  return (
    <>
      <Nav />
      <main>
        {/* Header */}
        <div className="pt-32 pb-16 border-b border-border">
          <Container>
            <a
              href="/#work"
              className="inline-flex items-center gap-2 text-sm text-text-mute hover:text-text transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All work
            </a>

            <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={clsx(
                      "font-mono text-[11px] border rounded-full px-2.5 py-0.5",
                      statusColor[project.status]
                    )}
                  >
                    {statusLabel[project.status]}
                  </span>
                  <span className="font-mono text-xs text-text-mute">{project.year}</span>
                </div>
                <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl mb-2">
                  {project.title}
                </h1>
                <p className="text-lg text-text-dim">{project.tagline}</p>
              </div>
              <p className="text-sm text-text-mute font-mono">{project.role}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-[11px] text-text-mute border border-border rounded-full px-2.5 py-0.5"
                >
                  {tool}
                </span>
              ))}
            </div>
          </Container>
        </div>

        {/* Visual */}
        {Visual && (
          <div className="border-b border-border bg-bg-card">
            <Container>
              <div
                className={clsx("py-12", slug !== "sycophancy-eval" && "max-w-3xl mx-auto")}
                style={{ height: slug === "sycophancy-eval" ? 420 : 360 }}
              >
                <Visual />
              </div>
            </Container>
          </div>
        )}

        {/* Case study body */}
        <Container>
          {slug === "dark-matter-copilot" ? (
            <CopilotBody githubHref={project.links.github} />
          ) : slug === "sycophancy-eval" ? (
            <SycophancyBody githubHref={project.links.github} substackHref={project.links.substack} />
          ) : (
            <div className="py-16 max-w-[720px] mx-auto space-y-16">
              {sections.map(({ eyebrow, content }) => (
                <section key={eyebrow} aria-label={eyebrow}>
                  <p className="font-mono text-xs text-accent uppercase tracking-widest mb-5">
                    {eyebrow}
                  </p>
                  {content!.text.split("\n\n").map((para, i) => (
                    <p key={i} className="text-text-dim leading-relaxed mb-4 last:mb-0">
                      {para}
                    </p>
                  ))}
                  {content!.bullets && (
                    <ul className="mt-5 space-y-3">
                      {content!.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-text-dim leading-relaxed" style={{ fontSize: "15px" }}>
                          <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {/* Links */}
              {(project.links.github || project.links.live) && (
                <section aria-label="Links">
                  <p className="font-mono text-xs text-accent uppercase tracking-widest mb-5">
                    Links
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-text-dim hover:text-text transition-colors border border-border rounded-full px-4 py-2"
                      >
                        GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-text-dim hover:text-text transition-colors border border-border rounded-full px-4 py-2"
                      >
                        Live site <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </section>
              )}

              {/* Related */}
              <section aria-label="Related work">
                <p className="font-mono text-xs text-accent uppercase tracking-widest mb-5">
                  Related case studies
                </p>
                <div className="flex flex-wrap gap-3">
                  {projects
                    .filter((p) => p.caseStudy && p.slug !== slug)
                    .map((p) => (
                      <a
                        key={p.slug}
                        href={`/work/${p.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm text-text-dim hover:text-text transition-colors border border-border rounded-full px-4 py-2"
                      >
                        {p.title} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ))}
                </div>
              </section>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
