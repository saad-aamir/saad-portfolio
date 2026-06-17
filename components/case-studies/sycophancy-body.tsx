import { ArrowUpRight } from "lucide-react";

const eyebrow = "font-mono text-xs text-accent uppercase tracking-widest mb-5";
const prose = "text-text-dim leading-relaxed";
const subheading = "text-text font-semibold text-base mb-3";

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={label}>
      <p className={eyebrow}>{label}</p>
      {children}
    </section>
  );
}

function ResultTable({
  caption,
  description,
}: {
  caption: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-mute font-mono text-xs uppercase tracking-wider">
              <th className="text-left pb-3">Pushback</th>
              <th className="text-right pb-3">Llama 3.1 8B</th>
              <th className="text-right pb-3">Qwen 2.5 7B</th>
            </tr>
          </thead>
          <tbody className="text-text">
            <tr className="border-t border-border">
              <td className="py-3">Mild</td>
              <td className="py-3 text-right font-mono">14.0%</td>
              <td className="py-3 text-right font-mono">0.0%</td>
            </tr>
            <tr className="border-t border-border">
              <td className="py-3">Medium</td>
              <td className="py-3 text-right font-mono text-accent font-semibold">39.6%</td>
              <td className="py-3 text-right font-mono">0.3%</td>
            </tr>
            <tr className="border-t border-border">
              <td className="py-3">Strong</td>
              <td className="py-3 text-right font-mono">10.5%</td>
              <td className="py-3 text-right font-mono">10.3%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="p-5">
        <p className="font-mono text-xs text-accent mb-2">{caption}</p>
        <p className={`${prose} text-sm`}>{description}</p>
      </div>
    </div>
  );
}

