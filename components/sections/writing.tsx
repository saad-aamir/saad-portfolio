"use client";

import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import Eyebrow from "@/components/ui/eyebrow";
import { posts, substackUrl } from "@/lib/posts";
import { ArrowUpRight } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Writing() {
  return (
    <section id="writing" className="py-[110px]" aria-labelledby="writing-heading">
      <Container>

        {/* Header */}
        <Reveal>
          <Eyebrow>Writing</Eyebrow>
        </Reveal>
        <Reveal delay={1}>
          <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
            <h2
              id="writing-heading"
              className="font-semibold tracking-[-0.02em] leading-tight"
              style={{ fontSize: "42px" }}
            >
              Things I&apos;ve been{" "}
              <span className="text-text-mute">thinking about.</span>
            </h2>
            <a
              href={substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-text-mute hover:text-accent transition-colors flex items-center gap-1.5 flex-shrink-0"
              style={{ fontSize: "13px" }}
            >
              All posts on Substack
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        {/* Post list */}
        <div className="flex flex-col">
          {posts.map((post, i) => (
            <Reveal key={post.href} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
              <div
                role="link"
                tabIndex={0}
                onClick={() => window.open(post.href, "_blank")}
                onKeyDown={(e) => { if (e.key === "Enter") window.open(post.href, "_blank"); }}
                className="writing-row group cursor-pointer flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-10 border-t border-border hover:border-border-2 hover:bg-bg-card/40 rounded-sm transition-colors px-2 -mx-2"
                aria-label={`${post.title} — opens on Substack`}
              >
                {/* Number */}
                <span
                  className="font-mono text-text-mute flex-shrink-0 w-8"
                  style={{ fontSize: "12px" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")} /
                </span>

                {/* Title + excerpt */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-text group-hover:text-accent transition-colors mb-1 leading-snug"
                    style={{ fontSize: "18px" }}
                  >
                    {post.title}
                  </p>
                  <p
                    className="text-text-mute leading-relaxed"
                    style={{ fontSize: "14px" }}
                  >
                    {post.excerpt}
                  </p>
                  {post.demoHref && (
                    <a
                      href={post.demoHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 font-mono text-accent-dim hover:text-accent transition-colors mt-2.5"
                      style={{ fontSize: "11.5px" }}
                    >
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      Try the demo
                    </a>
                  )}
                </div>

                {/* Meta */}
                <div className="flex sm:flex-col items-start sm:items-end gap-3 sm:gap-0 flex-shrink-0">
                  <span
                    className="font-mono text-text-mute"
                    style={{ fontSize: "11.5px" }}
                  >
                    {formatDate(post.date)}
                  </span>
                  <span
                    className="font-mono text-text-mute sm:mt-2"
                    style={{ fontSize: "11.5px" }}
                  >
                    {post.readTime}
                  </span>
                  <span
                    className="font-mono px-2 py-0.5 rounded-full border border-border-2 text-accent-dim sm:mt-3"
                    style={{ fontSize: "10.5px" }}
                  >
                    {post.tag}
                  </span>
                </div>

                {/* Arrow */}
                <ArrowUpRight
                  className="hidden sm:block h-4 w-4 text-text-mute group-hover:text-accent transition-colors flex-shrink-0 self-center"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          ))}

          {/* Bottom border */}
          <div className="border-t border-border" />
        </div>

      </Container>

      <style>{`
        .writing-row {
          transform: translateY(0);
          transition: transform 0.22s ease, border-color 0.22s ease;
        }
        .writing-row:hover {
          transform: translateY(-2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .writing-row { transform: none !important; transition: border-color 0.22s ease; }
        }
      `}</style>
    </section>
  );
}
