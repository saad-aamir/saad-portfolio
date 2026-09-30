import Image from "next/image";
import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { Download } from "lucide-react";

function PortraitCard() {
  return (
    <div className="relative rounded-2xl border border-border bg-bg-card overflow-hidden aspect-[3/4] w-full">
      <Image
        src="/portraits/about.jpg"
        alt="Saad Aamir"
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 340px, 340px"
      />

      {/* Gradient so tags are readable */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Corner label */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
        <span className="font-mono text-text-mute" style={{ fontSize: "10px" }}>02 / About</span>
      </div>

      {/* Bottom tag */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
        <span className="font-mono text-text-mute bg-bg/70 rounded px-1.5 py-0.5 backdrop-blur-sm" style={{ fontSize: "10px" }}>
          Dresden, DE
        </span>
        <span className="font-mono text-text-mute bg-bg/70 rounded px-1.5 py-0.5 backdrop-blur-sm" style={{ fontSize: "10px" }}>
          @saad-aamir
        </span>
      </div>
    </div>
  );
}

const quickLinks = [
  { label: "Download CV", href: "/saad-aamir-cv.pdf", icon: true },
  { label: "GitHub", href: "https://github.com/saad-aamir", icon: false },
  { label: "Studio", href: "https://www.darkmatterstudio.org", icon: false },
];

export default function About() {
  return (
    <section id="about" className="py-[110px]" aria-labelledby="about-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[340px_1fr] lg:gap-24 items-start">
          {/* Portrait — left */}
          <Reveal>
            <PortraitCard />
          </Reveal>

          {/* Text — right */}
          <div>
            <Reveal delay={1}>
              <Eyebrow>About</Eyebrow>
              <h2
                id="about-heading"
                className="mb-8 font-semibold tracking-[-0.02em]"
                style={{ fontSize: "44px" }}
              >
                More about me.
              </h2>
            </Reveal>

            <div className="space-y-5">
              <Reveal delay={2}>
                <p className="text-text-dim leading-relaxed" style={{ fontSize: "17px" }}>
                  I&apos;m a software engineer based in{" "}
                  <span className="text-accent-2">Dresden, Germany</span>. I
                  graduated from NUST in 2023 and spent the next three years at
                  ZSystems (MobileLIVE, now ML Arteka), a Canadian consultancy,
                  designing and owning backends, modernizing .NET codebases other
                  people wrote, and shipping features end to end, including three
                  LLM-backed ones running in a production hiring portal.
                </p>
              </Reveal>

              <Reveal delay={3}>
                <p className="text-text-dim leading-relaxed" style={{ fontSize: "17px" }}>
                  Alongside that I run{" "}
                  <span className="text-accent-2">Dark Matter Studio</span>,
                  independent web and LLM work. Automating its own CRM is where
                  Dark Matter Co-Pilot came from: a Model Context Protocol (MCP)
                  server giving an AI assistant structured access to real
                  operations data through ten typed tools over SQLite, with
                  Pydantic v2 as the single source of truth for rows, schemas and
                  responses. I use it daily.
                </p>
              </Reveal>

              <Reveal delay={4}>
                <p className="text-text-dim leading-relaxed" style={{ fontSize: "17px" }}>
                  The other half of my time goes to{" "}
                  <span className="text-accent-2">empirical ML</span>: whether
                  reported results survive being measured properly. A co-authored
                  preprint on the capitulation direction that reported a null when
                  the positive control passed and the direction didn&apos;t. A
                  segmentation audit where seed alone moved the score more than
                  most published improvements. Starting an M.Sc. at TU Dresden in
                  October 2026.
                </p>
              </Reveal>
            </div>

            <Reveal delay={4}>
              <div className="mt-8 flex flex-wrap gap-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-mono inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-1 px-4 py-1.5 text-text-dim hover:border-accent-dim hover:text-text transition-all duration-[250ms]"
                    style={{ fontSize: "13px" }}
                  >
                    {link.icon && <Download className="h-3.5 w-3.5" aria-hidden="true" />}
                    {link.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
