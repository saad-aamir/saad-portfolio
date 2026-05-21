import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import { stats } from "@/lib/content";

export default function Stats() {
  return (
    <section className="py-[110px] border-y border-border" aria-label="Statistics">
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={(i + 1) as 1 | 2 | 3}>
              <div className="text-center sm:text-left">
                <p className="font-semibold text-accent mb-2" style={{ fontSize: "48px" }}>
                  {stat.value}
                </p>
                <p className="text-text-dim" style={{ fontSize: "14px" }}>{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
