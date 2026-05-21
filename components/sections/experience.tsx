import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { experience } from "@/lib/experience";
import { clsx } from "clsx";

export default function Experience() {
  return (
    <section id="experience" className="py-[110px]" aria-labelledby="experience-heading">
      <Container>
        <Reveal>
          <Eyebrow>Experience</Eyebrow>
          <h2
            id="experience-heading"
            className="mb-16 font-semibold tracking-[-0.02em] leading-[1.1]"
            style={{ fontSize: "44px" }}
          >
            <span className="text-text-mute">3+ years of </span>
            <span className="text-text">engineering, shipping,</span>
            <br />
            <span className="text-text-mute">and learning.</span>
          </h2>
        </Reveal>

        {/* Timeline container — line at left-[7px] */}
        <div className="relative">
          <div
            className="absolute top-2 bottom-0 w-px hidden sm:block"
            style={{ left: "7px", backgroundColor: "#1E2126" }}
            aria-hidden="true"
          />

          <div className="space-y-14">
            {experience.map((entry, i) => (
              <Reveal key={entry.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">

                  {/* Left column: dot + date */}
                  <div className="relative flex items-start sm:w-[200px] sm:shrink-0">
                    {/* Dot sits on the line */}
                    <div
                      className={clsx(
                        "relative z-10 mt-0.5 shrink-0 w-[15px] h-[15px] rounded-full border-2 flex items-center justify-center",
                        entry.current
                          ? "border-accent bg-accent/20"
                          : "border-[#2E343B] bg-bg"
                      )}
                      aria-hidden="true"
                    >
                      {entry.current && (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      )}
                    </div>

                    {/* Date — starts right of the dot */}
                    <p
                      className="font-mono text-text-mute ml-3 mt-0.5 leading-none"
                      style={{ fontSize: "12px" }}
                    >
                      {entry.startDate}
                      <span className="mx-1">→</span>
                      {entry.endDate}
                    </p>
                  </div>

                  {/* Right column: content */}
                  <div className="sm:pl-0 flex-1 min-w-0">
                    <h3
                      className="font-semibold text-text mb-2"
                      style={{ fontSize: "20px" }}
                    >
                      {entry.role}
                    </h3>

                    {/* Tags — plain accent text */}
                    <p className="font-mono text-accent-2 mb-4" style={{ fontSize: "14px" }}>
                      {entry.tags.join(" · ")}
                    </p>

                    <p
                      className="text-text-dim leading-relaxed"
                      style={{ fontSize: "14.5px" }}
                    >
                      {entry.description}
                    </p>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