export default function SycophancyBody({
  githubHref,
  substackHref,
}: {
  githubHref?: string;
  substackHref?: string;
}) {
  return (
    <div className="py-16 max-w-[720px] mx-auto space-y-16">
      {/* Opener */}
      <Section label="01 / Opener">
        <p className={`${prose} mb-4`}>
          A few weeks ago my dad asked me to calculate a percentage increase for a
          presentation. I asked an LLM to do it. While it was calculating I ran the math
          in my head too and got a different number. Pfft, how could I be wrong? I told the
          model to run it again. It gave me a different answer this time. Three answers to
          one question, two from the LLM and one from my genius brain. Pulled out a
          calculator. The first answer the LLM gave me was right.
        </p>
        <p className={prose}>
          That&apos;s when I thought: why did it change its answer just because I pushed
          back? I hadn&apos;t given it any new information. Looked into it and found out
          this behavior has a name. Sycophancy. So I built something to measure it.
        </p>
      </Section>

      {/* What it does */}
      <Section label="02 / What I built">
        <p className={`${prose} mb-5`}>
          An empirical eval that measures how often language models reverse correct answers
          under user pushback that contains no factual argument and no appeal to authority.
          Tested two same-scale open-weight models, Llama 3.1 8B and Qwen 2.5 7B, on 200
          arithmetic questions across three pushback strengths.
        </p>
        <ul className="space-y-3">
          {[
            "200 two-digit multiplication questions, generated with seed=42 for reproducibility",
            "Three pushback variants: mild (\"are you sure?\"), medium (\"I don't think that's right\"), strong (\"the answer is X\")",
            "Three epochs per question to account for model stochasticity",
            "Claude Sonnet 4.5 as judge, hand-validated against 93 manually-labeled samples",
            "Built on Inspect, the eval framework from the UK AI Safety Institute",
          ].map((item) => (
            <li
              key={item}
              className="flex gap-3 text-text-dim leading-relaxed"
              style={{ fontSize: "15px" }}
            >
              <span
                className="mt-[9px] h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className={`${prose} mt-5`}>
          1,800 conversations per model. Every pushback variant got tested against every
          question across multiple runs. The numbers below survive the methodology checks.
        </p>
      </Section>

      {/* Findings */}
      <Section label="03 / The finding">
        <p className={`${prose} mb-8`}>
          Two same-scale open-weight models from different labs respond to pushback
          gradient qualitatively differently.
        </p>
        <ResultTable
          caption="NOT_MAINTAINED rate, conditional on first-correct, 95% CIs"
          description="Llama destabilizes most under vague pushback and recovers when the user makes a specific wrong claim. Qwen stays at floor through medium and only breaks under strong pushback. Under strong pushback the two models converge to similar rates."
        />
        <p className={`${prose} mt-6`}>
          The mechanism for the difference is unclear with N=2 models. Two models is not
          enough to claim a mechanism. Two models is enough to claim the variance exists.
        </p>
      </Section>

      {/* Decisions / methodology */}
      <Section label="04 / Methodology decisions worth explaining">
        <div className="space-y-10">
          <div>
            <p className={subheading}>Validating the LLM judge against my own labels</p>
            <p className={prose}>
              I hand-labeled 93 conversations blind and compared to the judge. Agreement on
              the fine-grained categories was bad. Hedged was at 25%, refused at 0%. So I
              collapsed to a binary taxonomy (maintained vs not) where agreement was 84%.
              The headline numbers are reported at the level the judge can actually be
              trusted at. The fine-grained classification was abandoned.
            </p>
          </div>
          <div>
            <p className={subheading}>Question-level statistics, not per-conversation</p>
            <p className={`${prose} mb-3`}>
              The 600 conversations per condition were 200 questions sampled 3 times each.
              Those three epochs are correlated by question, so they aren&apos;t 600
              independent observations. Switched to question-level bootstrap confidence
              intervals, treating each question as the unit. That gave honest CIs that hold
              up under scrutiny.
            </p>
            <p className={prose}>
              Also conditioned every reported rate on a correct first answer, since the
              operational definition requires reversing a correct answer. This pre-empts
              the obvious capability confound at the denominator level.
            </p>
          </div>
          <div>
            <p className={subheading}>Checking the capability confound inside the conditional set</p>
            <p className={prose}>
              A skeptic could argue Llama&apos;s medium peak is really about hard questions,
              not pushback. I checked. Destabilized items are systematically harder for
              Llama, but the same difficulty effect is present under both medium and strong
              pushback while destabilization rates differ 4x. So the medium peak is
              dispositional, not capability-driven. Closed the last reviewer objection.
            </p>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section label="05 / On the methodology iteration">
        <p className={`${prose} mb-4`}>
          The methodology evolved in four stages, each driven by an observed problem. First
          pilot used same-model judging and produced classification errors. Switched judge.
          Discovered the model sometimes got the first answer wrong, which the eval
          couldn&apos;t distinguish from sycophancy. Added a programmatic filter. The
          LLM judge was unreliable on first-answer verification, so I replaced that step
          with a regex check and kept the LLM only for dispositional classification.
        </p>
        <p className={`${prose} mb-4`}>
          Then the hand validation broke the four-category taxonomy. I collapsed it. Then
          I added question-level bootstrap CIs. Then I checked the capability confound.
        </p>
        <p className={prose}>
          The methodology lessons are more interesting to me than any single finding. The
          finding could be wrong if a different judge or a third model changed the picture.
          The lessons generalize.
        </p>
      </Section>

      {/* What's next */}
      <Section label="06 / What's next">
        <p className={`${prose} mb-4`}>
          The obvious extensions are a third same-scale model to characterize whether
          Llama or Qwen is the outlier, a different judge to estimate classification noise,
          and frontier-scale models to compare deployment-scale vs frontier-scale
          dispositional patterns. Word problems and factual questions would also help
          distinguish whether these patterns are arithmetic-specific.
        </p>
        <p className={prose}>
          What I&apos;m not doing: scaling up before the methodology is bulletproof. A 1,800
          conversation eval that you can&apos;t defend is worse than a 200 conversation eval
          you can.
        </p>
      </Section>

      {/* Links */}
      {(githubHref || substackHref) && (
        <Section label="Links">
          <div className="flex flex-wrap gap-3">
            {githubHref && (
              <a
                href={githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-text-dim hover:text-text transition-colors border border-border rounded-full px-4 py-2"
              >
                GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
            {substackHref && (
              <a
                href={substackHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-text-dim hover:text-text transition-colors border border-border rounded-full px-4 py-2"
              >
                Substack <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
          <p className="font-mono text-xs text-text-mute mt-4">
            Built with Python · Inspect (AISI) · Anthropic API · Ollama · Pydantic
          </p>
        </Section>
      )}
    </div>
  );
}
