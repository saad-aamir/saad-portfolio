import Image from "next/image";
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

function Screenshot({
  src,
  caption,
  description,
}: {
  src: string;
  caption: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg-card overflow-hidden">
      <div className="relative w-full border-b border-border">
        <Image
          src={src}
          alt={caption}
          width={1280}
          height={800}
          className="w-full h-auto"
          style={{ display: "block" }}
        />
      </div>
      <div className="p-5">
        <p className="font-mono text-xs text-accent mb-2">{caption}</p>
        <p className={`${prose} text-sm`}>{description}</p>
      </div>
    </div>
  );
}

export default function CopilotBody({
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
          I run a small web studio out of Pakistan. Most days I&apos;m writing outreach,
          scoping projects, or deciding which past work to reference for a new lead. I kept
          asking Claude for help with all of it, and Claude was useful, but it had no idea
          what my actual studio does. Every conversation started with me re-explaining who I
          am, what I&apos;ve built, and what I charge.
        </p>
        <p className={prose}>Got annoying enough that I built a tool to fix it.</p>
      </Section>

      {/* What it does */}
      <Section label="02 / What it does">
        <p className={`${prose} mb-5`}>
          Dark Matter Co-Pilot is an MCP server that gives Claude access to my real studio
          data. Now in Claude Desktop I can:
        </p>
        <ul className="space-y-3">
          {[
            "Ask about my past client work and get real answers",
            "Add and update leads through natural language",
            "Have Claude analyze a prospect's website and save what it noticed",
            "Draft cold outreach emails grounded in my actual case studies and voice",
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
          It all happens inside Claude Desktop. No separate dashboard, no logging in, no
          manual data entry I wouldn&apos;t be doing anyway.
        </p>
      </Section>

      {/* Demo */}
      <Section label="03 / Demo">
        <p className={`${prose} mb-8`}>Two screenshots from actual use.</p>
        <div className="space-y-6">
          <Screenshot
            src="/work/copilot-case-studies.png"
            caption="Asking about past work"
            description="Claude pulls the case studies from SQLite, summarizes them, and notices things across all three (in this case, that they all use Next.js and Tailwind)."
          />
          <Screenshot
            src="/work/copilot-outreach.png"
            caption="Drafting cold outreach"
            description="Claude reads the lead, pulls up any notes I've saved on their website, scans the case studies for the most relevant one, reads my voice guide and outreach template, then writes the email. Every detail in the output comes from real data."
          />
        </div>
      </Section>

      {/* Decisions */}
      <Section label="04 / A few decisions worth explaining">
        <div className="space-y-10">
          <div>
            <p className={subheading}>Why MCP, not a chatbot on a website</p>
            <p className={prose}>
              The obvious version of this is a web app with a chat box. I didn&apos;t do that
              on purpose. A chatbot would compete with Claude itself, and Claude has the
              better interface, the better model, and most importantly my actual attention.
              My data layer doesn&apos;t need its own UI. It just needs to be reachable from
              where the conversation is already happening.
            </p>
          </div>
          <div>
            <p className={subheading}>Tools return data, Claude writes words</p>
            <p className={`${prose} mb-3`}>
              None of my tools generate text. They return structured data. When Claude drafts
              an outreach email, the tool hands back: the lead info, the relevant case
              studies, my voice doc, and my outreach structure. Claude does the actual
              writing from that context.
            </p>
            <p className={prose}>
              This matters because it keeps the tool layer simple and predictable. If the
              email comes out weird, I can look at exactly what context Claude got, and I
              know it wasn&apos;t the tool fabricating anything.
            </p>
          </div>
          <div>
            <p className={subheading}>Pydantic doing three jobs at once</p>
            <p className={prose}>
              The same Pydantic model that I use to convert a SQLite row to a Python object
              also defines the schema Claude sees when calling the tool, and the JSON that
              comes back out. One source of truth instead of three slightly different
              definitions floating around. Avoids the schema-drift mess you get on bigger
              projects.
            </p>
          </div>
        </div>
      </Section>

      {/* Process */}
      {/* <Section label="05 / On using Claude to build this">
        <p className={`${prose} mb-4`}>
          I used Claude as a pair programmer through most of the build. Long chat sessions
          where I&apos;d decide what to build and how, and Claude would help me write it,
          debug it, and think through patterns I hadn&apos;t worked with before, like
          Pydantic v2 and the MCP protocol internals.
        </p>
        <p className={`${prose} mb-4`}>
          I owned the architecture and the schema design and the decisions about what to
          build. Claude helped me move faster on implementation.
        </p>
        <p className={prose}>
          I&apos;m not going to hide that. It&apos;s how I work now and it&apos;s how a lot
          of engineering is going to look soon.
        </p>
      </Section> */}

      {/* What's next */}
      <Section label="05 / What's next">
        <p className={`${prose} mb-4`}>
          Next thing I want to add is a proposal generator for warm leads. Same architecture
          as the outreach drafter, just more context and a more formal output. I&apos;ll
          build it when I actually have warm leads to test it on.
        </p>
        <p className={prose}>
          What I&apos;m deliberately not building: a web dashboard. The whole point of MCP
          is that the client (Claude Desktop) is already a good interface. Building a
          separate UI would just duplicate work Claude already does well.
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
                Related post <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
          <p className="font-mono text-xs text-text-mute mt-4">
            Built with Python · FastMCP · SQLite · Pydantic v2
          </p>
        </Section>
      )}
    </div>
  );
}
