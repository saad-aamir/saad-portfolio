"use client";

import { useState, useEffect } from "react";
import { clsx } from "clsx";
import Container from "./container";

const links = [
  { href: "/#about", label: "about" },
  { href: "/#experience", label: "experience" },
  { href: "/#work", label: "work" },
  { href: "/#toolkit", label: "toolkit" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav
          className="flex items-center justify-between h-20"
          aria-label="Primary navigation"
        >
          {/* Brand */}
          <a
            href="/"
            className="font-mono font-medium text-text hover:text-accent transition-colors duration-200"
            style={{ fontSize: "15px" }}
          >
            saad<span className="text-accent">.</span>aamir
          </a>

          {/* Links */}
          <div className="hidden sm:flex items-center gap-9">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-mono text-text-dim hover:text-text transition-colors duration-200 group"
                style={{ fontSize: "14px" }}
              >
                {link.label}
                {/* Underline — grows from left on hover */}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/#contact"
            className={clsx(
              "font-mono rounded-full px-5 py-2 transition-all duration-200",
              "border text-text-dim hover:text-accent hover:border-accent-dim",
              scrolled
                ? "border-border hover:bg-bg-1"
                : "border-border/60 hover:bg-bg-1/60"
            )}
            style={{ fontSize: "14px" }}
          >
            Get in touch
          </a>
        </nav>
      </Container>
    </header>
  );
}
