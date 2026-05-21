import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import AmbientGrid from "@/components/visuals/ambient-grid";
import { Mail, GitBranch, Link, FileText } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/saadaamir", icon: GitBranch },
  { label: "LinkedIn", href: "https://linkedin.com/in/saadaamir", icon: Link },
  { label: "CV", href: "/saad-aamir-cv.pdf", icon: FileText },
];

export default function Contact() {
  return (
    <section id="contact" className="py-[110px] relative overflow-hidden" aria-labelledby="contact-heading">
      <AmbientGrid />

      <Container className="relative z-10">
        <Reveal>
          <div className="rounded-[24px] border border-border bg-bg-card/80 backdrop-blur-sm p-10 sm:p-16 text-center max-w-2xl mx-auto">
            <p
              className="font-mono text-accent uppercase tracking-widest mb-5"
              style={{ fontSize: "12.5px" }}
            >
              Contact
            </p>

            <h2
              id="contact-heading"
              className="mb-5 font-semibold tracking-[-0.02em]"
              style={{ fontSize: "56px" }}
            >
              Let&apos;s work together.
            </h2>

            <p className="mb-8 text-text-dim leading-relaxed" style={{ fontSize: "17px" }}>
              Open to research collaborations, consulting engagements, and
              senior engineering roles, especially anything adjacent to AI
              safety or applied ML infrastructure. Dark Matter Studio is also
              available for select client projects.
            </p>

            <Reveal delay={1}>
              <a
                href="mailto:saadaamir473@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-accent font-medium text-bg hover:bg-accent-2 transition-colors mb-8 px-6 py-3"
                style={{ fontSize: "13.5px" }}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                saadaamir473@gmail.com
              </a>
            </Reveal>

            <Reveal delay={2}>
              <div className="flex items-center justify-center gap-4">
                <span className="font-mono text-text-mute" style={{ fontSize: "12.5px" }}>
                  Dark Matter Studio
                </span>
                <span className="text-border-2">·</span>
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={s.label}
                      className="text-text-mute hover:text-text transition-colors"
                      style={{ fontSize: "13px" }}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
