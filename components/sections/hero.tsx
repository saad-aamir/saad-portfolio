import Container from "@/components/ui/container";
import Portrait from "@/components/portrait";
import AmbientGrid from "@/components/visuals/ambient-grid";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <AmbientGrid />

      <Container className="relative z-10 py-[110px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px] lg:gap-20 items-center">

          {/* Text */}
          <div>
            {/* Greeting */}
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
              </span>
              <span className="font-mono text-text-dim" style={{ fontSize: "14px" }}>
                Hello,
              </span>
            </div>

            {/* Heading */}
            <h1
              className="mb-6 font-semibold leading-[1.05] tracking-[-0.035em]"
              style={{ fontSize: "68px" }}
            >
              I&apos;m{" "}
              <span
                id="hero-name-span"
                style={{
                  background: "linear-gradient(120deg, #A78BFA, #C4B5FD)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Saad Aamir
              </span>
              ,<br />
              a software<br />
              engineer<br />
              building toward<br />
              <span className="text-text">AI safety.</span>
            </h1>

            {/* Lead */}
            <p className="mb-8 max-w-lg text-text-dim leading-relaxed" style={{ fontSize: "17px" }}>
              I build <strong className="text-text font-semibold">full-stack systems</strong> and{" "}
              <strong className="text-text font-semibold">LLM tooling</strong>, including a
              Model Context Protocol server for my studio. Moving toward empirical work on the
              interpretability and oversight of frontier models.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-bg hover:bg-accent-2 transition-colors duration-200"
                style={{ fontSize: "14px" }}
              >
                Get in touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-text-dim hover:border-border-2 hover:text-text transition-all duration-200"
                style={{ fontSize: "14px" }}
              >
                View work
              </a>
            </div>
          </div>

          {/* Portrait */}
          <Portrait variant="hero" className="w-full max-w-xs mx-auto lg:max-w-none" />
        </div>
      </Container>
    </section>
  );
}
