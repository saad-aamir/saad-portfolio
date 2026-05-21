import Container from "@/components/ui/container";
import Eyebrow from "@/components/ui/eyebrow";
import Reveal from "@/components/ui/reveal";
import { toolkit } from "@/lib/toolkit";
import { clsx } from "clsx";

export default function Toolkit() {
  return (
    <section id="toolkit" className="py-[110px]" aria-labelledby="toolkit-heading">
      <Container>
        <Reveal>
          <Eyebrow>Toolkit</Eyebrow>
          <h2
            id="toolkit-heading"
            className="mb-16 font-semibold tracking-[-0.02em]"
            style={{ fontSize: "44px" }}
          >
            What I work with{" "}
            <span className="text-accent">day-to-day.</span>
          </h2>
        </Reveal>

        <div className="space-y-5">
          {toolkit.map((category, i) => (
            <Reveal key={category.label} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                {/* Category label */}
                <span
                  className="font-mono text-accent shrink-0 sm:w-40 sm:pt-2"
                  style={{ fontSize: "13.5px" }}
                >
                  {category.label}
                </span>

                {/* Pills — rectangular, not rounded-full */}
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className={clsx(
                        "font-mono rounded-md border px-3 py-1.5 transition-colors",
                        tool.primary
                          ? "text-text border-border-2 bg-bg-1"
                          : "text-text-mute border-border bg-bg-card"
                      )}
                      style={{ fontSize: "13.5px" }}
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
